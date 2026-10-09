import Image from "next/image";
import type { Project } from "@/content/projects";
import styles from "./Plate.module.css";

type Props = {
  project: Project;
  index: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
};

/**
 * Project visual. The client's real screens when `cover` is set; otherwise a
 * material plate (tone + skewed frame from the original build) carrying only
 * metadata — the project name always lives in the caption, never twice.
 */
export function Plate({ project, index, priority, sizes = "(min-width: 900px) 60vw, 100vw", className }: Props) {
  const n = String(index + 1).padStart(2, "0");

  // Real screens first: a supplied cover, else the recording's poster frame.
  const shot = project.cover ?? (project.video && { src: project.video.poster, alt: `${project.name} website` });
  if (shot) {
    return (
      <div className={`${styles.plate} ${className ?? ""}`}>
        <Image src={shot.src} alt={shot.alt} fill sizes={sizes} priority={priority} className={styles.img} />
        <span className={styles.badge}>{n}</span>
      </div>
    );
  }

  return (
    <div className={`${styles.plate} ${className ?? ""}`} data-tone={index % 4} aria-hidden="true">
      <div className={styles.material} />
      <span className={styles.badge}>{n}</span>
      <span className={styles.corner}>{project.sector}</span>
      {project.palette && (
        <span className={styles.swatches}>
          {project.palette.map((c) => (
            <span key={c} style={{ background: c }} />
          ))}
        </span>
      )}
    </div>
  );
}
