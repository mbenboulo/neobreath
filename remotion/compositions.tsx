import { Composition } from "remotion";
import { APNEA_EVENT, CLOSED_LOOP, FALSE_ALARM } from "./beats";
import ApneaEvent from "./comps/ApneaEvent";
import FalseAlarm from "./comps/FalseAlarm";
import ClosedLoop from "./comps/ClosedLoop";

/**
 * NeoBreath compositions.
 *
 * All three animations are registered at three aspect ratios. The layout is
 * aspect-aware rather than re-authored per cut (see `useLayout` in theme.ts), so
 * a 9:16 cut is the same composition with different breathing room.
 *
 * THIS FILE DOES NOT TOUCH THE HOST REMOTION PROJECT. NeoBreath has its own
 * entry point (`entry.ts`) and its own `registerRoot`, so the existing
 * `src/Root.tsx` and `src/index.ts` are left exactly as they were. Render with:
 *
 *   npx remotion render src/neobreath/entry.ts NeoBreathApneaEvent out\apnea-event-16x9.mp4
 *   npx remotion studio src/neobreath/entry.ts
 */

/** The three cuts each animation ships in. */
export const ASPECTS = [
  { suffix: "16x9", width: 1920, height: 1080 },
  { suffix: "1x1", width: 1080, height: 1080 },
  { suffix: "9x16", width: 1080, height: 1920 },
] as const;

const ANIMATIONS = [
  {
    id: "NeoBreathApneaEvent",
    component: ApneaEvent,
    durationInFrames: APNEA_EVENT.durationInFrames,
    fps: APNEA_EVENT.fps,
  },
  {
    id: "NeoBreathFalseAlarm",
    component: FalseAlarm,
    durationInFrames: FALSE_ALARM.durationInFrames,
    fps: FALSE_ALARM.fps,
  },
  {
    id: "NeoBreathClosedLoop",
    component: ClosedLoop,
    durationInFrames: CLOSED_LOOP.durationInFrames,
    fps: CLOSED_LOOP.fps,
  },
] as const;

export const NeoBreathCompositions: React.FC = () => {
  return (
    <>
      {ANIMATIONS.map((anim) =>
        ASPECTS.map((aspect) => (
          <Composition
            key={`${anim.id}-${aspect.suffix}`}
            id={`${anim.id}-${aspect.suffix}`}
            component={anim.component}
            durationInFrames={anim.durationInFrames}
            fps={anim.fps}
            width={aspect.width}
            height={aspect.height}
          />
        ))
      )}
    </>
  );
};
