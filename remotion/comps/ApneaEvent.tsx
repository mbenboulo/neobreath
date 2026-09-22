import { useCurrentFrame } from "remotion";
import { color } from "../tokens";
import { APNEA_EVENT, READINGS } from "../beats";
import { CARD_SHADOW, beat, mix, px, useBrandFont, useLayout } from "../theme";
import { BeatTitle, Caption, Canvas, Wordmark } from "../primitives/Chrome";
import BreathWaveform, { WaveformPanel } from "../primitives/BreathWaveform";
import BeltDiagram from "../primitives/BeltDiagram";
import VitalCard, { type VitalSpec } from "../primitives/VitalCard";
import { AlertScreen, DashboardScreen, PhoneFrame } from "../primitives/PhoneFrame";
import { Chip } from "../primitives/Chip";

/**
 * A — "Anatomy of an Apnea Event"
 *
 * The mechanism story: how the wearable senses, decides, and responds to a real
 * apneic pause. Three things are kept in agreement frame by frame — the trace,
 * the numbers, and the status chips — because a monitor whose number falls while
 * its chip stays green teaches the viewer something false.
 */

/** Frame at which the caregiver's alert resolves back to a normal dashboard. */
const CAREGIVER_RESOLVED_FRAME = APNEA_EVENT.resolvedFrom;

