/**
 * StatusChip — infant vital status, per DESIGN.md's accessibility rule.
 *
 * The rule (AGENTS.md §3) is non-negotiable: colour is NEVER the only carrier of
 * state. Each status pairs its hue with a distinct SHAPE, so it survives
 * greyscale, colour-blindness, and a dim nursery at 3am.
 *
 *   normal   → filled check  / continuous ring
 *   watching → warning triangle / pulsing dash
 *   critical → solid octagon / gentle strobe
 */

export type VitalStatus = "normal" | "watching" | "critical";

const STATUS: Record<
  VitalStatus,
  { label: string; className: string; icon: string; shape: string }
> = {
  normal: {
    label: "Normal",
    // `-ink` variants: the base status hues fail AA as text. See design/tokens.ts.
    className: "bg-nb-normal-wash text-nb-normal-ink",
    icon: "check_circle", // continuous ring + filled check
    shape: "check",
  },
  watching: {
    label: "Watching",
    className: "bg-nb-watching-wash text-nb-watching-ink",
    icon: "warning", // triangle
    shape: "triangle",
  },
  critical: {
    label: "Critical",
    className: "bg-nb-critical-wash text-nb-critical-ink",
    icon: "dangerous", // octagon
    shape: "octagon",
  },
};

interface StatusChipProps {
  status: VitalStatus;
  /** Override the default tier label (e.g. "Steady", "Optimal", "Stable"). */
  label?: string;
  /** Strobe/pulse the critical state. Suppressed under reduced motion via CSS. */
  pulse?: boolean;
  className?: string;
}

export default function StatusChip({
  status,
  label,
  pulse = false,
  className = "",
}: StatusChipProps) {
  const s = STATUS[status];

  return (
    <span
      data-shape={s.shape}
      /* `w-fit`: see the note in ClaimBadge — without it a flex-column parent
         stretches the chip into a full-width bar. */
      className={`inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase leading-[14px] tracking-[0.04em] ${s.className} ${className}`}
    >
      <span
        aria-hidden="true"
        className={`nb-icon text-[13px] ${
          pulse && status === "critical" ? "motion-safe:animate-pulse" : ""
        }`}
      >
        {s.icon}
      </span>
      {label ?? s.label}
    </span>
  );
}
