import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./StudioAbout.module.css";

export function StudioAbout() {
  return (
    <Reveal as="section" className="section" aria-labelledby="about-title">
      <div className="container grid">
        <div className={styles.side}>
          <h2 id="about-title" className="t-meta slash" data-anim="fade">
            <span>AURA</span>/ About
          </h2>
          <dl className={styles.facts} data-anim="fade">
            <div><dt className="t-meta">Founder</dt><dd>{site.founder}</dd></div>
            <div><dt className="t-meta">Based in</dt><dd>{site.location}</dd></div>
            <div><dt className="t-meta">Model</dt><dd>One person, design and engineering</dd></div>
            <div><dt className="t-meta">Name</dt><dd>From <span className="serif">presence</span></dd></div>
          </dl>
        </div>
        <div className={styles.copy}>
          <p className={styles.big} data-anim="lines">
            I&rsquo;m {site.founder} &mdash; a software engineer and tech lead in Johannesburg. AURA is my studio,
            and it&rsquo;s just me.
          </p>
          <div className={styles.paras}>
            <p className="t-body" data-anim="fade">
              Most studios split the work. A designer makes it look right, a developer makes it work, and someone
              else is meant to look after it afterwards. Things get lost in every one of those handovers.
            </p>
            <p className="t-body" data-anim="fade" data-anim-delay="0.08">
              I do all three. I design the site, engineer the system behind it, and stay on to run it &mdash;
              so the person you explained your business to is the person who builds it.
            </p>
            <p className="t-body" data-anim="fade" data-anim-delay="0.16">
              The name comes from presence: the impression a business leaves before anyone has spoken to it.
              My mission is to help ambitious companies build a digital presence that finally matches the
              quality of what they&rsquo;ve built.
            </p>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
