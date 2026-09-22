import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import MotionProvider from "@/components/brand/MotionProvider";
import { baseMetadata } from "@/lib/metadata";
import "./globals.css";

/*
 * Plus Jakarta Sans replaces Manrope (AGENTS.md §3).
 * Exposed as `--font-jakarta-src`, which `@theme` in globals.css turns into
 * `--font-jakarta` and `--font-sans`.
 */
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jakarta-src",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = baseMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={jakarta.variable}>
      <head>
        {/* Material Symbols is a variable icon font and cannot be self-hosted
            through next/font, so it is linked here. The no-page-custom-font
            rule targets the Pages Router's pages/_document.js; in the App
            Router this link lives in the single root layout and is loaded once,
            so the warning is a false positive. */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        {/* Makes every framer-motion animation honour prefers-reduced-motion. */}
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}
