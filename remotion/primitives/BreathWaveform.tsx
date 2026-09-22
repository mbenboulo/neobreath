import type { CSSProperties } from "react";
import { breathSamples, smoothPath, type BreathWaveOptions } from "../waveform";

/**
 * BreathWaveform — the breathing trace, driven by props rather than by hooks.
 *
 * The choreography lives in the compositions; this stays a pure renderer. That
 * keeps retiming an animation a composition-only change.
 *
 * Two details that matter for reading as physiology rather than as a test signal:
 *
 *  - The apnea window is anchored to the RIGHT edge, and grows leftwards. The
 *    flat width therefore equals elapsed apneic time, which is what the counter
 *    beside it is counting. A window in the middle of the trace would read as a
 *    glitch instead.
 *  - `reveal` slices the sample array rather than scaling it, so a partially
 *    drawn trace keeps its true geometry instead of looking compressed.
 */

interface BreathWaveformProps {
  width: number;
  height: number;
  options?: Omit<BreathWaveOptions, "width" | "height">;
  stroke?: string;
  strokeWidth?: number;
  /** 0..1 horizontal draw-on, left to right. */
  reveal?: number;
  opacity?: number;
  style?: CSSProperties;
}

export default function BreathWaveform({
  width,
  height,
  options,
  stroke = "#0F766E",
  strokeWidth = 3,
  reveal = 1,
  opacity = 1,
  style,
}: BreathWaveformProps) {
  const samples = breathSamples({
    width,
    height,
    samples: 260,
    amplitude: 0.3,
    cycles: 4,
    ...options,
  });

  const count = Math.max(2, Math.round(samples.length * Math.min(1, Math.max(0, reveal))));
  const d = smoothPath(samples.slice(0, count));

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ display: "block", opacity, ...style }}
    >
      <path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The soft warm panel the dashboard floats its trace inside. */
export function WaveformPanel({
  width,
  height,
  radius = 16,
  children,
  style,
}: {
  width: number;
  height: number;
  radius?: number;
  children: React.ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        width,
        height,
        borderRadius: radius,
        background: "rgba(251, 244, 232, 0.72)",
        display: "flex",
        alignItems: "center",
        paddingLeft: 10,
        paddingRight: 10,
        overflow: "hidden",
        ...style,
      }}
    >
      {children}
    </div>
  );
}
