import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow } from "@/components/brand/Arrow";
import styles from "./Button.module.css";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost" | "text";
  /** Analytics event name, picked up by the Analytics provider. */
  track?: string;
  className?: string;
};

/** Label + a small square holding the ↗ arrow (primary/ghost); plain arrow for text links. */
export function Button({ href, children, variant = "primary", track, className }: Props) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  const cls = [styles.btn, styles[variant], className].filter(Boolean).join(" ");
  const inner = (
    <>
      <span className={styles.label}>{children}</span>
      <span className={styles.box} aria-hidden="true">
        <Arrow className={styles.icon} />
      </span>
    </>
  );
  return external ? (
    <a href={href} className={cls} data-track={track}>
      {inner}
    </a>
  ) : (
    <Link href={href} className={cls} data-track={track}>
      {inner}
    </Link>
  );
}
