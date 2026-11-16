import { cn } from "@/lib/utils"

// Button group with a 16px gap that also holds when it wraps on a phone.
// `stack`: on phones the buttons stack, each full width and the same height; from sm up they sit in a row.
export default function Actions({ className, stack, children }) {
  return (
    <div
      className={cn(
        "flex",
        stack
          ? "flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5 sm:gap-y-4"
          : "flex-wrap items-center gap-x-5 gap-y-4",
        className
      )}
    >
      {children}
    </div>
  )
}
