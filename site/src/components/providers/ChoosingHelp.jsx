import { Section, SectionHeading } from "@/components/common/Section"
import Reveal from "@/components/common/Reveal"
import BrandButton from "@/components/common/BrandButton"
import Icon from "@/components/brand/Icon"
import { useBooking } from "@/components/layout/BookingProvider"
import { practice } from "@/data/site"
import { providerSteps } from "@/data/about"

export default function ChoosingHelp() {
  const { open } = useBooking()
  return (
    <Section tone="tint" className="py-14 sm:py-20 lg:py-[clamp(2.5rem,8vh,7rem)]">
      <SectionHeading
        title="Help choosing a clinician"
        lead="Not sure who to see? You do not have to decide alone. The office is glad to help."
      />
      <div className="grid gap-5 md:grid-cols-3 lg:gap-7">
        {providerSteps.map((s, i) => (
          <Reveal key={s.title} delay={i * 90} className="flex">
            <div className="w-full rounded-2xl border border-border bg-background p-7 transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/50 sm:p-8">
              <div className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
                <Icon name={s.icon} size={24} />
              </div>
              <h3 className="mt-5 text-xl text-primary sm:text-2xl">{s.title}</h3>
              <p className="mt-2 text-base text-foreground/80 sm:text-lg">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-10 grid gap-3 sm:flex sm:flex-wrap sm:gap-4">
        <BrandButton href={practice.phoneHref} icon="phone" iconPosition="start" className="w-full sm:w-auto">
          Call or text {practice.phone}
        </BrandButton>
        <BrandButton variant="outline" onClick={open} className="w-full sm:w-auto">
          Book Appointment
        </BrandButton>
      </Reveal>
    </Section>
  )
}
