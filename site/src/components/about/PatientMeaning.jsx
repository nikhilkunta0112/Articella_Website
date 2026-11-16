import { Section, SectionHeading } from "@/components/common/Section"
import Reveal from "@/components/common/Reveal"
import Icon from "@/components/brand/Icon"
import { patientParts } from "@/data/about"

// Three compact rows: icon, title and one or two lines, with the matching brand promise beside them on wider screens.
export default function PatientMeaning() {
  return (
    <Section tone="blue" className="py-14 sm:py-20 lg:py-[clamp(2.5rem,8vh,7rem)]">
      <SectionHeading
        title="What this means for a patient"
        lead="A simple picture of the care experience we aim for at every visit."
        tone="dark"
      />
      <ul className="divide-y divide-white/25 border-y border-white/25">
        {patientParts.map((p, i) => (
          <li key={p.title}>
            <Reveal delay={i * 80} className="grid gap-x-12 gap-y-3 py-6 md:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] md:items-center md:py-8">
              <div className="flex items-start gap-4 sm:gap-5">
                <span className="flex size-12 flex-none items-center justify-center rounded-full bg-white text-primary sm:size-14">
                  <Icon name={p.icon} size={24} />
                </span>
                <div>
                  <h3 className="text-xl text-white sm:text-2xl">{p.title}</h3>
                  <p className="mt-1.5 text-base text-white/90 sm:text-lg">{p.text}</p>
                </div>
              </div>
              <div className="hidden md:block md:border-l md:border-white/25 md:pl-8">
                <p className="font-heading text-lg text-white">{p.pillar}</p>
                <p className="mt-1 text-base text-white/85">{p.promise}</p>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </Section>
  )
}
