"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpenCheck,
  CalendarDays,
  GraduationCap,
  LayoutDashboard,
  NotebookPen,
} from "lucide-react";

import { cn } from "@/utils/cn";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/attendance", label: "Attendance", icon: BookOpenCheck },
  { href: "/calendar", label: "Calendar", icon: CalendarDays },
  { href: "/notes", label: "Notes & PYQ", icon: NotebookPen },
  { href: "/colleges", label: "Colleges", icon: GraduationCap },
];

function isActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden border-r border-border/80 bg-card/35 px-4 py-5 md:sticky md:top-0 md:block md:h-screen md:w-72">
      <div className="mb-8 rounded-2xl border border-border/85 bg-gradient-to-br from-primary/15 to-card px-4 py-4 shadow-[0_14px_34px_-20px_rgba(129,73,255,0.88)]">
        <p className="font-heading text-[22px] font-semibold leading-none">StudyOS</p>
        <p className="mt-1 text-xs text-muted-foreground">Academic Command Center</p>
      </div>

      <nav className="grid gap-1.5">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "group flex items-center gap-2.5 rounded-xl border px-2.5 py-2 text-sm font-medium transition-all duration-200",
                active
                  ? "border-primary/45 bg-primary/16 text-foreground shadow-[0_12px_26px_-18px_rgba(129,73,255,0.92)]"
                  : "border-transparent text-muted-foreground hover:border-border/90 hover:bg-accent/60 hover:text-accent-foreground",
              )}
            >
              <span
                className={cn(
                  "inline-flex h-8 w-8 items-center justify-center rounded-lg border transition-all duration-200",
                  active
                    ? "border-primary/35 bg-primary text-primary-foreground"
                    : "border-border/70 bg-muted/25 text-muted-foreground group-hover:border-primary/35 group-hover:text-foreground",
                )}
              >
                <Icon className="h-4 w-4" />
              </span>

              <span className="flex-1">{item.label}</span>

              <span
                className={cn(
                  "h-1.5 w-1.5 rounded-full transition-all duration-200",
                  active ? "bg-primary" : "bg-transparent group-hover:bg-primary/45",
                )}
              />
            </Link>
          );
        })}
      </nav>

      <div className="mt-8 rounded-2xl border border-border/85 bg-muted/22 px-4 py-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">Semester Focus</p>
        <p className="mt-2 text-sm font-medium">Keep attendance above 75%</p>
        <p className="mt-1 text-xs text-muted-foreground">Daily progress tracking enabled</p>
      </div>
    </aside>
  );
}

export function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="mb-5 overflow-x-auto md:hidden">
      <div className="inline-flex min-w-full gap-2 rounded-xl border border-border/85 bg-card/70 p-2 backdrop-blur-sm">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "inline-flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all duration-200",
                active
                  ? "border-primary/40 bg-primary text-primary-foreground"
                  : "border-transparent text-muted-foreground hover:border-border hover:bg-accent/60 hover:text-accent-foreground",
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {item.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
