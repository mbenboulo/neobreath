/**
 * Push the canonical animation source into the Remotion project.
 *
 * WHY THIS EXISTS
 * ---------------
 * The Remotion project is this repo's PARENT directory (`..`), which means two
 * problems: it is outside this workspace's write sandbox, and it is not version
 * controlled with the website. So animation source is authored here, in
 * `remotion/`, and pushed outwards:
 *
 *     neobreath/remotion/**  --(anim:sync)-->  ../src/neobreath/**
 *
 * That keeps the animation source versioned with the site, and turns every
 * out-of-sandbox write for a round into a single command.
 *
 *   node scripts/sync-anim.mjs          # push
 *   node scripts/sync-anim.mjs --check  # verify, exit 1 on drift
 *
 * ISOLATION
 * ---------
 * This script writes ONLY inside `../src/neobreath/`. It never edits the host
 * project's `src/index.ts` or `src/Root.tsx`, and never touches its existing
 * compositions. NeoBreath has its own entry point (`entry.ts`) with its own
 * `registerRoot`, so the host project is left exactly as it was.
 *
 * The mirrored tree must be SELF-CONTAINED: only relative imports within itself,
 * plus `react` and `remotion`. It cannot reach back into `@/lib` or `@/design`,
 * which is why tokens.ts and waveform.ts are generated into it rather than
 * imported.
 */

import { cp, mkdir, readFile, readdir, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..");

/** Canonical, hand-authored animation source (versioned with the site). */
const SRC = resolve(repoRoot, "remotion");
/** The Remotion project root — this repo's parent. */
const REMOTION_ROOT = resolve(repoRoot, "..");
/** The ONLY directory this script writes to, outside the workspace. */
const DEST = resolve(REMOTION_ROOT, "src/neobreath");

const banner = (source) =>
  `// -----------------------------------------------------------------------------\n` +
  `// GENERATED MIRROR - DO NOT EDIT.\n` +
  `//\n` +
  `// Source of truth: neobreath/${source}\n` +
  `// Regenerate with:  npm run anim:sync   (from the neobreath repo)\n` +
  `// -----------------------------------------------------------------------------\n\n`;

/**
 * Files generated into the animation tree from their canonical home elsewhere.
 *
 * ONLY waveform.ts is generated here. `tokens.ts` is deliberately NOT in this
 * list: `sync-tokens.mjs` owns it and writes both copies, so this script treats
 * `remotion/tokens.ts` as an ordinary file and copies it with the tree. Two
 * generators writing one file would fight over its header, making `tokens:check`
 * and `anim:check` each fail on the other's output.
 *
 * `npm run anim:sync` therefore runs `tokens:sync` first.
 */
const GENERATED = [{ from: "lib/waveform.ts", to: "waveform.ts" }];

const check = process.argv.includes("--check");
const problems = [];

async function walk(dir, base = dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full, base)));
    else out.push(relative(base, full));
  }
  return out;
}

// ── 1. Build the expected contents of every mirrored file ──────────────────

/** @type {Map<string,string>} */
const expected = new Map();

for (const g of GENERATED) {
  const body = await readFile(resolve(repoRoot, g.from), "utf8");
  expected.set(g.to, banner(g.from) + body);
}

// Hand-authored files only. The generated targets are skipped here, otherwise
// the walk would re-read its own output and a stale copy could win over the
// freshly generated one.
const generatedTargets = new Set(GENERATED.map((g) => g.to));

for (const rel of await walk(SRC)) {
  const key = rel.split(sep).join("/");
  if (generatedTargets.has(key)) continue;
  expected.set(key, await readFile(join(SRC, rel), "utf8"));
}

// ── 2. Compare or write ───────────────────────────────────────────────────

if (check) {
  for (const [rel, want] of expected) {
    // Generated files also live in the canonical tree, so both copies are checked.
    if (generatedTargets.has(rel)) {
      const local = join(SRC, rel);
      if (!existsSync(local)) problems.push(`missing (canonical):  remotion/${rel}`);
      else if ((await readFile(local, "utf8")) !== want) {
        problems.push(`drifted (canonical):  remotion/${rel}`);
      }
    }

    const target = join(DEST, rel);
    if (!existsSync(target)) {
      problems.push(`missing:  ${rel}`);
      continue;
    }
    if ((await readFile(target, "utf8")) !== want) problems.push(`drifted:  ${rel}`);
  }

  if (problems.length > 0) {
    console.error(`[anim:check] Animation mirror is out of date:\n  ${problems.join("\n  ")}`);
    console.error("            Run: npm run anim:sync");
    process.exit(1);
  }
  console.log(`[anim:check] Animation tree in sync (${expected.size} files) at ${DEST}`);
  process.exit(0);
}

// Write the canonical copies first (inside the workspace), then the mirror.
for (const g of GENERATED) {
  await writeFile(resolve(SRC, g.to), expected.get(g.to), "utf8");
}

await mkdir(DEST, { recursive: true });

for (const [rel, body] of expected) {
  const target = join(DEST, rel);
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, body, "utf8");
}

// Copy any non-TS assets the compositions need (fonts, audio) verbatim.
const assetDir = resolve(SRC, "assets");
if (existsSync(assetDir)) {
  await cp(assetDir, join(DEST, "assets"), { recursive: true });
}

console.log(`[anim:sync] Wrote ${expected.size} files to ${DEST}`);
console.log("[anim:sync] Host project untouched - NeoBreath has its own entry point.");
