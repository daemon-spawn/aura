import { gsap, SplitText } from "@/lib/gsap";

/**
 * Manifesto reveal: words brighten from 15% to full as the paragraph scrolls
 * through the reading zone. Scrubbed, so it reads at the visitor's pace.
 */
export function scrubWords(el: HTMLElement) {
  gsap.set(el, { visibility: "visible" });
  return SplitText.create(el, {
    type: "words",
    aria: "auto",
    autoSplit: true,
    onSplit(self) {
      return gsap.fromTo(
        self.words,
        { opacity: 0.15 },
        {
          opacity: 1,
          ease: "none",
          stagger: 0.1,
          scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 85%", scrub: 0.7 },
        },
      );
    },
  });
}
