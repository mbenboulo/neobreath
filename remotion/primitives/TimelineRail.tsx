import { color } from "../tokens";
import { CARD_SHADOW, type Layout } from "../theme";
import { Chip, type ChipTone } from "./Chip";

/**
 * TimelineRail — Today / Next / Later / Longer-term research.
 *
 * The same honesty gradient the website uses, on one horizontal rail. The
 * further right a stage sits, the more loudly it must be labelled as not-yet —
 * so the rail's chips carry the tier word explicitly rather than relying on a
 * colour the viewer has to decode.
 */

export interface RailStage {
  when: string;
  tier: string;
  tone: ChipTone;
  text: string;
}

export default function TimelineRail({
  l,
  stages,
  /** 0..stages.length — how many stages have lit. */
  progress = 0,
  tone = "canvas",
}: {
  l: Layout;
  stages: RailStage[];
  progress?: number;
  tone?: "canvas" | "ink";
}) {
  const onInk = tone === "ink";
  const railWidth = Math.min(l.width - 130 * l.s, 1560 * l.s);
  /**
   * Four cards across a 1080px-wide frame leaves ~190px of text per card, which
   * wraps into an unreadable column. Stacked cuts wrap to a 2x2 grid instead.
   */
  const columns = l.wide ? stages.length : 2;
  const gap = 22 * l.s;
  const cardW = (railWidth - gap * (columns - 1)) / columns;
  const litWidth = railWidth * Math.min(1, progress / stages.length);

  return (
    <div style={{ width: railWidth, position: "relative" }}>
      {/* The rail */}
      <div
        style={{
          height: 4 * l.s,
          width: railWidth,
          background: onInk ? "rgba(255,255,255,0.14)" : color.hairline,
          borderRadius: 9999,
        }}
      />
      <div
        style={{
          height: 4 * l.s,
          width: litWidth,
          background: color.primary,
          borderRadius: 9999,
          marginTop: -4 * l.s,
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap,
          paddingTop: 26 * l.s,
        }}
      >
        {stages.map((s, i) => {
          const active = Math.max(0, Math.min(1, progress - i));
          return (
            <div
              key={s.when}
              style={{
                width: cardW,
                background: onInk ? "rgba(255,255,255,0.07)" : color.surface,
                borderRadius: 18 * l.s,
                padding: `${18 * l.s}px ${18 * l.s}px ${20 * l.s}px`,
                boxShadow: CARD_SHADOW,
                boxSizing: "border-box",
                opacity: 0.34 + active * 0.66,
                transform: `translateY(${(1 - active) * 8 * l.s}px)`,
                outline:
                  active > 0.5
                    ? `${2 * l.s}px solid ${color.primary}`
                    : `${1 * l.s}px solid ${color.hairline}`,
              }}
            >
              <div
                style={{
                  fontSize: 22 * l.s,
                  fontWeight: 800,
                  letterSpacing: "-0.02em",
                  color: onInk ? color.onInk : color.onSurface,
                }}
              >
                {s.when}
              </div>
              <div style={{ marginTop: 10 * l.s }}>
                <Chip label={s.tier} tone={s.tone} size={12 * l.s} padX={11 * l.s} padY={6 * l.s} />
              </div>
              <div
                style={{
                  fontSize: 14.5 * l.s,
                  lineHeight: 1.4,
                  marginTop: 12 * l.s,
                  color: onInk ? "rgba(242,247,245,0.75)" : color.muted,
                }}
              >
                {s.text}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
