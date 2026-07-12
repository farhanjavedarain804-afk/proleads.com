import {
  Wind, Wrench, Bug, Home as HomeIcon, DoorOpen, Zap,
  Droplets, Flame, Snowflake, Hammer, ShieldCheck, PaintBucket,
} from "lucide-react";

export const PHONE = "(888) 555-0199";
export const PHONE_TEL = "+18885550199";
export const EMAIL = "support@proleadsgeneration.com";
export const ADDRESS = "1200 Nationwide Blvd, Suite 500, Austin, TX 78701";

export type Service = {
  slug: string;
  icon: typeof Wind;
  title: string;
  desc: string;
  tag: string;
  features: string[];
  priceFrom: string;
  responseTime: string;
};

export const SERVICES: Service[] = [
  {
    slug: "hvac",
    icon: Wind,
    title: "HVAC Services",
    desc: "Fast emergency AC repair, furnace maintenance, air conditioning service and heat pump replacement by certified local technicians.",
    tag: "Heating & Cooling",
    features: ["AC repair & install", "Furnace tune-up", "Heat pump service", "Duct cleaning", "Thermostat setup", "Annual maintenance"],
    priceFrom: "$89",
    responseTime: "60–90 min",
  },
  {
    slug: "plumbing",
    icon: Wrench,
    title: "Plumbing Solutions",
    desc: "24-hour plumbers for clogged drains, leak detection, sewer line repair, and water heater service — anywhere in the country.",
    tag: "Emergency Plumbing",
    features: ["Drain cleaning", "Leak detection", "Pipe repair", "Water heater service", "Sewer line repair", "Fixture install"],
    priceFrom: "$79",
    responseTime: "45–75 min",
  },
  {
    slug: "pest-control",
    icon: Bug,
    title: "Pest Control",
    desc: "Top-rated exterminators for residential pest control, termite treatment, bed bugs, rodents and wasp nest removal.",
    tag: "Residential",
    features: ["Termite treatment", "Bed bug removal", "Rodent control", "Wasp & hornet nests", "Ant colony treatment", "Quarterly plans"],
    priceFrom: "$99",
    responseTime: "Same day",
  },
  {
    slug: "roofing",
    icon: HomeIcon,
    title: "Premium Roofing",
    desc: "Emergency roof leak repair, storm damage inspection, shingle installation and transparent roof replacement quotes.",
    tag: "Storm Damage",
    features: ["Leak repair", "Shingle install", "Storm inspection", "Gutter service", "Full replacement", "Insurance claims"],
    priceFrom: "$149",
    responseTime: "2–4 hours",
  },
  {
    slug: "garage-door",
    icon: DoorOpen,
    title: "Garage Door Repair",
    desc: "Broken spring repair, opener installation, cable replacement and overhead garage door service by trained specialists.",
    tag: "Same-Day",
    features: ["Spring replacement", "Opener install", "Cable & roller", "Panel replacement", "Remote programming", "Safety inspection"],
    priceFrom: "$89",
    responseTime: "Same day",
  },
  {
    slug: "electrical",
    icon: Zap,
    title: "Electrical",
    desc: "Licensed electricians for panel upgrades, outlet installs, EV charger wiring and whole-home rewiring.",
    tag: "Licensed",
    features: ["Panel upgrades", "Outlet & switch install", "EV charger wiring", "Whole-home rewiring", "Lighting install", "Code inspection"],
    priceFrom: "$99",
    responseTime: "1–2 hours",
  },
  {
    slug: "water-damage",
    icon: Droplets,
    title: "Water Damage Restoration",
    desc: "Emergency water extraction, structural drying, mold prevention and full restoration after floods or leaks.",
    tag: "Emergency",
    features: ["Water extraction", "Structural drying", "Mold prevention", "Carpet restoration", "Dehumidification", "Insurance support"],
    priceFrom: "$199",
    responseTime: "30–60 min",
  },
  {
    slug: "chimney",
    icon: Flame,
    title: "Chimney & Fireplace",
    desc: "Chimney sweeping, fireplace inspections, cap replacement and full masonry repair before winter arrives.",
    tag: "Seasonal",
    features: ["Chimney sweep", "Cap replacement", "Masonry repair", "Liner install", "Level 2 inspection", "Gas fireplace service"],
    priceFrom: "$129",
    responseTime: "Next day",
  },
  {
    slug: "appliance-repair",
    icon: Snowflake,
    title: "Appliance Repair",
    desc: "Refrigerators, washers, dryers, ovens and dishwashers — most brands serviced within 24 hours.",
    tag: "Home Appliances",
    features: ["Refrigerator", "Washer & dryer", "Oven & range", "Dishwasher", "Microwave", "Ice maker"],
    priceFrom: "$79",
    responseTime: "Same day",
  },
  {
    slug: "handyman",
    icon: Hammer,
    title: "Handyman & Remodel",
    desc: "Small fixes to full remodels — drywall, trim, doors, tile and everything on your punch list.",
    tag: "Trusted",
    features: ["Drywall repair", "Trim & moulding", "Door hanging", "Tile install", "Furniture assembly", "TV mounting"],
    priceFrom: "$65/hr",
    responseTime: "1–2 days",
  },
  {
    slug: "locksmith",
    icon: ShieldCheck,
    title: "Locksmith & Security",
    desc: "Lockouts, rekeys, deadbolts, smart locks and home security installs — 24/7 emergency dispatch.",
    tag: "24/7",
    features: ["Emergency lockout", "Rekey service", "Smart lock install", "Deadbolt upgrade", "Camera setup", "Safe service"],
    priceFrom: "$59",
    responseTime: "20–40 min",
  },
  {
    slug: "painting",
    icon: PaintBucket,
    title: "Interior & Exterior Painting",
    desc: "Prep, prime and premium finishes for interiors, exteriors, cabinets and decks with a 5-year warranty.",
    tag: "Premium Finish",
    features: ["Interior painting", "Exterior painting", "Cabinet refinishing", "Deck staining", "Color consult", "5-yr warranty"],
    priceFrom: "$299",
    responseTime: "2–3 days",
  },
];

