/**
 * Screenshot the built site with Remotion's bundled headless Chrome.
 *
 *   node scripts/shoot.mjs [baseUrl]
 *
 * WHY THIS EXISTS
 * ---------------
 * `tsc`, `lint` and inspecting prerendered HTML all verify the markup. None of
 * them verify that the page LOOKS right — that nothing overflows, overlaps, or
 * collapses at a given width. That needs a renderer.
 *
 * Remotion already ships a headless Chrome (the same binary it uses to render
 * video), so no new browser dependency is needed: `@remotion/renderer` is
 * imported from the sibling Remotion project.
 *
 * Output goes to `.shots/` and is scratch — delete it when done.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..");

const require = createRequire(import.meta.url);
const REMOTION_RENDERER = resolve(
  repoRoot,
  "../node_modules/@remotion/renderer"
);
const { openBrowser } = require(REMOTION_RENDERER);

const base = process.argv[2] ?? "http://localhost:3100";
/**
 * Scratch output lives under `.local/` (git-ignored) rather than `.shots/` at the
 * repo root, so a screenshot run cannot add an untracked directory to a clean tree.
 */
const outDir = join(repoRoot, ".local/shots");
await mkdir(outDir, { recursive: true });

const VIEWPORTS = [
  { name: "mobile", width: 390, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "laptop", width: 1280, height: 900 },
  { name: "desktop", width: 1920, height: 1080 },
];

const ROUTES = ["/", "/technology", "/research", "/evidence", "/about"];

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

/**
 * Capture the current viewport as a PNG buffer.
 *
 * Remotion's Page deliberately exposes no `screenshot()`, so this drops to the
 * raw CDP session. `Page.captureScreenshot` resolves to
 * `{ value: { data: <base64> }, size: <bytes> }` — note the extra nesting, and
 * that it is `data`, not puppeteer's flat `data` field.
 */
const shoot = async ({ beyondViewport = false } = {}) => {
  const res = await page._client().send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: beyondViewport,
  });
  const b64 = res?.value?.data;
  if (typeof b64 !== "string") {
    throw new Error(
      `Unexpected screenshot payload: ${JSON.stringify(res).slice(0, 120)}`
    );
  }
  return Buffer.from(b64, "base64");
};

const shots = [];

for (const route of ROUTES) {
  for (const vp of VIEWPORTS) {
    await page.setViewport({ width: vp.width, height: vp.height, deviceScaleFactor: 1 });

    // `goto` takes an OBJECT, not a URL string.
    await page.goto({ url: `${base}${route}`, timeout: 30000 });
    // Let fonts settle and lazy videos attach.
    await new Promise((r) => setTimeout(r, 900));

    const slug = `${route === "/" ? "home" : route.slice(1)}-${vp.name}`;

    // Above-the-fold view at every size — this is what a visitor actually sees.
    await writeFile(join(outDir, `${slug}.png`), await shoot());

    // Measure horizontal overflow, the failure mode a screenshot shows but does
    // not quantify.
    const metrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      docHeight: document.documentElement.scrollHeight,
      overflowing: Array.from(document.querySelectorAll("*"))
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.width > 0 && (r.right > window.innerWidth + 1 || r.left < -1);
        })
        .slice(0, 6)
        .map((el) => {
          const r = el.getBoundingClientRect();
          const cls = typeof el.className === "string" ? el.className.slice(0, 55) : "";
          return `${el.tagName.toLowerCase()}.${cls} right=${Math.round(r.right)} left=${Math.round(r.left)}`;
        }),
    }));

    shots.push({ route, vp: vp.name, ...metrics });

    // Full-page render at the two sizes most likely to reveal layout drift.
    if (vp.name === "mobile" || vp.name === "desktop") {
      await writeFile(join(outDir, `${slug}-full.png`), await shoot({ beyondViewport: true }));
    }
  }
}

await browser.close({ silent: true });

// ── Section sweep ───────────────────────────────────────────────────────────
//
// The home page is ~8,700px tall on desktop and ~13,600px on mobile, so an
// above-the-fold shot only ever shows Act I. These captures scroll down in
// viewport-sized steps so Acts III–VI can be reviewed too.

if (process.env.SHOOT_SECTIONS !== "0") {
  const browser2 = await openBrowser("chrome", {
    logLevel: "error",
    indent: false,
    chromeMode: "headless-shell",
  });
  const p2 = await browser2.newPage({
    context: null,
    logLevel: "error",
    indent: false,
    onBrowserLog: null,
  });

  const VP = { width: 1280, height: 900 };
  await p2.setViewport({ ...VP, deviceScaleFactor: 1 });
  await p2.goto({ url: `${base}/`, timeout: 30000 });
  await new Promise((r) => setTimeout(r, 1200));

  const total = await p2.evaluate(() => document.documentElement.scrollHeight);
  const steps = Math.ceil(total / VP.height);

  for (let i = 1; i < steps; i++) {
    await p2.evaluate((y) => window.scrollTo(0, y), i * VP.height);
    // Let scroll-reveal animations settle before capturing.
    await new Promise((r) => setTimeout(r, 700));
    const res = await p2._client().send("Page.captureScreenshot", { format: "png" });
    await writeFile(
      join(outDir, `home-section-${String(i).padStart(2, "0")}.png`),
      Buffer.from(res.value.data, "base64")
    );
  }

  await browser2.close({ silent: true });
  console.log(`\n${steps - 1} home-page section shots written.`);
}

// ── Report ──────────────────────────────────────────────────────────────────

let overflowCount = 0;
console.log("Route / viewport sweep\n");
for (const s of shots) {
  const over = s.scrollWidth > s.clientWidth + 1;
  if (over) overflowCount++;
  const mark = over ? "OVERFLOW" : "ok";
  console.log(
    `  ${mark.padEnd(9)} ${s.route.padEnd(12)} ${s.vp.padEnd(8)} scrollW=${s.scrollWidth} clientW=${s.clientWidth} height=${s.docHeight}`
  );
  for (const o of s.overflowing) console.log(`      ! ${o}`);
}

console.log(`\n${shots.length} shots written to .shots/`);
if (overflowCount > 0) {
  console.error(`[shoot] ${overflowCount} route/viewport combination(s) overflow horizontally.`);
  process.exit(1);
}
console.log("[shoot] no horizontal overflow at any tested viewport.");
