import { useCurrentFrame } from "remotion";
import { color } from "../tokens";
import { FALSE_ALARM } from "../beats";
import { CARD_SHADOW, beat, easeOut, mix, useBrandFont, useLayout } from "../theme";
import { BeatTitle, Caption, Canvas, StageCard, Wordmark } from "../primitives/Chrome";
import BreathWaveform, { WaveformPanel } from "../primitives/BreathWaveform";
import { Chip } from "../primitives/Chip";

/**
 * B — "Why False Alarms Happen"
 *
 * The AI story, and the most defensible claim in the project.
 *
 * The argument is made structurally rather than assertionally: two traces are
 * shown that a threshold rule genuinely cannot separate, the rule fires on both,
 * and only then are the other channels revealed as the thing that distinguishes
 * them. The viewer reaches the conclusion before the narration states it.
 *
 * The final caption is the point of the whole animation. It says what the work
 * is and, in the same breath, what it is not.
 */

type Channel = { resp: number; spo2: number; hr: number; motion: number };

/** Sampled secondary channels for each signal, indexed by beat progress 0..1. */
function channels(which: "real" | "artifact", t: number): Channel {
  if (which === "real") {
    return {
      resp: mix(44, 3, t),
      spo2: mix(96, 89, Math.max(0, (t - 0.15) / 0.85)),
      hr: mix(148, 104, Math.max(0, (t - 0.15) / 0.85)),
      motion: 0.06,
    };
  }
  return {
    resp: mix(44, 3, t),
    spo2: mix(96, 96, t),
    hr: mix(148, 146, t),
    motion: 0.92,
  };
}

