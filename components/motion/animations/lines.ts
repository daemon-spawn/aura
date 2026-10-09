import { gsap, SplitText } from "@/lib/gsap";
import { motion } from "./config";

/**
 * Masked line reveal for headings. Re-splits on resize / font load.
 * `immediate` plays on mount (hero) instead of on scroll.
 */
export function revealLines(el: HTMLElement, opts: { immediate?: boolean; delay?: number } = {}) {
  gsap.set(el, { visibility: "visible" });
  return SplitText.create(el, {
    type: "lines",
    mask: "lines",
    linesClass: "split-line",
    autoSplit: true,
    aria: "auto",
    onSplit(self) {
      return gsap.from(self.lines, {
        yPercent: motion.lines.yPercent,
        duration: motion.lines.duration,
        stagger: motion.lines.stagger,
        ease: motion.ease,
        delay: opts.delay ?? 0,
        scrollTrigger: opts.immediate
          ? undefined
          : { trigger: el, start: motion.start, once: true },
      });
    },
  });
}
