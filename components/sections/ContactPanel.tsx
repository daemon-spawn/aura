import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { ContactForm } from "./ContactForm";
import styles from "./ContactPanel.module.css";

const next = [
  "I read your note and reply personally to set a time.",
  "We talk on a short call about the business and the problem — no pitch.",
  "If it's a fit, you get a written scope and quote. If it isn't, I'll tell you.",
];

export function ContactPanel() {
  return (
    <Reveal as="section" className="section" aria-label="Request a discovery call">
      <div className="container grid">
        <aside className={styles.aside}>
          <div data-anim="fade">
            <h2 className="t-meta">What happens next</h2>
            <ol className={styles.steps}>
              {next.map((s, i) => (
                <li key={i}>
                  <span className="t-meta ink">{String(i + 1).padStart(2, "0")}</span>
                  <p className="t-small">{s}</p>
                </li>
              ))}
            </ol>
          </div>
          <div data-anim="fade" data-anim-delay="0.1" className={styles.direct}>
            <h2 className="t-meta">Prefer email?</h2>
            <a href={`mailto:${site.email}`} className={styles.mail}>{site.email}</a>
            <p className="t-small steel">{site.location}</p>
          </div>
        </aside>
        <div className={styles.form} data-anim="fade" data-anim-delay="0.05">
          <ContactForm />
        </div>
      </div>
    </Reveal>
  );
}
