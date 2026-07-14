"use client";

import { useEffect, useState } from "react";

interface TypewriterTextProps {
  text: string;
  /** ms to wait before typing starts */
  startDelay?: number;
  /** ms between each character */
  speed?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Reveals `text` one character at a time with a blinking caret, then stops.
 * Skips straight to the full text under prefers-reduced-motion. The complete
 * text is also rendered for assistive tech via a visually-hidden sibling, so
 * screen readers never see a mid-animation partial string.
 */
export default function TypewriterText({
  text,
  startDelay = 0,
  speed = 65,
  className,
  style,
}: TypewriterTextProps) {
  const [count, setCount] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? text.length
      : 0
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return; // already fully shown

    let charIndex = 0;
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const startTimeout = setTimeout(() => {
      intervalId = setInterval(() => {
        charIndex += 1;
        setCount(charIndex);
        if (charIndex >= text.length && intervalId) {
          clearInterval(intervalId);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(startTimeout);
      if (intervalId) clearInterval(intervalId);
    };
  }, [text, startDelay, speed]);

  const done = count >= text.length;

  return (
    <span className={className} style={style}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.slice(0, count)}
        <span
          style={{
            display: "inline-block",
            width: "2px",
            height: "0.85em",
            marginLeft: "0.06em",
            verticalAlign: "-0.1em",
            background: "currentColor",
            opacity: done ? 0 : 1,
            animationName: done ? "gcn-caret-blink" : "none",
            animationDuration: "0.8s",
            animationTimingFunction: "step-end",
            animationIterationCount: done ? 5 : 1,
            animationFillMode: "forwards",
          }}
        />
      </span>
    </span>
  );
}
