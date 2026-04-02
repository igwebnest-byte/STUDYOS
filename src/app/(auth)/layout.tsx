import Link from "next/link";

import { ThemeToggle } from "@/components/common/theme-toggle";

export default function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-screen">
      <header className="flex h-16 items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-heading text-lg font-semibold">
          StudyOS
        </Link>
        <ThemeToggle />
      </header>

      <section className="mx-auto grid w-full max-w-6xl gap-6 px-4 pb-10 pt-2 lg:grid-cols-[1fr_430px] lg:items-stretch lg:px-6">
        <aside className="hidden rounded-3xl border border-border bg-card/40 p-8 lg:block">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">Student OS</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight">
            A focused workspace for attendance, schedules, and academic progress.
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Step 2 ships a full authentication UI with a local mock session so the product flow is ready before backend integration.
          </p>

          <div className="mt-8 grid gap-3">
            <div className="rounded-xl border border-border bg-muted/30 p-3">
              <p className="text-sm font-medium">Dark-first experience</p>
              <p className="mt-1 text-xs text-muted-foreground">Purple accents with instant light mode toggle.</p>
            </div>
            <div className="rounded-xl border border-border bg-muted/30 p-3">
              <p className="text-sm font-medium">Modular architecture</p>
              <p className="mt-1 text-xs text-muted-foreground">Reusable auth, layout, and dashboard building blocks.</p>
            </div>
          </div>
        </aside>

        <div className="flex items-center justify-center">{children}</div>
      </section>
    </main>
  );
}
