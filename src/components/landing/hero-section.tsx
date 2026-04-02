import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-hero-grid bg-[size:36px_36px] opacity-35" />
      <div className="mx-auto grid w-full max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_420px] lg:items-center lg:px-8">
        <div>
          <Badge className="mb-5" variant="default">
            Student Operating System
          </Badge>
          <h1 className="text-4xl font-semibold leading-tight text-foreground sm:text-5xl lg:text-6xl">
            Manage attendance, schedules, notes, and campus workflow in one clean app.
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            StudyOS is a modern full-stack student dashboard designed for clarity. Track attendance per subject, manage bunks smartly, and keep your notes and PYQs organized.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/signup">
              <Button size="lg">Create Account</Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="secondary" size="lg">
                Open Demo Dashboard
              </Button>
            </Link>
          </div>
        </div>

        <div className="glass-panel p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Today at a glance</p>
          <div className="mt-4 grid gap-3">
            <div className="rounded-xl border border-border bg-muted/50 p-3">
              <p className="text-sm text-muted-foreground">Overall attendance</p>
              <p className="mt-1 text-2xl font-semibold">82%</p>
            </div>
            <div className="rounded-xl border border-border bg-muted/50 p-3">
              <p className="text-sm text-muted-foreground">Classes today</p>
              <p className="mt-1 text-2xl font-semibold">4 scheduled</p>
            </div>
            <div className="rounded-xl border border-border bg-muted/50 p-3">
              <p className="text-sm text-muted-foreground">New notes added</p>
              <p className="mt-1 text-2xl font-semibold">2 resources</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
