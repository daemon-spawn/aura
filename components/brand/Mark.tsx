import type { SVGProps } from "react";

/** The Λ peak on its own — AURA's icon (the app-icon glyph, without the tile). */
export function Mark(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 40 40" fill="none" aria-hidden="true" {...props}>
      <path d="M8 34 L20 6 L32 34" stroke="currentColor" strokeWidth={1.6} strokeLinejoin="miter" />
    </svg>
  );
}
