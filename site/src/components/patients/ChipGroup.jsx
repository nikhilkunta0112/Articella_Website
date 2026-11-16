import { cn } from "@/lib/utils"

// Filter chips: a 2-column grid of equal 44px chips on phones, a wrapping row from sm up.
// `options` are { id, label }. Pressed state uses aria-pressed.
export default function ChipGroup({ options, value, onChange, label, className }) {
  return (
    <div role="group" aria-label={label} className={cn("grid grid-cols-2 gap-2.5 sm:flex sm:flex-wrap", className)}>
      {options.map((o, i) => {
        const on = o.id === value
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={on}
            onClick={() => onChange(o.id)}
            className={cn(
              options.length % 2 === 1 && i === options.length - 1 && "max-sm:col-span-2",
              "inline-flex h-11 min-h-11 items-center justify-center rounded-full border-2 px-3 text-[0.9375rem] leading-tight font-medium transition-colors sm:px-5 sm:text-base",
              on
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-white text-primary hover:border-primary"
            )}
          >
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
