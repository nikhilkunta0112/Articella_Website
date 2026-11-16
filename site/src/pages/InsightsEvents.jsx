import { useState } from "react"
import PageHero from "@/components/common/PageHero"
import { Section, SectionHeading } from "@/components/common/Section"
import Reveal from "@/components/common/Reveal"
import BrandButton from "@/components/common/BrandButton"
import Icon from "@/components/brand/Icon"
import ResourceLinks from "@/components/resources/ResourceLinks"
import Actions from "@/components/resources/Actions"
import PageCta from "@/components/patients/PageCta"
import ChipGroup from "@/components/patients/ChipGroup"
import { Badge } from "@/components/ui/badge"
import { articles, images, routes } from "@/data/site"
import { insightFilters } from "@/data/resources"

const featured = articles.find((a) => a.id === "screenings")
// The featured article is shown once, as the feature. Everything else goes in the grid.
const rest = articles.filter((a) => a.id !== featured.id)
const filters = insightFilters.filter((f) => f.id === "all" || rest.some((a) => a.type === f.id))
const postedLabel = (a) => `Posted ${a.dateLabel.replace(/\s*\(past event\)/i, "")}`

function ArticleCard({ item, delay }) {
  const past = item.type === "Past event"
  return (
    <Reveal delay={delay} className="h-full">
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50">
        <div className="flex flex-1 flex-col p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Badge variant={past ? "secondary" : "default"} className="h-8 px-3 text-sm">
              {item.type}
            </Badge>
            <time dateTime={item.date} className="text-base text-foreground/75">
              {postedLabel(item)}
            </time>
          </div>
          <h3 className="mt-4 text-2xl text-primary">{item.title}</h3>
          <p className="mt-3 text-[1.0625rem] text-foreground/80">{item.blurb}</p>
          {past && (
            <p className="mt-3 text-[1.0625rem] text-foreground/80">
              This event has already taken place. The original post is kept here for reference.
            </p>
          )}
          <div className="mt-auto pt-5">
            <BrandButton
              variant="quiet"
              href={item.url}
              icon="arrowUpRight"
              className="-ml-1 min-h-11 text-base"
              aria-label={`${past ? "Read the original post about" : "Read"} ${item.title} (opens in a new tab)`}
            >
              {past ? "Read the original post" : "Read on articella.com"}
            </BrandButton>
          </div>
        </div>
      </article>
    </Reveal>
  )
}

export default function InsightsEvents() {
  const [filter, setFilter] = useState("all")
  const items = rest.filter((a) => filter === "all" || a.type === filter)
  const active = filters.find((f) => f.id === filter)
  const countText =
    filter === "all"
      ? `Showing all ${items.length} more posts, below the featured article`
      : `Showing ${items.length} ${items.length === 1 ? "post" : "posts"} in ${active.label}`

  return (
    <>
      <PageHero
        title="Health reading and practice updates"
        lead="Come and read our health articles, practice news and community updates. Everything here comes from Articella Primary Care in Frisco."
        image={images.insights}
        imageAlt="Two people walking and talking outdoors on a sunny day"
        actions={
          <>
            <BrandButton href={featured.url} icon="arrowUpRight" className="h-[52px] text-base">
              Read the featured article
            </BrandButton>
            <BrandButton variant="outline" href="#browse" icon="chevronDown" className="h-[52px] text-base">
              Browse all posts
            </BrandButton>
          </>
        }
      />
      <ResourceLinks current={routes.insights} />

      {/* Featured article: image-led */}
      <Section className="pt-14 pb-10 sm:pt-20 sm:pb-12 lg:pt-24 lg:pb-14">
        <Reveal>
          <article className="grid overflow-hidden rounded-3xl border border-border bg-tint lg:grid-cols-[1fr_1.05fr]">
            <img
              src={images.insightsA}
              alt="A clinician talking with a patient during a check-up"
              className="aspect-[16/10] h-full w-full object-cover lg:aspect-auto lg:min-h-[26rem]"
              loading="lazy"
            />
            <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
              <Badge className="h-8 w-fit px-3 text-sm">Featured article</Badge>
              <h2 className="mt-5 text-3xl text-primary sm:text-4xl">{featured.title}</h2>
              <p className="mt-4 max-w-xl text-lg text-foreground/80">{featured.blurb}</p>
              <p className="mt-5 flex items-center gap-2 text-base text-foreground/75">
                <Icon name="calendar" size={18} className="text-primary" />
                <time dateTime={featured.date}>{postedLabel(featured)}</time>
              </p>
              <Actions className="mt-7 flex-col items-stretch sm:flex-row sm:items-center">
                <BrandButton
                  href={featured.url}
                  icon="arrowUpRight"
                  className="w-full sm:w-auto"
                  aria-label={`Read ${featured.title} on articella.com (opens in a new tab)`}
                >
                  Read the original article
                </BrandButton>
                <span className="text-base text-foreground/80">Opens articella.com in a new tab</span>
              </Actions>
            </div>
          </article>
        </Reveal>
      </Section>

      {/* Browse by type */}
      <Section id="browse" className="scroll-mt-20 pt-4 pb-14 sm:pt-6 sm:pb-20 lg:pt-6 lg:pb-24">
        <SectionHeading
          className="mb-6 lg:mb-8"
          title="More from the practice"
          lead="Choose a category to see only those posts. Event posts are labeled as past events so they are not mistaken for upcoming appointments."
        />
        <Reveal>
          <ChipGroup label="Filter posts by type" options={filters} value={filter} onChange={setFilter} />
          <p aria-live="polite" className="mt-4 text-base text-foreground/80">
            {countText}
          </p>
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:gap-8">
          {items.map((item, i) => (
            <ArticleCard key={item.id} item={item} delay={i * 80} />
          ))}
        </div>

        <p className="mt-10 max-w-3xl text-base text-foreground/80">
          Clinician-reviewed guides, provider videos and future events will be added once the practice publishes them.
        </p>
      </Section>

      <PageCta
        title="Questions about your own health?"
        text="Articles are general reading, not personal medical advice. Book a visit or call the office to talk with the care team."
      />
    </>
  )
}
