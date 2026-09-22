import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/metadata";

/**
 * robots.txt.
 *
 * `/api/` is disallowed: the only endpoint is the contact form's POST handler,
 * and there is nothing there for a crawler to index.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/api/",
      },
    ],
    sitemap: new URL("/sitemap.xml", SITE_URL).toString(),
    host: SITE_URL.origin,
  };
}
