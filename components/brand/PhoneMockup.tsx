import Waveform from "@/components/brand/Waveform";
import StatusChip from "@/components/brand/StatusChip";

/**
 * PhoneMockup — the NeoBreath app, built as real components.
 *
 * Deliberately NOT an <img src="screen.png">. A screenshot would be a lie the
 * moment the app changes, would be invisible to screen readers, and would not
 * respond to the site's own tokens. This is composed from the same primitives
 * the rest of the site uses, so a token change updates the marketing site and
 * the app preview together.
 *
 * The layout follows the rendered Stitch screens, not its `code.html` — see
 * AGENTS.md §2. In particular every resting chip is teal; the amber and red
 * status colours are reserved for real state changes.
 */

export type AppScreen = "dashboard" | "alert";

export default function PhoneMockup({
  screen = "dashboard",
  className = "",
}: {
  screen?: AppScreen;
  className?: string;
}) {
  return (
    <div
      className={`relative w-full max-w-[320px] rounded-[38px] bg-nb-ink-deep p-2.5 shadow-nb-pill ${className}`}
      // The bezel is decorative; the screen content carries the meaning.
      role="img"
      aria-label={
        screen === "dashboard"
          ? "NeoBreath app showing a stable dashboard: breathing normally, with respiratory rate, oxygen saturation and heart rate"
          : "NeoBreath app showing an apnea alert: slow abdominal movement, breath paused 20 seconds, oxygen saturation 89 percent"
      }
    >
      <div className="relative overflow-hidden rounded-[30px] bg-nb-canvas">
        {screen === "dashboard" ? <Dashboard /> : <Alert />}
      </div>
    </div>
  );
}

