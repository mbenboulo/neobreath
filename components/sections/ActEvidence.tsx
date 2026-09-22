import Link from "next/link";
import Section from "@/components/brand/Section";
import Eyebrow from "@/components/brand/Eyebrow";
import ClaimBadge from "@/components/brand/ClaimBadge";
import { cta, evidence } from "@/content/copy";

/**
 * Act VI — Evidence & the ask.
 *
 * Lists what the prototype actually does, INCLUDING the finding that it does not
 * yet do well enough (belt sensitivity). The old site presented four success
 * bullets; publishing the gap is both more honest and more credible to the
 * clinical reader this page is trying to reach.
 *
 * The conference videos and LinkedIn posts are linked from /evidence rather than
 * embedded twice.
 */
export default function ActEvidence() {
  return (
    <Section id="evidence" tone="canvas">
      <Eyebrow>{evidence.eyebrow}</Eyebrow>
      <h2 className="mt-2 max-w-[620px] text-[30px] font-extrabold leading-tight tracking-[-0.02em] text-nb-ink md:text-[38px]">
        {evidence.title}
      </h2>
      <p className="mt-4 max-w-[680px] text-[16px] leading-relaxed text-nb-muted">
        {evidence.body}
      </p>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {evidence.results.map((r) => (
          <li
            key={r.text}
            className="flex flex-col gap-3 rounded-nb-card bg-nb-surface p-5 shadow-nb-warm"
          >
            <p className="text-[15px] leading-relaxed text-nb-ink">{r.text}</p>
            {r.claimId ? <ClaimBadge claimId={r.claimId} /> : null}
          </li>
        ))}
      </ul>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="rounded-nb-card bg-nb-surface p-6 shadow-nb-warm">
          <h3 className="text-[18px] font-extrabold tracking-[-0.02em] text-nb-ink">
            {evidence.showcaseTitle}
          </h3>
          <p className="mt-2 text-[14px] leading-relaxed text-nb-muted">
            {evidence.showcaseBody}
          </p>
          <Link
            href="/evidence"
            className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-bold text-nb-primary hover:underline"
          >
            See the showcase
            <span className="nb-icon text-[16px]" aria-hidden="true">
              arrow_forward
            </span>
          </Link>
        </div>

        <div className="rounded-nb-card bg-nb-surface p-6 shadow-nb-warm">
          <h3 className="text-[18px] font-extrabold tracking-[-0.02em] text-nb-ink">
            {evidence.postsTitle}
          </h3>
          <p className="mt-2 text-[14px] leading-relaxed text-nb-muted">
            {evidence.postsBody}
          </p>
          <Link
            href="/evidence#posts"
            className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-bold text-nb-primary hover:underline"
          >
            Read the posts
            <span className="nb-icon text-[16px]" aria-hidden="true">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>

      {/* The ask, on one dark band so it reads as the close of the story. */}
      <div className="mt-6 rounded-nb-card-lg bg-nb-ink-deep p-7 md:p-10">
        <h3 className="text-[24px] font-extrabold tracking-[-0.02em] text-nb-on-ink md:text-[28px]">
          {evidence.supportTitle}
        </h3>
        <p className="mt-3 max-w-[620px] text-[15px] leading-relaxed text-nb-on-ink/75">
          {evidence.supportBody}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/about"
            className="flex h-12 items-center rounded-full bg-nb-primary px-6 text-[15px] font-bold text-nb-on-primary transition-colors hover:bg-white hover:text-nb-ink-deep"
          >
            {cta.talkToTeam}
          </Link>
          <Link
            href="/research"
            className="flex h-12 items-center rounded-full border border-white/25 px-6 text-[15px] font-semibold text-nb-on-ink transition-colors hover:bg-white/10"
          >
            {cta.readResearch}
          </Link>
        </div>
      </div>
    </Section>
  );
}
