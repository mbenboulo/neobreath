/**
 * Measure every video on a page: rendered size, aspect, and which section it is in.
 *
 *   node scripts/measure-videos.mjs [baseUrl]
 *
 * Written to answer "that video looks small" with numbers instead of a guess —
 * the fix for a too-small video and the fix for a too-small *static diagram* are
 * different, and guessing which one the owner meant wastes a round trip.
 */

import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..");
const require = createRequire(import.meta.url);
const { openBrowser } = require(resolve(repoRoot, "../node_modules/@remotion/renderer"));

const base = process.argv[2] ?? "http://localhost:3100";
const ROUTES = ["/", "/technology", "/research"];

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

for (const width of [1280, 1920]) {
  await page.setViewport({ width, height: 1000, deviceScaleFactor: 1 });
  console.log(`\n=== viewport ${width}px ===`);

  for (const route of ROUTES) {
    await page.goto({ url: `${base}${route}`, timeout: 30000 });
    // Walk the page so lazy videos attach.
    await page.evaluate(async () => {
      const step = Math.round(window.innerHeight * 0.8);
      for (let y = 0; y <= document.documentElement.scrollHeight + step; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await new Promise((r) => setTimeout(r, 900));

    const info = await page.evaluate(() => {
      const describe = (el) => {
        const r = el.getBoundingClientRect();
        // Find the nearest ancestor with an id — that is the act/section.
        let node = el;
        let section = "(no id)";
        while (node && node !== document.body) {
          if (node.id) {
            section = `#${node.id}`;
            break;
          }
          node = node.parentElement;
        }
        // Also capture the nearest preceding heading for context.
        let head = "";
        let s = el.closest("section");
        const h = s ? s.querySelector("h1, h2") : null;
        if (h) head = h.textContent.trim().slice(0, 48);
        return {
          kind: "video",
          section,
          heading: head,
          w: Math.round(r.width),
          h: Math.round(r.height),
          src: el.currentSrc ? el.currentSrc.split("/").pop() : "(none)",
        };
      };

      const rows = Array.from(document.querySelectorAll("video")).map(describe);

      // Also report the waveform/diagram SVGs in the problem act, in case that
      // is what "the video" referred to.
      const problem = document.querySelector("#problem");
      if (problem) {
        for (const svg of problem.querySelectorAll("svg")) {
          const r = svg.getBoundingClientRect();
          if (r.width < 40) continue;
          rows.push({
            kind: "svg",
            section: "#problem",
            heading: "waveform card",
            w: Math.round(r.width),
            h: Math.round(r.height),
            src: "-",
          });
        }
      }
      return rows;
    });

    console.log(`\n  ${route}`);
    for (const v of info) {
      console.log(
        `    ${v.kind.padEnd(5)} ${v.section.padEnd(11)} ${String(v.w).padStart(4)}x${String(v.h).padStart(4)}  ${v.src}`
      );
      if (v.kind === "svg" || v.heading) {
        console.log(`          in: ${v.heading}`);
      }
    }
  }
}

await browser.close({ silent: true });
