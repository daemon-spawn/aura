import { gap } from "@/content/gap";
import { Reveal } from "@/components/motion/Reveal";
import { GapSlideshow } from "./GapSlideshow";
import styles from "./GapReveal.module.css";

/**
 * A panel that rises over the statement. Inside a sticky stage the frame of
 * "connecting the dots" images grows from small to full size, while "We
 * connect" and "the dots." travel in from either edge and meet on top of it
 * as one sentence (animations/closeGap.ts). The paragraph under the frame
 * stays put. Reverses on scroll up.
 */
export function GapReveal() {
  return (
    <Reveal as="section" className={styles.panel} aria-labelledby="gap-title">
      <div className={styles.track} data-anim="gap">
        <div className={styles.stage}>
          <div className={styles.scene}>
            <div className={styles.frame} data-gap-frame>
              <GapSlideshow images={gap.images} />
            </div>
            <h2 id="gap-title" className={styles.sentence}>
              <span className={styles.left} data-gap-from="left">
                {gap.left}
              </span>{" "}
              <span className={styles.right} data-gap-from="right">
                {gap.right}
              </span>
            </h2>
          </div>
          <p className={styles.caption} data-gap-caption>
            {gap.body}
          </p>
        </div>
      </div>
    </Reveal>
  );
}
