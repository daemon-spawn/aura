import Image from "next/image";
import type { Project } from "@/content/projects";
import { Reveal } from "@/components/motion/Reveal";
import { PhoneScroll } from "@/components/ui/PhoneScroll";
import { LaptopPlayer } from "@/components/ui/LaptopPlayer";
import styles from "./CaseNarrative.module.css";

function Block({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className={`grid ${styles.block}`}>
      <h2 className={`t-meta ${styles.label}`} data-anim="fade">{label}</h2>
      <div className={styles.content}>{children}</div>
    </div>
  );
}

/** Situation → what I built → key decisions → where it stands. */
export function CaseNarrative({ project }: { project: Project }) {
  return (
    <Reveal as="section" className="section" aria-label="Case study">
      <div className="container">
        <Block label="The situation">
          {project.situation.map((para, i) => (
            <p key={i} className={`t-lead ${styles.para}`} data-anim="fade" data-anim-delay={String(i * 0.08)}>
              {para}
            </p>
          ))}
        </Block>

        <Block label="What I built">
          <ol className={styles.items}>
            {project.built.map((b, i) => (
              <li key={b.title} className={styles.itemRow} data-anim="fade" data-anim-delay={String((i % 2) * 0.08)}>
                <span className="t-meta ink">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="t-h3">{b.title}</h3>
                <p className="t-small">{b.body}</p>
              </li>
            ))}
          </ol>
        </Block>

        {(project.video || project.screen) && (
          <Block label="The live site">
            <figure
              className={`${styles.device} ${project.video && project.screen ? styles.devicePair : ""}`}
              data-anim="fade"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={project.video?.poster ?? project.screen?.backdrop ?? project.screen?.src}
                alt=""
                className={styles.deviceBackdrop}
                loading="lazy"
              />
              {project.video && (
                <LaptopPlayer video={project.video} alt={`${project.name} website on a laptop`} className={styles.deviceLaptop} />
              )}
              {project.screen && (
                <PhoneScroll screen={project.screen} duration={11000} loop className={styles.devicePhone} />
              )}
              <figcaption className={`t-meta ${styles.deviceCap}`}>
                {project.url ? (
                  <a href={`https://${project.url}`} target="_blank" rel="noopener noreferrer">
                    {project.url}
                  </a>
                ) : (
                  project.name
                )}
                {project.video && project.screen ? " · desktop and mobile" : project.video ? " · desktop" : " · on a phone"}
              </figcaption>
            </figure>
          </Block>
        )}

        {project.decisions && (
          <Block label="Key decisions">
            <ul className={styles.decisions}>
              {project.decisions.map((d) => (
                <li key={d.title} data-anim="fade">
                  <h3 className="t-h3">{d.title}</h3>
                  <p className="t-body">{d.body}</p>
                </li>
              ))}
            </ul>
          </Block>
        )}

        {project.gallery && project.gallery.length > 0 && (
          <div className={styles.gallery}>
            {project.gallery.map((g) => (
              <div key={g.src} className={styles.shot} data-anim="fade">
                <Image src={g.src} alt={g.alt} fill sizes="(min-width: 900px) 66vw, 100vw" />
              </div>
            ))}
          </div>
        )}

        <Block label="Where it stands">
          <p className={`t-lead ${styles.para} ink`} data-anim="fade">{project.now}</p>
          <ul className={styles.stack} data-anim="fade" aria-label="Stack">
            {project.stack.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Block>
      </div>
    </Reveal>
  );
}
