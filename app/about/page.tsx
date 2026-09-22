import type { Metadata } from "next";
import { pageMetadata } from "@/lib/metadata";
import Image from "next/image";
import Navbar from "@/components/brand/Navbar";
import Footer from "@/components/brand/Footer";
import Section from "@/components/brand/Section";
import Eyebrow from "@/components/brand/Eyebrow";
import ClaimBadge from "@/components/brand/ClaimBadge";
import { aboutPage, meta } from "@/content/copy";

export const metadata: Metadata = pageMetadata({
  path: "/about",
  title: "About",
  description:
    "NeoBreath is developed at KNUST with the DIPPER Lab as an engineering and research project for apnea of prematurity.",
});

/**
 * /about — who is building it, and how to help.
 *
 * The team section is deliberately thin: the project material names a research
 * associate and a supervising lab, and inventing a roster to fill the layout
 * would be exactly the kind of fabrication the rest of this rebuild removes.
 * The gap is marked as a gap.
 */
export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <Section tone="canvas" width="wide" className="pt-10 md:pt-14">
          <Eyebrow>{aboutPage.eyebrow}</Eyebrow>
          <h1 className="mt-2 max-w-[760px] text-[34px] font-extrabold leading-[1.1] tracking-[-0.03em] text-nb-ink md:text-[46px]">
            {aboutPage.title}
          </h1>
          <p className="mt-4 max-w-[720px] text-[16px] leading-relaxed text-nb-muted md:text-[17px]">
            {aboutPage.lede}
          </p>
        </Section>

        <Section tone="warm">
          <div className="grid gap-10 md:grid-cols-2 md:gap-14">
            <div>
              <h2 className="text-[24px] font-extrabold tracking-[-0.02em] text-nb-ink">
                {aboutPage.labTitle}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-nb-muted">
                {aboutPage.labBody}
              </p>

              <div className="mt-6 flex items-center gap-8 rounded-nb-card bg-nb-surface p-6 shadow-nb-warm">
                <a
                  href="https://knust.edu.gh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-70"
                  aria-label="KNUST"
                >
                  <Image
                    src="/knust.svg"
                    alt="KNUST"
                    width={72}
                    height={72}
                    className="h-18 w-18 object-contain"
                  />
                </a>
                <a
                  href="https://dipperlab.knust.edu.gh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-opacity hover:opacity-70"
                  aria-label="DIPPER Lab"
                >
                  <Image
                    src="/dipper.svg"
                    alt="DIPPER Lab"
                    width={72}
                    height={72}
                    className="h-18 w-18 object-contain"
                  />
                </a>
              </div>
            </div>

            <div>
              <h2 className="text-[24px] font-extrabold tracking-[-0.02em] text-nb-ink">
                {aboutPage.teamTitle}
              </h2>
              <p className="mt-3 text-[15px] leading-relaxed text-nb-muted">
                {aboutPage.teamBody}
              </p>

              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-start gap-3 rounded-nb-card bg-nb-surface p-5 shadow-nb-warm">
                  <span className="nb-icon mt-0.5 text-[20px] text-nb-watching" aria-hidden="true">
                    pending
                  </span>
                  <p className="text-[14px] leading-relaxed text-nb-ink">
                    A full roster with roles is pending. In the meantime, use the contact form and
                    your message will reach the team.
                  </p>
                </div>
                <div className="flex flex-col gap-2 rounded-nb-card bg-nb-surface p-5 shadow-nb-warm">
                  <p className="text-[15px] leading-relaxed text-nb-ink">
                    One NeoBreath device is dedicated to one infant. Multi-infant triage for a
                    single nurse is not part of this work.
                  </p>
                  <ClaimBadge claimId="one-device-one-infant" />
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section tone="canvas">
          <h2 className="text-[28px] font-extrabold leading-tight tracking-[-0.02em] text-nb-ink md:text-[34px]">
            {aboutPage.collaborateTitle}
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {aboutPage.collaborate.map((c) => (
              <li
                key={c.name}
                className="flex flex-col gap-2 rounded-nb-card bg-nb-surface p-5 shadow-nb-warm"
              >
                <h3 className="text-[16px] font-bold tracking-[-0.01em] text-nb-ink">{c.name}</h3>
                <p className="text-[14px] leading-relaxed text-nb-muted">{c.text}</p>
              </li>
            ))}
          </ul>

          <div className="mt-10 rounded-nb-card-lg border-l-4 border-nb-primary bg-nb-surface px-6 py-5 shadow-nb-warm">
            <p className="text-[15px] font-medium leading-relaxed text-nb-ink">
              {meta.disclaimer}
            </p>
          </div>
        </Section>
      </main>
      <Footer />
    </div>
  );
}
