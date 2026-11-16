import { cn } from "@/lib/utils"

// The Articella brand pattern (Brand Book p18). This is the brand's own vector artwork,
// extracted from the Brand Book PDF (public/img/brand/pattern.svg, 800 x 1084), used as a
// mask so it can be white on Articella Blue or Articella Blue on white without redrawing.
// The parent supplies the background colour. Keep it quiet: ample space, never behind body
// text at high contrast, never recolored outside the brand colours.
//
// tone "blue"  -> white stripes (place on an Articella Blue background)
// tone "white" -> Articella Blue stripes (place on white or the tint)
// Size it with className, e.g. "h-[120%] w-auto" (aspect ratio is fixed to the artwork).
// `flip` mirrors it horizontally. `size` (CSS mask-size, default cover) and `position`
// (default center) choose which part of the artwork shows when the box is cropped.
const TONES = { blue: "#ffffff", white: "var(--brand-blue)", tint: "var(--brand-blue)" }

export default function Pattern({ tone = "blue", className = "", flip = false, size = "cover", position = "center" }) {
  return (
    <div
      aria-hidden="true"
      className={cn("aspect-[800/1084]", className)}
      style={{
        backgroundColor: TONES[tone] || TONES.blue,
        WebkitMaskImage: "url(/img/brand/pattern.svg)",
        maskImage: "url(/img/brand/pattern.svg)",
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskSize: size,
        maskSize: size,
        WebkitMaskPosition: position,
        maskPosition: position,
        transform: flip ? "scaleX(-1)" : undefined,
      }}
    />
  )
}
