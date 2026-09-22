// ─────────────────────────────────────────────────────────────────────────────
// GENERATED MIRROR — DO NOT EDIT.
//
// Source of truth: neobreath/design/tokens.ts
// Regenerate with:  npm run tokens:sync   (from the neobreath repo)
//
// This file is generated into both the canonical animation tree and the
// Remotion project's mirror, so that each typechecks on its own. Editing it
// here will be overwritten, and `npm run tokens:check` will fail.
// ─────────────────────────────────────────────────────────────────────────────

/**
 * NeoBreath design tokens — SINGLE SOURCE OF TRUTH.
 *
 * This file is consumed by the Next.js website (via app/globals.css and components).
 * It is MIRRORED to the Remotion project at:
 *   ..\remotion\src\neobreath\tokens.ts
 *
 * The Remotion project lives outside this workspace, so it cannot import from here.
 * `npm run tokens:sync` copies this file over the mirror. Keep values identical.
 *
 * Zero dependencies on purpose — this file must be consumable by both projects,
 * at build time and at render time, without a bundler-specific shim.
 *
 * Canonical values are taken from the prose of DESIGN.md (not its frontmatter)
 * because the prose and the dashboard code.html agree. See AGENTS.md §3.
 */

export const color = {
  /** Warm cream canvas — avoids cold blue glare at the bedside. */
  canvas: "#FBF4E8",
  /** Primary card surface. */
  surface: "#FFFFFF",
  /** Nested / quiet secondary groups. */
  surfaceWarm: "#FDFBF7",

  /** Deep stabilising teal — nav, primary buttons, authoritative labels. */
  primary: "#0F766E",
  onPrimary: "#FFFFFF",
  /** Tinted primary wash for chips and quiet emphasis. */
  primaryWash: "rgba(15, 118, 110, 0.10)",
  /**
   * Teal tuned for use ON the dark `ink` surface. The deep primary disappears
   * against `ink`, so dark sections must use this instead.
   */
  primaryLight: "#80D5CB",

  /** Warm coral — accents, active toggles, urgent caregiver prompts. */
  secondary: "#F4805D",
  onSecondary: "#FFFFFF",

  /** Deep charcoal. Never pure black — pure black is harsh on cream. */
  onSurface: "#25313B",
  /**
   * Slate muted — units, timestamps, secondary context.
   *
   * DEVIATION FROM DESIGN.md: the system specifies #64748B, which measures
   * 4.35:1 against the cream canvas and therefore fails WCAG AA (4.5:1) for the
   * 14px body text it is used for all over the site. Darkened just enough to
   * pass; the difference is not perceptible side by side. Verify with
   * `npm run audit:contrast`.
   */
  muted: "#5C6A80",

  /**
   * Interactive boundaries — input borders, the edge of a control.
   *
   * Taken from DESIGN.md's `outline` token, which the first pass never imported.
   * It needs 3:1 against its background (WCAG 1.4.11), which the decorative
   * `hairline` does not come close to.
   */
  outline: "#6E7977",

  /** Soft warm divider. Replaces hard borders entirely. */
  hairline: "#EAE3D5",

  /** Status semantics. NEVER the only signal — see statusShape below. */
  normal: "#2F9E64",
  watching: "#E3A83B",
  critical: "#D64545",

  /**
   * TEXT variants of the status colours.
   *
   * The base hues above are tuned for accents — icons, borders, waveform
   * strokes — where WCAG asks 3:1. Used as TEXT they fail: `normal` measures
   * 2.98:1 and `critical` 3.57:1 against their own chips, and 11px uppercase
   * chip text needs 4.5:1. These darker variants pass while staying legibly the
   * same colour. Verify with `npm run audit:contrast`.
   */
  normalInk: "#1F7A4A",
  criticalInk: "#B3261E",

  /** Tinted backgrounds for status chips. */
  normalWash: "rgba(47, 158, 100, 0.12)",
  watchingWash: "rgba(227, 168, 59, 0.15)",
  criticalWash: "rgba(214, 69, 69, 0.15)",

  /** Text colour that sits on the watching wash. 3.87:1 at the DESIGN.md value,
   *  so it is darkened here to pass AA like the other two status inks. */
  watchingInk: "#8A5A0F",

  /** Dark editorial surface, for contrast sections only. */
  ink: "#0B2B28",
  onInk: "#F2F7F5",
} as const;

/**
 * Accessibility rule: never encode state in colour alone.
 * Each status pairs its colour with a distinct SHAPE, so the state survives
 * greyscale, colour-blindness, and a dim nursery.
 */
