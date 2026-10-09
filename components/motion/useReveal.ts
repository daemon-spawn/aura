"use client";

import { type RefObject } from "react";
import { useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { revealLines, fadeUp, drawRule, scrubWords, closeGap, revealRows } from "@/components/motion/animations";

/**
 * Wires declarative `data-anim` attributes inside `scope` to the animation modules.
 *
 *   data-anim="lines"     masked line reveal (headings)
 *   data-anim="rows"      same, for headlines already broken into [data-row] lines
 *   data-anim="fade"      fade-up (copy, meta, cards)
 *   data-anim="rule"      hairline draws in
 *   data-anim="words"     manifesto: words brighten as you read (scrubbed)
 *   data-anim="gap"       the "I close / that gap" scene (tall section)
 *   data-anim-delay="0.2"   seconds
 *   data-anim-immediate     play on mount instead of on scroll (above the fold)
 *
 * Components stay presentational; motion lives in /components/motion/animations.
 */
export function useReveal(scope: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const root = scope.current;
      if (!root || prefersReducedMotion()) return;

      const splits: { revert: () => void }[] = [];

      root.querySelectorAll<HTMLElement>("[data-anim]").forEach((el) => {
        const type = el.dataset.anim;
        const delay = el.dataset.animDelay ? parseFloat(el.dataset.animDelay) : 0;
        const immediate = el.hasAttribute("data-anim-immediate");

        switch (type) {
          case "lines":
            splits.push(revealLines(el, { immediate, delay }));
            break;
          case "rows":
            revealRows(el, { immediate, delay });
            break;
          case "fade":
            fadeUp(el, { immediate, delay });
            break;
          case "rule":
            drawRule(el, { immediate, delay });
            break;
          case "words":
            splits.push(scrubWords(el));
            break;
          case "gap":
            closeGap(el);
            break;
          default:
            el.style.visibility = "visible";
        }
      });

      return () => splits.forEach((s) => s.revert());
    },
    { scope },
  );
}
