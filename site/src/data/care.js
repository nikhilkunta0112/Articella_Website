// Content for the Primary Care and Memberships pages. Service topics come from
// cook/SERVICES.txt (the live articella.com list). Prices are NOT here: they are read from
// `pricing` in site.js by the Memberships components.
import { pricing } from "@/data/site"
import { SHOW_CARRIED_OVER_PLANS } from "@/data/plans"

const sickVisit = pricing.singleVisits.find((v) => v.id === "sick")
const wellnessVisit = pricing.singleVisits.find((v) => v.id === "wellness")

export const carePaths = [
  {
    id: "ahead",
    title: "Looking Ahead",
    text: "Annual wellness visits, screenings and vaccines, so small things are noticed early and your health goals have a plan.",
    imageKey: "pathAhead",
    position: "40% 95%",
    alt: "A woman doing a gentle seated side stretch on a mat in a green park",
    opens: ["wellness", "screenings", "lifestyle"],
    cta: "See preventive visits",
  },
  {
    id: "better",
    title: "Feeling Better",
    text: "A cold that will not clear, a rash, a sprain or a stomach upset. Come in when something is bothering you now.",
    imageKey: "pathBetter",
    alt: "A doctor listening to a young boy's chest with a stethoscope while his mother watches",
    opens: ["sick", "telehealth"],
    cta: "See sick and acute visits",
  },
  {
    id: "connected",
    title: "Staying Connected",
    text: "Virtual visits, follow-ups, lab reviews and long-term care, with the same team who knows your history.",
    imageKey: "pathConnected",
    alt: "A doctor on a video call with a smiling patient shown on a laptop screen",
    opens: ["chronic", "telehealth", "labs"],
    cta: "See ongoing care",
  },
]

export const careServices = [
  {
    id: "wellness",
    icon: "clipboard",
    title: "Annual Wellness and Physical Exams",
    summary: "A full check-in on how you are doing, once a year or when a form needs one.",
    who: [
      "Adults who want a yearly check-up and a chance to ask questions",
      "People who need a physical for work, school or sports",
      "Medicare patients looking for an annual wellness visit",
      "Anyone preparing for a procedure who needs a pre-op evaluation",
    ],
    discuss: [
      "Comprehensive annual physicals",
      "Medicare Annual Wellness Visits",
      "Employment, school and sports physicals",
      "Pre-op evaluations",
      "Well woman and well man exams",
    ],
  },
  {
    id: "screenings",
    icon: "shieldCheck",
    title: "Preventive Screenings and Immunizations",
    summary: "Checks and vaccines that help catch concerns early and keep you protected.",
    who: [
      "People who are due for routine screenings by age or risk",
      "Anyone who wants to update vaccines or plan for travel",
      "Patients with a family history they would like to talk through",
    ],
    discuss: [
      "Blood pressure, cholesterol and diabetes screening",
      "Cancer screenings (breast, colon, prostate, skin)",
      "Pap smears and HPV testing",
      "Vaccinations: flu, COVID-19, Tdap, pneumonia, shingles and travel vaccines",
      "STI screening and counseling",
    ],
  },
  {
    id: "chronic",
    icon: "pulse",
    title: "Chronic Condition Management",
    summary: "Steady, ongoing support for long-term conditions, so you are not managing them alone.",
    who: [
      "Adults living with a long-term condition",
      "People who take regular medicines and want them reviewed",
      "Patients who want help building daily habits that fit their care",
    ],
    discuss: [
      "Diabetes care and medication management",
      "Hypertension (high blood pressure)",
      "High cholesterol",
      "Thyroid disorders",
      "Asthma and COPD",
      "Osteoporosis and arthritis",
      "Long-term medication monitoring",
      "Lifestyle modification counseling",
    ],
  },
  {
    id: "sick",
    icon: "stethoscope",
    title: "Sick Visits and Acute Care",
    summary: "For a new concern that needs attention soon, without waiting for a routine slot.",
    who: [
      "Adults and students with a new illness or minor injury",
      "People who are not sure whether a symptom needs a visit",
      "Anyone who wants a clinician to look at something now",
    ],
    discuss: [
      "Cold, flu, sore throat and cough",
      "Urinary tract infections (UTIs)",
      "Rashes and skin infections",
      "Minor injuries and sprains",
      "Headaches, migraines and allergies",
      "GI issues (nausea, diarrhea, acid reflux)",
    ],
    note: "For an emergency, call 911 or go to the nearest emergency room.",
  },
  {
    id: "womens-mens",
    icon: "users",
    title: "Women's and Men's Health",
    summary: "Private, respectful conversations about the health topics that are specific to you.",
    who: [
      "Women and men looking for routine, preventive exams",
      "People with questions about hormones, menopause or family planning",
      "Patients who would rather talk with a primary care clinician first",
    ],
    discuss: [
      "Birth control counseling and prescriptions",
      "Menopause management",
      "Erectile dysfunction treatment",
      "Hormone health and screening",
      "Breast exams",
      "Prostate health exams",
    ],
  },
  {
    id: "telehealth",
    icon: "video",
    title: "Telehealth and Same-Week Access",
    summary: "Care that fits a busy week, by video or in the clinic.",
    who: [
      "Patients with a non-urgent concern that may not need an in-person exam",
      "People who need a refill, a follow-up or a lab review",
      "Anyone who would like a same-week clinic appointment",
    ],
    discuss: [
      "Virtual visits for non-urgent issues",
      "Lab result reviews",
      "Medication refills",
      "Follow-up visits",
      "Same-week in-clinic appointments",
    ],
    note: "Whether a virtual visit fits your concern is decided with the office and your clinician.",
  },
  {
    id: "labs",
    icon: "file",
    title: "Labs, Referrals and Coordination",
    summary: "Tests in the same building and a helping hand when you need a specialist.",
    who: [
      "Patients who need routine lab work",
      "People whose clinician recommends a specialist or imaging",
      "Anyone who wants one team keeping track of the whole picture",
    ],
    discuss: [
      "In-house blood draws",
      "Routine lab testing",
      "EKGs and vital signs",
      "Specialist referrals",
      "Coordination with imaging, cardiology, endocrinology and more",
    ],
  },
  {
    id: "lifestyle",
    icon: "leaf",
    title: "Lifestyle and Preventive Counseling",
    summary: "Practical, judgment-free conversations about the habits that shape how you feel.",
    who: [
      "Adults who want support with weight, nutrition, sleep or stress",
      "People thinking about quitting smoking",
      "Patients who would like to talk about mood or mental well-being",
    ],
    discuss: [
      "Weight management and nutrition counseling",
      "Smoking cessation support",
      "Mental health screening and referrals",
      "Sleep and stress management",
      "Personalized fitness guidance",
    ],
  },
]

