import Icon from "@/components/brand/Icon"
import { practice } from "@/data/site"
import { cn } from "@/lib/utils"

// Live map of the Frisco clinic. A designed card sits underneath the iframe, so the frame
// never reads as an empty box while the map loads or if it is blocked.
export default function MapEmbed({ className, ratio = "aspect-[4/3]" }) {
  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-border bg-tint", ratio, className)}>
      <div className="absolute inset-0 flex items-center justify-center p-5">
        <div className="flex max-w-xs flex-col items-center gap-3 rounded-2xl border border-border bg-white px-6 py-7 text-center shadow-[0_10px_30px_-14px_rgba(0,0,139,0.35)]">
          <span className="flex size-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Icon name="pin" size={28} />
          </span>
          <p className="font-heading text-xl text-primary">Articella Primary Care</p>
          <p className="text-foreground/80">{practice.address.full}</p>
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
