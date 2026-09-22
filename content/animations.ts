/**
 * The three rendered animations, in one place.
 *
 * Every path here must exist in `public/animations/`. Pages import these rather
 * than hardcoding filenames, so a re-render with a changed name is a one-line
 * change and a typo is caught by the `ANIMATION_ASSETS` check below.
 */

export interface AnimationAsset {
  id: string;
  /** Shown as the figcaption and used as the video's accessible label. */
  title: string;
  /** On-page framing for a visitor who never presses play. */
  framing: string;
  src: string;
  srcPortrait: string;
  /** 16:9 poster — matches `src`, for the in-page player. */
  poster: string;
  /** 1:1 poster — used as the social card image (no letterboxing in a feed). */
  posterSquare: string;
  /** 9:16 poster — for narrow-viewport social placements. */
  posterPortrait: string;
  /** Which act of the story this belongs to. */
  act: string;
}

export const animations = {
  apneaEvent: {
    id: "apnea-event",
    title: "Anatomy of an apnea event",
    framing:
      "Sensing, interpretation, intervention and notification — in the order they actually happen.",
    src: "/animations/apnea-event-16x9.mp4",
    srcPortrait: "/animations/apnea-event-9x16.mp4",
    poster: "/animations/apnea-event-poster.png",
    posterSquare: "/animations/apnea-event-1x1-poster.png",
    posterPortrait: "/animations/apnea-event-9x16-poster.png",
    act: "Act III — The System",
  },
  falseAlarm: {
    id: "false-alarm",
    title: "Why false alarms happen",
    framing:
      "Two signals a threshold rule cannot tell apart, and the extra channels that can.",
    src: "/animations/false-alarm-16x9.mp4",
    srcPortrait: "/animations/false-alarm-9x16.mp4",
    poster: "/animations/false-alarm-poster.png",
    posterSquare: "/animations/false-alarm-1x1-poster.png",
    posterPortrait: "/animations/false-alarm-9x16-poster.png",
    act: "Act IV — The Intelligence",
  },
  closedLoop: {
    id: "closed-loop",
    title: "The closed loop",
    framing:
      "Where the work stands today, and the two steps that are still research.",
    src: "/animations/closed-loop-16x9.mp4",
    srcPortrait: "/animations/closed-loop-9x16.mp4",
    poster: "/animations/closed-loop-poster.png",
    posterSquare: "/animations/closed-loop-1x1-poster.png",
    posterPortrait: "/animations/closed-loop-9x16-poster.png",
    act: "Act V — The Direction",
  },
} as const satisfies Record<string, AnimationAsset>;

export type AnimationKey = keyof typeof animations;

/**
 * Social card per route.
 *
 * A 1:1 crop is used rather than 16:9: link previews are rendered square or
 * near-square, and a 16:9 image gets letterboxed into a small band or cropped
 * through the middle of the artwork. The square posters are real renders of the
 * same compositions, so the card is the work rather than a stock photo.
 */
export const socialImage: Record<string, string> = {
  "/": animations.apneaEvent.posterSquare,
  "/technology": animations.apneaEvent.posterSquare,
  "/research": animations.closedLoop.posterSquare,
  "/evidence": animations.falseAlarm.posterSquare,
  "/about": animations.apneaEvent.posterSquare,
};

/**
 * Every asset the site references, for the build-time existence check in
 * `scripts/check-assets.mjs` (`npm run assets:check`).
 */
export const ANIMATION_ASSETS: string[] = Object.values(animations).flatMap((a) => [
  a.src,
  a.srcPortrait,
  a.poster,
  a.posterSquare,
  a.posterPortrait,
]);
