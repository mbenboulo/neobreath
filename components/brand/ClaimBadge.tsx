import { claim as lookupClaim } from "@/content/claims";
import { claimTier, type ClaimTier } from "@/design/tokens";

/**
 * ClaimBadge — the honesty device (AGENTS.md §4, §9 rule 4).
 *
 * Every capability or medical statement on the site renders one of these. The
 * tier is always carried by TEXT, never by color alone, so it survives
 * greyscale and color-blindness — the same rule that governs status chips.
 *
 * Server component: no state, no client JS. It is used in page bodies only.
 */

const TIER_STYLES: Record<
  ClaimTier,
  { className: string; icon: string; label: string; help: string }
> = {
  [claimTier.today]: {
    className: "bg-nb-primary-wash text-nb-primary",
    icon: "check_circle",
    label: claimTier.today,
    help: "Built and demonstrated in the current prototype.",
  },
  [claimTier.inDevelopment]: {
    className: "bg-nb-watching-wash text-nb-watching-ink",
    icon: "pending",
    label: claimTier.inDevelopment,
    help: "Active engineering or research work. Not finished.",
  },
  [claimTier.research]: {
    className: "bg-nb-critical-wash text-nb-critical-ink",
    icon: "science",
    label: claimTier.research,
    help: "Future direction. Not yet validated, not yet built, not yet available.",
  },
};

interface ClaimBadgeProps {
  /** Registered claim id from content/claims.ts. Typos throw at render. */
  claimId: string;
  /** Render the tier across two lines for narrow columns. */
  stacked?: boolean;
  className?: string;
}

export default function ClaimBadge({
  claimId,
  stacked = false,
  className = "",
}: ClaimBadgeProps) {
  const c = lookupClaim(claimId);
  const style = TIER_STYLES[c.tier];

  // The caveat is the whole point of the badge — always expose it to AT.
  const title = c.caveat ? `${style.help} ${c.caveat}` : style.help;

  return (
    <span
      title={title}
      /*
       * `w-fit` is load-bearing, not cosmetic. This is an inline-flex element,
       * and as a direct child of a `flex flex-col` container it inherits
       * `align-items: stretch` and stretches to the full card width — a badge
       * becomes a full-width bar. Constraining the width fixes it in every
       * container rather than at each call site.
       */
      className={`inline-flex w-fit items-center gap-1 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase leading-[14px] tracking-[0.04em] ${style.className} ${
        stacked ? "flex-col gap-0.5 text-center" : ""
      } ${className}`}
    >
      <span aria-hidden="true" className="nb-icon text-[13px]">
        {style.icon}
      </span>
      <span>{style.label}</span>
      <span className="sr-only">
        — {style.help}
        {c.caveat ? ` ${c.caveat}` : ""}
      </span>
    </span>
  );
}
