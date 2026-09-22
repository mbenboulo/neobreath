import Section from "@/components/brand/Section";
import Eyebrow from "@/components/brand/Eyebrow";
import ClaimBadge from "@/components/brand/ClaimBadge";
import PhoneMockup from "@/components/brand/PhoneMockup";
import { system } from "@/content/copy";

/**
 * Act III — The System.
 *
 * The old site described a "central processing hub" and a "multi-node
 * architecture". Both are gone: processing moved onto the belt. That correction
 * is the single biggest factual change on the site, so the on-board claim is
 * stated prominently and carries its caveat — the power budget is an open
 * engineering problem, not a solved one.
 *
 * The app is shown as a real component (PhoneMockup), not a screenshot.
 */
export default function ActSystem() {
  return (
    <Section id="system" tone="canvas" width="wide">
      <Eyebrow>{system.eyebrow}</Eyebrow>
      <h2 className="mt-2 max-w-[680px] text-[30px] font-extrabold leading-tight tracking-[-0.02em] text-nb-ink md:text-[38px]">
        {system.title}
      </h2>
      <p className="mt-4 max-w-[700px] text-[16px] leading-relaxed text-nb-muted">
        {system.body}
      </p>

      {/* The pipeline, as a sequence of stages. */}
      <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {system.flow.map((node, i) => (
          <li
            key={node.label}
            className="flex items-start gap-3 rounded-nb-card bg-nb-surface p-5 shadow-nb-warm"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-nb-primary text-[13px] font-extrabold text-nb-on-primary">
              {i + 1}
            </span>
            <span className="flex flex-col">
              <span className="text-[15px] font-bold tracking-[-0.01em] text-nb-ink">
                {node.label}
              </span>
              <span className="mt-0.5 text-[13px] leading-snug text-nb-muted">
                {node.detail}
              </span>
            </span>
          </li>
        ))}
      </ol>

      <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-start lg:gap-14">
        <div className="grid gap-4 sm:grid-cols-2">
          {system.components.map((c) => (
            <div
              key={c.name}
              className="flex flex-col gap-2.5 rounded-nb-card bg-nb-surface p-5 shadow-nb-warm"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <h3 className="text-[17px] font-bold tracking-[-0.015em] text-nb-ink">
                  {c.name}
                </h3>
                {"claimId" in c && c.claimId ? <ClaimBadge claimId={c.claimId} /> : null}
              </div>
              <p className="text-[14px] leading-relaxed text-nb-muted">{c.text}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center gap-4 lg:sticky lg:top-24">
          <PhoneMockup screen="dashboard" />
          <p className="max-w-[320px] text-center text-[13px] leading-relaxed text-nb-muted">
            The caregiver&rsquo;s view. Every resting status is teal; the amber and red states are
            reserved for real changes.
          </p>
        </div>
      </div>
    </Section>
  );
}
