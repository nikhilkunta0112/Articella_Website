import { Section, SectionHeading } from "@/components/common/Section"
import Reveal from "@/components/common/Reveal"
import Icon from "@/components/brand/Icon"
import FaqAccordion from "@/components/care/FaqAccordion"
import { afterVisit, careFaqs } from "@/data/care"

export default function AfterVisit() {
  return (
    <Section className="pt-14 pb-2 sm:pt-20 sm:pb-4 lg:pt-24 lg:pb-6">
      <SectionHeading
        title="After the visit"
        lead="Care does not end when you leave the room. Here is what usually happens next."
      />
      <ul className="grid gap-x-12 sm:grid-cols-2">
        {afterVisit.map((a, i) => (
          <Reveal as="li" key={a.title} delay={i * 70} className="flex items-start gap-4 border-t border-border py-6 sm:py-7">
            <span className="grid size-12 flex-none place-items-center rounded-full bg-secondary text-primary">
              <Icon name={a.icon} size={24} />
            </span>
            <div className="min-w-0">
              <h3 className="text-xl text-primary sm:text-2xl">{a.title}</h3>
              <p className="mt-1.5 text-base leading-relaxed text-muted-foreground">{a.text}</p>
            </div>
          </Reveal>
        ))}
      </ul>

      <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-[0.8fr_1.4fr] lg:gap-16">
        <Reveal>
          <h2 className="text-3xl text-primary sm:text-4xl lg:text-[2.75rem]">Quick questions</h2>
          <p className="mt-3 max-w-md text-lg text-muted-foreground">Short answers before you book.</p>
        </Reveal>
        <Reveal>
          <FaqAccordion items={careFaqs} />
        </Reveal>
      </div>
    </Section>
  )
}
