import { useEffect, useState } from "react";
import { continueRender, delayRender, useVideoConfig } from "remotion";
import { color } from "./tokens";

/**
 * Shared timing, layout and typography helpers for the NeoBreath animations.
 *
 * Everything is derived from tokens.ts so the animations and the website cannot
 * disagree about the brand.
 */

// ── Font ────────────────────────────────────────────────────────────────────
//
// @remotion/google-fonts is not installed, and adding a dependency to the
// Remotion project is out of scope. So the brand face is linked at render time
// and awaited with delayRender. The timeout is deliberate: a render must never
// hang because a font CDN is unreachable — it degrades to the fallback stack.

export const FONT = '"Plus Jakarta Sans", "Segoe UI", system-ui, sans-serif';

const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";

let fontPromise: Promise<void> | null = null;

function loadFont(): Promise<void> {
  return new Promise<void>((resolve) => {
    if (typeof document === "undefined") {
      resolve();
      return;
    }
    const existing = document.getElementById("nb-jakarta");
    if (existing) {
      void document.fonts.ready.then(() => resolve());
      return;
    }
    const link = document.createElement("link");
    link.id = "nb-jakarta";
    link.rel = "stylesheet";
    link.href = FONT_HREF;
    const timer = setTimeout(() => resolve(), 8000);
    link.onload = () => {
      void document.fonts.ready.then(() => {
        clearTimeout(timer);
        resolve();
      });
    };
    link.onerror = () => {
      clearTimeout(timer);
      resolve();
    };
    document.head.appendChild(link);
  });
}

export function ensureBrandFont(): Promise<void> {
  if (fontPromise === null) fontPromise = loadFont();
  return fontPromise;
}

/** Call once at the top of every composition. */
export function useBrandFont(): void {
  const [handle] = useState(() => delayRender("Loading Plus Jakarta Sans"));
  useEffect(() => {
    void ensureBrandFont().then(() => continueRender(handle));
  }, [handle]);
}

// ── Layout ──────────────────────────────────────────────────────────────────

export interface Layout {
  width: number;
  height: number;
  /** 1 for a 1920x1080 reference. */
  s: number;
  /**
   * True only when there is genuine room for a SIDE-BY-SIDE layout.
   *
   * This is NOT `width >= height`. A side-by-side layout needs roughly 1500px
   * (monitor + gap + figure), so a 1080x1080 square must STACK. Deriving `wide`
   * from the aspect ratio alone made the square cut take the row layout and run
   * the monitor off the left edge and the figure off the right.
   */
  wide: boolean;
  /** True for the 9:16 cut, which needs a taller, narrower rhythm. */
  portrait: boolean;
}

/** Minimum width at which a side-by-side layout fits without clipping. */
const ROW_MIN_WIDTH = 1500;

/**
 * One scale factor drives the whole design, so a 9:16 cut is the same
 * composition rather than a re-layout. Landscape scales on height; portrait and
 * square scale on width, so type stays legible in every cut.
 */
export function useLayout(): Layout {
  const { width, height } = useVideoConfig();
  return layoutFor(width, height);
}

export function layoutFor(width: number, height: number): Layout {
  const wide = width >= ROW_MIN_WIDTH;
  const s = wide ? height / 1080 : (width / 1080) * 0.92;
  return { width, height, s, wide, portrait: height > width * 1.2 };
}

/** Convenience: turn design-space pixels into frame pixels. */
export const px = (l: Layout, n: number) => Math.round(n * l.s);

// ── Timing ──────────────────────────────────────────────────────────────────

/**
 * Progress through a beat, clamped to 0..1.
 * Beats are declared in frames in `beats.ts` so the storyboard in AGENTS.md and
 * the code stay in step.
 */
export function beat(frame: number, from: number, to: number): number {
  if (to <= from) return frame >= to ? 1 : 0;
  return Math.min(1, Math.max(0, (frame - from) / (to - from)));
}

/** Ease in/out, for anything that should feel gentle rather than mechanical. */
export function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

export function easeOut(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/** Linear interpolation. */
export function mix(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

// ── Paint ───────────────────────────────────────────────────────────────────

/** Warm ambient card shadow. Mirrors `shadow.ambientWarm` but as a CSS value. */
export const CARD_SHADOW =
  "0 4px 20px -2px rgba(37, 49, 59, 0.04), 0 2px 6px -1px rgba(15, 118, 110, 0.03)";

export const PILL_SHADOW =
  "0 10px 28px -4px rgba(37, 49, 59, 0.08), 0 4px 12px -2px rgba(15, 118, 110, 0.06)";

/** Wrap a hex colour in a tint, for status washes. */
export function wash(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export const palette = color;
