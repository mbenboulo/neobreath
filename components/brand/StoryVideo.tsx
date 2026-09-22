"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { capture } from "@/lib/analytics";

/**
 * StoryVideo — plays a rendered NeoBreath animation.
 *
 * AUTOPLAY AND LOOP
 * -----------------
 * The videos autoplay muted on a loop. `autoPlay muted loop playsInline` are set
 * on the element so the browser starts playback natively; the IntersectionObserver
 * only *pauses* it when scrolled away and resumes when it returns. Relying on a
 * scripted `play()` alone is fragile — the promise rejects if it fires before
 * there is enough buffered data, and a swallowed rejection leaves the poster up
 * forever. There is a `canplay` retry for the same reason.
 *
 * ASPECT RATIO — the decision
 * ---------------------------
 * The site serves the 16:9 cut at >= 640px and the 9:16 cut below it.
 *
 *   - At >= 640px the video sits in a wide column, so the 16:9 frame fills it
 *     edge to edge at its native 1920x1080. Nothing is cropped or letterboxed.
 *   - At 390px a 16:9 frame is only ~219px tall, and the animation's side-by-side
 *     layout compresses into two ~190px columns — the monitor and the wearable
 *     become thumbnails. The 9:16 cut STACKS the monitor above the figure, so each
 *     element gets the full 390px of width: about 1.8x more pixels per element.
 *
 * The 1:1 cut is deliberately not used here. It exists for social cards, where a
 * feed renders a near-square preview and a 16:9 image is letterboxed into a thin
 * band.
 *
 * TWO ORDERING TRAPS, both of which shipped as bugs before:
 *
 *  1. The portrait `<source>` must come FIRST. A `<source>` without a `media`
 *     attribute always matches, so listing 16:9 first made the browser pick it
 *     unconditionally and the portrait file was never loaded at all.
 *  2. The wrapper's aspect ratio must change with the same breakpoint as the
 *     source swap. A fixed 16:9 box plus `object-cover` cropped the 9:16 video to
 *     a centre band — the top and bottom of the composition were cut off.
 */

interface StoryVideoProps {
  /** 16:9 render. */
  src: string;
  /** 9:16 render, used below the `sm` breakpoint. */
  srcPortrait?: string;
  /** 16:9 poster. Always required — it is the no-JS, no-network fallback. */
  poster: string;
  /** 9:16 poster. Falls back to `poster` when omitted. */
  posterPortrait?: string;
  /** Visible description for screen readers. Required. */
  label: string;
  /** Framing text rendered beneath the video. */
  caption?: string;
  /** Aspect for the wide layout when no portrait cut is supplied. */
  aspect?: "16/9" | "1/1";
  className?: string;
}

/** Must stay in step with Tailwind's `sm` breakpoint (40rem / 640px). */
const PORTRAIT_MEDIA = "(max-width: 639.98px)";

export default function StoryVideo({
  src,
  srcPortrait,
  poster,
  posterPortrait,
  label,
  caption,
  aspect = "16/9",
  className = "",
}: StoryVideoProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [started, setStarted] = useState(false);

  // Respect the OS setting, and react if it changes mid-session.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  // Attach the source only when the video is close to the viewport.
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setInView(true);
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /** Best-effort resume. Never throws, never blocks the poster. */
  const resume = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    void video.play().catch(() => {
      /* Autoplay refused — the poster stays and `autoPlay` may still succeed later. */
    });
  }, []);

  // Pause off-screen, resume on screen.
  useEffect(() => {
    const el = wrapperRef.current;
    const video = videoRef.current;
    if (!el || !video || !inView || reduced) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) resume();
          else video.pause();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [inView, reduced, resume]);

  const loaded = inView && !reduced;
  // Portrait FIRST: a source with no `media` always matches, so 16:9 must not
  // precede it or the portrait cut is dead code.
  const posterNarrow = posterPortrait ?? poster;

  return (
    <figure className={className}>
      <div
        ref={wrapperRef}
        className={`relative w-full overflow-hidden rounded-nb-card bg-nb-surface-warm shadow-nb-warm ${
          srcPortrait ? "aspect-[9/16] sm:aspect-video" : ""
        }`}
        style={srcPortrait ? undefined : { aspectRatio: aspect }}
      >
        {/*
          Two posters, toggled by CSS so the right crop shows before playback.
          A single 16:9 poster in a 9:16 box would be cropped to a centre band.
        */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={posterNarrow}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 sm:hidden ${
            started && !reduced ? "opacity-0" : "opacity-100"
          }`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={poster}
          alt=""
          aria-hidden="true"
          className={`absolute inset-0 hidden h-full w-full object-cover transition-opacity duration-500 sm:block ${
            started && !reduced ? "opacity-0" : "opacity-100"
          }`}
        />

        {loaded ? (
          <video
            ref={videoRef}
            muted
            loop
            autoPlay
            playsInline
            controls={reduced}
            preload="metadata"
            aria-label={label}
            onPlaying={() => {
              setStarted(true);
              capture("animation_played", { src });
            }}
            // A scripted play() can reject before there is data to play. Retry
            // once the browser says it can.
            onCanPlay={resume}
            className="absolute inset-0 h-full w-full object-cover"
          >
            {srcPortrait ? (
              <source src={srcPortrait} type="video/mp4" media={PORTRAIT_MEDIA} />
            ) : null}
            <source src={src} type="video/mp4" />
          </video>
        ) : null}

        {/* Reduced motion: offer playback explicitly rather than autoplaying. */}
        {reduced && !started ? (
          <button
            type="button"
            onClick={() => {
              setReduced(false);
              setStarted(true);
              capture("animation_played", { src, reason: "reduced-motion-opt-in" });
            }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-nb-ink-deep/70 text-nb-on-ink transition-colors hover:bg-nb-ink-deep/80"
          >
            <span className="nb-icon text-4xl" aria-hidden="true">
              play_circle
            </span>
            <span className="text-[13px] font-bold uppercase tracking-[0.1em]">
              Play animation
            </span>
          </button>
        ) : null}
      </div>

      {caption ? (
        <figcaption className="mt-3 text-[13px] leading-relaxed text-nb-muted">
          {caption}
        </figcaption>
      ) : null}
    </figure>
  );
}
