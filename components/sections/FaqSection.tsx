import type { ReactNode } from "react";
import type { Faq } from "@/content/faq";
import { Reveal } from "@/components/motion/Reveal";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { FounderCard } from "@/components/ui/FounderCard";
import styles from "./FaqSection.module.css";

type Props = { items: Faq[]; title?: ReactNode; id?: string; moreHref?: string };

/** Objections answered before the ask. Investment is the last answer, in full. */
export function FaqSection({
  items,
  title = <>Here&rsquo;s what to consider before we work together.</>,
  id = "faq",
  moreHref,
}: Props) {
  return (
    <Reveal as="section" className={`section ${styles.faq}`} id={id} aria-labelledby={`${id}-title`}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.head}>
          <p className={styles.label} data-anim="fade">
            <span className={styles.dot} aria-hidden="true" />
            FAQ
          </p>
          <h2 id={`${id}-title`} className={styles.title} data-anim="lines">
            {title}
          </h2>
          <div className={styles.founder} data-anim="fade" data-anim-delay="0.1">
            <FounderCard />
          </div>
          {moreHref && (
            <div data-anim="fade">
              <Button href={moreHref} variant="text">All questions</Button>
            </div>
          )}
        </div>
        <div className={styles.list}>
          <Accordion items={items} />
        </div>
      </div>
    </Reveal>
  );
}
