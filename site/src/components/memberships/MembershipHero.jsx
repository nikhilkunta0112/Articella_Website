import PageHero from "@/components/common/PageHero"
import BrandButton from "@/components/common/BrandButton"
import { useBooking } from "@/components/layout/BookingProvider"
import { images } from "@/data/site"

function jump(e) {
  const el = document.getElementById("plans")
  if (el) {
    e.preventDefault()
    el.scrollIntoView({ behavior: "smooth", block: "start" })
  }
}

export default function MembershipHero() {
  const { open } = useBooking()
  return (
    <PageHero
      title="Memberships and visit options"
      lead="Explore an ongoing relationship with your care team, or choose a single visit when that is all you need. Every option is listed with its published price."
      image={images.membershipsHero}
      imageAlt="A smiling clinician in a bright room, talking with a patient"
      actions={
        <>
          <BrandButton href="#plans" icon="chevronDown" onClick={jump} className="h-[52px] text-base">
            Compare the options
          </BrandButton>
          <BrandButton variant="outline" onClick={open} className="h-[52px] text-base">
            Ask about an option
          </BrandButton>
        </>
      }
    />
  )
}
