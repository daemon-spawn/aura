import Link from "next/link";
import type { Project } from "@/content/projects";
import { Reveal } from "@/components/motion/Reveal";
import { Plate } from "@/components/ui/Plate";
import { StoryMedia } from "./StoryMedia";
import { Arrow } from "@/components/brand/Arrow";
import styles from "./SuccessStories.module.css";

type Props = { projects: Project[]; showAllLink?: boolean; id?: string };

/**
 * MONOLOG-pattern success stories on a paper ground:
 * label · large media · details (counter, name, description, tags, result, link).
 */
export function SuccessStories({ projects, showAllLink = true, id = "work" }: Props) {
  const total = String(projects.length).padStart(2, "0");
  return (
    <Reveal as="section" className={`paper ${styles.section}`} id={id} aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`} className="sr-only">Success stories</h2>
      {projects.map((p, i) => (
        <article key={p.slug} className={styles.story} aria-labelledby={`story-${p.slug}`}>
          <p className={styles.label} data-anim="fade">
            <span className={styles.dot} aria-hidden="true" />
            Success <br />
            stories
          </p>

          <div className={styles.media} data-anim="fade">
            <StoryMedia project={p}>
              <Plate project={p} index={i} sizes="(min-width: 1100px) 50vw, 100vw" className={styles.plate} />
            </StoryMedia>
          </div>

          <div className={styles.info}>
            <p className={`t-meta ${styles.counter}`} data-anim="fade">
              <span>SS</span>
              <span aria-hidden="true">←</span>
              <span className={styles.badge}>
                {String(i + 1).padStart(2, "0")}/{total}
              </span>
            </p>
            <h3 id={`story-${p.slug}`} className={styles.name} data-anim="fade">
              {p.name}
            </h3>
            <p className={styles.desc} data-anim="fade">{p.summary}</p>
            <ul className={styles.tags} data-anim="fade" aria-label="Scope">
              {p.scope.slice(0, 3).map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <div className={styles.result} data-anim="fade">
              <span className={styles.value}>{p.stat.value}</span>
              <span className={styles.resultLabel}>{p.stat.label}</span>
            </div>
            <Link href={`/work/${p.slug}`} className={styles.link} data-anim="fade">
              View case study <span className="sr-only">: {p.name}</span>
              <Arrow />
            </Link>
          </div>
        </article>
      ))}
      {showAllLink && (
        <div className={styles.all}>
          <Link href="/work" className={styles.link}>
            View all stories <Arrow />
          </Link>
        </div>
      )}
    </Reveal>
  );
}
