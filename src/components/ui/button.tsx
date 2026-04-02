import type { ButtonHTMLAttributes } from "react";

import { cn } from "@/utils/cn";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md" | "lg";

const variantMap: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-primary to-violet-500 text-primary-foreground hover:from-violet-500 hover:to-primary border border-primary/80 shadow-[0_10px_28px_-12px_rgba(139,92,246,0.88)]",
  secondary:
    "bg-card/95 text-foreground border border-border hover:border-primary/45 hover:bg-accent/70 hover:text-accent-foreground",
  ghost:
    "bg-transparent text-muted-foreground hover:bg-accent/70 hover:text-accent-foreground border border-transparent",
  danger: "bg-red-600 text-white border border-red-500 hover:bg-red-500",
};

const sizeMap: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-xs rounded-lg",
  md: "h-10 px-4 text-sm rounded-xl",
  lg: "h-11 px-5 text-sm rounded-xl",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  fullWidth,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50",
        variantMap[variant],
        sizeMap[size],
        fullWidth && "w-full",
        className,
      )}
      {...props}
    />
  );
}
