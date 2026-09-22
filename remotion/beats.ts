/**
 * Beat timings for the three animations.
 *
 * These are the frame ranges from the storyboards in AGENTS.md §6. They live in
 * one file so the storyboard and the code cannot drift, and so retiming an
 * animation is a one-line change rather than a hunt through a component.
 */

export interface Beat {
  from: number;
  to: number;
  label: string;
}

function beats(spec: Array<[string, number]>): Record<string, Beat> {
  const out: Record<string, Beat> = {};
  for (let i = 0; i < spec.length; i++) {
    const [label, from] = spec[i];
    const next = spec[i + 1];
    // The last beat runs to the end of the composition.
    const to = next ? next[1] : Number.POSITIVE_INFINITY;
    out[label] = { from, to, label };
  }
  return out;
}

/** A — "Anatomy of an Apnea Event" — 900 frames @ 30fps = 30s */
export const APNEA_EVENT = {
  durationInFrames: 900,
  fps: 30,
  beats: beats([
    ["quiet", 0],
    ["belt", 120],
    ["foot", 240],
    ["onboard", 350],
    ["pause", 450],
    ["response", 620],
    ["caregiver", 770],
  ]),
  /**
   * The displayed values recover HERE, not at the response beat.
   *
   * This ordering is the whole point: the wearable stimulates the infant, the
   * caregiver is alerted, and only afterwards does the monitor show recovery. If
   * the numbers recover before the alert appears, the frame contradicts itself —
   * a dashboard reading 44 br/min next to a "breath paused 20s" alert.
   */
  recoveryFrom: 845,
  recoveryTo: 895,
  /** Phone enters on the caregiver beat, with the event still on the monitor. */
  phoneFrom: 770,
  phoneTo: 800,
  /** The alert resolves to a normal dashboard here. */
  resolvedFrom: 862,
  /** Closing honesty card, overlapping the final beat. */
  captionFrom: 850,
} as const;

/** B — "Why False Alarms Happen" — 780 frames = 26s */
export const FALSE_ALARM = {
  durationInFrames: 780,
  fps: 30,
  beats: beats([
    ["twoSignals", 0],
    ["bothDip", 150],
    ["reveal", 300],
    ["classifier", 480],
    ["honesty", 660],
  ]),
  captionFrom: 680,
} as const;

/** C — "The Closed Loop" — 960 frames = 32s */
export const CLOSED_LOOP = {
  durationInFrames: 960,
  fps: 30,
  beats: beats([
    ["loop", 0],
    ["predict", 180],
    ["levels", 420],
    ["rail", 720],
  ]),
  captionFrom: 880,
} as const;

/** Representative physiological values used across the animations. */
export const READINGS = {
  respiratoryRate: 44,
  respiratoryTarget: "30–60",
  spo2: 96,
  spo2Desat: 89,
  spo2Target: "92–98%",
  heartRate: 148,
  heartRateTarget: "120–160",
  /** Seconds of pause reached at the end of the apnea beat. */
  pauseSeconds: 20,
} as const;
