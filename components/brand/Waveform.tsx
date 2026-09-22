import {
  breathPath,
  waveformPresets,
  type BreathWaveOptions,
  type WaveformPreset,
} from "@/lib/waveform";

/**
 * Waveform — the breathing trace.
 *
 * Server component. The geometry is computed at render time from pure functions
 * in lib/waveform.ts, so this ships no JavaScript and hydrates identically.
 *
 * `preserveAspectRatio="none"` lets the trace stretch to fill its band, and
 * `vector-effect="non-scaling-stroke"` keeps the stroke weight honest while it
 * does — without it, non-uniform scaling visibly thickens the line.
 */

interface WaveformProps {
  /** Named scenario from lib/waveform.ts. */
  preset?: WaveformPreset;
  /** Escape hatch for beats the presets do not cover. */
  options?: Omit<BreathWaveOptions, "width" | "height">;
  /** viewBox dimensions — geometry units, not rendered pixels. */
  width?: number;
  height?: number;
  stroke?: string;
  strokeWidth?: number;
  /** Emit an accessible description. Omit for purely decorative traces. */
  label?: string;
  className?: string;
}

export default function Waveform({
  preset = "calm",
  options,
  width = 360,
  height = 44,
  stroke = "var(--color-nb-primary)",
  strokeWidth = 2.5,
  label,
  className = "",
}: WaveformProps) {
  const geometry = options ?? waveformPresets[preset];
  const d = breathPath({ width, height, ...geometry });

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={className}
      fill="none"
      role={label ? "img" : "presentation"}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <path
        d={d}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
