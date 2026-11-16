import Icon from "@/components/brand/Icon"
import BrandButton from "@/components/common/BrandButton"
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table"
import {
  SHOW_CARRIED_OVER_PLANS,
  carriedOverNote,
  couple,
  family,
  students,
  visitors,
  telehealth,
  addOnPrices,
  corporate,
} from "@/data/plans"
import { routes } from "@/data/site"
import PlanCard, { CardActions, Disclosures, money } from "@/components/memberships/PlanCards"

export { SHOW_CARRIED_OVER_PLANS }

// A clearly separated block for plans that come from the current articella.com. The carried-over
// note is shown once, at the top of the block.
export function CarriedOverBlock({ title, children }) {
  return (
    <div className="mt-14 border-t-2 border-border pt-10 sm:mt-16 lg:mt-20 lg:pt-12">
      <h3 className="text-2xl text-primary sm:text-3xl lg:text-4xl">{title}</h3>
      <p className="mt-4 flex max-w-3xl items-start gap-3 rounded-xl border border-border bg-background p-4 text-[1.0625rem] text-foreground">
        <Icon name="file" size={22} className="mt-0.5 shrink-0 text-primary" />
        <span>{carriedOverNote}</span>
      </p>
      <div className="mt-6 lg:mt-8">{children}</div>
    </div>
  )
}

const pick = (list, ...idx) => idx.map((i) => list.at(i))

export function CouplePlanCard({ onAsk }) {
  return (
    <PlanCard
      plan={{ kind: couple.name, price: couple.price, period: couple.period }}
      title="Couple plan"
      details={[couple.annual, couple.registration, couple.extraVisit]}
      summary={couple.visits}
      headline={[...pick(couple.includes, -1, 0, 1)]}
      sections={[
        { title: "Everything included", items: couple.includes },
        { title: "Annual screening labs", items: couple.screening },
      ]}
      onAsk={onAsk}
    />
  )
}

export function FamilyPlanCard({ onAsk }) {
  return (
    <PlanCard
      plan={{ kind: "Monthly price for each family member" }}
      title={family.name}
      tiers={family.tiers}
      summary={family.visits}
      details={[family.extraVisit, family.addOns]}
      headline={[...pick(family.includes, -1, 0, 1)]}
      sections={[
        { title: "Everything included", items: family.includes },
        { title: "Annual screening labs", items: family.screening },
      ]}
      onAsk={onAsk}
    />
  )
}

export function StudentPackageCard({ onAsk }) {
  return (
    <PlanCard
      plan={{ kind: "For college students" }}
      title={students.name}
      tiers={students.options}
      stackedTiers
      summary={students.extraVisit}
      summaryIcon="stethoscope"
      headline={students.includes.slice(0, 3)}
      sections={[
        { title: "Everything included", text: [students.addOns + "."], items: students.includes },
        { title: "Not health insurance, and what it leaves out", text: students.notes },
      ]}
      onAsk={onAsk}
    />
  )
}

// "3 months" / "individual" come from the plan's own name: "Visitor concierge, 3 months, individual".
const parseVisitor = (v) => {
  const [, duration, who] = v.name.split(", ")
  return { duration, who: who.charAt(0).toUpperCase() + who.slice(1) }
}

function VisitorCard({ v, onAsk }) {
  const { who } = parseVisitor(v)
  return (
    <article className="flex h-full flex-col rounded-2xl border-2 border-primary bg-background p-5 transition duration-300 hover:-translate-y-0.5 sm:p-6">
      <h4 className="flex items-center gap-2 font-heading text-xl text-primary sm:text-2xl">
        <Icon name={who === "Couple" ? "users" : "user"} size={22} />
        {who}
      </h4>
      <p className="mt-3 flex flex-wrap items-baseline gap-x-2">
        <span className="font-heading text-5xl leading-none text-primary">{money(v.price)}</span>
        <span className="text-base text-foreground/80">{v.period}</span>
      </p>
      <p className="mt-3 text-base text-foreground">{v.monthly}</p>
      <p className="mt-1 text-base text-foreground/80">{v.cancellation}</p>
      <CardActions onAsk={onAsk} className="mt-auto pt-5" />
    </article>
  )
}

// Two groups (3 months, 6 months), each a row of Individual and Couple. Compact two-by-two on
// desktop, stacked on phones. The inclusions are the same inside a group, so they are listed once.
export function VisitorPlans({ onAsk }) {
  const groups = []
  for (const v of visitors) {
    const { duration } = parseVisitor(v)
    let g = groups.find((x) => x.duration === duration)
    if (!g) groups.push((g = { duration, plans: [] }))
    g.plans.push(v)
  }
  return (
    <div className="space-y-10 lg:space-y-12">
      {groups.map((g) => (
        <div key={g.duration}>
          <h4 className="font-heading text-2xl text-primary sm:text-3xl">{`Visitor plans, ${g.duration}`}</h4>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:gap-6">
            {g.plans.map((v) => (
              <VisitorCard key={v.id} v={v} onAsk={onAsk} />
            ))}
          </div>
          <Disclosures
            className="mt-4 rounded-xl border bg-background px-5"
            sections={[{ title: `What the ${g.duration} plans include`, items: g.plans[0].includes }]}
          />
        </div>
      ))}
    </div>
  )
}

export function TelehealthCard({ onAsk }) {
  return (
    <PlanCard
      plan={{ kind: "Video visit with a provider", price: telehealth.price, period: telehealth.period }}
      title={telehealth.name}
      summary={telehealth.note}
      summaryIcon="video"
      headline={telehealth.includes}
      sections={[{ title: "Often a good fit for", items: telehealth.goodFor }]}
      onAsk={onAsk}
    />
  )
}

export function AddOnTable() {
  return (
    <div className="h-full rounded-2xl border-2 border-primary bg-background p-6 sm:p-8">
      <h3 className="text-2xl text-primary sm:text-3xl">Add-on tests and services</h3>
      <p className="mt-2 text-base text-foreground/80">Current published add-on prices.</p>
      <Table className="mt-4 text-base">
        <caption className="sr-only">Current published add-on test and service prices</caption>
        <TableBody>
          {addOnPrices.map((a) => (
            <TableRow key={a.label} className="border-border">
              <TableCell className="whitespace-normal px-0 py-2.5 text-foreground">{a.label}</TableCell>
              <TableCell className="whitespace-normal px-0 py-2.5 text-right font-medium text-primary">{a.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export function CorporatePrompt() {
  return (
    <div className="mt-8 flex flex-col gap-1 rounded-2xl bg-secondary p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6">
      <p className="max-w-3xl text-base text-foreground">
        <span className="font-semibold text-primary">{corporate.name}. </span>
        {corporate.text}
      </p>
      <BrandButton variant="quiet" to={routes.contact} icon="arrowRight" className="shrink-0 self-start sm:self-auto">
        Contact the office
      </BrandButton>
    </div>
  )
}
