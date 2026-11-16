import ProviderGallery from "@/components/providers/ProviderGallery"
import ProviderSection from "@/components/providers/ProviderSection"
import ChoosingHelp from "@/components/providers/ChoosingHelp"
import CtaBand from "@/components/common/CtaBand"
import BrandButton from "@/components/common/BrandButton"
import { useBooking } from "@/components/layout/BookingProvider"
import { clinicians, practice } from "@/data/site"

export default function Providers() {
  const { open } = useBooking()
  return (
    <>
      <ProviderGallery />
      {clinicians.map((c, i) => (
        <ProviderSection key={c.id} person={c} index={i} />
      ))}
      <ChoosingHelp />
      <CtaBand
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
