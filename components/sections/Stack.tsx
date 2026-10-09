import { Reveal } from "@/components/motion/Reveal";
import styles from "./Stack.module.css";

const groups = [
  { label: "Interface", items: ["Next.js", "React", "TypeScript", "GSAP", "Lenis"] },
  { label: "Back end", items: ["Python", "Django", "Flask", "PostgreSQL", "Redis", "Celery"] },
  { label: "Infrastructure", items: ["AWS", "Render", "Cognito", "Supabase", "DNS & email"] },
];

export function Stack() {
  return (
    <Reveal as="section" className={`section ${styles.wrap}`} aria-labelledby="stack-title">
      <div className="container grid">
        <div className={styles.head}>
          <p className="t-meta" data-anim="fade">Toolkit</p>
          <h2 id="stack-title" className={`t-h3 ${styles.title}`} data-anim="fade">
            A small set of tools, known deeply.
          </h2>
        </div>
        <div className={styles.groups}>
          {groups.map((g, i) => (
            <div key={g.label} data-anim="fade" data-anim-delay={String(i * 0.08)}>
              <h3 className={`t-meta ${styles.groupLabel}`}>{g.label}</h3>
              <ul>
                {g.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
