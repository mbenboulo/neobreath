import type { ReactNode } from "react";

/**
 * Section — the page rhythm.
 *
 * Every act of the story is a Section. Keeps the vertical rhythm, the measure,
 * and the eyebrow/heading structure consistent so no page invents its own
 * spacing.
 */

export type SectionTone = "canvas" | "warm" | "ink";

const TONE: Record<SectionTone, string> = {
  canvas: "bg-nb-canvas text-nb-ink",
  warm: "bg-nb-surface-warm text-nb-ink",
  /** Dark editorial break. Use sparingly — once or twice per page. */
  ink: "bg-nb-ink-deep text-nb-on-ink",
};

/**
 * Three container widths.
 *
 * `max` exists for the hero specifically. The hero has to fit a headline, a
 * lede, two CTAs *and* an animation side by side, and at the 1200px cap the
 * animation ended up 553px wide — the smallest on the whole site, and visibly
 * cramped for a 16:9 frame whose content is a monitor plus a figure. Widening
 * the container adds room for the animation without narrowing the text column,
 * which is what simply rebalancing the grid would have done.
 *
 * This is a deliberate deviation from DESIGN.md's 1200px desktop cap. It applies
 * to the hero only; every other section still uses `wide` or `measure`.
 */
export type SectionWidth = "measure" | "wide" | "max";

const WIDTH: Record<SectionWidth, string> = {
  measure: "max-w-[960px]",
  wide: "max-w-[1200px]",
  max: "max-w-[1320px]",
};

interface SectionProps {
  id?: string;
  tone?: SectionTone;
  /** Container width. Defaults to the readable measure. */
  width?: SectionWidth;
  /** Remove the default vertical padding when a child controls its own. */
  flush?: boolean;
  className?: string;
  children: ReactNode;
}

export default function Section({
  id,
  tone = "canvas",
  width = "measure",
  flush = false,
  className = "",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`w-full ${TONE[tone]} ${
        flush ? "" : "py-16 md:py-24"
      } ${className}`}
    >
      <div className={`mx-auto w-full px-4 md:px-8 ${WIDTH[width]}`}>{children}</div>
    </section>
  );
}
