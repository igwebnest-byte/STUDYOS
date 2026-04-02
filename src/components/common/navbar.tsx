"use client";

import { CalendarRange, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

import { ThemeToggle } from "@/components/common/theme-toggle";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/providers/auth-provider";

export function Navbar() {
  const router = useRouter();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b border-border/85 bg-background/70 px-4 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-3">
        <div className="hidden h-9 w-9 items-center justify-center rounded-xl border border-primary/30 bg-primary/15 text-primary sm:flex">
          <CalendarRange className="h-4 w-4" />
        </div>
        <div>
          <p className="font-heading text-[17px] font-semibold leading-tight">
            Welcome back{user ? `, ${user.name.split(" ")[0]}` : ""}
          </p>
          <p className="text-xs text-muted-foreground">Track attendance and stay ahead this semester.</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button size="sm" variant="secondary" onClick={handleLogout} className="border-border/90">
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}
