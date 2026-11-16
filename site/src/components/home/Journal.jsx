import { Link } from "react-router-dom"
import { Container } from "@/components/common/Section"
import Reveal from "@/components/common/Reveal"
import Icon from "@/components/brand/Icon"
import { Arrow, ArrowLink } from "@/components/home/Arrow"
import { HomeHeading, rhythm } from "@/components/home/Head"
import { articles, images, routes } from "@/data/site"

const CARD = "group flex overflow-hidden rounded-3xl border border-border bg-white transition duration-300 hover:-translate-y-1 hover:border-primary"
const SHADOW = { boxShadow: "0 34px 60px -46px color-mix(in srgb, var(--primary) 45%, transparent)" }

function Dated({ a, className }) {
  return (
    <time dateTime={a.date} className={className}>
      {a.dateLabel}
    </time>
  )
}

// One featured article with a large photo and two updates with thumbnails. Same card language as the rest
// of Home: white cards, hairline border, Articella Blue tinted shadows, Platypi titles. Each photo zooms
// slightly on hover; the type of post sits on the photo as a white tag.
export default function Journal() {
  const featured = articles.find((a) => a.type === "Article") ?? articles[0]
  const updates = articles.filter((a) => a.id !== featured.id).slice(0, 2)
  return (
    <section aria-labelledby="journal-title" className={`bg-tint ${rhythm}`}>
      <Container>
        {/* heading, lead and the link read as one compact block, so the heading and every card fit in one window */}
        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end lg:mb-[clamp(1.25rem,4vh,2.5rem)]">
          <HomeHeading
            id="journal-title"
            title="Health reading and practice updates"
            lead="Plain-language reading from the practice, and news about what is happening at Articella."
            maxW="max-w-5xl"
          />
          <ArrowLink to={routes.insights} className="shrink-0">
            All insights and events
          </ArrowLink>
        </div>

        <div className="grid gap-5 lg:h-[clamp(24rem,54vh,31rem)] lg:grid-cols-[minmax(0,1.25fr)_minmax(0,1fr)] lg:gap-6">
          {/* featured article: the photo fills the card, the text sits on an Articella Blue fade */}
          <Reveal className="h-full">
            <a
              href={featured.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex h-full min-h-[24rem] flex-col justify-end overflow-hidden rounded-3xl border border-border bg-primary transition duration-300 hover:-translate-y-1"
              style={SHADOW}
            >
              <img
                src={images[featured.image]}
                alt=""
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(to top, var(--primary) 0%, color-mix(in srgb, var(--primary) 92%, transparent) 30%, color-mix(in srgb, var(--primary) 40%, transparent) 62%, transparent 100%)",
                }}
              />
              <span className="absolute left-5 top-5 rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-primary shadow-sm">
                Featured, preventive health
              </span>
              <div className="relative p-6 sm:p-8">
                <Dated a={featured} className="text-base text-white/85" />
                <h3 className="mt-1.5 max-w-xl text-[1.6rem] leading-tight text-white sm:text-[1.9rem]">{featured.title}</h3>
                <p className="mt-2 max-w-xl text-lg text-white/90">{featured.blurb}</p>
                <span className="mt-4 inline-flex items-center gap-2 font-medium text-white">
                  Read the article
                  <Icon name="external" size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            </a>
          </Reveal>

          {/* updates */}
          <div className="grid gap-5 lg:min-h-0 lg:grid-rows-2 lg:gap-6">
            {updates.map((a, i) => (
              <Reveal key={a.id} delay={(i + 1) * 90} className="h-full min-h-0">
                <Link to={routes.insights} className={`${CARD} h-full flex-col sm:flex-row`} style={SHADOW}>
                  <div className="relative aspect-[16/9] shrink-0 overflow-hidden bg-secondary sm:aspect-auto sm:w-[38%]">
                    <img
                      src={images[a.image]}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.05] sm:absolute sm:inset-0"
                    />
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-center p-5 lg:p-[clamp(1rem,2.4vh,1.5rem)]">
                    <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-base text-foreground/75">
                      <span className="rounded-full bg-secondary px-3 py-0.5 text-sm font-medium text-primary">{a.type}</span>
                      <Dated a={a} />
                    </span>
                    <span className="mt-2 block font-heading text-xl font-semibold leading-snug text-primary">{a.title}</span>
                    <span className="mt-1 line-clamp-2 block text-base text-foreground/80 [@media(max-height:820px)]:hidden">{a.blurb}</span>
                    <span className="mt-3 inline-flex items-center gap-2 font-medium text-primary [@media(max-height:820px)]:mt-2">
                      Read more
                      <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
