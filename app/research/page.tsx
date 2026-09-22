import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import Navbar from "@/components/brand/Navbar";
import Footer from "@/components/brand/Footer";
import Section from "@/components/brand/Section";
import Eyebrow from "@/components/brand/Eyebrow";
import ClaimBadge from "@/components/brand/ClaimBadge";
import StoryVideo from "@/components/brand/StoryVideo";
import { animations } from "@/content/animations";
import { cta, researchPage } from "@/content/copy";

export const metadata: Metadata = pageMetadata({
  path: "/research",
  title: "Research",
  description:
    "The NeoBreath AI research direction: reducing false apnea alarms through signal interpretation and artifact rejection, and the roadmap toward personalized, predictive monitoring.",
});

/**
 * /research — the AI direction.
 *
 * The closing "what this page does not claim" list is the most important element
 * here. It is the page a clinician or reviewer will read most sceptically, so it
 * states the negatives explicitly rather than leaving them implied by hedged
 * wording elsewhere.
 */
export default function ResearchPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <Section tone="canvas" width="wide" className="pt-10 md:pt-14">
          <Eyebrow>{researchPage.eyebrow}</Eyebrow>
          <h1 className="mt-2 max-w-[760px] text-[34px] font-extrabold leading-[1.1] tracking-[-0.03em] text-nb-ink md:text-[46px]">
            {researchPage.title}
          </h1>
          <p className="mt-4 max-w-[720px] text-[16px] leading-relaxed text-nb-muted md:text-[17px]">
            {researchPage.lede}
          </p>

          <div className="mt-10 rounded-nb-card-lg bg-nb-surface p-6 shadow-nb-warm md:p-8">
            <h2 className="text-[22px] font-extrabold tracking-[-0.02em] text-nb-ink">
              {researchPage.framingTitle}
            </h2>
            <p className="mt-3 max-w-[760px] text-[15px] leading-relaxed text-nb-muted">
              {researchPage.framing}
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
            />
          </div>
        </Section>

        <Section tone="ink">
          <Eyebrow onInk>Literature</Eyebrow>
          <h2 className="mt-2 max-w-[640px] text-[28px] font-extrabold leading-tight tracking-[-0.02em] text-nb-on-ink md:text-[34px]">
            {researchPage.literatureTitle}
          </h2>

          <ul className="mt-8 flex flex-col gap-4">
            {researchPage.literature.map((l) => (
              <li
                key={l.text}
                className="flex flex-col gap-3 rounded-nb-card border border-white/10 bg-white/[0.06] p-5 md:flex-row md:items-center md:justify-between"
              >
                <p className="max-w-[720px] text-[15px] leading-relaxed text-nb-on-ink/80">
                  {l.text}
                </p>
                <div className="shrink-0">
                  <ClaimBadge claimId={l.claimId} />
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-6 max-w-[760px] text-[14px] leading-relaxed text-nb-on-ink/60">
            We cite this work because it supports the research direction. It is not evidence about
            NeoBreath, and we do not present it as such.
          </p>
        </Section>

        <Section tone="warm">
          <h2 className="text-[28px] font-extrabold leading-tight tracking-[-0.02em] text-nb-ink md:text-[34px]">
            {researchPage.notClaimedTitle}
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {researchPage.notClaimed.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 rounded-nb-card bg-nb-surface p-5 shadow-nb-warm"
              >
                <span
                  className="nb-icon mt-0.5 shrink-0 text-[20px] text-nb-critical"
                  aria-hidden="true"
                >
                  block
                </span>
                <span className="text-[15px] leading-relaxed text-nb-ink">{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-10">
            <StoryVideo
              src={animations.closedLoop.src}
              srcPortrait={animations.closedLoop.srcPortrait}
              poster={animations.closedLoop.poster}
              posterPortrait={animations.closedLoop.posterPortrait}
              label="Animation showing the closed loop and the project roadmap"
              caption={animations.closedLoop.framing}
            />
          </div>
        </Section>

        <Section tone="canvas">
          <div className="rounded-nb-card-lg bg-nb-ink-deep p-7 md:p-10">
            <h2 className="text-[24px] font-extrabold tracking-[-0.02em] text-nb-on-ink md:text-[28px]">
              Work on this with us
            </h2>
            <p className="mt-3 max-w-[620px] text-[15px] leading-relaxed text-nb-on-ink/75">
              Artifact rejection on low-power wearable hardware is the open technical problem. If
              that is your area, we would like to talk.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex h-12 items-center rounded-full bg-nb-primary px-6 text-[15px] font-bold text-nb-on-primary transition-colors hover:bg-white hover:text-nb-ink-deep"
            >
              {cta.talkToTeam}
            </Link>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
