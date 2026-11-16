// Single source of truth for practice facts. Everything here comes from articella.com
// (read 2026-11-15), the Brand Book, the PRD, or the pricing document. Nothing is invented.
// Items marked CONFIRM are on the PRD's "details to confirm before launch" list.

export const practice = {
  name: "Articella",
  descriptor: "Primary Care",
  tagline: "Start Early. Stay Well.",
  phone: "+1 (214) 872 6502",
  phoneHref: "tel:+12148726502",
  smsHref: "sms:+12148726502",
  email: "care@articella.com",
  address: {
    line1: "10234 Coit Rd, Suite 100",
    city: "Frisco",
    state: "TX",
    zip: "75035",
    full: "10234 Coit Rd, Suite 100, Frisco, TX 75035",
  },
  parking: "Ample parking available",
  hours: [
    { days: "Monday to Friday", time: "8:30 AM to 4:30 PM" },
    { days: "Saturday", time: "8:30 AM to 12:00 PM" },
    { days: "Sunday", time: "Closed" },
  ],
  // CONFIRM: booking and portal destinations
  bookingUrl: "https://healow.com/apps/practice/articella-primary-care-pllc-32840?v=2&t=1",
  portalUrl: "https://mycw253.ecwcloud.com/portal30673/jsp/100mp/login_otp.jsp",
  mapsUrl: "https://maps.app.goo.gl/eYzfh2MTMinwqH428",
  mapsEmbed:
    "https://www.google.com/maps?q=10234+Coit+Rd+Suite+100+Frisco+TX+75035&output=embed",
  social: {
    instagram: "https://www.instagram.com/articella_primary_care/",
    linkedin: "https://www.linkedin.com/in/articella-primary-care/",
    facebook: "https://www.facebook.com/profile.php?id=61586900282121",
  },
  medspaUrl: "https://www.ziv.care/",
}

export const routes = {
  home: "/",
  about: "/about",
  providers: "/providers",
  primaryCare: "/primary-care",
  memberships: "/memberships",
  contact: "/contact",
  portal: "/patient-portal",
  newPatients: "/new-patients",
  insurance: "/insurance-and-billing",
  insights: "/insights-and-events",
  locations: "/locations",
  faqs: "/faqs",
}

export const mainNav = [
  { label: "Home", to: routes.home },
  { label: "About", to: routes.about },
  { label: "Providers", to: routes.providers },
  { label: "Primary Care", to: routes.primaryCare },
  { label: "Memberships", to: routes.memberships },
  { label: "Contact", to: routes.contact },
]

export const resourcesNav = [
  { label: "New Patients", to: routes.newPatients, blurb: "What to bring and what to expect at a first visit." },
  { label: "Insurance and Billing", to: routes.insurance, blurb: "Insurers we work with and ways to pay." },
  { label: "Insights and Events", to: routes.insights, blurb: "Health reading and practice updates." },
  { label: "Locations", to: routes.locations, blurb: "Hours, map and directions in Frisco." },
  { label: "FAQs", to: routes.faqs, blurb: "Quick answers about visits, coverage and the portal." },
]

