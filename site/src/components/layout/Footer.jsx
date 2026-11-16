import { Link } from "react-router-dom"
import Logo from "@/components/brand/Logo"
import Icon from "@/components/brand/Icon"
import Pattern from "@/components/brand/Pattern"
import { Container } from "@/components/common/Section"
import { mainNav, resourcesNav, practice } from "@/data/site"

const colHead = "font-heading text-lg text-white"
const link = "inline-flex min-h-11 items-center text-white/85 transition-colors hover:text-white hover:underline underline-offset-4"

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-primary text-primary-foreground">
      <Pattern
        tone="blue"
        className="pointer-events-none absolute -right-32 -top-10 hidden h-[140%] w-auto opacity-[0.12] lg:block"
      />
      <Container className="relative py-16 lg:py-[clamp(2.5rem,7.5vh,5rem)]">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr_1fr_1.3fr]">
          <div>
            <Logo tone="white" width={160} />
            <p className="mt-6 max-w-xs font-heading text-2xl leading-snug text-white">{practice.tagline}</p>
            <div className="mt-6 flex gap-3">
              {[
                ["instagram", practice.social.instagram, "Articella on Instagram"],
                ["linkedin", practice.social.linkedin, "Articella on LinkedIn"],
                ["facebook", practice.social.facebook, "Articella on Facebook"],
              ].map(([icon, href, label]) => (
                <a
                  key={icon}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-11 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white hover:text-primary"
                >
                  <Icon name={icon} size={20} />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:contents">
<nav aria-label="Footer">
            <h2 className={colHead}>Explore</h2>
            <ul className="mt-4 grid gap-2.5">
              {mainNav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className={link}>
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Patient resources">
            <h2 className={colHead}>Patient Resources</h2>
            <ul className="mt-4 grid gap-2.5">
              {resourcesNav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className={link}>
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={practice.portalUrl} target="_blank" rel="noopener noreferrer" className={link}>
                  Patient Portal login
                </a>
              </li>
            </ul>
          </nav>
          </div>

          <div>
            <h2 className={colHead}>Visit us</h2>
            <address className="mt-4 grid gap-3 not-italic text-white/85">
              <p className="flex gap-3">
                <Icon name="pin" size={20} className="mt-1 shrink-0" />
                <a href={practice.mapsUrl} target="_blank" rel="noopener noreferrer" className={link}>
                  {practice.address.line1}
                  <br />
                  {practice.address.city}, {practice.address.state} {practice.address.zip}
                </a>
              </p>
              <div className="flex gap-3">
                <Icon name="clock" size={20} className="mt-1 shrink-0" />
                <ul>
                  {practice.hours.map((h) => (
                    <li key={h.days} className="whitespace-nowrap">
                      {h.days}: {h.time}
                    </li>
                  ))}
                </ul>
              </div>
              <p className="flex gap-3">
                <Icon name="phone" size={20} className="mt-1 shrink-0" />
                <a href={practice.phoneHref} className={link}>
                  {practice.phone}
                </a>
              </p>
              <p className="flex gap-3">
                <Icon name="mail" size={20} className="mt-1 shrink-0" />
                <a href={`mailto:${practice.email}`} className={link}>
                  {practice.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/25 pt-6 text-sm text-white/75 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 Articella Primary Care. All rights reserved.</p>
          <p className="flex gap-5">
            <a href="https://www.articella.com/terms/" target="_blank" rel="noopener noreferrer" className={link}>
              Terms
            </a>
            <a href="https://www.articella.com/privacy-policy/" target="_blank" rel="noopener noreferrer" className={link}>
              Privacy
            </a>
          </p>
        </div>
      </Container>
    </footer>
  )
}
