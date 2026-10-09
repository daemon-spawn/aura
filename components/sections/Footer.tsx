import Link from "next/link";
import { site } from "@/content/site";
import { Wordmark } from "@/components/brand/Wordmark";
import { Arrow } from "@/components/brand/Arrow";
import { LocalTime } from "@/components/ui/LocalTime";
import styles from "./Footer.module.css";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={`grid ${styles.top}`}>
          <div className={styles.brand}>
            <Wordmark className={styles.wordmark} aria-hidden="true" title="" />
            <p className="t-meta">{site.tagline}</p>
          </div>

          <nav aria-label="Footer" className={`${styles.col} ${styles.pages}`}>
            <p className="t-meta">Pages</p>
            <ul>
              <li><Link href="/">Home</Link></li>
              {site.nav.map((n) => (
                <li key={n.href}><Link href={n.href}>{n.label}</Link></li>
              ))}
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </nav>

          <div className={`${styles.col} ${styles.talk}`}>
            <p className="t-meta">Talk to me</p>
            <ul>
              <li><Link href={site.primaryCta.href} data-track="book_call_click" className="ink">{site.primaryCta.label}</Link></li>
              <li><a href={`mailto:${site.email}`}>{site.email}</a></li>
            </ul>
          </div>

          <nav aria-label="Social" className={`${styles.col} ${styles.social}`}>
            <p className="t-meta">Socials</p>
            <ul>
              {site.socials.map((s) => (
                <li key={s.label}>
                  {s.href ? (
                    <a
                      href={s.href}
                      className={styles.socialLink}
                      {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    >
                      {s.label} <Arrow />
                    </a>
                  ) : (
                    <span className={styles.socialLink}>{s.label}</span>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className={`${styles.col} ${styles.time}`}>
            <p className="t-meta">Studio time</p>
            <ul>
              <li><LocalTime /></li>
              <li className="steel">{site.location}</li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {year} AURA — <span className="serif">{site.philosophy}</span></p>
          <a href="#top" className={styles.top2}>
            Back to top <Arrow dir="n" />
          </a>
        </div>
      </div>
    </footer>
  );
}
