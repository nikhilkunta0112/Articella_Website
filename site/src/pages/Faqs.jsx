import { useMemo, useState } from "react"
import PageHero from "@/components/common/PageHero"
import { Section, SectionHeading } from "@/components/common/Section"
import Reveal from "@/components/common/Reveal"
import BrandButton from "@/components/common/BrandButton"
import PageCta from "@/components/patients/PageCta"
import ChipGroup from "@/components/patients/ChipGroup"
import Icon from "@/components/brand/Icon"
import ResourceLinks from "@/components/resources/ResourceLinks"
import Actions from "@/components/resources/Actions"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { faqs, practice, routes, images } from "@/data/site"
import { faqTopics, extraFaqs, askOfficeQuestions } from "@/data/resources"
import { cn } from "@/lib/utils"

const topicOptions = faqTopics.map((t) => ({ id: t, label: t }))
const allFaqs = [...faqs, ...extraFaqs].map((f, i) => ({ ...f, id: `faq-${i}` }))

function AskOffice({ compact }) {
  return (
    <Actions className={cn(compact && "mt-5")}>
      <BrandButton href={practice.phoneHref} icon="phone" iconPosition="start" className="w-full sm:w-auto">
        Call {practice.phone}
      </BrandButton>
      <BrandButton variant="outline" href={practice.smsHref} icon="message" iconPosition="start" className="w-full sm:w-auto">
        Text the office
      </BrandButton>
    </Actions>
  )
}

export default function Faqs() {
  const [query, setQuery] = useState("")
  const [topic, setTopic] = useState("All")

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return allFaqs.filter(
      (f) =>
        (topic === "All" || f.topic === topic) &&
        (!q || f.q.toLowerCase().includes(q) || f.a.toLowerCase().includes(q))
    )
  }, [query, topic])

  const n = results.length
  const countText =
    n === 0
      ? "No questions match"
      : `Showing ${n} of ${allFaqs.length} questions${topic !== "All" ? ` in ${topic}` : ""}${query.trim() ? ` for "${query.trim()}"` : ""}`

  return (
    <>
      <PageHero
        title="Frequently asked questions"
        lead="Quick answers about booking, your first visit, coverage and the patient portal. For anything that depends on your own plan or health, the office is a call or text away."
        image={images.faqsHero}
        imageAlt="A friendly care team member at a front desk, ready to help"
        actions={
          <>
            <BrandButton href={practice.phoneHref} icon="phone" iconPosition="start" className="h-[52px] text-base">
              Call {practice.phone}
            </BrandButton>
            <BrandButton variant="outline" href={practice.smsHref} icon="message" iconPosition="start" className="h-[52px] text-base">
              Text the office
            </BrandButton>
          </>
        }
      />
      <ResourceLinks current={routes.faqs} />

      <Section className="py-14 sm:py-20 lg:py-[clamp(2.5rem,8vh,6rem)]">
        <div className="mx-auto max-w-3xl">
          <Reveal>
            <Label htmlFor="faq-search" className="mb-2 text-base font-medium text-primary">
              Search the questions
            </Label>
            <div className="relative">
              <Icon name="search" size={22} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-primary" />
              <Input
                id="faq-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Try insurance, telehealth or parking"
                autoComplete="off"
                className="h-14 rounded-xl bg-white pl-12 text-base md:text-base"
              />
            </div>

            <ChipGroup
              label="Filter questions by topic"
              options={topicOptions}
              value={topic}
              onChange={setTopic}
              className="mt-5"
            />
            <p aria-live="polite" className="mt-5 text-base text-foreground/80">
              {countText}
            </p>
          </Reveal>

          {n > 0 ? (
            <Accordion className="mt-8 gap-3" key={`${topic}|${query}`}>
              {results.map((f) => (
                <AccordionItem
                  key={f.id}
                  value={f.id}
                  className="rounded-2xl border border-border bg-white px-5 transition-colors data-open:border-primary/60 sm:px-7"
                >
                  <AccordionTrigger className="items-center gap-4 border-0 py-5 text-lg font-medium text-primary hover:no-underline sm:text-xl">
                    <span className="font-heading">{f.q}</span>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-[1.0625rem] text-foreground/80">
                    <p>{f.a}</p>
                    <p className="mt-3 text-base">{f.topic}</p>
                    {askOfficeQuestions.has(f.q) && (
                      <div className="mt-5 rounded-xl bg-tint p-5">
                        <p className="font-medium text-foreground">
                          This depends on your plan or needs. The office can give you a clear answer.
                        </p>
                        <AskOffice compact />
                      </div>
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="mt-8 rounded-2xl border border-border bg-tint p-8 text-center sm:p-10">
              <h2 className="text-2xl text-primary">We could not find a match</h2>
              <p className="mx-auto mt-3 max-w-md text-foreground/80">
                Try a different word or choose All topics. You can also call or text the office and we will help.
              </p>
              <Actions className="mt-6 justify-center [&>*]:max-sm:w-full">
                <BrandButton href={practice.phoneHref} icon="phone" iconPosition="start">
                  Call the office
                </BrandButton>
                <BrandButton
                  variant="outline"
                  onClick={() => {
                    setQuery("")
                    setTopic("All")
                  }}
                >
                  Clear search
                </BrandButton>
              </Actions>
            </div>
          )}
        </div>
      </Section>

      <Section tone="tint" className="py-14 sm:py-20 lg:py-[clamp(2.5rem,8vh,6rem)]">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
          <SectionHeading
            className="mb-0 lg:mb-0"
            title="Ask the office"
            lead="Some answers depend on your own insurance plan or medical needs. Rather than guess, call or text the front desk and a member of the team will help."
            maxW="max-w-xl"
          />
          <Reveal delay={100}>
            <div className="rounded-2xl border border-border bg-white p-7 sm:p-9">
              <ul className="space-y-4 text-[1.0625rem] text-foreground/80">
                <li className="flex gap-3">
                  <Icon name="clock" size={20} className="mt-1 shrink-0 text-primary" />
                  <span>
                    {practice.hours[0].days}, {practice.hours[0].time}. {practice.hours[1].days}, {practice.hours[1].time}.
                  </span>
                </li>
                <li className="flex gap-3">
                  <Icon name="shield" size={20} className="mt-1 shrink-0 text-primary" />
                  <span>Please do not include sensitive medical information in a text message.</span>
                </li>
              </ul>
              <AskOffice compact />
            </div>
          </Reveal>
        </div>
      </Section>

      <PageCta title="Ready when you are." text="Book a visit online, or call or text the office with anything the answers above did not cover." />
    </>
  )
}
