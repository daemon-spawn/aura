import { site } from "@/content/site";
import { getProject, type Project } from "@/content/projects";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Wordmark } from "@/components/brand/Wordmark";
import { FitTitle } from "@/components/ui/FitTitle";
import { HeroWins } from "./HeroWins";
import styles from "./Hero.module.css";

/**
 * MONOLOG's current hero, in AURA's palette:
 *  left  — a pinned panel with the AURA letterforms as a faint pattern,
 *          a short intro + call, and the positioning label at the base
 *  right — a very large headline, then the hero image with dated client wins
 */
export function Hero() {
  const wins = site.heroWins
    .map((slug) => getProject(slug))
    .filter((p): p is Project => Boolean(p?.win))
    .slice(0, 2);

  return (
    <Reveal as="section" className={styles.hero} id="top" aria-labelledby="hero-title">
      <div className={styles.panel}>
        <div className={styles.pin}>
          <div className={styles.pattern} aria-hidden="true">
            <Wordmark title="" strokeWidth={9} className={styles.patternMark} />
          </div>
          <p className={styles.label} data-anim="fade" data-anim-immediate data-anim-delay="0.5">
            ({site.statement})
          </p>
        </div>
      </div>

      <div className={styles.titleCell}>
        <FitTitle
          id="hero-title"
          className={styles.title}
          lines={["Websites and", "systems that", "match what", "you’ve built"]}
        />
      </div>

      <div className={styles.intro}>
        <p className={styles.lead} data-anim="fade" data-anim-immediate data-anim-delay="0.35">
          You&rsquo;ve outgrown your brand and website. We help you build a presence that reflects your
          reputation and expertise, so the right clients see your value and take you seriously.
        </p>
        <div data-anim="fade" data-anim-immediate data-anim-delay="0.45">
          <Button href={site.primaryCta.href} track="book_call_click">
            {site.primaryCta.label}
          </Button>
        </div>
      </div>

      <HeroWins wins={wins} />
    </Reveal>
  );
}
