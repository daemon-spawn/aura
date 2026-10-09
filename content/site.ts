/**
 * Site-wide settings. Edit here — components read from this file.
 */
export const site = {
  name: "AURA",
  tagline: "Digital Presence Studio",
  /** Brand Foundation — primary statement. */
  statement: "Digital presence for ambitious companies",
  /** Brand Foundation — core philosophy. */
  philosophy: "Presence shapes perception.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://byaura.co.za",
  founder: "Andrew Mncube",
  role: "Founder — design & engineering",
  location: "Johannesburg, South Africa",
  city: "Johannesburg",
  timeZone: "Africa/Johannesburg",
  tzLabel: "GMT+2",
  /** Optional founder portrait, e.g. "/andrew.jpg". The founder card is typographic until set. */
  portrait: undefined as string | undefined,
  /** CONFIRM: public contact address. Currently your stated billing email. */
  email: "syloncube837@gmail.com",
  description:
    "AURA is a one-person digital presence studio in Johannesburg. I design and engineer premium websites, online stores and the systems behind them, for companies whose presence no longer reflects what they've built.",
  /** Statement-section facts. Keep them true — they rotate on a timer. */
  stats: [
    { value: "07", label: "Businesses whose websites and systems I've built or run" },
    { value: "1", label: "Person, from the first call to the monthly upkeep. No hand-offs." },
  ],
  primaryCta: { label: "Book a discovery call", href: "/contact" },
  /** Hero "client wins", in order (project slugs). Each needs `win` set in projects.ts. */
  heroWins: ["big-bee-logistics", "kane-solutions"],
  /** Success stories on the home page, in order. The work page shows every project. */
  homeStories: ["mazhwetu-general-works", "kane-solutions", "big-bee-logistics", "midcenturist", "krdf-prosuite"],
  /** Footer socials. CONFIRM: add the Instagram and LinkedIn profile URLs — a social without `href` shows as plain text. */
  socials: [
    { label: "Instagram", href: undefined as string | undefined },
    { label: "LinkedIn", href: undefined as string | undefined },
    { label: "Email", href: "mailto:syloncube837@gmail.com" as string | undefined },
  ],
  nav: [
    { label: "About", href: "/about" },
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "Process", href: "/#process" },
  ],
} as const;

export type NavItem = (typeof site.nav)[number];
