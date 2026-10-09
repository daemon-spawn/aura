/**
 * Service architecture from the AURA Brand Foundation: Presence / Commerce / Systems.
 * `proof` lists project slugs; leave empty until a real case exists.
 */
export type Service = {
  id: string;
  index: string;
  name: "Presence" | "Commerce" | "Systems";
  promise: string;
  body: string;
  includes: string[];
  proof: string[];
};

export const services: Service[] = [
  {
    id: "presence",
    index: "01",
    name: "Presence",
    promise: "Premium websites and digital identity for modern companies.",
    body: "I start with your business — who your customers are, what they need to believe, what you want them to do — and only then design. Every site is hand-built: fast, findable, and structured so you can change the parts you'll want to change.",
    includes: [
      "Website strategy",
      "UX and UI design",
      "Visual direction",
      "Premium frontend development",
      "Brand-aligned web systems",
      "SEO foundations and analytics",
    ],
    proof: ["mazhwetu-general-works", "big-bee-logistics", "hands-of-sympathy"],
  },
  {
    id: "commerce",
    index: "02",
    name: "Commerce",
    promise: "Ecommerce designed to raise perceived product value and the quality of every sale.",
    body: "A store should feel as considered as the product in it. I plan the catalogue and the buying journey, then design the storefront around product storytelling rather than a default theme.",
    includes: [
      "Ecommerce strategy",
      "Shopify experiences",
      "Premium product storytelling",
      "Conversion-focused design",
      "High-end storefront systems",
    ],
    proof: ["midcenturist"],
  },
  {
    id: "systems",
    index: "03",
    name: "Systems",
    promise: "The software behind the website — portals, workflows and the admin that runs on spreadsheets today.",
    body: "Fees management, invoicing and bank reconciliation, jobcards, payroll, client portals and onboarding. I map the workflow with you, then engineer it properly: real databases, real roles and permissions, built to run for years.",
    includes: [
      "Client portals",
      "Onboarding systems",
      "Workflow and automation",
      "Roles, permissions and sign-in",
      "Phased delivery you can use as it lands",
    ],
    proof: ["krdf-prosuite", "bee-hill-college"],
  },
];

/** Runs underneath all three service lines. */
export const care = {
  title: "Care",
  body: "Launch is the start, not the finish. I can stay on for hosting, monthly management, data capturing, DNS and email, SEO and analytics upkeep.",
  proof: ["bee-hill-college", "kane-solutions"],
};

/** Brand Foundation — "What AURA can help with". */
export const capabilities = [
  "Brand Strategy",
  "Visual Identity",
  "Website Strategy",
  "Website Design",
  "Frontend Development",
  "Ecommerce Experiences",
  "CMS Systems",
  "Motion Design",
  "Digital Strategy",
  "Conversion Optimisation",
  "Client Portal Systems",
];

/**
 * "What I can help with" — the numbered, expandable service list (Dash Digital
 * pattern). `parts` is the one-line breakdown; `body` opens under "More +".
 * `line` links the row to its service line on /services; `proof` to real work.
 */
export type ServiceItem = {
  title: string;
  parts: string[];
  body: string;
  line: "presence" | "commerce" | "systems" | "care";
  proof: string[];
};

export const serviceList: ServiceItem[] = [
  {
    title: "Website Strategy",
    parts: ["Research", "Strategy", "Structure"],
    body: "Before anything is designed: what the business needs the site to do, who has to believe it, and the pages and order that get them there. Goal, audience and structure, settled on paper first.",
    line: "presence",
    proof: ["mazhwetu-general-works"],
  },
  {
    title: "Website Design",
    parts: ["UX", "UI", "Visual direction"],
    body: "Interfaces built around how your buyers decide — hierarchy, rhythm, type and motion that make the business feel as considered as the work it does.",
    line: "presence",
    proof: ["hands-of-sympathy", "big-bee-logistics"],
  },
  {
    title: "Frontend Development",
    parts: ["Development", "Motion", "SEO"],
    body: "Hand-built, fast and findable. Every section a reusable component, every animation kept separate, and the parts you'll want to change made easy to change.",
    line: "presence",
    proof: ["anlusi", "mazhwetu-general-works"],
  },
  {
    title: "Ecommerce Experiences",
    parts: ["Strategy", "Design", "Development"],
    body: "A store that feels as considered as the product in it: the catalogue and buying journey planned first, then a storefront built around product storytelling rather than a default theme.",
    line: "commerce",
    proof: ["midcenturist"],
  },
  {
    title: "Client Portals & Systems",
    parts: ["Workflow", "Design", "Engineering"],
    body: "The software behind the website — fees, invoicing and reconciliation, jobcards, payroll, portals and onboarding. Real databases, real roles and permissions, delivered in phases you can use as they land.",
    line: "systems",
    proof: ["krdf-prosuite", "bee-hill-college"],
  },
  {
    title: "Brand Strategy",
    parts: ["Positioning", "Messaging", "Visual identity"],
    body: "Positioning and identity worked out alongside the site, so it has something true and specific to say — in words and in how it looks.",
    line: "presence",
    proof: [],
  },
  {
    title: "Care & Hosting",
    parts: ["Hosting", "Monthly management", "DNS & email", "SEO"],
    body: "Launch is the start, not the finish. I stay on for hosting, monthly management and data capturing, DNS and email, and the SEO and analytics that keep a site found.",
    line: "care",
    proof: ["kane-solutions", "bee-hill-college"],
  },
];
