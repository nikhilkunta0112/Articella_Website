import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Icon from "@/components/brand/Icon"
import BrandButton from "@/components/common/BrandButton"
import Actions from "@/components/resources/Actions"
import { insurers, practice } from "@/data/site"
import { cn } from "@/lib/utils"

// Every logo sits in the same 48px box, so every card has the same structure and height.
// Medicare has no logo file: it gets a clean Platypi wordmark in the same box, never a recreated logo.
function LogoMark({ insurer, className, small }) {
  if (insurer.logo) {
    return <img src={insurer.logo} alt="" className={cn("h-12 w-full object-contain", className)} />
  }
  return (
    <span
      className={cn(
        "flex h-12 items-center justify-center font-heading font-semibold tracking-tight text-primary",
        small ? "text-lg" : "text-[1.75rem]"
      )}
    >
      {insurer.name}
    </span>
  )
}

// Searchable gallery of the six published insurers plus a guide for the selected company.
export default function InsurerGallery() {
  const [query, setQuery] = useState("")
  const [selectedId, setSelectedId] = useState(insurers[0].id)

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return q ? insurers.filter((i) => i.name.toLowerCase().includes(q)) : insurers
  }, [query])

  const selected = insurers.find((i) => i.id === selectedId) ?? insurers[0]
  const count =
    results.length === 0
      ? "No organizations match your search."
      : `Showing ${results.length} of ${insurers.length} organizations.`

  return (
    <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
      <div>
        <div className="max-w-md">
          <Label htmlFor="insurer-search" className="mb-2 text-base font-medium text-primary">
            Search by company name
          </Label>
          <div className="relative">
            <Icon name="search" size={20} className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-primary" />
            <Input
              id="insurer-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="For example, Cigna"
              autoComplete="off"
              className="h-12 bg-white pl-11 text-base md:text-base"
            />
          </div>
          <p className="mt-3 min-h-6 text-base text-muted-foreground" role="status" aria-live="polite">
            {count}
          </p>
        </div>

        {results.length > 0 ? (
          <ul className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {results.map((i) => {
              const on = i.id === selected.id
              return (
                <li key={i.id}>
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => setSelectedId(i.id)}
                    className={cn(
                      "group flex h-full min-h-[8.5rem] w-full flex-col items-center justify-center gap-4 rounded-2xl border-2 bg-white px-4 py-6 text-center transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-primary sm:min-h-[9.5rem]",
                      on ? "border-primary" : "border-border"
                    )}
                  >
                    <span className="flex h-12 w-full items-center justify-center">
                      <LogoMark insurer={i} />
                    </span>
                    <span className={cn("text-base font-medium", on ? "text-primary" : "text-foreground/80")}>
                      {i.name}
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>
        ) : (
          <div className="mt-4 rounded-2xl border border-border bg-white p-8 text-center">
            <p className="font-heading text-xl text-primary">We could not find &ldquo;{query.trim()}&rdquo;</p>
            <p className="mt-2 text-muted-foreground">
              Only the six organizations Articella has published are listed. If yours is not here, the office can still
              answer questions about your coverage.
            </p>
            <Actions className="mt-6 justify-center">
              <BrandButton href={practice.phoneHref} icon="phone" iconPosition="start">
                Call or text
              </BrandButton>
              <BrandButton variant="outline" onClick={() => setQuery("")}>
                Show all organizations
              </BrandButton>
            </Actions>
          </div>
        )}
      </div>

      <aside
        aria-live="polite"
        aria-label="Company guide"
        className="self-start rounded-2xl border border-border bg-white p-7 sm:p-9 lg:sticky lg:top-28"
      >
        <div className="flex items-center gap-4">
          <span className="flex h-16 w-28 shrink-0 items-center justify-center rounded-xl border border-border bg-white px-3">
            <LogoMark insurer={selected} small />
          </span>
          <h3 className="text-2xl text-primary sm:text-3xl">{selected.name}</h3>
        </div>

        <p className="mt-6 text-[1.0625rem]">{selected.about}</p>

        <div className="mt-6 rounded-xl bg-tint p-5">
          <p className="text-base font-medium text-muted-foreground">A good question to ask the office</p>
          <p className="mt-1 font-heading text-lg text-primary">{selected.ask}</p>
        </div>

        {selected.careful && (
          <div className="mt-5 flex gap-3 rounded-xl border border-primary/30 p-5">
            <Icon name="shieldCheck" size={24} className="mt-0.5 shrink-0 text-primary" />
            <p className="text-base">
              <strong className="font-medium text-primary">Plans differ.</strong>{" "}
              {selected.id === "medicare"
                ? "Medicare has several kinds of coverage, and Medicare Advantage plans vary by company. The office must check your specific plan, and we cannot say every Medicare plan is accepted."
                : "Ambetter offers different plans, and networks can change. The office must check your specific plan, and we cannot say every Ambetter plan is accepted."}{" "}
              Please call before you book.
            </p>
          </div>
        )}

        <p className="mt-5 text-base text-muted-foreground">
          Before booking, check the exact product, clinician, network, copay and deductible for your plan.
        </p>

        <Actions className="mt-7 [&>*]:max-sm:w-full">
          <BrandButton href={practice.phoneHref} icon="phone" iconPosition="start">
            Call the office
          </BrandButton>
          <BrandButton variant="outline" href={selected.site} icon="external">
            {selected.name} website
          </BrandButton>
        </Actions>
      </aside>
    </div>
  )
}
