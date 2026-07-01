"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Event } from "@/lib/data/events";
import EventPosterCard from "./EventPosterCard";

interface EventSlideshowProps {
  events: Event[];
}

const ANIMATION_MS = 900;
const WHEEL_THRESHOLD = 28;
const SWIPE_THRESHOLD = 42;

export default function EventSlideshow({ events }: EventSlideshowProps) {
  const storyRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const currentIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const touchStartYRef = useRef(0);
  const reducedMotionRef = useRef(false);

  const [currentIndex, setCurrentIndex] = useState(0);

  const goToSlide = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(index, events.length - 1));
      if (next === currentIndexRef.current || isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      currentIndexRef.current = next;
      setCurrentIndex(next);
      slideRefs.current[next]?.scrollIntoView({
        behavior: reducedMotionRef.current ? "auto" : "smooth",
        block: "start",
      });
      window.setTimeout(
        () => {
          isAnimatingRef.current = false;
        },
        reducedMotionRef.current ? 0 : ANIMATION_MS
      );
    },
    [events.length]
  );

  // Scroll-hijack: wheel / touch / arrow-key navigation while the slideshow fills the viewport
  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotionRef.current) return; // fall back to plain native scroll

    const story = storyRef.current;
    if (!story) return;

    function canControlScroll(deltaY: number) {
      const rect = story!.getBoundingClientRect();
      const withinStory = rect.top <= 2 && rect.bottom >= window.innerHeight - 2;
      const movingUpFromFirst = currentIndexRef.current === 0 && deltaY < 0;
      const movingDownFromLast = currentIndexRef.current === events.length - 1 && deltaY > 0;
      return withinStory && !movingUpFromFirst && !movingDownFromLast;
    }

    function handleWheel(e: WheelEvent) {
      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD || isAnimatingRef.current) return;
      if (!canControlScroll(e.deltaY)) return;
      e.preventDefault();
      goToSlide(currentIndexRef.current + (e.deltaY > 0 ? 1 : -1));
    }

    function handleTouchStart(e: TouchEvent) {
      touchStartYRef.current = e.touches[0].clientY;
    }

    function handleTouchMove(e: TouchEvent) {
      if (isAnimatingRef.current || !touchStartYRef.current) return;
      const deltaY = touchStartYRef.current - e.touches[0].clientY;
      if (Math.abs(deltaY) < SWIPE_THRESHOLD) return;
      if (!canControlScroll(deltaY)) return;
      e.preventDefault();
      goToSlide(currentIndexRef.current + (deltaY > 0 ? 1 : -1));
      touchStartYRef.current = 0;
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (!["ArrowDown", "ArrowUp"].includes(e.key) || isAnimatingRef.current) return;
      const direction = e.key === "ArrowDown" ? 1 : -1;
      if (!canControlScroll(direction)) return;
      e.preventDefault();
      goToSlide(currentIndexRef.current + direction);
    }

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [events.length, goToSlide]);

  // Keep currentIndex in sync when the user reaches a slide via native scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.58) return;
          const index = slideRefs.current.indexOf(entry.target as HTMLElement);
          if (index < 0) return;
          currentIndexRef.current = index;
          setCurrentIndex(index);
        });
      },
      { threshold: [0.58] }
    );
    slideRefs.current.forEach((slide) => slide && observer.observe(slide));
    return () => observer.disconnect();
  }, [events.length]);

  return (
    <div ref={storyRef} className="relative">
      {events.map((event, i) => (
        <section
          key={event.id}
          ref={(el) => {
            slideRefs.current[i] = el;
          }}
          className="relative w-full min-h-screen flex flex-col md:flex-row"
          aria-label={`Event ${i + 1} of ${events.length}: ${event.name}`}
          style={{
            opacity: currentIndex === i ? 1 : 0.4,
            transition: "opacity 0.5s var(--ease-enter)",
          }}
        >
          {/* ── Poster (flip card) ── */}
          <div className="relative w-full md:w-1/2 h-[46vh] md:h-screen">
            <EventPosterCard event={event} />
          </div>

          {/* ── Article ── */}
          <div
            className="relative w-full md:w-1/2 min-h-[54vh] md:h-screen flex items-center px-6 sm:px-10 md:px-16 py-12"
            style={{ background: "var(--color-surface-white)" }}
          >
            <div className="gcn-grain-overlay" aria-hidden="true" />
            <div className="relative max-w-xl">
              <p
                className="font-bold uppercase mb-3"
                style={{ fontSize: "11px", letterSpacing: "0.22em", color: "var(--color-brand-red)" }}
              >
                {event.semester}
              </p>
              <h2
                className="leading-tight mb-4"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontWeight: 700,
                  fontSize: "clamp(1.7rem, 3.4vw, 2.7rem)",
                  color: "var(--color-black-soft)",
                }}
              >
                {event.name}
              </h2>
              <p
                className="uppercase mb-5"
                style={{
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
                  fontSize: "11.5px",
                  letterSpacing: "0.1em",
                  color: "var(--color-gray-muted)",
                }}
              >
                {event.date}
                {event.time ? ` · ${event.time}` : ""} — {event.location}
              </p>
              <p
                className="gcn-body-col mb-5"
                style={{ fontFamily: "var(--font-serif)", color: "var(--color-gray-text)" }}
              >
                {event.description}
              </p>
              {event.outcome && (
                <p
                  className="gcn-body-col mb-5"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontStyle: "italic",
                    color: "var(--color-gray-text)",
                    opacity: 0.85,
                  }}
                >
                  {event.outcome}
                </p>
              )}
              {event.highlightStat && (
                <p
                  className="font-bold leading-tight"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(1.3rem, 2.4vw, 1.9rem)",
                    color: "var(--color-brand-red)",
                  }}
                >
                  {event.highlightStat}
                </p>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* ── Progress indicator — desktop dot rail ── */}
      <div
        className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center gap-3"
        role="group"
        aria-label="Event slide navigation"
      >
        <span className="text-xs font-mono" style={{ color: "var(--color-black-soft)" }}>
          {String(currentIndex + 1).padStart(2, "0")}
        </span>
        <div className="flex flex-col gap-2">
          {events.map((event, i) => (
            <button
              key={event.id}
              type="button"
              onClick={() => goToSlide(i)}
              aria-label={`Go to event ${i + 1}: ${event.name}`}
              aria-current={currentIndex === i}
              className="rounded-full transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style={{
                width: currentIndex === i ? "8px" : "6px",
                height: currentIndex === i ? "8px" : "6px",
                background: currentIndex === i ? "var(--color-brand-red)" : "var(--color-gray-border)",
                outlineColor: "var(--color-brand-red)",
              }}
            />
          ))}
        </div>
        <span className="text-xs font-mono" style={{ color: "var(--color-gray-muted)" }}>
          {String(events.length).padStart(2, "0")}
        </span>
      </div>

      {/* ── Progress indicator — mobile pill ── */}
      <div
        className="fixed bottom-4 left-1/2 -translate-x-1/2 z-30 md:hidden px-3 py-1 rounded-full text-xs font-mono"
        style={{ background: "rgba(12,12,14,0.78)", color: "#fff" }}
        aria-hidden="true"
      >
        {String(currentIndex + 1).padStart(2, "0")} / {String(events.length).padStart(2, "0")}
      </div>
    </div>
  );
}
