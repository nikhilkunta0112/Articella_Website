import MembershipHero from "@/components/memberships/MembershipHero"
import Steps from "@/components/memberships/Steps"
import PlanTabs from "@/components/memberships/PlanTabs"
import BeforeJoining from "@/components/memberships/BeforeJoining"
import CtaBand from "@/components/common/CtaBand"
import BrandButton from "@/components/common/BrandButton"
import { useBooking } from "@/components/layout/BookingProvider"
import { practice } from "@/data/site"

export default function Memberships() {
  const { open } = useBooking()
  return (
    <>
      <MembershipHero />
      <Steps />
      <PlanTabs />
      <BeforeJoining />
      <CtaBand
        title="Not sure which option fits?"
        text="Tell us what you are looking for and we will help you choose, and confirm the exact terms."
        primary={
          <BrandButton variant="inverse" onClick={open} className="w-full sm:w-auto">
            Book Appointment
          </BrandButton>
        }
        secondary={
          <BrandButton variant="inverseOutline" href={practice.phoneHref} icon="phone" iconPosition="start" className="w-full sm:w-auto">
            Call or text {practice.phone}
          </BrandButton>
        }
      />
    </>
  )
}
