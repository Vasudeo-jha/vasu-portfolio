import { mergeProps } from "@base-ui/react/merge-props"
import { useRender } from "@base-ui/react/use-render"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center gap-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all [&>svg]:pointer-events-none [&>svg]:size-3",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground px-3 py-1",
        secondary: "bg-secondary text-secondary-foreground px-3 py-1",
        destructive: "bg-destructive/10 text-destructive px-3 py-1",
        outline: "border border-border text-foreground px-3 py-1",
        ghost: "text-muted-foreground px-2 py-0.5",
        glass: "bg-[var(--glass-bg)] backdrop-blur-xl border border-border text-muted-foreground px-3.5 py-1.5",
        gradient: "bg-gradient-to-r from-blue-500/15 to-purple-500/15 border border-purple-500/30 text-foreground px-4 py-2 text-sm font-semibold",
        skill: "bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-primary/20 text-primary px-3 py-1.5",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant = "default",
  render,
  ...props
}) {
  return useRender({
    defaultTagName: "span",
    props: mergeProps({
      className: cn(badgeVariants({ variant }), className),
    }, props),
    render,
    state: {
      slot: "badge",
      variant,
    },
  });
}

export { Badge, badgeVariants }
