import { Link } from "react-router-dom"
import { Section, SectionHeading } from "@/components/common/Section"
import Reveal from "@/components/common/Reveal"
import Icon from "@/components/brand/Icon"
import { useBooking } from "@/components/layout/BookingProvider"
import { practice, routes } from "@/data/site"

const row =
  "group flex w-full items-center gap-4 min-h-16 rounded-xl border border-border bg-background p-4 text-left transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary focus-visible:border-primary sm:p-5"

function Row({ icon, title, text }) {
  return (
    <>
      <span className="flex size-11 flex-none items-center justify-center rounded-full bg-secondary text-primary">
        <Icon name={icon} size={22} />
      </span>
      <span className="flex-1">
        <span className="block font-heading text-lg text-primary">{title}</span>
        <span className="block text-base text-muted-foreground">{text}</span>
      </span>
      <Icon name="arrowRight" size={20} className="text-primary transition-transform group-hover:translate-x-0.5" />
    </>
  )
}

export default function LocalConnection() {
  const { open } = useBooking()
  return (
    <Section tone="tint" id="visit" className="py-14 sm:py-20 lg:py-[clamp(2.5rem,8vh,7rem)]">
      <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div>
          <SectionHeading
            title="Find us in Frisco"
            lead="Articella is a neighborhood practice, close to the people we care for."
            className="!mb-8"
          />
          <Reveal delay={80} className="space-y-6">
            <div className="flex gap-4">
              <Icon name="pin" size={24} className="mt-1 flex-none text-primary" />
              <address className="not-italic text-lg">
                <span className="block font-heading text-xl text-primary">Articella Primary Care</span>
                {practice.address.line1}
                <br />
                {practice.address.city}, {practice.address.state} {practice.address.zip}
                <span className="mt-1 block text-base text-muted-foreground">{practice.parking}</span>
              </address>
            </div>
            <div className="flex gap-4">
              <Icon name="clock" size={24} className="mt-1 flex-none text-primary" />
              <dl className="space-y-3 text-lg">
                {practice.hours.map((h) => (
                  <div key={h.days} className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-8">
                    <dt className="font-medium text-foreground sm:w-44">{h.days}</dt>
                    <dd className="whitespace-nowrap text-muted-foreground">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
        <Reveal delay={140} className="grid gap-3">
          <a href={practice.mapsUrl} target="_blank" rel="noopener noreferrer" className={row}>
            <Row icon="pin" title="Get directions" text="Open the map in a new tab" />
          </a>
          <Link to={routes.locations} className={row}>
            <Row icon="clock" title="See our hours" text="Opening times and the map" />
          </Link>
          <button type="button" onClick={open} className={row}>
            <Row icon="calendar" title="Book an appointment" text="Choose how you would like to begin" />
          </button>
          <a href={practice.phoneHref} className={row}>
            <Row
              icon="phone"
              title={
                <>
                  Call or text <span className="whitespace-nowrap">{practice.phone}</span>
                </>
              }
              text="Reach the office directly"
            />
          </a>
        </Reveal>
      </div>
    </Section>
  )
}
