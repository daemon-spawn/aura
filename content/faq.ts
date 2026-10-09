/**
 * FAQ — Andrew's own questions and answers. Each answer is a list of
 * paragraphs; `cta` adds a link after the last one. Investment stays last.
 */
export type Faq = { q: string; a: string[]; cta?: { label: string; href: string }; key?: boolean };

/** Investment — pricing positioning (matches the last FAQ answer). */
export const investment = {
  from: "R8,000",
  range: "R10,000 – R100,000",
  factors: ["Scope", "Project complexity"],
};

/** `key: true` items also appear on the contact page. */
export const faq: Faq[] = [
  {
    key: true,
    q: "Who will actually be working on our project?",
    a: [
      "Andrew leads every engagement — strategy and creative direction — and is your primary point of contact throughout.",
      "Depending on scope, a carefully selected team of collaborators supports on design and development. The level of care and craft stays consistent, regardless of project size.",
    ],
  },
  {
    q: "How long do your projects usually take?",
    a: [
      "Most projects run 10–14 weeks end to end.",
      "Timelines can flex based on scope, but we set milestones from day one so there are no surprises.",
    ],
  },
  {
    key: true,
    q: "How do you communicate and manage work?",
    a: [
      "We keep things simple and transparent, with a dedicated Notion portal to manage your project — timelines and deliverables in one place.",
      "Most of the time you'll receive async Loom updates and weekly communication via Slack or WhatsApp. We can also integrate with your tools, so the process stays structured yet flexible.",
      "Synchronous calls are typically scheduled to review important decisions or milestones.",
    ],
  },
  {
    key: true,
    q: "What do you need to start working together?",
    a: [
      "We'll discuss your specific needs on a discovery call, then provide a tailored proposal to match your project.",
      "After that, we just need the signed proposal and contract, and the initial project deposit. That's all — we keep onboarding fast so we can get to work as soon as possible. Ready to get started?",
    ],
    cta: { label: "Book a call with Andrew", href: "/contact" },
  },
  {
    q: "What happens after launch?",
    a: [
      "We provide 90 days of hands-on support to make sure everything runs smoothly and your brand is set to steal the spotlight. You'll also get tailored documentation and CMS training videos, so non-technical team members can update the site with ease.",
      "After that, you're fully equipped to manage things in-house — and if you ever want ongoing support, we offer care plans tailored to your needs.",
    ],
  },
  {
    q: "Can you handle branding, design and development?",
    a: [
      "Absolutely. Our speciality is delivering all three under one roof, focused on what matters most to you and your business.",
      "Whether you're a team of 10 or a brand operating in 50 countries, your narrative, identity, visuals and functionality are aligned from day one, creating a cohesive final experience.",
    ],
  },
  {
    q: "What is the project investment?",
    a: [
      "Project investment starts from R8,000, with most projects ranging from R10,000 to R100,000 depending on scope and project complexity.",
    ],
  },
];
