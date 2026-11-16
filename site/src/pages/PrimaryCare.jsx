import { useCallback, useState } from "react"
import CareHero from "@/components/care/CareHero"
import CarePaths from "@/components/care/CarePaths"
import ServiceList from "@/components/care/ServiceList"
import AfterVisit from "@/components/care/AfterVisit"
import CtaBand from "@/components/common/CtaBand"
import BrandButton from "@/components/common/BrandButton"
import { useBooking } from "@/components/layout/BookingProvider"
import { practice } from "@/data/site"

export default function PrimaryCare() {
  const [openIds, setOpenIds] = useState([])
  const { open } = useBooking()

  // Path links open their related rows and scroll to the first one.
  const choosePath = useCallback((ids) => {
    setOpenIds(ids)
    requestAnimationFrame(() => {
      const el = document.getElementById(`service-${ids[0]}`)
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }, [])

  return (
    <>
      <CareHero />
      <CarePaths onChoose={choosePath} />
      <ServiceList value={openIds} onValueChange={setOpenIds} />
      <AfterVisit />
      <CtaBand
        title="Thoughtful care starts here."
        text="Explore your options, ask questions, or schedule your first visit. Our team is here to help you take the next step with clarity and confidence."
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
