import PageHero from "@/components/common/PageHero"
import { clinicians } from "@/data/site"

// Opening: headline and a row of equal portrait chips that jump to each profile. On phones the chips stack
// as full-width, 44px-high rows, so no name is ever clipped.
export default function ProviderGallery() {
  return (
    <PageHero
      title="Meet the clinicians at Articella"
      lead="Three clinicians care for patients at Articella, with backgrounds in internal medicine, hospital and critical care, and leadership in medicine. Each takes time to listen, explain and plan with you."
      tone="blue"
    >
      <nav aria-label="Jump to a clinician" className="mt-8">
        <ul className="grid gap-2 sm:flex sm:flex-wrap sm:gap-3">
          {clinicians.map((c) => (
            <li key={c.id}>
              <a
                href={`#${c.id}`}
                className="flex h-12 w-full items-center gap-3 rounded-full border border-primary/25 bg-background py-1 pr-5 pl-1.5 text-base font-medium whitespace-nowrap text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white sm:inline-flex sm:w-auto"
              >
                <img
                  src={c.photo}
                  alt=""
                  className="size-9 rounded-full object-cover object-[50%_18%]"
                  loading="eager"
                />
                {c.name.replace(/^(Dr\.\s*).*\s(\S+)$/, "$1$2")}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </PageHero>
  )
}
