import { useEffect, useState } from "react"
import { Container } from "@/components/common/Section"
import Reveal from "@/components/common/Reveal"
import Icon from "@/components/brand/Icon"
import Pattern from "@/components/brand/Pattern"
import BrandButton from "@/components/common/BrandButton"
import { ArrowLink } from "@/components/home/Arrow"
import { useBooking } from "@/components/layout/BookingProvider"
import { practice, routes } from "@/data/site"
import { cn } from "@/lib/utils"

// Which row of the hours list is today. Worked out in the clinic's time zone (Central) from the labels in
// practice.hours ("Monday to Friday", "Saturday", "Sunday"). It only highlights the row: it makes no claim
// that the office is open right now (holidays are not in the data).
function todayRow(hours) {
  const day = new Intl.DateTimeFormat("en-US", { weekday: "long", timeZone: "America/Chicago" }).format(new Date())
  const weekend = day === "Saturday" || day === "Sunday"
  return hours.findIndex((h) => {
    const d = h.days.toLowerCase()
    if (weekend) return d.includes(day.toLowerCase())
    return d.includes("monday") && d.includes("friday")
  })
}

function AddressCard() {
  const { address } = practice
  return (
    <>
      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
        <Icon name="pin" size={24} />
      </span>
      <span className="text-base leading-snug text-foreground sm:text-lg">
        <span className="block font-heading text-xl text-primary">Articella Primary Care</span>
        {address.line1}, {address.city}, {address.state} {address.zip}
        <span className="block text-base text-foreground/75">{practice.parking}</span>
      </span>
    </>
  )
}

// One place for everything about visiting, as a single rounded card: an Articella Blue panel with the
// hours and actions beside the live map, with the address floating on the map. The address appears once.
// Layout idea from the inspo archive (a confident colour panel beside imagery, soft floating cards).
export default function VisitDetails() {
  const { open } = useBooking()
  const [today, setToday] = useState(-1)
  useEffect(() => setToday(todayRow(practice.hours)), [])

  return (
    <section aria-labelledby="visit-title" className="bg-background py-14 sm:py-[4.5rem] lg:pb-6 lg:pt-[clamp(2.5rem,7.5vh,5rem)]">
      <Container>
        <Reveal>
          <div
            className="grid overflow-hidden rounded-[2rem] bg-primary text-primary-foreground lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]"
            style={{ boxShadow: "0 50px 90px -52px color-mix(in srgb, var(--primary) 75%, transparent)" }}
          >
            {/* left: the details, on Articella Blue */}
            <div className="relative isolate flex flex-col p-7 sm:p-10 lg:p-[clamp(2rem,5vh,3.5rem)]">
              <Pattern tone="blue" className="pointer-events-none absolute -bottom-40 -left-32 -z-10 w-80 opacity-[0.06]" />

              <h2 id="visit-title" className="text-balance text-[2.125rem] leading-[1.1] text-white sm:text-[2.5rem] lg:text-[2.9rem]">
                Visit us in Frisco
              </h2>
              <p className="mt-4 max-w-md text-lg leading-relaxed text-white/90 sm:text-xl">
                Our practice is on Coit Road, with ample parking. Book online, call or text, or read what to expect first.
              </p>

              <div className="mt-8 flex items-center gap-3 text-white">
                <span className="grid size-10 place-items-center rounded-full bg-white/12 ring-1 ring-white/25">
                  <Icon name="clock" size={22} />
                </span>
                <p className="font-heading text-xl">Clinic hours</p>
              </div>
              <dl className="mt-3 text-lg">
                {practice.hours.map((h, i) => (
                  <div
                    key={h.days}
                    className={cn(
                      "flex flex-col gap-0.5 border-b border-white/15 py-3 last:border-b-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6",
                      i === today && "-mx-4 rounded-xl border-transparent bg-white/12 px-4"
                    )}
                  >
                    <dt className="flex items-center gap-3 font-medium text-white">
                      {h.days}
                      {i === today && (
                        <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-semibold text-primary">Today</span>
                      )}
                    </dt>
                    <dd className="whitespace-nowrap text-white/85">{h.time}</dd>
                  </div>
                ))}
              </dl>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <BrandButton size="lg" variant="inverse" onClick={open} icon="calendar" iconPosition="start" className="px-6">
                  Book an Appointment
                </BrandButton>
                <BrandButton size="lg" variant="inverseOutline" href={practice.mapsUrl} icon="external" className="px-6">
                  Get directions
                </BrandButton>
              </div>
              <div className="mt-3 flex flex-wrap gap-x-8">
                <ArrowLink to={routes.newPatients} tone="white">
                  New patients start here
                </ArrowLink>
                <ArrowLink to={routes.locations} tone="white">
                  Hours and contact
                </ArrowLink>
              </div>
            </div>

            {/* right: the live map, with the address floating on it */}
            <div className="relative min-h-[26rem] lg:min-h-[clamp(25rem,64vh,36rem)]">
              <iframe
                title="Map showing the Articella Primary Care clinic in Frisco, Texas"
                src={practice.mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
              />
              <address
                className="pointer-events-none absolute inset-x-4 bottom-4 flex items-center gap-4 rounded-2xl bg-white p-4 not-italic lg:inset-x-auto lg:bottom-6 lg:left-6 lg:max-w-sm"
                style={{ boxShadow: "0 24px 50px -24px color-mix(in srgb, var(--primary) 55%, transparent)" }}
              >
                <AddressCard />
              </address>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