function TraceCard({
  l,
  title,
  subtitle,
  flat,
  artifact,
  stroke,
  width,
  traceHeight,
  verdict,
  channel,
  highlight,
}: {
  l: Layoutish;
  title: string;
  subtitle: string;
  flat: number;
  artifact: boolean;
  stroke: string;
  width: number;
  /** Trace panel height, supplied by the call site so cuts can differ. */
  traceHeight: number;
  verdict?: { label: string; tone: "critical" | "watching" | "primary"; note: string };
  channel?: Channel;
  highlight?: number;
}) {
  const panelW = width - 44 * l.s;
  return (
    <div
      style={{
        width,
        background: color.surface,
        borderRadius: 22 * l.s,
        boxShadow: CARD_SHADOW,
        padding: `${20 * l.s}px ${22 * l.s}px ${18 * l.s}px`,
        boxSizing: "border-box",
        outline:
          highlight && highlight > 0.05
            ? `${2 * l.s}px solid ${
                verdict?.tone === "primary" ? color.primary : color.hairline
              }`
            : `${1 * l.s}px solid ${color.hairline}`,
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between" }}>
        <span style={{ fontSize: 22 * l.s, fontWeight: 800, color: color.onSurface, letterSpacing: "-0.02em" }}>
          {title}
        </span>
        <span style={{ fontSize: 14 * l.s, color: color.muted, fontWeight: 500 }}>{subtitle}</span>
      </div>

      <div style={{ marginTop: 14 * l.s }}>
        <WaveformPanel width={panelW} height={traceHeight} radius={14 * l.s}>
          <BreathWaveform
            width={panelW - 20 * l.s}
            height={traceHeight - 20 * l.s}
            stroke={stroke}
            strokeWidth={3.2}
            options={{
              cycles: 3.6,
              amplitude: 0.3,
              samples: 240,
              drift: 0.03,
              // BOTH signals flatten — that is what makes the pair unseparable by
              // a threshold rule. Signal B additionally carries post-envelope
              // motion noise: the sensor collapsed AND is registering movement.
              // That noise is the only visible difference, and it is easy to miss
              // at a glance, which is exactly the point.
              pause: flat > 0.02 ? { from: 1 - flat * 0.5, to: 1 } : undefined,
              noise:
                artifact && flat > 0.02
                  ? { from: 1 - flat * 0.5, to: 1, amount: 0.5 }
                  : undefined,
            }}
          />
        </WaveformPanel>
      </div>

      {/* Secondary channels — revealed after the threshold has already failed */}
      {channel ? (
        <div
          style={{
            display: "flex",
            gap: 10 * l.s,
            marginTop: 14 * l.s,
            opacity: highlight ?? 1,
          }}
        >
          {[
            { k: "SpO2", v: `${Math.round(channel.spo2)}%`, bad: channel.spo2 < 93 },
            { k: "Heart rate", v: `${Math.round(channel.hr)} bpm`, bad: channel.hr < 120 },
            { k: "Motion", v: channel.motion > 0.5 ? "High" : "None", bad: channel.motion > 0.5 },
          ].map((c) => (
            <div
              key={c.k}
              style={{
                flex: 1,
                background: color.surfaceWarm,
                borderRadius: 12 * l.s,
                padding: `${10 * l.s}px ${12 * l.s}px`,
                border: `${1 * l.s}px solid ${color.hairline}`,
              }}
            >
              <div style={{ fontSize: 11.5 * l.s, color: color.muted, fontWeight: 600 }}>{c.k}</div>
              <div
                style={{
                  fontSize: 19 * l.s,
                  fontWeight: 800,
                  fontVariantNumeric: "tabular-nums",
                  color: c.bad ? color.criticalInk : color.onSurface,
                  marginTop: 2 * l.s,
                }}
              >
                {c.v}
              </div>
            </div>
          ))}
        </div>
      ) : null}

      {verdict ? (
        <div style={{ marginTop: 14 * l.s, display: "flex", alignItems: "center", gap: 10 * l.s }}>
          <Chip label={verdict.label} tone={verdict.tone} size={13 * l.s} padX={12 * l.s} padY={7 * l.s} />
          <span style={{ fontSize: 13.5 * l.s, color: color.muted }}>{verdict.note}</span>
        </div>
      ) : null}
    </div>
  );
}

// Local alias keeps the prop list readable without importing the full type.
type Layoutish = ReturnType<typeof useLayout>;

export default function FalseAlarm() {
  useBrandFont();
  const f = useCurrentFrame();
  const l = useLayout();
  const b = FALSE_ALARM.beats;

  const dip = beat(f, b.bothDip.from, b.bothDip.from + 110);
  const reveal = beat(f, b.reveal.from, b.reveal.from + 60);
  const classify = beat(f, b.classifier.from, b.classifier.from + 70);
  const captionIn = beat(f, FALSE_ALARM.captionFrom, FALSE_ALARM.captionFrom + 25);

  // The naive threshold fires on BOTH signals. This is the entire problem.
  const alarmsFired = dip > 0.55;
  const showVerdicts = classify > 0.05;

  const realCh = channels("real", dip);
  const artCh = channels("artifact", dip);
  /**
   * The two signals stay SIDE BY SIDE in every cut.
   *
   * They are a comparison — stacking them vertically is both worse to read and
   * taller than the square and portrait frames can afford once the classifier
   * strip is added below.
   */
  const padX = (l.wide ? 64 : 44) * l.s;
  const gapX = (l.wide ? 36 : 20) * l.s;
  const cardW = (l.width - padX * 2 - gapX) / 2;
  /** Stacked cuts have less height, so the traces are shorter. */
  const traceH = (l.wide ? 216 : 150) * l.s;

  const title =
    f < b.bothDip.from
      ? "Two signals. One of them is real."
      : f < b.reveal.from
        ? "A threshold rule fires on both"
        : f < b.classifier.from
          ? "What actually happened"
          : f < b.honesty.from
            ? "Reason over the channels together"
            : "One alarm. The right one.";

  return (
    <Canvas>
      <BeatTitle l={l}>{title}</BeatTitle>
      <Wordmark l={l} scale={0.78} style={{ position: "absolute", top: 48 * l.s, right: 64 * l.s }} />

      {/* Alarm counter — the cost of not solving this */}
      <div style={{ position: "absolute", top: 46 * l.s, left: "50%", transform: "translateX(-50%)" }}>
        {alarmsFired ? (
          <Chip
            label={showVerdicts && classify > 0.7 ? "2 alarms · 1 false" : "2 alarms raised"}
            tone="critical"
            size={13.5 * l.s}
            padX={15 * l.s}
            padY={8 * l.s}
            style={{ opacity: easeOut(Math.min(1, (dip - 0.5) / 0.5)) }}
          />
        ) : null}
      </div>

      <div
        style={{
          position: "absolute",
          inset: 0,
          paddingTop: 132 * l.s,
          paddingLeft: padX,
          paddingRight: padX,
          paddingBottom: (l.wide ? 168 : 92) * l.s,
          display: "flex",
          flexDirection: "column",
          gap: 26 * l.s,
          alignItems: "center",
          justifyContent: "center",
          boxSizing: "border-box",
        }}
      >
        {/* Cards: always side by side — it is a comparison. */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: gapX,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
        <TraceCard
          l={l}
          width={cardW}
          traceHeight={traceH}
          title="Signal A"
          subtitle="Respiratory channel"
          flat={dip}
          artifact={false}
          stroke={dip > 0.4 ? color.critical : color.primary}
          channel={reveal > 0.05 ? realCh : undefined}
          highlight={reveal}
          verdict={
            showVerdicts
              ? {
                  label: "True event",
                  tone: "critical",
                  note: "Chest genuinely still · SpO2 falling · no motion",
                }
              : undefined
          }
        />
        <TraceCard
          l={l}
          width={cardW}
          traceHeight={traceH}
          title="Signal B"
          subtitle="Respiratory channel"
          flat={dip}
          artifact
          stroke={dip > 0.4 ? color.watching : color.primary}
          channel={reveal > 0.05 ? artCh : undefined}
          highlight={reveal}
          verdict={
            showVerdicts
              ? {
                  label: "Artifact",
                  tone: "primary",
                  note: "SpO2 steady · heart rate steady · motion high",
                }
              : undefined
          }
        />
        </div>

      {/* Classifier strip — in FLOW below the cards, not absolutely positioned.
          An absolute strip collided with Signal B as soon as the cards stacked. */}
      {f >= b.classifier.from ? (
        <div
          style={{
            display: "flex",
            flexDirection: l.wide ? "row" : "column",
            alignItems: "center",
            gap: 14 * l.s,
            opacity: beat(f, b.classifier.from, b.classifier.from + 40),
          }}
        >
          <StageCard
            l={l}
            label="Features"
            detail="Waveform shape · SpO2 · heart rate · motion"
            active={1}
            width={l.wide ? 340 : 460}
          />
          <span style={{ fontSize: 26 * l.s, color: color.primary, fontWeight: 700 }}>
            {l.wide ? "→" : "↓"}
          </span>
          <StageCard
            l={l}
            label="Small classifier"
            detail="Runs on the belt"
            active={classify}
            width={l.wide ? 250 : 460}
          />
        </div>
      ) : null}
      </div>

      {captionIn > 0 ? (
        <Caption l={l} opacity={captionIn}>
          This is signal interpretation and false-alarm reduction — informed by published research on
          machine-learning-based central apnea detection in premature infants (Varisco et al.).
          NeoBreath has not yet demonstrated equivalent clinical performance.
        </Caption>
      ) : null}
    </Canvas>
  );
}
