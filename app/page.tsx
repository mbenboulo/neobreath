import type { Metadata } from "next";
import Navbar from "@/components/brand/Navbar";
import Footer from "@/components/brand/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ActHero from "@/components/sections/ActHero";
import ActProblem from "@/components/sections/ActProblem";
import ActSystem from "@/components/sections/ActSystem";
import ActIntelligence from "@/components/sections/ActIntelligence";
import ActDirection from "@/components/sections/ActDirection";
import ActEvidence from "@/components/sections/ActEvidence";
import { pageMetadata } from "@/lib/metadata";
import { meta } from "@/content/copy";

/*
 * The home route needs its own metadata too. Relying on the root layout's
 * defaults left it without a canonical URL or a social image, so it previewed as
 * a bare link while every sub-page had a card.
 */
export const metadata: Metadata = pageMetadata({
  path: "/",
  title: meta.title,
  description: meta.description,
});

/**
 * The NeoBreath story, in six acts.
 *
 *   I   The Pause        — the problem lands before the product is explained
 *   II  Why It Happens   — and what this is not
 *   III The System       — one belt, one foot module, one app, one infant
 *   IV  The Intelligence — the false-alarm problem the AI work actually solves
 *   V   The Direction    — reactive → preventive → adaptive, labelled honestly
 *   VI  Evidence & ask   — what exists, what was shown, how to help
 *
 * The order is the argument: a visitor cannot reach the roadmap without first
 * passing the scope boundary in Act II. Each act is a component so a section can
 * be revised without disturbing the rest of the page.
 */
export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-grow">
        <ActHero />
        <ScrollReveal direction="up">
          <ActProblem />
        </ScrollReveal>
        <ScrollReveal direction="up">
          <ActSystem />
        </ScrollReveal>
        <ScrollReveal direction="up">
          <ActIntelligence />
        </ScrollReveal>
        <ScrollReveal direction="up">
          <ActDirection />
        </ScrollReveal>
        <ScrollReveal direction="up">
          <ActEvidence />
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  );
}
