/**
 * WCAG contrast audit for every text/background pair the brand actually uses.
 *
 *   node scripts/audit-contrast.mjs
 *
 * This is deliberately a static token audit rather than a DOM scan: the brand has
 * a small, closed set of colour pairs (AGENTS.md §3), and checking them here
 * means a token change that breaks legibility fails a command instead of
 * depending on someone noticing.
 *
 * Alpha washes are composited over their card background first — measuring an
 * rgba value against white without compositing is how "it looks fine" audits go
 * wrong.
 *
 * Thresholds are WCAG 2.1 AA: 4.5:1 for normal text, 3:1 for large text
 * (>= 24px, or >= 18.66px bold) and for non-text UI boundaries.
 */

import { readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..");

// ── Read the canonical tokens so this cannot drift from the design ──────────

const src = readFileSync(join(repoRoot, "design/tokens.ts"), "utf8");
const token = (name) => {
  const m = src.match(new RegExp(`${name}:\\s*"(#[0-9a-fA-F]{3,8}|rgba?\\([^)]+\\))"`));
  if (!m) throw new Error(`[contrast] token not found in design/tokens.ts: ${name}`);
  return m[1];
};

const hexToRgb = (hex) => {
  const h = hex.replace("#", "");
  const n = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  return [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16));
};

const parse = (c) => {
  if (c.startsWith("#")) return [...hexToRgb(c), 1];
  const m = c.match(/rgba?\(([^)]+)\)/);
  const parts = m[1].split(",").map((s) => parseFloat(s.trim()));
  return [parts[0], parts[1], parts[2], parts[3] ?? 1];
};

/** Composite a possibly-translucent colour over an opaque backdrop. */
const over = (fg, bg) => {
  const [r, g, b, a] = parse(fg);
  const [br, bg2, bb] = parse(bg);
  return [r * a + br * (1 - a), g * a + bg2 * (1 - a), b * a + bb * (1 - a), 1];
};

/**
 * Resolve a colour into opaque RGB against a known backdrop.
 *
 * Translucent tokens MUST be composited before measuring: `criticalWash` is
 * `rgba(214,69,69,0.15)`, and comparing `critical` against the raw triple
 * measures a colour against itself and reports a meaningless 1.00:1.
 */
const opaque = (c, backdrop) => (parse(c)[3] < 1 ? over(c, backdrop) : parse(c));

