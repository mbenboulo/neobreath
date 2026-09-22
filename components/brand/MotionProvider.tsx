"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Applies the visitor's reduced-motion preference to EVERY framer-motion
 * animation at once.
 *
 * `FadeIn` and `ScrollReveal` are used on every page and neither checked the OS
 * setting, so every scroll reveal animated regardless. Patching each component
 * would have been the wrong fix: the next animation added would have the same
 * bug. `MotionConfig reducedMotion="user"` makes framer honour
 * `prefers-reduced-motion` globally, so opting out is the default rather than
 * something each component has to remember.
 *
 * NOTE: "user" still allows opacity changes — framer only disables transform and
 * layout animation. That is the intended behaviour: a fade is not the motion
 * that causes discomfort; movement is.
 */
export default function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
