import type { CSSProperties } from "react";
import { AbsoluteFill } from "remotion";
import { color } from "../tokens";
import { CARD_SHADOW, type Layout } from "../theme";

/**
 * Chrome — the shared frame furniture: canvas, beat titles, wordmark, and the
 * honesty caption.
 *
 * `Caption` is the video equivalent of the website's <ClaimBadge>. Every
 * animation ends on one. It is never decorative: if a claim appears on screen,
 * its qualifier appears on screen too, in the same frame, legibly.
 */

export function Canvas({
  children,
  tone = "canvas",
  style,
}: {
  children: React.ReactNode;
  tone?: "canvas" | "ink";
  style?: CSSProperties;
}) {
  return (
    <AbsoluteFill
      style={{
        background: tone === "ink" ? color.ink : color.canvas,
        fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
        color: tone === "ink" ? color.onInk : color.onSurface,
        ...style,
      }}
    >
      {children}
    </AbsoluteFill>
  );
}

/** Small uppercase act label, top-left. */
export function BeatTitle({
  l,
  children,
  opacity = 1,
  tone = "canvas",
  style,
}: {
  l: Layout;
  children: React.ReactNode;
  opacity?: number;
  tone?: "canvas" | "ink";
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: 54 * l.s,
        left: 64 * l.s,
        fontSize: 16 * l.s,
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: tone === "ink" ? color.primaryLight : color.primary,
        opacity,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** The NeoBreath wordmark. */
export function Wordmark({
  l,
  scale = 1,
  tone = "canvas",
  style,
}: {
  l: Layout;
  scale?: number;
  tone?: "canvas" | "ink";
  style?: CSSProperties;
}) {
  const ink = tone === "ink" ? color.onInk : color.onSurface;
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 12 * l.s * scale,
        ...style,
      }}
    >
      <svg width={34 * l.s * scale} height={34 * l.s * scale} viewBox="0 0 24 24">
        <path
          d="M12 2.4 L20 5.2 V11.4 C20 16.4 16.6 20 12 21.6 C7.4 20 4 16.4 4 11.4 V5.2 Z"
          fill={color.primary}
        />
        <circle cx="12" cy="10" r="2.6" fill="#fff" />
        <path d="M7.4 18.2 C8.2 15.4 9.9 14 12 14 C14.1 14 15.8 15.4 16.6 18.2" fill="#fff" />
      </svg>
      <span
        style={{
          fontSize: 27 * l.s * scale,
          fontWeight: 800,
          letterSpacing: "-0.02em",
          color: ink,
        }}
      >
        NeoBreath
      </span>
    </div>
  );
}

/**
 * Honesty caption. Wraps at a comfortable measure and sits on a soft surface so
 * it stays readable over any background.
 */
export function Caption({
  l,
  children,
  opacity = 1,
  tone = "canvas",
  style,
}: {
  l: Layout;
  children: React.ReactNode;
  opacity?: number;
  tone?: "canvas" | "ink";
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: "50%",
        bottom: 46 * l.s,
        transform: "translateX(-50%)",
        width: Math.min(l.width - 120 * l.s, 1180 * l.s),
        background: tone === "ink" ? "rgba(255,255,255,0.08)" : color.surface,
        borderRadius: 16 * l.s,
        padding: `${15 * l.s}px ${22 * l.s}px`,
        boxShadow: CARD_SHADOW,
        borderLeft: `${4 * l.s}px solid ${
          tone === "ink" ? color.primaryLight : color.primary
        }`,
        opacity,
        boxSizing: "border-box",
        ...style,
      }}
    >
      <div
        style={{
          fontSize: 17 * l.s,
          lineHeight: 1.42,
          color: tone === "ink" ? color.onInk : color.onSurface,
          fontWeight: 500,
          textAlign: "left",
        }}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * A labelled stage card — used for the pipeline (Sense → Interpret → …) and for
 * the three intervention levels.
 */
export function StageCard({
  l,
  label,
  detail,
  active = 1,
  tone = "canvas",
  width = 260,
  style,
}: {
  l: Layout;
  label: string;
  detail?: string;
  /** 0..1 emphasis. Inactive cards fade back rather than disappear. */
  active?: number;
  tone?: "canvas" | "ink";
  width?: number;
  style?: CSSProperties;
}) {
  const onInk = tone === "ink";
  return (
    <div
      style={{
        width: width * l.s,
        background: onInk ? "rgba(255,255,255,0.07)" : color.surface,
        borderRadius: 18 * l.s,
        padding: `${18 * l.s}px ${20 * l.s}px`,
        boxShadow: CARD_SHADOW,
        outline:
          active > 0.5
            ? `${2 * l.s}px solid ${onInk ? color.primaryLight : color.primary}`
            : `${1 * l.s}px solid ${color.hairline}`,
        opacity: 0.42 + active * 0.58,
        transform: `translateY(${(1 - active) * 6 * l.s}px)`,
        boxSizing: "border-box",
        ...style,
      }}
    >
      <div
        style={{
          fontSize: 20 * l.s,
          fontWeight: 700,
          letterSpacing: "-0.01em",
          color: onInk ? color.onInk : color.onSurface,
        }}
      >
        {label}
      </div>
      {detail ? (
        <div
          style={{
            fontSize: 14 * l.s,
            lineHeight: 1.35,
            marginTop: 6 * l.s,
            color: onInk ? "rgba(242,247,245,0.72)" : color.muted,
          }}
        >
          {detail}
        </div>
      ) : null}
    </div>
  );
}