const relativeLuminance = (rgb) => {
  const [r, g, b] = rgb.slice(0, 3).map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

/** `card` is what a translucent `bg` (a wash) sits on top of. */
const ratio = (fg, bg, card) => {
  const bgOpaque = opaque(bg, card);
  const fgOpaque = over(fg, `rgb(${bgOpaque.slice(0, 3).map((v) => Math.round(v)).join(",")})`);
  const a = relativeLuminance(fgOpaque);
  const b = relativeLuminance(bgOpaque);
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
};

// ── The pairs that actually appear on the site ──────────────────────────────
//
// `size` is the text size the pair is used at, in px, so the large-text
// exemption is applied only where it genuinely applies.

const C = {
  canvas: token("canvas"),
  surface: token("surface"),
  surfaceWarm: token("surfaceWarm"),
  ink: token("onSurface"),
  muted: token("muted"),
  primary: token("primary"),
  onPrimary: token("onPrimary"),
  primaryLight: token("primaryLight"),
  inkDeep: token("ink"),
  onInk: token("onInk"),
  critical: token("critical"),
  criticalInk: token("criticalInk"),
  criticalWash: token("criticalWash"),
  normal: token("normal"),
  normalInk: token("normalInk"),
  normalWash: token("normalWash"),
  watchingInk: token("watchingInk"),
  watchingWash: token("watchingWash"),
  hairline: token("hairline"),
  outline: token("outline"),
};

const PAIRS = [
  // ── Text ─────────────────────────────────────────────────────────────────
  { label: "ink on canvas",        fg: C.ink, bg: C.canvas,      px: 16, bold: false, need: "text" },
  { label: "ink on surface",       fg: C.ink, bg: C.surface,     px: 16, bold: false, need: "text" },
  { label: "ink on surface-warm",  fg: C.ink, bg: C.surfaceWarm, px: 16, bold: false, need: "text" },
  { label: "muted on canvas",      fg: C.muted, bg: C.canvas,      px: 14, bold: false, need: "text" },
  { label: "muted on surface",     fg: C.muted, bg: C.surface,     px: 14, bold: false, need: "text" },
  { label: "muted on surface-warm",fg: C.muted, bg: C.surfaceWarm, px: 13, bold: false, need: "text" },
  { label: "primary on canvas",    fg: C.primary, bg: C.canvas,  px: 14, bold: true,  need: "text" },
  { label: "primary on surface",   fg: C.primary, bg: C.surface, px: 14, bold: true,  need: "text" },
  { label: "primary on warm",      fg: C.primary, bg: C.surfaceWarm, px: 14, bold: true, need: "text" },
  { label: "onPrimary on primary", fg: C.onPrimary, bg: C.primary, px: 15, bold: true, need: "text" },
  { label: "onInk on ink",         fg: C.onInk, bg: C.inkDeep, px: 16, bold: false, need: "text" },
  { label: "primaryLight on ink",  fg: C.primaryLight, bg: C.inkDeep, px: 11, bold: true, need: "text" },

  // ── Status chips. The wash is translucent, so it is measured as it actually
  //    renders: composited over the white card it sits on. ──────────────────
  {
    label: "criticalInk on its wash",
    fg: C.criticalInk, bg: C.criticalWash, card: C.surface, px: 11, bold: true, need: "text",
  },
  {
    label: "normalInk on its wash",
    fg: C.normalInk, bg: C.normalWash, card: C.surface, px: 11, bold: true, need: "text",
  },
  {
    label: "watchingInk on its wash",
    fg: C.watchingInk, bg: C.watchingWash, card: C.surface, px: 11, bold: true, need: "text",
  },
  {
    label: "primary on its wash",
    fg: C.primary, bg: "rgba(15,118,110,0.10)", card: C.surface, px: 11, bold: true, need: "text",
  },
  // Status text used directly on a surface, not on a chip (e.g. the alert headline).
  { label: "criticalInk on surface", fg: C.criticalInk, bg: C.surface, px: 20, bold: true, need: "text" },
  { label: "normalInk on surface", fg: C.normalInk, bg: C.surface, px: 15, bold: true, need: "text" },
  { label: "watchingInk on canvas", fg: C.watchingInk, bg: C.canvas, px: 13, bold: true, need: "text" },

  // ── Non-text UI that must be visible (WCAG 1.4.11) ───────────────────────
  // Input borders carry the field boundary, so they need 3:1.
  { label: "outline on surface-warm (input border)", fg: C.outline, bg: C.surfaceWarm, px: 0, bold: false, need: "ui" },
  { label: "outline on surface (input border)", fg: C.outline, bg: C.surface, px: 0, bold: false, need: "ui" },
  { label: "primary on canvas (focus/link UI)", fg: C.primary, bg: C.canvas, px: 0, bold: false, need: "ui" },
];

/**
 * Decorative separators are EXEMPT from WCAG 1.4.11 — it covers boundaries that
 * convey meaning or identify a control. `hairline` only ever draws a soft
 * divider inside a card that is already separated by its shadow and its
 * background luminance, and between two sections with different backgrounds.
 * It is reported for information, never as a failure.
 */
const INFORMATIONAL = [
  { label: "hairline divider on surface (decorative)", fg: C.hairline, bg: C.surface, px: 0, bold: false, need: "ui" },
];

const AA_TEXT = 4.5;
const AA_LARGE = 3.0;
const AA_UI = 3.0;

function thresholdFor(p) {
  if (p.need === "ui") return { min: AA_UI, kind: "non-text" };
  const large = p.px >= 24 || (p.bold && p.px >= 18.66);
  return { min: large ? AA_LARGE : AA_TEXT, kind: large ? "large text" : "normal text" };
}

let failures = 0;
let warnings = 0;

console.log("WCAG 2.1 AA contrast audit\n");
for (const p of [...PAIRS, ...INFORMATIONAL]) {
  const informational = INFORMATIONAL.includes(p);
  const r = ratio(p.fg, p.bg, p.card ?? C.surface);
  const { min, kind } = thresholdFor(p);
  const pass = r >= min;
  const borderline = pass && r < min * 1.1;
  if (!pass && !informational) failures++;
  else if (borderline && !informational) warnings++;

  const mark = informational ? "info" : !pass ? "FAIL" : borderline ? "ok* " : "pass";
  console.log(
    `  ${mark}  ${r.toFixed(2).padStart(5)}:1  (min ${min.toFixed(1)}, ${kind.padEnd(12)})  ${p.label}`
  );
}

console.log("");
if (failures > 0) {
  console.error(`[contrast] ${failures} pair(s) below AA. Fix the token or the usage.`);
  process.exit(1);
}
if (warnings > 0) {
  console.log(
    `[contrast] all pairs pass AA; ${warnings} marked ok* are within 10% of the threshold — acceptable, but change them carefully.`
  );
} else {
  console.log("[contrast] all pairs pass AA with margin.");
}
