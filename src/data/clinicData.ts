import { ClinicInfo, ServiceItem, InsuranceProvider, FaqItem } from '../types';

export const CLINIC_INFO: ClinicInfo = {
  name: "Apex Urgent Care & Wellness",
  tagline: "Fast, Compassionate Care When You Need It Most.",
  phone: "(214) 555-0182",
  formattedPhone: "2145550182",
  address: "4210 North Central Expy, Suite 110",
  suite: "Suite 110",
  cityStateZip: "Dallas, TX 75206",
  fullAddress: "4210 North Central Expy, Suite 110, Dallas, TX 75206",
  hours: "Mon–Sun: 8:00 AM – 8:00 PM (No Appointment Needed)",
  googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3352.883712390234!2d-96.78280602353136!3d32.8122393822183!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x864e9f33f1165ad5%3A0x63351d3b37803b90!2s4210%20N%20Central%20Expy%2C%20Dallas%2C%20TX%2075206!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus",
  googleMapsDirUrl: "https://www.google.com/maps/dir/?api=1&destination=4210+North+Central+Expy+Suite+110+Dallas+TX+75206",
  formspreeEndpoint: "https://formspree.io/f/adetito4life@gmail.com",
  currentWaitMinutes: 15
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: "urgent-care",
    title: "Urgent Care",
    shortDesc: "Immediate medical attention for illness, sprains, cuts, infections, and sudden symptoms without ER wait times.",
    fullDesc: "Our board-certified physicians treat non-life-threatening emergencies quickly and with deep empathy. Get seen in under 15 minutes.",
    iconName: "Stethoscope",
    badge: "Most Popular",
    commonTreatments: ["Cold, Flu & Strep", "Sinus & Ear Infections", "Sprains, Strains & Fractures", "Cuts, Lacerations & Stitches", "Rashes & Insect Bites", "Urinary Tract Infections (UTI)"],
    avgTime: "10-15 min",
    selfPayPrice: "$120 Flat Visit"
  },
  {
    id: "xrays-labs",
    title: "X-Rays & Labs",
    shortDesc: "On-site state-of-the-art digital X-rays and comprehensive rapid diagnostic lab testing for immediate answers.",
    fullDesc: "Get diagnostic results during your visit. High-resolution digital imaging reviewed instantly by our clinical team.",
    iconName: "Activity",
    badge: "In-House Digital",
    commonTreatments: ["Digital Bone & Chest X-Rays", "Rapid Strep, Flu & COVID-19", "Blood Glucose & Urinalysis", "Mononucleosis & STD Testing", "EKG / Electrocardiograms", "Basic Metabolic Panels"],
    avgTime: "15 min results",
    selfPayPrice: "X-Ray from $95"
  },
  {
    id: "pediatric-care",
    title: "Pediatric Care",
    shortDesc: "Gentle, child-friendly urgent care for toddlers, kids, and teens in a comfortable, low-stress setting.",
    fullDesc: "Compassionate pediatric-certified clinical care for young ones dealing with fever, sore throat, allergies, or minor playground injuries.",
    iconName: "Baby",
    badge: "Ages 6 Months+",
    commonTreatments: ["Earaches & Ear Infections", "High Fevers & Coughs", "Asthma & Croup Relief", "Playground Cuts & Bumps", "Allergic Reactions", "School Health Assessments"],
    avgTime: "10-15 min",
    selfPayPrice: "$110 Flat Visit"
  },
  {
    id: "physicals",
    title: "Physicals & Wellness",
    shortDesc: "Comprehensive physical exams for employment, sports, school, DOT compliance, and routine wellness checks.",
    fullDesc: "Fast turnaround physical examinations with full documentation completed same-day so you never miss a deadline.",
    iconName: "ClipboardCheck",
    badge: "Same-Day Docs",
    commonTreatments: ["Sports & School Physicals", "Pre-Employment Exams", "DOT / CDL Physicals", "Camp & Athletic Clearances", "Executive Health Checks", "Basic Screenings"],
    avgTime: "15-20 min",
    selfPayPrice: "$65 Sports / $110 DOT"
  },
  {
    id: "telehealth",
    title: "Telehealth Visits",
    shortDesc: "Connect face-to-face with an Apex provider from your smartphone or computer for prescription refills and quick consults.",
    fullDesc: "Secure, HIPAA-compliant virtual care from home or office. Same-day prescriptions sent straight to your preferred Dallas pharmacy.",
    iconName: "Video",
    badge: "Virtual Care",
    commonTreatments: ["Prescription Refills", "Minor Skin Issues & Rashes", "Sinusitis & Seasonal Allergies", "Follow-up Consultations", "Pink Eye & Rash Reviews", "General Health Advice"],
    avgTime: "5 min connect",
    selfPayPrice: "$59 Virtual Visit"
  },
  {
    id: "vaccinations",
    title: "Vaccinations & Shots",
    shortDesc: "Protect yourself and family with essential routine immunizations, seasonal flu vaccines, and travel shots.",
    fullDesc: "No appointment needed walk-in vaccine clinic. Fully stocked with CDC-recommended immunizations and booster shots.",
    iconName: "Syringe",
    badge: "Walk-In Welcome",
    commonTreatments: ["Annual Quadrivalent Flu Shots", "Tetanus, Diphtheria & Pertussis (Tdap)", "Hepatitis A & B Vaccines", "MMR & Varicella Boosters", "Pneumococcal Vaccines", "TB Skin & Blood Testing"],
    avgTime: "5 min walk-in",
    selfPayPrice: "Shots from $35"
  }
];

