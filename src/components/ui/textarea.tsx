import type { TextareaHTMLAttributes } from "react";

import { cn } from "@/utils/cn";

export function Textarea({ className, ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-[104px] w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/40",
        className,
      )}
      {...props}
    />
  );
}
