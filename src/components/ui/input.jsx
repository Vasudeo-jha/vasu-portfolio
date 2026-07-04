import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({
  className,
  type,
  ...props
}) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "flex h-11 w-full rounded-xl border border-border bg-[var(--glass-bg)] px-4 py-3 text-[15px] text-foreground transition-all duration-300 outline-none file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props} />
  );
}

export { Input }
