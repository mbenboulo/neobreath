import type { CSSProperties } from "react";
import { color } from "../tokens";
import { CARD_SHADOW, PILL_SHADOW, wash } from "../theme";
import BreathWaveform, { WaveformPanel } from "./BreathWaveform";
import VitalCard, { type VitalSpec } from "./VitalCard";
import { Chip } from "./Chip";

/**
 * PhoneFrame + the two app screens Animation A needs.
 *
 * PORTED FROM THE RENDERED SCREENSHOTS, NOT THE HTML. The markup and the pixels
 * disagree in several places, and the pixels are the design:
 *
 *  - Resting status chips are ALL teal. The green/amber/red semantic palette is
 *    reserved for real state changes, so a calm dashboard is monochrome.
 *  - The active bottom-nav item is a large solid teal circle that overlaps the
 *    bar, not a tinted pill.
 *  - The heart-rate sparkline is a spiky ECG trace; the other two are smooth.
 *
 * DEVIATION, DELIBERATE: the Stitch alert screen uses #f45d5d / #ffeded, which
 * its own markup describes as matching a competitor's app ("Sense-U"). Those are
 * not NeoBreath tokens, so this uses `critical` and `secondary` instead. The
 * screen should be ours, not a competitor's palette.
 */

export const SCREEN_W = 420;
export const SCREEN_H = 900;

const VITALS: VitalSpec[] = [
  {
    label: "Respiratory Rate",
    value: "44",
    unit: "br/min",
    chip: "Normal",
    chipTone: "primary",
    target: "30–60",
    footnote: "Stable last 3 hrs",
    spark: "breath",
  },
  {
    label: "Oxygen Saturation (SpO₂)",
    value: "96",
    unit: "%",
    chip: "Optimal",
    chipTone: "primary",
    target: "92–98%",
    footnote: "Stable last 3 hrs",
    spark: "breath",
  },
  {
    label: "Heart Rate (Pulse)",
    value: "148",
    unit: "bpm",
    chip: "Steady",
    chipTone: "primary",
    target: "120–160",
    footnote: "Steady rhythm",
    spark: "ecg",
  },
];

/** The brand mark: a teal shield with an infant glyph inside. */
function BrandMark({ size = 40 }: { size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 9999,
        background: color.surface,
        boxShadow: CARD_SHADOW,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24">
        <path
          d="M12 2.4 L20 5.2 V11.4 C20 16.4 16.6 20 12 21.6 C7.4 20 4 16.4 4 11.4 V5.2 Z"
          fill={color.primary}
        />
        <circle cx="12" cy="10" r="2.6" fill="#fff" />
        <path
          d="M7.4 18.2 C8.2 15.4 9.9 14 12 14 C14.1 14 15.8 15.4 16.6 18.2"
          fill="#fff"
        />
      </svg>
    </div>
  );
}

function StatusDot({ pulsing = false }: { pulsing?: boolean }) {
  return (
    <span style={{ position: "relative", display: "inline-flex", width: 11, height: 11 }}>
      <span
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 9999,
          background: color.primary,
          opacity: pulsing ? 0.45 : 0,
          transform: pulsing ? "scale(2.1)" : "scale(1)",
        }}
      />
      <span
        style={{
          position: "relative",
          width: 11,
          height: 11,
          borderRadius: 9999,
          background: color.primary,
        }}
      />
    </span>
  );
}

/**
 * Dashboard screen.
 *
 * `phase` and `apnea` let Animation A drive the live part of the screen: the
 * trace, the status chip, and the SpO2 value all move together, because a
 * dashboard whose number drops while its chip stays green is a lie.
 */
