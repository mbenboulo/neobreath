import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Link from "next/link";
import Navbar from "@/components/brand/Navbar";
import Footer from "@/components/brand/Footer";
import Section from "@/components/brand/Section";
import Eyebrow from "@/components/brand/Eyebrow";
import ClaimBadge from "@/components/brand/ClaimBadge";
import StoryVideo from "@/components/brand/StoryVideo";
import PhoneMockup from "@/components/brand/PhoneMockup";
import { animations } from "@/content/animations";
import { technologyPage } from "@/content/copy";

export const metadata: Metadata = pageMetadata({
  path: "/technology",
  title: "Technology",
  description:
    "How the NeoBreath system is put together: sensing, on-board signal processing, event detection, vibrotactile intervention and caregiver notification.",
});

/**
 * /technology — the deep dive.
 *
 * The previous version of this page described a central processing hub, cited a
 * "multi-node architecture", and displayed 85% / 75% / 60% progress bars plus a
 * 6-hour battery figure. None of that was measured. All of it is gone, and the
 * `corrected` block below states what changed and why, so the correction is on
 * the record rather than quietly deleted.
 */
export default function TechnologyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <Section tone="canvas" width="wide" className="pt-10 md:pt-14">
          <Eyebrow>{technologyPage.eyebrow}</Eyebrow>
          <h1 className="mt-2 max-w-[760px] text-[34px] font-extrabold leading-[1.1] tracking-[-0.03em] text-nb-ink md:text-[46px]">
            {technologyPage.title}
          </h1>
          <p className="mt-4 max-w-[720px] text-[16px] leading-relaxed text-nb-muted md:text-[17px]">
            {technologyPage.lede}
          </p>

          {/* The pipeline. Numbered because the order is the design. */}
          <ol className="mt-10 flex flex-col gap-3">
            {technologyPage.stages.map((s, i) => (
              <li
                key={s.name}
                className="grid gap-3 rounded-nb-card bg-nb-surface p-5 shadow-nb-warm sm:grid-cols-[auto_minmax(0,200px)_minmax(0,1fr)_auto] sm:items-start sm:gap-5"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-nb-primary text-[14px] font-extrabold text-nb-on-primary">
                  {i + 1}
                </span>
                <h2 className="text-[17px] font-bold tracking-[-0.015em] text-nb-ink">
                  {s.name}
                </h2>
                <p className="text-[15px] leading-relaxed text-nb-muted">{s.text}</p>
                <div className="justify-self-start sm:justify-self-end">
                  <ClaimBadge claimId={s.claimId} />
                </div>
              </li>
            ))}
          </ol>
        </Section>

        <Section tone="warm">
          <h2 className="max-w-[640px] text-[28px] font-extrabold leading-tight tracking-[-0.02em] text-nb-ink md:text-[34px]">
            {technologyPage.focusTitle}
          </h2>
          <p className="mt-4 max-w-[700px] text-[16px] leading-relaxed text-nb-muted">
            {technologyPage.focusIntro}
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {technologyPage.focus.map((f) => (
              <div
                key={f.name}
                className="flex flex-col gap-3 rounded-nb-card bg-nb-surface p-5 shadow-nb-warm"
              >
                <h3 className="text-[16px] font-bold tracking-[-0.01em] text-nb-ink">
                  {f.name}
                </h3>
                <p className="text-[14px] leading-relaxed text-nb-muted">{f.text}</p>
                <div className="mt-auto pt-1">
                  <ClaimBadge claimId={f.claimId} />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <StoryVideo
              src={animations.apneaEvent.src}
              srcPortrait={animations.apneaEvent.srcPortrait}
              poster={animations.apneaEvent.poster}
              posterPortrait={animations.apneaEvent.posterPortrait}
              label="Animation of the NeoBreath sensing and response pipeline"
              caption={animations.apneaEvent.framing}
            />
          </div>
        </Section>

        <Section tone="canvas" width="wide">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-14">
            <div>
              <h2 className="text-[28px] font-extrabold leading-tight tracking-[-0.02em] text-nb-ink md:text-[34px]">
                The caregiver&rsquo;s view
              </h2>
              <p className="mt-4 max-w-[620px] text-[16px] leading-relaxed text-nb-muted">
                The app shows a live trace, current vitals and event history. Its resting state is
                calm and monochrome on purpose: an interface that looks alarming when nothing is
                wrong trains people to ignore it.
              </p>

              <div className="mt-8 flex flex-wrap gap-8">
                <PhoneMockup screen="dashboard" />
                <PhoneMockup screen="alert" />
              </div>
            </div>

            <aside className="rounded-nb-card border border-nb-hairline bg-nb-surface-warm p-6 lg:max-w-[420px]">
              <h2 className="text-[17px] font-bold tracking-[-0.015em] text-nb-ink">
                {technologyPage.correctedTitle}
              </h2>
              <p className="mt-3 text-[14px] leading-relaxed text-nb-muted">
                {technologyPage.corrected}
              </p>
              <Link
                href="/research"
                className="mt-4 inline-flex items-center gap-1.5 text-[14px] font-bold text-nb-primary hover:underline"
              >
                Read the research direction
                <span className="nb-icon text-[16px]" aria-hidden="true">
                  arrow_forward
                </span>
              </Link>
            </aside>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
