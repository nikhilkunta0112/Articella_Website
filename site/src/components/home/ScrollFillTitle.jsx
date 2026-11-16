import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { cn } from "@/lib/utils"

gsap.registerPlugin(ScrollTrigger)

// Entry title for a Home section: the title and its lead line are filled word by word with Articella Blue
// as you scroll (the text starts as faint black). Once every word is filled the pin releases and the page
// moves on into the section. Same idea as the "text reveal by word" reference: each word has a faint base
// layer and a blue layer whose opacity follows the scroll range [i/n, (i+1)/n]. Built with GSAP
// ScrollTrigger (scrubbed) like the other scroll sections.
//
// The pinned <section> lives inside a React-owned wrapper <div> (GSAP wraps it in a pin-spacer).

const FILL_END = 0.84 // the text is completely filled at this share of the pin; the rest is a short hold

// Desktop (>= 1024 px) without reduced motion gets the scroll-driven version; everything else keeps the
// plain heading inside its section. null until known, so the wrong layout never flashes.
export function useFillMode() {
  const [on, setOn] = useState(null)
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)")
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    const update = () => setOn(wide.matches && !reduce.matches)
    update()
    wide.addEventListener("change", update)
    reduce.addEventListener("change", update)
    return () => {
      wide.removeEventListener("change", update)
      reduce.removeEventListener("change", update)
    }
  }, [])
  return on
}

function Words({ text }) {
  // The space between words sits outside the word box, so the blue layer (same box as the base text)
  // lines up exactly with the faint layer underneath it.
  return text.split(" ").map((w, i) => (
    <span key={i}>
      <span className="relative inline-block">
        <span className="text-black/[0.14]">{w}</span>
        <span data-fill aria-hidden="true" className="absolute left-0 top-0 whitespace-nowrap text-primary opacity-0">
          {w}
        </span>
      </span>
      {" "}
    </span>
  ))
}

export default function ScrollFillTitle({ id, title, lead, runway = 2.8 }) {
  const rootRef = useRef(null)

  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const fills = [...el.querySelectorAll("[data-fill]")]
    const n = fills.length
    const last = fills.map(() => -1)
    const apply = (p) => {
      const f = Math.min(1, p / FILL_END)
      for (let i = 0; i < n; i++) {
        const o = +Math.min(1, Math.max(0, f * n - i)).toFixed(3) // word i fills across [i/n, (i+1)/n]
        if (o !== last[i]) {
          last[i] = o
          fills[i].style.opacity = String(o)
        }
      }
    }
    const ctx = gsap.context(() => {
      const state = { p: 0 }
      apply(0)
      gsap.to(state, {
        p: 1,
        ease: "none",
        onUpdate: () => apply(state.p),
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => "+=" + Math.round(window.innerHeight * runway),
          pin: true,
          anticipatePin: 1,
          scrub: 0.35, // tight: the fill follows the scroll closely, so it is visible even when scrolling quickly
          invalidateOnRefresh: true,
        },
      })
    }, el)
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener("load", refresh)
    document.fonts?.ready.then(refresh)
    // other sections above and below finish their layout a moment after mount: re-measure the pin once
    // they have (so its start and end are right even when the page settles late)
    const late = [setTimeout(refresh, 400), setTimeout(refresh, 1500)]
    return () => {
      late.forEach(clearTimeout)
      window.removeEventListener("load", refresh)
      ctx.revert()
    }
  }, [runway])

  return (
    <div>
      <section
        ref={rootRef}
        aria-labelledby={id}
        className="relative flex h-screen min-h-[34rem] items-center justify-center overflow-hidden bg-background px-6"
      >
        <div className="mx-auto w-full max-w-5xl text-center">
          <h2 id={id} className="text-[clamp(2.4rem,6vw,5.6rem)] font-bold leading-[1.04]">
            <span className="sr-only">{title}</span>
            <span aria-hidden="true">
              <Words text={title} />
            </span>
          </h2>
          <p className="mx-auto mt-[clamp(1.25rem,4vh,2.5rem)] max-w-3xl text-[clamp(1.1rem,1.9vw,1.7rem)] leading-snug">
            <span className="sr-only">{lead}</span>
            <span aria-hidden="true">
              <Words text={lead} />
            </span>
          </p>
        </div>
      </section>
    </div>
  )
}

// GSAP pins and React Fast Refresh do not mix; a full reload keeps the pin correct while editing.
if (import.meta.hot) import.meta.hot.accept(() => import.meta.hot.invalidate())
