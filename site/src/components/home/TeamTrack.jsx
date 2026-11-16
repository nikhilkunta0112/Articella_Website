import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import DoctorCard from "@/components/home/DoctorCard"
import { clinicians } from "@/data/site"

gsap.registerPlugin(ScrollTrigger)

// Horizontal scroll for the care team (desktop). The section pins and vertical scrolling pans a row of
// doctor cards sideways; a thin progress bar under the row shows how far along you are. Built for growth:
// the pan distance is measured from the real width of the row, so adding people to `clinicians` makes the
// track longer with no other change. If everything already fits on screen the pan distance is zero and
// only the entrance plays.
//
// Structure note: GSAP wraps the pinned <section> in a pin-spacer, so the section lives inside a
// React-owned wrapper <div> (React can always remove the wrapper cleanly when you leave the page).

const HOLD_VH = 0.55 // extra scroll (in viewport heights) so the entrance and the end state are not rushed

export default function TeamTrack({ open }) {
  const rootRef = useRef(null)
  const trackRef = useRef(null)
  const barRef = useRef(null)
  const stRef = useRef(null)

  useEffect(() => {
    const el = rootRef.current
    const track = trackRef.current
    if (!el || !track) return
    // how far the row has to travel so its last card ends at the right content edge
    const dist = () => Math.max(0, track.scrollWidth - window.innerWidth)
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray("[data-card]", track)
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => "+=" + Math.round(dist() + window.innerHeight * HOLD_VH),
          pin: true,
          anticipatePin: 1,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (barRef.current) barRef.current.style.transform = `scaleX(${self.progress.toFixed(4)})`
          },
        },
      })
      stRef.current = tl.scrollTrigger
      // entrance: the cards slide in from the right and settle (first part of the scroll) ...
      tl.from(cards, { x: () => window.innerWidth * 0.22, opacity: 0, stagger: { amount: 0.3 }, duration: 0.45, ease: "power3.out" }, 0)
      // ... then the whole row pans left, 1 : 1 with the scroll distance
      tl.to(track, { x: () => -dist(), duration: 1 }, 0.35)
    }, el)
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener("load", refresh)
    document.fonts?.ready.then(refresh)
    const late = [setTimeout(refresh, 400), setTimeout(refresh, 1500)]
    return () => {
      late.forEach(clearTimeout)
      window.removeEventListener("load", refresh)
      stRef.current = null
      ctx.revert()
    }
  }, [])

  // Keyboard: tabbing to a card that is off screen scrolls the page to the point where it is in view.
  const onFocus = (e) => {
    const st = stRef.current
    const card = e.target.closest?.("[data-card]")
    if (!st || !card) return
    const track = trackRef.current
    const dist = Math.max(0, track.scrollWidth - window.innerWidth)
    if (!dist) return
    const left = card.offsetLeft // position inside the row, unaffected by the transform
    const want = Math.min(dist, Math.max(0, left - (window.innerWidth - card.offsetWidth) / 2))
    const total = st.end - st.start
    const entrance = 0.35 / 1.35 // share of the timeline used before the pan starts
    window.scrollTo({ top: st.start + (entrance + (want / dist) * (1 - entrance)) * total, behavior: "smooth" })
  }

  return (
    <div>
      <section
        ref={rootRef}
        aria-label="Care team"
        className="relative flex h-screen min-h-[36rem] flex-col justify-center overflow-hidden bg-tint"
      >
        {/* the row: padded to the page's content edge on both sides, so the last card ends aligned */}
        <div
          ref={trackRef}
          onFocus={onFocus}
          className="flex w-max min-w-full items-stretch justify-center gap-8 will-change-transform"
          style={{ paddingInline: "max(2rem, calc((100vw - 75rem) / 2))" }}
        >
          {clinicians.map((p) => (
            <div key={p.id} data-card className="w-[clamp(21rem,27vw,27rem)] shrink-0">
              <DoctorCard p={p} open={open} track />
            </div>
          ))}
        </div>
        <div aria-hidden="true" className="mx-auto mt-[clamp(1.5rem,5vh,3rem)] h-1 w-[min(34rem,60vw)] overflow-hidden rounded-full bg-primary/15">
          <div ref={barRef} className="h-full origin-left rounded-full bg-primary" style={{ transform: "scaleX(0)" }} />
        </div>
      </section>
    </div>
  )
}

// GSAP pins and React Fast Refresh do not mix; a full reload keeps the pin correct while editing.
if (import.meta.hot) import.meta.hot.accept(() => import.meta.hot.invalidate())
