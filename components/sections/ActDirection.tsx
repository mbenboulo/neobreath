import Section from "@/components/brand/Section";
import Eyebrow from "@/components/brand/Eyebrow";
import ClaimBadge from "@/components/brand/ClaimBadge";
import StoryVideo from "@/components/brand/StoryVideo";
import { animations } from "@/content/animations";
import { direction } from "@/content/copy";
import { claimTier, type ClaimTier } from "@/design/tokens";

/**
 * Act V — The Direction.
 *
 * The most tempting act to overclaim, because the roadmap is the exciting part.
 * Two structural guards keep it honest:
 *
 *  1. The three levels are rendered as a progression with their tier next to the
 *     level number, so a reader scanning only the headings still sees that two
 *     of the three are research.
 *  2. The closing rail labels every stage with its tier word. The gradient is
 *     legible without decoding a colour.
 */

const TIER_STYLE: Record<ClaimTier, string> = {
  [claimTier.today]: "bg-nb-primary-wash text-nb-primary",
  [claimTier.inDevelopment]: "bg-nb-watching-wash text-nb-watching-ink",
  // `-ink`: the base critical hue fails AA as small text. See design/tokens.ts.
  [claimTier.research]: "bg-nb-critical-wash text-nb-critical-ink",
};

export default function ActDirection() {
  return (
    <Section id="direction" tone="warm">
      <Eyebrow>{direction.eyebrow}</Eyebrow>
      <h2 className="mt-2 max-w-[680px] text-[30px] font-extrabold leading-tight tracking-[-0.02em] text-nb-ink md:text-[38px]">
        {direction.title}
      </h2>
      <p className="mt-4 max-w-[680px] text-[16px] leading-relaxed text-nb-muted">
        {direction.body}
      </p>

      {/* Three levels, each labelled with its tier. */}
      <ol className="mt-10 grid gap-4 lg:grid-cols-3">
        {direction.levels.map((lv, i) => {
          const isOpen = lv.tier === claimTier.today;
          return (
            <li
              key={lv.name}
              className={`flex flex-col rounded-nb-card bg-nb-surface p-6 shadow-nb-warm ${
                isOpen ? "" : "opacity-95"
              }`}
              style={
                isOpen
                  ? undefined
                  : { outline: "1px dashed var(--color-nb-watching)", outlineOffset: "-1px" }
              }
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-nb-muted">
                  {lv.level}
                </span>
                <span
                  className={`rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.04em] ${TIER_STYLE[lv.tier]}`}
                >
                  {lv.tier}
                </span>
              </div>

              <p className="mt-3 text-[26px] font-extrabold tracking-[-0.025em] text-nb-ink">
                {lv.name}
              </p>
              <p className="mt-2 text-[14px] font-semibold leading-snug text-nb-primary">
                {lv.rule}
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-nb-muted">{lv.text}</p>

              <div className="mt-4">
                <ClaimBadge claimId={lv.claimId} />
              </div>

              {i < direction.levels.length - 1 ? (
                <span className="mt-4 text-[12px] font-semibold text-nb-muted">
                  Each level depends on the one before it.
                </span>
              ) : null}
            </li>
          );
        })}
      </ol>

      {/* The loop. */}
      <h3 className="mt-14 text-[20px] font-extrabold tracking-[-0.02em] text-nb-ink">
        {direction.loopTitle}
      </h3>
      <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {direction.loop.map((node, i) => {
          // Predict and Adapt are the two research steps in the loop.
          const isResearch = node.label === "Predict" || node.label === "Adapt";
          return (
            <li
              key={node.label}
              className="flex items-start gap-3 rounded-nb-card bg-nb-surface p-4 shadow-nb-warm"
              style={
                isResearch
                  ? { outline: "1px dashed var(--color-nb-watching)", outlineOffset: "-1px" }
                  : undefined
              }
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[12px] font-extrabold ${
                  isResearch
                    ? "bg-nb-watching-wash text-nb-watching-ink"
                    : "bg-nb-primary text-nb-on-primary"
                }`}
              >
                {i + 1}
              </span>
              <span className="flex flex-col">
                <span className="text-[15px] font-bold text-nb-ink">{node.label}</span>
                <span className="mt-0.5 text-[13px] leading-snug text-nb-muted">
                  {node.detail}
                </span>
              </span>
            </li>
          );
        })}
      </ol>

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

      {/* The rail — the honesty gradient on one line. */}
      <h3 className="mt-14 text-[20px] font-extrabold tracking-[-0.02em] text-nb-ink">
        {direction.railTitle}
      </h3>
      <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {direction.rail.map((stage) => (
          <li
            key={stage.when}
            className="flex flex-col rounded-nb-card bg-nb-surface p-5 shadow-nb-warm"
          >
            <p className="text-[20px] font-extrabold tracking-[-0.02em] text-nb-ink">
              {stage.when}
            </p>
            <span
              className={`mt-2.5 w-fit rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.04em] ${TIER_STYLE[stage.tier]}`}
            >
              {stage.tier}
            </span>
            <p className="mt-3 text-[14px] leading-relaxed text-nb-muted">{stage.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
