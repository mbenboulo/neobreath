import Section from "@/components/brand/Section";
import Eyebrow from "@/components/brand/Eyebrow";
import ClaimBadge from "@/components/brand/ClaimBadge";
import Waveform from "@/components/brand/Waveform";
import { problem } from "@/content/copy";

/**
 * Act II — Why It Happens.
 *
 * Two things carry this act:
 *
 *  1. The waveform pair. `apnea` and `artifact` are rendered from the SAME
 *     geometry engine the video uses, so the site and the animation make the
 *     same visual claim rather than two slightly different ones. Side by side
 *     they look nearly identical — which is the entire problem this project
 *     exists to solve, stated without a single adjective.
 *  2. "What NeoBreath is not". Deleting the old site's SIDS claim was correct;
 *     saying so out loud is better than silently removing it, because a reader
 *     who saw the previous claim learns that the project corrects itself.
 */
export default function ActProblem() {
  return (
    <Section id="problem" tone="warm">
      <Eyebrow>{problem.eyebrow}</Eyebrow>
      <h2 className="mt-2 max-w-[620px] text-[30px] font-extrabold leading-tight tracking-[-0.02em] text-nb-ink md:text-[38px]">
        {problem.title}
      </h2>
      <p className="mt-4 max-w-[680px] text-[16px] leading-relaxed text-nb-muted">
        {problem.body}
      </p>

      {/* The two traces, rendered from the same engine as the animations. */}
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {[
          {
            label: "Breathing stops",
            preset: "apnea" as const,
            stroke: "var(--color-nb-critical)",
            note: "The trace collapses. No movement to give it away.",
          },
          {
            label: "The sensor is disturbed",
            preset: "artifact" as const,
            stroke: "var(--color-nb-watching)",
            note: "The trace also collapses — and carries motion noise.",
          },
        ].map((t) => (
          <figure
            key={t.label}
            className="rounded-nb-card bg-nb-surface p-5 shadow-nb-warm"
          >
            <figcaption className="mb-3 flex items-baseline justify-between gap-3">
              <span className="text-[15px] font-bold text-nb-ink">{t.label}</span>
              <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-nb-muted">
                Respiratory channel
              </span>
            </figcaption>
            <div className="rounded-nb-card bg-nb-canvas/70 px-2 py-3">
              <Waveform preset={t.preset} stroke={t.stroke} className="h-24 w-full" />
            </div>
            <p className="mt-3 text-[13px] leading-relaxed text-nb-muted">{t.note}</p>
          </figure>
        ))}
      </div>

      <p className="mt-4 max-w-[760px] text-[15px] font-medium leading-relaxed text-nb-ink">
        A fixed threshold cannot tell these apart. Reasoning over the trace shape and the other
        channels can. That distinction is the whole of the AI work below.
      </p>

      {/* The panels carry their claim badges, so the tier travels with the claim. */}
      <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {problem.panels.map((p) => (
          <div
            key={p.label}
            className="flex flex-col gap-2 rounded-nb-card bg-nb-surface p-5 shadow-nb-warm"
          >
            <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-nb-primary">
              {p.label}
            </span>
            <p className="text-[14px] leading-relaxed text-nb-ink">{p.text}</p>
            {p.claimId ? (
              <div className="mt-auto pt-2">
                <ClaimBadge claimId={p.claimId} />
              </div>
            ) : null}
          </div>
        ))}
      </div>

      {/* "What this is not" — the scope and claims boundary, stated plainly. */}
      <div className="mt-12 rounded-nb-card-lg border border-nb-hairline bg-nb-surface p-6 md:p-8">
        <h3 className="text-[20px] font-extrabold tracking-[-0.02em] text-nb-ink">
          {problem.notTitle}
        </h3>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {problem.notList.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span
                className="nb-icon mt-0.5 shrink-0 text-[18px] text-nb-critical"
                aria-hidden="true"
              >
                cancel
              </span>
              <span className="text-[14px] leading-relaxed text-nb-ink">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
