import AboutHero from "@/components/about/AboutHero"
import WhyArticella from "@/components/about/WhyArticella"
import Founder from "@/components/about/Founder"
import StoryTabs from "@/components/about/StoryTabs"
import PatientMeaning from "@/components/about/PatientMeaning"
import TeamGrid from "@/components/about/TeamGrid"
import LocalConnection from "@/components/about/LocalConnection"
import CtaBand from "@/components/common/CtaBand"
import BrandButton from "@/components/common/BrandButton"
import { useBooking } from "@/components/layout/BookingProvider"
import { practice } from "@/data/site"

export default function About() {
  const { open } = useBooking()
  return (
    <>
      <AboutHero />
      <WhyArticella />
      <Founder />
      <StoryTabs />
      <PatientMeaning />
      <TeamGrid />
      <LocalConnection />
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
