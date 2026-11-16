import { useState } from "react"
import { Section, SectionHeading } from "@/components/common/Section"
import Reveal from "@/components/common/Reveal"
import BrandButton from "@/components/common/BrandButton"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { team } from "@/data/site"
import { atPractice } from "@/data/about"

function Card({ p, onOpen }) {
  return (
    <article className="group grid h-full grid-cols-[112px_1fr] items-center overflow-hidden rounded-2xl border border-border bg-card transition-[transform,border-color] duration-300 hover:-translate-y-0.5 hover:border-primary/50 sm:grid-cols-[150px_1fr] md:grid-cols-1 md:grid-rows-[auto_1fr] md:items-stretch">
      <div className="relative m-3 aspect-[4/5] overflow-hidden rounded-xl bg-secondary md:m-3 md:mb-0">
        <img
          src={p.photo}
          alt={`Portrait of ${p.name}`}
          className="absolute inset-0 h-full w-full object-cover object-[50%_18%] transition-transform duration-500 group-hover:scale-[1.03]"
          loading="eager"
        />
      </div>
      <div className="flex flex-col justify-center py-4 pr-4 md:flex-1 md:p-5 md:pt-4">
        <h3 className="text-xl text-primary">
          {p.name}
          {p.credentials ? `, ${p.credentials}` : ""}
        </h3>
        <p className="mt-1 mb-4 text-base text-muted-foreground">{p.role}</p>
        <BrandButton variant="outline" size="sm" className="min-h-11 self-start text-base md:mt-auto" onClick={onOpen}>
          Learn More
        </BrandButton>
      </div>
    </article>
  )
}

export default function TeamGrid() {
  const [sel, setSel] = useState(null)

  return (
    <Section id="team" className="py-14 sm:py-20 lg:py-[clamp(2.5rem,8vh,7rem)]">
      <SectionHeading
        title="Everyone behind the experience"
        lead="From the clinicians who care for you to the people who welcome you and keep the practice running."
      />
      <div className="grid gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 xl:grid-cols-5">
        {team.map((p, i) => (
          <Reveal key={p.id} delay={i * 70} className="h-full min-w-0">
            <Card p={p} onOpen={() => setSel(p)} />
          </Reveal>
        ))}
      </div>

      <Dialog open={!!sel} onOpenChange={(o) => !o && setSel(null)}>
        <DialogContent className="max-h-[88vh] gap-5 overflow-y-auto rounded-2xl p-6 sm:max-w-xl sm:p-8">
          {sel && (
            <>
              <DialogHeader className="flex-row items-center gap-4 pr-8">
                <img src={sel.photo} alt="" className="size-20 flex-none rounded-xl object-cover sm:size-24" />
                <div>
                  <DialogTitle className="font-heading text-2xl leading-tight text-primary sm:text-[1.75rem]">
                    {sel.name}
                    {sel.credentials ? `, ${sel.credentials}` : ""}
                  </DialogTitle>
                  <DialogDescription className="mt-1 text-base">{sel.role}</DialogDescription>
                </div>
              </DialogHeader>
              <div className="space-y-6 text-base text-foreground/85">
                <div>
                  <h4 className="text-lg text-primary">What they do at the practice</h4>
                  <p className="mt-2">{atPractice[sel.id]}</p>
                </div>
                <div>
                  <h4 className="text-lg text-primary">Background</h4>
                  <p className="mt-2">{sel.intro}</p>
                  {sel.bio.map((b) => (
                    <p key={b} className="mt-3">
                      {b}
                    </p>
                  ))}
                </div>
                {sel.education && (
                  <div>
                    <h4 className="text-lg text-primary">Education</h4>
                    <ul className="mt-2 space-y-2">
                      {sel.education.map((e) => (
                        <li key={e.label}>
                          <span className="font-medium text-foreground">{e.label}:</span> {e.value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                {sel.note && <p className="rounded-xl bg-secondary p-4 text-primary">{sel.note}</p>}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </Section>
  )
}
