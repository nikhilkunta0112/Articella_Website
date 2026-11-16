import { Section } from "@/components/common/Section"
import Reveal from "@/components/common/Reveal"
import BrandButton from "@/components/common/BrandButton"
import { team } from "@/data/site"

const rahul = team[0]

// Text-led founder block: the big quote carries it, the portrait is a small circular crop.
export default function Founder() {
  return (
    <Section tone="tint" id="founder" className="py-14 sm:py-20 lg:py-[clamp(2.5rem,8vh,7rem)]">
      <div className="grid items-start gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal>
          <h2 className="text-3xl text-primary sm:text-4xl lg:text-[2.75rem]">The founder's reason</h2>
          <p className="mt-5 max-w-lg text-lg text-foreground/85">
            Dr. Rahul Singh has spent decades at the frontlines of healthcare. Along the way, he saw how rushed appointments and overlooked prevention left people thinking about their health only when something went wrong.
          </p>
          <p className="mt-4 max-w-lg text-lg text-foreground/85">{rahul.intro}</p>
        </Reveal>
        <Reveal delay={100}>
          <figure className="rounded-3xl border border-border bg-background p-7 sm:p-10 lg:p-12">
            <blockquote className="font-heading text-[1.65rem] leading-snug text-primary sm:text-3xl lg:text-[2.25rem]">
              He wanted a place where care is not rushed and prevention is valued as deeply as treatment.
            </blockquote>
            <figcaption className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-4 border-t border-border pt-7">
              <img
                src={rahul.photo}
                alt={`Portrait of ${rahul.name}, founder of Articella`}
                className="size-[72px] flex-none rounded-full object-cover object-[50%_20%]"
                loading="eager"
              />
              <div className="min-w-0 flex-1">
                <p className="font-heading text-xl text-primary">
                  {rahul.name}, {rahul.credentials}
                </p>
                <p className="text-base text-muted-foreground">{rahul.role}</p>
              </div>
              <BrandButton to="/providers#rahul-singh" variant="outline" icon="arrowRight">
                Read his full background
              </BrandButton>
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </Section>
  )
}
