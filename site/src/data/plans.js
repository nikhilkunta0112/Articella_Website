// Plans that are NOT in the new pricing document. They are carried over, unchanged, from the
// current https://www.articella.com/concierge-care/ page (read 2026-11-15). The new document
// (see `pricing` in data/site.js) is authoritative wherever the two overlap, so the old $175
// individual plan, the old $110 sick visit and the old $75 student sick visit are NOT here.
//
// Show these only with the note in `carriedOverNote`. Set SHOW_CARRIED_OVER_PLANS to false to hide
// every plan in this file at once.
// CONFIRM with the practice: couple, family, student and visitor prices were set when the
// individual plan was $175 a month and may change under the new model.

export const SHOW_CARRIED_OVER_PLANS = true

export const carriedOverNote =
  "These are the prices currently published on articella.com. Please ask the office to confirm current pricing and terms before you join."

const sharedMemberIncludes = [
  "Unlimited 24/7 physician access by text, phone and video",
  "Same-day or next-day appointments",
  "Guaranteed 30 to 45 minute appointments with no wait times",
  "Comprehensive annual wellness exam and EKG",
  "Personalized wellness and preventive care plan",
  "Complimentary in-office blood draws",
  "Specialist referral coordination",
  "Preferred-pricing referrals for imaging and radiology",
]

const annualScreening = [
  "Complete Blood Count (CBC)",
  "Comprehensive Metabolic Panel (CMP)",
  "Lipid Panel",
  "Hemoglobin A1c (HbA1c)",
  "Thyroid Panel (TSH and Free T4)",
  "Urinalysis",
  "Vitamin B12",
]

export const couple = {
  id: "couple",
  name: "Essential Care, Couple",
  price: 325,
  period: "per month",
  annual: "$3,700 annually (save 5%)",
  registration: "$50 one-time registration fee (waived with annual payment)",
  visits: "Up to 6 in-person visits per year",
  extraVisit: "Additional office visits are $50 each",
  includes: [...sharedMemberIncludes, "Side-by-side or back-to-back appointments"],
  screening: annualScreening,
}

export const family = {
  id: "family",
  name: "Family Concierge Membership",
  tiers: [
    { label: "Primary member", price: 175, period: "per month" },
    { label: "Spouse or partner", price: 150, period: "per month" },
    { label: "Adult dependent (18+)", price: 99, period: "per month" },
    { label: "Each additional adult dependent (18+)", price: 99, period: "per month" },
  ],
  visits: "Up to 6 in-person visits per member per year",
  extraVisit: "Additional office visits are $50 each",
  includes: [...sharedMemberIncludes, "Side-by-side or back-to-back family appointments when available"],
  screening: annualScreening,
  addOns: "Add-on rapid tests (strep, flu A and B, COVID-19 antigen, urinalysis) are $20 per test",
}

export const students = {
  id: "student-package",
  name: "College Student Care Package",
  options: [
    { label: "Academic year plan", price: 450, period: "upfront (August to May)" },
    { label: "Monthly plan", price: 49, period: "per month (10-month minimum commitment)" },
  ],
  extraVisit: "Additional in-person sick visits are $75 each",
  includes: [
    "Comprehensive annual wellness exam",
    "Annual influenza (flu) vaccine",
    "3 in-person sick visits for acute illnesses or minor injuries",
    "24/7 secure text messaging with the care team",
    "Telehealth visits during regular business hours",
    "Electronic prescription management",
    "Routine wellness labs: CBC and CMP",
    "Up to 3 rapid tests per academic year (strep, flu A and B, COVID-19, urinalysis)",
  ],
  addOns: "Add-on swab tests and urinalysis are $20 per test",
  notes: [
    "This package is a private medical service and is not health insurance.",
    "It does not include emergency care, hospitalization, surgery, specialist visits, advanced imaging (X-ray, MRI) or prescription medication costs.",
    "For medical emergencies, call 911 or go to the nearest emergency department.",
  ],
}

const visitorIncludes3 = [
  "Initial physician appointment (45 to 60 minutes)",
  "2 in-office follow-up visits (30 minutes each)",
  "1 telehealth visit (20 minutes)",
  "Routine in-office physical examination",
  "Same-day or next-day appointments",
  "EKG during the first visit",
  "Medication refill management",
  "Annual standard preventive lab panel",
]

const visitorIncludes6 = [
  "Initial physician appointment (45 to 60 minutes)",
  "4 in-office follow-up visits (30 minutes each)",
  "2 telehealth visits (20 minutes each)",
  "Routine in-office physical examination",
  "Same-day or next-day appointments",
  "EKG during the first visit",
  "Medication refill management",
  "Annual standard preventive lab panel",
]

export const visitors = [
  {
    id: "visitor-3-individual",
    name: "Visitor concierge, 3 months, individual",
    price: 499,
    period: "paid upfront for 3 months",
    monthly: "Or $189 per month with a 3-month contract",
    cancellation: "Cancellation fee: $100",
    includes: visitorIncludes3,
  },
  {
    id: "visitor-3-couple",
    name: "Visitor concierge, 3 months, couple",
    price: 749,
    period: "paid upfront for 3 months",
    // The live site says this monthly option "requires a 6-month contract", which looks like a typo.
    monthly: "Or $269 per month. Please confirm contract terms with the office",
    cancellation: "Cancellation fee: $100",
    includes: visitorIncludes3,
  },
  {
    id: "visitor-6-individual",
    name: "Visitor concierge, 6 months, individual",
    price: 799,
    period: "paid upfront for 6 months",
    monthly: "Or $149 per month with a 6-month contract",
    cancellation: "Cancellation fee: $100",
    includes: visitorIncludes6,
  },
  {
    id: "visitor-6-couple",
    name: "Visitor concierge, 6 months, couple",
    price: 1200,
    period: "paid upfront for 6 months",
    monthly: "Or $239 per month with a 6-month contract",
    cancellation: "Cancellation fee: $100",
    includes: visitorIncludes6,
  },
]

// A la carte items from the current site. The new document only says recommended tests are an add-on.
export const telehealth = {
  id: "telehealth",
  name: "Virtual Care (Telehealth) visit",
  price: 65,
  period: "flat fee",
  includes: [
    "Secure video consultation with a healthcare provider",
    "Evaluation and treatment of eligible minor medical concerns",
    "Electronic prescription routing to any pharmacy",
  ],
  goodFor: [
    "Cold and flu symptoms",
    "Allergies",
    "Medication refills",
    "Minor skin conditions",
    "Follow-up visits",
    "Other non-emergency concerns",
  ],
  note: "If an in-person exam is recommended, 100% of your telehealth fee is applied toward the Standard Sick Visit.",
}

export const addOnPrices = [
  { label: "Rapid strep test", price: "$20" },
  { label: "Rapid influenza (Flu A and B)", price: "$20" },
  { label: "Rapid COVID-19 test", price: "$20" },
  { label: "Urinalysis (UTI screen)", price: "$20" },
  { label: "Blood glucose fingerstick", price: "$15" },
  { label: "Electrocardiogram (EKG)", price: "$50" },
  { label: "Injection (antibiotic or steroid)", price: "$50" },
  { label: "Nebulizer breathing treatment", price: "$50" },
  { label: "Other laboratory tests", price: "First $20, then $10 each" },
  { label: "Annual preventive lab panel", price: "$39" },
]

export const corporate = {
  name: "Corporate concierge plan",
  text: "Small businesses and employers can ask about customizable concierge packages for their teams. Pricing is arranged with the office.",
}
