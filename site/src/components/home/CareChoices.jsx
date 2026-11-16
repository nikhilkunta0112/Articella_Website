import { Link } from "react-router-dom"
import ScrollFillTitle, { useFillMode } from "@/components/home/ScrollFillTitle"
import CareStory from "@/components/home/CareStory"
import { Container } from "@/components/common/Section"
import Reveal from "@/components/common/Reveal"
import Icon from "@/components/brand/Icon"
import { Arrow } from "@/components/home/Arrow"
import { HomeHeading, rhythm } from "@/components/home/Head"
import { careChoices, reasons } from "@/data/home"

const CARE_LEAD = "Three ways into care at Articella. Choose the path that fits where you are today."

// "Where would you like to begin?": a pinned scroll story on desktop (CareStory), and on phones, tablets and
// with reduced motion the same content as an open list of rows beside the heading (CareList).
export default function CareChoices() {
  const story = useFillMode() // null until we know (avoids a flash of the wrong layout)
  if (story === null) return <div className="min-h-[40rem] bg-background" aria-hidden="true" />
  return story ? (
    <>
      <ScrollFillTitle id="begin-title" title="Where would you like to begin?" lead={CARE_LEAD} />
      <CareStory />
    </>
  ) : (
    <CareList />
  )
}

// The three ways into care as an open list of rows beside the heading. The quick links for people who
// already know what they need sit under the heading, so the left column is never empty.
function CareList() {
  return (
    <section aria-labelledby="begin-title" className={`bg-background ${rhythm}`}>
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-20">
          <HomeHeading
            id="begin-title"
            title="Where would you like to begin?"
            lead={CARE_LEAD}
            maxW="max-w-md"
          >
            <div className="mt-8 border-t border-border pt-6">
              <p className="font-heading text-xl text-primary">Already know what you need?</p>
              <ul className="mt-2 grid grid-cols-2 gap-x-4 lg:grid-cols-1 xl:grid-cols-2 xl:gap-x-6">
                {reasons.map((r) => (
                  <li key={r.label}>
                    <Link
                      to={r.to}
                      className="group/r flex min-h-11 items-center gap-3 py-1 text-base font-medium text-foreground hover:text-primary"
                    >
                      <Icon name={r.icon} size={22} className="shrink-0 text-primary" />
                      <span className="underline-offset-4 group-hover/r:underline">{r.label}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </HomeHeading>
          <ul className="border-t border-border">
            {careChoices.map((c, i) => (
              <li key={c.title}>
                <Reveal delay={i * 80}>
                  <Link
                    to={c.to}
                    className="group flex items-start gap-5 border-b border-border py-6 transition-colors duration-300 hover:bg-tint sm:items-center sm:gap-7 sm:px-4 sm:py-6"
                  >
                    <span className="grid size-14 shrink-0 place-items-center rounded-full bg-secondary text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-white sm:size-16">
                      <Icon name={c.icon} size={28} />
                    </span>
                    <span className="flex-1">
                      <h3 className="text-2xl text-primary">{c.title}</h3>
                      <span className="mt-1.5 block text-base leading-relaxed text-foreground/80 sm:text-lg">{c.text}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-2 self-center font-medium text-primary">
                      <span className="hidden sm:inline">{c.cta}</span>
                      <Arrow size={22} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
