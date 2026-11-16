import PageHero from "@/components/common/PageHero"
import { Section, SectionHeading } from "@/components/common/Section"
import BrandButton from "@/components/common/BrandButton"
import CtaBand from "@/components/common/CtaBand"
import Reveal from "@/components/common/Reveal"
import Icon from "@/components/brand/Icon"
import Actions from "@/components/resources/Actions"
import { practice, images } from "@/data/site"
import { portalSteps } from "@/data/patients"

export default function PatientPortal() {
  return (
    <>
      <PageHero
        title="Patient Portal"
        lead="Continue to the patient portal on its own secure site. It opens in a new window, separate from this website."
        image={images.portalHero}
        imageAlt="A patient checking in on a laptop at home"
        actions={
          <Actions className="w-full sm:w-auto">
            <BrandButton size="lg" href={practice.portalUrl} icon="external" className="w-full sm:w-auto">
              Continue to Patient Portal
            </BrandButton>
          </Actions>
        }
      >
        <p className="mt-6 flex items-center gap-3 text-[1.0625rem] text-foreground/80">
          <Icon name="shieldCheck" size={22} className="shrink-0 text-primary" />
          This website never asks for your portal password.
        </p>
      </PageHero>

      <Section className="py-14 sm:py-16 lg:py-[clamp(2.5rem,7.5vh,5rem)]">
        <SectionHeading title="How it works" lead="Four short things to know before you continue." className="mb-8 lg:mb-12" />
        <ol className="grid gap-8 lg:grid-cols-4 lg:gap-8">
          {portalSteps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 80} className="relative flex gap-5 lg:block">
              {i < portalSteps.length - 1 && (
                <span
                  aria-hidden="true"
                  className="absolute top-14 bottom-[-2rem] left-7 w-px bg-border lg:top-7 lg:bottom-auto lg:left-14 lg:h-px lg:w-[calc(100%-3.5rem+2rem)]"
                />
              )}
              <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground" aria-hidden="true">
                <Icon name={s.icon} size={26} />
              </span>
              <div className="lg:mt-6">
                <h3 className="text-2xl whitespace-nowrap text-primary">{s.title}</h3>
                <p className="mt-2 text-[1.0625rem] leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </Section>

      <CtaBand
        title="Need help getting in?"
        text="Call or text the clinic and the front desk will help with portal access. No question is too small. Please do not send sensitive medical information by text."
        primary={
          <BrandButton variant="inverse" href={practice.phoneHref} icon="phone" iconPosition="start" className="w-full sm:w-auto">
            Call {practice.phone}
          </BrandButton>
        }
        secondary={
          <BrandButton variant="inverseOutline" href={practice.smsHref} icon="message" iconPosition="start" className="w-full sm:w-auto">
            Text the clinic
          </BrandButton>
        }
      />
    </>
  )
}
