import { Container } from "@/components/common/Section"
import { useBooking } from "@/components/layout/BookingProvider"
import { HomeHeading, rhythm } from "@/components/home/Head"
import ScrollFillTitle, { useFillMode } from "@/components/home/ScrollFillTitle"
import DoctorCard from "@/components/home/DoctorCard"
import TeamTrack from "@/components/home/TeamTrack"
import { clinicians } from "@/data/site"

const TEAM_TITLE = "Meet the care team"
const TEAM_LEAD = "Real people who take the time to know you. Read a full profile, or ask the office about an appointment."

// Desktop: the title and lead are a pinned scroll-fill entry (ScrollFillTitle), then the team scrolls
// sideways as a pinned horizontal track (TeamTrack). It grows with `clinicians`: add a person to the data
// and the row simply gets longer.
// Phones, tablets and reduced motion: the plain heading above a swipeable carousel with snap points.
export default function TeamPreview() {
  const { open } = useBooking()
  const fill = useFillMode() // null until known (avoids a flash of the wrong layout)
  if (fill === null) return <div className="min-h-[40rem] bg-tint" aria-hidden="true" />
  if (fill) {
    return (
      <>
        <ScrollFillTitle id="team-title" title={TEAM_TITLE} lead={TEAM_LEAD} runway={2.4} />
        <TeamTrack open={open} />
      </>
    )
  }
  return (
    <section aria-labelledby="team-title" className={`bg-tint ${rhythm}`}>
      <Container>
        <HomeHeading id="team-title" title={TEAM_TITLE} lead={TEAM_LEAD} maxW="max-w-3xl" className="mb-8 lg:mb-10" />
      </Container>
      {/* swipe carousel: native horizontal scroll with snap, edge to edge, with the page padding at both ends */}
      <ul
        className="flex snap-x snap-mandatory items-stretch gap-4 overflow-x-auto px-5 pb-6 [scrollbar-width:none] sm:gap-6 sm:px-8 [&::-webkit-scrollbar]:hidden"
        aria-label="Care team, swipe sideways for more"
        tabIndex={0}
      >
        {clinicians.map((p) => (
          <li key={p.id} className="w-[min(82vw,22rem)] shrink-0 snap-start sm:w-[22rem]">
            <DoctorCard p={p} open={open} />
          </li>
        ))}
      </ul>
    </section>
  )
}