export default function ApneaEvent() {
  useBrandFont();
  const f = useCurrentFrame();
  const l = useLayout();
  const b = APNEA_EVENT.beats;

  // ── Event state ──────────────────────────────────────────────────────────
  const intoEvent = beat(f, b.pause.from, b.pause.from + 120);
  /**
   * Recovery is deliberately late (see APNEA_EVENT.recoveryFrom). The monitor
   * must still show the event while the caregiver's alert is on screen, or the
   * two contradict each other.
   */
  const recovery = beat(f, APNEA_EVENT.recoveryFrom, APNEA_EVENT.recoveryTo);
  /**
   * The respiratory rate falls FASTER than the trace flattens, so the number
   * reaches its floor before any chip claims the infant has stopped breathing.
   * Deriving every state from the number is what keeps the card self-consistent
   * — a "PAUSED" chip beside 23 br/min is a monitor that contradicts itself.
   */
  const drop = Math.min(1, intoEvent * 1.7);
  const respRate = mix(mix(READINGS.respiratoryRate, 0, drop), READINGS.respiratoryRate, recovery);
  const paused = respRate <= 8 && recovery < 0.5;
  const slowing = !paused && drop > 0.12 && recovery < 0.5;

  const spo2 = Math.round(
    mix(mix(READINGS.spo2, READINGS.spo2Desat, drop), READINGS.spo2, recovery)
  );
  const heartRate = Math.round(mix(mix(READINGS.heartRate, 104, drop), READINGS.heartRate, recovery));
  /** Climbs to the peak and HOLDS. A real alert reports the event, not a decay. */
  const pauseSeconds = mix(0, READINGS.pauseSeconds, drop);
  const alertActive = drop > 0.1 && f < APNEA_EVENT.resolvedFrom;
  /** 0..1 — how much of the trace is flat. Grows, then unwinds on recovery. */
  const flat = drop * (1 - recovery);

  // ── Beat emphasis ────────────────────────────────────────────────────────
  const beltIn = beat(f, b.belt.from, b.belt.from + 45);
  const footIn = beat(f, b.foot.from, b.foot.from + 45);
  const mcuIn = beat(f, b.onboard.from, b.onboard.from + 40);
  /** Vibrotactile stimulation: pulses, then settles. */
  const ripple = Math.min(
    beat(f, b.response.from, b.response.from + 60),
    1 - beat(f, APNEA_EVENT.recoveryFrom - 40, APNEA_EVENT.recoveryFrom)
  );
  /**
   * The phone arrives on the caregiver beat, WHILE the event is still on the
   * monitor. Sequence matters: the wearable acts first, then the caregiver is
   * told, and only then do the numbers recover. An alert that arrives after the
   * monitor has already normalised would contradict itself on screen.
   */
  const phoneIn = beat(f, APNEA_EVENT.phoneFrom, APNEA_EVENT.phoneTo);
  const captionIn = beat(f, APNEA_EVENT.captionFrom, APNEA_EVENT.captionFrom + 25);

  // Breathing oscillation, collapsing to stillness during the pause.
  const breathe = (1 - flat) * (0.5 + 0.5 * Math.sin((f / 30) * 1.5));
  const heartbeat = 0.5 + 0.5 * Math.sin((f / 30) * 6);

  const title =
    f < b.belt.from
      ? "A premature infant, breathing"
      : f < b.foot.from
        ? "The belt senses respiration"
        : f < b.onboard.from
          ? "A second channel: SpO2 and heart rate"
          : f < b.pause.from
            ? "Interpreted on the belt, not in the cloud"
            : f < b.response.from
              ? "The pause"
              : f < b.caregiver.from
                ? "The response"
                : "The caregiver is told";

  const vitals: VitalSpec[] = [
    {
      label: "Respiratory Rate",
      value: String(Math.round(respRate)),
      unit: "br/min",
      chip: paused ? "Paused" : slowing ? "Slowing" : "Normal",
      chipTone: paused ? "critical" : slowing ? "watching" : "primary",
      target: READINGS.respiratoryTarget,
      footnote: paused ? "Apnea event" : slowing ? "Dipping" : "Stable last 3 hrs",
      spark: paused ? "flat" : "breath",
      sparkColor: paused ? color.critical : slowing ? color.watching : color.primary,
    },
    {
      label: "Oxygen Saturation",
      value: String(spo2),
      unit: "%",
      chip: spo2 < 92 ? "Desaturating" : spo2 < 95 ? "Watching" : "Optimal",
      chipTone: spo2 < 92 ? "critical" : spo2 < 95 ? "watching" : "primary",
      target: READINGS.spo2Target,
      footnote: spo2 < 95 ? "Trending down" : "Stable last 3 hrs",
      spark: "breath",
      sparkColor: spo2 < 95 ? color.critical : color.primary,
    },
    {
      label: "Heart Rate",
      value: String(heartRate),
      unit: "bpm",
      chip: heartRate < 125 ? "Falling" : "Steady",
      chipTone: heartRate < 125 ? "watching" : "primary",
      target: READINGS.heartRateTarget,
      footnote: heartRate < 125 ? "Below baseline" : "Steady rhythm",
      spark: "ecg",
      sparkColor: heartRate < 125 ? color.watching : color.primary,
    },
  ];

  const monitorW = l.wide ? 1000 : l.width - 120 * l.s;
  const cardGap = 14;
  /**
   * The vitals stay a 3-up row in EVERY cut. Stacking them saves nothing
   * horizontally and costs ~200px of height, which the square and portrait cuts
   * do not have to spare once the figure is added below.
   */
  const cardW = (monitorW - cardGap * 2) / 3;

  /**
   * Stacked cuts fit the monitor and the figure into far less vertical space
   * than 16:9, so the trace panel and the figure both shrink. Portrait has more
   * headroom than square, so it gets the larger figure.
   */
  const wavePanelH = (l.wide ? 238 : 176) * l.s;
  const waveH = (l.wide ? 212 : 152) * l.s;
  const figureW = l.wide ? 520 : l.portrait ? 430 : 380;
  const figureH = l.wide ? 700 : l.portrait ? 580 : 460;
  /**
   * The phone must fit INSIDE the figure box. A fixed 0.82 made it 660px tall
   * against a 534px box in portrait, so it rode up and covered the vitals.
   * SCREEN_H (900) plus the bezel padding is the intrinsic height to divide by.
   */
  const phoneScale = Math.min(
    l.wide ? 0.82 : 0.72,
    (figureH * l.s) / (900 + 24)
  );

  return (
    <Canvas>
      <BeatTitle l={l}>{title}</BeatTitle>
      <Wordmark l={l} scale={0.78} style={{ position: "absolute", top: 48 * l.s, right: 64 * l.s }} />

      <div
        style={{
          position: "absolute",
          inset: 0,
          paddingTop: (l.wide ? 112 : 88) * l.s,
          paddingLeft: (l.wide ? 58 : 44) * l.s,
          paddingRight: (l.wide ? 58 : 44) * l.s,
          paddingBottom: (l.wide ? 132 : 108) * l.s,
          display: "flex",
          flexDirection: l.wide ? "row" : "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 40 * l.s,
          boxSizing: "border-box",
        }}
      >
        {/* ── Monitor ───────────────────────────────────────────────────── */}
        <div style={{ width: monitorW, display: "flex", flexDirection: "column", gap: 16 * l.s }}>
          <div
            style={{
              background: color.surface,
              borderRadius: 22 * l.s,
              boxShadow: CARD_SHADOW,
              padding: `${22 * l.s}px ${24 * l.s}px`,
              outline: paused ? `${3 * l.s}px solid rgba(214, 69, 69, 0.22)` : undefined,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span
                style={{
                  fontSize: 13 * l.s,
                  fontWeight: 700,
                  letterSpacing: "0.09em",
                  textTransform: "uppercase",
                  color: paused ? color.criticalInk : slowing ? color.watchingInk : color.primary,
                }}
              >
                {paused ? "Apnea event" : slowing ? "Slowing" : "Stable telemetry"}
              </span>
              {alertActive ? (
                <span
                  style={{
                    fontSize: 13.5 * l.s,
                    fontWeight: 700,
                    color: color.criticalInk,
                    fontVariantNumeric: "tabular-nums",
                  }}
                >
                  Breath paused {pauseSeconds.toFixed(0)}s
                </span>
              ) : null}
            </div>
            <div
              style={{
                fontSize: 15 * l.s,
                color: color.muted,
                marginTop: 6 * l.s,
                marginBottom: 14 * l.s,
              }}
            >
              Real-time Chest Expansion
            </div>
            <WaveformPanel width={monitorW - 48 * l.s} height={wavePanelH} radius={16 * l.s}>
              <BreathWaveform
                width={monitorW - 68 * l.s}
                height={waveH}
                stroke={paused ? color.critical : slowing ? color.watching : color.primary}
                strokeWidth={3.4}
                options={{
                  cycles: 3.6,
                  amplitude: 0.3,
                  samples: 240,
                  drift: 0.03,
                  // The flat region is anchored to the right edge and grows
                  // leftwards, so its width IS the elapsed pause.
                  pause: flat > 0.02 ? { from: 1 - flat * 0.5, to: 1 } : undefined,
                }}
              />
            </WaveformPanel>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: cardGap * l.s,
            }}
          >
            {vitals.map((v) => (
              <VitalCard key={v.label} spec={v} cardWidth={cardW} />
            ))}
          </div>
        </div>

        {/* ── Figure / phone ────────────────────────────────────────────── */}
        <div
          style={{
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <div style={{ opacity: 1 - phoneIn }}>
            <BeltDiagram
              width={px(l, figureW)}
              height={px(l, figureH)}
              breath={breathe}
              sensing={beltIn}
              showMcu={mcuIn}
              showFoot={footIn}
              ripple={ripple}
            />
          </div>

          {phoneIn > 0 ? (
            <div
              style={{
                position: "absolute",
                opacity: phoneIn,
                transform: `translateY(${(1 - phoneIn) * 24 * l.s}px)`,
              }}
            >
              <PhoneFrame scale={phoneScale}>
                {f >= CAREGIVER_RESOLVED_FRAME ? (
                  <DashboardScreen
                    apnea={0}
                    respRate={respRate}
                    spo2={spo2}
                    heartRate={heartRate}
                    heartbeat={heartbeat}
                  />
                ) : (
                  <AlertScreen
                    pauseSeconds={pauseSeconds}
                    spo2={spo2}
                    reveal={phoneIn}
                  />
                )}
              </PhoneFrame>
            </div>
          ) : null}
        </div>
      </div>

      {/* On-board processing callout */}
      {mcuIn > 0 && f < b.pause.from + 20 ? (
        <div style={{ position: "absolute", left: 64 * l.s, bottom: 168 * l.s, opacity: mcuIn }}>
          <Chip label="No separate hub · No cloud round-trip" tone="primary" size={14 * l.s} padX={14 * l.s} padY={8 * l.s} />
        </div>
      ) : null}

      {/* Honesty caption */}
      {captionIn > 0 ? (
        <Caption l={l} opacity={captionIn}>
          Illustrative animation of the intended system behavior. The values shown are
          representative, not measured clinical data from a patient.
        </Caption>
      ) : null}
    </Canvas>
  );
}
