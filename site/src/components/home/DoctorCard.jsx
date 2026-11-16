import { Link } from "react-router-dom"
import BrandButton from "@/components/common/BrandButton"
import { Arrow } from "@/components/home/Arrow"
import { cn } from "@/lib/utils"

// One team member card, shared by the horizontal scroll track (desktop) and the swipe carousel (touch).
// `track` sets the photo height from the viewport height so the whole card fits inside the pinned screen.
export default function DoctorCard({ p, open, track = false, className }) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition duration-300 hover:-translate-y-0.5 hover:border-primary",
        className
      )}
      style={{ boxShadow: "0 30px 60px -44px color-mix(in srgb, var(--primary) 40%, transparent)" }}
    >
      <div className={cn("overflow-hidden bg-secondary", track ? "h-[clamp(11rem,32vh,19rem)]" : "aspect-[4/3.1]")}>
        <img
          src={p.photo}
          alt={`Portrait of ${p.name}`}
          loading="lazy"
          draggable="false"
          className="h-full w-full object-cover object-top transition duration-700 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex-1 px-6 pt-6 md:px-7 md:pt-7">
        <h3 className="text-2xl text-primary">{p.name}</h3>
        <p className="mt-1 text-lg font-medium text-foreground">{p.role}</p>
        {p.credentials && <p className="text-base text-foreground/75">{p.credentials}</p>}
        <p className="mt-3 text-base leading-relaxed text-foreground/80">{p.intro}</p>
      </div>
      <div className="flex flex-wrap items-center gap-x-5 gap-y-2 px-6 pb-6 pt-5 md:px-7 md:pb-7 md:pt-6">
        <Link
          to={`/providers#${p.id}`}
          className="group/vp inline-flex min-h-11 items-center gap-2 font-medium text-primary underline-offset-4 hover:underline"
        >
          View profile
          <Arrow className="transition-transform duration-300 group-hover/vp:translate-x-1" />
        </Link>
        <BrandButton variant="outline" size="sm" onClick={open} className="min-h-11 text-base">
          Ask about an appointment
        </BrandButton>
      </div>
    </article>
  )
}
