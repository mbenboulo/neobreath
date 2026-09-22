import { useCurrentFrame } from "remotion";
import { color } from "../tokens";
import { CLOSED_LOOP } from "../beats";
import { CARD_SHADOW, beat, useBrandFont, useLayout, wash } from "../theme";
import { BeatTitle, Caption, Canvas, Wordmark } from "../primitives/Chrome";
import LoopRing, { type LoopNode } from "../primitives/LoopRing";
import TimelineRail, { type RailStage } from "../primitives/TimelineRail";
import { Chip } from "../primitives/Chip";

/**
 * C — "The Closed Loop"
 *
 * The research arc. Two things carry the honesty:
 *
 *  1. `Predict` and `Adapt` are drawn DASHED from the first frame and fade in
 *     rather than appearing from nothing. The viewer sees that the loop already
 *     turns without them, and that they are an addition to it — not that the
 *     product has them.
 *  2. The closing rail labels every stage with its tier word. The gradient is
 *     legible without decoding a colour.
 */

const NODES: LoopNode[] = [
  { label: "Sense", detail: "Respiratory signal, SpO2, heart rate", real: true },
  { label: "Interpret", detail: "Separate event from artifact", real: true },
  { label: "Predict", detail: "Estimate rising risk", real: false },
  { label: "Intervene", detail: "Vibrotactile stimulation", real: true },
  { label: "Observe", detail: "Did the infant respond?", real: true },
  { label: "Adapt", detail: "Update the baseline", real: false },
];

const RAIL: RailStage[] = [
  {
    when: "Today",
    tier: "Today",
    tone: "primary",
    text: "Wearable monitoring and intervention architecture, with AI focused on signal and artifact interpretation.",
  },
  {
    when: "Next",
    tier: "In development",
    tone: "watching",
    text: "Infant-specific models and better discrimination between real events and artifacts.",
  },
  {
    when: "Later",
    tier: "Research",
    tone: "watching",
    text: "Predictive apnea-risk estimation and early warning.",
  },
  {
    when: "Longer-term",
    tier: "Research",
    tone: "watching",
    text: "Predictive, personalized control of vibrotactile stimulation inside a closed loop.",
  },
];

const LEVELS = [
  {
    level: "Level 1",
    name: "Reactive",
    rule: "Event detected → tactile stimulation",
    tier: "Today",
    tone: "primary" as const,
    detail: "Closest to what the current prototype does.",
  },
  {
    level: "Level 2",
    name: "Preventive",
    rule: "Rising risk → preventive stimulation",
    tier: "Research",
    tone: "watching" as const,
    detail: "Depends on predictive AI that does not exist yet.",
  },
  {
    level: "Level 3",
    name: "Adaptive",
    rule: "Individual baseline + predicted risk",
    tier: "Research",
    tone: "watching" as const,
    detail: "The system learns one infant and adapts to them.",
  },
];

