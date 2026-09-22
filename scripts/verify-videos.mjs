/**
 * Verify the animation players actually autoplay, loop, and pick the right cut.
 *
 *   node scripts/verify-videos.mjs [baseUrl]
 *
 * Asserting this from the DOM is the only honest check: `autoPlay` on a muted
 * video is a *request*, not a guarantee, and a `<source>` list can silently
 * resolve to the wrong file (or none) depending on order and media queries.
 * Neither failure is visible in `tsc`, `lint`, or a screenshot.
 *
 * For every <video> on every route it reports:
 *   - whether playback is actually running (paused === false, currentTime > 0)
 *   - loop and muted, which autoplay depends on
 *   - which file `currentSrc` resolved to, so the 16:9/9:16 swap is provable
 *   - the rendered aspect ratio of its wrapper
 */

import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..");
const require = createRequire(import.meta.url);
const { openBrowser } = require(resolve(repoRoot, "../node_modules/@remotion/renderer"));

const base = process.argv[2] ?? "http://localhost:3100";

/** Routes that contain at least one StoryVideo. */
const ROUTES = ["/", "/technology", "/research"];

/** Must mirror StoryVideo's breakpoint: `sm` = 640px. */
const VIEWPORTS = [
  { name: "mobile", width: 390, height: 900, expect: "9x16" },
  { name: "desktop", width: 1280, height: 900, expect: "16x9" },
];

const browser = await openBrowser("chrome", {
  logLevel: "error",
  indent: false,
  chromeMode: "headless-shell",
});
const page = await browser.newPage({
  context: null,
  logLevel: "error",
  indent: false,
  onBrowserLog: null,
});

const rows = [];
let failures = 0;

for (const route of ROUTES) {
  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });
    await page.goto({ url: `${base}${route}`, timeout: 30000 });

    // Wake every IntersectionObserver: walk down the page so each player
    // attaches its source. Uses documentElement.scrollHeight, not
    // body.scrollHeight — `overflow-x: hidden` on body makes the two disagree,
    // which previously stopped the walk short and silently skipped the last
    // player on a long page. (Playback is then checked one video at a time
    // below: checking them all from the top would be wrong, because a player
    // scrolled out of view is PAUSED BY DESIGN.)
    await page.evaluate(async () => {
      const step = Math.round(window.innerHeight * 0.8);
      for (let y = 0; y <= document.documentElement.scrollHeight + step; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 180));
      }
      window.scrollTo(0, 0);
    });
    await new Promise((r) => setTimeout(r, 1500));

    const count = await page.evaluate(() => document.querySelectorAll("video").length);
    console.log(`  [${route} @ ${vp.name}] ${count} player(s) attached`);

    for (let i = 0; i < count; i++) {
      // Bring this specific player into view, then let it start.
      await page.evaluate((idx) => {
        document.querySelectorAll("video")[idx]?.scrollIntoView({ block: "center" });
      }, i);
      await new Promise((r) => setTimeout(r, 2200));

      const v = await page.evaluate((idx) => {
        const el = document.querySelectorAll("video")[idx];
        if (!el) return null;
        const wrapper = el.parentElement;
        const r = wrapper ? wrapper.getBoundingClientRect() : null;
        return {
          paused: el.paused,
          currentTime: Number(el.currentTime.toFixed(2)),
          loop: el.loop,
          muted: el.muted,
          readyState: el.readyState,
          currentSrc: el.currentSrc ? el.currentSrc.split("/").pop() : "(none)",
          wrapperRatio: r && r.height > 0 ? Number((r.width / r.height).toFixed(3)) : 0,
        };
      }, i);

      if (!v) continue;

      const playing = !v.paused && v.currentTime > 0;
      const wanted = vp.expect === "9x16" ? 0.563 : 1.778;
      const ratioOk = Math.abs(v.wrapperRatio - wanted) < 0.05;
      const fileOk = v.currentSrc.includes(vp.expect);
      const ok = playing && v.loop && v.muted && ratioOk && fileOk;
      if (!ok) failures++;

      rows.push({
        route,
        vp: vp.name,
        index: i,
        ok,
        playing,
        loop: v.loop,
        muted: v.muted,
        file: v.currentSrc,
        fileOk,
        ratio: v.wrapperRatio,
        ratioOk,
        t: v.currentTime,
      });
    }
  }
}

await browser.close({ silent: true });

console.log("Animation playback check\n");
let last = "";
for (const r of rows) {
  const key = `${r.route} @ ${r.vp}`;
  if (key !== last) {
    console.log(`  ${key}`);
    last = key;
  }
  const bits = [
    r.playing ? `playing t=${r.t}s` : "NOT PLAYING",
    r.loop ? "loop" : "NO LOOP",
    r.muted ? "muted" : "NOT MUTED",
    `${r.file}${r.fileOk ? "" : " <- WRONG CUT"}`,
    `ratio ${r.ratio}${r.ratioOk ? "" : " <- WRONG RATIO"}`,
  ];
  console.log(`    ${r.ok ? "ok  " : "FAIL"} video[${r.index}]  ${bits.join("  |  ")}`);
}

console.log("");
if (failures > 0) {
  console.error(`[verify-videos] ${failures} of ${rows.length} player(s) failed.`);
  process.exit(1);
}
console.log(`[verify-videos] all ${rows.length} players autoplay, loop, and load the right cut.`);
