/** Project process — Andrew's three steps. Add `detail` to a step to list what it includes. */
export type ProcessStep = { index: string; title: string; body: string; detail?: string[] };

export const process: ProcessStep[] = [
  {
    index: "01",
    title: "We uncover your story",
    body: "We dig deep into your brand, surface what makes you irreplaceable, and shape it into sharp positioning and a website strategy that connects in seconds.",
  },
  {
    index: "02",
    title: "We shape your digital presence",
    body: "With your narrative locked, we design and direct a brand and website that feels premium, signals credibility, and gives your audience one clear reason to lean in and act.",
  },
  {
    index: "03",
    title: "We send it into the world",
    body: "Your brand and website go live as a long-term asset that turns attention into opportunity, attracts the clients you're built for, and grows with you.",
  },
];
