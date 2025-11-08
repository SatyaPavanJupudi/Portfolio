import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

const toastVariants = cva(
  "fixed pointer-events-auto flex w-full max-w-md items-center gap-3 rounded-lg border shadow-lg p-4 backdrop-blur-sm",
  {
    variants: {
      variant: {
        default:
          "border-border/60 bg-card text-foreground",
        success:
          "border-emerald-500/50 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-100 shadow-emerald-500/20",
        error:
          "border-rose-500/50 bg-rose-50 dark:bg-rose-950/40 text-rose-900 dark:text-rose-100 shadow-rose-500/20",
        warning:
          "border-amber-500/50 bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-100 shadow-amber-500/20",
      },
      position: {
        "top-left": "top-4 left-4",
        "top-center": "top-4 left-1/2 -translate-x-1/2",
        "top-right": "top-4 right-4",
        "bottom-left": "bottom-4 left-4",
        "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
        "bottom-right": "bottom-4 right-4",
      },
    },
    defaultVariants: {
      variant: "default",
      position: "bottom-right",
    },
  }
)

export interface ToastProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof toastVariants> {
  title?: string
  description?: string
  onClose?: () => void
  duration?: number
}

function Toast({
  className,
  variant,
  position,
  title,
  description,
  onClose,
  duration = 5000,
  children,
  ...props
}: ToastProps) {
  React.useEffect(() => {
    if (duration > 0 && onClose) {
      const timer = setTimeout(onClose, duration)
      return () => clearTimeout(timer)
    }
  }, [duration, onClose])

  return (
    <div
      className={cn(toastVariants({ variant, position }), className)}
      {...props}
    >
      <div className="flex-1">
        {title && (
          <p className="font-semibold text-sm">{title}</p>
        )}
        {description && (
          <p className="text-sm opacity-90">{description}</p>
        )}
        {children}
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className="shrink-0 opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Close notification"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export { Toast, toastVariants }
