/**
 * Mirror design/tokens.ts into the sibling Remotion project.
 *
 * The Remotion project lives OUTSIDE this workspace, so it cannot import from
 * here. This script is the sync half of that contract (AGENTS.md §3).
 *
 *   node scripts/sync-tokens.mjs          # write the mirror
 *   node scripts/sync-tokens.mjs --check  # verify only, exit 1 on drift
 *
 * `--check` is what CI should run: it fails the build when the two copies of the
 * token contract have diverged, instead of letting the animations drift silently
 * away from the website's brand.
 */

import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..");

const SOURCE = resolve(repoRoot, "design/tokens.ts");

/**
 * tokens.ts is generated into TWO places, and this script is its ONLY owner.
 *
 *   1. `remotion/tokens.ts`          — so the canonical animation tree typechecks
 *   2. `../src/neobreath/tokens.ts`  — the mirror the Remotion CLI renders from
 *
 * `sync-anim.mjs` deliberately does NOT generate tokens.ts (it would then have
 * two owners writing the same file with different headers, and `tokens:check`
 * and `anim:check` would each fail on the other's output). It treats
 * `remotion/tokens.ts` as an ordinary file and copies it with the tree.
 *
 * NOTE: this repo lives INSIDE the Remotion project's directory
 * (..\remotion\neobreath), so the sibling project root is `repoRoot/..`.
 * Getting this wrong yields a doubled `remotion\remotion` path.
 */
const TARGETS = [
  resolve(repoRoot, "remotion/tokens.ts"),
  resolve(repoRoot, "..", "src/neobreath/tokens.ts"),
];

const BANNER = `// ─────────────────────────────────────────────────────────────────────────────
// GENERATED MIRROR — DO NOT EDIT.
//
// Source of truth: neobreath/design/tokens.ts
// Regenerate with:  npm run tokens:sync   (from the neobreath repo)
//
// This file is generated into both the canonical animation tree and the
// Remotion project's mirror, so that each typechecks on its own. Editing it
// here will be overwritten, and \`npm run tokens:check\` will fail.
// ─────────────────────────────────────────────────────────────────────────────

`;

const check = process.argv.includes("--check");

const source = await readFile(SOURCE, "utf8");
const expected = BANNER + source;

if (check) {
  let failed = false;
  for (const target of TARGETS) {
    let actual = null;
    try {
      actual = await readFile(target, "utf8");
    } catch {
      console.error(`[tokens:check] Missing mirror: ${target}\n               Run: npm run tokens:sync`);
      failed = true;
      continue;
    }
    if (actual !== expected) {
      console.error(`[tokens:check] Drifted: ${target}\n               Run: npm run tokens:sync`);
      failed = true;
    }
  }
  if (failed) process.exit(1);
  console.log(`[tokens:check] ${TARGETS.length} token mirrors in sync with design/tokens.ts`);
  process.exit(0);
}

for (const target of TARGETS) {
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, expected, "utf8");
  console.log(`[tokens:sync] Wrote ${target}`);
}
