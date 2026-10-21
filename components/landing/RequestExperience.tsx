"use client";

import React, { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { reveal } from "@/lib/reveal";
import { cn } from "@/lib/utils";

interface RequestExperienceProps {
  onSubmitRequest: (prompt: string) => void;
}

const ROTATING_PROMPTS = [
  "I need a website for my business.",
  "Find me a 2BHK near Whitefield under ₹80 lakh.",
  "I need 500 units at the best wholesale price.",
  "Teach me quantum physics like I'm a beginner.",
  "I need a photographer for this Saturday.",
  "I need a 30-second Instagram reel edited.",
  "Find the best supplier for my product.",
];

const SAMPLES = [
  "Website for my business",
  "2BHK near Whitefield",
  "500 wholesale units",
  "Teach me quantum physics",
];

export function RequestExperience({ onSubmitRequest }: RequestExperienceProps) {
  const [prompt, setPrompt] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % ROTATING_PROMPTS.length);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onSubmitRequest(prompt.trim());
  };

  const handleChipClick = (sample: string) => {
    setPrompt(sample);
    onSubmitRequest(sample);
  };

  const ready = prompt.trim().length > 0;

  return (
    <section id="request" className="relative px-4 py-32 sm:py-44">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="aurora-line absolute inset-x-0 top-0 h-px opacity-30" />
        <div className="absolute left-1/2 top-1/2 h-[36rem] w-[52rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(167,139,250,0.1),rgba(122,162,255,0.04)_45%,transparent_70%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        <div data-reveal style={reveal(0)} className="eyebrow">
          Try it
        </div>
        <h2
          data-reveal
          style={reveal(100)}
          className="mt-8 text-balance text-[clamp(2.4rem,6.4vw,5.6rem)] font-semibold leading-[0.98] tracking-[-0.045em] text-paper"
        >
          What do you need <span className="serif-accent font-normal">today?</span>
        </h2>

        <form onSubmit={handleSubmit} data-reveal style={reveal(200)} className="mt-16">
          <label htmlFor="landing-request" className="sr-only">
            Describe what you need
          </label>
          <textarea
            id="landing-request"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            rows={2}
            placeholder={ROTATING_PROMPTS[placeholderIndex]}
            className="w-full resize-none bg-transparent text-[clamp(1.5rem,3.6vw,2.6rem)] font-medium leading-tight tracking-[-0.025em] text-paper placeholder:text-paper/20 focus:outline-none focus-visible:outline-none"
          />

          {/* Underline that comes alive on focus */}
          <div className="relative h-px w-full bg-white/10">
            <div
              aria-hidden="true"
              className={cn(
                "aurora-line absolute inset-0 origin-left transition-transform duration-700 ease-[var(--ease-out-expo)]",
                isFocused || ready ? "scale-x-100" : "scale-x-0"
              )}
            />
          </div>

          <div className="mt-6 flex flex-col-reverse gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-mute-dim">
              Enter to send · Shift + Enter for a new line
            </p>
            <button
              type="submit"
              disabled={!ready}
              className={cn(
                "inline-flex items-center gap-2 self-start rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-300",
                ready
                  ? "bg-paper text-ink hover:bg-white"
                  : "bg-white/[0.04] text-mute-dim"
              )}
            >
              Figure it out
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </form>

        <div
          data-reveal
          style={reveal(300)}
          className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-mute-dim">
            Or try
          </span>
          {SAMPLES.map((sample) => (
            <button
              key={sample}
              type="button"
              onClick={() => handleChipClick(sample)}
              className="text-mute underline decoration-white/10 underline-offset-[6px] transition-colors hover:text-paper hover:decoration-iris"
            >
              {sample}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
