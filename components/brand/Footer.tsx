import Image from "next/image";
import Link from "next/link";
import { meta, nav } from "@/content/copy";
import { Wordmark } from "./Navbar";

/**
 * Footer.
 *
 * The disclaimer is the load-bearing part: it is the last thing a visitor reads
 * and the plainest statement that this is a research project, not a medical
 * device. It is not fine print to be hidden — it sits on the cream surface at a
 * readable size, not at 10px in grey.
 */

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-nb-hairline bg-nb-surface-warm">
      <div className="mx-auto w-full max-w-[1200px] px-4 py-14 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:justify-between">
          <div className="flex max-w-[320px] flex-col gap-4">
            <Wordmark />
            <p className="text-[14px] leading-relaxed text-nb-muted">
              Wearable monitoring and intervention, being developed for apnea of prematurity.
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-nb-muted">
              Explore
            </h2>
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[14px] font-medium text-nb-ink transition-colors hover:text-nb-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.14em] text-nb-muted">
              Supported by
            </h2>
            <div className="flex items-center gap-6">
              <a
                href="https://knust.edu.gh"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-70"
                aria-label="KNUST"
              >
                <Image
                  src="/knust.svg"
                  alt="KNUST"
                  width={64}
                  height={64}
                  className="h-16 w-16 object-contain"
                />
              </a>
              <a
                href="https://dipperlab.knust.edu.gh"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-opacity hover:opacity-70"
                aria-label="DIPPER Lab"
              >
                <Image
                  src="/dipper.svg"
                  alt="DIPPER Lab"
                  width={64}
                  height={64}
                  className="h-16 w-16 object-contain"
                />
              </a>
            </div>
          </div>
        </div>

        {/* The honesty line, at a readable size on purpose. */}
        <div className="mt-12 rounded-nb-card border-l-4 border-nb-primary bg-nb-surface px-5 py-4 shadow-nb-warm">
          <p className="text-[14px] font-medium leading-relaxed text-nb-ink">
            {meta.disclaimer}
          </p>
        </div>

        <p className="mt-6 text-[12px] text-nb-muted">
          © {year} {meta.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
