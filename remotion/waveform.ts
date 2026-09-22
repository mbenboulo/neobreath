// -----------------------------------------------------------------------------
// GENERATED MIRROR - DO NOT EDIT.
//
// Source of truth: neobreath/lib/waveform.ts
// Regenerate with:  npm run anim:sync   (from the neobreath repo)
// -----------------------------------------------------------------------------

/**
 * Deterministic breathing-waveform geometry.
 *
 * Shared by the website and (conceptually) the Remotion compositions, so the
 * curve a visitor sees in the hero is the same curve they see in the video.
 *
 * Two hard requirements:
 *   1. DETERMINISTIC — no Math.random, no Date. Server and client must produce
 *      byte-identical output or React hydration mismatches.
 *   2. PURE — takes numbers, returns numbers/strings. No React, no DOM. This is
 *      what lets the same code run in the video renderer.
 */

export interface BreathWaveOptions {
  width: number;
  height: number;
  /** Breaths across the full width. */
  cycles?: number;
  /** Amplitude as a fraction of height (0–0.5). */
  amplitude?: number;
  /** Phase offset in turns (0–1). Lets multiple waves be desynchronised. */
  phase?: number;
  /** Sample count. Higher = smoother and more bytes; 200 is plenty at 2px. */
  samples?: number;
  /** Fraction of height to shift the whole trace down. */
  baseline?: number;
  /** x-range (0–1) where breathing ceases — the trace goes flat. */
  pause?: { from: number; to: number };
  /** x-range (0–1) where motion artifact distorts the trace. */
  artifact?: { from: number; to: number; amount?: number };
  /**
   * x-range (0–1) of motion NOISE added AFTER the amplitude envelope.
   *
   * Distinct from `artifact`, which is applied before the envelope and so is
   * suppressed when the trace is flat. This is what a sensor reads when the
   * infant kicks the belt during an apparent pause: the signal collapses AND is
   * noisy. That combination is the whole point of Animation B — it is what a
   * threshold rule cannot tell apart from a real, quiet apnea event.
   */
  noise?: { from: number; to: number; amount?: number };
  /** Vertical drift of the signal across the width, as a fraction of height. */
  drift?: number;
}

/**
 * One breath cycle, shaped rather than a pure sine: inhalation is quicker than
 * exhalation, which is what a real chest-expansion trace looks like. The second
 * harmonic is what makes it read as breathing instead of as a test signal.
 */
function breathShape(turns: number): number {
  const t = turns * Math.PI * 2;
  return Math.sin(t) * 0.78 + Math.sin(2 * t + 0.6) * 0.22;
}

/** Smooth, bounded pseudo-noise. Deterministic; no random source. */
function wobble(x: number, seed: number): number {
  return (
    Math.sin(x * 12.9898 + seed * 78.233) * 0.5 +
    Math.sin(x * 4.1414 + seed * 31.7) * 0.3 +
    Math.sin(x * 27.3 + seed * 11.1) * 0.2
  );
}

function ramp(x: number, from: number, to: number): number {
  if (x <= from) return 0;
  if (x >= to) return 1;
  const t = (x - from) / (to - from);
  // smoothstep — avoids a visible corner at either end of a transition
  return t * t * (3 - 2 * t);
}

export interface Point {
  x: number;
  y: number;
}

