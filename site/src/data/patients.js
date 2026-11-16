// Content for New Patients, Insurance and Billing, Contact and Patient Portal pages.
// Practice facts come from site.js. Nothing here is a price, hour or clinic fact.

export const visitSteps = [
  {
    id: "choose",
    icon: "stethoscope",
    title: "Choose a care option",
    text: "Look at primary care visits, or see whether a membership fits the way you like to be cared for.",
    links: [
      { label: "Primary care", to: "/primary-care" },
      { label: "Memberships", to: "/memberships" },
    ],
  },
  {
    id: "time",
    icon: "calendar",
    title: "Find a time",
    text: "Book online, or call or text the front desk. Same-week appointments are often available.",
    action: "book",
  },
  {
    id: "ready",
    icon: "clipboard",
    title: "Get ready",
    text: "Gather a few things at home. The checklist below makes it easy to see what is left.",
    links: [{ label: "Open the checklist", href: "#checklist" }],
  },
]

export const checklistItems = [
  {
    id: "id",
    icon: "idCard",
    helper: "Driver license works",
    title: "Photo ID",
    text: "A driver license or another government-issued photo ID.",
  },
  {
    id: "insurance",
    icon: "card",
    helper: "Skip it if self-pay",
    title: "Insurance card, if relevant",
    text: "Bring it if you plan to use insurance. If you plan to pay on your own, you can skip this one.",
  },
  {
    id: "medicines",
    icon: "pill",
    helper: "A simple list is fine",
    title: "Medicines and allergies",
    text: "A simple list of what you take and anything you are allergic to.",
  },
  {
    id: "records",
    icon: "file",
    helper: "Questions count too",
    title: "Records or questions",
    text: "Past records you have, and any questions you would like to talk through.",
  },
]

export const waysToPay = [
  {
    id: "insurance",
    icon: "shieldCheck",
    title: "Using insurance",
    text: "Search for your insurer above, then call the office with your plan name and member ID so the front desk can check your exact plan.",
    link: { label: "Search insurers", href: "#insurers" },
  },
  {
    id: "selfpay",
    icon: "card",
    title: "Self-pay",
    text: "If you do not plan to use insurance, self-pay visits are available. Ask the office which visit fits your needs, and see the published prices.",
    link: { label: "See published prices", to: "/memberships" },
  },
  {
    id: "membership",
    icon: "heart",
    title: "Membership",
    text: "A membership is a way to pay for ongoing access to your care team. It is not health insurance, and care outside the practice can have separate costs.",
    link: { label: "Explore memberships", to: "/memberships" },
  },
]

export const callQuestions = [
  "What is my plan name, and where do I find my member ID?",
  "Is the visit type I need covered under my plan?",
  "What are my copay and my remaining deductible?",
  "Is Articella in network for my specific plan?",
]

export const contactTopics = ["Appointments", "Memberships", "Insurance", "General questions"]

// The portal handoff, from the PRD: it opens separately, account help comes from the clinic,
// and this website never asks for portal passwords. No portal features are listed on purpose.
export const portalSteps = [
  {
    icon: "external",
    title: "Open the portal",
    text: "Choose Continue to Patient Portal. It opens in a new window, separate from this website.",
  },
  {
    icon: "user",
    title: "Sign in",
    text: "Use your portal sign-in details on the portal site. Signing in happens there, never on this website.",
  },
  {
    icon: "phone",
    title: "Ask for help",
    text: "If you need help with your account, call or text the clinic. The front desk will help with portal access.",
  },
  {
    icon: "shieldCheck",
    title: "Stay private",
    text: "Your password stays with you. This website never asks for it and never shows medical records.",
  },
]
