"use client";

import React, { useRef } from "react";
import { reveal } from "@/lib/reveal";
import {
  useElementScrollProgress,
  usePrefersReducedMotion,
} from "@/hooks/useScrollProgress";

const WORDS = ["Tell", "us", "what", "you", "need."];

const CONCEPT = [
  {
    label: "You say",
    text: "One sentence, in your own words. No forms, no categories.",
  },
  {
    label: "We work it out",
    text: "What you need, what is missing, what it costs, how long it takes.",
  },
  {
    label: "You get",
    text: "The finished thing, through AI, tools or a trusted person.",
  },
];

/**
 * A tall section with a sticky stage. As it scrolls through, each word of the
 * headline lights up in turn; reduced motion shows it fully lit.
 */
export function RevealStory() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const progress = useElementScrollProgress(sectionRef);
  const reducedMotion = usePrefersReducedMotion();

  // The stage is pinned between ~0.31 and ~0.69 of the section's travel;
  // the words finish lighting a little before it releases.
  const lit = reducedMotion
    ? WORDS.length
    : Math.min(WORDS.length, Math.max(0, (progress - 0.28) / 0.32) * WORDS.length);

  return (
    <>
      <section
        ref={sectionRef}
        id="reveal"
        aria-label="Tell us what you need"
        className="relative h-[220svh]"
      >
        <div className="sticky top-0 flex h-[100svh] items-center justify-center overflow-hidden px-4">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.1),rgba(167,139,250,0)_62%)] blur-3xl"
            style={{ opacity: Math.min(1, lit / WORDS.length) }}
          />

          <h2 className="display-tight relative max-w-6xl text-balance text-center text-[clamp(3rem,12vw,10rem)] font-semibold tracking-[-0.05em]">
            {WORDS.map((word, index) => {
              const amount = Math.min(1, Math.max(0, lit - index));
              return (
                <span
                  key={word}
                  className="inline-block pr-[0.22em] transition-[color] duration-300 last:pr-0"
                  style={{
                    color: `color-mix(in oklab, var(--color-paper) ${12 + amount * 88}%, transparent)`,
                  }}
                >
                  {index === WORDS.length - 1 ? (
                    <span className="serif-accent font-normal">{word}</span>
                  ) : (
                    word
                  )}
                </span>
              );
            })}
          </h2>
        </div>
      </section>

      <section className="relative px-4 pb-32 pt-8 sm:pb-44">
        <div className="mx-auto max-w-6xl">
          <p
            data-reveal
            style={reveal(0)}
            className="max-w-4xl text-balance text-[clamp(1.75rem,4.4vw,3.4rem)] font-medium leading-[1.08] tracking-[-0.03em] text-paper"
          >
            DAILY AI is one place to ask for almost anything.{" "}
            <span className="text-mute">
              It understands the request and finds the best way to get it done.
            </span>
          </p>

          <ol className="mt-20 grid gap-12 sm:mt-28 md:grid-cols-3 md:gap-10">
            {CONCEPT.map((item, index) => (
              <li
                key={item.label}
                data-reveal
                style={reveal(120 + index * 140)}
                className="hairline-t pt-6"
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-mute-dim">
                  0{index + 1}
                </span>
                <h3 className="mt-6 text-2xl font-semibold tracking-[-0.02em] text-paper sm:text-3xl">
                  {item.label}
                </h3>
                <p className="mt-3 max-w-xs leading-relaxed text-mute">
                  {item.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
