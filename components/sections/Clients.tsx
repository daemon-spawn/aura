import Link from "next/link";
import { clients, clientLogo } from "@/content/clients";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { Arrow } from "@/components/brand/Arrow";
import styles from "./Clients.module.css";

/**
 * "Brands I've helped" — MONOLOG pattern: dot label on the left, a 4 × 2 grid
 * of single-colour marks divided by hairlines (no outer border). The eighth
 * cell is an honest invitation rather than a padded logo.
 */
export function Clients() {
  return (
    <Reveal as="section" className={styles.clients} aria-labelledby="clients-title">
      <div className={styles.inner}>
        <h2 id="clients-title" className={styles.label} data-anim="fade">
          <span className={styles.dot} aria-hidden="true" />
          Brands I&rsquo;ve helped
        </h2>
        <ul className={styles.grid}>
          {clients.map((c, i) => {
            const mark = c.logo ? (
              <img
                src={clientLogo(c.id)}
                alt={c.name}
                width={c.logo.w}
                height={c.logo.h}
                loading="lazy"
                className={styles.logo}
                style={{ height: `${c.h ?? 3}rem` }}
              />
            ) : (
              <span className={`serif ${styles.wordmark}`}>{c.name}</span>
            );
            return (
              <li key={c.id} className={styles.cell} data-anim="fade" data-anim-delay={String((i % 4) * 0.06)}>
                {c.project ? (
                  <Link href={`/work/${c.project}`} className={styles.link} aria-label={`${c.name} — case study`}>
                    {mark}
                  </Link>
                ) : (
                  mark
                )}
              </li>
            );
          })}
          <li className={`${styles.cell} ${styles.next}`} data-anim="fade" data-anim-delay="0.18">
            <Link href={site.primaryCta.href} className={styles.nextLink} data-track="book_call_click">
              <span>Your brand next</span>
              <Arrow />
            </Link>
          </li>
        </ul>
      </div>
    </Reveal>
  );
}
