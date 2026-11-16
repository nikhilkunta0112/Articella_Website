import CtaBand from "@/components/common/CtaBand"
import BrandButton from "@/components/common/BrandButton"
import { useBooking } from "@/components/layout/BookingProvider"
import { practice } from "@/data/site"

// Closing band for the patient pages: one filled and one outline button, full width and equal
// height on phones.
export default function PageCta({ title, text }) {
  const { open } = useBooking()
  return (
    <CtaBand
      title={title}
      text={text}
      primary={
        <BrandButton variant="inverse" onClick={open} icon="calendar" iconPosition="start" className="w-full sm:w-auto">
          Book Appointment
        </BrandButton>
      }
      secondary={
        <BrandButton
          variant="inverseOutline"
          href={practice.phoneHref}
          icon="phone"
          iconPosition="start"
          className="w-full sm:w-auto"
        >
          Call or text {practice.phone}
        </BrandButton>
      }
    />
  )
}
