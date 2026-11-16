import { useState } from "react"
import { Container } from "@/components/common/Section"
import Pattern from "@/components/brand/Pattern"
import Reveal from "@/components/common/Reveal"
import { ArrowLink } from "@/components/home/Arrow"
import { HomeHeading, rhythm } from "@/components/home/Head"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { testimonials, faqs, routes } from "@/data/site"
import { featuredQuestions } from "@/data/home"

// Left: the lead patient quote on a large Articella Blue card (white Platypi text, brand pattern, an initials
// avatar for the name already in the data), with the second quote on a white card under it. Right: quick
// answers in a tint panel. Sizes follow the window height so the whole section fits in one window.
function Initials({ name, tone = "blue" }) {
  const letters = name
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
  return (
    <span
      aria-hidden="true"
      className={`grid size-11 shrink-0 place-items-center rounded-full font-heading text-lg ${
        tone === "blue" ? "bg-white text-primary" : "bg-primary text-primary-foreground"
      }`}
    >
      {letters}
    </span>
  )
}

export default function Feedback() {
  const items = featuredQuestions.map((q) => faqs.find((f) => f.q === q)).filter(Boolean)
  const [lead, ...rest] = testimonials
  const [open0] = useState(() => (typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches ? [featuredQuestions[0]] : []))
  return (
    <section aria-labelledby="feedback-title" className={`bg-background ${rhythm}`}>
      <Container>
        <h2 id="feedback-title" className="sr-only">
          In patients' words
        </h2>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-8">
          <div className="flex flex-col gap-5 lg:gap-6">
            <Reveal>
              <figure
                className="relative isolate overflow-hidden rounded-[2rem] bg-primary p-7 text-primary-foreground sm:p-10 lg:p-[clamp(1.75rem,4.5vh,3rem)]"
                style={{ boxShadow: "0 44px 80px -50px color-mix(in srgb, var(--primary) 75%, transparent)" }}
              >
                <Pattern tone="blue" aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-20 -z-10 w-72 opacity-[0.09]" />
                <span aria-hidden="true" className="block font-heading text-[4.5rem] leading-[0.55] text-white/40 lg:text-[clamp(3.5rem,9vh,6rem)]">
                  &ldquo;
                </span>
                <blockquote className="mt-3 text-balance font-heading text-[1.6rem] leading-[1.25] text-white sm:text-3xl lg:text-[clamp(1.6rem,min(2.6vw,4.4vh),2.5rem)]">
                  {lead.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 text-base text-white/90 lg:mt-[clamp(1rem,3vh,1.75rem)]">
                  <Initials name={lead.who} />
                  <span>
                    <span className="block text-lg font-medium text-white">{lead.who}</span>
                    {lead.where}
                  </span>
                </figcaption>
              </figure>
            </Reveal>
            {rest.map((t, i) => (
              <Reveal key={t.who} delay={(i + 1) * 100}>
                <figure className="flex gap-4 rounded-3xl border border-border bg-white p-6 lg:py-[clamp(1rem,2.6vh,1.5rem)]">
                  <span aria-hidden="true" className="font-heading text-5xl leading-[0.8] text-primary/35">
                    &ldquo;
                  </span>
                  <div>
                    <blockquote className="font-heading text-lg leading-snug text-primary sm:text-xl">{t.quote}</blockquote>
                    <figcaption className="mt-3 flex items-center gap-3 text-base text-foreground/80">
                      <Initials name={t.who} tone="light" />
                      <span>
                        <span className="font-medium text-foreground">{t.who}</span>, {t.where}
                      </span>
                    </figcaption>
                  </div>
                </figure>
              </Reveal>
            ))}
          </div>

          <div className="rounded-[2rem] bg-tint p-6 sm:p-8 lg:flex lg:flex-col lg:justify-center lg:p-[clamp(1.5rem,4vh,2.5rem)]">
            <HomeHeading title="Quick answers" lead="The questions we hear most before a first visit." maxW="max-w-none" />
            <Reveal delay={100} className="mt-6 lg:mt-[clamp(1rem,3vh,1.75rem)]">
              <Accordion className="gap-3" defaultValue={open0}>
                {items.map((f) => (
                  <AccordionItem key={f.q} value={f.q} className="rounded-2xl border border-border bg-white px-5 not-last:border-b data-open:border-primary">
                    <AccordionTrigger className="min-h-14 items-center py-3 font-heading text-lg text-primary hover:no-underline sm:text-xl">
                      {f.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-base leading-relaxed text-foreground/80">{f.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
            <ArrowLink to={routes.faqs} className="mt-4 lg:mt-[clamp(0.5rem,1.6vh,1.25rem)]">
              See all FAQs
            </ArrowLink>
          </div>
        </div>
      </Container>
    </section>
  )
}
