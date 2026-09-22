import type { Metadata } from "next";
import { animations, socialImage } from "@/content/animations";
import { meta } from "@/content/copy";

/**
 * Shared metadata helpers.
 *
 * Two things this fixes that per-page `metadata` objects kept getting wrong:
 *
 *  1. `metadataBase`. Without it Next cannot make the relative OG image paths
 *     absolute, and link previews silently fall back to no image.
 *  2. The per-route social card. Every page was declaring its own title and
 *     description but no image, so each one previewed as a bare link.
 *
 * `NEXT_PUBLIC_SITE_URL` must be set in production. The localhost fallback keeps
 * `next build` and `next dev` working without it, but it will produce localhost
 * OG URLs in a deployed build — so it is a required env var, not an optional one.
 */
export const SITE_URL = (() => {
  const raw = process.env.NEXT_PUBLIC_SITE_URL;
  if (raw) {
    try {
      return new URL(raw);
    } catch {
      console.warn(
        `[metadata] NEXT_PUBLIC_SITE_URL is not a valid URL ("${raw}"); falling back to localhost.`
      );
    }
  }
  return new URL("http://localhost:3000");
})();

export const baseMetadata: Metadata = {
  metadataBase: SITE_URL,
  applicationName: meta.name,
  title: {
    default: meta.title,
    template: `%s — ${meta.name}`,
  },
  description: meta.description,
  openGraph: {
    type: "website",
    siteName: meta.name,
    title: meta.title,
    description: meta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
  },
};

/**
 * Build a page's metadata with the right social card.
 *
 * `path` must match a key in `socialImage`; the home route is "/".
 */
export function pageMetadata({
  path,
  title,
  description,
}: {
  path: keyof typeof socialImage | string;
  title: string;
  description: string;
}): Metadata {
  const image = socialImage[path] ?? animations.apneaEvent.posterSquare;
  // The alt is descriptive rather than a restatement of the title: a screen
  // reader announcing a link preview needs to know what the image shows.
  const alt = `A frame from the NeoBreath animation “${animations.apneaEvent.title}”, showing a monitor reading and the wearable sensing belt`;

  return {
    title,
    description,
    alternates: { canonical: path === "/" ? "/" : path },
    openGraph: {
      type: "website",
      siteName: meta.name,
      title,
      description,
      url: path,
      images: [{ url: image, width: 1080, height: 1080, alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}
