"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

type AuthGuardProps = {
  children: ReactNode;
};

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let mounted = true;

    const verify = async () => {
      try {
        const authModule = await import("../../../lib/auth.js");
        const isLoggedIn = authModule.isAuthenticated();

        if (!isLoggedIn) {
          router.replace("/login");
          return;
        }
      } catch {
        router.replace("/login");
        return;
      } finally {
        if (mounted) setChecking(false);
      }
    };

    verify();

    return () => {
      mounted = false;
    };
  }, [router]);

  if (checking) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-sm text-zinc-400">Loading...</p>
      </div>
    );
  }

  return <>{children}</>;
}

export default AuthGuard;
