import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import { Mark } from "@/components/brand/Mark";
import styles from "./PageIntro.module.css";

type Props = {
  eyebrow: string;
  meta?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  children?: ReactNode;
};

/** Inner-page opener in the same atmosphere as the home hero, shorter. */
export function PageIntro({ eyebrow, meta, title, lead, children }: Props) {
  return (
    <Reveal as="section" className={styles.intro}>
      <div className={styles.glow} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.mark} data-anim="fade" data-anim-immediate>
          <Mark />
        </div>
        <p className={`t-meta ${styles.eyebrow}`} data-anim="fade" data-anim-immediate data-anim-delay="0.05">
          ({eyebrow}{meta ? <> — {meta}</> : null})
        </p>
        <h1 className={styles.title} data-anim="lines" data-anim-immediate data-anim-delay="0.1">
          {title}
        </h1>
        {lead && (
          <p className={styles.lead} data-anim="fade" data-anim-immediate data-anim-delay="0.4">
            {lead}
          </p>
        )}
        {children && (
          <div data-anim="fade" data-anim-immediate data-anim-delay="0.5">
            {children}
          </div>
        )}
      </div>
    </Reveal>
  );
}
