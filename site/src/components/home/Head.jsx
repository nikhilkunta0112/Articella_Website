import Reveal from "@/components/common/Reveal"
import { cn } from "@/lib/utils"

// Shared section rhythm and heading for the Home page: 56px (mobile) to 96px (desktop) vertical padding,
// (on desktop the padding follows the window height, so a section and its heading fit in one window)
// headings 34 to 44px in Platypi, a short lead at 18px or larger.
export const rhythm = "py-14 sm:py-[4.5rem] lg:py-[clamp(2.5rem,7.5vh,5rem)]"

export function HomeHeading({ id, title, lead, align = "left", className, maxW = "max-w-2xl", tone = "light", children }) {
  return (
    <Reveal className={cn(align === "center" && "mx-auto text-center", maxW, className)}>
      <h2
        id={id}
        className={cn(
          "text-balance text-[2.125rem] leading-[1.12] sm:text-[2.5rem] lg:text-[2.75rem]",
          tone === "dark" ? "text-white" : "text-primary"
        )}
      >
        {title}
      </h2>
      {lead && (
        <p className={cn("mt-4 text-lg leading-relaxed sm:text-xl", tone === "dark" ? "text-white/90" : "text-foreground/80")}>
          {lead}
        </p>
      )}
      {children}
    </Reveal>
  )
}
