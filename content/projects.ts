/**
 * Case studies. Every statement here is a real, stated fact about the work.
 * To add screenshots: drop files in /public/work/<slug>/ and set `cover`
 * (and optionally `gallery`). Until then a typographic plate is rendered.
 */
/** A full-length capture of a live page, scrolled inside a device frame. */
export type ProjectScreen = {
  src: string;
  /** Capture size in pixels. */
  w: number;
  h: number;
  /** Scroll positions (capture px) to pause on, top first. */
  stops: number[];
  alt: string;
  /** Soft background behind the device in the hero slide. */
  backdrop?: string;
};

export type Project = {
  slug: string;
  name: string;
  client: string;
  sector: string;
  year: string;
  type: "Website" | "System" | "Care";
  /** AURA service line (Brand Foundation architecture). */
  service: "Presence" | "Commerce" | "Systems";
  /** Index code shown on spreads and lists, e.g. "Systems 01". */
  code: string;
  /** The one outcome sentence that matters — shown large on the spread. */
  outcome: string;
  /** Month the outcome is dated to. */
  date: string;
  /** Shown as a dated proof card. */
  featured?: boolean;
  /** The headline result on the success-story card. Honest, not a vanity metric. */
  stat: { value: string; label: string };
  /** Hero "client win" card: one dated sentence, plus a monogram tile until a logo exists. */
  win?: string;
  initials?: string;
  /** Public URL, shown in the preview frame. */
  url?: string;
  /** Hero slide film (muted loop), shown while this project's win card loads. */
  heroVideo?: { src: string; webm?: string; poster: string };
  /** Mobile capture of the live site, scrolled inside a phone (hero slide + case study). */
  screen?: ProjectScreen;
  /** Desktop screen recording (2:1), played in a laptop on the success story — on hover, or in view on touch screens. */
  video?: { src: string; webm?: string; poster: string };
  /** One line, used in lists and meta descriptions. */
  summary: string;
  /** Short italic line shown under the case-study title. */
  line: string;
  scope: string[];
  stack: string[];
  status: string;
  situation: string[];
  built: { title: string; body: string }[];
  decisions?: { title: string; body: string }[];
  now: string;
  /** Optional client palette, shown as swatches on the plate. */
  palette?: string[];
  cover?: { src: string; alt: string };
  gallery?: { src: string; alt: string }[];
};

