import { process } from "@/content/process";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./Process.module.css";

/** Project process — three named steps (MONOLOG pattern, AURA's own steps). */
export function Process() {
  return (
    <Reveal as="section" className={`section ${styles.section}`} id="process" aria-labelledby="process-title">
      <div className="container">
        <header className={styles.head}>
          <p className={styles.label} data-anim="fade">
            <span className={styles.dot} aria-hidden="true" />
            Project process
          </p>
          <h2 id="process-title" className={styles.title} data-anim="lines">
            Three steps, from first call to launch.
          </h2>
        </header>
        <ol className={styles.steps}>
          {process.map((s, i) => (
            <li key={s.index} className={styles.step} data-anim="fade" data-anim-delay={String(i * 0.1)}>
              <div className={styles.stepHead}>
                <span className="t-meta">Step</span>
                <span className={styles.num}>{s.index}</span>
              </div>
              <h3 className={styles.stepTitle}>{s.title}</h3>
              <p className={styles.body}>{s.body}</p>
              {s.detail && (
                <ul className={styles.detail} aria-label={`Step ${s.index} includes`}>
                  {s.detail.map((d) => (
                    <li key={d}>{d}</li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ol>
      </div>
    </Reveal>
  );
}
