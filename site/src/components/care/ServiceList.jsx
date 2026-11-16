import { Section } from "@/components/common/Section"
import Reveal from "@/components/common/Reveal"
import BrandButton from "@/components/common/BrandButton"
import Icon from "@/components/brand/Icon"
import Pattern from "@/components/brand/Pattern"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useBooking } from "@/components/layout/BookingProvider"
import { careServices } from "@/data/care"
import { practice } from "@/data/site"

function Bullets({ items }) {
  return (
    <ul className="space-y-2.5">
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-base leading-snug text-foreground sm:text-[1.0625rem]">
          <Icon name="check" size={18} className="mt-0.5 shrink-0 text-primary" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  )
}

export default function ServiceList({ value, onValueChange }) {
  const { open } = useBooking()
  return (
    <Section id="services" tone="tint" className="scroll-mt-20 overflow-clip py-14 sm:py-20 lg:py-[clamp(2.5rem,8vh,6rem)]">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <h2 className="text-3xl text-primary sm:text-4xl lg:text-[2.75rem]">Our primary care services</h2>
          <p className="mt-4 max-w-md text-lg text-muted-foreground">
            Open any row to see who the visit may help and what you might talk about. Your clinician decides the
            actual plan with you, in the room.
          </p>
          <div className="relative mt-8 hidden overflow-hidden rounded-2xl bg-primary p-7 text-white lg:block">
            <Pattern tone="blue" className="pointer-events-none absolute -right-20 -bottom-24 h-[130%] w-auto opacity-[0.11]" />
            <div className="relative">
              <h3 className="text-2xl text-white">Not sure which fits?</h3>
              <p className="mt-2 text-base text-white/90">
                Ask about an appointment and the team will help you choose.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                <BrandButton variant="inverse" onClick={open} icon="calendar" iconPosition="start">
                  Book Appointment
                </BrandButton>
                <BrandButton variant="inverseOutline" href={practice.phoneHref} icon="phone" iconPosition="start">
                  Call or text {practice.phone}
                </BrandButton>
              </div>
            </div>
          </div>
          <p className="mt-4 text-base text-muted-foreground lg:hidden">
            Not sure which fits? Ask about an appointment and the team will help you choose.
          </p>
        </Reveal>

        <Reveal>
          <Accordion multiple value={value} onValueChange={onValueChange} className="gap-3 lg:gap-[clamp(0.5rem,1.2vh,0.75rem)]">
            {careServices.map((s) => (
              <AccordionItem
                key={s.id}
                value={s.id}
                id={`service-${s.id}`}
                className="scroll-mt-28 rounded-2xl border border-border bg-background transition-colors data-open:border-primary not-last:border-b"
              >
                <AccordionTrigger className="items-center gap-4 rounded-2xl p-4 hover:no-underline sm:p-5 lg:py-[clamp(0.6rem,1.5vh,1.1rem)]">
                  <span className="grid size-12 shrink-0 place-items-center rounded-full bg-secondary text-primary lg:size-11">
                    <Icon name={s.icon} size={24} />
                  </span>
                  <span className="flex-1 pr-2">
                    <span className="block font-heading text-lg leading-snug text-primary sm:text-xl">{s.title}</span>
                    <span className="mt-0.5 hidden font-sans text-base font-normal text-muted-foreground sm:block lg:line-clamp-1">
                      {s.summary}
                    </span>
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-5 sm:px-5 sm:pb-6">
                  <p className="mb-5 text-base text-muted-foreground sm:hidden">{s.summary}</p>
                  <div className="grid gap-6 border-t border-border pt-5 sm:grid-cols-2 sm:gap-8">
                    <div>
                      <h3 className="mb-3 font-sans text-base font-semibold text-foreground">Who this visit may help</h3>
                      <Bullets items={s.who} />
                    </div>
                    <div>
                      <h3 className="mb-3 font-sans text-base font-semibold text-foreground">What you might discuss</h3>
                      <Bullets items={s.discuss} />
                    </div>
                  </div>
                  {s.note && <p className="mt-5 rounded-lg bg-tint p-3 text-base text-muted-foreground">{s.note}</p>}
                  <div className="mt-6">
                    <BrandButton onClick={open} icon="calendar" iconPosition="start">
                      Ask about an appointment
                    </BrandButton>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Section>
  )
}
