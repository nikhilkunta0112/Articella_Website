// Home page content. Facts come from site.js; this file only holds layout copy for the Home page.
import { routes, pricing } from "@/data/site"

const startingPrice = Math.min(...pricing.memberships.map((m) => m.price))

export const trustPoints = [
  { icon: "card", label: "Major Insurance Accepted" },
  { icon: "stethoscope", label: "Physician-Led Care" },
  { icon: "calendar", label: "Same-Week Appointments" },
  { icon: "shield", label: "HIPAA-Compliant and Confidential" },
]

export const careChoices = [
  {
    icon: "stethoscope",
    title: "Primary Care",
    text: "Annual visits, sick visits and ongoing care for adults, with time to talk and plan ahead.",
    to: routes.primaryCare,
    cta: "Explore primary care",
  },
  {
    icon: "heart",
    title: "Membership Options",
    text: `An ongoing relationship with your care team. Individual memberships from $${startingPrice} per month. A membership is not health insurance.`,
    to: routes.memberships,
    cta: "See membership options",
  },
  {
    icon: "leaf",
    title: "Preventive Wellness",
    text: "Screenings, vaccines and a personal plan that keeps your long-term health in view.",
    to: routes.primaryCare,
    cta: "Learn about prevention",
  },
]

export const reasons = [
  { icon: "clipboard", label: "Annual physicals", to: routes.primaryCare },
  { icon: "pulse", label: "Sick visits", to: routes.primaryCare },
  { icon: "heart", label: "Chronic condition care", to: routes.primaryCare },
  { icon: "video", label: "Telehealth and follow-up", to: routes.primaryCare },
]

export const approachPoints = [
  { icon: "message", title: "Listening carefully", text: "Your concerns come first, in your own words, without a rush." },
  { icon: "file", title: "Explaining your choices", text: "Plain-language options, so you can decide what fits your life." },
  { icon: "leaf", title: "Thinking ahead", text: "Prevention and follow-up stay in view, long after a single visit." },
]

export const featuredQuestions = [
  "How do I book an appointment?",
  "Which insurance plans do you accept?",
  "What should I bring to my first visit?",
]