// Real portraits from articella.com. Bios are the practice's own words, lightly trimmed.
export const team = [
  {
    id: "rahul-singh",
    name: "Dr. Rahul Singh",
    credentials: "MD, FACP, MMM",
    role: "Founder and Physician",
    photo: "/img/site/Rahul.jpg",
    clinician: true,
    intro:
      "Founder of Articella and a board-certified physician with over 15 years of experience across hospitals, teaching and patient care in Texas and beyond.",
    bio: [
      "With over 15 years of experience, Dr. Singh has served across the full spectrum of modern medicine, always as a fierce advocate for both patients and physicians.",
      "Through Articella, he brings his clinical expertise, leadership experience and deep commitment to human-centered medicine into every patient relationship.",
    ],
    focus: ["Prevention", "Long-term care", "Leadership in care delivery"],
    education: [
      { label: "Residency and Internship", value: "University of Maryland Midtown Campus, Baltimore, MD" },
      { label: "Master's in Medical Management (MMM)", value: "Carnegie Mellon University, Pittsburgh, PA" },
      { label: "Medical School", value: "MGM Medical College, Navi Mumbai" },
    ],
  },
  {
    id: "sylaza-kantamneni",
    name: "Dr. Sylaza Kantamneni",
    credentials: "MD",
    role: "Physician, Internal Medicine",
    photo: "/img/site/Sylaza-Kantamneni-img.jpg",
    clinician: true,
    intro:
      "A board-certified Internal Medicine physician with over 18 years of experience providing personal care for adults.",
    bio: [
      "Dr. Kantamneni has dedicated her career to helping patients stay healthy through preventive care, chronic disease management and evidence-based treatment.",
      "Known for a warm and approachable style, she believes in building lasting relationships through trust, open communication and patient education. By taking the time to understand each person's needs, she helps patients make informed decisions and reach their long-term health goals.",
    ],
    focus: ["Adult primary care", "Prevention", "Chronic condition care", "Patient education"],
    education: [{ label: "Medical School", value: "JJM Medical College" }],
  },
  {
    id: "anupa-adhikari",
    name: "Anupa Adhikari",
    credentials: "AGACNP-BC",
    role: "Nurse Practitioner",
    photo: "/img/site/Anupa.jpg",
    clinician: true,
    intro:
      "A board-certified Adult-Gerontology Acute Care Nurse Practitioner with nearly 10 years of experience in hospital and critical care settings.",
    bio: [
      "Anupa is passionate about helping people feel their best. She is known for a warm and compassionate approach and believes in building lasting relationships through trust, education and personalized care.",
    ],
    focus: ["Hospital and critical care experience", "Wellness"],
    education: [{ label: "Master's degree", value: "The University of Texas at Arlington" }],
    // CONFIRM: which visit types she offers at Articella
    note: "Please ask the office which visit types Anupa offers.",
  },
  {
    id: "meghna-nagpal",
    name: "Meghna Nagpal",
    credentials: "MBBS",
    role: "Practice Manager",
    photo: "/img/site/Meghna.jpg",
    clinician: false,
    intro: "Combines a clinical background with healthcare management so every visit feels smooth and welcoming.",
    bio: [
      "Meghna is our Practice Manager at Articella Primary Care. She completed medical school and earned her medicine degree in India, which gives her a deep, firsthand understanding of medicine that she now uses to streamline clinic operations and support the medical staff.",
      "Her goal is to make sure the practice runs smoothly so our providers can focus entirely on patient care.",
    ],
  },
  {
    id: "trish-stafford",
    name: "Trish Stafford",
    credentials: "",
    role: "Front Desk Coordinator",
    photo: "/img/site/Trish-Stafford.jpg",
    clinician: false,
    intro: "Over 25 years in healthcare administration and patient service, and often your first point of contact.",
    bio: [
      "Trish is an experienced Practice Coordinator who has supported physicians, patients and healthcare teams throughout her career. She specializes in provider scheduling, patient coordination, credentialing, billing support and medical office administration.",
      "She is dedicated to creating a positive experience for every patient, from the very first interaction with the practice.",
    ],
  },
]

export const clinicians = team.filter((t) => t.clinician)

