import Link from "next/link";
import { services, care } from "@/content/services";
import { projects } from "@/content/projects";
import { Reveal } from "@/components/motion/Reveal";
import { Arrow } from "@/components/brand/Arrow";
import styles from "./Services.module.css";

const byslug = (slug: string) => projects.find((p) => p.slug === slug);

/** Services page: the three service lines in detail, with Care underneath. */
export function Services() {
  return (
    <Reveal as="section" className={styles.section} aria-label="Service lines">
      {[...services, { id: "care", index: "+", name: care.title, promise: care.body, body: "", includes: [] as string[], proof: care.proof }].map(
        (s) => {
          const proof = s.proof.map(byslug).filter((p): p is NonNullable<typeof p> => Boolean(p));
          return (
            <article key={s.id} id={s.id} className={styles.row} aria-labelledby={`${s.id}-title`}>
              <div className={styles.side}>
                <p className={styles.label} data-anim="fade">
                  <span className={styles.dot} aria-hidden="true" />
                  AURA / {s.name}
                </p>
                <h2 id={`${s.id}-title`} className={styles.name} data-anim="lines">
                  {s.name}
                </h2>
              </div>
              <div className={styles.main}>
                <p className={styles.promise} data-anim="fade">{s.promise}</p>
                {s.body && <p className={styles.body} data-anim="fade">{s.body}</p>}
                {s.includes.length > 0 && (
                  <ul className={styles.tags} data-anim="fade" aria-label={`${s.name} includes`}>
                    {s.includes.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                )}
                <div className={styles.proof} data-anim="fade">
                  <span className="t-meta">Proven in</span>
                  {proof.length ? (
                    proof.map((p) => (
                      <Link key={p.slug} href={`/work/${p.slug}`} className={styles.proofLink}>
                        {p.name} <Arrow />
                      </Link>
                    ))
                  ) : (
                    <span className={styles.none}>Case study to come</span>
                  )}
                </div>
              </div>
            </article>
          );
        },
      )}
    </Reveal>
  );
}
