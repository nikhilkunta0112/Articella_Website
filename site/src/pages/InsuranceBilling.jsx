import PageHero from "@/components/common/PageHero"
import { Section, SectionHeading } from "@/components/common/Section"
import BrandButton from "@/components/common/BrandButton"
import PageCta from "@/components/patients/PageCta"
import Reveal from "@/components/common/Reveal"
import Icon from "@/components/brand/Icon"
import Actions from "@/components/resources/Actions"
import ResourceLinks from "@/components/patients/ResourceLinks"
import InsurerGallery from "@/components/insurance/InsurerGallery"
import { waysToPay, callQuestions } from "@/data/patients"
import { practice, images } from "@/data/site"

export default function InsuranceBilling() {
  return (
    <>
      <PageHero
        title="Insurance and billing"
        lead="See which insurance organizations we work with, then call the office to check your exact plan. A quick conversation now saves surprises later."
        image={images.insuranceHero}
        imageAlt="A patient and a care team member talking through coverage at a desk"
        actions={
          <Actions>
            <BrandButton href="#insurers" icon="search" iconPosition="start" className="w-full sm:w-auto">
              Find your insurer
            </BrandButton>
            <BrandButton variant="outline" href={practice.phoneHref} icon="phone" iconPosition="start" className="w-full sm:w-auto">
              Call or text
            </BrandButton>
          </Actions>
        }
      />
      <ResourceLinks />

      <Section id="insurers" tone="tint">
        <SectionHeading
          title="Organizations we work with"
          lead="Search by name, then select a card to read a short guide. Coverage depends on your exact plan."
          maxW="max-w-3xl"
        />
        <InsurerGallery />
      </Section>

      <Section className="py-14 sm:py-20 lg:py-[clamp(2.5rem,8vh,6rem)]">
        <SectionHeading title="Ways to pay" lead="Pick the path that fits you. The office is happy to talk it through." />
        <ul className="grid gap-5 md:grid-cols-3">
          {waysToPay.map((w, i) => (
            <Reveal as="li" key={w.id} delay={i * 80} className="flex">
              <div className="flex w-full flex-col rounded-2xl border border-border bg-white p-6 transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-primary">
                <div className="flex items-center gap-4">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-tint text-primary" aria-hidden="true">
                    <Icon name={w.icon} size={24} />
                  </span>
                  <h3 className="text-xl text-primary sm:text-2xl">{w.title}</h3>
                </div>
                <p className="mt-4 flex-1 text-[1.0625rem] text-muted-foreground">{w.text}</p>
                <div className="mt-3">
                  <BrandButton variant="quiet" to={w.link.to} href={w.link.href} icon="arrowRight" className="min-h-11 text-base">
                    {w.link.label}
                  </BrandButton>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Section>

      <Section tone="tint" className="py-14 sm:py-20 lg:py-[clamp(2.5rem,8vh,6rem)]">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal>
            <h2 className="text-3xl text-primary sm:text-4xl lg:text-[2.75rem]">Before you call the office</h2>
            <p className="mt-4 max-w-md text-lg text-muted-foreground">
              Keep your insurance card nearby and have these four questions ready. They are the same ones the front desk
              can help you answer.
            </p>
            <div className="mt-8">
              <BrandButton href={practice.phoneHref} icon="phone" iconPosition="start" className="w-full sm:w-auto">
                Call or text {practice.phone}
              </BrandButton>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <ul className="grid gap-4">
              {callQuestions.map((q) => (
                <li key={q} className="flex items-start gap-4 rounded-2xl border border-border bg-white p-5 sm:p-6">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground" aria-hidden="true">
                    <Icon name="check" size={18} />
                  </span>
                  <span className="text-[1.0625rem]">{q}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Section>

      <PageCta
        title="Questions about your coverage?"
        text="The front desk can check your plan with you. Call or text, or book a time that suits you."
      />
    </>
  )
}
