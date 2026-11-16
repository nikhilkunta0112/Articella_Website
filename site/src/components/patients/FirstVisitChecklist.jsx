import { useEffect, useState } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import Icon from "@/components/brand/Icon"
import BrandButton from "@/components/common/BrandButton"
import { checklistItems } from "@/data/patients"
import { cn } from "@/lib/utils"

const KEY = "articella-first-visit-checklist"

function load() {
  try {
    const raw = window.localStorage.getItem(KEY)
    const parsed = raw ? JSON.parse(raw) : {}
    return parsed && typeof parsed === "object" ? parsed : {}
  } catch {
    return {}
  }
}

// Visual aid only. State stays in this browser (optional localStorage). Nothing is sent anywhere.
export default function FirstVisitChecklist() {
  const [checked, setChecked] = useState({})
  useEffect(() => setChecked(load()), [])

  const save = (next) => {
    setChecked(next)
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next))
    } catch {
      /* storage unavailable: the checklist still works for this visit */
    }
  }
  const toggle = (id, value) => save({ ...checked, [id]: !!value })

  const total = checklistItems.length
  const done = checklistItems.filter((i) => checked[i.id]).length
  const pct = Math.round((done / total) * 100)

  return (
    <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-14">
      <div>
        <div className="rounded-2xl border-2 border-primary bg-white p-6 sm:p-8 lg:sticky lg:top-28">
          <p className="font-heading text-6xl leading-none text-primary" aria-live="polite">
            {done} of {total}
            <span className="ml-3 text-[1.0625rem] font-sans text-foreground">ready</span>
          </p>
          <div
            role="progressbar"
            aria-label="First visit items ready"
            aria-valuemin={0}
            aria-valuemax={total}
            aria-valuenow={done}
            aria-valuetext={`${done} of ${total} items ready`}
            className="mt-6 h-2.5 w-full overflow-hidden rounded-full bg-primary/20 ring-1 ring-primary/30"
          >
            <div className="h-full rounded-full bg-primary transition-[width] duration-300" style={{ width: `${pct}%` }} />
          </div>
          <p className="mt-5 text-[1.0625rem] text-foreground">
            {done === total
              ? "Everything is gathered. You are ready for your first visit."
              : "Tick each item as you gather it."}
          </p>
          <p className="mt-5 border-t border-border pt-5 text-base text-foreground/80">
            This checklist is only a visual aid in your browser. Nothing you tick is sent to the clinic, and no health
            information is collected.
          </p>
          {done > 0 && (
            <BrandButton variant="quiet" size="sm" className="mt-3 -ml-1 min-h-11 text-base" onClick={() => save({})}>
              Clear the checklist
            </BrandButton>
          )}
        </div>
      </div>

      <ul className="grid gap-4 lg:gap-[clamp(0.6rem,1.6vh,1rem)]" aria-label="First visit checklist">
        {checklistItems.map((item) => {
          const on = !!checked[item.id]
          return (
            <li key={item.id}>
              <Label
                className={cn(
                  "flex min-h-14 cursor-pointer items-start gap-4 rounded-2xl border-2 bg-white p-5 text-base leading-normal font-normal transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-primary sm:items-center sm:gap-5 sm:p-6 lg:py-[clamp(0.9rem,2.2vh,1.5rem)]",
                  on ? "border-primary" : "border-border"
                )}
              >
                <Checkbox
                  checked={on}
                  onCheckedChange={(v) => toggle(item.id, v)}
                  className="mt-1 size-7 rounded-md border-primary/70 sm:mt-0"
                />
                <span
                  className={cn(
                    "hidden size-12 shrink-0 items-center justify-center rounded-full sm:flex",
                    on ? "bg-primary text-primary-foreground" : "bg-tint text-primary"
                  )}
                  aria-hidden="true"
                >
                  <Icon name={item.icon} size={24} />
                </span>
                <span className="grid min-w-0 flex-1 gap-1">
                  <span className="font-heading text-xl text-primary sm:text-2xl">{item.title}</span>
                  <span className="text-[1.0625rem] text-foreground/80">{item.text}</span>
                  <span className="mt-1 inline-flex w-fit rounded-full bg-tint px-3 py-1 text-base font-medium text-primary sm:hidden">
                    {item.helper}
                  </span>
                </span>
                <span className="hidden max-w-[11rem] shrink-0 rounded-full bg-tint px-4 py-2 text-center text-base leading-snug font-medium text-primary sm:block">
                  {item.helper}
                </span>
              </Label>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