export const statusShape = {
  normal: "filled-check / continuous ring",
  watching: "amber triangle / pulsing dash",
  critical: "solid octagon / gentle strobe",
} as const;

export const radius = {
  sm: "0.25rem",
  DEFAULT: "0.5rem",
  md: "0.75rem",
  lg: "1rem",
  card: "1.125rem", // 18px — standard data card
  cardLg: "1.25rem", // 20px — hero cards
  drawer: "1.5rem", // 24px — top edge of modal drawers
  full: "9999px",
} as const;

/**
 * Soft warm ambient shadows. No dark borders anywhere — depth comes from
 * luminance and warm shadow, never from a hairline outline.
 */
export const shadow = {
  /** Level 1 — card & tile at rest. */
  ambientWarm:
    "0 4px 20px -2px rgba(37, 49, 59, 0.04), 0 2px 6px -1px rgba(15, 118, 110, 0.03)",
  /** Level 2 — floating pills, drawers, active filter states. */
  ambientPill:
    "0 10px 28px -4px rgba(37, 49, 59, 0.08), 0 4px 12px -2px rgba(15, 118, 110, 0.06)",
  /** Critical event active — a tinted aura, not a hard outline. */
  alertSoft:
    "0 0 0 3px rgba(214, 69, 69, 0.15), 0 12px 32px -4px rgba(214, 69, 69, 0.12)",
  /** Normal event active — the calm counterpart to alertSoft. */
  calmSoft:
    "0 0 0 3px rgba(47, 158, 100, 0.15), 0 8px 24px -4px rgba(47, 158, 100, 0.12)",
} as const;

/** 4px baseline rhythm. */
export const space = {
  xs: "0.25rem",
  sm: "0.5rem",
  md: "1rem",
  lg: "1.25rem",
  xl: "1.75rem",
  xxl: "2.5rem",
} as const;

export const fontFamily = {
  sans: "'Plus Jakarta Sans'",
  /** Material Symbols Outlined, loaded in app/layout.tsx */
  symbol: "'Material Symbols Outlined'",
} as const;

/**
 * Type scale. The `vital` entries are for infant physiological readouts:
 * extra-bold (800) with tight tracking and TABULAR numerals, so live values
 * do not jitter as telemetry streams and stay legible across a room.
 */
export const fontSize = {
  vitalLg: { size: "56px", lineHeight: "60px", weight: 800, tracking: "-0.03em" },
  vitalLgMobile: { size: "44px", lineHeight: "48px", weight: 800, tracking: "-0.03em" },
  vitalMd: { size: "36px", lineHeight: "40px", weight: 800, tracking: "-0.02em" },
  vitalMdMobile: { size: "30px", lineHeight: "34px", weight: 800, tracking: "-0.02em" },
  headlineLg: { size: "28px", lineHeight: "36px", weight: 700, tracking: "-0.02em" },
  headlineMd: { size: "22px", lineHeight: "28px", weight: 700, tracking: "-0.01em" },
  headlineSm: { size: "18px", lineHeight: "24px", weight: 600, tracking: "0em" },
  bodyLg: { size: "16px", lineHeight: "24px", weight: 400, tracking: "0em" },
  bodyMd: { size: "14px", lineHeight: "20px", weight: 400, tracking: "0em" },
  bodySm: { size: "12px", lineHeight: "16px", weight: 400, tracking: "0em" },
  labelLg: { size: "14px", lineHeight: "18px", weight: 600, tracking: "0em" },
  labelMd: { size: "12px", lineHeight: "16px", weight: 600, tracking: "0.02em" },
  labelSm: { size: "11px", lineHeight: "14px", weight: 700, tracking: "0.04em" },
} as const;

/** Layout caps per DESIGN.md: mobile 4-col, tablet 8-col, desktop 12-col capped at 1200px. */
export const layout = {
  containerMax: "1200px",
  measureMax: "960px",
  mobileMargin: "1rem",
  tabletMargin: "1.5rem",
  desktopMargin: "2rem",
} as const;

/**
 * Claim classification. Mirrors content/claims.ts.
 * The honesty gradient is the spine of the website: the further a claim sits
 * from today, the more loudly it must be labelled.
 */
export const claimTier = {
  today: "TODAY",
  inDevelopment: "IN DEVELOPMENT",
  research: "RESEARCH",
} as const;

export type ClaimTier = (typeof claimTier)[keyof typeof claimTier];

/** Convenience bundle for consumers that want everything at once. */
export const tokens = {
  color,
  statusShape,
  radius,
  shadow,
  space,
  fontFamily,
  fontSize,
  layout,
  claimTier,
} as const;

export default tokens;