export function DashboardScreen({
  apnea = 0,
  respRate = 44,
  spo2 = 96,
  heartRate = 148,
  heartbeat = 0,
}: {
  /** 0..1 — how far into an apnea event the screen is. */
  apnea?: number;
  respRate?: number;
  spo2?: number;
  heartRate?: number;
  /** 0..1 cycle driving the pulse dot. */
  heartbeat?: number;
}) {
  const critical = apnea > 0.55;
  const watching = apnea > 0.15 && !critical;

  const vitals: VitalSpec[] = VITALS.map((v, i) => {
    if (i === 0) {
      return {
        ...v,
        value: String(Math.round(respRate)),
        chip: critical ? "Paused" : watching ? "Slowing" : "Normal",
        chipTone: critical ? "critical" : watching ? "watching" : "primary",
        footnote: critical ? "Apnea event" : watching ? "Dipping" : "Stable last 3 hrs",
        spark: critical ? "flat" : v.spark,
        sparkColor: critical
          ? color.critical
          : watching
            ? color.watching
            : color.primary,
      };
    }
    if (i === 1) {
      return {
        ...v,
        value: String(Math.round(spo2)),
        chip: critical ? "Desaturating" : watching ? "Watching" : "Optimal",
        chipTone: critical ? "critical" : watching ? "watching" : "primary",
        sparkColor: critical ? color.critical : color.primary,
      };
    }
    return {
      ...v,
      value: String(Math.round(heartRate)),
      chip: watching || critical ? "Falling" : "Steady",
      chipTone: critical ? "critical" : watching ? "watching" : "primary",
      sparkColor: watching || critical ? color.watching : color.primary,
    };
  });

  return (
    <div
      style={{
        width: SCREEN_W,
        height: SCREEN_H,
        background: color.canvas,
        display: "flex",
        flexDirection: "column",
        fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
        paddingTop: 18,
        boxSizing: "border-box",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "0 18px 14px 18px",
        }}
      >
        <BrandMark size={40} />
        <span
          style={{ fontSize: 21, fontWeight: 700, color: color.onSurface, letterSpacing: "-0.02em" }}
        >
          Baby Liam
        </span>
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: color.primary,
            background: color.primaryWash,
            padding: "4px 10px",
            borderRadius: 9999,
          }}
        >
          31 weeks
        </span>
      </div>

      {/* Hero status card */}
      <div
        style={{
          margin: "0 18px",
          background: color.surface,
          borderRadius: 22,
          boxShadow: critical ? undefined : CARD_SHADOW,
          outline: critical ? `3px solid ${wash(color.critical, 0.22)}` : undefined,
          padding: "18px 18px 16px 18px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <StatusDot pulsing={!critical} />
          <span
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.09em",
              textTransform: "uppercase",
              color: critical ? color.criticalInk : color.primary,
            }}
          >
            {critical ? "Apnea event" : watching ? "Slowing" : "Stable telemetry"}
          </span>
        </div>
        <div
          style={{
            fontSize: 30,
            fontWeight: 800,
            color: color.onSurface,
            letterSpacing: "-0.025em",
            marginTop: 6,
            lineHeight: 1.12,
          }}
        >
          {critical ? "Breathing paused" : watching ? "Breathing slowing" : "Breathing normally"}
        </div>
        <div style={{ fontSize: 14, color: color.muted, marginTop: 4, lineHeight: 1.35 }}>
          {critical
            ? "No abdominal movement detected • Caregiver alerted"
            : "Continuous monitoring active • All vital signs within safe target range"}
        </div>

        <div
          style={{
            borderTop: `1px solid ${color.hairline}`,
            marginTop: 14,
            paddingTop: 12,
          }}
        >
          <div style={{ fontSize: 12, color: color.muted, fontWeight: 500, marginBottom: 8 }}>
            Real-time Chest Expansion
          </div>
          <WaveformPanel width={SCREEN_W - 36 - 36} height={56} radius={14}>
            <BreathWaveform
              width={SCREEN_W - 36 - 36 - 20}
              height={48}
              stroke={critical ? color.critical : watching ? color.watching : color.primary}
              strokeWidth={2.6}
              options={{
                cycles: 3.4,
                amplitude: 0.3,
                samples: 200,
                drift: 0.03,
                // Flat region grows from the right as the event progresses.
                pause: apnea > 0.15 ? { from: 1 - 0.4 * apnea, to: 1 } : undefined,
              }}
            />
          </WaveformPanel>
        </div>
      </div>

      {/* Vitals */}
      <div style={{ padding: "14px 18px 6px 18px" }}>
        <div style={{ fontSize: 19, fontWeight: 700, color: color.onSurface, letterSpacing: "-0.015em" }}>
          Continuous Vitals
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 9,
          padding: "0 18px",
        }}
      >
        {vitals.map((v) => (
          <VitalCard key={v.label} spec={v} cardWidth={SCREEN_W - 36} />
        ))}
      </div>

      {/* Bottom nav */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 78,
          background: color.surface,
          boxShadow: "0 -6px 22px -8px rgba(37, 49, 59, 0.10)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          paddingBottom: 6,
        }}
      >
        <div
          style={{
            width: 76,
            height: 76,
            borderRadius: 9999,
            background: color.primary,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
            marginTop: -34,
            boxShadow: PILL_SHADOW,
            transform: `scale(${1 + heartbeat * 0.02})`,
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path
              d="M3 12.5 H6.5 L8.5 8 L11 16.5 L13.5 10.5 L15.5 13.5 H21"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>Home</span>
        </div>
        {[
          { label: "History", d: "M12 7 V12 L15.5 14 M12 3.6 A8.4 8.4 0 1 0 12 20.4 A8.4 8.4 0 1 0 12 3.6" },
          {
            label: "Settings",
            d: "M12 15.2 A3.2 3.2 0 1 0 12 8.8 A3.2 3.2 0 1 0 12 15.2 M19.2 12 C19.2 11.5 19.1 11 19 10.6 L21 9.1 L19.2 6 L16.8 7 C16.1 6.5 15.3 6.1 14.4 5.9 L14 3.4 L10.4 3.4 L10 5.9 C9.1 6.1 8.3 6.5 7.6 7 L5.2 6 L3.4 9.1 L5.4 10.6 C5.3 11 5.2 11.5 5.2 12 C5.2 12.5 5.3 13 5.4 13.4 L3.4 14.9 L5.2 18 L7.6 17 C8.3 17.5 9.1 17.9 10 18.1 L10.4 20.6 L14 20.6 L14.4 18.1 C15.3 17.9 16.1 17.5 16.8 17 L19.2 18 L21 14.9 L19 13.4 C19.1 13 19.2 12.5 19.2 12 Z",
          },
        ].map((t) => (
          <div
            key={t.label}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 4,
              color: color.muted,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d={t.d} stroke={color.muted} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span style={{ fontSize: 12, fontWeight: 600 }}>{t.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/**
 * Apnea alert screen — the caregiver's view during an event.
 * `pauseSeconds` and `spo2` are driven by the composition so the popup agrees
 * with the monitor trace behind it.
 */
export function AlertScreen({
  pauseSeconds = 20,
  spo2 = 89,
  reveal = 1,
}: {
  pauseSeconds?: number;
  spo2?: number;
  /** 0..1 — the card rises and fades in. */
  reveal?: number;
}) {
  return (
    <div
      style={{
        width: SCREEN_W,
        height: SCREEN_H,
        position: "relative",
        overflow: "hidden",
        background: color.canvas,
      }}
    >
      {/* Dashboard behind, dimmed */}
      <div style={{ position: "absolute", inset: 0, opacity: 0.4, filter: "blur(3px)" }}>
        <DashboardScreen apnea={0.9} respRate={6} spo2={spo2} heartRate={112} />
      </div>
      <div style={{ position: "absolute", inset: 0, background: "rgba(11, 43, 40, 0.32)" }} />

      {/* Modal */}
      <div
        style={{
          position: "absolute",
          left: 14,
          right: 14,
          top: SCREEN_H * 0.24,
          background: color.surface,
          borderRadius: 28,
          padding: "26px 22px 24px 22px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          boxShadow: "0 24px 60px -12px rgba(37, 49, 59, 0.35)",
          transform: `translateY(${(1 - reveal) * 26}px) scale(${0.96 + reveal * 0.04})`,
          opacity: reveal,
          fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
        }}
      >
        <div style={{ fontSize: 18, fontWeight: 700, color: color.onSurface }}>Baby Liam</div>

        {/* Coral alert glyph, pulsing */}
        <div
          style={{
            width: 62,
            height: 62,
            borderRadius: 9999,
            background: wash(color.secondary, 0.16),
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 16,
            marginBottom: 12,
          }}
        >
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9.4" stroke={color.secondary} strokeWidth="1.6" />
            <circle cx="9.2" cy="10.4" r="1.2" fill={color.secondary} />
            <circle cx="14.8" cy="10.4" r="1.2" fill={color.secondary} />
            <path
              d="M8.6 14.8 C9.7 16.1 10.8 16.7 12 16.7 C13.2 16.7 14.3 16.1 15.4 14.8"
              stroke={color.secondary}
              strokeWidth="1.7"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div style={{ fontSize: 12, color: color.muted, fontWeight: 500 }}>
          22:14:56, Today
        </div>

        <div
          style={{
            fontSize: 27,
            fontWeight: 800,
            color: color.criticalInk,
            lineHeight: 1.16,
            letterSpacing: "-0.02em",
            marginTop: 8,
          }}
        >
          Slow Abdominal
          <br />
          Movement
        </div>

        <div style={{ marginTop: 14 }}>
          <Chip
            label={`Breath paused ${Math.round(pauseSeconds)}s  ·  SpO₂ ${Math.round(spo2)}%`}
            tone="critical"
            size={12.5}
            padX={14}
            padY={8}
          />
        </div>

        {/* Guidance arrow */}
        <svg width="26" height="26" viewBox="0 0 24 24" style={{ marginTop: 14, marginBottom: 6 }}>
          <path
            d="M12 4 V18 M6.5 13 L12 18.6 L17.5 13"
            stroke={color.muted}
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>

        <div style={{ fontSize: 13.5, color: color.muted, lineHeight: 1.45, maxWidth: 290 }}>
          Check if your child is okay. Gently stimulate Liam. Make sure the NeoBreath sensor is
          properly worn and securely attached.
        </div>

        <div
          style={{
            width: "100%",
            height: 48,
            borderRadius: 9999,
            background: color.primary,
            color: "#fff",
            fontSize: 15,
            fontWeight: 700,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          Dismiss
        </div>

        <div
          style={{
            marginTop: 12,
            fontSize: 12,
            fontWeight: 600,
            color: color.muted,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M5 4 H8 L10 9 L8 10.6 C9 13 11 15 13.4 16 L15 14 L20 16 V19 C20 20 19 21 18 21 C10 21 3 14 3 6 C3 5 4 4 5 4 Z"
              stroke={color.muted}
              strokeWidth="1.6"
              strokeLinejoin="round"
            />
          </svg>
          Call Emergency / Care Team
        </div>
      </div>
    </div>
  );
}

/** Rounded device bezel around a screen, for website-style presentation. */
export function PhoneFrame({
  children,
  scale = 1,
  style,
}: {
  children: React.ReactNode;
  scale?: number;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        width: SCREEN_W * scale,
        height: SCREEN_H * scale,
        borderRadius: 46 * scale,
        background: "#0B2B28",
        padding: 10 * scale,
        boxSizing: "border-box",
        boxShadow: "0 30px 70px -20px rgba(11, 43, 40, 0.45)",
        ...style,
      }}
    >
      <div
        style={{
          width: "100%",
          height: "100%",
          borderRadius: 37 * scale,
          overflow: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            width: SCREEN_W,
            height: SCREEN_H,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