function BrandRow() {
  return (
    <div className="flex items-center gap-2.5 px-[18px] pt-4 pb-3">
      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-nb-surface shadow-nb-warm">
        <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 2.4 L20 5.2 V11.4 C20 16.4 16.6 20 12 21.6 C7.4 20 4 16.4 4 11.4 V5.2 Z"
            fill="var(--color-nb-primary)"
          />
        </svg>
      </span>
      <span className="text-[15px] font-bold tracking-[-0.01em] text-nb-ink">Baby Liam</span>
      <span className="rounded-full bg-nb-primary-wash px-2 py-0.5 text-[11px] font-bold text-nb-primary">
        31 weeks
      </span>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="flex flex-col pb-4">
      <BrandRow />

      {/* Hero status card */}
      <div className="mx-[14px] rounded-[18px] bg-nb-surface p-4 shadow-nb-warm">
        <span className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-nb-primary opacity-60 motion-reduce:hidden" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-nb-primary" />
          </span>
          <span className="text-[10px] font-bold uppercase tracking-[0.09em] text-nb-primary">
            Stable telemetry
          </span>
        </span>
        <p className="mt-1.5 text-[19px] font-extrabold leading-tight tracking-[-0.02em] text-nb-ink">
          Breathing normally
        </p>
        <p className="mt-0.5 text-[11px] leading-snug text-nb-muted">
          Continuous monitoring active · All vital signs within safe target range
        </p>
        <div className="mt-3 border-t border-nb-hairline pt-2.5">
          <p className="mb-1.5 text-[10px] font-medium text-nb-muted">
            Real-time Chest Expansion
          </p>
          <div className="rounded-[12px] bg-nb-canvas/70 px-2 py-2">
            <Waveform preset="calm" className="h-9 w-full" strokeWidth={2} />
          </div>
        </div>
      </div>

      <p className="px-[18px] pt-3.5 pb-2 text-[14px] font-bold tracking-[-0.01em] text-nb-ink">
        Continuous Vitals
      </p>

      <div className="flex flex-col gap-2 px-[14px]">
        <VitalCardCompact
          label="Respiratory Rate"
          value="44"
          unit="br/min"
          status="normal"
          statusLabel="Normal"
          target="30–60"
          footnote="Stable last 3 hrs"
        />
        <VitalCardCompact
          label="Oxygen Saturation (SpO₂)"
          value="96"
          unit="%"
          status="normal"
          statusLabel="Optimal"
          target="92–98%"
          footnote="Stable last 3 hrs"
        />
        <VitalCardCompact
          label="Heart Rate (Pulse)"
          value="148"
          unit="bpm"
          status="normal"
          statusLabel="Steady"
          target="120–160"
          footnote="Steady rhythm"
        />
      </div>

      {/* Bottom nav, with the active item as the large teal circle the app uses. */}
      <div className="relative mt-4 flex items-end justify-around border-t border-nb-hairline bg-nb-surface px-4 pb-2 pt-2.5">
        <span className="-mt-7 flex h-14 w-14 flex-col items-center justify-center rounded-full bg-nb-primary shadow-nb-pill">
          <span className="nb-icon text-[18px] text-white" aria-hidden="true">
            monitor_heart
          </span>
          <span className="text-[9px] font-bold text-white">Home</span>
        </span>
        {[
          { icon: "history", label: "History" },
          { icon: "settings", label: "Settings" },
        ].map((t) => (
          <span key={t.label} className="flex flex-col items-center gap-0.5 text-nb-muted">
            <span className="nb-icon text-[18px]" aria-hidden="true">
              {t.icon}
            </span>
            <span className="text-[9px] font-semibold">{t.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** A tighter variant of VitalCard, sized for the phone frame. */
function VitalCardCompact(props: {
  label: string;
  value: string;
  unit: string;
  status: "normal" | "watching" | "critical";
  statusLabel: string;
  target: string;
  footnote: string;
}) {
  return (
    <div className="rounded-[14px] bg-nb-surface px-3 py-2.5 shadow-nb-warm">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="truncate text-[11px] font-semibold text-nb-ink">{props.label}</p>
          <p className="mt-0.5 flex items-baseline gap-1">
            <span className="vital-numerals text-[24px] font-extrabold leading-none tracking-[-0.03em] text-nb-ink">
              {props.value}
            </span>
            <span className="text-[10px] font-semibold text-nb-muted">{props.unit}</span>
          </p>
        </div>
        <div className="flex shrink-0 flex-col items-end gap-0.5">
          <StatusChip status={props.status} label={props.statusLabel} className="!px-2 !py-0.5 !text-[9px]" />
          <span className="text-[9px] font-bold text-nb-muted">Target: {props.target}</span>
        </div>
      </div>
      <div className="mt-2 flex items-center justify-between border-t border-nb-hairline pt-1.5">
        <span className="text-[9px] font-semibold text-nb-muted">{props.footnote}</span>
        <Waveform
          preset="calm"
          width={64}
          height={14}
          strokeWidth={1.6}
          className="h-3.5 w-16"
        />
      </div>
    </div>
  );
}

function Alert() {
  return (
    <div className="relative">
      {/* The dashboard behind, dimmed — matches the app's real alert behaviour. */}
      <div className="pointer-events-none opacity-40 blur-[2px]" aria-hidden="true">
        <Dashboard />
      </div>

      <div className="absolute inset-0 bg-nb-ink-deep/30" />

      <div className="absolute left-3 right-3 top-[22%] rounded-[22px] bg-nb-surface px-5 pb-5 pt-6 text-center shadow-nb-pill">
        <p className="text-[14px] font-bold text-nb-ink">Baby Liam</p>

        <span className="mx-auto mt-3 mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-nb-secondary/15">
          <span className="nb-icon text-2xl text-nb-secondary" aria-hidden="true">
            child_care
          </span>
        </span>

        <p className="text-[10px] font-medium text-nb-muted">22:14:56, Today</p>

        <p className="mt-1.5 text-[20px] font-extrabold leading-tight tracking-[-0.02em] text-nb-critical-ink">
          Slow Abdominal
          <br />
          Movement
        </p>

        <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-nb-critical-wash px-3 py-1.5 text-[11px] font-bold text-nb-critical-ink">
          <span className="nb-icon text-[13px]" aria-hidden="true">
            timer
          </span>
          Breath paused 20s · SpO₂ 89%
        </span>

        <p className="mt-3 text-[11px] leading-relaxed text-nb-muted">
          Check if your child is okay. Gently stimulate Liam. Make sure the sensor is properly
          worn and securely attached.
        </p>

        <span className="mt-4 flex h-10 items-center justify-center rounded-full bg-nb-primary text-[13px] font-bold text-nb-on-primary">
          Dismiss
        </span>
      </div>
    </div>
  );
}
