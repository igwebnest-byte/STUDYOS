import { cn } from "@/utils/cn";

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
}

export function Progress({ value, max = 100, className }: ProgressProps) {
  const safe = Math.min(Math.max(value, 0), max);
  const percent = (safe / max) * 100;

  return (
    <div className={cn("h-2.5 w-full rounded-full border border-border/80 bg-accent", className)} role="progressbar" aria-valuemin={0} aria-valuemax={max} aria-valuenow={safe}>
      <div
        className="h-full rounded-full bg-gradient-to-r from-primary via-violet-500 to-indigo-400 shadow-[0_4px_14px_-4px_rgba(129,73,255,0.8)]"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
