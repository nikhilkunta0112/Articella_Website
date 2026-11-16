import { createContext, useCallback, useContext, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import Icon from "@/components/brand/Icon"
import { practice, routes } from "@/data/site"

const BookingContext = createContext({ open: () => {} })
export const useBooking = () => useContext(BookingContext)

// "Book Appointment" opens a small choice panel (PRD): the approved booking page, meet a
// provider, explore services, or call the office.
export function BookingProvider({ children }) {
  const [isOpen, setOpen] = useState(false)
  const open = useCallback(() => setOpen(true), [])
  const value = useMemo(() => ({ open }), [open])

  const choices = [
    {
      key: "book",
      icon: "calendar",
      title: "Continue to online booking",
      text: "Opens our secure booking page in a new tab.",
      href: practice.bookingUrl,
      external: true,
    },
    { key: "providers", icon: "users", title: "Meet a provider", text: "Read about our care team first.", to: routes.providers },
    { key: "services", icon: "stethoscope", title: "Explore services", text: "See what primary care includes.", to: routes.primaryCare },
    { key: "call", icon: "phone", title: `Call or text ${practice.phone}`, text: "We reply within 1 business day.", href: practice.phoneHref },
  ]

  const rowClass =
    "group flex items-center gap-4 rounded-xl border border-border bg-background p-4 text-left transition-colors hover:border-primary hover:bg-secondary focus-visible:border-primary"

  return (
    <BookingContext.Provider value={value}>
      {children}
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent className="max-w-[calc(100%-2rem)] gap-5 rounded-2xl p-6 sm:max-w-lg sm:p-8">
          <DialogHeader className="gap-2">
            <DialogTitle className="font-heading text-2xl text-primary sm:text-3xl">How would you like to begin?</DialogTitle>
            <DialogDescription className="text-base">
              Same-week appointments are often available. Pick whichever feels easiest.
            </DialogDescription>
          </DialogHeader>
          <ul className="grid gap-3">
            {choices.map((c) => {
              const inner = (
                <>
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-primary">
                    <Icon name={c.icon} size={22} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-medium text-foreground">{c.title}</span>
                    <span className="block text-sm text-muted-foreground">{c.text}</span>
                  </span>
                  <Icon name={c.external ? "arrowUpRight" : "arrowRight"} size={20} className="text-primary transition-transform group-hover:translate-x-0.5" />
                </>
              )
              return (
                <li key={c.key}>
                  {c.to ? (
                    <Link to={c.to} onClick={() => setOpen(false)} className={rowClass}>
                      {inner}
                    </Link>
                  ) : (
                    <a
                      href={c.href}
                      className={rowClass}
                      onClick={() => setOpen(false)}
                      {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {inner}
                    </a>
                  )}
                </li>
              )
            })}
          </ul>
        </DialogContent>
      </Dialog>
    </BookingContext.Provider>
  )
}