/** Sample the breathing trace into points. Pure, deterministic. */
export function breathSamples(o: BreathWaveOptions): Point[] {
  const {
    width,
    height,
    cycles = 4,
    amplitude = 0.32,
    phase = 0,
    samples = 200,
    baseline = 0,
    pause,
    artifact,
    noise,
    drift = 0,
  } = o;

  const mid = height / 2 + height * baseline;
  const amp = height * amplitude;
  const pts: Point[] = [];

  /** Post-envelope motion noise. Survives a flatline, which is the point. */
  const noiseOffset = (u: number): number => {
    if (!noise) return 0;
    const a = ramp(u, noise.from, noise.to);
    const gate = a * (1 - a) * 4;
    // Higher frequency than `artifact`: it should read as the sensor losing the
    // signal, not as a second breathing pattern.
    return wobble(u * 3.7, 13.9) * gate * (noise.amount ?? 0.4) * amp;
  };

  for (let i = 0; i <= samples; i++) {
    const u = i / samples; // 0..1 across the width

    let v = breathShape(u * cycles + phase);

    // Baseline drift: the slow wander of a real physiological trace.
    if (drift !== 0) v += Math.sin(u * Math.PI * 1.5) * drift;

    // Motion artifact: a burst of high-frequency noise, ramped in and out.
    if (artifact) {
      const a = ramp(u, artifact.from, artifact.to);
      const gate = a * (1 - a) * 4; // peak in the middle, zero at both ends
      const amount = artifact.amount ?? 0.45;
      v += wobble(u, 7.3) * gate * amount * 2;
    }

    // Apnea: amplitude collapses to zero across the pause window.
    let envelope = 1;
    if (pause) {
      const { from, to } = pause;
      if (u >= from && u <= to) {
        envelope = 0;
      } else if (u < from) {
        envelope = 1 - ramp(u, from - 0.06, from);
      } else {
        envelope = ramp(u, to, to + 0.06);
      }
      // Keep a whisper of residual signal rather than a mathematically perfect
      // line, which reads as a broken sensor rather than as an infant who
      // has stopped breathing.
      envelope = envelope * 0.94 + 0.06;
    }

    pts.push({ x: u * width, y: mid - v * amp * envelope + noiseOffset(u) });
  }

  return pts;
}

/**
 * Convert points to a smooth SVG path using Catmull-Rom → cubic Bézier.
 * A raw polyline shows visible facets at this stroke weight.
 */
export function smoothPath(pts: Point[], tension = 1 / 6): string {
  if (pts.length === 0) return "";
  if (pts.length === 1) return `M${pts[0].x.toFixed(2)},${pts[0].y.toFixed(2)}`;

  const d: string[] = [`M${pts[0].x.toFixed(2)},${pts[0].y.toFixed(2)}`];

  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;

    const c1x = p1.x + (p2.x - p0.x) * tension;
    const c1y = p1.y + (p2.y - p0.y) * tension;
    const c2x = p2.x - (p3.x - p1.x) * tension;
    const c2y = p2.y - (p3.y - p1.y) * tension;

    d.push(
      `C${c1x.toFixed(2)},${c1y.toFixed(2)} ${c2x.toFixed(2)},${c2y.toFixed(
        2
      )} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`
    );
  }

  return d.join(" ");
}

/** Convenience: options straight to a path string. */
export function breathPath(o: BreathWaveOptions): string {
  return smoothPath(breathSamples(o));
}

/**
 * Named scenarios. These are the beats the story needs, kept in one place so the
 * site and the animations describe the same physiology.
 */
export const waveformPresets = {
  /** Calm, stable breathing. The default resting state. */
  calm: { cycles: 4, amplitude: 0.32, phase: 0, drift: 0.02 },
  /** Breathing slows and shallows — the "watching" state before an event. */
  slowing: { cycles: 2.6, amplitude: 0.2, phase: 0.1, drift: 0.05 },
  /** A full apnea event: breathing stops across the middle of the trace. */
  apnea: {
    cycles: 3,
    amplitude: 0.3,
    phase: 0.05,
    drift: 0.02,
    pause: { from: 0.3, to: 0.72 },
  },
  /**
   * Sensor artifact: the trace looks like it collapsed, but the motion burst is
   * the giveaway. This is the crux of Animation B — it is visually similar to
   * `apnea` and mechanically very different.
   */
  artifact: {
    cycles: 3.6,
    amplitude: 0.26,
    phase: 0.2,
    drift: 0.03,
    artifact: { from: 0.3, to: 0.72, amount: 0.5 },
  },
} as const satisfies Record<string, Omit<BreathWaveOptions, "width" | "height">>;

export type WaveformPreset = keyof typeof waveformPresets;
