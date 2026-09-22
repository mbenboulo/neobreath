import StatusChip, { type VitalStatus } from "./StatusChip";
import Waveform from "./Waveform";
import type { WaveformPreset } from "@/lib/waveform";

/**
 * VitalCard — an infant physiological readout, per DESIGN.md's component spec.
 *
 * Layout: label and status chip on the top row, the value with a
 * baseline-aligned unit below it, and an optional sparkline along the base.
 *
 * The value uses `vital-numerals` (tabular figures) so digits do not reflow as
 * telemetry updates — a jittering numeral is unreadable at a glance and looks
 * broken.
 */

interface VitalCardProps {
  label: string;
  /** Pre-formatted so callers control precision and jitter behavior. */
  value: string | number;
  /** Unit suffix, baseline-aligned next to the value. */
  unit?: string;
  status: VitalStatus;
  /** Override the status chip's word (e.g. "Steady", "Optimal"). */
  statusLabel?: string;
  /** Clinical target range, shown under the chip. */
  target?: string;
  /** Optional caption along the card base. */
  footnote?: string;
  /** Sparkline scenario. Omit to render no sparkline. */
  sparkline?: WaveformPreset;
  className?: string;
}

export default function VitalCard({
  label,
  value,
  unit,
  status,
  statusLabel,
  target,
  footnote,
  sparkline,
  className = "",
}: VitalCardProps) {
  const stroke =
    status === "normal"
      ? "var(--color-nb-normal)"
      : status === "watching"
        ? "var(--color-nb-watching)"
        : "var(--color-nb-critical)";

  return (
    <div
      className={`rounded-nb-card bg-nb-surface p-4 shadow-nb-warm ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[12px] font-semibold leading-4 tracking-[0.02em] text-nb-ink">
            {label}
          </p>
          <p className="mt-1 flex items-baseline gap-1.5">
            <span className="vital-numerals text-[40px] font-extrabold leading-[44px] tracking-[-0.03em] text-nb-ink">
              {value}
            </span>
            {unit ? (
              <span className="text-[12px] font-semibold tracking-[0.02em] text-nb-muted">
                {unit}
              </span>
            ) : null}
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-end">
          <StatusChip
            status={status}
            label={statusLabel}
            pulse={status === "critical"}
          />
          {target ? (
            <span className="mt-1 text-[11px] font-bold leading-[14px] tracking-[0.04em] text-nb-muted">
              Target: {target}
            </span>
          ) : null}
        </div>
      </div>

      {sparkline || footnote ? (
        <div className="mt-3 flex items-center justify-between gap-3 border-t border-nb-hairline pt-2.5">
          {footnote ? (
            <span className="text-[11px] font-bold leading-[14px] tracking-[0.04em] text-nb-muted">
              {footnote}
            </span>
          ) : (
            <span />
          )}
          {sparkline ? (
            <Waveform
              preset={sparkline}
              width={96}
              height={20}
              stroke={stroke}
              strokeWidth={2}
              className="h-5 w-24"
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
