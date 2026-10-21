"use client";

import React, { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/useScrollProgress";

interface TypingTextProps {
  text: string;
  /** Milliseconds between words. */
  speed?: number;
}

/**
 * Reveals a reply word by word, the way a live chat feels. Screen readers get
 * the full text at once; reduced motion skips the effect.
 */
export function TypingText({ text, speed = 35 }: TypingTextProps) {
  const reducedMotion = usePrefersReducedMotion();
  const words = text.split(/(\s+)/);
  const [shown, setShown] = useState(0);

  const done = reducedMotion || shown >= words.length;

  useEffect(() => {
    if (done) return;
    const timer = window.setTimeout(() => setShown(shown + 1), speed);
    return () => window.clearTimeout(timer);
  }, [done, shown, speed]);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {done ? text : words.slice(0, shown).join("")}
        {done ? null : <span className="caret" />}
      </span>
    </>
  );
}
