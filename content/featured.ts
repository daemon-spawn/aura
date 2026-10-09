/**
 * "Featured clients" (Dash Digital pattern): four clients in a row (a draggable row on small screens) —
 * logo, one paragraph on what I did, and a link to the case study.
 * Written in my words from the case studies; not client quotes. When a client
 * gives a real testimonial, add it as `quote` and it will show on the card.
 */
export type FeaturedClient = {
  /** Client id from content/clients.ts (logo, name, case study). */
  client: string;
  text: string;
  quote?: { text: string; name: string; role?: string };
};

export const featuredClients: FeaturedClient[] = [
  {
    client: "kane",
    text: "When Kane Solutions' site kept failing with timeouts, I traced the real cause, migrated their DNS by hand, then put SEO and analytics in place. I still look after the site and its email.",
  },
  {
    client: "bigbee",
    text: "Big Bee moves, stores and supplies goods across South Africa and beyond. I built the website that puts all three lines of business behind one clear front door, with a quote request on the first screen.",
  },
  {
    client: "midcenturist",
    text: "An online store for midcentury, Danish and retro furniture — built so one-of-a-kind pieces are easy to find, and shown with the story that makes them worth buying.",
  },
  {
    client: "handsofsympathy",
    text: "A calm, credible website for a Birmingham mental health practice: credentials up front, three therapies explained side by side, and a call request one tap away.",
  },
];
