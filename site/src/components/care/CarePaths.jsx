import { Section, SectionHeading } from "@/components/common/Section"
import Reveal from "@/components/common/Reveal"
import Icon from "@/components/brand/Icon"
import { carePaths } from "@/data/care"
import { images } from "@/data/site"

// Mobile: a 16:9 photo on top with the text below. Desktop: image-led panels, the picture
// fills the card and the text sits on a white plate at its foot.
export default function CarePaths({ onChoose }) {
  return (
    <Section className="py-14 sm:py-20 lg:py-[clamp(2.5rem,8vh,6rem)]">
      <SectionHeading
        title="Where would you like to begin?"
        lead="Pick the path that sounds most like you today. Each one takes you to the visits that fit it."
      />
      <div className="grid gap-4 md:grid-cols-3 md:gap-6 lg:gap-8">
        {carePaths.map((p, i) => (
          <Reveal key={p.id} delay={i * 90} className="h-full">
            <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background transition duration-300 hover:-translate-y-0.5 hover:border-primary md:border-0">
              <div className="aspect-[16/9] w-full flex-none overflow-hidden bg-tint md:aspect-auto md:h-[clamp(13rem,30vh,19rem)]">
                <img
                  src={images[p.imageKey]}
                  alt={p.alt}
                  loading="eager"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  style={{ objectPosition: p.position ?? "50% 40%" }}
                />
              </div>
              <div className="flex flex-1 flex-col p-5 sm:p-6 md:relative md:-mt-10 md:mx-3 md:mb-3 md:rounded-xl md:bg-background md:p-6">
                <h3 className="text-2xl text-primary">{p.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted-foreground sm:text-[1.0625rem]">{p.text}</p>
                <button
                  type="button"
                  onClick={() => onChoose(p.opens)}
                  className="mt-3 inline-flex min-h-11 items-center gap-2 self-start rounded-md text-base font-medium text-primary underline-offset-4 hover:underline md:mt-4"
                >
                  {p.cta}
                  <Icon name="arrowRight" size={18} />
                </button>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
