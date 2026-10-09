import { gsap } from "@/lib/gsap";
import { motion } from "./config";

/** Pre-broken headline lines ([data-row] inside masked rows) lift into place. */
export function revealRows(el: HTMLElement, opts: { immediate?: boolean; delay?: number } = {}) {
  gsap.set(el, { visibility: "visible" });
  return gsap.from(el.querySelectorAll("[data-row]"), {
    yPercent: 110,
    duration: motion.lines.duration,
    stagger: motion.lines.stagger,
    ease: motion.ease,
    delay: opts.delay ?? 0,
    scrollTrigger: opts.immediate ? undefined : { trigger: el, start: motion.start, once: true },
  });
}
