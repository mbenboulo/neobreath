/**
 * Report on the emitted metadata for each prerendered route.
 *
 *   node scripts/report-metadata.mjs
 *
 * Reads the built HTML rather than the source, so it verifies what a crawler
 * actually receives: canonical URL, social image, and the title template.
 */

import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(here, "..");
const appDir = join(repoRoot, ".next/server/app");

const ROUTES = [
  { name: "/", file: "index.html" },
  { name: "/technology", file: "technology.html" },
  { name: "/research", file: "research.html" },
  { name: "/evidence", file: "evidence.html" },
  { name: "/about", file: "about.html" },
];

const attr = (html, prop) => {
  const re = new RegExp(`(?:property|name)=["']${prop}["'][^>]*content=["']([^"']+)["']`, "i");
  const m = html.match(re);
  if (m) return m[1];
  // content may precede the property attribute
  const re2 = new RegExp(`content=["']([^"']+)["'][^>]*(?:property|name)=["']${prop}["']`, "i");
  const m2 = html.match(re2);
  return m2 ? m2[1] : null;
};

let missing = 0;

console.log("Route metadata (read from the built HTML)\n");
for (const route of ROUTES) {
  const path = join(appDir, route.file);
  if (!existsSync(path)) {
    console.log(`  ${route.name.padEnd(12)} NOT BUILT`);
    missing++;
    continue;
  }
  const html = readFileSync(path, "utf8");

  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1] ?? null;
  const canonical = (html.match(/rel=["']canonical["'][^>]*href=["']([^"']+)["']/i) || [])[1] ?? null;
  const ogImage = attr(html, "og:image");
  const ogTitle = attr(html, "og:title");
  const twitterCard = attr(html, "twitter:card");
  const desc = attr(html, "description");

  const checks = [
    ["title", Boolean(title)],
    ["description", Boolean(desc)],
    ["canonical", Boolean(canonical)],
    ["og:image", Boolean(ogImage)],
    ["og:title", Boolean(ogTitle)],
    ["twitter:card", twitterCard === "summary_large_image"],
  ];
  const bad = checks.filter(([, ok]) => !ok);
  if (bad.length) missing++;

  console.log(`  ${route.name}`);
  console.log(`    title      ${title ?? "MISSING"}`);
  console.log(`    canonical  ${canonical ?? "MISSING"}`);
  console.log(`    og:image   ${ogImage ?? "MISSING"}`);
  console.log(`    twitter    ${twitterCard ?? "MISSING"}`);
  if (bad.length) console.log(`    !! missing: ${bad.map(([n]) => n).join(", ")}`);
  console.log("");
}

console.log(`  sitemap.xml  ${existsSync(join(appDir, "sitemap.xml")) ? "present" : "MISSING"}`);
console.log(`  robots.txt   ${existsSync(join(appDir, "robots.txt")) ? "present" : "MISSING"}`);
console.log("");

if (missing > 0) {
  console.error(`[metadata:report] ${missing} route(s) incomplete.`);
  process.exit(1);
}
console.log("[metadata:report] every route has a full metadata set.");
