"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  lines: ReactNode[];
  id?: string;
  className?: string;
  /** Largest size the fit may reach, in px. */
  max?: number;
};

/**
 * A headline set on fixed lines and scaled so its longest line fills the
 * column exactly (MONOLOG-style). CSS clamp() is the no-JS fallback.
 * Each line is masked so animations/rows.ts can lift it in.
 */
export function FitTitle({ lines, id, className, max = 260 }: Props) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fit = () => {
      const inners = el.querySelectorAll<HTMLElement>("[data-fit]");
      const avail = el.clientWidth;
      if (!avail || !inners.length) return;
      el.style.fontSize = "100px";
      let widest = 0;
      inners.forEach((n) => (widest = Math.max(widest, n.getBoundingClientRect().width)));
      if (!widest) return;
      let size = Math.min(max, (100 * avail) / widest) * 0.985;
      // Also respect the parent's min-height (the first screen): never push content below it.
      const minH = parseFloat(getComputedStyle(el.parentElement as Element).minHeight) || 0;
      if (minH > 0) size = Math.min(size, (100 * minH) / el.offsetHeight);
      el.style.fontSize = `${size}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    document.fonts?.ready.then(fit).catch(() => {});
    return () => ro.disconnect();
  }, [max]);

  return (
    <h1 ref={ref} id={id} className={className} data-anim="rows" data-anim-immediate>
      {lines.map((l, i) => (
        <span key={i} style={{ display: "block", overflow: "hidden", paddingBottom: "0.06em", marginBottom: "-0.06em" }}>
          <span data-fit data-row style={{ display: "inline-block", whiteSpace: "nowrap" }}>
            {l}
          </span>
        </span>
      ))}
    </h1>
  );
}
