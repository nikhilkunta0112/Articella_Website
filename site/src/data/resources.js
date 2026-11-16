// Data local to the Insights and Events, Locations and FAQs pages.
// Only facts already stated in the PRD or in site.js are used. Nothing is invented.
import { pricing } from "@/data/site"
import { SHOW_CARRIED_OVER_PLANS } from "@/data/plans"

export const insightFilters = [
  { id: "all", label: "All" },
  { id: "Article", label: "Articles", heading: "Articles" },
  { id: "Practice news", label: "Practice news", heading: "Practice news" },
  { id: "Past event", label: "Past events", heading: "Past events" },
]

export const futureContent = [
  {
    icon: "bookOpen",
    title: "Clinician-reviewed guides",
    text: "Plain-language health guides, added once a clinician at the practice has reviewed them.",
  },
  {
    icon: "video",
    title: "Short provider videos",
    text: "Brief introductions and explainers from the care team, when the practice provides them.",
  },
  {
    icon: "calendar",
    title: "Future events",
    text: "Community sessions and open days, listed only once the dates are confirmed.",
  },
]

export const faqTopics = ["All", "Appointments and Visits", "Coverage and Payment", "Practical Details"]

const sick = pricing.singleVisits.find((v) => v.id === "sick")
const wellness = pricing.singleVisits.find((v) => v.id === "wellness")
const [essential, premier] = pricing.memberships

// Extra questions, built only from facts in the PRD and site.js.
export const extraFaqs = [
  {
    topic: "Appointments and Visits",
    q: "Can I call or text the office?",
    a: "Yes. The office takes calls and text messages at +1 (214) 872 6502. Please do not include sensitive medical information in a text message.",
  },
  {
    topic: "Coverage and Payment",
    q: "What do self-pay visits cost?",
    a: `The published self-pay prices are $${sick.price} for a ${sick.name}, $${wellness.price} for a ${wellness.name}, and $${pricing.student.price} for a sick visit for students and senior citizens. Recommended tests are an add-on and payment is due at the time of service. Please confirm current terms with the office before your visit.`,
  },
  {
    topic: "Coverage and Payment",
    q: "What memberships are offered?",
    a: `Two individual memberships are published: ${essential.name} at $${essential.price} per month and ${premier.name} at $${premier.price} per month. Inclusions differ, and some tests and services are charged separately. ${
      SHOW_CARRIED_OVER_PLANS
        ? "Couple, family, student and visitor plans are published too, each with its own prices and terms. "
        : ""
    }See the Memberships page for the full details, and please confirm current terms with the office.`,
  },
  {
    topic: "Coverage and Payment",
    q: "Is there a fee to cancel a membership?",
    a: SHOW_CARRIED_OVER_PLANS
      ? `For Essential Care and Premier Care: ${pricing.membershipNote} The couple, family, student and visitor plans have their own terms, shown on their cards. Please confirm the current terms with the office before you join.`
      : `${pricing.membershipNote} Please confirm the current terms with the office before you join.`,
  },
]

// Questions whose answers depend on a person's plan, visit type or medical needs.
// These show a Call or Text option instead of a general promise.
export const askOfficeQuestions = new Set([
  "Do you offer telehealth visits?",
  "Which insurance plans do you accept?",
  "Can I pay without insurance?",
  "What do self-pay visits cost?",
  "What memberships are offered?",
  "Is there a fee to cancel a membership?",
  "How do I get into the patient portal?",
])
