import { gsap } from "@/lib/gsap";
import { motion } from "./config";

/** Hairline draws in from the left. */
export function drawRule(el: HTMLElement, opts: { immediate?: boolean; delay?: number } = {}) {
  gsap.set(el, { visibility: "visible" });
  return gsap.fromTo(
    el,
    { scaleX: 0 },
    {
      scaleX: 1,
      transformOrigin: "left center",
      duration: motion.rule.duration,
      ease: motion.easeInOut,
      delay: opts.delay ?? 0,
      scrollTrigger: opts.immediate
        ? undefined
        : { trigger: el, start: "top 95%", once: true },
    },
  );
}
