import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/metadata";

/**
 * Sitemap.
 *
 * `/api/contact` is deliberately absent: it is a POST endpoint, not a page.
 * `changeFrequency` and `priority` are omitted rather than guessed — they are
 * hints search engines mostly ignore, and inventing them adds noise without
 * adding information.
 *
 * `lastModified` is intentionally not set to `new Date()`: a sitemap that claims
 * every page changed on every build teaches crawlers to ignore the field.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes: { path: string }[] = [
    { path: "/" },
    { path: "/technology" },
    { path: "/research" },
    { path: "/evidence" },
    { path: "/about" },
  ];

  return routes.map((r) => ({
    url: new URL(r.path, SITE_URL).toString(),
  }));
}
