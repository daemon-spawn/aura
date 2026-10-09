import Link from "next/link";
import type { Project } from "@/content/projects";
import { Reveal } from "@/components/motion/Reveal";
import { Plate } from "@/components/ui/Plate";
import { Arrow } from "@/components/brand/Arrow";
import styles from "./CaseHero.module.css";

export function CaseHero({ project, index }: { project: Project; index: number }) {
  const facts = [
    { label: "Client", value: project.client },
    { label: "Sector", value: project.sector },
    { label: "Scope", value: project.scope.join(", ") },
    { label: "Status", value: project.status },
  ];
  return (
    <Reveal as="section" className={styles.hero} aria-labelledby="case-title">
      <div className="container">
        <div className={styles.strip} data-anim="fade" data-anim-immediate>
          <Link href="/work" className={styles.back}>
            <Arrow dir="w" /> <span className="slash"><span>AURA</span>/ Work</span>
          </Link>
          <p>
            <span className="ink">{project.code}</span>&nbsp;&nbsp;·&nbsp;&nbsp;{project.date}
          </p>
        </div>

        <h1 id="case-title" className={styles.title} data-anim="lines" data-anim-immediate data-anim-delay="0.1">
          {project.name}
        </h1>

        <div className={`grid ${styles.foot}`}>
          <p className={`serif ${styles.line}`} data-anim="fade" data-anim-immediate data-anim-delay="0.35">
            {project.line}
          </p>
          <p className={`t-lead ${styles.outcome}`} data-anim="fade" data-anim-immediate data-anim-delay="0.45">
            {project.outcome}
          </p>
        </div>

        <dl className={`grid ${styles.facts}`} data-anim="fade" data-anim-immediate data-anim-delay="0.55">
          {facts.map((f) => (
            <div key={f.label} className={styles.fact}>
              <dt className="t-meta">{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>

        {project.cover && (
          <div className={styles.plate} data-anim="unveil">
            <Plate project={project} index={index} priority sizes="100vw" className={styles.plateInner} />
          </div>
        )}
      </div>
    </Reveal>
  );
}
