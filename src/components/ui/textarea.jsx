import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({
  className,
  ...props
}) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex min-h-[120px] w-full rounded-xl border border-border bg-[var(--glass-bg)] px-4 py-3 text-[15px] text-foreground transition-all outline-none placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 resize-y",
        className
      )}
      {...props} />
  );
}

export { Textarea }
