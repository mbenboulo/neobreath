/**
 * Fail the build when a referenced asset is missing.
 *
 * A typo in an animation path is invisible to `tsc` and `lint`, and on a deployed
 * site it surfaces as a broken video rather than an error. This turns it into a
 * build failure instead.
 *
 *   node scripts/check-assets.mjs
 *
 * Paths are read out of the source rather than imported, so this stays
 * dependency-free and does not need a TS loader.
 */

import { existsSync } from "node:fs";
import { readFile } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..");

const SOURCES = ["content/animations.ts", "content/copy.ts"];

const paths = new Set();
for (const rel of SOURCES) {
  const src = await readFile(join(repoRoot, rel), "utf8");
  for (const m of src.matchAll(/["'](\/[A-Za-z0-9._/-]+\.(?:mp4|png|webm|svg|jpg|webp))["']/g)) {
    paths.add(m[1]);
  }
}

if (paths.size === 0) {
  console.error("[assets:check] No asset paths found. Did content/animations.ts move?");
  process.exit(1);
}

const missing = [];
for (const p of paths) {
  if (!existsSync(join(repoRoot, "public", p.replace(/^\//, "")))) missing.push(p);
}

if (missing.length > 0) {
  console.error(`[assets:check] ${missing.length} referenced asset(s) missing from public/:`);
  for (const m of missing) console.error(`  ${m}`);
  console.error("\n  Re-render (AGENTS.md §6) or fix the path.");
  process.exit(1);
}

console.log(`[assets:check] ${paths.size} referenced assets present`);