/** Band chart: this infant's own baseline, then a departure from it. */
function BaselineBand({
  l,
  width,
  height,
  deviation,
}: {
  l: ReturnType<typeof useLayout>;
  width: number;
  height: number;
  /** 0..1 — how far the trace has moved out of the learned band. */
  deviation: number;
}) {
  const mid = height / 2;
  const bandH = height * 0.3;
  const n = 120;
  const pts: string[] = [];
  for (let i = 0; i <= n; i++) {
    const u = i / n;
    const base = Math.sin(u * Math.PI * 6) * height * 0.09;
    const drift = Math.sin(u * Math.PI * 1.4) * height * 0.03;
    // Only the right third departs, and it departs downward — a falling trend.
    const out = Math.max(0, (u - 0.62) / 0.38) * -deviation * height * 0.3;
    pts.push(`${(u * width).toFixed(1)},${(mid + base + drift + out).toFixed(1)}`);
  }
  return (
    <svg width={width} height={height} style={{ display: "block" }}>
      {/* The band this infant normally lives in */}
      <rect
        x={0}
        y={mid - bandH / 2}
        width={width}
        height={bandH}
        rx={8}
        fill={wash(color.primary, 0.1)}
        stroke={wash(color.primary, 0.28)}
        strokeDasharray="6 6"
      />
      <text
        x={8}
        y={mid - bandH / 2 - 8}
        fontSize={12 * l.s}
        fontWeight={600}
        fill={color.muted}
        fontFamily='"Plus Jakarta Sans", system-ui, sans-serif'
      >
        Learned baseline for this infant
      </text>
      <polyline
        points={pts.join(" ")}
        fill="none"
        stroke={deviation > 0.15 ? color.watching : color.primary}
        strokeWidth={2.8}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ClosedLoop() {
  useBrandFont();
  const f = useCurrentFrame();
  const l = useLayout();
  const b = CLOSED_LOOP.beats;

  const loopLit = beat(f, b.loop.from + 10, b.loop.from + 170) * NODES.length;
  const predictIn = beat(f, b.predict.from, b.predict.from + 70);
  const deviation = beat(f, b.predict.from + 70, b.predict.from + 220);
  const levelsIn = beat(f, b.levels.from, b.levels.from + 60);
  const levelLit = beat(f, b.levels.from + 60, b.levels.from + 200) * 3;
  const railIn = beat(f, b.rail.from, b.rail.from + 50);
  const railLit = beat(f, b.rail.from + 40, b.rail.from + 190) * RAIL.length;
  const captionIn = beat(f, CLOSED_LOOP.captionFrom, CLOSED_LOOP.captionFrom + 25);

  // Phase cross-fades. The ring stays visible as a small badge once the levels
  // and rail take the stage, so the loop remains the through-line.
  const ringPhase = 1 - levelsIn;
  const levelsPhase = levelsIn * (1 - railIn);
  const railPhase = railIn;

  const title =
    f < b.predict.from
      ? "Sensing, interpretation, intervention — and back"
      : f < b.levels.from
        ? "The step that is still research"
        : f < b.rail.from
          ? "Three levels of response"
          : "Where the project actually stands";

  // LoopRing renders an SVG larger than the ring itself (pad = 0.4 * size) so
  // the outer labels are not clipped. Keep box = size * 1.8 inside the safe
  // area, and shrink it for the stacked cuts where the panel sits below.
  const ringSize = l.wide ? 440 : l.portrait ? 360 : 300;
  /** Side panel: fixed beside the ring, full width beneath it. */
  const panelW = l.wide ? 470 * l.s : l.width - 100 * l.s;

  return (
    <Canvas>
      <BeatTitle l={l}>{title}</BeatTitle>
      <Wordmark l={l} scale={0.78} style={{ position: "absolute", top: 48 * l.s, right: 64 * l.s }} />

      {/* ── Phase 1: the loop ─────────────────────────────────────────── */}
      {ringPhase > 0.01 ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: l.wide ? "row" : "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 40 * l.s,
            paddingTop: 90 * l.s,
            paddingBottom: 140 * l.s,
            opacity: ringPhase,
            boxSizing: "border-box",
          }}
        >
          <LoopRing
            size={ringSize * l.s}
            nodes={NODES}
            progress={loopLit}
            nodeOpacity={NODES.map((n) => (n.real ? 1 : predictIn))}
          />

          {/* The baseline panel only makes sense once Predict exists */}
          {predictIn > 0.02 ? (
            <div
              style={{
                width: panelW,
                background: color.surface,
                borderRadius: 22 * l.s,
                boxShadow: CARD_SHADOW,
                padding: `${20 * l.s}px ${22 * l.s}px`,
                opacity: predictIn,
                boxSizing: "border-box",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span
                  style={{
                    fontSize: 20 * l.s,
                    fontWeight: 800,
                    letterSpacing: "-0.02em",
                    color: color.onSurface,
                  }}
                >
                  A model of one infant
                </span>
                <Chip label="Research" tone="watching" size={11.5 * l.s} padX={10 * l.s} padY={5 * l.s} />
              </div>
              <div
                style={{
                  fontSize: 14 * l.s,
                  color: color.muted,
                  marginTop: 6 * l.s,
                  marginBottom: 14 * l.s,
                  lineHeight: 1.4,
                }}
              >
                Premature infants do not share one respiratory pattern. A personalized model would
                learn this infant&apos;s own baseline and watch for departures from it.
              </div>
              <BaselineBand
                l={l}
                width={panelW - 44 * l.s}
                height={120 * l.s}
                deviation={deviation}
              />
            </div>
          ) : null}
        </div>
      ) : null}

      {/* ── Phase 2: the three levels ─────────────────────────────────── */}
      {levelsPhase > 0.01 ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 26 * l.s,
            paddingTop: 100 * l.s,
            paddingBottom: 150 * l.s,
            opacity: levelsPhase,
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: l.wide ? "row" : "column",
              gap: 20 * l.s,
              alignItems: "stretch",
              justifyContent: "center",
            }}
          >
            {LEVELS.map((lv, i) => {
              const lit = Math.max(0, Math.min(1, levelLit - i));
              return (
                <div
                  key={lv.name}
                  style={{
                    width: l.wide ? 400 * l.s : 760 * l.s,
                    background: color.surface,
                    borderRadius: 22 * l.s,
                    boxShadow: CARD_SHADOW,
                    padding: `${22 * l.s}px ${24 * l.s}px`,
                    boxSizing: "border-box",
                    opacity: 0.32 + lit * 0.68,
                    outline:
                      lit > 0.5
                        ? `${2.5 * l.s}px solid ${color.primary}`
                        : `${1 * l.s}px solid ${color.hairline}`,
                    transform: `translateY(${(1 - lit) * 10 * l.s}px)`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span
                      style={{
                        fontSize: 13 * l.s,
                        fontWeight: 700,
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                        color: color.muted,
                      }}
                    >
                      {lv.level}
                    </span>
                    <Chip label={lv.tier} tone={lv.tone} size={11.5 * l.s} padX={10 * l.s} padY={5 * l.s} />
                  </div>
                  <div
                    style={{
                      fontSize: 30 * l.s,
                      fontWeight: 800,
                      letterSpacing: "-0.025em",
                      color: color.onSurface,
                      marginTop: 8 * l.s,
                    }}
                  >
                    {lv.name}
                  </div>
                  <div
                    style={{
                      fontSize: 15 * l.s,
                      fontWeight: 600,
                      color: color.primary,
                      marginTop: 8 * l.s,
                      lineHeight: 1.35,
                    }}
                  >
                    {lv.rule}
                  </div>
                  <div
                    style={{
                      fontSize: 14.5 * l.s,
                      color: color.muted,
                      marginTop: 10 * l.s,
                      lineHeight: 1.4,
                    }}
                  >
                    {lv.detail}
                  </div>
                </div>
              );
            })}
          </div>

          <div
            style={{
              fontSize: 15 * l.s,
              color: color.muted,
              maxWidth: 900 * l.s,
              textAlign: "center",
              lineHeight: 1.45,
            }}
          >
            Each level depends on the one before it. Levels 2 and 3 are research directions, not
            features of the current system.
          </div>
        </div>
      ) : null}

      {/* ── Phase 3: the rail ─────────────────────────────────────────── */}
      {railPhase > 0.01 ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingTop: 90 * l.s,
            paddingBottom: 130 * l.s,
            opacity: railPhase,
            boxSizing: "border-box",
          }}
        >
          <TimelineRail l={l} stages={RAIL} progress={railLit} />
        </div>
      ) : null}

      {captionIn > 0 ? (
        <Caption l={l} opacity={captionIn}>
          Predictive risk estimation, personalized models and adaptive stimulation are proposed
          research directions. They are not built yet, not clinically validated yet, and not
          available.
        </Caption>
      ) : null}
    </Canvas>
  );
}
