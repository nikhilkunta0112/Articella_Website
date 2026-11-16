import Pattern from "@/components/brand/Pattern"
import { Container } from "@/components/common/Section"
import Reveal from "@/components/common/Reveal"
import { ArrowLink } from "@/components/home/Arrow"
import { rhythm } from "@/components/home/Head"
import { images, routes } from "@/data/site"
import { approachPoints } from "@/data/home"

// A clean split on an Articella Blue panel with white text (the sections above and below are pale): one wide rounded photo on the left; on the right the title, the approach
// sentence, a short bulleted list and the link. Quiet on purpose (no overlays or badges), modelled on a
// reference with a group photo beside a heading, a paragraph and three bullets. The photo's height
// follows the window, so the title and everything under it fit in one window on desktop.
export default function Approach() {
  return (
    <section aria-labelledby="approach-title" className={`relative isolate overflow-hidden bg-primary text-primary-foreground ${rhythm}`}>
      <Pattern tone="blue" aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 -z-10 hidden w-80 opacity-[0.07] lg:block" />
      <Container>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-[clamp(2.5rem,5vw,5rem)]">
          <Reveal>
            <img
              src={images.homeApproach}
              alt="Four smiling clinicians in white coats and scrubs standing together in a bright, modern clinic corridor."
              loading="lazy"
              className="aspect-[3/2] w-full rounded-3xl object-cover ring-1 ring-white/30 lg:aspect-auto lg:h-[clamp(18rem,50vh,28rem)]"
              style={{ objectPosition: "28% 40%", boxShadow: "0 40px 70px -40px rgba(0, 0, 40, 0.7)" }}
            />
          </Reveal>

          <Reveal delay={90}>
            <h2 id="approach-title" className="text-balance text-[2.125rem] leading-[1.1] text-white sm:text-[2.5rem] lg:text-[2.75rem]">
              Care that starts with a conversation
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/90 sm:text-xl">
              The Articella approach is simple: understand the person first, then plan together.
            </p>
            <ul className="mt-6 space-y-3 lg:mt-[clamp(1rem,3vh,1.75rem)]">
              {approachPoints.map((a) => (
                <li key={a.title} className="flex gap-3 text-lg leading-snug text-white sm:text-xl">
                  <span aria-hidden="true" className="mt-[0.6em] size-2 shrink-0 rounded-full bg-white" />
                  <span>
                    <span className="font-semibold text-white">{a.title}.</span> <span className="text-white/90">{a.text}</span>
                  </span>
                </li>
              ))}
            </ul>
            <ArrowLink to={routes.about} tone="white" className="mt-5 lg:mt-[clamp(0.75rem,2vh,1.25rem)]">
              Read about Articella
            </ArrowLink>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