export function findService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}

export const STATES = [
  "Alabama","Alaska","Arizona","Arkansas","California","Colorado","Connecticut","Delaware",
  "Florida","Georgia","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky",
  "Louisiana","Maine","Maryland","Massachusetts","Michigan","Minnesota","Mississippi",
  "Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico",
  "New York","North Carolina","North Dakota","Ohio","Oklahoma","Oregon","Pennsylvania",
  "Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont",
  "Virginia","Washington","West Virginia","Wisconsin","Wyoming",
];

export const CITIES: Record<string, string[]> = {
  California: ["Los Angeles", "San Diego", "San Francisco", "San Jose", "Sacramento"],
  Texas: ["Houston", "Dallas", "Austin", "San Antonio", "Fort Worth"],
  Florida: ["Miami", "Orlando", "Tampa", "Jacksonville", "Fort Lauderdale"],
  "New York": ["New York City", "Buffalo", "Rochester", "Albany", "Syracuse"],
  Georgia: ["Atlanta", "Savannah", "Augusta", "Athens", "Macon"],
  Arizona: ["Phoenix", "Tucson", "Mesa", "Scottsdale", "Chandler"],
  "North Carolina": ["Charlotte", "Raleigh", "Greensboro", "Durham", "Winston-Salem"],
  Illinois: ["Chicago", "Aurora", "Naperville", "Rockford", "Springfield"],
  Ohio: ["Columbus", "Cleveland", "Cincinnati", "Toledo", "Akron"],
  Pennsylvania: ["Philadelphia", "Pittsburgh", "Allentown", "Erie", "Reading"],
  Washington: ["Seattle", "Spokane", "Tacoma", "Vancouver", "Bellevue"],
  Colorado: ["Denver", "Colorado Springs", "Aurora", "Fort Collins", "Boulder"],
};

export const STATS = [
  { value: "10,000+", label: "Happy Homeowners" },
  { value: "25,000+", label: "Completed Jobs" },
  { value: "15+ Yrs", label: "Industry Experience" },
  { value: "4.9/5", label: "Customer Rating" },
];

