import { Link, useLocation } from "react-router-dom"
import { Container } from "@/components/common/Section"
import ScrollRow from "@/components/resources/ScrollRow"
import { resourcesNav } from "@/data/site"
import { cn } from "@/lib/utils"

// Link strip to the Patient Resources pages. A 2-column grid of equal 44px pills on phones (the
// fifth spans both columns), one centered row from sm up. The current page is filled with Articella Blue.
export default function ResourceLinks({ className }) {
  const { pathname } = useLocation()
  return (
    <nav aria-label="Patient resources" className={cn("border-b border-border bg-white", className)}>
      <Container className="py-3">
        <ScrollRow>
          <span className="hidden shrink-0 pr-2 text-base font-medium text-foreground/80 sm:block">Patient Resources</span>
          {resourcesNav.map((item, i) => {
            const current = pathname === item.to
            return (
              <Link
                key={item.to}
                to={item.to}
                aria-current={current ? "page" : undefined}
                className={cn(
                  "inline-flex h-11 min-w-0 items-center justify-center rounded-full border px-2 text-center text-[0.9375rem] leading-tight font-medium transition-colors sm:shrink-0 sm:px-5 sm:text-base sm:whitespace-nowrap",
                  i === resourcesNav.length - 1 && resourcesNav.length % 2 === 1 && "col-span-2 sm:col-span-1",
                  current
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-white text-primary hover:border-primary hover:bg-tint"
                )}
              >
                {item.label}
              </Link>
            )
          })}
        </ScrollRow>
      </Container>
    </nav>
  )
}
