// Copy for the About and Providers pages. Every statement comes from the founding story,
// the brand book or the practice's own bios in site.js. Nothing here is invented.

export const nameMeaning =
  "Articella is named after a medieval compendium that preserved and shared foundational medical knowledge from thinkers like Hippocrates and Galen. It is a name rooted in timeless knowledge, and we carry forward its spirit of thoughtful, enduring care."

export const chapters = [
  {
    id: "gap",
    title: "Seeing the gap in care",
    text:
      "Dr. Singh has spent decades at the frontlines of healthcare as a physician, mentor, healthcare leader and father. Along the way he saw how disconnected the system had become from patients, from community and from the essence of care itself. Appointments felt rushed. Preventive care was overlooked.",
    image: "aboutCh1",
    alt: "",
  },
  {
    id: "prevention",
    title: "Putting prevention at the center",
    text:
      "True health was not being shaped. It had become something people only thought about when it went wrong. Articella began from a simple belief: health should be a journey, not a reaction. Here, prevention is valued as deeply as treatment.",
    image: "aboutCh2",
    alt: "",
  },
  {
    id: "frisco",
    title: "Building the practice in Frisco",
    text:
      "Dr. Singh saw another way forward: a space that brings together the science of medicine and the soul of care, where care is not rushed. That space became Articella, a primary care practice on Coit Road in Frisco, Texas.",
    image: "aboutCh3",
    alt: "",
  },
  {
    id: "learning",
    title: "Continuing to learn with patients",
    text:
      "Care at Articella is meant to be a relationship, not a single visit. Patients and physicians walk together, not just through illness, but through every season of life, with the same thoughtful, enduring care the name stands for.",
    image: "aboutCh4",
    alt: "",
  },
]

export const fullStory = [
  { type: "lead", text: "Articella was born from a simple but powerful belief: health should be a journey, not a reaction." },
  {
    type: "p",
    text:
      "Dr. Rahul Singh has spent decades at the frontlines of healthcare as a physician, mentor, healthcare leader and father. Along the way, he witnessed something deeply troubling: how disconnected the system had become from patients, from community and from the essence of care itself.",
  },
  {
    type: "p",
    text:
      "Appointments felt rushed. Preventive care was overlooked. True health wasn't being shaped. It became something people only thought about when it went wrong.",
  },
  { type: "p", text: "He saw another way forward. A space that brings together the science of medicine and the soul of care." },
  {
    type: "list",
    items: [
      "Where care is not rushed.",
      "Where prevention is valued as deeply as treatment.",
      "Where patients and physicians walk together, not just through illness, but through every season of life.",
    ],
  },
  {
    type: "p",
    text:
      "That space became Articella, named after the medieval compendium that preserved and shared foundational medical knowledge from thinkers like Hippocrates, Galen and others.",
  },
  {
    type: "p",
    text:
      "A place rooted in timeless knowledge, Articella carries forward the spirit of thoughtful, enduring care. We're here for your lifelong wellness journey.",
  },
]

export const patientParts = [
  {
    icon: "message",
    title: "The team listens",
    text: "Each visit starts with the person, not just the problem, and you are heard in your own words.",
    pillar: "Empathy",
    promise: "You'll always be heard, respected, and treated as a whole person.",
  },
  {
    icon: "bookOpen",
    title: "Possible next steps are explained",
    text: "Your team explains the options in plain language, so you know what may come next and why.",
    pillar: "Transparency",
    promise: "You'll always know what's happening, why it matters, and what it costs.",
  },
  {
    icon: "calendar",
    title: "Prevention and follow-up stay in view",
    text: "Staying well is part of every conversation, with follow-up and check-ins kept in mind.",
    pillar: "Excellence",
    promise: "You'll always receive thoughtful, evidence-based care, never rushed or routine.",
  },
]

// What each person does at the practice, from their published bios.
export const atPractice = {
  "rahul-singh":
    "Founded Articella and brings his clinical expertise and leadership experience into every patient relationship.",
  "sylaza-kantamneni":
    "Provides primary care for adults, with a focus on prevention, chronic condition care and patient education.",
  "anupa-adhikari":
    "Works as a Nurse Practitioner on the care team. Please ask the office which visit types she offers.",
  "meghna-nagpal":
    "Manages the practice, streamlining clinic operations and supporting the medical staff so providers can focus entirely on patient care.",
  "trish-stafford":
    "Coordinates the front desk and is often your first point of contact, with experience in provider scheduling, patient coordination and billing support.",
}

export const providerSteps = [
  { icon: "user", title: "Read a profile", text: "Look through the clinicians above to see who might be a good fit for you." },
  { icon: "message", title: "Tell the office what you need", text: "Share what kind of visit you are looking for, such as a check-up, a current concern or follow-up care." },
  { icon: "calendar", title: "Confirm the clinician and time", text: "The office will confirm the right clinician and an available appointment time with you." },
]

// A short "what to expect" line per clinician, built only from the published bios in site.js.
export const providerExpect = {
  "rahul-singh":
    "Dr. Singh brings clinical expertise, leadership experience and a commitment to human-centered medicine into every patient relationship.",
  "sylaza-kantamneni":
    "A warm and approachable style. Dr. Kantamneni takes the time to understand your needs and explains your options so you can make informed decisions.",
  "anupa-adhikari":
    "A warm and compassionate approach built on trust, education and personalized care.",
}
