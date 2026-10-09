/**
 * Brands row (MONOLOG pattern: 4 × 2). Logos live in /public/clients:
 *   <id>-mono.png  — off-white knock-out for the dark brands row
 *   <id>-color.png — original colours, used on the white tiles in the hero
 *   <id>-ink.png   — near-black knock-out for paper (light) sections
 * `h` balances optical size (wide wordmarks sit lower than badges and crests).
 * `project` links to a case study when one exists.
 */
export type Client = {
  id: string;
  name: string;
  sector?: string;
  logo?: { w: number; h: number };
  /** Display height in rem in the brands row. */
  h?: number;
  /** A square-friendly crop for the hero tiles (wide wordmarks only). */
  tile?: boolean;
  project?: string;
};

export const clients: Client[] = [
  { id: "beehill", name: "The Bee-Hill College", sector: "Education", logo: { w: 434, h: 376 }, h: 4.25, project: "bee-hill-college" },
  { id: "kane", name: "Kane Solutions", sector: "Solar energy", logo: { w: 800, h: 152 }, h: 2.1, tile: true, project: "kane-solutions" },
  { id: "mazhwetu", name: "Mazhwetu General Works", sector: "Construction & landscaping", logo: { w: 624, h: 278 }, h: 3.25, project: "mazhwetu-general-works" },
  { id: "krdf", name: "KRDF African Plumbing and Maintenance", sector: "Plumbing & maintenance", logo: { w: 323, h: 370 }, h: 4.5, project: "krdf-prosuite" },
  { id: "bigbee", name: "Big Bee Logistics", sector: "Logistics", logo: { w: 370, h: 477 }, h: 4.5, project: "big-bee-logistics" },
  { id: "midcenturist", name: "Midcenturist", sector: "Furniture ecommerce", logo: { w: 324, h: 212 }, h: 3.4, project: "midcenturist" },
  { id: "handsofsympathy", name: "Hands of Sympathy", sector: "Mental health", project: "hands-of-sympathy" },
  { id: "anlusi", name: "Anlusi Labs", sector: "Software studio", logo: { w: 300, h: 104 }, h: 2.75, project: "anlusi" },
];

export const clientLogo = (id: string, variant: "mono" | "color" | "tile" | "ink" = "mono") => `/clients/${id}-${variant}.png`;
export const clientFor = (projectSlug: string) => clients.find((c) => c.project === projectSlug);
