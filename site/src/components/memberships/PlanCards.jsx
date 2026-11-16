import Icon from "@/components/brand/Icon"
import BrandButton from "@/components/common/BrandButton"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { practice } from "@/data/site"
import { cn } from "@/lib/utils"

export const money = (n) => `$${Number(n).toLocaleString("en-US")}`

export function CheckList({ items, inverse, className }) {
  return (
    <ul className={cn("space-y-3", className)}>
      {items.map((t) => (
        <li key={t} className="flex gap-3 text-base leading-snug">
          <span
            className={cn(
              "mt-0.5 grid size-5 shrink-0 place-items-center rounded-full",
              inverse ? "bg-white/15 text-white" : "bg-secondary text-primary"
            )}
          >
            <Icon name="check" size={14} strokeWidth={2} />
          </span>
          <span>{t}</span>
        </li>
      ))}
    </ul>
  )
}

// Closed-by-default disclosures. `sections` are { title, items?: string[], text?: string[] }.
export function Disclosures({ sections = [], dark, className }) {
  if (!sections.length) return null
  return (
    <Accordion className={cn("border-t", dark ? "border-white/25" : "border-border", className)}>
      {sections.map((s) => (
        <AccordionItem key={s.title} value={s.title} className={cn("border-b", dark ? "border-white/25" : "border-border")}>
          <AccordionTrigger
            className={cn(
              "min-h-12 items-center gap-3 rounded-none border-0 py-3 text-base font-medium hover:no-underline",
              dark
                ? "text-white **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-white"
                : "text-primary **:data-[slot=accordion-trigger-icon]:size-5 **:data-[slot=accordion-trigger-icon]:text-primary"
            )}
          >
            {s.title}
          </AccordionTrigger>
          <AccordionContent className={cn("pb-4 text-base leading-relaxed", dark ? "text-white" : "text-foreground/85")}>
            {s.text && (
              <div className="space-y-3">
                {s.text.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
            )}
            {s.items && <CheckList items={s.items} inverse={dark} className={s.text ? "mt-4" : undefined} />}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

// The one filled button plus one quiet link every card ends with.
export function CardActions({ dark, onAsk, askLabel = "Ask About This Option", className }) {
  return (
    <div className={cn("flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center sm:gap-3", className)}>
      <BrandButton variant={dark ? "inverse" : "solid"} onClick={onAsk} className="w-full sm:w-auto">
        {askLabel}
      </BrandButton>
      <BrandButton variant="quiet" href={practice.phoneHref} className={cn("w-full sm:w-auto", dark && "text-white")}>
        Call or text the office
      </BrandButton>
    </div>
  )
}

// A short list of prices (family tiers, student package options).
// stacked: label on one line, price and period below. Otherwise label left, price right.
export function PriceTiers({ tiers, stacked, dark, className }) {
  return (
    <ul className={cn("divide-y", dark ? "divide-white/25" : "divide-border", className)}>
      {tiers.map((t) =>
        stacked ? (
          <li key={t.label} className="py-3 first:pt-0 last:pb-0">
            <p className={cn("text-base font-medium", dark ? "text-white" : "text-foreground")}>{t.label}</p>
            <p className="mt-1 flex flex-wrap items-baseline gap-x-2">
              <span className={cn("font-heading text-4xl leading-none", dark ? "text-white" : "text-primary")}>{money(t.price)}</span>
              <span className={cn("text-base", dark ? "text-white/90" : "text-foreground/80")}>{t.period}</span>
            </p>
          </li>
        ) : (
          <li key={t.label} className="flex items-baseline justify-between gap-4 py-3 first:pt-0 last:pb-0">
            <span className={cn("text-base", dark ? "text-white" : "text-foreground")}>{t.label}</span>
            <span className="shrink-0 text-right">
              <span className={cn("font-heading text-3xl leading-none", dark ? "text-white" : "text-primary")}>{money(t.price)}</span>
              <span className={cn("ml-1.5 text-base", dark ? "text-white/90" : "text-foreground/80")}>{t.period}</span>
            </span>
          </li>
        )
      )}
    </ul>
  )
}

// One compact card: kind, name, price (or a tier list), small detail lines, one summary line,
// three headline inclusions, then closed disclosures. The buttons are pinned to the card bottom
// so a pair of cards ends on the same line. `dark` renders the card in Articella Blue.
export default function PlanCard({
  plan,
  title,
  tiers,
  stackedTiers,
  details = [],
  summary,
  summaryIcon = "calendar",
  headline = [],
  sections = [],
  dark,
  onAsk,
  askLabel,
}) {
  const muted = dark ? "text-white/90" : "text-foreground/80"
  return (
    <article
      className={cn(
        "flex h-full flex-col rounded-2xl border-2 border-primary p-6 transition duration-300 hover:-translate-y-0.5 sm:p-8",
        dark ? "bg-primary text-primary-foreground" : "bg-background"
      )}
    >
      {plan.kind && <p className={cn("text-base font-medium", muted)}>{plan.kind}</p>}
      <h3 className={cn("mt-1 text-2xl sm:text-3xl", dark ? "text-white" : "text-primary")}>{title ?? plan.name}</h3>

      {tiers ? (
        <PriceTiers tiers={tiers} stacked={stackedTiers} dark={dark} className="mt-5" />
      ) : (
        <p className="mt-5 flex items-baseline gap-2">
          <span className={cn("font-heading text-6xl leading-none sm:text-7xl", dark ? "text-white" : "text-primary")}>
            <span className="mr-1 align-top text-3xl sm:text-4xl">$</span>
            {Number(plan.price).toLocaleString("en-US")}
          </span>
          <span className={cn("text-lg", muted)}>{plan.period}</span>
        </p>
      )}

      {details.length > 0 && (
        <ul className={cn("mt-3 space-y-1 text-base", muted)}>
          {details.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      )}

      {summary && (
        <p className={cn("mt-4 flex items-start gap-2 text-[1.0625rem] font-medium", dark ? "text-white" : "text-foreground")}>
          <Icon name={summaryIcon} size={20} className="mt-0.5 shrink-0" />
          <span>{summary}</span>
        </p>
      )}
      {headline.length > 0 && (
        <>
          <div className={cn("my-5 h-px", dark ? "bg-white/25" : "bg-border")} />
          <CheckList items={headline} inverse={dark} />
        </>
      )}

      <Disclosures sections={sections} dark={dark} className="mt-5" />

      <CardActions dark={dark} onAsk={onAsk} askLabel={askLabel} className="mt-auto pt-7" />
    </article>
  )
}
