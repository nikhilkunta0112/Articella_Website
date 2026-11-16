import { useEffect, useState } from "react"
import { Section, SectionHeading } from "@/components/common/Section"
import Reveal from "@/components/common/Reveal"
import BrandButton from "@/components/common/BrandButton"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { chapters, fullStory } from "@/data/about"
import { images } from "@/data/site"

function useDesktop() {
  const q = "(min-width: 1024px)"
  const [match, setMatch] = useState(() => (typeof window !== "undefined" ? window.matchMedia(q).matches : true))
  useEffect(() => {
    const m = window.matchMedia(q)
    const on = () => setMatch(m.matches)
    m.addEventListener("change", on)
    return () => m.removeEventListener("change", on)
  }, [])
  return match
}

export default function StoryTabs() {
  const desktop = useDesktop()
  const [value, setValue] = useState(chapters[0].id)
  const [storyOpen, setStoryOpen] = useState(false)

  return (
    <Section id="story" className="py-14 sm:py-20 lg:py-[clamp(2.5rem,8vh,7rem)]">
      <SectionHeading
        title="The story in four parts"
        lead="Choose a chapter to see how Articella came to be."
      />
      <Reveal>
        <Tabs
          value={value}
          onValueChange={setValue}
          orientation={desktop ? "vertical" : "horizontal"}
          className="gap-5 lg:grid lg:grid-cols-[300px_1fr] lg:items-start lg:gap-12"
        >
          <TabsList
            variant="line"
            className="grid h-auto w-full grid-cols-2 gap-2 rounded-none p-0 sm:gap-3 lg:flex lg:flex-col lg:gap-3 group-data-horizontal/tabs:h-auto"
          >
            {chapters.map((c) => (
              <TabsTrigger
                key={c.id}
                value={c.id}
                className="h-auto min-h-14 w-full flex-none justify-center rounded-xl border-border px-3 py-3 text-center text-base leading-snug whitespace-normal text-primary after:hidden hover:bg-secondary hover:text-primary data-active:border-primary data-active:bg-primary data-active:text-white group-data-[variant=line]/tabs-list:data-active:bg-primary dark:group-data-[variant=line]/tabs-list:data-active:bg-primary lg:justify-start lg:px-5 lg:py-4 lg:text-left group-data-vertical/tabs:w-full"
              >
                {c.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {chapters.map((c) => (
            <TabsContent key={c.id} value={c.id} className="text-base">
              <div className="grid animate-in items-center gap-8 duration-500 fade-in-0 md:grid-cols-2 md:gap-10">
                <img
                  src={images[c.image]}
                  alt={c.alt}
                  className="aspect-[16/10] w-full rounded-2xl object-cover sm:aspect-square sm:rounded-3xl"
                />
                <div>
                  <h3 className="text-2xl text-primary sm:text-3xl">{c.title}</h3>
                  <p className="mt-4 text-lg text-foreground/85">{c.text}</p>
                  <div className="mt-7">
                    <BrandButton variant="outline" onClick={() => setStoryOpen(true)} icon="arrowRight" className="w-full sm:w-auto">
                      Read the Fuller Story
                    </BrandButton>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Reveal>

      <Dialog open={storyOpen} onOpenChange={setStoryOpen}>
        <DialogContent className="max-h-[88vh] gap-5 overflow-y-auto rounded-2xl p-6 sm:max-w-2xl sm:p-10">
          <DialogHeader className="gap-1 pr-8">
            <DialogTitle className="font-heading text-3xl leading-tight text-primary sm:text-4xl">
              The Articella founding story
            </DialogTitle>
            <DialogDescription className="sr-only">The longer version of how Articella began.</DialogDescription>
          </DialogHeader>
          <div className="space-y-5 text-base leading-relaxed text-foreground/85 sm:text-[1.0625rem]">
            {fullStory.map((b, i) =>
              b.type === "lead" ? (
                <p key={i} className="font-heading text-xl leading-snug text-primary sm:text-2xl">{b.text}</p>
              ) : b.type === "list" ? (
                <ul key={i} className="space-y-2 border-l-4 border-primary pl-5 font-heading text-lg text-primary">
                  {b.items.map((it) => (
                    <li key={it}>{it}</li>
                  ))}
                </ul>
              ) : (
                <p key={i}>{b.text}</p>
              )
            )}
          </div>
        </DialogContent>
      </Dialog>
    </Section>
  )
}
