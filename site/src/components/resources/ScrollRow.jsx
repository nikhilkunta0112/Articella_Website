import { cn } from "@/lib/utils"

// A row of chips or links. On phones it is a 2-column grid of equal-width cells (a lone last item
// can span both with `col-span-2`); from sm up it is a wrapping flex row, centered, or left aligned with `align="start"`. Keeps its old name so
// the pages that import it keep working. The page itself never scrolls sideways.
export default function ScrollRow({ children, className, align = "center", ...rest }) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap sm:items-center",
        align === "center" ? "justify-center" : "justify-start",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  )
}
