import PageHero from "@/components/common/PageHero"
import BrandButton from "@/components/common/BrandButton"
import { useBooking } from "@/components/layout/BookingProvider"

// Brand-blue hero (the Brand Book's signature surface) with a short headline. The long founding sentence is the lead.
export default function AboutHero() {
  const { open } = useBooking()
  return (
    <PageHero
      title={
        <span className="block text-[2.125rem] leading-[1.1] sm:text-5xl lg:text-[3.75rem] lg:leading-[1.05]">
          Primary care with room for prevention
        </span>
      }
      lead="Primary care should have room for prevention, room to be understood, and room for a relationship that lasts."
      tone="blue"
      actions={
        <>
          <BrandButton size="lg" variant="inverse" href="#team" icon="arrowRight" external={false} className="w-full sm:w-auto">
            Meet the Team
          </BrandButton>
          <BrandButton size="lg" variant="inverseOutline" onClick={open} className="w-full sm:w-auto">
            Book Appointment
          </BrandButton>
        </>
      }
    />
  )
}
