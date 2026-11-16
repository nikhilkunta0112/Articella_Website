import PageHero from "@/components/common/PageHero"
import { Section } from "@/components/common/Section"
import BrandButton from "@/components/common/BrandButton"
import CtaBand from "@/components/common/CtaBand"
import Reveal from "@/components/common/Reveal"
import Icon from "@/components/brand/Icon"
import { useBooking } from "@/components/layout/BookingProvider"
import LocationMap from "@/components/resources/LocationMap"
import ContactForm from "@/components/contact/ContactForm"
import { practice, routes, images } from "@/data/site"

function Detail({ icon, label, children }) {
  return (
    <li className="flex items-start gap-4 py-5 first:pt-0 last:pb-0">
      <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-tint text-primary" aria-hidden="true">
        <Icon name={icon} size={24} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-base font-medium text-foreground/80">{label}</p>
        <div className="mt-0.5 text-lg">{children}</div>
      </div>
    </li>
  )
}

const link = "inline-flex min-h-11 items-center font-heading text-xl text-primary underline-offset-4 hover:underline"
const textLink = "inline-flex min-h-11 items-center whitespace-nowrap text-primary underline underline-offset-4"

export default function Contact() {
  const { open } = useBooking()
  const a = practice.address
  return (
    <>
      <PageHero
        title="Contact us"
        lead="Call, text, write or stop by. The front desk is glad to help with appointments, memberships and coverage questions."
        image={images.contactHero}
        imageAlt="A smiling woman on a phone call at a tidy wooden desk"
        imagePosition="50% 35%"
        actions={
          <>
            <BrandButton onClick={open} icon="calendar" iconPosition="start" className="h-[52px] text-base">
              Book Appointment
            </BrandButton>
            <BrandButton variant="outline" href={practice.phoneHref} icon="phone" iconPosition="start" className="h-[52px] text-base">
              Call {practice.phone}
            </BrandButton>
          </>
        }
      />

      <Section className="py-14 sm:py-20 lg:py-[clamp(2.5rem,8vh,6rem)]">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <h2 className="text-3xl text-primary sm:text-4xl lg:text-[2.75rem]">Reach us directly</h2>
            <ul className="mt-8 divide-y divide-border rounded-2xl border border-border bg-white p-6 sm:p-8 lg:mt-[clamp(1.25rem,3vh,2rem)] lg:py-[clamp(1rem,2.5vh,2rem)]">
              <Detail icon="phone" label="Phone and text">
                <a href={practice.phoneHref} className={`${link} whitespace-nowrap`}>
                  {practice.phone}
                </a>
                <p className="text-base">
                  <a href={practice.smsHref} className={textLink}>
                    Send a text to this number
                  </a>
                </p>
              </Detail>
              <Detail icon="mail" label="Email">
                <a href={`mailto:${practice.email}`} className={link}>
                  {practice.email}
                </a>
              </Detail>
              <Detail icon="clock" label="Hours">
                <dl className="mt-1 space-y-3 sm:space-y-2">
                  {practice.hours.map((h) => (
                    <div key={h.days} className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between sm:gap-x-6">
                      <dt className="text-base text-foreground/80">{h.days}</dt>
                      <dd className="whitespace-nowrap text-lg font-medium text-foreground">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </Detail>
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <ContactForm />
          </Reveal>
        </div>
      </Section>

      <Section tone="tint" className="py-14 sm:py-16 lg:py-[clamp(2.5rem,7.5vh,5rem)]">
        <Reveal>
          <div className="grid overflow-hidden rounded-2xl border border-border bg-white lg:grid-cols-[1.35fr_1fr]">
            <LocationMap bare ratio="aspect-[4/3] lg:aspect-auto lg:min-h-[22rem]" />
            <div className="flex flex-col justify-center p-6 sm:p-10">
              <h2 className="text-3xl text-primary sm:text-4xl">Find us in Frisco</h2>
              <address className="mt-5 flex gap-3 text-lg not-italic text-foreground">
                <Icon name="pin" size={24} className="mt-0.5 shrink-0 text-primary" />
                <span>
                  <span className="whitespace-nowrap">{a.line1}</span>
                  <br />
                  {a.city}, {a.state} {a.zip}
                  <span className="mt-1 block text-base text-foreground/80">{practice.parking}.</span>
                </span>
              </address>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:flex-col xl:flex-row [&>*]:w-full sm:[&>*]:w-auto lg:[&>*]:w-full xl:[&>*]:w-auto">
                <BrandButton href={practice.mapsUrl} icon="external">
                  Open in Maps
                </BrandButton>
                <BrandButton variant="outline" to={routes.locations} icon="arrowRight">
                  Plan your visit
                </BrandButton>
              </div>
            </div>
          </div>
        </Reveal>
      </Section>

      <CtaBand
        title="Prefer to talk it through?"
        text="Call or text the front desk. We are happy to help you find the right next step."
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