export const INSURANCE_PROVIDERS: InsuranceProvider[] = [
  { name: "BlueCross BlueShield", logoText: "BCBS", accepted: true, notes: "Fully In-Network (PPO, HMO, EPO, POS)", category: "Commercial" },
  { name: "Aetna", logoText: "AETNA", accepted: true, notes: "In-Network for all commercial & employer plans", category: "Commercial" },
  { name: "Cigna", logoText: "CIGNA", accepted: true, notes: "Accepted for open access and local PPO", category: "Commercial" },
  { name: "UnitedHealthcare", logoText: "UHC", accepted: true, notes: "Fully In-Network across all TX plans", category: "Commercial" },
  { name: "Medicare", logoText: "MEDICARE", accepted: true, notes: "Accepted for Part B & Supplement plans", category: "Government" },
  { name: "Humana", logoText: "HUMANA", accepted: true, notes: "In-Network Choice PPO & Commercial", category: "Commercial" },
  { name: "Tricare", logoText: "TRICARE", accepted: true, notes: "Honored for military families & veterans", category: "Government" },
  { name: "Baylor Scott & White Health", logoText: "BSW", accepted: true, notes: "Accepted for Quality Alliance network", category: "Commercial" },
  { name: "Oscar Health", logoText: "OSCAR", accepted: true, notes: "In-Network for Dallas area individual plans", category: "Exchange" }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-1",
    question: "What should I bring for my visit?",
    answer: "Please bring a valid photo ID (driver's license or passport), your current health insurance card (if using insurance), a payment method for co-pays or self-pay fees, and a list of any current medications or allergies. If booking for a child, please bring guardian identification.",
    category: "General"
  },
  {
    id: "faq-2",
    question: "Do I need an appointment or can I walk in?",
    answer: "No appointment is needed! Walk-ins are always welcome 7 days a week from 8:00 AM to 8:00 PM. However, if you prefer to save time, you can click 'Book Online' to hold your place in line before arriving.",
    category: "Appointments"
  },
  {
    id: "faq-3",
    question: "What conditions do you treat vs. an Emergency Room (ER)?",
    answer: "Apex Urgent Care treats non-life-threatening conditions including cuts requiring stitches, mild fractures, sprains, strep throat, flu, UTI, ear infections, minor burns, and allergic reactions. For life-threatening emergencies—such as severe chest pain, sudden stroke symptoms, major blood loss, or unresponsiveness—please call 911 or go immediately to the nearest ER.",
    category: "Medical Services"
  },
  {
    id: "faq-4",
    question: "How much does a visit cost without insurance?",
    answer: "We offer transparent, upfront self-pay pricing for patients without insurance or high deductibles. Basic urgent care visits start at a flat $120. In-house X-rays, rapid lab tests, and procedures are available at discounted cash-pay rates with no surprise bills.",
    category: "Billing & Self-Pay"
  }
];

export const PATIENT_REVIEWS = [
  {
    name: "Marcus Vance",
    location: "Dallas (Uptown)",
    rating: 5,
    date: "2 days ago",
    comment: "Fastest urgent care experience I've ever had in Dallas. Walked in with a severe ankle sprain, got an X-ray taken and evaluated in 20 minutes flat. Staff was super polite and attentive!"
  },
  {
    name: "Elena Rostova",
    location: "Knox-Henderson",
    rating: 5,
    date: "1 week ago",
    comment: "Brought my toddler here for a high fever on a Sunday evening. The pediatric staff made her feel so safe and comfortable. Clean clinic, no wait time, and great doctor care!"
  },
  {
    name: "David K.",
    location: "Dallas (M-Streets)",
    rating: 5,
    date: "3 weeks ago",
    comment: "Apex is my go-to clinic. Booked my appointment on my phone, walked right in at my selected time, and got prescribed antibiotics for sinus infection. Highly recommend!"
  }
];

export const CARE_COMPARISON = [
  {
    setting: "Apex Urgent Care",
    bestFor: "Non-life-threatening illnesses, sprains, stitches, flu, rapid lab testing & X-rays",
    avgWait: "10 – 15 Mins",
    costLevel: "$$ (Low Copay / Transparent Cash Rate)",
    availability: "8:00 AM – 8:00 PM Daily (Walk-in or Book Online)"
  },
  {
    setting: "Emergency Room (ER)",
    bestFor: "Severe life-threatening trauma, chest pain, stroke, major fractures, severe head injuries",
    avgWait: "2 – 4 Hours",
    costLevel: "$$$$ (High ER Deductibles & Facility Fees)",
    availability: "24/7 (Prioritizes critical life-or-death triage)"
  },
  {
    setting: "Primary Care Doctor",
    bestFor: "Routine chronic disease management, annual checkups, long-term care plans",
    avgWait: "Days to Weeks for an opening",
    costLevel: "$$ (Standard Office Copay)",
    availability: "Mon–Fri Office Hours (Requires advance scheduling)"
  }
];
