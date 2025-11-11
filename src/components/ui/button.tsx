import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2 shadow-md [clip-path:polygon(0_3px,1.5px_3px,1.5px_1.5px,3px_1.5px,3px_0,calc(100%-3px)_0,calc(100%-3px)_1.5px,calc(100%-1.5px)_1.5px,calc(100%-1.5px)_3px,100%_3px,100%_calc(100%-3px),calc(100%-1.5px)_calc(100%-3px),calc(100%-1.5px)_calc(100%-1.5px),calc(100%-3px)_calc(100%-1.5px),calc(100%-3px)_100%,3px_100%,3px_calc(100%-1.5px),1.5px_calc(100%-1.5px),1.5px_calc(100%-3px),0_calc(100%-3px))]",
        sm: "h-9 px-3 shadow-md [clip-path:polygon(0_3px,1.5px_3px,1.5px_1.5px,3px_1.5px,3px_0,calc(100%-3px)_0,calc(100%-3px)_1.5px,calc(100%-1.5px)_1.5px,calc(100%-1.5px)_3px,100%_3px,100%_calc(100%-3px),calc(100%-1.5px)_calc(100%-3px),calc(100%-1.5px)_calc(100%-1.5px),calc(100%-3px)_calc(100%-1.5px),calc(100%-3px)_100%,3px_100%,3px_calc(100%-1.5px),1.5px_calc(100%-1.5px),1.5px_calc(100%-3px),0_calc(100%-3px))]",
        lg: "h-11 px-8 shadow-lg [clip-path:polygon(0_3px,1.5px_3px,1.5px_1.5px,3px_1.5px,3px_0,calc(100%-3px)_0,calc(100%-3px)_1.5px,calc(100%-1.5px)_1.5px,calc(100%-1.5px)_3px,100%_3px,100%_calc(100%-3px),calc(100%-1.5px)_calc(100%-3px),calc(100%-1.5px)_calc(100%-1.5px),calc(100%-3px)_calc(100%-1.5px),calc(100%-3px)_100%,3px_100%,3px_calc(100%-1.5px),1.5px_calc(100%-1.5px),1.5px_calc(100%-3px),0_calc(100%-3px))]",
        icon: "h-10 w-10 rounded-full shadow-md",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
