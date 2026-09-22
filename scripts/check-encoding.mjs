/**
 * Fail the build if any source file contains double-encoded UTF-8.
 *
 * WHY THIS EXISTS
 * ---------------
 * Round-tripping a file through PowerShell (`Get-Content -Raw` then
 * `Set-Content`) decodes UTF-8 bytes using the system ANSI code page and
 * re-encodes the already-wrong string. Every non-ASCII character is destroyed:
 * `—` becomes `â€"`, `·` becomes `Â·`, `…` becomes `â€¦`.
 *
 * This has happened three times in this repo. Crucially, the damage PASSES
 * `tsc` and `lint` — it is only visible on screen, and once it was caught only
 * because a rendered frame was inspected by eye. So it needs a mechanical check.
 *
 *   node scripts/check-encoding.mjs
 *
 * Exit 1 lists every offending file and line.
 */

import { readFileSync } from "node:fs";
import { readdir } from "node:fs/promises";
import { dirname, extname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..");

const SCAN_DIRS = ["app", "components", "content", "design", "lib", "remotion", "scripts"];
const SCAN_EXT = new Set([".ts", ".tsx", ".mjs", ".css", ".md"]);
const SKIP_DIRS = new Set(["node_modules", ".next", ".git", ".preview"]);

/**
 * The signature of CP1252-decoded UTF-8: a UTF-8 lead byte read as a CP1252
 * character, followed by the CP1252 reading of its continuation bytes.
 * `U+00C2`/`U+00C3` (Â/Ã) and `U+00E2` (â) leading are the common cases.
 */
const MOJIBAKE = /\u00C2[\u0080-\u00BF]|\u00C3[\u0080-\u00BF]|\u00E2\u20AC|\uFFFD/;

/** Files that legitimately DOCUMENT the patterns and must be exempt. */
const ALLOWLIST = new Set(["AGENTS.md", "scripts/check-encoding.mjs"]);

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(full)));
    else if (SCAN_EXT.has(extname(entry.name))) out.push(full);
  }
  return out;
}

const files = [];
for (const d of SCAN_DIRS) {
  try {
    files.push(...(await walk(join(repoRoot, d))));
  } catch {
    /* directory may not exist yet */
  }
}

const offenders = [];
for (const file of files) {
  const rel = relative(repoRoot, file).split("\\").join("/");
  if (ALLOWLIST.has(rel)) continue;

  const text = readFileSync(file, "utf8");
  text.split("\n").forEach((line, i) => {
    if (MOJIBAKE.test(line)) {
      offenders.push({ rel, line: i + 1, text: line.trim().slice(0, 100) });
    }
  });
}

if (offenders.length > 0) {
  console.error(`[encoding:check] ${offenders.length} line(s) contain double-encoded UTF-8:\n`);
  for (const o of offenders) console.error(`  ${o.rel}:${o.line}\n    ${o.text}`);
  console.error(
    "\n  This is the Set-Content round-trip described in AGENTS.md rule 10.\n" +
      "  Repair by replacing the mangled sequence with the intended character, using\n" +
      "  the edit tool (or explicit code points), then re-run this check."
  );
  process.exit(1);
}

console.log(`[encoding:check] ${files.length} files clean`);
