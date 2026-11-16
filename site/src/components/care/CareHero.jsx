import { Container } from "@/components/common/Section"
import BrandButton from "@/components/common/BrandButton"
import Icon from "@/components/brand/Icon"
import Reveal from "@/components/common/Reveal"
import { images, routes } from "@/data/site"

const points = [
  { icon: "shieldCheck", label: "Preventive visits" },
  { icon: "stethoscope", label: "Current concerns" },
  { icon: "refresh", label: "Ongoing follow-up" },
]

function jump(e) {
  const el = document.getElementById("services")
  if (el) {
    e.preventDefault()
    el.scrollIntoView({ behavior: "smooth", block: "start" })
    history.replaceState(null, "", "#services")
  }
}

// Image-led opening: on desktop the picture bleeds off the right edge, full height, with a
// soft rounded corner; text sits on the quiet tint panel.
export default function CareHero() {
  return (
    <section className="relative overflow-hidden bg-tint">
      <div className="absolute inset-y-0 right-0 hidden w-[44%] lg:block" aria-hidden="true">
        <img
          src={images.primaryHero}
          alt=""
          className="h-full w-full rounded-bl-[5rem] object-cover object-[50%_40%]"
          loading="eager"
        />
      </div>
      <Container className="relative py-14 sm:py-20 lg:py-[clamp(2.5rem,8vh,7rem)]">
        <div className="relative z-10 max-w-2xl lg:max-w-[52%]">
          <h1 className="text-[2.5rem] leading-[1.06] text-primary sm:text-6xl lg:text-[4rem]">
            Primary care for every stage of life
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl">
            This page covers three things: preventive visits to stay ahead of problems, visits for what is bothering
            you now, and ongoing follow-up with a team that knows you.
          </p>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-base text-foreground">
            {points.map((p) => (
              <li key={p.label} className="flex items-center gap-2.5">
                <span className="grid size-10 place-items-center rounded-full bg-secondary text-primary">
                  <Icon name={p.icon} size={22} />
                </span>
                {p.label}
              </li>
            ))}
          </ul>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <BrandButton href="#services" icon="chevronDown" onClick={jump} className="w-full sm:w-auto">
              Explore the services
            </BrandButton>
            <BrandButton to={routes.providers} variant="outline" className="w-full sm:w-auto">
              Meet the clinicians
            </BrandButton>
          </div>
        </div>
      </Container>
      <Reveal className="lg:hidden">
        <img
          src={images.primaryHero}
          alt="A nurse taking a blood pressure reading on a smiling older woman"
          className="aspect-[16/10] w-full object-cover object-[50%_40%]"
          loading="eager"
        />
      </Reveal>
    </section>
  )
}
