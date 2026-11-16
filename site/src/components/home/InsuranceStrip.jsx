import { Link } from "react-router-dom"
import { Container } from "@/components/common/Section"
import Reveal from "@/components/common/Reveal"
import { ArrowLink } from "@/components/home/Arrow"
import { HomeHeading, rhythm } from "@/components/home/Head"
import { insurers, routes } from "@/data/site"

// Every card is the same size, with the logo (or the wordmark text) centered in a fixed-height box.
const cardCls =
  "flex h-[7.5rem] w-[11.5rem] flex-col items-center justify-center rounded-xl border border-border bg-white px-4 transition duration-300 sm:w-48"
const boxCls = "flex h-14 w-full items-center justify-center"

function Face({ insurer, label }) {
  return (
    <span className={boxCls}>
      {insurer.logo ? (
        <img
          src={insurer.logo}
          alt={label ? insurer.name : ""}
          draggable="false"
          className="max-h-14 w-auto max-w-[8.5rem] object-contain"
        />
      ) : (
        <span className="font-heading text-[1.625rem] font-semibold leading-none text-primary">{insurer.name}</span>
      )}
    </span>
  )
}

// Continuous marquee. The track starts aligned with the page container so the first screen shows the full
// row of six cards; the list repeats 4 times so the loop never shows a gap. With reduced motion the track
// becomes a static, wrapped grid and the extra copies are hidden.
export default function InsuranceStrip() {
  return (
    <section aria-labelledby="insurance-title" className={`bg-tint ${rhythm}`}>
      <Container>
        <HomeHeading
          id="insurance-title"
          title="Insurance we work with"
          lead="Articella works with Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, Ambetter and Medicare. Please confirm your exact plan and network before you book."
          align="center"
          maxW="max-w-3xl"
        />
      </Container>
      {/* Phones: a static grid of the six same-size cards */}
      <Container>
        <ul className="mt-8 grid grid-cols-3 gap-3 md:hidden">
          {insurers.map((ins) => (
            <li key={ins.id}>
              <Link
                to={routes.insurance}
                aria-label={`${ins.name}, see Insurance and Billing`}
                className="flex h-24 w-full items-center justify-center rounded-xl border border-border bg-white px-2 hover:border-primary"
              >
                {ins.logo ? (
                  <img src={ins.logo} alt="" draggable="false" className="max-h-12 w-auto max-w-full object-contain" />
                ) : (
                  <span className="font-heading text-lg font-semibold leading-none text-primary">{ins.name}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
      <div
        className="marquee mt-10 hidden md:block overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_clamp(3rem,9%,8rem),#000_calc(100%-clamp(3rem,9%,8rem)),transparent)] motion-reduce:[mask-image:none] lg:mt-12"
        role="group"
        aria-label="Insurance organizations"
      >
        <div className="marquee-track ml-8 flex motion-reduce:!ml-0 motion-reduce:!w-auto motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-4 motion-reduce:px-5 lg:ml-[max(2.5rem,calc((100vw-1240px)/2+2.5rem))]">
          {[0, 1, 2, 3].map((copy) =>
            insurers.map((ins) => (
              <div
                key={`${copy}-${ins.id}`}
                className={`pr-4 motion-reduce:p-0 ${copy > 0 ? "motion-reduce:hidden" : ""}`}
                aria-hidden={copy > 0 ? "true" : undefined}
              >
                {copy === 0 ? (
                  <Link
                    to={routes.insurance}
                    aria-label={`${ins.name}, see Insurance and Billing`}
                    className={`${cardCls} hover:border-primary`}
                  >
                    <Face insurer={ins} label />
                  </Link>
                ) : (
                  <div className={cardCls}>
                    <Face insurer={ins} />
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
      <Container>
        <div className="mt-8 text-center">
          <ArrowLink to={routes.insurance}>Read the Insurance and Billing guide</ArrowLink>
        </div>
      </Container>
    </section>
  )
}
