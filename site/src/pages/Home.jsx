import Hero from "@/components/home/Hero"
import TrustReveal from "@/components/home/TrustReveal"
import CareChoices from "@/components/home/CareChoices"
import TeamPreview from "@/components/home/TeamPreview"
import Approach from "@/components/home/Approach"
import InsuranceStrip from "@/components/home/InsuranceStrip"
import Journal from "@/components/home/Journal"
import Feedback from "@/components/home/Feedback"
import VisitDetails from "@/components/home/VisitDetails"
import CtaBand from "@/components/common/CtaBand"
import { images } from "@/data/site"

export default function Home() {
  return (
    <>
      <Hero />
      <TrustReveal />
      <CareChoices />
      <TeamPreview />
      <Approach />
      <InsuranceStrip />
      <Feedback />
      <Journal />
      <VisitDetails />
      <CtaBand
        image={images.homeHero}
        imageAlt="A smiling clinician in blue scrubs talking with a patient in a bright consulting room."
      />
    </>
  )
}
