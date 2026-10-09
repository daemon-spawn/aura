import Link from "next/link";
import type { Project } from "@/content/projects";
import { Reveal } from "@/components/motion/Reveal";
import { Arrow } from "@/components/brand/Arrow";
import styles from "./NextProject.module.css";

export function NextProject({ project }: { project: Project }) {
  return (
    <Reveal as="nav" className={styles.next} aria-label="Next project">
      <div className="container">
        <Link href={`/work/${project.slug}`} className={styles.link}>
          <span className="t-meta" data-anim="fade">Next project</span>
          <span className={`t-h2 ${styles.name}`} data-anim="lines">{project.name}</span>
          <span className={styles.row} data-anim="fade">
            <span className="t-small">{project.summary}</span>
            <Arrow className={styles.chev} />
          </span>
        </Link>
      </div>
    </Reveal>
  );
}
