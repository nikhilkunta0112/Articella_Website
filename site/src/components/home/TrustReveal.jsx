import { useEffect, useRef, useState } from "react"
import Pattern from "@/components/brand/Pattern"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import Icon from "@/components/brand/Icon"
import { images, practice } from "@/data/site"
import { trustPoints } from "@/data/home"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

// The four trust points as photo tiles that reveal on scroll. The motion was analysed from a reference
// recording (cook/MOTION.md) and rebuilt here, not copied: each tile starts as a tiny dot, grows into a
// rounded tile while rising into place (ease-out, staggered), its label reveals character by character
// as the tile lands, and the centred line (existing copy) reveals word by word out of a blur.
//
// One timeline T (seconds) drives everything, and GSAP ScrollTrigger drives T:
// - Desktop: the section is pinned for a short runway and T is scrubbed by scroll. scrub makes the
//   reveal glide and catch up with the scroll position (the smooth, inertial feel of the reference), and
//   it reverses when you scroll back. The reveal is spread over ~72% of a 2.3-screen runway, then holds.
// - Phones: no pinning; T plays once when the section scrolls into view, with tighter timing.
// - Reduced motion: the final state is shown at once.
// ScrollSmoother is deliberately not used: it moves the page with transforms, which breaks the sticky
// columns on other pages and the fixed header.

const RADIUS = 28 // card corner radius at full size (px)
const RUNWAY = 2.3 // pin runway in viewport heights
const REVEAL_SPAN = 0.72 // share of the runway the reveal is spread over (the rest is a short hold)

const clamp01 = (x) => Math.min(1, Math.max(0, x))
const easeOutCubic = (x) => 1 - Math.pow(1 - x, 3)

// Timing sets (seconds). starts: when each tile begins (irregular on purpose); dur: tile growth;
// capDelay: caption starts this long after its tile; wordStart/wordStep: the centred line.
const TIMING = {
  scatter: {
    starts: { trustPhysician: 0, trustInsurance: 0.09, trustHipaa: 0.2, trustSameWeek: 0.29 },
    dur: 1.0, capDelay: 0.28, charStep: 0.009, wordStart: 0.28, wordStep: 0.12, end: 1.45,
    k: () => window.innerHeight / 960,
  },
  stack: {
    starts: { trustInsurance: 0, trustPhysician: 0.07, trustSameWeek: 0.14, trustHipaa: 0.21 },
    dur: 0.9, capDelay: 0.35, charStep: 0.009, wordStart: 0.05, wordStep: 0.1, end: 1.25,
    k: () => 0.28,
  },
}

// Scatter around the centred line. off = how far below its final spot the tile starts (px at a 960px tall
// viewport); kept small enough that tiles start inside the viewport. DOM order = reading order of the points.
// Four identical cards in two aligned columns on either side of the centred line (rows at the same
// heights, equal gaps). side/edge: which edge of the container the card hangs from. off = how far below
// its final spot the card starts (px at a 960px tall viewport), small so it starts inside the viewport.
const CARD_W = "clamp(160px, min(20.5cqw, 30vh), 350px)"
const TILES = [
  { key: "trustInsurance", side: "left", edge: "14.5%", top: "9%", off: 190, pos: "50% 40%" },
  { key: "trustPhysician", side: "right", edge: "14.5%", top: "9%", off: 190, pos: "50% 30%" },
  { key: "trustSameWeek", side: "left", edge: "14.5%", top: "54%", off: 150, pos: "42% 40%" },
  { key: "trustHipaa", side: "right", edge: "14.5%", top: "54%", off: 150, pos: "60% 50%" },
]

// Card look (reference: Bevel Health, via the inspo archive: high-key white cards floating on a calm field
// with soft layered shadows and one blue accent). White card, hairline blue-tint border, a photo window,
// and a label row with an Articella Blue icon chip. Shadows are tinted with the brand blue.
const CARD_SHADOW = [
  "inset 0 1px 0 #fff",
  "0 1px 2px color-mix(in srgb, var(--primary) 10%, transparent)",
  "0 18px 32px -18px color-mix(in srgb, var(--primary) 38%, transparent)",
  "0 46px 70px -40px color-mix(in srgb, var(--primary) 34%, transparent)",
].join(", ")
const CARD_BORDER = "1px solid color-mix(in srgb, var(--primary) 12%, white)"

