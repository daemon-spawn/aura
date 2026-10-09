import Link from "next/link";
import Image from "next/image";
import { site } from "@/content/site";
import { Arrow } from "@/components/brand/Arrow";
import styles from "./FounderCard.module.css";

/** "Want to know if we'd be a good fit? — Book a call with Andrew" (MONOLOG founder card). */
export function FounderCard({ className }: { className?: string }) {
  return (
    <aside className={`${styles.card} ${className ?? ""}`} aria-label="Book with Andrew">
      <span className={styles.avatar}>
        {site.portrait ? (
          <Image src={site.portrait} alt="" fill sizes="56px" />
        ) : (
          <span className="serif" aria-hidden="true">
            AM
          </span>
        )}
      </span>
      <span className={styles.cardText}>
        <span className={styles.cardQ}>Want to know if we&rsquo;d be a good fit?</span>
        <Link href={site.primaryCta.href} className={styles.cardLink} data-track="book_call_click">
          Book a call with Andrew <Arrow />
        </Link>
      </span>
    </aside>
  );
}
