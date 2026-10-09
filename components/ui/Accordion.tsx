import Link from "next/link";
import type { Faq } from "@/content/faq";
import { Arrow } from "@/components/brand/Arrow";
import styles from "./Accordion.module.css";

/** Native <details> — keyboard and screen-reader friendly by default. */
export function Accordion({ items }: { items: Faq[] }) {
  return (
    <div className={styles.list}>
      {items.map((item, i) => (
        <details key={item.q} className={styles.item} data-anim="fade" data-anim-delay={String(i * 0.06)} name="faq">
          <summary className={styles.summary}>
            <span className={styles.q}>{item.q}</span>
            <span className={styles.toggle} aria-hidden="true" />
          </summary>
          <div className={styles.answer}>
            {item.a.map((para, k) => (
              <p key={k} className="t-body">
                {para}
              </p>
            ))}
            {item.cta && (
              <Link href={item.cta.href} className={styles.cta} data-track="book_call_click">
                {item.cta.label} <Arrow />
              </Link>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
