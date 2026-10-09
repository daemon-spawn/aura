"use client";

import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import styles from "./MorphButton.module.css";

/**
 * Dash Digital's case-study button: a filled pill reading `label`; on hover
 * the fill shrinks into a dot at its left edge while an outlined pill opens
 * out to full width and reads `hoverLabel`.
 * `--diff` (how much shorter the resting pill is than the open one) is
 * measured, so any pair of labels lines up.
 */
export function MorphButton({
  href,
  label,
  hoverLabel,
  size = "md",
}: {
  href: string;
  label: string;
  hoverLabel: string;
  /** "sm": Dash's compact uppercase pill. */
  size?: "md" | "sm";
}) {
  const root = useRef<HTMLAnchorElement>(null);
  const rest = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const a = root.current;
    const r = rest.current;
    if (!a || !r) return;
    const measure = () => a.style.setProperty("--diff", `${Math.max(0, a.offsetWidth - r.offsetWidth)}px`);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(a);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, []);

  return (
    <Link ref={root} href={href} className={`${styles.button} ${size === "sm" ? styles.sm : ""}`} data-morph>
      {/* Sizes the button to the longer, open state */}
      <span className={styles.sizer} aria-hidden="true">
        {hoverLabel}
      </span>
      <span className={styles.open} aria-hidden="true">
        <span className={styles.openText}>{hoverLabel}</span>
      </span>
      <span className={styles.rest}>
        <span ref={rest} className={styles.restText} data-morph-rest>
          {label}
        </span>
      </span>
      <span className="sr-only">: {hoverLabel}</span>
    </Link>
  );
}
