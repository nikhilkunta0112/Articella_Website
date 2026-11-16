import { useEffect, useRef, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import Icon from "@/components/brand/Icon"
import { practice, routes } from "@/data/site"
import { cn } from "@/lib/utils"

// Articella care guide. Guided, scripted answers only (PRD): it does not diagnose,
// does not collect private medical information, and sends urgent concerns to the office or 911.
// A real AI assistant would need approved medical content, privacy rules and an integration.

const TOPICS = [
  { id: "services", label: "Services" },
  { id: "providers", label: "Providers" },
  { id: "insurance", label: "Insurance" },
  { id: "memberships", label: "Memberships" },
  { id: "newpatient", label: "New patient steps" },
  { id: "location", label: "Location and hours" },
  { id: "appointments", label: "Appointments" },
]

const ANSWERS = {
  services: {
    text: "Primary care at Articella covers annual physicals, preventive screenings and vaccines, chronic condition care, sick visits, women's and men's health, telehealth, labs and referrals, and lifestyle counseling.",
    links: [{ label: "See primary care services", to: routes.primaryCare }],
  },
  providers: {
    text: "Our clinicians are Dr. Rahul Singh, Dr. Sylaza Kantamneni and nurse practitioner Anupa Adhikari. The Providers page has their background and focus.",
    links: [{ label: "Meet the providers", to: routes.providers }],
  },
  insurance: {
    text: "We work with Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, Ambetter and Medicare. Plans vary, so please confirm your exact plan and network with the office or your insurer.",
    links: [{ label: "Insurance and billing", to: routes.insurance }],
  },
  memberships: {
    text: "Concierge memberships and self-pay visits are available. A membership is not health insurance. Prices and inclusions are on the Memberships page.",
    links: [{ label: "Explore memberships", to: routes.memberships }],
  },
  newpatient: {
    text: "Three steps: choose a care option, find a time, and get ready. Bring a photo ID, your insurance card if you have one, your medicines and allergies, and any records or questions.",
    links: [{ label: "New patient guide", to: routes.newPatients }],
  },
  location: {
    text: `We are at ${practice.address.full}. Hours: Monday to Friday 8:30 AM to 4:30 PM, Saturday 8:30 AM to 12:00 PM, closed Sunday. ${practice.parking}.`,
    links: [{ label: "Hours and directions", to: routes.locations }],
  },
  appointments: {
    text: "You can book online, or call or text the office. Same-week appointments are often available, in person or by telehealth.",
    links: [
      { label: "Book online", href: practice.bookingUrl },
      { label: `Call ${practice.phone}`, href: practice.phoneHref },
    ],
  },
  urgent: {
    text: "I can't help with medical concerns or emergencies. If this is an emergency, call 911. For anything else about your health, please call or text the office so a member of the care team can help.",
    links: [{ label: `Call ${practice.phone}`, href: practice.phoneHref }],
  },
  portal: {
    text: "The patient portal opens in a separate window. If you need help with your account, the front desk can help.",
    links: [{ label: "Continue to Patient Portal", href: practice.portalUrl }],
  },
  contact: {
    text: `You can reach the office at ${practice.phone} or ${practice.email}. We reply to messages within 1 business day.`,
    links: [{ label: "Contact page", to: routes.contact }],
  },
  fallback: {
    text: "I can help with services, providers, insurance, memberships, new patient steps, our location and appointments. Pick a topic below, or call the office for anything else.",
    links: [{ label: `Call ${practice.phone}`, href: practice.phoneHref }],
  },
}

function route(input) {
  const t = input.toLowerCase()
  if (/(emergenc|chest pain|can.?t breathe|bleeding|suicid|overdose|stroke|symptom|diagnos|pain|dizzy|fever)/.test(t)) return "urgent"
  if (/(insur|aetna|cigna|bcbs|blue cross|united|ambetter|medicare|billing|copay|deductible|self.?pay)/.test(t)) return "insurance"
  if (/(member|concierge|price|cost|plan|fee)/.test(t)) return "memberships"
  if (/(provider|doctor|physician|nurse|dr\.|team|singh|kantamneni|adhikari)/.test(t)) return "providers"
  if (/(first|new patient|bring|prepare|checklist)/.test(t)) return "newpatient"
  if (/(where|address|hour|open|parking|direction|location|map)/.test(t)) return "location"
  if (/(book|appoint|schedule|telehealth|virtual|same.?week)/.test(t)) return "appointments"
  if (/(portal|login|log in|password|records)/.test(t)) return "portal"
  if (/(contact|phone|call|text|email)/.test(t)) return "contact"
  if (/(service|physical|screening|vaccin|chronic|sick|lab|care)/.test(t)) return "services"
  return "fallback"
}

const GREETING = {
  from: "guide",
  text: "Hello, I'm the Articella care guide. I can point you to the right page or answer common questions about the practice. What would you like to know?",
}

function Message({ m }) {
  const mine = m.from === "me"
  return (
    <div className={cn("flex", mine ? "justify-end" : "justify-start")}>
      <div
        className={cn(
          "max-w-[85%] rounded-2xl px-4 py-3 text-[0.95rem] leading-relaxed",
          mine ? "rounded-br-sm bg-primary text-primary-foreground" : "rounded-bl-sm bg-secondary text-foreground"
        )}
      >
        <p>{m.text}</p>
        {m.links && (
          <ul className="mt-3 grid gap-2">
            {m.links.map((l) => (
              <li key={l.label}>
                {l.to ? (
                  <Link to={l.to} className="inline-flex items-center gap-1.5 font-medium text-primary underline underline-offset-4">
                    {l.label}
                    <Icon name="arrowRight" size={16} />
                  </Link>
                ) : (
                  <a
                    href={l.href}
                    className="inline-flex items-center gap-1.5 font-medium text-primary underline underline-offset-4"
                    {...(/^https?:/.test(l.href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {l.label}
                    <Icon name={/^https?:/.test(l.href) ? "arrowUpRight" : "phone"} size={16} />
                  </a>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default function CareGuide() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([GREETING])
  const [draft, setDraft] = useState("")
  const listRef = useRef(null)
  const inputRef = useRef(null)
  const launcherRef = useRef(null)
  const [pastTop, setPastTop] = useState(false)
  const onHome = useLocation().pathname === "/"

  useEffect(() => {
    const onScroll = () => setPastTop(window.scrollY > 420)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])
  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: "smooth" })
  }, [messages, open])
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === "Escape") {
        setOpen(false)
        launcherRef.current?.focus()
      }
    }
    document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open])

  const ask = (text, key) => {
    const clean = text.trim()
    if (!clean) return
    const id = key || route(clean)
    setMessages((m) => [...m, { from: "me", text: clean }, { from: "guide", ...ANSWERS[id] }])
    setDraft("")
  }

  return (
    <div className={cn("fixed bottom-4 right-4 z-50 sm:bottom-6 sm:right-6", !pastTop && !open && (onHome ? "hidden" : "max-md:hidden"))}>
      {open && (
        <section
          role="dialog"
          aria-label="Articella care guide"
          className="guide-in absolute bottom-[4.25rem] right-0 flex h-[min(34rem,calc(100dvh-7rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-[0_24px_70px_-20px_rgba(0,0,139,0.45)]"
        >
          <header className="flex items-center justify-between bg-primary px-5 py-4 text-primary-foreground">
            <div>
              <h2 className="font-heading text-lg leading-tight text-white">Care guide</h2>
              <p className="text-xs text-white/80">Guided answers about Articella</p>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setMessages([GREETING])}
                aria-label="Start over"
                className="flex size-9 items-center justify-center rounded-full text-white hover:bg-white/15"
              >
                <Icon name="refresh" size={19} />
              </button>
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  launcherRef.current?.focus()
                }}
                aria-label="Close care guide"
                className="flex size-9 items-center justify-center rounded-full text-white hover:bg-white/15"
              >
                <Icon name="close" size={20} />
              </button>
            </div>
          </header>

          <div ref={listRef} className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {messages.map((m, i) => (
              <Message key={i} m={m} />
            ))}
          </div>

          <div className="border-t border-border p-3">
            <div className="mb-3 flex flex-wrap gap-2">
              {TOPICS.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => ask(t.label, t.id)}
                  className="rounded-full border border-primary/40 px-3 py-1.5 text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {t.label}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault()
                ask(draft)
              }}
              className="flex items-center gap-2"
            >
              <label htmlFor="guide-input" className="sr-only">
                Ask a question
              </label>
              <input
                id="guide-input"
                ref={inputRef}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Ask about the practice"
                autoComplete="off"
                className="h-11 min-w-0 flex-1 rounded-full border border-input bg-background px-4 text-[0.95rem] outline-none focus-visible:border-primary"
              />
              <button
                type="submit"
                aria-label="Send"
                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Icon name="send" size={19} />
              </button>
            </form>
            <p className="mt-2 px-1 text-xs text-muted-foreground">
              Please don't share private medical details here. In an emergency, call 911.
            </p>
          </div>
        </section>
      )}

      <button
        ref={launcherRef}
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close care guide" : "Open care guide"}
        className="flex size-14 items-center justify-center gap-2.5 rounded-full bg-primary font-medium text-primary-foreground ring-2 ring-white shadow-[0_12px_32px_-10px_rgba(0,0,139,0.6)] transition-transform hover:-translate-y-0.5 2xl:w-auto 2xl:pl-5 2xl:pr-6"
      >
        <Icon name={open ? "close" : "message"} size={22} />
        <span className="hidden 2xl:inline">{open ? "Close" : "Care guide"}</span>
      </button>
    </div>
  )
}