// Insurance. The six published categories (PRD). Logos are third-party marks used as on articella.com.
// CONFIRM: exact plan, network and logo use with each insurer. Medicare has no logo file yet.
export const insurers = [
  {
    id: "aetna",
    name: "Aetna",
    logo: "/img/site/Aetna-logo.jpg",
    site: "https://www.aetna.com/",
    about: "A national health insurer offering employer and individual plans.",
    ask: "Is my specific Aetna plan in network for primary care at Articella?",
  },
  {
    id: "bcbs",
    name: "Blue Cross Blue Shield",
    logo: "/img/site/BlueCross-logo.jpg",
    site: "https://www.bcbs.com/",
    about: "A federation of independent regional plans. Coverage varies by the plan and the state it was issued in.",
    ask: "Which Blue Cross Blue Shield plan do I have, and is it accepted at Articella?",
  },
  {
    id: "cigna",
    name: "Cigna",
    logo: "/img/site/Cigna-logo.jpg",
    site: "https://www.cigna.com/",
    about: "A national health services company offering employer and individual plans.",
    ask: "Is my Cigna plan accepted, and what is my copay for a primary care visit?",
  },
  {
    id: "uhc",
    name: "UnitedHealthcare",
    logo: "/img/site/United-Healthcare-logo.jpg",
    site: "https://www.uhc.com/",
    about: "A national health insurer offering employer, individual and Medicare plans.",
    ask: "Is my UnitedHealthcare plan in network, and does a visit count toward my deductible?",
  },
  {
    id: "ambetter",
    name: "Ambetter",
    logo: "/img/site/Ambetter.png",
    site: "https://www.ambetterhealth.com/",
    about: "Marketplace plans offered through the Health Insurance Marketplace.",
    ask: "Which Ambetter plan do I have, and is Articella in my plan's network?",
    careful: true,
  },
  {
    id: "medicare",
    name: "Medicare",
    logo: null,
    site: "https://www.medicare.gov/",
    about: "Federal health coverage, mainly for people 65 and older. Medicare Advantage plans differ by company.",
    ask: "Do you accept my Medicare plan, and is a Medicare Annual Wellness Visit available?",
    careful: true,
  },
]

// Pricing: from pricing_model/Articella_Concierge_Care document (read 2026-11-15).
// CONFIRM before launch: prices, inclusions, eligibility and cancellation wording.
export const pricing = {
  memberships: [
    {
      id: "essential",
      name: "Essential Care",
      price: 79,
      period: "per month",
      kind: "Monthly concierge membership",
      visits: "5 in-person or telehealth visits per year",
      includes: [
        "Unlimited 24/7 physician access by text, phone or video",
        "Same-day or next-day appointments",
        "Guaranteed 30 to 45 minute appointments with no wait times",
        "Comprehensive annual wellness exam and EKG",
        "Personalized wellness and preventive care plan",
        "Complimentary in-office blood draws",
        "Specialist referral coordination",
        "Preferred-pricing referrals for imaging and radiology",
      ],
      extra: [
        "One annual screening is included.",
        "In-house lab tests are an add-on. Laboratory tests, EKG, blood draws and other testing or add-on services are charged separately.",
        "Test results are reviewed as part of your ongoing care.",
      ],
    },
    {
      id: "premier",
      name: "Premier Care",
      price: 129,
      period: "per month",
      kind: "Monthly concierge membership",
      visits: "10 in-person or telehealth visits per year",
      includes: [
        "Unlimited 24/7 physician access by text, phone or video",
        "Same-day or next-day appointments",
        "Guaranteed 30 to 45 minute appointments with no wait times",
        "Comprehensive annual wellness exam and EKG",
        "Personalized wellness and preventive care plan",
        "Complimentary in-office blood draws",
        "Specialist referral coordination",
        "Preferred-pricing referrals for imaging and radiology",
        "In-house lab tests included in the annual screening",
      ],
      extra: [
        "The annual wellness screening includes these tests when clinically appropriate: Complete Blood Count (CBC), Comprehensive Metabolic Panel (CMP), Lipid Panel, Hemoglobin A1c, Thyroid Panel (TSH and Free T4), Vitamin D, Urinalysis and Vitamin B12.",
        "Annual EKG and in-office blood draws for the included screening tests are also included. Tests and services outside these inclusions are available for an additional fee.",
      ],
    },
  ],
  membershipNote:
    "A $150 cancellation fee applies if the membership is cancelled before completing 6 months.",
  singleVisits: [
    {
      id: "sick",
      name: "Standard Sick Visit",
      price: 99,
      period: "one-time visit",
      kind: "Self-pay individual visit",
      includes: [
        "Comprehensive physical examination",
        "Evaluation of one acute medical issue",
        "Electronic prescription routing to your preferred pharmacy",
        "Official academic absence note, when medically appropriate",
        "Free secure portal follow-up for 7 days about the same illness",
      ],
      extra: ["Any recommended health tests are an add-on. Payment is due at the time of service."],
    },
    {
      id: "wellness",
      name: "Standard Wellness Check-Up",
      price: 149,
      period: "one-time visit",
      kind: "Single wellness check-up",
      includes: [
        "Comprehensive physician consultation and physical examination",
        "Vital signs (blood pressure, heart rate, respiratory rate and temperature)",
        "Height, weight and BMI evaluation",
        "Basic hearing screening",
        "Laboratory tests",
        "EKG with interpretation",
        "Personalized preventive health recommendations",
      ],
      extra: ["Vitamin D testing is not included. It is available for an additional $30, billed separately."],
    },
  ],
  student: {
    id: "student-sick",
    name: "Student and Senior Citizen Sick Visit",
    price: 79,
    period: "one-time visit",
    kind: "Self-pay individual visit",
    includes: [
      "Comprehensive physical examination",
      "Evaluation of one acute medical issue",
      "Electronic prescription routing to your preferred pharmacy",
      "Official academic absence note, when medically appropriate",
      "Free secure portal follow-up for 7 days about the same illness",
    ],
    extra: ["Any recommended health tests are an add-on. Payment is due at the time of service."],
  },
}

