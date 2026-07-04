"use client"

import { Switch as SwitchPrimitive } from "@base-ui/react/switch"

import { cn } from "@/lib/utils"

function Switch({
  className,
  ...props
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border-2 border-transparent transition-all outline-none focus-visible:ring-2 focus-visible:ring-primary/50 data-checked:bg-primary data-unchecked:bg-muted data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className
      )}
      {...props}>
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block size-5 rounded-full bg-white shadow-lg transition-transform data-checked:translate-x-5 data-unchecked:translate-x-0" />
    </SwitchPrimitive.Root>
  );
}

export { Switch }
