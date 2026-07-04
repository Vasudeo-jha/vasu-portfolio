import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-300 outline-none select-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/25 hover:shadow-primary/40",
        gradient: "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:-translate-y-0.5 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40",
        outline: "border border-border bg-transparent text-foreground hover:bg-muted",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        glass: "bg-[var(--glass-bg)] backdrop-blur-xl border border-[var(--glass-border)] text-foreground hover:bg-white/10 hover:border-white/20 hover:-translate-y-0.5",
        ghost: "text-foreground hover:bg-muted",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        link: "text-primary underline-offset-4 hover:underline p-0 h-auto",
      },
      size: {
        default: "h-10 px-5 py-2.5",
        xs: "h-7 px-2.5 text-xs rounded-lg",
        sm: "h-8 px-3.5 text-xs rounded-lg",
        lg: "h-12 px-8 text-base rounded-2xl",
        xl: "h-14 px-10 text-lg rounded-2xl",
        icon: "size-10",
        "icon-xs": "size-7 rounded-lg",
        "icon-sm": "size-8 rounded-lg",
        "icon-lg": "size-12 rounded-2xl",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} />
  );
}

export { Button, buttonVariants }
