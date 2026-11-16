import { useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import BrandButton from "@/components/common/BrandButton"
import Icon from "@/components/brand/Icon"
import Logo from "@/components/brand/Logo"
import { DesktopNav, MobileMenu } from "@/components/layout/SiteNav"
import { useBooking } from "@/components/layout/BookingProvider"
import { practice, images } from "@/data/site"

// Circle with a diagonal arrow. On hover or keyboard focus of the parent (a `group/cta` element) the circle
// fills and the arrow slides out to the top right while a second one slides in from the bottom left.
// `tone` is the colour the circle fills with: "blue" on the white button, "white" on the blue tab.
function ArrowBadge({ size = "size-11", tone = "blue" }) {
  const fill = tone === "blue" ? "group-hover/cta:bg-primary group-focus-visible/cta:bg-primary group-hover/cta:text-white group-focus-visible/cta:text-white group-hover/cta:border-primary" : "group-hover/cta:bg-white group-focus-visible/cta:bg-white group-hover/cta:text-primary group-focus-visible/cta:text-primary group-hover/cta:border-white"
  return (
    <span
      aria-hidden="true"
      className={`relative flex ${size} shrink-0 items-center justify-center overflow-hidden rounded-full border transition-[background-color,color,border-color,transform] duration-300 ease-out group-hover/cta:scale-105 ${
        tone === "blue" ? "border-primary/60" : "border-white/60"
      } ${fill}`}
    >
      <span className="flex transition-transform duration-300 ease-out group-hover/cta:translate-x-[170%] group-hover/cta:-translate-y-[170%] group-focus-visible/cta:translate-x-[170%] group-focus-visible/cta:-translate-y-[170%]">
        <Icon name="arrowUpRight" size={20} />
      </span>
      <span className="absolute flex -translate-x-[170%] translate-y-[170%] transition-transform duration-300 ease-out group-hover/cta:translate-x-0 group-hover/cta:translate-y-0 group-focus-visible/cta:translate-x-0 group-focus-visible/cta:translate-y-0">
        <Icon name="arrowUpRight" size={20} />
      </span>
    </span>
  )
}


// Framed hero. Composition taken from the reference (cook/refs/R13): a black rounded frame that carries
// the site header (logo left, nav centred, a notch tab at the top right), a blue photo panel with a very
// large headline on its open left side, a pill above the headline, and two notched tabs cut into the
// bottom corners of the panel that carry the actions. Colours stay inside the Brand Book: Articella Blue,
// white and black. The photo (cook/refs/R14) is graded from violet to Articella Blue, with a soft glow
// behind the pair, by scripts/grade_hero.py.
//
// Desktop (1360px and up): the header bar is part of the frame. Below that: logo, Book and a menu button.
// The global header (components/layout/Header.jsx) is hidden on the home page until you scroll past the hero.
// lg+: the photo fills the panel and both actions sit in the bottom notches. Phones and tablets: text
// first, then the photo (its top fades into the panel), and the actions dock under the panel.
// The headline and paragraph scale with the panel's width (cqw units), so they always fit the open
// space on the left of the photo.

const R = "2rem" // notch inverse-corner radius

// A tab cut into a bottom corner of the panel. It is part of the frame (black), so it reads as a notch,
// and its button fills it. Two small radial gradients draw the inverse corners where the tab meets the
// panel's edges.
function Notch({ side = "left", tab, children }) {
  const left = side === "left"
  const arc = `radial-gradient(circle at ${left ? "100% 0" : "0 0"}, transparent ${R}, #000 ${R})`
  return (
    <div
      {...(tab ? { "data-hero": "tab" } : {})}
      className={`absolute bottom-0 z-20 hidden bg-black pt-2 lg:block ${left ? "left-0 rounded-tr-[2rem] pr-2" : "right-0 rounded-tl-[2rem] pl-2"}`}
    >
      {/* panel edge above the tab: rounds the panel's corner there */}
      <span
        aria-hidden="true"
        className="absolute"
        style={{ [left ? "left" : "right"]: 0, top: `-${R}`, width: R, height: R, background: arc }}
      />
      {/* where the tab's inner edge meets the panel's bottom edge */}
      <span
        aria-hidden="true"
        className="absolute"
        style={{ [left ? "right" : "left"]: `-${R}`, bottom: 0, width: R, height: R, background: arc }}
      />
      <div className="relative">{children}</div>
    </div>
  )
}

export default function Hero() {
  const { open } = useBooking()
  const [menuOpen, setMenuOpen] = useState(false)
  const root = useRef(null)

  // Very gentle motion (about 1.5 s in total, then a slow breathing zoom). The text rises into place in a short
  // stagger, the photo eases in with a slight settle, the notch tabs fade in, and the photo then breathes
  // (2% zoom over 9 s). Layout effect: the start state is applied before the first paint, so there is no
  // flash. Off for reduced motion.
  useLayoutEffect(() => {
    const el = root.current
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const q = (s) => gsap.utils.toArray(`[data-hero="${s}"]`, el)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
      tl.from(q("photo"), { opacity: 0, scale: 1.045, transformOrigin: "85% 70%", duration: 1.5, ease: "power2.out" }, 0)
        .from(q("rise")[0], { opacity: 0, y: 14, duration: 0.8 }, 0.1)
        .from(q("line"), { opacity: 0, y: 28, filter: "blur(6px)", duration: 0.95, stagger: 0.12, clearProps: "filter" }, 0.2)
        .from(q("rise")[1], { opacity: 0, y: 16, duration: 0.9 }, 0.62)
        .from(q("tab"), { opacity: 0, duration: 0.9, stagger: 0.12, ease: "power1.out" }, 0.8)
      // after the entrance: the photo "breathes", a 2% zoom over a very slow cycle, anchored at the bottom right
      // so it always keeps covering the panel (a slide would show a strip of the panel behind it)
      tl.add(() => {
        gsap.to(q("photo"), { scale: 1.02, transformOrigin: "85% 100%", duration: 9, ease: "sine.inOut", yoyo: true, repeat: -1 })
      }, 1.5)
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} aria-labelledby="home-title" className="bg-background">
      <div className="mx-auto w-full max-w-[1500px] px-2 pb-4 pt-3 sm:px-5 min-[1800px]:max-w-[1760px] lg:pb-6">
        <div className="rounded-[1.75rem] bg-black p-1.5 sm:rounded-[2rem] sm:p-3 lg:rounded-[2.25rem] lg:p-4">
          {/* Header bar inside the frame */}
          <div className="relative z-30 flex h-14 items-center justify-between px-3 sm:px-4 lg:h-16 lg:px-6">
            <Logo tone="white" width={124} />
            <DesktopNav tone="dark" className="absolute left-1/2 hidden w-max -translate-x-1/2 min-[1360px]:block" />
            <div className="flex items-center gap-3 min-[1360px]:hidden">
              <BrandButton variant="inverse" size="sm" onClick={open} className="h-11 px-5 text-[0.95rem] lg:hidden">
                Book
              </BrandButton>
              <BrandButton
                variant="inverseOutline"
                size="sm"
                href={practice.portalUrl}
                icon="external"
                className="hidden h-11 px-5 text-[0.95rem] lg:inline-flex"
              >
                Patient Portal
              </BrandButton>
              <button
                type="button"
                aria-label="Open menu"
                onClick={() => setMenuOpen(true)}
                className="flex size-11 items-center justify-center rounded-md bg-white text-primary"
              >
                <Icon name="menu" size={22} />
              </button>
            </div>
          </div>
          <MobileMenu open={menuOpen} onOpenChange={setMenuOpen} />

          <div className="relative">
            {/* Top-right notch tab: the panel's colour rises into the header bar (portal link) */}
            <div data-hero="tab" className="absolute bottom-full right-0 z-40 hidden h-16 min-[1360px]:block">
              <span
                aria-hidden="true"
                className="absolute bottom-0"
                style={{
                  left: `-${R}`,
                  width: R,
                  height: R,
                  background: `radial-gradient(circle at 0 0, transparent ${R}, var(--primary) ${R})`,
                }}
              />
              <a
                href={practice.portalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/cta flex h-full items-center gap-5 rounded-t-[1.75rem] bg-primary pl-9 pr-5 text-[1.05rem] font-medium text-white transition-colors hover:bg-primary/90"
              >
                Patient Portal
                <ArrowBadge size="size-10" tone="white" />
              </a>
            </div>

            {/* Panel */}
            <div className="relative flex flex-col overflow-hidden rounded-[1.25rem] bg-primary [container-type:inline-size] sm:rounded-[1.5rem] min-[1360px]:rounded-tr-none lg:h-[clamp(34rem,calc(100svh-8.75rem),46rem)] lg:rounded-[1.75rem] lg:min-[1360px]:rounded-tr-none min-[1800px]:lg:h-[clamp(34rem,calc(100svh-9rem),52rem)]">
              {/* Text */}
              <div className="relative z-10 order-1 px-6 pb-4 pt-8 sm:px-10 sm:pt-12 lg:flex lg:h-full lg:flex-col lg:justify-center lg:px-[5.2cqw] lg:pb-28 lg:pt-12">
                <div className="max-w-[44rem] lg:max-w-[42cqw]">
                  <p data-hero="rise" className="inline-flex items-center rounded-full border border-white/70 px-4 py-1.5 text-[0.95rem] text-white">
                    {practice.tagline}
                  </p>
                  <h1
                    id="home-title"
                    className="mt-5 text-[2.7rem] font-bold leading-[1.02] text-white sm:text-[4.5rem] lg:mt-[2cqw] lg:text-[clamp(2.75rem,5.9cqw,6.25rem)]"
                  >
                    <span data-hero="line" className="block">Health is a</span>
                    <span data-hero="line" className="block">journey, not</span>
                    <span data-hero="line" className="block">a reaction.</span>
                  </h1>
                  <p data-hero="rise" className="mt-6 max-w-[30rem] text-pretty text-lg leading-[1.6] text-white/90 sm:text-xl lg:mt-[2.2cqw] lg:max-w-[31cqw] lg:text-[clamp(1rem,1.45cqw,1.3rem)]">
                    At Articella, we offer personalized primary care and physician-led wellness services, with thoughtful,
                    ongoing care for every stage of life.
                  </p>
                </div>
              </div>

              {/* Photo: below the text on phones (top fades in, bottom carries the actions), fills the panel on desktop */}
              <div className="relative order-2 -mt-4 min-h-[21rem] flex-1 overflow-hidden sm:-mt-2 sm:min-h-[27rem] lg:absolute lg:inset-0 lg:z-0 lg:mt-0 lg:min-h-0 lg:overflow-visible">
                <div data-hero="photo" className="absolute inset-0 will-change-transform">
                <img
                  src={images.homeHeroFrame}
                  alt="A physician in a white coat resting a hand on the shoulder of a smiling older patient, looking at her warmly."
                  className="absolute inset-0 h-full w-full origin-bottom-right scale-[1.16] object-cover object-[100%_30%] [mask-image:linear-gradient(to_bottom,transparent,black_42%)] sm:scale-[1.3] lg:scale-100 lg:object-[74%_34%] lg:[mask-image:none]"
                  fetchPriority="high"
                />
                </div>
                {/* Phones and tablets: scrim and the two actions sit on the bottom of the photo */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-primary via-primary/80 to-transparent lg:hidden"
                />
                <div className="absolute inset-x-3 bottom-3 grid gap-3 sm:grid-cols-2 lg:hidden">
                  <BrandButton size="lg" variant="inverse" onClick={open} icon="calendar" iconPosition="start" className="h-14 w-full">
                    Book an Appointment
                  </BrandButton>
                  <BrandButton
                    size="lg"
                    variant="inverseOutline"
                    href={practice.phoneHref}
                    icon="phone"
                    iconPosition="start"
                    className="h-14 w-full border-2 border-white bg-primary/70"
                  >
                    Call or Text {practice.phone}
                  </BrandButton>
                </div>
              </div>

              {/* Desktop notched tabs carry the two actions: a matched pair */}
              <Notch side="left" tab>
                <button
                  type="button"
                  onClick={open}
                  className="group/cta flex h-16 w-[20rem] items-center justify-between gap-4 rounded-2xl bg-white pl-6 pr-3 text-[1.1rem] font-semibold text-primary xl:w-[24rem]"
                >
                  <span className="flex items-center gap-3">
                    <Icon name="calendar" size={22} />
                    Book an Appointment
                  </span>
                  <ArrowBadge />
                </button>
              </Notch>
              <Notch side="right" tab>
                <a
                  href={practice.phoneHref}
                  className="flex h-16 items-center gap-3 rounded-2xl bg-white/10 px-6 text-[1.1rem] font-semibold text-white transition-colors hover:bg-white hover:text-primary"
                >
                  <Icon name="phone" size={22} />
                  Call or Text {practice.phone}
                </a>
              </Notch>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
