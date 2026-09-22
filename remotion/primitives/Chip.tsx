import type { CSSProperties } from "react";
import { color } from "../tokens";

/**
 * Chips — status and honesty tiers.
 *
 * The accessibility rule from the brand (AGENTS.md §3) applies in video too:
 * colour is never the only carrier of state. Each tier pairs its hue with a
 * distinct glyph, so the state still reads in greyscale or for a colour-blind
 * viewer watching on a phone.
 */

export type ChipTone = "normal" | "watching" | "critical" | "primary" | "muted";

const TONES: Record<ChipTone, { fg: string; bg: string; glyph: string }> = {
  // `-ink` variants for normal and critical: the base hues fail AA as 11-13px
  // chip text. Same fix as the website — see design/tokens.ts.
  normal: { fg: color.normalInk, bg: color.normalWash, glyph: "check" },
  watching: { fg: color.watchingInk, bg: color.watchingWash, glyph: "triangle" },
  critical: { fg: color.criticalInk, bg: color.criticalWash, glyph: "octagon" },
  primary: { fg: color.primary, bg: color.primaryWash, glyph: "dot" },
  muted: { fg: color.muted, bg: "rgba(100, 116, 139, 0.10)", glyph: "dot" },
};

/** Distinct shapes, drawn rather than icon-fonted so they render identically. */
function Glyph({ kind, colour, size }: { kind: string; colour: string; size: number }) {
  const s = size;
  const common: CSSProperties = { flexShrink: 0 };
  if (kind === "check") {
    return (
      <svg width={s} height={s} viewBox="0 0 16 16" style={common}>
        <circle cx="8" cy="8" r="7" fill="none" stroke={colour} strokeWidth="1.6" />
        <path
          d="M4.8 8.3 L7 10.4 L11.2 5.9"
          fill="none"
          stroke={colour}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  if (kind === "triangle") {
    return (
      <svg width={s} height={s} viewBox="0 0 16 16" style={common}>
        <path
          d="M8 1.8 L15 14 L1 14 Z"
          fill="none"
          stroke={colour}
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path d="M8 6.2 L8 10" stroke={colour} strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="8" cy="12" r="0.9" fill={colour} />
      </svg>
    );
  }
  if (kind === "octagon") {
    return (
      <svg width={s} height={s} viewBox="0 0 16 16" style={common}>
        <path
          d="M5.6 1.5 L10.4 1.5 L14.5 5.6 L14.5 10.4 L10.4 14.5 L5.6 14.5 L1.5 10.4 L1.5 5.6 Z"
          fill={colour}
        />
        <path d="M8 4.6 L8 9" stroke="#fff" strokeWidth="1.7" strokeLinecap="round" />
        <circle cx="8" cy="11.3" r="0.95" fill="#fff" />
      </svg>
    );
  }
  return (
    <svg width={s} height={s} viewBox="0 0 16 16" style={common}>
      <circle cx="8" cy="8" r="4" fill={colour} />
    </svg>
  );
}

interface ChipProps {
  label: string;
  tone?: ChipTone;
  /** Chip text size in design px (before scale). */
  size?: number;
  /** Horizontally pad. */
  padX?: number;
  padY?: number;
  style?: CSSProperties;
}

export function Chip({
  label,
  tone = "primary",
  size = 15,
  padX = 14,
  padY = 7,
  style,
}: ChipProps) {
  const t = TONES[tone];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size * 0.42,
        padding: `${padY}px ${padX}px`,
        borderRadius: 9999,
        background: t.bg,
        color: t.fg,
        fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
        fontSize: size,
        fontWeight: 700,
        letterSpacing: "0.04em",
        textTransform: "uppercase",
        lineHeight: 1,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      <Glyph kind={t.glyph} colour={t.fg} size={size * 0.95} />
      {label}
    </span>
  );
}

/** Sentence-case chip, for the honesty labels which must not shout in caps. */
export function LabelChip({
  children,
  fg,
  bg,
  size = 16,
  padX = 14,
  padY = 8,
  style,
}: {
  children: React.ReactNode;
  fg: string;
  bg: string;
  size?: number;
  padX?: number;
  padY?: number;
  style?: CSSProperties;
}) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: `${padY}px ${padX}px`,
        borderRadius: 9999,
        background: bg,
        color: fg,
        fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
        fontSize: size,
        fontWeight: 600,
        lineHeight: 1.1,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
