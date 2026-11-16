import { Section } from "@/components/common/Section"
import Reveal from "@/components/common/Reveal"
import Icon from "@/components/brand/Icon"
import BrandButton from "@/components/common/BrandButton"
import FaqAccordion from "@/components/care/FaqAccordion"
import { useBooking } from "@/components/layout/BookingProvider"
import { membershipFaqs } from "@/data/care"

// Two balanced columns: the note and the next step on the left, the questions on the right.
export default function BeforeJoining() {
  const { open } = useBooking()
  return (
    <Section className="pt-10 pb-0 sm:pt-16 sm:pb-0 lg:pt-20 lg:pb-0">
      <Reveal className="mb-6 max-w-2xl lg:mb-10">
        <h2 className="text-3xl text-primary sm:text-4xl lg:text-[2.75rem]">Questions before joining</h2>
        <p className="mt-3 text-lg text-foreground/80">
          Articella will confirm current prices, inclusions and written terms when you ask.
        </p>
      </Reveal>
      <div className="grid items-stretch gap-6 lg:grid-cols-[0.85fr_1.3fr] lg:gap-12">
        <Reveal className="flex">
          <div className="flex w-full flex-col rounded-2xl bg-secondary p-5 sm:p-8">
            <span className="hidden size-12 place-items-center rounded-full bg-background text-primary sm:grid">
              <Icon name="shield" size={24} />
            </span>
            <h3 className="text-xl text-primary sm:mt-4 sm:text-2xl">A membership is not health insurance</h3>
            <p className="mt-2 text-[1.0625rem] leading-relaxed text-foreground/80 sm:mt-3">
              It is a way to pay for ongoing access to your care team and does not replace insurance. Insurance may
              still be billed for eligible visits, imaging, specialists and labs, which can have separate costs.
            </p>
            <div className="mt-auto hidden pt-7 sm:block">
              <BrandButton variant="outline" onClick={open} className="w-full sm:w-auto">
                Ask about an option
              </BrandButton>
            </div>
          </div>
        </Reveal>
        <Reveal>
          <FaqAccordion items={membershipFaqs.slice(1)} />
        </Reveal>
      </div>
    </Section>
  )
}