// Real posts from articella.com, with their published dates.
export const articles = [
  {
    id: "screenings",
    type: "Article",
    image: "journalFeatured",
    title: "Preventive Screenings: What You Need and When",
    blurb: "A guide to key screenings and vaccines by age, gender and risk factors.",
    date: "2026-02-09",
    dateLabel: "Feb 9, 2026",
    url: "https://www.articella.com/preventive-screenings-what-you-need-and-when/",
  },
  {
    id: "insurance-news",
    type: "Practice news",
    image: "journalNews",
    title: "Now Accepting More Insurance Plans",
    blurb: "We expanded our insurance coverage to include Aetna, Cigna and more.",
    date: "2026-02-09",
    dateLabel: "Feb 9, 2026",
    url: "https://www.articella.com/now-accepting-more-insurance-plans/",
  },
  {
    id: "wellness-qa",
    type: "Past event",
    image: "journalEvent",
    title: "Free Wellness Q&A at Frisco Library",
    blurb: "A community health session with Dr. Singh.",
    date: "2026-02-09",
    dateLabel: "Feb 9, 2026 (past event)",
    url: "https://www.articella.com/free-wellness-qa-this-saturday/",
  },
]

// CONFIRM: patient quote consent
export const testimonials = [
  {
    quote:
      "I finally feel like I have a doctor who listens, explains, and actually remembers me. This is how healthcare should feel.",
    who: "Priya K.",
    where: "Frisco, TX",
  },
  {
    quote:
      "Articella's concierge care gave me peace of mind. I can reach out directly to my doctor and get thoughtful care without feeling rushed.",
    who: "Dylan M.",
    where: "Plano, TX",
  },
]

