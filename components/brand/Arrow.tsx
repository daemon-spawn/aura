import type { SVGProps } from "react";

type Dir = "ne" | "e" | "w" | "n";

const paths: Record<Dir, string> = {
  ne: "M3 11 L11 3 M5 3 H11 V9",
  e: "M1.5 7 H12.5 M8 2.5 L12.5 7 L8 11.5",
  w: "M12.5 7 H1.5 M6 2.5 L1.5 7 L6 11.5",
  n: "M7 12.5 V1.5 M2.5 6 L7 1.5 L11.5 6",
};

/** AURA's arrow: a plain line arrow (↗ by default), drawn to sit on the text baseline. */
export function Arrow({ dir = "ne", ...props }: SVGProps<SVGSVGElement> & { dir?: Dir }) {
  return (
    <svg viewBox="0 0 14 14" width="12" height="12" fill="none" aria-hidden="true" {...props}>
      <path d={paths[dir]} stroke="currentColor" strokeWidth={1.5} strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}
