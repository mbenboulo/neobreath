import Link from "next/link";
import Section from "@/components/brand/Section";
import Eyebrow from "@/components/brand/Eyebrow";
import StoryVideo from "@/components/brand/StoryVideo";
import { animations } from "@/content/animations";
import { cta, hero } from "@/content/copy";

/**
 * Act I — The Pause.
 *
 * The hero has one job: make the problem land before explaining the product. The
 * animation sits in the hero rather than behind a "watch" link, because the
 * mechanism is the argument and a visitor should not have to opt in to it.
 *
 * The status note ("in development — not yet clinically validated") is inside
 * the hero, not only in the footer. A visitor who reads one screen must not come
 * away thinking this is a shipping product.
 */
export default function ActHero() {
  return (
    <Section id="top" tone="canvas" width="max" className="pt-10 md:pt-16">
      {/*
        The animation column is weighted 1.25 against the text's 1, and the gap is
        48px rather than 56px, so the 16:9 frame gets the extra room. Combined with
        the `max` container this takes the hero animation from 553px to ~650-670px
        wide; rebalancing the grid alone would have done it by narrowing the text,
        which is not a trade worth making on the headline.
      */}
      <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] lg:gap-12">
        <div className="flex flex-col gap-6">
          <Eyebrow>{hero.eyebrow}</Eyebrow>

          <h1 className="text-[36px] font-extrabold leading-[1.1] tracking-[-0.03em] text-nb-ink md:text-[52px]">
            {hero.title}
          </h1>

          <p className="max-w-[560px] text-[16px] leading-relaxed text-nb-muted md:text-[17px]">
            {hero.lede}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/technology"
              className="flex h-12 items-center rounded-full bg-nb-primary px-6 text-[15px] font-bold text-nb-on-primary transition-colors hover:bg-nb-ink-deep"
            >
              {cta.exploreTechnology}
            </Link>
            <Link
              href="/research"
              className="flex h-12 items-center rounded-full border border-nb-outline px-6 text-[15px] font-semibold text-nb-ink transition-colors hover:bg-nb-surface-warm"
            >
              {cta.readResearch}
            </Link>
          </div>

          {/* In-hero honesty, not just footer fine print. */}
          <p className="flex items-start gap-2 text-[13px] font-semibold leading-relaxed text-nb-watching-ink">
            <span className="nb-icon mt-0.5 text-[15px]" aria-hidden="true">
              warning
            </span>
            {hero.statusNote}
          </p>
        </div>

        <StoryVideo
          src={animations.apneaEvent.src}
          srcPortrait={animations.apneaEvent.srcPortrait}
          poster={animations.apneaEvent.poster}
          posterPortrait={animations.apneaEvent.posterPortrait}
          label="Animation of the intended NeoBreath system responding to an apnea event"
          caption={hero.animationCaption}
        />
      </div>
    </Section>
  );
}