// Section background: a soft Articella Blue haze behind the headline, a quieter one rising from the bottom,
// and the brand pattern (Brand Book p18) at low contrast on both sides.
const HAZE = [
  "radial-gradient(46% 42% at 50% 48%, color-mix(in srgb, var(--primary) 9%, transparent) 0%, transparent 72%)",
  "radial-gradient(95% 38% at 50% 108%, color-mix(in srgb, var(--primary) 16%, transparent) 0%, transparent 72%)",
].join(", ")

const BIG = ["Start Early.", "Stay Well."]

function Chars({ text }) {
  // words stay whole (no mid-word wrapping); each character is its own span for the reveal
  return text.split(" ").map((word, wi) => (
    <span key={wi} className="inline-block whitespace-nowrap">
      {[...word].map((ch, ci) => (
        <span key={ci} data-char className="inline-block opacity-0">
          {ch}
        </span>
      ))}
      {" "}
    </span>
  ))
}

// Applies timeline time T (seconds) to every animated element inside `el`.
// Built for smooth scrolling: elements and sizes are looked up once (no layout reads or DOM queries per
// frame), a style is only written when its value actually changed, and everything that moves is a
// transform or opacity (compositor-only). Only the card's corner radius still repaints, and only while a
// card is growing.
function makeApply(el, cfg) {
  const set = (node, prop, value, cache) => {
    if (cache[prop] !== value) {
      cache[prop] = value
      node.style[prop] = value
    }
  }
  const tiles = [...el.querySelectorAll("[data-tile]")].map((li) => {
    const box = li.querySelector("[data-box]")
    return {
      li,
      box,
      start: cfg.starts[li.dataset.key],
      off: +li.dataset.off,
      icon: li.querySelector("[data-icon]"),
      chars: [...li.querySelectorAll("[data-caption] [data-char]")].map((node) => ({ node, c: {} })),
      half: 0, // half the card's shorter side (layout size, unaffected by transforms)
      c: { li: {}, box: {}, icon: {} },
    }
  })
  const words = [...el.querySelectorAll("[data-word]")].map((node) => ({ node, c: {} }))
  const line = el.querySelector("[data-bigline]")
  const hint = el.querySelector("[data-hint]")
  const wave = el.querySelector("[data-wave]")
  const lc = {}
  const hc = {}
  const wc = {}
  const measure = () => tiles.forEach((t) => (t.half = Math.min(t.box.offsetWidth, t.box.offsetHeight) * 0.5))
  measure()

  const apply = (T) => {
    const k = cfg.k()
    // background: fades in (opacity only, a compositor-only change) as the cards grow
    if (wave) {
      const e = easeOutCubic(clamp01(T / (cfg.end * 0.85)))
      set(wave, "opacity", String(+e.toFixed(3)), wc)
    }
    // "Scroll down to reveal" cue: fades out as soon as the reveal starts moving
    if (hint) set(hint, "opacity", String(+(1 - clamp01(T / 0.16)).toFixed(3)), hc)
    for (const t of tiles) {
      const x = clamp01((T - t.start) / cfg.dur)
      const e = easeOutCubic(x)
      const sc = 0.05 + 0.95 * e
      set(t.li, "transform", `translate3d(0, ${((1 - e) * t.off * k).toFixed(2)}px, 0)`, t.c.li)
      set(t.box, "transform", `scale(${sc.toFixed(4)})`, t.c.box)
      set(t.box, "opacity", String(+clamp01(x * 60).toFixed(3)), t.c.box)
      // radius is capped at half the size, so the dot stage is a circle
      set(t.box, "borderRadius", `${Math.min(t.half, RADIUS / sc).toFixed(1)}px`, t.c.box)
      // caption: icon, then character by character (with a little blur), as the tile lands
      const c0 = t.start + cfg.capDelay
      if (t.icon) set(t.icon, "opacity", String(+clamp01((T - c0) / 0.2).toFixed(3)), t.c.icon)
      if (T < c0 && !t.charsActive) continue // nothing to draw yet
      let active = false
      for (let j = 0; j < t.chars.length; j++) {
        const o = +clamp01((T - (c0 + j * cfg.charStep)) / 0.12).toFixed(2)
        const ch = t.chars[j]
        set(ch.node, "opacity", String(o), ch.c)
        set(ch.node, "filter", o >= 1 ? "none" : `blur(${((1 - o) * 4).toFixed(1)}px)`, ch.c)
        if (o > 0 && o < 1) active = true
      }
      t.charsActive = active || T < c0 + 0.5 // keep going until we have settled both ways
    }
    // centred line: word by word out of a blur; the block rises into place
    for (let i = 0; i < words.length; i++) {
      const e = +easeOutCubic(clamp01((T - (cfg.wordStart + i * cfg.wordStep)) / 0.4)).toFixed(3)
      const w = words[i]
      set(w.node, "opacity", String(e), w.c)
      set(w.node, "filter", e >= 1 ? "none" : `blur(${((1 - e) * 9).toFixed(1)}px)`, w.c)
    }
    if (line) {
      const y = (1 - easeOutCubic(clamp01((T - cfg.wordStart) / 0.9))) * 70 * k
      set(line, "transform", `translate3d(0, ${y.toFixed(2)}px, 0)`, lc)
    }
  }
  apply.measure = measure
  return apply
}

