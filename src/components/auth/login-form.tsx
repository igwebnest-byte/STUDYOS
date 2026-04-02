"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

const primaryButtonClass =
  "w-full rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-60";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      try {
        const authModule = await import("../../../lib/auth.js");
        if (mounted && authModule.isAuthenticated()) {
          router.replace("/dashboard");
        }
      } catch {
        // no-op
      }
    };

    checkSession();

    return () => {
      mounted = false;
    };
  }, [router]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      const authModule = await import("../../../lib/auth.js");
      const result = authModule.login(email.trim(), password);

      if (!result?.success) {
        alert(result?.message ?? "Invalid email or password.");
        return;
      }

      router.push("/dashboard");
    } catch {
      alert("Unable to login right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto w-full max-w-md space-y-6">
      <header className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">Sign In</h1>
        <p className="text-sm text-zinc-400">Welcome back to StudyOS.</p>
      </header>

      <div className="rounded-2xl border border-zinc-800 bg-zinc-900/85 p-6 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.95)]">
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-200" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-100 outline-none transition focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/20"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-200" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-zinc-700 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-100 outline-none transition focus:border-blue-500/70 focus:ring-2 focus:ring-blue-500/20"
              placeholder="••••••••"
            />
          </div>

          <button type="submit" disabled={loading} className={primaryButtonClass}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-zinc-400">
          New to StudyOS?{" "}
          <Link className="font-medium text-blue-400 transition hover:text-blue-300" href="/signup">
            Create an account
          </Link>
        </p>
      </div>
    </section>
  );
}

export default LoginForm;
