"use client";

import React, { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { reveal } from "@/lib/reveal";
import { usePrefersReducedMotion } from "@/hooks/useScrollProgress";
import { cn } from "@/lib/utils";

interface RequestTickerProps {
  onSelectPrompt: (prompt: string) => void;
}

// Illustrative readings only; real plans come from the request flow.
const EXAMPLES = [
  {
    prompt: "I need a website for my bakery with WhatsApp ordering.",
    route: "Build with AI",
    timeline: "3–5 days",
    detail: "Menu page, order button, domain",
  },
  {
    prompt: "Find me an event photographer this Saturday for 3 hours.",
    route: "Trusted provider",
    timeline: "Confirmed in 24h",
    detail: "3 shortlisted, quotes compared",
  },
  {
    prompt: "Compare prices for 500 custom printed boxes.",
    route: "Compare options",
    timeline: "Same day",
    detail: "Suppliers, MOQ, delivery dates",
  },
  {
    prompt: "Automate daily invoice reminders from my spreadsheet.",
    route: "Automate it",
    timeline: "1 day",
    detail: "Runs every morning at 9:00",
  },
  {
    prompt: "Create a 10-slide investor deck from my notes.",
    route: "Build with AI",
    timeline: "Within hours",
    detail: "Narrative, charts, speaker notes",
  },
];

const TYPE_MS = 32;
const HOLD_MS = 3600;

export function RequestTicker({ onSelectPrompt }: RequestTickerProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [typed, setTyped] = useState(0);

  const example = EXAMPLES[active];
  const done = reducedMotion || typed >= example.prompt.length;

  useEffect(() => {
    if (reducedMotion) return;

    const timer = window.setTimeout(
      () => {
        if (typed < example.prompt.length) {
          setTyped(typed + 1);
        } else {
          setTyped(0);
          setActive((active + 1) % EXAMPLES.length);
        }
      },
      typed < example.prompt.length ? TYPE_MS : HOLD_MS
    );

    return () => window.clearTimeout(timer);
  }, [typed, active, example.prompt.length, reducedMotion]);

  const select = (index: number) => {
    setActive(index);
    setTyped(0);
  };

  const shown = done ? example.prompt : example.prompt.slice(0, typed);

  return (
    <section id="examples" className="relative px-4 py-32 sm:py-44">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="aurora-line absolute inset-x-0 top-0 h-px opacity-30" />
        <div className="absolute right-[8%] top-1/3 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(122,162,255,0.08),rgba(122,162,255,0)_62%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div data-reveal style={reveal(0)} className="eyebrow">
          Real requests
        </div>

        {/* The live request */}
        <div
          data-reveal
          style={reveal(120)}
          className="mt-10 min-h-[9.5em] text-[clamp(2rem,5.6vw,4.6rem)] font-medium leading-[1.04] tracking-[-0.035em] text-paper sm:min-h-[6.5em] md:min-h-[4.5em]"
        >
          <span className="sr-only">{example.prompt}</span>
          <span aria-hidden="true">
            &ldquo;{shown}
            {done ? <>&rdquo;</> : <span className="caret" />}
          </span>
        </div>

        {/* What DAILY AI understood */}
        <dl
          className={cn(
            "mt-10 grid grid-cols-1 gap-6 transition-[opacity,transform] duration-700 ease-[var(--ease-out-expo)] sm:grid-cols-3",
            done ? "opacity-100" : "translate-y-2 opacity-0"
          )}
        >
          {[
            ["Route", example.route],
            ["Timeline", example.timeline],
            ["Includes", example.detail],
          ].map(([label, value]) => (
            <div key={label} className="hairline-t pt-4">
              <dt className="font-mono text-[10px] uppercase tracking-[0.26em] text-mute-dim">
                {label}
              </dt>
              <dd className="mt-2 text-lg text-paper/90">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-12 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          {/* Example index */}
          <div className="flex items-center gap-3" role="tablist" aria-label="Request examples">
            {EXAMPLES.map((item, index) => (
              <button
                key={item.prompt}
                type="button"
                role="tab"
                aria-selected={index === active}
                aria-label={item.prompt}
                onClick={() => select(index)}
                className="group py-3"
              >
                <span
                  className={cn(
                    "block h-px transition-all duration-500",
                    index === active
                      ? "w-12 bg-iris"
                      : "w-6 bg-white/20 group-hover:bg-white/50"
                  )}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => onSelectPrompt(example.prompt)}
            className="group inline-flex items-center gap-2 self-start text-sm font-medium text-paper"
          >
            <span className="underline decoration-white/20 underline-offset-[6px] transition-colors group-hover:decoration-iris">
              Try this request
            </span>
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