export default function TrustReveal() {
  const root = useRef(null)
  const [mode, setMode] = useState(null) // "pin" | "timed" | "static" (how it moves)
  const [wide, setWide] = useState(false) // true: scattered desktop layout, false: stacked phone layout

  // Decide the mode on mount and whenever the viewport class changes
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    const wideQ = window.matchMedia("(min-width: 768px)")
    const update = () => {
      setWide(wideQ.matches)
      setMode(reduce.matches ? "static" : wideQ.matches ? "pin" : "timed")
    }
    update()
    reduce.addEventListener("change", update)
    wideQ.addEventListener("change", update)
    return () => {
      reduce.removeEventListener("change", update)
      wideQ.removeEventListener("change", update)
    }
  }, [])

  useEffect(() => {
    if (!mode || !root.current) return
    const el = root.current
    const cfg = wide ? TIMING.scatter : TIMING.stack
    const apply = makeApply(el, cfg)
    const ctx = gsap.context(() => {
      const state = { p: 0, T: 0 }
      if (mode === "static") {
        apply(cfg.end)
        return
      }
      apply(0)
      if (mode === "pin") {
        gsap.to(state, {
          p: 1,
          ease: "none",
          // the reveal is spread over most of the runway (so each wheel notch moves it a little), then holds
          onUpdate: () => apply(clamp01((state.p - 0.02) / REVEAL_SPAN) * cfg.end),
          scrollTrigger: {
            trigger: el,
            start: "top top",
            end: () => "+=" + Math.round(window.innerHeight * RUNWAY),
            pin: true,
            anticipatePin: 1,
            scrub: 1.1, // smoothing: the animation glides to the scroll position over about 1.1 s
            invalidateOnRefresh: true,
            onRefresh: () => apply.measure(),
          },
        })
      } else {
        gsap.to(state, {
          T: cfg.end,
          duration: cfg.end,
          ease: "none",
          onUpdate: () => apply(state.T),
          scrollTrigger: { trigger: el, start: "top 75%", once: true },
        })
      }
    }, el)
    // images above and below change page height once they load
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener("load", refresh)
    document.fonts?.ready.then(refresh)
    // lazy images and late content change the page height; re-measure the pin when it does
    let lastH = document.documentElement.scrollHeight
    let timer = 0
    const ro = new ResizeObserver(() => {
      clearTimeout(timer)
      timer = setTimeout(() => {
        const h = document.documentElement.scrollHeight
        if (Math.abs(h - lastH) > 2) {
          lastH = h
          refresh()
        }
      }, 200)
    })
    ro.observe(document.body)
    return () => {
      clearTimeout(timer)
      ro.disconnect()
      window.removeEventListener("load", refresh)
      ctx.revert()
    }
  }, [mode, wide])

  const scatter = wide // layout only; whether it pins is decided by `mode`
  const labelByKey = Object.fromEntries(
    ["trustInsurance", "trustPhysician", "trustSameWeek", "trustHipaa"].map((k, i) => [k, trustPoints[i]])
  )

  return (
    // The wrapper is React's node. GSAP pins the <section> inside it (creating its pin-spacer here), so
    // React can always remove the wrapper cleanly when you leave the page.
    <div>
      <section
        ref={root}
        aria-label="What to expect at Articella"
        className={cn("relative bg-tint", scatter ? "h-screen min-h-[40rem] overflow-hidden" : "pb-16 pt-24 sm:pb-20")}
      >
        {/* Background: haze + brand pattern, revealed with the cards (see makeApply) */}
        {mode && (
          <div data-wave aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden opacity-0 will-change-[opacity]">
            <div className="absolute inset-0" style={{ background: HAZE }} />
            <Pattern tone="white" flip className="absolute -bottom-[9%] -left-[5%] w-[30%] min-w-[220px] opacity-[0.055]" />
            <Pattern tone="white" className="absolute -right-[5%] -top-[9%] w-[30%] min-w-[220px] opacity-[0.055]" />
          </div>
        )}
        <div className={cn("relative mx-auto max-w-[1500px] px-5", scatter && "h-full [container-type:inline-size]")}>
          {/* Scroll cue (desktop pin only): shown in the empty frame before the reveal, fades once it starts */}
          {mode === "pin" && (
            <div
              data-hint
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-[36%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-5 text-primary"
            >
              <span className="font-sans text-[clamp(0.8rem,1.15vw,1.05rem)] font-light uppercase tracking-[0.5em] pl-[0.5em] opacity-80">
                Scroll down to reveal
              </span>
              <svg
                className="scroll-cue h-14 w-5 overflow-visible"
                viewBox="0 0 20 56"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 2 V52" />
                <path d="M3 45 L10 52 L17 45" />
              </svg>
            </div>
          )}

          {/* Centred line (existing copy): word by word out of a blur */}
          <div
            data-bigline
            className={cn(
              "text-center",
              scatter ? "absolute left-1/2 top-1/2 w-[min(34vw,30rem)] -translate-x-1/2 -translate-y-1/2" : "mx-auto mb-10"
            )}
          >
            <p className="sr-only">{practice.tagline}</p>
            <div aria-hidden="true" className="font-heading text-[clamp(2.1rem,4.2vw,4rem)] font-bold leading-[1.06] text-primary">
              {BIG.map((line, i) => (
                <span key={i} className="block">
                  {line.split(" ").map((w, wi) => (
                    <span key={wi} data-word className="inline-block opacity-0 will-change-[filter,opacity]">
                      {w}
                      {" "}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>

          {/* The four tiles */}
          <ul className={cn(!scatter && "mx-auto grid max-w-md grid-cols-2 gap-4 sm:gap-6")}>
            {TILES.map((t) => {
              const point = labelByKey[t.key]
              return (
                <li
                  key={t.key}
                  data-tile
                  data-key={t.key}
                  data-off={t.off}
                  className={cn("will-change-transform", scatter && "absolute")}
                  style={scatter ? { [t.side]: t.edge, top: t.top, width: CARD_W } : undefined}
                >
                  <div
                    data-box
                    className="relative aspect-[4/5] overflow-hidden bg-white opacity-0 will-change-transform"
                    style={{ boxShadow: CARD_SHADOW, border: CARD_BORDER }}
                  >
                    {/* photo window */}
                    <div className="absolute inset-x-2 bottom-[26%] top-2 overflow-hidden rounded-[20px] bg-secondary">
                      <img
                        src={images[t.key]}
                        alt=""
                        className="h-full w-full object-cover"
                        style={{ objectPosition: t.pos }}
                        draggable="false"
                        loading="eager"
                      />
                    </div>
                    {/* label: icon chip + text */}
                    <p
                      data-caption
                      className="absolute inset-x-0 bottom-0 flex h-[26%] items-center gap-2 px-3 text-balance text-[0.78rem] font-medium leading-tight text-primary min-[480px]:gap-3 min-[480px]:px-4 min-[480px]:text-[1rem] min-[480px]:leading-snug sm:text-[1.05rem]"
                    >
                      <span
                        data-icon
                        className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground opacity-0 min-[480px]:size-10 [&_svg]:size-[16px] min-[480px]:[&_svg]:size-5"
                      >
                        <Icon name={point.icon} size={20} />
                      </span>
                      <span className="sr-only">{point.label}</span>
                      <span aria-hidden="true">
                        <Chars text={point.label} />
                      </span>
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </div>
      </section>
    </div>
  )
}

// GSAP pins and React Fast Refresh do not mix; a full reload keeps the pin correct while editing.
if (import.meta.hot) import.meta.hot.accept(() => import.meta.hot.invalidate())
