import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Icon from "@/components/brand/Icon"
import { Arrow } from "@/components/home/Arrow"
import { careChoices, reasons } from "@/data/home"
import { images } from "@/data/site"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

// "Where would you like to begin?" as a pinned scroll story (desktop). The motion follows the reference
// recording: the panel pins, scrolling steps through the slides (the text crossfades and rises, the
// photo column slides vertically, the pagination bars widen), and the page continues after the last
// slide. As the section scrolls into view its parts rise into place on a scrubbed timeline, the same
// kind of reveal as the cards section above it.
//
// Structure note: GSAP wraps the pinned <section> in a pin-spacer, so the section lives inside a
// React-owned wrapper <div> (React can always remove the wrapper cleanly when you leave the page).

const STEP_VH = 0.85 // scroll distance per slide, in viewport heights
const SLIDE_PHOTOS = [
  { src: images.careBegin, pos: "84% 50%" },
  { src: images.careMember, pos: "52% 55%" },
  { src: images.careWellness, pos: "50% 40%" },
]

// faint white grid behind the photo column (the section is an Articella Blue panel), fading out toward the edges
const GRID = {
  backgroundImage:
    "linear-gradient(to right, rgba(255, 255, 255, 0.22) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.22) 1px, transparent 1px)",
  backgroundSize: "3.5rem 3.5rem",
  WebkitMaskImage: "radial-gradient(72% 70% at 50% 50%, #000 30%, transparent 100%)",
  maskImage: "radial-gradient(72% 70% at 50% 50%, #000 30%, transparent 100%)",
}

export default function CareStory() {
  const rootRef = useRef(null)
  const stRef = useRef(null)
  const [active, setActive] = useState(0)
  const n = careChoices.length

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      // 1. entrance: parts rise into place while the section scrolls into view, landing as it pins
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: { trigger: el, start: "top 90%", end: "top top", scrub: 0.8, invalidateOnRefresh: true },
      })
      tl.from("[data-in]", { y: 46, opacity: 0, stagger: 0.07, duration: 0.6 }, 0)
        .from("[data-frame]", { y: 70, scale: 0.88, opacity: 0, duration: 0.9 }, 0.05)
        .from("[data-grid]", { opacity: 0, duration: 0.9 }, 0)

      // 2. pinned story: the active slide follows scroll progress through the pin
      stRef.current = ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: () => "+=" + Math.round(window.innerHeight * STEP_VH * n),
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => setActive(Math.min(n - 1, Math.floor(self.progress * n))),
      })
    }, el)
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener("load", refresh)
    document.fonts?.ready.then(refresh)
    return () => {
      window.removeEventListener("load", refresh)
      stRef.current = null
      ctx.revert()
    }
  }, [n])

  const goTo = (i) => {
    const st = stRef.current
    if (!st) return
    window.scrollTo({ top: st.start + ((i + 0.5) / n) * (st.end - st.start), behavior: "smooth" })
  }

  return (
    <div>
      <section ref={rootRef} aria-label="Ways into care" className="relative h-screen min-h-[40rem] overflow-hidden bg-primary text-primary-foreground">
        <div className="mx-auto grid h-full w-full max-w-[1500px] grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
          {/* left: pagination, the active slide, quick links (the title lives in ScrollFillTitle, just above) */}
          <div className="relative flex flex-col justify-center gap-[clamp(1rem,3.2vh,2rem)] border-r border-white/20 px-12 py-[clamp(1.25rem,4vh,3rem)] xl:px-20">
            <div data-in className="flex gap-2" role="tablist" aria-label="Ways into care">
              {careChoices.map((c, i) => (
                <button
                  key={c.title}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={c.title}
                  onClick={() => goTo(i)}
                  className="group py-3"
                >
                  <span
                    className={cn(
                      "block h-1 rounded-full transition-all duration-500 ease-in-out",
                      i === active ? "w-14 bg-white" : "w-7 bg-white/30 group-hover:bg-white/55"
                    )}
                  />
                </button>
              ))}
            </div>

            <div>
              <div data-in className="relative h-[clamp(16rem,43vh,20rem)] border-t border-white/20 pt-[clamp(1rem,3vh,1.75rem)]">
                {careChoices.map((c, i) => (
                  <div
                    key={c.title}
                    aria-hidden={i !== active}
                    className={cn(
                      "absolute inset-x-0 top-[clamp(1rem,3vh,1.75rem)] transition-all duration-700 ease-in-out",
                      i === active ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-10 opacity-0"
                    )}
                  >
                    <span className="grid size-12 place-items-center rounded-full bg-white text-primary">
                      <Icon name={c.icon} size={24} />
                    </span>
                    <h3 className="mt-3 text-[clamp(2.2rem,min(4vw,7vh),4rem)] leading-[1.03] text-white">{c.title}</h3>
                    <p className="mt-2.5 max-w-md text-[clamp(1rem,min(1.3vw,2.4vh),1.2rem)] leading-relaxed text-white/90">{c.text}</p>
                    <Link
                      to={c.to}
                      tabIndex={i === active ? 0 : -1}
                      className="mt-4 inline-flex min-h-11 items-center gap-3 rounded-full bg-white px-7 py-3 font-medium text-primary transition-colors hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                    >
                      {c.cta}
                      <Arrow size={20} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div data-in className="mt-[clamp(0rem,1vh,0.75rem)]">
              <p className="font-heading text-lg text-white">Already know what you need?</p>
              <ul className="mt-0.5 flex flex-wrap gap-x-7">
                {reasons.map((r) => (
                  <li key={r.label}>
                    <Link to={r.to} className="group/r flex min-h-9 items-center gap-2.5 text-[0.95rem] font-medium text-white/90 hover:text-white">
                      <Icon name={r.icon} size={20} className="shrink-0 text-white" />
                      <span className="underline-offset-4 group-hover/r:underline">{r.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* right: grid, and the photo strip that slides up one frame per slide */}
          <div className="relative flex items-center justify-center">
            <div data-grid aria-hidden="true" className="absolute inset-0" style={GRID} />
            <div
              data-frame
              className="relative h-[min(76vh,40rem)] w-[min(66%,26rem)] overflow-hidden rounded-[28px] bg-secondary ring-1 ring-white/25"
              style={{ boxShadow: "0 40px 80px -36px rgba(0, 0, 40, 0.75)" }}
            >
              <div
                className="absolute inset-0 transition-transform duration-700 ease-in-out"
                style={{ transform: `translateY(-${active * 100}%)` }}
              >
                {SLIDE_PHOTOS.map((s, i) => (
                  <div key={i} className="h-full w-full">
                    <img src={s.src} alt="" className="h-full w-full object-cover" style={{ objectPosition: s.pos }} draggable="false" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

// GSAP pins and React Fast Refresh do not mix; a full reload keeps the pin correct while editing.
if (import.meta.hot) import.meta.hot.accept(() => import.meta.hot.invalidate())