// Image map. Photos are free-license Unsplash images (credits in public/img/photos/CREDITS.md).
// The painterly illustrations from articella.com remain in public/img/site/ as the brand-book style option. Swap a path here to change a picture
// everywhere. Each picture is used on one page only.
export const images = {
  // Replaced 2026-11-16 by the user-supplied nurse and patient photo (the old doctor photo is homeHero.jpg, kept on disk).
  homeHero: "/img/photos/careClinic.jpg",
  homeHeroFrame: "/img/photos/heroDoctor.jpg",
  trustInsurance: "/img/photos/trustInsuranceFamily.jpg", // user-supplied; trustInsurance.jpg (hand with a card) kept on disk
  trustPhysician: "/img/photos/trustPhysicianDoctor.jpg", // user-supplied; trustPhysician.jpg (woman in a lab coat) kept on disk
  trustSameWeek: "/img/photos/trustSameWeek.jpg",
  trustHipaa: "/img/photos/trustHipaa.jpg",
  // Home "Health reading and practice updates" (stand-ins: insuranceTalk and pathBetter are also used on other pages)
  journalFeatured: "/img/photos/insightsB.jpg",
  journalNews: "/img/photos/insuranceTalk.jpg",
  journalEvent: "/img/photos/pathBetter.jpg",
  // "Where would you like to begin?" scroll story (stand-ins from the existing set: replace with dedicated photos)
  careBegin: "/img/photos/careClinic.jpg",
  careMember: "/img/photos/careHands.jpg", // user-supplied; pathConnected.jpg (video-call doctor) is still used on Primary Care
  careWellness: "/img/photos/careWellness.jpg", // user-supplied; insightsC.jpg (yoga) is kept on disk
  // Supplied by the user, flipped horizontally (people on the left). The earlier photo is homeApproach.jpg.
  homeApproach: "/img/photos/homeApproachTeam.jpg",
  homeFrisco: "/img/photos/homeFrisco.jpg",
  aboutCh1: "/img/photos/aboutCh1b.jpg",
  aboutCh2: "/img/photos/aboutCh2.jpg",
  aboutCh3: "/img/photos/aboutCh3.jpg",
  aboutCh4: "/img/photos/insuranceTalk.jpg",
  primaryHero: "/img/photos/primaryHero.jpg",
  pathAhead: "/img/photos/insightsC.jpg",
  pathBetter: "/img/photos/pathBetter.jpg",
  pathConnected: "/img/photos/pathConnected.jpg",
  newPatients: "/img/photos/newPatients.jpg",
  insights: "/img/photos/pathAhead.jpg",
  insightsA: "/img/photos/insightsA.jpg",
  insightsB: "/img/photos/insightsB.jpg",
  membershipsHero: "/img/photos/membershipsHero.jpg",
  contactHero: "/img/photos/contactHero.jpg",
  portalHero: "/img/photos/portalHero.jpg",
  insuranceHero: "/img/photos/insuranceHero.jpg",
  faqsHero: "/img/photos/faqsHero.jpg",
  locationsHero: "/img/photos/locationsInterior.jpg",
  aboutHero: "/img/photos/aboutCh1.jpg",
}

// Starter answers for the FAQs page and the home page. Plain language, no promises.
export const faqs = [
  {
    topic: "Appointments and Visits",
    q: "How do I book an appointment?",
    a: "Choose Book Appointment on any page to open the online booking page, or call or text the office at +1 (214) 872 6502. Same-week appointments are often available for new and returning patients.",
  },
  {
    topic: "Appointments and Visits",
    q: "What should I bring to my first visit?",
    a: "A photo ID, your insurance card if you have one, a list of your medicines and allergies, and any records or questions you would like to talk about.",
  },
  {
    topic: "Appointments and Visits",
    q: "Do you offer telehealth visits?",
    a: "Yes, virtual visits are available for non-urgent concerns, lab result reviews, medication refills and follow-up visits. Ask the office whether a virtual visit fits your needs.",
  },
  {
    topic: "Coverage and Payment",
    q: "Which insurance plans do you accept?",
    a: "We work with Aetna, Blue Cross Blue Shield, Cigna, UnitedHealthcare, Ambetter and Medicare. Coverage depends on your exact plan, so please call the office or check with your insurer before booking.",
  },
  {
    topic: "Coverage and Payment",
    q: "Can I pay without insurance?",
    a: "Yes. Self-pay visits and concierge memberships are available. See the Memberships page for the current published prices, or call the office with questions.",
  },
  {
    topic: "Coverage and Payment",
    q: "Is a membership the same as health insurance?",
    a: "No. A membership is a way to pay for ongoing access to your care team. It is not health insurance, and care outside the practice, such as specialists, imaging or some tests, can have separate costs.",
  },
  {
    topic: "Practical Details",
    q: "What are your clinic hours?",
    a: "Monday to Friday, 8:30 AM to 4:30 PM, and Saturday, 8:30 AM to 12:00 PM. We are closed on Sunday. Please confirm holiday hours with the office.",
  },
  {
    topic: "Practical Details",
    q: "Where are you and where do I park?",
    a: "10234 Coit Rd, Suite 100, Frisco, TX 75035. Ample parking is available.",
  },
  {
    topic: "Practical Details",
    q: "How do I get into the patient portal?",
    a: "Use the Patient Portal link in the page header or footer. The portal opens in a separate window. If you need help with your account, call the front desk.",
  },
]
