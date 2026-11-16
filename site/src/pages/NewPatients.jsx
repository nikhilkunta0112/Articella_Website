import PageHero from "@/components/common/PageHero"
import { Section, SectionHeading } from "@/components/common/Section"
import BrandButton from "@/components/common/BrandButton"
import PageCta from "@/components/patients/PageCta"
import Reveal from "@/components/common/Reveal"
import Icon from "@/components/brand/Icon"
import Pattern from "@/components/brand/Pattern"
import Actions from "@/components/resources/Actions"
import { useBooking } from "@/components/layout/BookingProvider"
import ResourceLinks from "@/components/patients/ResourceLinks"
import FirstVisitChecklist from "@/components/patients/FirstVisitChecklist"
import { practice, images, routes } from "@/data/site"
import { visitSteps } from "@/data/patients"

export default function NewPatients() {
  const { open } = useBooking()
  return (
    <>
      <PageHero
        title="Welcome to Articella"
        lead="We are glad you are here. Pick a time, gather a few things, and we will take it from there. Your first visit is simply a conversation."
        image={images.newPatients}
        imageAlt="A patient being welcomed at a calm clinic reception"
        actions={
          <Actions>
            <BrandButton onClick={open} icon="calendar" iconPosition="start" className="w-full sm:w-auto">
              Book Appointment
            </BrandButton>
            <BrandButton variant="outline" to={routes.locations} icon="pin" iconPosition="start" className="w-full sm:w-auto">
              Hours and directions
            </BrandButton>
          </Actions>
        }
      />
      <ResourceLinks />

      <Section className="py-14 sm:py-20 lg:py-[clamp(2.5rem,8vh,6rem)]">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <SectionHeading
            className="mb-0 lg:mb-0"
            title="Three simple steps"
            lead="From choosing how you would like to be cared for to walking through the door."
          />
          <ol className="grid gap-4">
            {visitSteps.map((s, i) => (
              <Reveal as="li" key={s.id} delay={i * 80}>
                <div className="grid grid-cols-[3rem_1fr] items-center gap-x-4 gap-y-1 rounded-2xl border border-border bg-white p-5 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-primary sm:grid-cols-[3.5rem_1fr_auto] sm:gap-x-6 sm:p-6">
                  <span className="flex size-12 items-center justify-center rounded-full bg-tint text-primary sm:row-span-2 sm:size-14" aria-hidden="true">
                    <Icon name={s.icon} size={24} />
                  </span>
                  <h3 className="text-xl text-primary sm:col-start-2 sm:row-start-1 sm:self-end sm:text-2xl">{s.title}</h3>
                  <p className="col-span-2 mt-1 text-[1.0625rem] text-muted-foreground sm:col-span-1 sm:col-start-2 sm:row-start-2 sm:mt-0 sm:self-start">
                    {s.text}
                  </p>
                  <div className="col-span-2 mt-1 flex flex-wrap gap-x-5 sm:col-span-1 sm:col-start-3 sm:row-span-2 sm:row-start-1 sm:mt-0 sm:flex-col sm:items-start sm:gap-x-0">
                    {s.links?.map((l) => (
                      <BrandButton key={l.label} variant="quiet" to={l.to} href={l.href} icon="arrowRight" className="min-h-11 text-base">
                        {l.label}
                      </BrandButton>
                    ))}
                    {s.action === "book" && (
                      <BrandButton variant="quiet" onClick={open} icon="arrowRight" className="min-h-11 text-base">
                        Book Appointment
                      </BrandButton>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </Section>

      <Section tone="tint" id="checklist">
        <SectionHeading title="Your first visit checklist" lead="Four things worth gathering before you come in." />
        <FirstVisitChecklist />
      </Section>

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <h2 className="text-3xl text-primary sm:text-4xl lg:text-[2.75rem]">Arriving at the clinic</h2>
            <p className="mt-4 max-w-xl text-lg text-muted-foreground">
              Our front desk can help with scheduling, coverage questions and portal access, before your visit or when
              you arrive.
            </p>
            <div className="mt-8 rounded-2xl border border-border bg-tint p-6 sm:p-8">
              <ul className="grid gap-6">
                <li className="flex gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-primary" aria-hidden="true">
                    <Icon name="pin" size={24} />
                  </span>
                  <address className="text-[1.0625rem] not-italic">
                    <p className="font-heading text-xl text-primary">Articella Primary Care</p>
                    <p className="mt-1">{practice.address.line1}</p>
                    <p>
                      {practice.address.city}, {practice.address.state} {practice.address.zip}
                    </p>
                  </address>
                </li>
                <li className="flex gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white text-primary" aria-hidden="true">
                    <Icon name="clock" size={24} />
                  </span>
                  <div className="min-w-0 flex-1 text-[1.0625rem]">
                    <p className="font-heading text-xl text-primary">Hours</p>
                    <ul className="mt-1 grid gap-1">
                      {practice.hours.map((h) => (
                        <li key={h.days} className="flex flex-col sm:flex-row sm:justify-between sm:gap-4">
                          <span>{h.days}</span>
                          <span className="font-medium">{h.time}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
                <li className="flex gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-white font-heading text-2xl font-semibold text-primary" aria-hidden="true">
                    P
                  </span>
                  <div className="text-[1.0625rem]">
                    <p className="font-heading text-xl text-primary">Parking</p>
                    <p className="mt-1">{practice.parking}.</p>
                  </div>
                </li>
              </ul>
              <p className="mt-6 border-t border-border pt-5 text-base text-muted-foreground">
                Please confirm holiday hours and appointment availability with the office.
              </p>
            </div>
            <Actions className="mt-8 [&>*]:max-sm:w-full">
              <BrandButton to={routes.locations} icon="pin" iconPosition="start">
                Hours and directions
              </BrandButton>
              <BrandButton variant="outline" href={practice.phoneHref} icon="phone" iconPosition="start">
                Call or text
              </BrandButton>
            </Actions>
          </Reveal>
          <Reveal delay={100}>
            <div className="relative flex min-h-[26rem] items-end overflow-hidden rounded-3xl bg-primary p-5 sm:p-8 lg:h-full lg:min-h-[32rem]">
              <Pattern tone="blue" className="absolute inset-0 h-full w-full" size="150% auto" position="60% 25%" />
              <div className="relative w-full rounded-2xl bg-white p-6 sm:p-8">
                <h3 className="text-2xl text-primary">The front desk can help</h3>
                <ul className="mt-4 grid gap-3 text-[1.0625rem]">
                  {["Scheduling your visit", "Coverage questions", "Patient portal access"].map((t) => (
                    <li key={t} className="flex items-center gap-3">
                      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-secondary text-primary">
                        <Icon name="check" size={16} strokeWidth={2} />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      <PageCta title="Ready for your first visit?" text="Book online, or call or text the front desk. We will help you find a time that works." />
    </>
  )
}
