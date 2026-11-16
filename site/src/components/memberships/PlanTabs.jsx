import { useState } from "react"
import { Section } from "@/components/common/Section"
import Reveal from "@/components/common/Reveal"
import Icon from "@/components/brand/Icon"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useBooking } from "@/components/layout/BookingProvider"
import { pricing } from "@/data/site"
import { visitors } from "@/data/plans"
import { singleVisitCopy } from "@/data/care"
import PlanCard, { Disclosures, money } from "@/components/memberships/PlanCards"
import {
  SHOW_CARRIED_OVER_PLANS,
  CarriedOverBlock,
  CouplePlanCard,
  FamilyPlanCard,
  StudentPackageCard,
  VisitorPlans,
  TelehealthCard,
  AddOnTable,
  CorporatePrompt,
} from "@/components/memberships/CarriedOver"

// Phones: a full-width segmented control (blue outline, 48px segments in two columns, filled active
// segment). An odd last segment spans the full width. sm and up: separate pills.
const listClass =
  "h-auto group-data-horizontal/tabs:h-auto w-full items-stretch justify-start gap-1 rounded-xl border-2 border-primary bg-background p-1 max-sm:grid max-sm:grid-cols-2 sm:w-fit sm:flex-wrap sm:gap-3 sm:rounded-none sm:border-0 sm:bg-transparent sm:p-0"
const triggerClass =
  "h-12 min-h-12 min-w-0 flex-1 gap-2 whitespace-normal rounded-lg border-2 border-transparent bg-transparent px-2 py-1 text-center text-[0.9375rem] leading-tight font-semibold text-primary hover:text-primary data-active:border-primary data-active:bg-primary data-active:text-primary-foreground data-active:shadow-none data-active:hover:text-primary-foreground dark:data-active:bg-primary sm:flex-none sm:rounded-full sm:border-border sm:bg-background sm:px-6 sm:text-base sm:hover:border-primary sm:data-active:border-primary sm:data-active:bg-primary sm:data-active:text-primary-foreground [&_svg:not([class*='size-'])]:size-5 max-sm:[&_svg]:hidden"

const panelIntro = "max-w-2xl text-lg text-foreground/80"
const panelClass = "space-y-6 text-base lg:space-y-8"
const cardGrid = "grid gap-6 lg:grid-cols-2 lg:gap-8"

// ---- New pricing model (site.js) ----
const [essential, premier] = pricing.memberships
// Inclusions both plans share are shown once, in one disclosure.
const both = essential.includes.filter((t) => premier.includes.includes(t))
const premierOnly = premier.includes.filter((t) => !essential.includes.includes(t))
// The screening test list is the sentence after the colon in Premier's first note.
const [premierTestIntro, premierTestList] = premier.extra[0].split(": ")
const premierTests = premierTestList.replace(/[.]$/, "").split(", ")

const essentialCard = {
  headline: [both[0], both[1], essential.extra[0]],
  sections: [{ title: "Good to know", text: essential.extra.slice(1) }],
}
const premierCard = {
  headline: [both[0], both[1], premierOnly[0]],
  sections: [
    { title: "The annual screening includes these tests", text: [premierTestIntro + "."], items: premierTests },
    { title: "Good to know", text: premier.extra.slice(1) },
  ],
}

const [sick, wellness] = pricing.singleVisits
const student = pricing.student
// `pick` chooses which inclusions are the three headline ones (default: the first three).
const visitCard = (v, pick = [0, 1, 2]) => ({
  headline: pick.map((i) => v.includes[i]),
  sections: [
    { title: "More that is included", items: v.includes.filter((_, i) => !pick.includes(i)) },
    { title: "May cost more", text: v.extra },
  ],
})

