"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import Image from "next/image";
import type { Event } from "@/lib/data/events";
import styles from "./EventPosterFlip.module.css";

interface EventPosterFlipProps {
  event: Event;
}

export default function EventPosterFlip({ event }: EventPosterFlipProps) {
  const [flipped, setFlipped] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const frontButton = useRef<HTMLButtonElement>(null);
  const backButton = useRef<HTMLButtonElement>(null);
  const moveFocus = useRef(false);
  const outcomeId = useId();
  const photos = event.outcomePhotos ?? [];
  const photo = photos[photoIndex];
  const hasGallery = photos.length > 0;
  const hasOutcome = Boolean(event.outcome || event.highlightStat || hasGallery);

  useEffect(() => {
    if (!moveFocus.current) return;
    moveFocus.current = false;
    (flipped ? backButton : frontButton).current?.focus({ preventScroll: true });
  }, [flipped]);

  function showFace(outcome: boolean) {
    moveFocus.current = true;
    setFlipped(outcome);
  }

  const flipControls = hasOutcome ? {
    onPointerEnter: (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType === "mouse" && (!hasGallery || !event.currentTarget.contains(document.activeElement))) {
        setFlipped(true);
      }
    },
    onPointerLeave: (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType === "mouse" && (!hasGallery || !event.currentTarget.contains(document.activeElement))) {
        setFlipped(false);
      }
    },
    ...(!hasGallery && {
      onClick: () => setFlipped((value) => !value),
      onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          setFlipped((value) => !value);
        }
      },
      role: "button",
      tabIndex: 0,
      "aria-expanded": flipped,
      "aria-label": `${event.name} poster, press Enter to reveal outcome`,
    }),
  } : undefined;
  const tapHint = (
    <span
      className="md:hidden absolute bottom-3 left-1/2 -translate-x-1/2 font-bold uppercase"
      style={{ fontSize: "12px", letterSpacing: "0.18em", color: "var(--color-gray-muted)" }}
    >
      Tap to flip
    </span>
  );

  return (
    <div
      className={`relative w-full h-full${hasOutcome && !hasGallery ? " cursor-pointer select-none" : ""}`}
      style={{ perspective: "1800px" }}
      {...flipControls}
    >
      <div
        className="relative w-full h-full"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── FRONT: framed poster (or typographic cover) ── */}
        <div
          aria-hidden={flipped}
          inert={hasGallery && flipped}
          className="absolute inset-0 flex items-center justify-center p-1"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: "var(--color-surface-white)",
            border: "1px solid var(--color-black-soft)",
          }}
        >
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{
              border: "1px solid rgba(12,12,14,0.18)",
              padding: "32px 24px",
            }}
          >
            {event.poster ? (
              <div className="relative w-full h-full">
                <Image
                  src={event.poster}
                  alt={event.name}
                  fill
                  sizes="(max-width: 767px) 100vw, 50vw"
                  className="object-contain"
                  style={{ filter: "sepia(0.5) contrast(1.1) brightness(0.94)" }}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center text-center px-6">
                <div className="gcn-grain-overlay" aria-hidden="true" />
                <div style={{ width: "120px", height: "1px", background: "var(--color-black-soft)" }} />
                <h3
                  className="leading-tight my-6"
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontWeight: 700,
                    fontSize: "clamp(2rem, 4vw, 3.2rem)",
                    letterSpacing: "-0.01em",
                    color: "var(--color-black-soft)",
                  }}
                >
                  {event.name}
                </h3>
                <div style={{ width: "120px", height: "1px", background: "var(--color-black-soft)" }} />
              </div>
            )}
          </div>

          {hasGallery ? (
            <button
              ref={frontButton}
              type="button"
              className={styles.posterTrigger}
              aria-label={`View ${event.name} outcome and photos`}
              aria-controls={outcomeId}
              onClick={() => showFace(true)}
            >
              {tapHint}
            </button>
          ) : hasOutcome && tapHint}
        </div>

        {/* ── BACK: event outcome and highlight ── */}
        {hasOutcome && (
          <div
            id={outcomeId}
            aria-hidden={!flipped}
            inert={hasGallery && !flipped}
            data-event-article
            className={`absolute inset-0 flex flex-col ${styles.outcome}${hasGallery ? ` ${styles.outcomeWithPhotos}` : ""}`}
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
              background: "var(--color-surface-white)",
              border: "1px solid var(--color-black-soft)",
            }}
          >
            <div className="gcn-grain-overlay" aria-hidden="true" />
            <div className={hasGallery ? styles.outcomeHeading : undefined}>
              <p
                className="font-black uppercase"
                style={{ fontSize: "12px", letterSpacing: "0.22em", color: "var(--color-brand-red)" }}
              >
                Outcome
              </p>
              {hasGallery && (
                <button
                  ref={backButton}
                  type="button"
                  className={styles.backButton}
                  onClick={() => showFace(false)}
                >
                  View poster
                </button>
              )}
            </div>
            {event.outcome && (
              <p
                className={styles.copy}
              >
                {event.outcome}
              </p>
            )}
            {event.highlightStat && (
              <p
                className={styles.highlight}
              >
                {event.highlightStat}
              </p>
            )}
            {photo && (
              <div className={styles.gallery} role="group" aria-label={`${event.name} photos`}>
                <div className={styles.galleryPhoto}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    sizes="(max-width: 767px) 100vw, 50vw"
                    className="object-contain"
                  />
                </div>
                {photos.length > 1 && (
                  <div className={styles.galleryControls}>
                    <button
                      type="button"
                      aria-label="Previous photo"
                      onClick={() => setPhotoIndex((index) => (index + photos.length - 1) % photos.length)}
                    >
                      <span aria-hidden="true">←</span>
                    </button>
                    <span aria-live="polite">
                      <span className="sr-only">Photo </span>{photoIndex + 1} / {photos.length}
                    </span>
                    <button
                      type="button"
                      aria-label="Next photo"
                      onClick={() => setPhotoIndex((index) => (index + 1) % photos.length)}
                    >
                      <span aria-hidden="true">→</span>
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
