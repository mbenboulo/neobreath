import { registerRoot } from "remotion";
import { NeoBreathCompositions } from "./compositions";

/**
 * NeoBreath's own Remotion entry point.
 *
 * This exists so the NeoBreath animations are fully isolated from the host
 * Remotion project: its `src/index.ts` and `src/Root.tsx` are never modified,
 * and its existing compositions are never touched.
 *
 *   npx remotion studio  src/neobreath/entry.ts
 *   npx remotion render  src/neobreath/entry.ts NeoBreathApneaEvent-16x9 out/apnea.mp4
 */
registerRoot(NeoBreathCompositions);