export const projects: Project[] = [
  {
    slug: "mazhwetu-general-works",
    url: "mazhwetu-mock-8mca.vercel.app",
    video: {
      src: "/work/mazhwetu-general-works/preview.mp4",
      webm: "/work/mazhwetu-general-works/preview.webm",
      poster: "/work/mazhwetu-general-works/poster.jpg",
    },
    stat: { value: "Since 2015", label: "eleven years of building work, given a premium website" },
    service: "Presence",
    code: "Presence 01",
    outcome: "Eleven years of building and landscaping, given a website built strategy-first, section by reusable section.",
    date: "2026",
    name: "Mazhwetu General Works",
    client: "Mazhwetu General Works (Pty) Ltd",
    sector: "Construction & landscaping",
    year: "2026",
    type: "Website",
    summary: "A premium website for a construction, renovation and landscaping company in Diepsloot.",
    line: "Eleven years of work on the ground, given a website that carries its weight.",
    scope: ["Strategy", "Information architecture", "Design", "Development"],
    stack: ["Next.js", "TypeScript", "GSAP", "ScrollTrigger", "Lenis"],
    status: "In build",
    situation: [
      "Mazhwetu General Works has been building, renovating, landscaping and maintaining properties since 2015, from its base in Diepsloot.",
      "The work is physical and visual — outdoor spaces, structures, finishes — and the website needed to carry that weight.",
    ],
    built: [
      {
        title: "Strategy before style",
        body: "Built on the same engineering manual I use for every site: business goal, audience and structure settled before a single colour was chosen.",
      },
      {
        title: "A system, not a page",
        body: "Every section is its own reusable component and every animation lives separately, so the site can grow without being rebuilt.",
      },
      {
        title: "Their own palette",
        body: "Deep forest, near black, warm off-white and MGW green — the company's colours, not a template's.",
      },
    ],
    palette: ["#07100A", "#111711", "#F3F1EA", "#8FC56C"],
    now: "In build on Next.js, with GSAP, ScrollTrigger and Lenis handling motion only where it helps the visitor read the work.",
  },
  {
    slug: "kane-solutions",
    video: {
      src: "/work/kane-solutions/preview.mp4",
      webm: "/work/kane-solutions/preview.webm",
      poster: "/work/kane-solutions/poster.jpg",
    },
    stat: { value: "Back online", label: "after recurring 522/524 timeouts — then SEO and analytics" },
    url: "kanesolutions.co.za",
    service: "Presence",
    code: "Presence 02",
    outcome: "Site timeouts traced and fixed, DNS migrated, and SEO and analytics put in place.",
    date: "Jun 2026",
    featured: true,
    win: "Brought Kane Solutions' site back online after recurring timeouts, then added SEO and analytics",
    initials: "KS",
    heroVideo: {
      src: "/work/kane-solutions/hero.mp4",
      webm: "/work/kane-solutions/hero.webm",
      poster: "/work/kane-solutions/hero-poster.jpg",
    },
    name: "Kane Solutions",
    client: "Kane Solutions",
    sector: "Solar energy",
    year: "2026",
    type: "Care",
    summary:
      "Fixing, migrating and tuning the infrastructure behind a Johannesburg solar company's website.",
    line: "The unglamorous work that keeps a business reachable.",
    scope: ["Diagnosis", "DNS migration", "SSL", "SEO", "Analytics", "Data audit", "Email"],
    stack: ["React", "Vite", "Afrihost", "Microsoft 365", "Google Analytics 4"],
    status: "Ongoing",
    situation: [
      "Kane Solutions sells and maintains solar systems. Their website had started failing with 522 and 524 timeout errors.",
    ],
    built: [
      {
        title: "Found the real cause",
        body: "Traced the timeouts to WordPress's wp-cron overloading the server, fixed it, then ruled out the firewall, IP blocking and DNS mismatches one by one.",
      },
      {
        title: "DNS migration",
        body: "Moved DNS from Cloudflare to Afrihost, recreating every record by hand — Microsoft 365, Teams, Mailchimp signing, SPF and DMARC — and installed a new SSL certificate.",
      },
      {
        title: "SEO and measurement",
        body: "On their React/Vite site: a real H1 with a clear call to action, meta description, canonical URL, Open Graph tags, LocalBusiness schema, an auto-generated sitemap and Google Analytics 4.",
      },
      {
        title: "Package data audit",
        body: "Checked every subscription package on the site against their own spreadsheet and corrected prices, names, system sizes, inverters and the plan line-up.",
      },
    ],
    now: "An ongoing relationship: infrastructure, email, SEO and whatever else the website needs next.",
  },
  {
    // CONFIRM: scope, stack and date — the copy below only states what the live site shows.
    slug: "big-bee-logistics",
    video: {
      src: "/work/big-bee-logistics/preview.mp4",
      webm: "/work/big-bee-logistics/preview.webm",
      poster: "/work/big-bee-logistics/poster.jpg",
    },
    stat: { value: "3 in 1", label: "transport, warehousing and safety supplies — one clear front door" },
    url: "bigbeelogistics.co.za",
    service: "Presence",
    code: "Presence 03",
    outcome: "Three lines of business on one site, with a quote request on the first screen.",
    date: "2026",
    featured: true,
    win: "Built Big Bee Logistics' website — fleet, warehousing and supplies, with quotes one tap away",
    initials: "BB",
    screen: {
      src: "/work/big-bee-logistics/mobile.webp",
      w: 575,
      h: 8000,
      // hero · what we do · values · why Big Bee · call to action + footer
      stops: [0, 1250, 3190, 4950, 6754],
      alt: "The Big Bee Logistics website on a phone, scrolling from the hero to the contact section",
      backdrop: "/work/big-bee-logistics/backdrop.webp",
    },
    name: "Big Bee Logistics",
    client: "Big Bee Logistics",
    sector: "Logistics",
    year: "2026",
    type: "Website",
    summary: "A website for a Glen Marais logistics company — transport, warehousing and safety supplies.",
    line: "Always on time, always reliable — said once, and clearly.",
    scope: ["Design", "Development", "Content structure"],
    stack: ["Responsive website"],
    status: "Live",
    situation: [
      "Big Bee Logistics moves goods across South Africa and into neighbouring countries, stores and distributes them, and supplies safety equipment and janitorial products, from its base in Glen Marais.",
      "Three lines of business needed one front door that answers what a logistics client checks first: can you move it, can you keep it safe, and will it arrive when you said.",
    ],
    built: [
      {
        title: "Three services, one front door",
        body: "Transportation and logistics, warehousing and distribution, and safety and equipment supplies, each stated plainly.",
      },
      {
        title: "The reasons to trust them",
        body: "Tracked trucks with real-time telemetry, goods insured in transit, and their values, vision and mission in their own words.",
      },
      {
        title: "Quotes without friction",
        body: "A quote request from the first screen, and phone, email and WhatsApp together in one contact section.",
      },
    ],
    now: "Live at bigbeelogistics.co.za.",
  },
  {
    // CONFIRM: live domain (recorded on a Vercel preview), year, scope and stack.
    slug: "midcenturist",
    url: "midcenturist-official.vercel.app",
    video: {
      src: "/work/midcenturist/preview.mp4",
      webm: "/work/midcenturist/preview.webm",
      poster: "/work/midcenturist/poster.jpg",
    },
    stat: { value: "One-offs", label: "a storefront built for pieces that only exist once" },
    service: "Commerce",
    code: "Commerce 01",
    outcome: "Midcentury, Danish and retro furniture, sold online with room to tell each piece's story.",
    date: "2026",
    name: "Midcenturist",
    client: "Midcenturist",
    sector: "Furniture ecommerce",
    year: "2026",
    type: "Website",
    summary: "An online store for midcentury, Danish and retro furniture.",
    line: "Furniture with a past, sold like it matters.",
    scope: ["Ecommerce", "Design", "Development"],
    stack: ["Online storefront"],
    status: "Built",
    situation: [
      "Midcenturist sells midcentury, Danish and retro furniture — much of it one of a kind.",
      "A catalogue of one-offs needs more than a product grid: each piece has to be easy to find, and shown with the care that kept it going for decades.",
    ],
    built: [
      {
        title: "Rooms, not products",
        body: "Full-bleed scenes — Dine in History, Texture & Colour — that sell the setting a piece belongs in, not just the item.",
      },
      {
        title: "Ways in",
        body: "Just in, pieces with a story, and rare finds and one-offs, alongside categories, search and a wishlist.",
      },
      {
        title: "The store itself",
        body: "Product browsing, best sellers, a cart, and a sign-up so regulars see new arrivals first.",
      },
    ],
    now: "Built and ready to trade.",
  },
  {
    // CONFIRM: year, scope and stack.
    slug: "hands-of-sympathy",
    video: {
      src: "/work/hands-of-sympathy/preview.mp4",
      webm: "/work/hands-of-sympathy/preview.webm",
      poster: "/work/hands-of-sympathy/poster.jpg",
    },
    stat: { value: "1 tap", label: "to request a call, from anywhere on the page" },
    url: "handsofsympathy.com",
    service: "Presence",
    code: "Presence 04",
    outcome: "A calm, credible front door for a Birmingham mental health practice — with a call request always one tap away.",
    date: "2026",
    name: "Hands of Sympathy",
    client: "Hands of Sympathy",
    sector: "Mental health",
    year: "2026",
    type: "Website",
    summary: "A website for a Birmingham mental health practice offering CBT, ACT and CFT.",
    line: "A safe space, before the first session.",
    scope: ["Design", "Development", "Content structure"],
    stack: ["Responsive website"],
    status: "Live",
    situation: [
      "Hands of Sympathy is a mental health practice in Birmingham, UK — BABCP accredited, established in 2010, and working alongside the NHS.",
      "People arrive at a site like this at a hard moment. It had to feel calm, show its credentials plainly, and make the next step easy.",
    ],
    built: [
      {
        title: "A calm first impression",
        body: "Editorial serif type, warm paper tones, one deep wine accent and real people — support that looks like it feels.",
      },
      {
        title: "Credentials up front",
        body: "14+ years, a 24-hour response, three integrated modalities and NHS work in one band near the top, with the specialisms running beneath it.",
      },
      {
        title: "Three modalities, one approach",
        body: "CBT, ACT and CFT explained side by side, with services from assessments and psychometric testing to family workshops and 1:1 therapy.",
      },
      {
        title: "Help within reach",
        body: "A Request a Call button that stays with the visitor all the way down the page.",
      },
    ],
    now: "Live at handsofsympathy.com.",
  },
  {
    // CONFIRM: public domain (recorded on a Vercel preview) and year.
    slug: "anlusi",
    url: "anlusiofficialsite-v1-rw29.vercel.app",
    video: {
      src: "/work/anlusi/preview.mp4",
      webm: "/work/anlusi/preview.webm",
      poster: "/work/anlusi/poster.jpg",
    },
    stat: { value: "Three.js", label: "an immersive, sound-optional site for the studio I co-founded" },
    service: "Presence",
    code: "Presence 05",
    outcome: "An immersive site for Anlusi Labs, the software studio I co-founded — crafted code, local roots.",
    date: "2026",
    name: "Anlusi Labs",
    client: "Anlusi Labs",
    sector: "Software studio",
    year: "2026",
    type: "Website",
    summary: "An immersive website for Anlusi Labs, the software studio I co-founded.",
    line: "Crafted code. Local roots.",
    scope: ["Creative direction", "3D & motion", "Development"],
    stack: ["Three.js", "Vercel"],
    status: "Built",
    situation: [
      "Anlusi Labs is a software studio I co-founded. Its own website had to show the craft rather than describe it.",
    ],
    built: [
      {
        title: "An entrance",
        body: "A short loading sequence, then a choice: enter with sound, or without.",
      },
      {
        title: "3D and motion",
        body: "A Three.js hero — Crafted Code, Local Roots — and scroll-led chapters on the approach, the problem and the solution.",
      },
      {
        title: "Proof and contact",
        body: "Benefits, the technologies behind the work, featured projects, and a short form to start a conversation.",
      },
    ],
    now: "Built, with the public launch to follow.",
  },
  {
    slug: "krdf-prosuite",
    url: "krdf-prosuite.vercel.app",
    screen: {
      src: "/work/krdf-prosuite/mobile.webp",
      w: 1179,
      h: 4983,
      // today's position · what needs you · bank and jobs
      stops: [0, 1690, 2600],
      alt: "KRDF ProSuite's owner dashboard on a phone: money owed, finished jobs not yet invoiced, bank and jobs",
    },
    stat: { value: "3 ways", label: "to confirm a customer payment against its invoice and job" },
    service: "Systems",
    code: "Systems 01",
    outcome: "Customer payments land against the right invoice and job — confirmed by hand, by suggestion, or automatically.",
    date: "2026",
    name: "KRDF ProSuite",
    client: "KRDF African Plumbing and Maintenance (Pty) Ltd",
    sector: "Plumbing & maintenance",
    year: "2026",
    type: "System",
    summary:
      "Invoicing, jobcards and bank reconciliation software for a field-services business.",
    line: "When a customer pays, the money finds its invoice and its job.",
    scope: ["Architecture", "Product design", "Frontend", "Backend", "Payroll"],
    stack: ["Next.js", "TypeScript", "Flask", "PostgreSQL", "Render", "Supabase Auth"],
    status: "In build — phased delivery",
    situation: [
      "The owner wanted his own business software, in the spirit of Sage or Krono, but starting small and built around how his team actually works.",
      "The sharpest pain was money. A customer would pay, he'd see it in his FNB app, and then someone had to match it back to the right invoice and the right job by hand.",
    ],
    built: [
      {
        title: "Financial core",
        body: "Customers, quotes, invoices, credit notes, payments in and out, suppliers, expenses, products, bank accounts and a chart of accounts.",
      },
      {
        title: "Operations",
        body: "Jobcards, bookings, roster, timesheets and sites, so the work and the money live in the same place.",
      },
      {
        title: "Payroll",
        body: "Employees, pay items, pay runs and EMP201 reporting, delivered as the third phase.",
      },
      {
        title: "A technician side",
        body: "A phone-first web interface. Technicians see only their assigned jobcards, update status, capture the customer's sign-off, and claim back fuel they paid for themselves with a photo of the receipt.",
      },
    ],
    decisions: [
      {
        title: "Three ways to confirm a payment",
        body: "He was worried automatic matching could get it wrong, so he keeps the choice: confirm manually, accept a suggested match, or let exact matches confirm themselves.",
      },
      {
        title: "Roles by invitation",
        body: "The owner invites people as owner, office or technician. The role lives on the account, not on a login page, and everyone can sign in with an email address or a phone number.",
      },
      {
        title: "Phased, not big-bang",
        body: "Financial core first, then operations, then payroll. Each phase is usable on its own before the next one starts.",
      },
    ],
    now: "The frontend for all phases is built and the backend and integrations are being completed. The product name and the blue-and-yellow identity are the client's own.",
  },
  {
    slug: "bee-hill-college",
    stat: { value: "Monthly", label: "managed, captured and hosted since August 2026" },
    service: "Systems",
    code: "Systems 02",
    outcome: "Fees system live since August, then managed and captured for the college every month.",
    date: "Aug 2026",
    win: "Built Bee-Hill College's fees system — live and managed every month since August",
    initials: "BH",
    name: "Bee-Hill College",
    client: "Bee-Hill College",
    sector: "Education",
    year: "2026",
    type: "System",
    summary: "A school fees management system — built, hosted and run month to month.",
    line: "Built in August. Looked after every month since.",
    scope: ["Fees management system", "Hosting", "Monthly management", "Data capturing"],
    stack: ["Custom web application", "Managed hosting"],
    status: "Live — monthly management",
    situation: [
      "Bee-Hill College needed a dependable way to manage school fees.",
    ],
    built: [
      {
        title: "Fees management system",
        body: "A purpose-built system for managing the college's school fees, delivered in August 2026.",
      },
      {
        title: "Ongoing operation",
        body: "Since September 2026 I manage the system, capture each month's data and host it, invoiced monthly.",
      },
    ],
    now: "Live and in its monthly cycle. The college doesn't have to think about the software — that's my job.",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

export const getNextProject = (slug: string) => {
  const i = projects.findIndex((p) => p.slug === slug);
  return projects[(i + 1) % projects.length];
};
