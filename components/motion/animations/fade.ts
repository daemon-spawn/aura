import { gsap } from "@/lib/gsap";
import { motion } from "./config";

/** Fade-up for body copy, meta and cards. */
export function fadeUp(el: HTMLElement, opts: { immediate?: boolean; delay?: number } = {}) {
  return gsap.fromTo(
    el,
    { autoAlpha: 0, y: motion.fade.y },
    {
      autoAlpha: 1,
      y: 0,
      duration: motion.fade.duration,
      ease: motion.ease,
      delay: opts.delay ?? 0,
      clearProps: "transform",
      scrollTrigger: opts.immediate
        ? undefined
        : { trigger: el, start: motion.start, once: true },
    },
  );
}
