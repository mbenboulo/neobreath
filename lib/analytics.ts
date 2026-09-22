import { track } from "@vercel/analytics";

/**
 * Thin, failure-proof wrapper over Vercel Analytics.
 *
 * Analytics must never break a page. `track` touches `window`, so it is guarded
 * for SSR/prerender, and a throw from a blocked script or an extension is
 * swallowed rather than allowed to interrupt playback or navigation.
 */
export function capture(
  event: string,
  properties?: Record<string, string | number | boolean>
): void {
  if (typeof window === "undefined") return;
  try {
    track(event, properties);
  } catch {
    /* analytics is best-effort; never surface it to the visitor */
  }
}
