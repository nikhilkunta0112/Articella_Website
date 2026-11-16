import { Section, SectionHeading } from "@/components/common/Section"
import Reveal from "@/components/common/Reveal"
import Icon from "@/components/brand/Icon"
import Pattern from "@/components/brand/Pattern"
import { nameMeaning } from "@/data/about"

export default function WhyArticella() {
  return (
    <Section id="why" className="py-14 sm:py-20 lg:py-[clamp(2.5rem,8vh,7rem)]">
      <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <SectionHeading title="Why Articella exists" maxW="max-w-xl" className="!mb-6 lg:!mb-8" />
          <Reveal delay={80} className="space-y-5 text-lg text-foreground/85">
            <p>
              Too often, a visit feels rushed and the chance to talk about staying well gets lost. We believe primary care should be different: a place with room for prevention, room to be understood, and room for a relationship that continues over time.
            </p>
            <p>
              At Articella, prevention is valued as deeply as treatment, and patients and physicians walk together through every season of life.
            </p>
            <blockquote className="border-l-4 border-primary pl-5 pt-1 sm:pl-7">
              <p className="font-heading text-2xl leading-snug text-primary sm:text-[1.75rem]">
                To create a sanctuary for lifelong wellness.
              </p>
              <footer className="mt-2 text-base text-muted-foreground">Our mission</footer>
            </blockquote>
          </Reveal>
        </div>
        <Reveal delay={160}>
          <div className="relative overflow-hidden rounded-2xl border border-border bg-tint p-7 sm:p-9">
            <Pattern tone="white" className="pointer-events-none absolute -right-16 -top-10 h-[140%] w-auto opacity-[0.09]" />
            <div className="relative">
            <div className="flex size-12 items-center justify-center rounded-full bg-secondary text-primary">
              <Icon name="bookOpen" size={24} />
            </div>
            <h3 className="mt-5 text-2xl text-primary">Where the name comes from</h3>
            <p className="mt-3 text-base text-foreground/80 sm:text-[1.0625rem]">{nameMeaning}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  )
}