export const REVIEWS = [
  { name: "Mark T.", city: "Round Rock, TX", service: "HVAC", rating: 5, date: "May 2026",
    text: "Our AC quit during a scorching afternoon. ProLeadsGeneration had a tech at our door in 90 minutes. Fixed the capacitor and charged exactly what was quoted. Absolute lifesavers." },
  { name: "Sarah J.", city: "Austin, TX", service: "Plumbing", rating: 5, date: "April 2026",
    text: "Woke up to a major pipe leak in the basement. Called dispatch and the plumber arrived with everything he needed. Full pipe overhaul done and the mess was gone." },
  { name: "David K.", city: "Georgetown, TX", service: "Roofing", rating: 5, date: "March 2026",
    text: "Highly recommend their roofing team. Severe storm damage, transparent field diagnostics, and the repair was handled without hassle. Very professional." },
  { name: "Emily R.", city: "Phoenix, AZ", service: "Pest Control", rating: 5, date: "June 2026",
    text: "Termite scare turned into a smooth treatment plan. The team explained every step and gave us a solid warranty on the treatment." },
  { name: "Jonathan P.", city: "Denver, CO", service: "Electrical", rating: 5, date: "February 2026",
    text: "Panel upgrade + EV charger install done in a single day. Clean work, permits pulled, fully inspected. Priced fairly." },
  { name: "Priya S.", city: "Charlotte, NC", service: "Garage Door", rating: 4, date: "January 2026",
    text: "Broken torsion spring replaced same-day. The tech was punctual and even tuned up the opener as part of the visit." },
  { name: "Michael B.", city: "Chicago, IL", service: "Water Damage", rating: 5, date: "May 2026",
    text: "Basement flood at 2am — crew was on-site within an hour with extractors and dehumidifiers. Saved us from major mold issues." },
  { name: "Linda O.", city: "Orlando, FL", service: "Roofing", rating: 5, date: "June 2026",
    text: "After the storm we needed a total roof inspection. They handled the insurance paperwork and delivered a beautiful new roof." },
  { name: "Chris H.", city: "Seattle, WA", service: "Appliance Repair", rating: 5, date: "March 2026",
    text: "Fridge stopped cooling on a Sunday. Same-day appointment, part replaced, and it's been running perfectly since." },
];

export const FAQS = [
  { q: "Are your home service technicians certified and insured?",
    a: "Yes. Every pro in the ProLeadsGeneration network is licensed, insured, background-checked and continuously trained — from HVAC and plumbing to roofing and electrical." },
  { q: "Do you provide 24/7 emergency response?",
    a: "We dispatch 24/7 emergency crews nationwide for HVAC breakdowns, leaks, storm-damaged roofs and urgent garage door failures." },
  { q: "What geographic areas do you cover?",
    a: "All 50 U.S. states with dense coverage in California, Texas, Florida, New York, Georgia, Arizona and the Carolinas." },
  { q: "How much does a diagnostic visit cost?",
    a: "Every visit begins with a flat-rate diagnostic quote you approve before work starts. No hidden fees, ever." },
  { q: "How fast can I book an emergency repair?",
    a: "Most emergency jobs are booked same-day. Our dispatch routes your call to the closest available specialist in minutes." },
  { q: "Do you offer warranties on completed work?",
    a: "Yes. Repairs carry a minimum 90-day workmanship warranty and installs include a manufacturer warranty plus our 1–5 year labor guarantee depending on the trade." },
  { q: "Do you accept insurance claims for roof and water damage?",
    a: "We work directly with most major insurance carriers. Our estimators document damage, itemize scope and coordinate the claim on your behalf." },
  { q: "What payment methods do you accept?",
    a: "All major credit cards, ACH, Apple Pay and Google Pay. We also offer 0% APR financing for approved projects over $500." },
  { q: "Can I schedule recurring maintenance?",
    a: "Absolutely — HVAC tune-ups, pest control, chimney sweeps and roof inspections can all be scheduled on quarterly, semi-annual or annual plans." },
  { q: "Is your work guaranteed if I'm not satisfied?",
    a: "Yes. Every project is backed by our 100% satisfaction promise — if you're not happy, we return and make it right at no additional charge." },
];

export const CERTIFICATIONS = [
  "NATE Certified", "EPA 608", "IICRC", "PMP Certified",
  "OSHA 30", "BBB A+ Rated", "Angi Certified", "HomeAdvisor Elite",
];

export const PROCESS_STEPS = [
  { n: "1", t: "Contact & Request", d: "Call the number or book online. Our dispatchers schedule a perfect time window." },
  { n: "2", t: "Expert Evaluation", d: "A certified specialist inspects your system and presents fixed diagnostic options." },
  { n: "3", t: "Complete Satisfaction", d: "Our pros finish the job using premium materials, backed by full warranties." },
];

export const VALUES = [
  { title: "Same-Day Service Guarantee", body: "We respect your schedule. Techs arrive within the promised window or your diagnostic fee is on us." },
  { title: "Background-Checked Techs", body: "Every field specialist undergoes rigorous nationwide background checks and ongoing certifications." },
  { title: "100% Upfront Clear Pricing", body: "You approve a fixed quote before any work begins. No hidden line items, no surprises." },
  { title: "5-Year Workmanship Warranty", body: "Major installs are backed by our industry-leading 5-year labor guarantee — parts covered by the manufacturer." },
  { title: "Eco-Friendly Materials", body: "We prioritize low-VOC, ENERGY STAR and sustainably sourced products for every install we complete." },
  { title: "One Trusted Dispatch Line", body: "Six trades, one number. Skip juggling contractors — we route your job to the right specialist instantly." },
];
