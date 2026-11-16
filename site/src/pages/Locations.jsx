import PageHero from "@/components/common/PageHero"
import { Section, SectionHeading } from "@/components/common/Section"
import Reveal from "@/components/common/Reveal"
import BrandButton from "@/components/common/BrandButton"
import CtaBand from "@/components/common/CtaBand"
import Icon from "@/components/brand/Icon"
import LocationMap from "@/components/resources/LocationMap"
import ResourceLinks from "@/components/resources/ResourceLinks"
import { useBooking } from "@/components/layout/BookingProvider"
import { practice, routes, images } from "@/data/site"

const prep = [
  {
    icon: "clipboard",
    title: "Preparing for a first visit",
    text: "See what to bring and what to expect before you arrive.",
    to: routes.newPatients,
    cta: "New patient preparation",
  },
  {
    icon: "card",
    title: "Insurance questions",
    text: "Find the insurers we work with and the ways to pay.",
    to: routes.insurance,
    cta: "Insurance and billing",
  },
  {
    icon: "message",
    title: "Quick answers",
    text: "Read short answers about visits, coverage and the portal.",
    to: routes.faqs,
    cta: "Read the FAQs",
  },
]

function Row({ icon, label, children }) {
  return (
    <div className="flex gap-4">
      <span className="mt-0.5 flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
        {icon === "parking" ? <span className="font-heading text-2xl font-semibold">P</span> : <Icon name={icon} size={24} />}
      </span>
      <div className="min-w-0">
        <h3 className="font-sans text-base font-semibold text-foreground">{label}</h3>
        <div className="mt-1 text-[1.0625rem] text-foreground/80">{children}</div>
      </div>
    </div>
  )
}

function jump(e) {
  const el = document.getElementById("clinic-info")
  if (el) {
    e.preventDefault()
    el.scrollIntoView({ behavior: "smooth", block: "start" })
  }
}

export default function Locations() {
  const { open } = useBooking()
  const a = practice.address
  return (
    <>
      <PageHero
        title="Find us in Frisco"
        lead="Visit Articella Primary Care on Coit Road. Here are our hours, directions and a few things to know before you come."
        image={images.locationsHero}
        imageAlt="A bright waiting area with a curved glass partition and a small tree"
        actions={
          <>
            <BrandButton onClick={open} icon="calendar" iconPosition="start" className="h-[52px] text-base">
              Book Appointment
            </BrandButton>
            <BrandButton variant="outline" href="#clinic-info" icon="chevronDown" onClick={jump} className="h-[52px] text-base">
              See hours
            </BrandButton>
          </>
        }
      />
      <ResourceLinks />

      <Section id="clinic-info" className="scroll-mt-16 py-14 sm:py-20 lg:py-[clamp(2.5rem,8vh,6rem)]">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <h2 className="text-3xl text-primary sm:text-4xl lg:text-[2.75rem]">Clinic information</h2>
            <div className="mt-8 space-y-7">
              <Row icon="pin" label="Address">
                <address className="not-italic">
                  <span className="whitespace-nowrap">{a.line1}</span>
                  <br />
                  {a.city}, {a.state} {a.zip}
                </address>
                <p className="mt-1">{practice.parking}.</p>
              </Row>
              <Row icon="phone" label="Call or text">
                <span className="flex flex-wrap items-center gap-x-5 gap-y-1">
                  <a href={practice.phoneHref} className="inline-flex min-h-11 items-center whitespace-nowrap text-primary underline underline-offset-4">
                    {practice.phone}
                  </a>
                  <a href={practice.smsHref} className="inline-flex min-h-11 items-center whitespace-nowrap text-primary underline underline-offset-4">
                    Send a text
                  </a>
                </span>
              </Row>
              <Row icon="clock" label="Hours">
                <dl className="space-y-3 sm:space-y-2">
                  {practice.hours.map((h) => (
                    <div key={h.days} className="flex flex-col sm:grid sm:grid-cols-[10.5rem_1fr] sm:items-baseline">
                      <dt>{h.days}</dt>
                      <dd className="whitespace-nowrap text-lg font-medium text-foreground">{h.time}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4">Please confirm holiday hours and appointment availability with the office before you travel.</p>
              </Row>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="overflow-hidden rounded-2xl border border-border bg-white">
              <LocationMap bare ratio="aspect-[4/3] lg:aspect-[4/3.2]" />
              <div className="flex flex-col gap-3 p-5 sm:flex-row sm:p-6 [&>*]:w-full sm:[&>*]:w-auto">
                <BrandButton onClick={open} icon="calendar" iconPosition="start">
                  Book Appointment
                </BrandButton>
                <BrandButton variant="outline" href={practice.mapsUrl} icon="arrowUpRight">
                  Open in Maps
                </BrandButton>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <Section tone="tint" className="py-14 sm:py-20 lg:py-[clamp(2.5rem,8vh,6rem)]">
        <SectionHeading
          title="Before you come in"
          lead="Solve the practical questions from home. These pages cover the most common ones."
        />
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {prep.map((p, i) => (
            <Reveal key={p.to} delay={i * 80} className="h-full">
              <div className="flex h-full items-start gap-4 rounded-2xl border border-border bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 sm:p-6">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                  <Icon name={p.icon} size={24} />
                </span>
                <div className="flex min-w-0 flex-1 flex-col self-stretch">
                  <h3 className="text-xl text-primary sm:text-2xl">{p.title}</h3>
                  <p className="mt-1.5 text-base text-foreground/80">{p.text}</p>
                  <BrandButton variant="quiet" to={p.to} icon="arrowRight" className="mt-auto min-h-11 self-start pt-2">
                    {p.cta}
                  </BrandButton>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <CtaBand
        title="We look forward to seeing you."
        text="Book online or call the office to find a time that works for you."
        primary={
          <BrandButton variant="inverse" onClick={open} className="w-full sm:w-auto">
            Book Appointment
          </BrandButton>
        }
        secondary={
          <BrandButton variant="inverseOutline" href={practice.phoneHref} icon="phone" iconPosition="start" className="w-full sm:w-auto">
            Call or text {practice.phone}
          </BrandButton>
        }
      />
    </>
  )
}
