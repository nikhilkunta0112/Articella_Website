import Icon from "@/components/brand/Icon"
import { practice } from "@/data/site"
import { cn } from "@/lib/utils"

// Live map of the Frisco clinic. The placeholder under the iframe carries the clinic name only:
// the street address is written once, in the text beside the map, never repeated inside it.
// `bare` drops the outer border and rounding so the map can sit flush inside a card that already
// has its own border (one border, never two). The placeholder never draws a border of its own.
export default function LocationMap({ className, ratio = "aspect-[4/3]", bare }) {
  return (
    <div className={cn("relative overflow-hidden bg-tint", !bare && "rounded-2xl border border-border", ratio, className)}>
      <div className="absolute inset-0 flex items-center justify-center p-5">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="flex size-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Icon name="pin" size={24} />
          </span>
          <p className="font-heading text-xl text-primary">Articella Primary Care</p>
        </div>
      </div>
      <iframe
        title="Map showing the Articella Primary Care clinic in Frisco, Texas"
        src={practice.mapsEmbed}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0 h-full w-full border-0"
        style={{ background: "transparent" }}
      />
    </div>
  )
}
