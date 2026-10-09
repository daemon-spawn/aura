import { Reveal } from "@/components/motion/Reveal";
import styles from "./Principles.module.css";

/** Brand Foundation — design principles. */
const principles = [
  { title: "Minimal", body: "Only what is necessary. Restraint is the visible result of invisible decisions." },
  { title: "Intentional", body: "Every detail must serve perception — spacing, type, load speed, the state of a form after you press send." },
  { title: "Timeless", body: "Avoid trend dependency. The site should still feel right when this year's patterns have moved on." },
  { title: "Editorial", body: "Typography and spacing drive hierarchy, the way a good publication leads the eye." },
  { title: "Atmospheric", body: "Immersive without being loud. Motion supports the atmosphere; it never overpowers it." },
];

export function Principles() {
  return (
    <Reveal as="section" className={`section ${styles.wrap}`} aria-labelledby="principles-title">
      <div className="container grid">
        <div className={styles.head}>
          <p className="t-meta slash" data-anim="fade"><span>AURA</span>/ Principles</p>
          <h2 id="principles-title" className="t-h2" data-anim="lines">
            How I make <span className="serif">decisions.</span>
          </h2>
        </div>
        <ul className={styles.list}>
          {principles.map((p) => (
            <li key={p.title} className={styles.item} data-anim="fade" data-sound>
              <h3 className={styles.title}>{p.title}</h3>
              <p className="t-small">{p.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}
