import { Section } from "@/components/common/Section"
import Reveal from "@/components/common/Reveal"
import Icon from "@/components/brand/Icon"
import { membershipSteps } from "@/data/care"

// Compact rows: icon on the left, title and one short line on the right.
export default function Steps() {
  return (
    <Section className="py-10 sm:py-16 lg:py-[clamp(2.5rem,7.5vh,5rem)]">
      <Reveal>
        <h2 className="max-w-2xl text-3xl text-primary sm:text-4xl lg:text-[2.75rem]">Three simple steps</h2>
      </Reveal>
      <ol className="mt-5 grid gap-x-10 md:grid-cols-3 lg:mt-10">
        {membershipSteps.map((s, i) => (
          <Reveal as="li" key={s.title} delay={i * 80} className="flex items-start gap-4 border-t border-border py-4 md:py-6">
            <span className="grid size-12 flex-none place-items-center rounded-full bg-secondary text-primary">
              <Icon name={s.icon} size={24} />
            </span>
            <div className="min-w-0">
              <h3 className="text-xl text-primary sm:text-2xl">{s.title}</h3>
              <p className="mt-1.5 text-base leading-relaxed text-foreground/80">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}
