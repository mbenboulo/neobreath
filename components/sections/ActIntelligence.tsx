import Section from "@/components/brand/Section";
import Eyebrow from "@/components/brand/Eyebrow";
import ClaimBadge from "@/components/brand/ClaimBadge";
import StoryVideo from "@/components/brand/StoryVideo";
import { animations } from "@/content/animations";
import { intelligence } from "@/content/copy";

/**
 * Act IV — The Intelligence.
 *
 * The most defensible act, and the one most likely to be overclaimed. Three
 * restraints are structural rather than editorial:
 *
 *  1. The heading states the problem in plain language ("a real pause" vs "a
 *     kicking leg") instead of naming a technique.
 *  2. Every work item carries its `IN DEVELOPMENT` badge, so nothing here reads
 *     as shipped.
 *  3. The stimulation block and the provenance block both end on what the
 *     evidence does NOT establish. That sentence is the difference between a
 *     research site and a marketing site.
 */
export default function ActIntelligence() {
  return (
    <Section id="ai" tone="ink">
      <div className="flex flex-col gap-4">
        <Eyebrow onInk>{intelligence.eyebrow}</Eyebrow>
        <h2 className="max-w-[720px] text-[30px] font-extrabold leading-tight tracking-[-0.02em] text-nb-on-ink md:text-[38px]">
          {intelligence.title}
        </h2>
        <p className="max-w-[700px] text-[16px] leading-relaxed text-nb-on-ink/70">
          {intelligence.body}
        </p>
      </div>

      <div className="mt-10">
        <StoryVideo
          src={animations.falseAlarm.src}
          srcPortrait={animations.falseAlarm.srcPortrait}
          poster={animations.falseAlarm.poster}
          posterPortrait={animations.falseAlarm.posterPortrait}
          label="Animation explaining why a threshold rule produces false apnea alarms"
          caption={animations.falseAlarm.framing}
          className="mx-auto max-w-[900px]"
        />
      </div>

      {/* Work in progress. Every item carries its tier badge. */}
      <h3 className="mt-14 text-[20px] font-extrabold tracking-[-0.02em] text-nb-on-ink">
        {intelligence.workTitle}
      </h3>
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {intelligence.work.map((w) => (
          <div
            key={w.name}
            className="flex flex-col gap-2.5 rounded-nb-card border border-white/10 bg-white/[0.06] p-5"
          >
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h4 className="text-[16px] font-bold tracking-[-0.01em] text-nb-on-ink">
                {w.name}
              </h4>
              <ClaimBadge claimId={w.claimId} />
            </div>
            <p className="text-[14px] leading-relaxed text-nb-on-ink/70">{w.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2">
        {/* Candidate models — with the explicit statement that none is chosen. */}
        <div className="rounded-nb-card border border-white/10 bg-white/[0.06] p-6">
          <h4 className="text-[16px] font-bold text-nb-on-ink">{intelligence.modelsTitle}</h4>
          <p className="mt-2 text-[14px] leading-relaxed text-nb-on-ink/70">
            {intelligence.models}
          </p>
          <p className="mt-3 border-l-2 border-nb-watching pl-3 text-[13px] font-medium leading-relaxed text-nb-on-ink/80">
            {intelligence.modelsCaveat}
          </p>
        </div>

        {/* Stimulation. The wording here is unusually careful on purpose. */}
        <div className="rounded-nb-card border border-white/10 bg-white/[0.06] p-6">
          <h4 className="text-[16px] font-bold text-nb-on-ink">
            {intelligence.stimulationTitle}
          </h4>
          <div className="mt-2 flex flex-col gap-3">
            {intelligence.stimulation.map((s) => (
              <div key={s.text} className="flex flex-col gap-2">
                <p className="text-[14px] leading-relaxed text-nb-on-ink/70">{s.text}</p>
                {s.claimId ? <ClaimBadge claimId={s.claimId} /> : null}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Provenance: what we cite, and what it is not evidence of. */}
      <div className="mt-6 rounded-nb-card border border-white/10 bg-white/[0.06] p-6">
        <h4 className="text-[16px] font-bold text-nb-on-ink">
          {intelligence.provenanceTitle}
        </h4>
        <div className="mt-3 flex flex-col gap-3">
          {intelligence.provenance.map((p) => (
            <div key={p.text} className="flex flex-col gap-2">
              <p className="text-[14px] leading-relaxed text-nb-on-ink/70">{p.text}</p>
              {p.claimId ? <ClaimBadge claimId={p.claimId} /> : null}
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
