import { Section } from "@/components/common/Section"
import Reveal from "@/components/common/Reveal"
import BrandButton from "@/components/common/BrandButton"
import Icon from "@/components/brand/Icon"
import Pattern from "@/components/brand/Pattern"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { useBooking } from "@/components/layout/BookingProvider"
import { practice } from "@/data/site"
import { providerExpect } from "@/data/about"

function Heading({ p, className = "" }) {
  return (
    <div className={className}>
      <h2 className="text-[1.625rem] leading-tight break-words min-[400px]:text-[1.875rem] sm:text-4xl lg:text-[2.75rem] text-primary">{p.name}</h2>
      <p className="mt-1.5 text-base text-muted-foreground sm:text-lg">
        <span className="font-medium text-foreground">{p.credentials}</span>
        <span aria-hidden="true" className="hidden sm:inline"> | </span>
        <span className="block sm:inline">{p.role}</span>
      </p>
    </div>
  )
}

// The same tint panel, pattern whisper and 4:5 face-centred crop for every clinician.
function PortraitPanel({ p, className = "", pad = "p-3 sm:p-4" }) {
  return (
    <div className={`relative overflow-hidden rounded-3xl bg-secondary ${pad} ${className}`}>
      <Pattern tone="white" className="pointer-events-none absolute -right-24 -bottom-16 h-[120%] w-auto opacity-[0.10]" />
      <img
        src={p.photo}
        alt={`Portrait of ${p.name}`}
        className="relative aspect-[4/5] w-full rounded-2xl object-cover object-[50%_18%]"
        loading="eager"
      />
    </div>
  )
}

// One filled and one outline button, equal height and full width of their column.
function Actions({ onBook, className = "" }) {
  return (
    <div className={`grid gap-3 sm:grid-cols-2 lg:grid-cols-1 ${className}`}>
      <BrandButton onClick={onBook} icon="calendar" iconPosition="start" className="w-full">
        Ask About an Appointment
      </BrandButton>
      <BrandButton variant="outline" href={practice.phoneHref} icon="phone" iconPosition="start" className="w-full">
        Call or text
      </BrandButton>
    </div>
  )
}

// One compact clinician profile: portrait, name and role, introduction, one row of focus chips, then two closed
// disclosures. Buttons sit under the portrait on desktop and at the end on phones.
export default function ProviderSection({ person: p, index }) {
  const { open } = useBooking()
  const flip = index % 2 === 1

  return (
    <Section
      id={p.id}
      tone={flip ? "tint" : "white"}
      className="scroll-mt-24 overflow-clip py-12 sm:py-16 lg:py-[clamp(2.5rem,8vh,6rem)]"
    >
      <div className={`grid items-start gap-6 lg:gap-16 ${flip ? "lg:grid-cols-[1fr_380px]" : "lg:grid-cols-[380px_1fr]"}`}>
        {/* Mobile: small portrait beside the name */}
        <div className="flex items-center gap-4 sm:gap-5 lg:hidden">
          <div className="w-[34%] max-w-[170px] flex-none">
            <PortraitPanel p={p} pad="p-1.5" />
          </div>
          <Heading p={p} className="min-w-0" />
        </div>

        {/* Desktop: sticky portrait column with the buttons beneath */}
        <Reveal className={`hidden lg:sticky lg:top-28 lg:block ${flip ? "lg:order-2" : ""}`}>
          <PortraitPanel p={p} />
          <Actions onBook={open} className="mt-5" />
        </Reveal>

        <Reveal delay={100} className={`min-w-0 lg:self-center ${flip ? "lg:order-1" : ""}`}>
          <Heading p={p} className="hidden lg:block" />

          <p className="text-lg text-foreground/85 lg:mt-6 lg:text-xl lg:leading-snug">{p.intro}</p>

          <ul aria-label="Focus areas" className="mt-5 flex flex-wrap gap-1.5 sm:gap-2">
            {p.focus.map((f) => (
              <li key={f} className="rounded-full bg-secondary px-3.5 py-1.5 text-base font-medium text-primary">
                {f}
              </li>
            ))}
          </ul>

          <Accordion className="mt-6 border-t border-border">
            {providerExpect[p.id] && (
              <AccordionItem value="expect" className="border-b border-border">
                <AccordionTrigger className="min-h-14 items-center px-0 py-3 text-lg font-medium text-primary sm:text-xl">
                  What to expect
                </AccordionTrigger>
                <AccordionContent className="text-base text-foreground/85 sm:text-lg">
                  <p>{providerExpect[p.id]}</p>
                </AccordionContent>
              </AccordionItem>
            )}
            <AccordionItem value="background" className="border-b border-border">
              <AccordionTrigger className="min-h-14 items-center px-0 py-3 text-lg font-medium text-primary sm:text-xl">
                Education and background
              </AccordionTrigger>
              <AccordionContent className="text-base text-foreground/85 sm:text-lg">
                <ul className="space-y-3">
                  {p.education.map((e) => (
                    <li key={e.label} className="flex gap-3">
                      <Icon name="check" size={22} className="mt-0.5 flex-none text-primary" />
                      <span>
                        <span className="font-medium text-foreground">{e.label}:</span> {e.value}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-5 space-y-4 border-l-4 border-primary pl-5">
                  {p.bio.map((b) => (
                    <p key={b}>{b}</p>
                  ))}
                </div>
                {p.note && (
                  <p className="mt-5 flex gap-3 text-base text-muted-foreground">
                    <Icon name="pin" size={20} className="mt-0.5 flex-none text-primary" />
                    <span>{p.note} The office can confirm this when you call or book.</span>
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Actions onBook={open} className="mt-6 lg:hidden" />
        </Reveal>
      </div>
    </Section>
  )
}