export const afterVisit = [
  {
    icon: "file",
    title: "Results",
    text: "Test results are reviewed as part of your ongoing care. Ask your clinician how you would like to go over them, such as at a visit or by telehealth.",
  },
  {
    icon: "refresh",
    title: "Follow-up",
    text: "Your clinician will tell you whether a follow-up is useful and help you book it before you leave or afterward.",
  },
  {
    icon: "leaf",
    title: "Preventive goals",
    text: "Simple, realistic goals for screenings, vaccines and habits, set together and revisited over time.",
  },
  {
    icon: "calendar",
    title: "Future check-ins",
    text: "Regular check-ins keep your care continuous, so the next visit starts where the last one stopped.",
  },
]

export const careFaqs = [
  {
    q: "Can I ask which visit is right for me?",
    a: "Yes. Call or text the office, or choose Ask about an appointment, and describe what you need in a few words. The team can suggest the kind of visit that fits. Please do not share sensitive medical details by message.",
  },
  {
    q: "May virtual visits be available?",
    a: "Virtual visits are available for non-urgent concerns, lab result reviews, medication refills and follow-up visits. Ask the office whether a video visit fits your situation, or whether an in-person visit would be better.",
  },
  {
    q: "How do I check my insurance before booking?",
    a: "Look at the Insurance and Billing page for the plans we work with, then call the office or your insurer with your plan name and member ID. Coverage depends on your exact plan, so it is worth confirming before your visit.",
  },
]

// Memberships page copy (prices live in site.js).
export const membershipSteps = [
  {
    icon: "heart",
    title: "Choose a type of care",
    text: "An ongoing membership, or a single visit when you only need one.",
  },
  {
    icon: "clipboard",
    title: "Review what is included",
    text: "Compare visits, access and tests side by side before you decide.",
  },
  {
    icon: "message",
    title: "Ask Articella to confirm the terms",
    text: "We confirm current prices, inclusions and written terms when you ask.",
  },
]

export const singleVisitCopy = {
  sick: {
    forText: "For one new health concern that needs a clinician's attention.",
    addOnLabel: "May cost more",
  },
  wellness: {
    forText: "A preventive check-up for people who want a yearly look at their health without a membership.",
    addOnLabel: "May cost more",
  },
}

export const membershipFaqs = [
  {
    q: "Is a membership the same as health insurance?",
    a: "No. A membership is a way to pay for ongoing access to your care team. It is not health insurance and it does not replace it. Insurance may still be billed for eligible visits, imaging, specialists and labs. Ask the office how your coverage works alongside the option you choose.",
  },
  {
    q: "Can I pay for a single visit without joining?",
    a: `Yes. Self-pay single visits are available: a standard sick visit at $${sickVisit.price}, a standard wellness check-up at $${wellnessVisit.price}, and a sick visit for students and senior citizens at $${pricing.student.price}. See the Single Visits and Students tabs for what each one includes.`,
  },
  {
    q: "What is included in each option?",
    a: "Each option lists its own inclusions on its card. Essential Care and Premier Care share the same access and appointment benefits, and differ in visits per year and in the screening tests included. Any other plan shown on the page lists its own inclusions too.",
  },
  {
    q: "Which tests and outside costs are not included?",
    a: "Some tests are included in certain memberships and visits, and others are an add-on billed separately, with payment due at the time of service. Care outside the practice, such as specialists, imaging or some lab work, can have separate costs. Medicines are filled at your preferred pharmacy, so ask your pharmacy or insurer about their cost.",
  },
  {
    q: "What if I cancel a membership?",
    a: SHOW_CARRIED_OVER_PLANS
      ? `For Essential Care and Premier Care: ${pricing.membershipNote} The couple, family, student and visitor plans have their own terms, shown on their cards. Please ask the office to confirm the terms for your plan.`
      : `${pricing.membershipNote} Please ask the office to confirm the terms for your plan.`,
  },
]
