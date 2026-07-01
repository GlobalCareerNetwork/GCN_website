"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Event } from "@/lib/data/events";
import EventFeatureSlide from "./EventFeatureSlide";

interface EventSlideshowProps {
  events: Event[];
}

const ANIMATION_MS = 900;
const WHEEL_THRESHOLD = 28;
const SWIPE_THRESHOLD = 42;

export default function EventSlideshow({ events }: EventSlideshowProps) {
  const storyRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const currentIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const touchStartYRef = useRef(0);
  const reducedMotionRef = useRef(false);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const goToSlide = useCallback(
    (index: number) => {
      const next = Math.max(0, Math.min(index, events.length - 1));
      if (next === currentIndexRef.current || isAnimatingRef.current) return;
      isAnimatingRef.current = true;
      currentIndexRef.current = next;
      setCurrentIndex(next);
      setExpandedIndex(null);
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
      if (reducedMotionRef.current) return;
      if (Math.abs(e.deltaY) < WHEEL_THRESHOLD || isAnimatingRef.current) return;
      if (!canControlScroll(e.deltaY)) return;
      e.preventDefault();
      goToSlide(currentIndexRef.current + (e.deltaY > 0 ? 1 : -1));
    }

    function handleTouchStart(e: TouchEvent) {
      touchStartYRef.current = e.touches[0].clientY;
    }

    function handleTouchMove(e: TouchEvent) {
      if (reducedMotionRef.current) return;
      if (isAnimatingRef.current || !touchStartYRef.current) return;
      const deltaY = touchStartYRef.current - e.touches[0].clientY;
      if (Math.abs(deltaY) < SWIPE_THRESHOLD) return;
      if (!canControlScroll(deltaY)) return;
      e.preventDefault();
      goToSlide(currentIndexRef.current + (deltaY > 0 ? 1 : -1));
      touchStartYRef.current = 0;
    }

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setExpandedIndex(null);
        return;
      }
      if (reducedMotionRef.current) return;
      const nextKeys = ["ArrowDown", "ArrowRight"];
      const prevKeys = ["ArrowUp", "ArrowLeft"];
      if (![...nextKeys, ...prevKeys].includes(e.key) || isAnimatingRef.current) return;
      const direction = nextKeys.includes(e.key) ? 1 : -1;
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
          const index = slideRefs.current.indexOf(entry.target as HTMLDivElement);
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
        <EventFeatureSlide
          key={event.id}
          event={event}
          index={i}
          total={events.length}
          isActive={currentIndex === i}
          expanded={expandedIndex === i}
          onToggleExpand={() => setExpandedIndex((prev) => (prev === i ? null : i))}
          setRef={(el) => {
            slideRefs.current[i] = el;
          }}
        />
      ))}

      {/* ── Scroll-to-advance hint — first slide only ── */}
      {currentIndex === 0 && expandedIndex === null && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 hidden md:flex flex-col items-center gap-1.5 pointer-events-none"
          aria-hidden="true"
        >
          <span
            className="font-bold uppercase"
            style={{ fontSize: "10px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.85)" }}
          >
            Scroll to advance
          </span>
          <svg
            className="gcn-scroll-hint"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            style={{ color: "rgba(255,255,255,0.85)" }}
          >
            <path d="M3 6l5 5 5-5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      )}

      {/* ── Progress indicator — desktop dot rail ── */}
      <div
        className="fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-30 hidden md:flex flex-col items-center gap-3 py-4 px-2.5 rounded-full"
        style={{ background: "rgba(12,12,14,0.55)" }}
        role="group"
        aria-label="Event slide navigation"
      >
        <span className="text-xs font-mono" style={{ color: "#fff" }}>
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
                background: currentIndex === i ? "var(--color-brand-red)" : "rgba(255,255,255,0.55)",
                outlineColor: "var(--color-brand-red)",
              }}
            />
          ))}
        </div>
        <span className="text-xs font-mono" style={{ color: "rgba(255,255,255,0.75)" }}>
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
