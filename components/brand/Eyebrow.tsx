import type { ReactNode } from "react";

/**
 * Eyebrow — the small uppercase label above every section heading.
 *
 * It labels which act of the story you are reading, not what the marketing team
 * wanted to emphasize.
 *
 * On the dark `ink` surface the deep primary disappears, so those sections use
 * `primaryLight` instead.
 */

interface EyebrowProps {
  children: ReactNode;
  onInk?: boolean;
  className?: string;
}

export default function Eyebrow({
  children,
  onInk = false,
  className = "",
}: EyebrowProps) {
  return (
    <p
      className={`text-[11px] font-bold uppercase tracking-[0.14em] ${
        onInk ? "text-nb-primary-light" : "text-nb-primary"
      } ${className}`}
    >
      {children}
    </p>
  );
}
