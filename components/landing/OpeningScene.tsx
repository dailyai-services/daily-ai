"use client";

import React, { useRef } from "react";
import { useElementScrollProgress } from "@/hooks/useScrollProgress";

interface OpeningSceneProps {
  onOpenRequest?: () => void;
}

const WORDMARK = ["DAILY", "AI"];

function Letter({
  char,
  index,
}: {
  char: string;
  index: number;
}) {
  return (
    <span
      aria-hidden="true"
      className="inline-block"
      style={{
        animation: `wordmark-in 1100ms var(--ease-out-expo) ${120 + index * 80}ms both`,
      }}
    >
      {char}
    </span>
  );
}

/**
 * The first viewport. Deliberately almost empty: the wordmark, a slow
 * ambient field, and nothing else competing for attention.
 */
export function OpeningScene({ onOpenRequest }: OpeningSceneProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progress = useElementScrollProgress(sectionRef);

  // A full-height scene already reads 0.5 at the top of the page, so only
  // the second half (scrolling it away) drives the exit.
  const exit = Math.max(0, (progress - 0.5) * 2);
  const fade = Math.max(0, 1 - exit * 1.6);
  const scale = 1 - exit * 0.12;
  const lift = exit * -90;

  return (
    <section
      ref={sectionRef}
      aria-label="DAILY AI"
      className="relative isolate flex min-h-[100svh] w-full items-center justify-center overflow-hidden bg-ink px-4"
    >
      {/* Ambient field */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="animate-drift-a absolute left-1/2 top-1/2 h-[46rem] w-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.17),rgba(167,139,250,0)_62%)] blur-3xl" />
        <div className="animate-drift-b absolute left-[34%] top-[40%] h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(122,162,255,0.12),rgba(122,162,255,0)_60%)] blur-3xl" />
        <div className="animate-drift-a absolute left-[66%] top-[62%] h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(240,171,252,0.1),rgba(240,171,252,0)_60%)] blur-3xl [animation-delay:-12s]" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-ink" />
      </div>

      {/* Wordmark */}
      <div
        className="relative z-10 flex flex-col items-center"
        style={{
          transform: `translate3d(0, ${lift}px, 0) scale(${scale})`,
          opacity: fade,
        }}
      >
        <h1
          className="sr-only"
          tabIndex={-1}
          aria-label="DAILY AI"
        >
          DAILY AI
        </h1>

        <div
          aria-hidden="true"
          className="flex select-none flex-wrap items-center justify-center gap-x-[0.32em] gap-y-[0.08em] font-wordmark text-[clamp(2.6rem,10.5vw,9rem)] font-black uppercase leading-none tracking-[-0.04em] text-paper"
          style={{
            textShadow:
              "0 0 60px rgba(167,139,250,0.22), 0 0 140px rgba(122,162,255,0.12)",
          }}
        >
          {WORDMARK.map((word, wordIndex) => {
            const offset = WORDMARK.slice(0, wordIndex).join("").length;
            return (
              <span key={word} className="flex">
                {word.split("").map((char, index) => (
                  <Letter key={index} char={char} index={offset + index} />
                ))}
              </span>
            );
          })}
        </div>

        <div
          aria-hidden="true"
          className="aurora-line mt-8 h-px opacity-70"
          style={{
            width: "min(38rem, 72vw)",
            animation: "wordmark-in 1600ms var(--ease-out-expo) 900ms both",
          }}
        />
      </div>

      {/* Scroll cue */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-10 flex flex-col items-center gap-3"
        style={{ opacity: fade }}
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.42em] text-mute-dim">
          Scroll
        </span>
        <span className="relative h-12 w-px overflow-hidden bg-white/10">
          <span className="animate-pulse-soft absolute inset-x-0 top-0 h-4 bg-iris" />
        </span>
      </div>

      {onOpenRequest ? (
        <button
          type="button"
          onClick={onOpenRequest}
          className="sr-only focus:not-sr-only focus:absolute focus:bottom-10 focus:left-1/2 focus:z-20 focus:-translate-x-1/2 focus:rounded-full focus:bg-paper focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-ink"
        >
          Tell us what you need
        </button>
      ) : null}
    </section>
  );
}
