"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cta, meta, nav } from "@/content/copy";
import { capture } from "@/lib/analytics";
import SupportModal from "./SupportModal";

/**
 * Wordmark — the shield mark plus the name.
 *
 * One component so the mark is identical in the navbar, the footer and every
 * page that needs it. The shield geometry matches `PhoneFrame`'s in the
 * animations, so the app and the site show the same logo.
 */
export function Wordmark({ size = 30 }: { size?: number }) {
  return (
    <span className="flex items-center gap-2.5">
      <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M12 2.4 L20 5.2 V11.4 C20 16.4 16.6 20 12 21.6 C7.4 20 4 16.4 4 11.4 V5.2 Z"
          fill="var(--color-nb-primary)"
        />
        <circle cx="12" cy="10" r="2.6" fill="#fff" />
        <path d="M7.4 18.2 C8.2 15.4 9.9 14 12 14 C14.1 14 15.8 15.4 16.6 18.2" fill="#fff" />
      </svg>
      <span className="text-[19px] font-extrabold tracking-[-0.02em] text-nb-ink">
        {meta.name}
      </span>
    </span>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [elevated, setElevated] = useState(false);

  useEffect(() => {
    const onScroll = () => setElevated(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // The mobile sheet closes from the link's own onClick rather than an effect on
  // `pathname`. An effect that calls setState on every route change causes a
  // cascading render, and the click already tells us the user has navigated.

  const isActive = (href: string) =>
    href.startsWith("/#") ? false : pathname === href;

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full bg-nb-canvas/85 backdrop-blur-md transition-shadow duration-300 ${
          elevated ? "shadow-[0_1px_0_0_var(--color-nb-hairline)]" : ""
        }`}
      >
        <nav
          aria-label="Main"
          className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-4 py-3 md:px-8"
        >
          <Link href="/" className="shrink-0" aria-label={`${meta.name} home`}>
            <Wordmark />
          </Link>

          <div className="hidden items-center gap-7 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={`text-[14px] font-semibold transition-colors ${
                  isActive(item.href)
                    ? "text-nb-primary"
                    : "text-nb-ink hover:text-nb-primary"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <button
              type="button"
              onClick={() => {
                setSupportOpen(true);
                capture("support_opened", { from: "navbar" });
              }}
              className="flex h-10 items-center rounded-full bg-nb-primary px-5 text-[14px] font-bold text-nb-on-primary transition-colors hover:bg-nb-ink-deep"
            >
              {cta.support}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full text-nb-ink lg:hidden"
          >
            <span className="nb-icon text-2xl" aria-hidden="true">
              {open ? "close" : "menu"}
            </span>
          </button>
        </nav>

        {open ? (
          <div
            id="mobile-nav"
            className="border-t border-nb-hairline bg-nb-canvas px-4 pb-5 pt-3 lg:hidden"
          >
            <div className="flex flex-col gap-1">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-nb-card px-3 py-3 text-[15px] font-semibold text-nb-ink hover:bg-nb-surface-warm"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <button
              type="button"
              onClick={() => {
                setSupportOpen(true);
                setOpen(false);
                capture("support_opened", { from: "mobile-nav" });
              }}
              className="mt-3 flex h-12 w-full items-center justify-center rounded-full bg-nb-primary text-[15px] font-bold text-nb-on-primary"
            >
              {cta.support}
            </button>
          </div>
        ) : null}
      </header>

      <SupportModal isOpen={supportOpen} onClose={() => setSupportOpen(false)} />
    </>
  );
}
