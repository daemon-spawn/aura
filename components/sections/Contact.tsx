import type { ReactNode } from "react";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import styles from "./Contact.module.css";

type Props = { title?: ReactNode };

/** Closing ask: the large stacked question, then the call to action. */
export function Contact({
  title = (
    <>
      <span className={styles.line}>Ready for a presence</span>
      <span className={styles.line}>that matches what</span>
      <span className={styles.line}>
        you&rsquo;ve <span className="serif">built?</span>
      </span>
    </>
  ),
}: Props) {
  return (
    <Reveal as="section" className={styles.cta} aria-labelledby="cta-title">
      <div className="container">
        <h2 id="cta-title" className={styles.title} data-anim="lines">
          {title}
        </h2>

        <div className={styles.actions} data-anim="fade">
          <Button href={site.primaryCta.href} track="book_call_click">
            {site.primaryCta.label}
          </Button>
          <a href={`mailto:${site.email}`} className={styles.mail}>or email {site.email}</a>
        </div>
      </div>
    </Reveal>
  );
}
