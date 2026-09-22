import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Navbar from "@/components/brand/Navbar";
import Footer from "@/components/brand/Footer";
import Section from "@/components/brand/Section";
import Eyebrow from "@/components/brand/Eyebrow";
import ClaimBadge from "@/components/brand/ClaimBadge";
import { evidence, evidencePage } from "@/content/copy";

export const metadata: Metadata = pageMetadata({
  path: "/evidence",
  title: "Evidence",
  description:
    "Prototype findings for the NeoBreath system, the Pediatric Society of Ghana showcase, and the team's project write-ups.",
});

/**
 * /evidence — what exists and what was shown.
 *
 * ON THE LINKEDIN POSTS: LinkedIn's embed requires a direct post URN
 * (a `urn:li:share:…` URL), and the project supplied `lnkd.in` short links,
 * which cannot be embedded. Rather than fabricate an iframe that renders an
 * error, each post is a link card that opens the real post. If the owner
 * supplies the direct post URLs, swap `PostCard` for the embed — the fallback
 * below is already the right shape for a no-JS reader.
 */
export default function EvidencePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <Section tone="canvas" width="wide" className="pt-10 md:pt-14">
          <Eyebrow>{evidencePage.eyebrow}</Eyebrow>
          <h1 className="mt-2 max-w-[760px] text-[34px] font-extrabold leading-[1.1] tracking-[-0.03em] text-nb-ink md:text-[46px]">
            {evidencePage.title}
          </h1>
          <p className="mt-4 max-w-[720px] text-[16px] leading-relaxed text-nb-muted md:text-[17px]">
            {evidencePage.lede}
          </p>
        </Section>

        <Section tone="warm">
          <h2 className="text-[28px] font-extrabold leading-tight tracking-[-0.02em] text-nb-ink md:text-[34px]">
            {evidencePage.resultsTitle}
          </h2>
          <p className="mt-3 max-w-[700px] text-[16px] leading-relaxed text-nb-muted">
            {evidencePage.resultsIntro}
          </p>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
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
        </Section>

        <Section tone="canvas" width="wide">
          <h2 className="text-[28px] font-extrabold leading-tight tracking-[-0.02em] text-nb-ink md:text-[34px]">
            {evidencePage.showcaseTitle}
          </h2>
          <p className="mt-3 max-w-[700px] text-[16px] leading-relaxed text-nb-muted">
            {evidencePage.showcaseBody}
          </p>

          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            {evidencePage.videos.map((v) => (
              <figure key={v.src} className="flex flex-col gap-3">
                {/*
                  `preload="metadata"` fetches only headers. These two clips total
                  ~24 MB, and eagerly buffering both would cost a visitor far more
                  than they asked for.
                */}
                <video
                  controls
                  preload="metadata"
                  playsInline
                  className="w-full rounded-nb-card bg-nb-ink-deep shadow-nb-warm"
                  aria-label={v.label}
                >
                  <source src={v.src} type="video/mp4" />
                  Your browser cannot play this video.{" "}
                  <a href={v.src} className="underline">
                    Download it instead
                  </a>
                  .
                </video>
                <figcaption className="text-[13px] leading-relaxed text-nb-muted">
                  {v.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </Section>

        <Section id="posts" tone="warm">
          <h2 className="text-[28px] font-extrabold leading-tight tracking-[-0.02em] text-nb-ink md:text-[34px]">
            {evidencePage.postsTitle}
          </h2>
          <p className="mt-3 max-w-[700px] text-[16px] leading-relaxed text-nb-muted">
            {evidencePage.postsBody}
          </p>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {evidencePage.posts.map((p) => (
              <a
                key={p.url}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-4 rounded-nb-card bg-nb-surface p-5 shadow-nb-warm transition-colors hover:bg-nb-surface-warm"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-nb-primary-wash text-nb-primary"
                  aria-hidden="true"
                >
                  <span className="nb-icon text-2xl">link</span>
                </span>
                <span className="flex flex-col gap-1">
                  <span className="text-[15px] font-semibold leading-snug text-nb-ink group-hover:text-nb-primary">
                    {p.label}
                  </span>
                  <span className="text-[12px] font-medium text-nb-muted">
                    Opens on LinkedIn in a new tab
                  </span>
                </span>
              </a>
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
