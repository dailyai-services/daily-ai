"use client";

import React from "react";
import { RequestConsole } from "@/components/request/RequestConsole";
import { reveal } from "@/lib/reveal";

const EXAMPLES = [
  { label: "Website", prompt: "I need a website for my bakery with WhatsApp ordering" },
  { label: "Photographer", prompt: "Find me an event photographer this Saturday for 3 hours" },
  { label: "Compare prices", prompt: "Compare prices for 500 custom printed boxes across suppliers" },
  { label: "Presentation", prompt: "Create a 10-slide investor presentation from these notes" },
  { label: "Find a product", prompt: "Find the best noise-cancelling headphones under 5000" },
  { label: "Automate a task", prompt: "Automate daily invoice reminders from my spreadsheet" },
  { label: "Local service", prompt: "Find a trusted AC technician near me for a gas refill" },
];

export function RequestStory() {
  return (
    <section
      id="request"
      className="relative px-4 py-24 sm:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[38rem] w-[38rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(167,139,250,0.12),rgba(167,139,250,0)_64%)] blur-3xl" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-5xl">
        <div className="text-center" data-reveal style={reveal(0)}>
          <div className="eyebrow mx-auto mb-6 inline-flex items-center gap-2">
            <span className="h-px w-4 bg-white/30" aria-hidden="true" />
            Tell us what you need
            <span className="h-px w-4 bg-white/30" aria-hidden="true" />
          </div>
          <h2 className="display-tight text-balance text-[clamp(2.8rem,10vw,8rem)] font-semibold tracking-[-0.045em] text-paper">
            One sentence is plenty.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-mute sm:text-xl">
            Describe it as you would to a person. DAILY AI asks only what is
            necessary, builds a plan, and shows how to get it done.
          </p>
        </div>

        <div className="mt-12" data-reveal style={reveal(140)}>
          <RequestConsole
            examples={EXAMPLES}
            placeholder="Tell DAILY AI what you need..."
          />
        </div>
      </div>
    </section>
  );
}
