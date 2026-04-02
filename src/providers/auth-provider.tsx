"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type AuthUser = {
  name: string;
  email: string;
};

type AuthContextValue = {
  isAuthenticated: boolean;
  user: AuthUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const refreshSession = useCallback(async () => {
    try {
      const authModule = await import("../../lib/auth.js");
      const sessionActive = authModule.isAuthenticated();
      const currentUser = authModule.getCurrentUser();

      setIsAuthenticated(Boolean(sessionActive));
      setUser(
        currentUser && typeof currentUser.name === "string" && typeof currentUser.email === "string"
          ? { name: currentUser.name, email: currentUser.email }
          : null,
      );
      setToken(sessionActive ? "local-session" : null);
    } catch {
      setIsAuthenticated(false);
      setUser(null);
      setToken(null);
    }
  }, []);

  useEffect(() => {
    void refreshSession();
  }, [refreshSession]);

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const authModule = await import("../../lib/auth.js");
        const result = authModule.login(email, password);

        if (!result?.success) {
          return false;
        }

        await refreshSession();
        return true;
      } catch {
        return false;
      }
    },
    [refreshSession],
  );

  const signup = useCallback(async (name: string, email: string, password: string) => {
    try {
      const authModule = await import("../../lib/auth.js");
      const result = authModule.signup(name, email, password);
      return Boolean(result?.success);
    } catch {
      return false;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      const authModule = await import("../../lib/auth.js");
      authModule.logout();
    } catch {
      // ignore logout failures and still reset local UI state
    }

    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    router.push("/login");
  }, [router]);

  const value = useMemo<AuthContextValue>(
    () => ({
      isAuthenticated,
      user,
      token,
      login,
      signup,
      logout,
      refreshSession,
    }),
    [isAuthenticated, user, token, login, signup, logout, refreshSession],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
