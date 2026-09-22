"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { capture } from "@/lib/analytics";

/**
 * SupportModal — the contact form.
 *
 * Kept as a modal because the CTA appears in several places, but it behaves like
 * a real dialog: Escape closes it, focus moves in on open and returns to the
 * trigger on close, and the form still posts to the existing /api/contact route.
 *
 * The copy states plainly what agreeing to this means — we keep the submitted
 * details and reply by email. A form that asks for a name and email without
 * saying why is not something to ship on a health-adjacent site.
 */

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Status = "idle" | "success" | "error";

export default function SupportModal({ isOpen, onClose }: SupportModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const panelRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const lastFocused = useRef<Element | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    lastFocused.current = document.activeElement;
    firstFieldRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      (lastFocused.current as HTMLElement | null)?.focus?.();
    };
  }, [isOpen, onClose]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("idle");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      comment: formData.get("comment"),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        setStatus("success");
        capture("support_submitted");
        setTimeout(() => {
          onClose();
          setStatus("idle");
        }, 2200);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setIsLoading(false);
    }
  };

  /*
   * `border-nb-outline`, not `hairline`: a field boundary is a meaningful
   * non-text control boundary and needs 3:1 (WCAG 1.4.11). The hairline divider
   * used elsewhere measures 1.28:1, which is fine for a decorative rule and not
   * fine for the edge of an input.
   */
  const field =
    "w-full rounded-nb-card border border-nb-outline bg-nb-surface px-4 py-3 text-[15px] text-nb-ink placeholder:text-nb-muted focus:border-nb-primary focus:outline-none focus:ring-2 focus:ring-nb-primary";
  const labelCls = "mb-1.5 block text-[13px] font-semibold text-nb-ink";

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-nb-ink-deep/50 backdrop-blur-sm"
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="support-title"
            initial={{ opacity: 0, scale: 0.97, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 16 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed left-1/2 top-1/2 z-50 max-h-[90vh] w-[calc(100%-2rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-nb-drawer bg-nb-surface p-7 shadow-nb-pill"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2
                  id="support-title"
                  className="text-[22px] font-extrabold tracking-[-0.02em] text-nb-ink"
                >
                  Work with us
                </h2>
                <p className="mt-1 text-[14px] leading-relaxed text-nb-muted">
                  If you work in neonatal care, medical devices or signal processing, we would
                  like to hear from you.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close dialog"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-nb-muted hover:bg-nb-surface-warm"
              >
                <span className="nb-icon text-xl" aria-hidden="true">
                  close
                </span>
              </button>
            </div>

            {status === "success" ? (
              <div
                role="status"
                className="rounded-nb-card bg-nb-normal-wash px-5 py-8 text-center"
              >
                <p className="font-bold text-nb-normal-ink">Thank you — message received.</p>
                <p className="mt-1 text-[14px] text-nb-ink">
                  We will reply to the address you gave.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="support-name" className={labelCls}>
                    Name
                  </label>
                  <input
                    ref={firstFieldRef}
                    id="support-name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    className={field}
                    placeholder="Dr. Sarah Smith"
                  />
                </div>
                <div>
                  <label htmlFor="support-email" className={labelCls}>
                    Email
                  </label>
                  <input
                    id="support-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className={field}
                    placeholder="sarah@hospital.org"
                  />
                </div>
                <div>
                  <label htmlFor="support-comment" className={labelCls}>
                    Message
                  </label>
                  <textarea
                    id="support-comment"
                    name="comment"
                    required
                    rows={4}
                    className={`${field} resize-none`}
                    placeholder="How you would like to be involved…"
                  />
                </div>

                <p className="text-[12px] leading-relaxed text-nb-muted">
                  We use these details only to reply to you. They are emailed to the project team
                  and are not stored anywhere else.
                </p>

                {status === "error" ? (
                  <p role="alert" className="text-[14px] font-semibold text-nb-critical-ink">
                    Something went wrong. Please try again, or email the team directly.
                  </p>
                ) : null}

                <div className="mt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="h-12 flex-1 rounded-full border border-nb-outline text-[15px] font-semibold text-nb-ink transition-colors hover:bg-nb-surface-warm"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="h-12 flex-1 rounded-full bg-nb-primary text-[15px] font-bold text-nb-on-primary transition-colors hover:bg-nb-ink-deep disabled:opacity-60"
                  >
                    {isLoading ? "Sending…" : "Send message"}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
