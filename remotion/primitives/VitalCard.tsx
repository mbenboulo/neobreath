import type { CSSProperties } from "react";
import { color } from "../tokens";
import { CARD_SHADOW } from "../theme";
import BreathWaveform from "./BreathWaveform";
import { Chip } from "./Chip";

/**
 * VitalCard — ported from the Stitch dashboard screen (screen.png), not from the
 * HTML. The rendered screen differs from the markup in ways that matter:
 * resting chips are all teal, and the unit sits inline with the value rather
 * than being baseline-aligned to it.
 */

export interface VitalSpec {
  label: string;
  value: string;
  unit: string;
  chip: string;
  chipTone: "primary" | "watching" | "critical";
  target: string;
  footnote: string;
  /** Sparkline shape. `ecg` is a spiky trace; `breath` is smooth. */
  spark: "breath" | "ecg" | "flat";
  sparkColor?: string;
}

function Sparkline({  kind,
  width = 96,
  height = 22,
  stroke,
}: {
  kind: VitalSpec["spark"];
  width?: number;
  height?: number;
  stroke: string;
}) {
  if (kind === "ecg") {
    const d =
      "M0,11 L20,11 L26,11 L30,3 L34,19 L38,11 L58,11 L64,11 L68,4 L72,18 L76,11 L96,11";
    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <path
          d={d}
          fill="none"
          stroke={stroke}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (kind === "flat") {
    return (
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        <path
          d={`M0,${height / 2} L${width},${height / 2}`}
          fill="none"
          stroke={stroke}
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <BreathWaveform
      width={width}
      height={height}
      stroke={stroke}
      strokeWidth={2}
      options={{ cycles: 2.4, amplitude: 0.22, samples: 90, drift: 0.06 }}
    />
  );
}

export default function VitalCard({
  spec,
  cardWidth,
  style,
}: {
  spec: VitalSpec;
  cardWidth: number;
  style?: CSSProperties;
}) {
  const chipTone = spec.chipTone === "watching" ? "watching" : spec.chipTone;
  return (
    <div
      style={{
        width: cardWidth,
        background: color.surface,
        borderRadius: 18,
        boxShadow: CARD_SHADOW,
        padding: "13px 16px 0 16px",
        boxSizing: "border-box",
        ...style,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div
            style={{
              fontSize: 14.5,
              fontWeight: 600,
              color: color.onSurface,
              letterSpacing: "-0.005em",
              whiteSpace: "nowrap",
            }}
          >
            {spec.label}
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 7,
              marginTop: 1,
            }}
          >
            <span
              style={{
                fontSize: 38,
                fontWeight: 800,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: color.onSurface,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              {spec.value}
            </span>
            <span style={{ fontSize: 14, fontWeight: 600, color: color.muted }}>
              {spec.unit}
            </span>
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
          <Chip label={spec.chip} tone={chipTone} size={12} padX={11} padY={5} />
          <span style={{ fontSize: 11.5, color: color.muted, fontWeight: 600 }}>
            Target: {spec.target}
          </span>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderTop: `1px solid ${color.hairline}`,
          marginTop: 11,
          paddingTop: 9,
          paddingBottom: 10,
          height: 20,
          boxSizing: "content-box",
        }}
      >
        <span style={{ fontSize: 11.5, color: color.muted, fontWeight: 500 }}>
          {spec.footnote}
        </span>
        <Sparkline kind={spec.spark} stroke={spec.sparkColor ?? color.primary} />
      </div>
    </div>
  );
}
