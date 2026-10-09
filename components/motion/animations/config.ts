/** Shared motion vocabulary — one place to tune the whole site. */
export const motion = {
  ease: "expo.out",
  easeInOut: "power3.inOut",
  lines: { duration: 1.1, stagger: 0.08, yPercent: 110 },
  fade: { duration: 1, y: 18 },
  rule: { duration: 1.4 },
  peak: { duration: 2.2 },
  /** Where reveals fire relative to the viewport. */
  start: "top 86%",
} as const;
