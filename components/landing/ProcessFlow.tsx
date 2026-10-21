"use client";

import React, { useRef } from "react";
import { reveal } from "@/lib/reveal";
import {
  useElementScrollProgress,
  usePrefersReducedMotion,
} from "@/hooks/useScrollProgress";
import { cn } from "@/lib/utils";

const STEPS = [
  {
    title: "Ask",
    text: "Say what you need, the way you would tell a person.",
  },
  {
    title: "Understand",
    text: "DAILY AI reads the intent and asks only what blocks starting.",
  },
  {
    title: "Plan",
    text: "Scope, timeline and budget, laid out before anything begins.",
  },
  {
    title: "Find / Build",
    text: "AI builds it, a tool automates it, or a trusted provider takes it on.",
  },
  {
    title: "Verify",
    text: "The result is checked against what you actually asked for.",
  },
  {
    title: "Deliver",
    text: "You get the finished thing, not a list of links.",
  },
];

/**
 * The six-step journey as an editorial index. A thin rail fills as the
 * section scrolls, and the step nearest the reading line is emphasised.
 */
export function ProcessFlow() {
  const listRef = useRef<HTMLOListElement | null>(null);
  const progress = useElementScrollProgress(listRef);
  const reducedMotion = usePrefersReducedMotion();

  // Map the middle of the list's travel onto the steps.
  const fill = reducedMotion ? 1 : Math.min(1, Math.max(0, (progress - 0.2) / 0.55));
  const activeIndex = reducedMotion
    ? -1
    : Math.min(STEPS.length - 1, Math.floor(fill * STEPS.length));

  return (
    <section id="process" className="relative px-4 py-32 sm:py-44">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-[12%] top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(240,171,252,0.06),rgba(240,171,252,0)_62%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div data-reveal style={reveal(0)} className="eyebrow">
          How it works
        </div>
        <h2
          data-reveal
          style={reveal(100)}
          className="mt-8 max-w-4xl text-balance text-[clamp(2.4rem,6.4vw,5.6rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-paper"
        >
          From a sentence <span className="serif-accent font-normal text-paper/80">to</span>{" "}
          <span className="aurora-text">done.</span>
        </h2>

        {/* Compact chain */}
        <p
          data-reveal
          style={reveal(200)}
          className="mt-10 font-mono text-[11px] uppercase tracking-[0.22em] text-mute-dim"
        >
          {STEPS.map((step, index) => (
            <React.Fragment key={step.title}>
              <span className={cn(index <= activeIndex && "text-paper/80", "transition-colors duration-500")}>
                {step.title}
              </span>
              {index < STEPS.length - 1 ? <span className="px-2 text-mute-dim/60">→</span> : null}
            </React.Fragment>
          ))}
        </p>

        <ol ref={listRef} className="relative mt-20 sm:mt-28">
          {/* Rail */}
          <div aria-hidden="true" className="absolute bottom-0 left-0 top-0 w-px bg-white/[0.08]">
            <div
              className="w-px bg-gradient-to-b from-azure via-iris to-rose"
              style={{ height: `${fill * 100}%` }}
            />
          </div>

          {STEPS.map((step, index) => {
            const isActive = index === activeIndex;
            const isPast = reducedMotion || index <= activeIndex;
            return (
              <li
                key={step.title}
                className="grid grid-cols-[3rem_minmax(0,1fr)] items-baseline gap-x-4 py-8 pl-6 sm:grid-cols-[5rem_minmax(0,1fr)_minmax(0,22rem)] sm:gap-x-10 sm:py-10 sm:pl-10"
              >
                <span className="font-mono text-xs tracking-[0.2em] text-mute-dim">
                  0{index + 1}
                </span>
                <h3
                  className={cn(
                    "text-[clamp(2.2rem,6vw,5rem)] font-semibold leading-none tracking-[-0.045em] transition-colors duration-500",
                    isActive ? "text-paper" : isPast ? "text-paper/55" : "text-paper/20"
                  )}
                >
                  {step.title}
                </h3>
                <p
                  className={cn(
                    "col-start-2 mt-4 max-w-sm leading-relaxed transition-colors duration-500 sm:col-start-3 sm:mt-0",
                    isActive || reducedMotion ? "text-mute" : "text-mute-dim"
                  )}
                >
                  {step.text}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
