import { cn } from "@/lib/utils"
import Reveal from "@/components/common/Reveal"
import Pattern from "@/components/brand/Pattern"

export function Container({ className, children, ...rest }) {
  return (
    <div className={cn("mx-auto w-full max-w-[1240px] px-5 sm:px-8 lg:px-10", className)} {...rest}>
      {children}
    </div>
  )
}

// tone: white | tint | blue. Blue sections carry the brand pattern as a quiet background.
export function Section({ tone = "white", pattern = false, className, innerClassName, id, children, ...rest }) {
  return (
    <section
      id={id}
      className={cn(
        "relative overflow-clip py-16 sm:py-20 lg:py-[clamp(2.5rem,8vh,7rem)]",
        tone === "tint" && "bg-tint",
        tone === "blue" && "bg-primary text-primary-foreground",
        className
      )}
      {...rest}
    >
      {pattern && (
        <Pattern
          tone={tone === "blue" ? "blue" : "tint"}
          className={cn(
            "pointer-events-none absolute -right-24 top-1/2 hidden h-[130%] w-auto -translate-y-1/2 lg:block",
            tone === "blue" ? "opacity-[0.16]" : "opacity-60"
          )}
        />
      )}
      <Container className={cn("relative", innerClassName)}>{children}</Container>
    </section>
  )
}

// On desktop the section padding and heading gap follow the window height, so a heading and its content
// can fit in one window.
// Heading block: Platypi title, optional short lead. No eyebrow labels.
export function SectionHeading({ title, lead, align = "left", tone = "light", className, as: Tag = "h2", maxW = "max-w-2xl" }) {
  return (
    <Reveal className={cn(align === "center" && "mx-auto text-center", maxW, "mb-10 lg:mb-[clamp(1.5rem,4.5vh,3.5rem)]", className)}>
      <Tag className={cn("text-3xl sm:text-4xl lg:text-[2.75rem]", tone === "dark" ? "text-white" : "text-primary")}>
        {title}
      </Tag>
      {lead && (
        <p className={cn("mt-4 text-lg", tone === "dark" ? "text-white/85" : "text-muted-foreground")}>{lead}</p>
      )}
    </Reveal>
  )
}