export default function PlanTabs() {
  const { open } = useBooking()
  const [tab, setTab] = useState("individuals")

  // Everything that comes from plans.js disappears when SHOW_CARRIED_OVER_PLANS is false.
  const tabs = [
    { value: "individuals", label: "Individuals and Family", icon: "user" },
    { value: "students", label: "Students", icon: "bookOpen" },
    ...(SHOW_CARRIED_OVER_PLANS && visitors.length ? [{ value: "visitors", label: "Visitors", icon: "pin" }] : []),
    { value: "single", label: "Single Visits", icon: "stethoscope" },
  ]
  const lastOdd = tabs.length % 2 === 1

  return (
    <Section id="plans" tone="tint" className="scroll-mt-20 py-14 sm:py-16 lg:py-[clamp(2.5rem,7.5vh,5rem)]">
      <Reveal>
        <h2 className="max-w-2xl text-3xl text-primary sm:text-4xl lg:text-[2.75rem]">Choose what fits</h2>
        <p className="mt-3 max-w-2xl text-lg text-foreground/80">Pick a tab to see only the options that apply to you.</p>
      </Reveal>

      <Tabs value={tab} onValueChange={setTab} className="mt-6 gap-6 lg:mt-8 lg:gap-8">
        <TabsList activateOnFocus aria-label="Membership and visit options" className={listClass}>
          {tabs.map((t, i) => (
            <TabsTrigger
              key={t.value}
              value={t.value}
              className={`${triggerClass}${lastOdd && i === tabs.length - 1 ? " max-sm:col-span-2" : ""}`}
            >
              <Icon name={t.icon} />
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* INDIVIDUALS AND FAMILY */}
        <TabsContent value="individuals" className={panelClass}>
          <p className={panelIntro}>
            Monthly concierge memberships for people who want ongoing, easy access to their physician.
          </p>
          <div className={cardGrid}>
            <PlanCard
              plan={essential}
              summary={essential.visits}
              headline={essentialCard.headline}
              sections={essentialCard.sections}
              onAsk={open}
            />
            <PlanCard
              plan={premier}
              summary={premier.visits}
              headline={premierCard.headline}
              sections={premierCard.sections}
              dark
              onAsk={open}
            />
          </div>

          <Disclosures
            className="rounded-2xl border bg-background px-5 sm:px-8"
            sections={[{ title: "What both Essential Care and Premier Care include", items: both }]}
          />

          <p className="flex items-start gap-3 rounded-xl border border-border bg-background p-4 text-[1.0625rem] text-foreground">
            <Icon name="clock" size={22} className="mt-0.5 shrink-0 text-primary" />
            <span>
              <span className="font-semibold">Cancellation. </span>
              {pricing.membershipNote}
            </span>
          </p>

          {SHOW_CARRIED_OVER_PLANS && (
            <CarriedOverBlock title="Couple and family plans">
              <div className={`${cardGrid} items-stretch`}>
                <CouplePlanCard onAsk={open} />
                <FamilyPlanCard onAsk={open} />
              </div>
            </CarriedOverBlock>
          )}
        </TabsContent>

        {/* STUDENTS */}
        <TabsContent value="students" className={panelClass}>
          <p className={panelIntro}>
            Lower-priced options for students and senior citizens. Student options need proof of enrollment.
          </p>
          <div className={`${cardGrid} items-start`}>
            <PlanCard
              plan={student}
              summary="For one new health concern, at a lower price for students and senior citizens."
              summaryIcon="stethoscope"
              headline={visitCard(student).headline}
              sections={visitCard(student).sections}
              onAsk={open}
            />
            <div className="space-y-4 rounded-2xl border border-border bg-background p-6 sm:p-8">
              <h3 className="text-2xl text-primary">Good to know</h3>
              <ul className="space-y-3 text-base leading-snug text-foreground/85">
                <li className="flex gap-3">
                  <Icon name="check" size={18} className="mt-0.5 shrink-0 text-primary" />
                  <span>Student options need proof of enrollment.</span>
                </li>
                <li className="flex gap-3">
                  <Icon name="check" size={18} className="mt-0.5 shrink-0 text-primary" />
                  <span>Please ask Articella to confirm who qualifies before you book.</span>
                </li>
                <li className="flex gap-3">
                  <Icon name="check" size={18} className="mt-0.5 shrink-0 text-primary" />
                  <span>The standard sick visit is {money(sick.price)}.</span>
                </li>
              </ul>
              <button
                type="button"
                onClick={() => setTab("single")}
                className="inline-flex min-h-11 items-center gap-2 rounded-md font-medium text-primary underline-offset-4 hover:underline"
              >
                See single visits
                <Icon name="arrowRight" size={18} />
              </button>
            </div>
          </div>

          {SHOW_CARRIED_OVER_PLANS && (
            <CarriedOverBlock title="College student care package">
              <div className="max-w-2xl">
                <StudentPackageCard onAsk={open} />
              </div>
            </CarriedOverBlock>
          )}
        </TabsContent>

        {/* VISITORS */}
        {SHOW_CARRIED_OVER_PLANS && visitors.length > 0 && (
          <TabsContent value="visitors" className={panelClass}>
            <p className={panelIntro}>
              Concierge care for people visiting for a few months, for one person or for a couple.
            </p>
            <CarriedOverBlock title="Visitor concierge plans">
              <VisitorPlans onAsk={open} />
            </CarriedOverBlock>
          </TabsContent>
        )}

        {/* SINGLE VISITS */}
        <TabsContent value="single" className={panelClass}>
          <p className={panelIntro}>
            Pay for one visit at a time, without a membership. Listed prices are the base price for the visit.
          </p>
          <div className={cardGrid}>
            <PlanCard
              plan={sick}
              summary={singleVisitCopy.sick.forText}
              summaryIcon="stethoscope"
              headline={visitCard(sick).headline}
              sections={visitCard(sick).sections}
              onAsk={open}
            />
            <PlanCard
              plan={wellness}
              summary={singleVisitCopy.wellness.forText}
              summaryIcon="clipboard"
              headline={visitCard(wellness, [0, 4, 5]).headline}
              sections={visitCard(wellness, [0, 4, 5]).sections}
              onAsk={open}
            />
          </div>
          <div className="flex flex-col gap-1 rounded-2xl bg-background p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-6">
            <p className="max-w-2xl text-lg text-foreground">
              A student or senior citizen sick visit is {money(sick.price - student.price)} lower, at {money(student.price)}.
            </p>
            <button
              type="button"
              onClick={() => setTab("students")}
              className="inline-flex min-h-11 items-center gap-2 self-start rounded-md font-medium text-primary underline-offset-4 hover:underline sm:self-auto"
            >
              See students and seniors
              <Icon name="arrowRight" size={18} />
            </button>
          </div>

          {SHOW_CARRIED_OVER_PLANS && (
            <CarriedOverBlock title="Telehealth and add-on prices">
              <div className={`${cardGrid} items-stretch`}>
                <TelehealthCard onAsk={open} />
                <AddOnTable />
              </div>
              <CorporatePrompt />
            </CarriedOverBlock>
          )}
        </TabsContent>
      </Tabs>
    </Section>
  )
}
