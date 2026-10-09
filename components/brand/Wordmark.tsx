import type { SVGProps } from "react";

/**
 * AURA wordmark — redrawn as vector from the supplied logo:
 * uniform hairline strokes, wide tracking, both A's as pure Λ peaks.
 */
export function Wordmark({ title = "AURA", ...props }: SVGProps<SVGSVGElement> & { title?: string }) {
  return (
    <svg
      viewBox="-3 -7 348 74"
      fill="none"
      stroke="currentColor"
      strokeWidth={3.4}
      strokeLinejoin="miter"
      strokeMiterlimit={10}
      role="img"
      aria-label={title}
      {...props}
    >
      <path d="M0 64 L27 0 L54 64" />
      <path d="M98 0 V38 A26 26 0 0 0 150 38 V0" />
      <path d="M194 64 V0 H222 A17 17 0 0 1 222 34 H194 M217 34 L244 64" />
      <path d="M288 64 L315 0 L342 64" />
    </svg>
  );
}
