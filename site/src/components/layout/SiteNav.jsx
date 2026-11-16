import { useEffect, useRef, useState } from "react"
import { Link, NavLink, useLocation } from "react-router-dom"
import Logo from "@/components/brand/Logo"
import Icon from "@/components/brand/Icon"
import BrandButton from "@/components/common/BrandButton"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import { mainNav, resourcesNav, practice } from "@/data/site"
import { cn } from "@/lib/utils"

// Shared navigation pieces. The global header and the home-page hero (which carries its own header bar
// inside the black frame) both use them, so the links, the dropdown and the mobile menu stay identical.
// tone "light": on white (the global header). tone "dark": white text on the hero's black bar.

const pillLight =
  "whitespace-nowrap rounded-full px-4 py-2 text-[0.95rem] font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary"
const pillDark =
  "whitespace-nowrap rounded-full px-4 py-2 text-[0.95rem] font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"

// Patient Resources dropdown. A disclosure menu: closes on outside click, Escape,
// choosing a page, or leaving the menu with Tab. Arrow keys move between items.
export function ResourcesMenu({ active, tone = "light" }) {
  const [open, setOpen] = useState(false)
  const wrap = useRef(null)
  const btn = useRef(null)
  const location = useLocation()
  const dark = tone === "dark"

  useEffect(() => setOpen(false), [location.pathname])

  useEffect(() => {
    if (!open) return
    const onDown = (e) => {
      if (wrap.current && !wrap.current.contains(e.target)) setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false)
        btn.current?.focus()
      }
    }
    document.addEventListener("mousedown", onDown)
    document.addEventListener("keydown", onKey)
    return () => {
      document.removeEventListener("mousedown", onDown)
      document.removeEventListener("keydown", onKey)
    }
  }, [open])

  const onPanelKey = (e) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return
    e.preventDefault()
    const items = Array.from(wrap.current.querySelectorAll("[data-resource-item]"))
    const i = items.indexOf(document.activeElement)
    const next = e.key === "ArrowDown" ? (i + 1) % items.length : (i - 1 + items.length) % items.length
    items[next]?.focus()
  }

  return (
    <div ref={wrap} className="relative">
      <button
        ref={btn}
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        aria-controls="resources-panel"
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault()
            setOpen(true)
            requestAnimationFrame(() => wrap.current?.querySelector("[data-resource-item]")?.focus())
          }
        }}
        className={cn(
          dark ? pillDark : pillLight,
          "inline-flex items-center gap-1.5",
          (open || active) && (dark ? "bg-white/15 text-white" : "bg-secondary text-primary")
        )}
      >
        Patient Resources
        <Icon name="chevronDown" size={16} className={cn("transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div
          id="resources-panel"
          onKeyDown={onPanelKey}
          className="guide-in absolute left-1/2 top-[calc(100%+0.75rem)] z-50 w-[26rem] -translate-x-1/2 rounded-2xl border border-border bg-popover p-2 shadow-[0_18px_50px_-18px_rgba(0,0,139,0.35)]"
        >
          <ul>
            {resourcesNav.map((r) => (
              <li key={r.to}>
                <Link
                  to={r.to}
                  data-resource-item
                  className="block rounded-xl px-4 py-3 transition-colors hover:bg-secondary focus-visible:bg-secondary"
                >
                  <span className="block font-medium text-primary">{r.label}</span>
                  <span className="block text-sm text-muted-foreground">{r.blurb}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

// The desktop nav: the six main links plus the Patient Resources dropdown.
export function DesktopNav({ tone = "light", className }) {
  const location = useLocation()
  const dark = tone === "dark"
  const resourcesActive = resourcesNav.some((r) => location.pathname.startsWith(r.to))
  return (
    <nav aria-label="Main" className={className}>
      <ul className={cn("flex items-center gap-1", !dark && "rounded-full border border-border bg-tint p-1.5")}>
        {mainNav.map((n) => (
          <li key={n.to}>
            <NavLink
              to={n.to}
              end={n.to === "/"}
              className={({ isActive }) =>
                cn(
                  dark ? pillDark : pillLight,
                  "block",
                  isActive &&
                    (dark
                      ? "bg-white text-primary hover:bg-white hover:text-primary"
                      : "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground")
                )
              }
            >
              {n.label}
            </NavLink>
          </li>
        ))}
        <li>
          <ResourcesMenu active={resourcesActive} tone={tone} />
        </li>
      </ul>
    </nav>
  )
}

// The mobile menu sheet (opened by the menu button).
export function MobileMenu({ open, onOpenChange }) {
  const location = useLocation()
  useEffect(() => onOpenChange(false), [location.pathname]) // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-[min(22rem,92vw)] gap-0 overflow-y-auto bg-background p-0">
        <SheetHeader className="border-b border-border p-5">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <SheetDescription className="sr-only">Site navigation</SheetDescription>
          <Logo width={116} />
        </SheetHeader>
        <nav aria-label="Mobile" className="p-3">
          <ul>
            {mainNav.map((n) => (
              <li key={n.to}>
                <NavLink
                  to={n.to}
                  end={n.to === "/"}
                  className={({ isActive }) =>
                    cn(
                      "block rounded-lg px-4 py-3 font-heading text-xl",
                      isActive ? "bg-secondary text-primary" : "text-foreground hover:bg-secondary"
                    )
                  }
                >
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <p className="px-4 pb-1 pt-5 text-sm font-medium text-muted-foreground">Patient Resources</p>
          <ul>
            {resourcesNav.map((r) => (
              <li key={r.to}>
                <NavLink
                  to={r.to}
                  className={({ isActive }) =>
                    cn("block rounded-lg px-4 py-2.5", isActive ? "bg-secondary text-primary" : "text-foreground hover:bg-secondary")
                  }
                >
                  {r.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto grid gap-3 border-t border-border p-5">
          <BrandButton href={practice.portalUrl} variant="outline" icon="external">
            Patient Portal
          </BrandButton>
          <BrandButton href={practice.phoneHref} variant="solid" icon="phone" iconPosition="start">
            Call or text {practice.phone}
          </BrandButton>
        </div>
      </SheetContent>
    </Sheet>
  )
}
