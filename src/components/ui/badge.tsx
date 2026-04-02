import type { HTMLAttributes } from "react";

import { cn } from "@/utils/cn";

type BadgeVariant = "default" | "success" | "warning" | "danger";

const variantStyles: Record<BadgeVariant, string> = {
  default: "border border-primary/35 bg-primary/15 text-primary",
  success: "border border-emerald-500/35 bg-emerald-500/20 text-emerald-300",
  warning: "border border-amber-500/35 bg-amber-500/20 text-amber-300",
  danger: "border border-red-500/35 bg-red-500/20 text-red-300",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide",
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
