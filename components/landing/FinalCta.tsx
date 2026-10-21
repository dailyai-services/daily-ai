"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { reveal } from "@/lib/reveal";

interface FinalCtaProps {
  onOpenRequest: () => void;
}

export function FinalCta({ onOpenRequest }: FinalCtaProps) {
  return (
    <section className="relative isolate flex min-h-[90svh] items-center overflow-hidden px-4 py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-drift-a absolute left-1/2 top-[60%] h-[40rem] w-[60rem] max-w-[140%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(167,139,250,0.16),rgba(122,162,255,0.06)_40%,transparent_68%)] blur-3xl" />
        <div className="animate-drift-b absolute left-[64%] top-[70%] h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(240,171,252,0.1),transparent_62%)] blur-3xl" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl text-center">
        <h2
          data-reveal
          style={reveal(0, 40)}
          className="display-tight text-balance text-[clamp(3.2rem,13vw,11rem)] font-semibold tracking-[-0.055em] text-paper"
        >
          Tell us what
          <br />
          you <span className="serif-accent font-normal aurora-text pr-[0.06em]">need.</span>
        </h2>

        <p
          data-reveal
          style={reveal(150)}
          className="mx-auto mt-10 max-w-md text-balance text-lg leading-relaxed text-mute"
        >
          One sentence. A clear plan. The right path to done.
        </p>

        <div data-reveal style={reveal(260)} className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={onOpenRequest}
            className="group inline-flex items-center gap-3 rounded-full bg-paper px-8 py-4 text-sm font-semibold text-ink shadow-[0_0_60px_rgba(167,139,250,0.25)] transition-shadow duration-500 hover:shadow-[0_0_90px_rgba(167,139,250,0.4)]"
          >
            Start a request
            <ArrowRight
              className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
