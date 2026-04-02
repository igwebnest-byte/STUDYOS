import type { InputHTMLAttributes } from "react";

import { cn } from "@/utils/cn";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "h-10 w-full rounded-xl border border-border bg-background/90 px-3 text-sm text-foreground outline-none transition-all duration-200 placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/40",
        className,
      )}
      {...props}
    />
  );
}
