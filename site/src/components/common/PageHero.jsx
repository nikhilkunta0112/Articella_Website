import { Container } from "@/components/common/Section"
import Pattern from "@/components/brand/Pattern"
import { cn } from "@/lib/utils"

// Shared hero for inner pages. Tint panel with a Platypi headline.
// - With `image`: a photograph fills the right side on desktop (rounded left corners, bleeding to
//   the edge) and sits under the text, full width, on phones. Pages must NOT add their own mobile
//   copy of the picture.
// - Without `image`: desktop shows a rounded Articella Blue panel carrying the whole brand
//   pattern (`patternPos` picks which part of the fold shows). Phones show text only.
export default function PageHero({
  title,
  lead,
  actions,
  image,
  imageAlt = "",
  imagePosition = "50% 40%",
  children,
  className,
  patternPos = "60% 50%",
  tone = "tint",
}) {
  const blue = tone === "blue"
  return (
    <section className={cn("relative overflow-hidden", blue ? "bg-primary text-primary-foreground" : "bg-tint", className)}>
      {image ? (
        <div className="absolute inset-y-0 right-0 hidden w-[42%] overflow-hidden rounded-l-[2.5rem] lg:block">
          <img
            src={image}
            alt={imageAlt}
            className="h-full w-full object-cover"
            style={{ objectPosition: imagePosition }}
            loading="eager"
          />
        </div>
      ) : blue ? (
        <Pattern
          tone="blue"
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[46%] opacity-90 lg:block"
          size="auto 135%"
          position="25% 35%"
        />
      ) : (
        <div
          className="absolute inset-y-6 right-8 hidden aspect-[800/1084] overflow-hidden rounded-[2.5rem] bg-primary lg:block xl:right-[max(2rem,calc((100vw-1240px)/2))]"
          aria-hidden="true"
        >
          <Pattern tone="blue" className="absolute inset-0 h-full w-full" size="100% 100%" position={patternPos} />
        </div>
      )}
      <Pattern
        tone={blue ? "blue" : "white"}
        className={cn(
          "pointer-events-none absolute -right-24 -top-16 h-[26rem] w-auto lg:hidden",
          blue ? "opacity-[0.16]" : "opacity-[0.07]"
        )}
        position="40% 30%"
      />
      <Container className="relative grid items-center gap-10 py-14 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:py-[clamp(3rem,10vh,7rem)]">
        <div className="relative z-10 min-w-0 max-w-2xl">
          <h1 className={cn("text-[2.25rem] sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05]", blue ? "text-white" : "text-primary")}>{title}</h1>
          {lead && (
            <p className={cn("mt-6 max-w-xl text-lg sm:text-xl", blue ? "text-white/90" : "text-foreground/80")}>{lead}</p>
          )}
          {actions && (
            <div className="mt-9 flex flex-col gap-4 sm:flex-row sm:flex-wrap [&>*]:w-full sm:[&>*]:w-auto">{actions}</div>
          )}
          {children}
        </div>
        <div className="hidden lg:block" />
      </Container>
      {image && (
        <img
          src={image}
          alt={imageAlt}
          className="block aspect-[16/10] w-full object-cover lg:hidden"
          style={{ objectPosition: imagePosition }}
          loading="eager"
        />
      )}
    </section>
  )
}
