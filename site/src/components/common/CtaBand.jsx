import { Container } from "@/components/common/Section"
import Pattern from "@/components/brand/Pattern"
import BrandButton from "@/components/common/BrandButton"
import Reveal from "@/components/common/Reveal"
import { useBooking } from "@/components/layout/BookingProvider"
import Icon from "@/components/brand/Icon"
import { practice } from "@/data/site"
import { trustPoints } from "@/data/home"

// Closing invitation used at the bottom of pages. A rounded Articella Blue card on white, so it
// never fuses with the blue footer. Without a photo the brand pattern sits quietly on the right. With a
// photo (Home) the band becomes a feature banner: the photo rises above the card's top edge, and small
// white cards with the practice's trust points float beside it, as in the reference banner.
export default function CtaBand({
  title = "Start early. Stay well.",
  text = "Same-week appointments are often available, in person or by telehealth.",
  primary,
  secondary,
  image,
  imageAlt = "",
}) {
  const { open } = useBooking()
  if (image) {
    return (
      <section className="bg-background pb-12 pt-24 sm:pb-16 lg:pb-[clamp(2.5rem,7.5vh,5rem)] lg:pt-[clamp(5rem,12vh,7rem)]">
        <Container>
          <div className="relative">
            <Reveal className="relative rounded-[2rem] bg-primary text-primary-foreground lg:min-h-[clamp(17rem,38vh,21rem)]">
              {/* the brand pattern, kept inside the card's rounded edge */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 overflow-hidden rounded-[2rem]"
                style={{ WebkitMaskImage: "linear-gradient(to right, #000 0%, #000 12%, transparent 40%)", maskImage: "linear-gradient(to right, #000 0%, #000 12%, transparent 40%)" }}
              >
                <Pattern tone="blue" className="absolute -bottom-24 -left-16 aspect-auto h-[150%] w-[60%] opacity-[0.1]" size="auto 100%" position="30% 50%" />
              </div>
              <div className="relative px-6 py-10 sm:px-12 sm:py-14 lg:max-w-[46%] lg:pl-16 lg:pr-4 lg:py-[clamp(2.5rem,6vh,4rem)]">
                <h2 className="text-balance text-3xl text-white sm:text-4xl lg:text-[2.75rem] lg:leading-[1.08]">{title}</h2>
                <p className="mt-4 max-w-md text-lg text-white/90">{text}</p>
                <div className="mt-7 flex flex-wrap gap-3">
                  {primary ?? (
                    <BrandButton variant="inverse" onClick={open} className="w-full rounded-full px-6 sm:w-auto">
                      Book Appointment
                    </BrandButton>
                  )}
                  {secondary ?? (
                    <BrandButton variant="inverseOutline" href={practice.phoneHref} icon="phone" iconPosition="start" className="w-full rounded-full px-6 sm:w-auto">
                      Call or text {practice.phone}
                    </BrandButton>
                  )}
                </div>
              </div>

              {/* desktop: the photo stands above the card's top edge and sits flush with its bottom */}
              <div
                className="absolute bottom-0 right-10 top-[-3rem] hidden w-[33%] overflow-hidden rounded-t-[2rem] bg-secondary ring-1 ring-white/30 lg:block"
                style={{ boxShadow: "0 30px 60px -30px rgba(0, 0, 40, 0.6)" }}
              >
                <img src={image} alt={imageAlt} loading="lazy" className="h-full w-full object-cover" style={{ objectPosition: "84% 45%" }} />
              </div>

              {/* floating trust cards that overlap the photo's left edge */}
              <ul className="absolute bottom-8 right-[calc(2.5rem+33%-2.75rem)] top-8 hidden flex-col items-end justify-center gap-3 lg:flex">
                {trustPoints.slice(0, 3).map((p, i) => (
                  <li
                    key={p.label}
                    className="flex w-[14rem] items-center gap-3 rounded-xl bg-white px-3.5 py-2.5 text-primary"
                    style={{ boxShadow: "0 18px 36px -18px rgba(0, 0, 40, 0.55)", transform: `translateX(${[0, -1.25, 0.5][i]}rem)` }}
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                      <Icon name={p.icon} size={16} />
                    </span>
                    <span className="text-sm font-medium leading-tight">{p.label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* phones and tablets: the photo sits under the card */}
            <img
              src={image}
              alt={imageAlt}
              loading="lazy"
              className="mt-4 aspect-[16/10] w-full rounded-3xl object-cover lg:hidden"
              style={{ objectPosition: "84% 45%" }}
            />
          </div>
        </Container>
      </section>
    )
  }
  return (
    <section className="bg-background py-12 sm:py-16 lg:py-[clamp(2.5rem,7.5vh,5rem)]">
      <Container>
        <Reveal className="relative overflow-hidden rounded-3xl bg-primary px-6 py-12 text-primary-foreground sm:px-12 sm:py-16 lg:px-16">
          {image ? (
            <img
              src={image}
              alt={imageAlt}
              className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[38%] object-cover md:block"
              loading="lazy"
            />
          ) : (
            <Pattern
              tone="blue"
              className="pointer-events-none absolute inset-y-0 right-0 hidden w-[40%] opacity-[0.22] md:block"
              size="auto 125%"
              position="40% 50%"
            />
          )}
          <div className="relative max-w-xl">
            <h2 className="text-3xl text-white sm:text-4xl lg:text-[2.75rem]">{title}</h2>
            <p className="mt-4 text-lg text-white/90">{text}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              {primary ?? (
                <BrandButton variant="inverse" onClick={open} className="w-full sm:w-auto">
                  Book Appointment
                </BrandButton>
              )}
              {secondary ?? (
                <BrandButton variant="inverseOutline" href={practice.phoneHref} icon="phone" iconPosition="start" className="w-full sm:w-auto">
                  Call or text {practice.phone}
                </BrandButton>
              )}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
