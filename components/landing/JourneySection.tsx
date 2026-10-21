"use client";

import React from "react";
import { MessageSquareText, Cpu, Split, CheckSquare, PackageCheck } from "lucide-react";

export function JourneySection() {
  const steps = [
    {
      num: "01",
      title: "Tell us what you need",
      description: "No complex prompts. Write what you need in everyday language or attach relevant context.",
      icon: MessageSquareText,
    },
    {
      num: "02",
      title: "DAILY AI understands",
      description: "We isolate key requirements, detect ambiguities, and request only essential details.",
      icon: Cpu,
    },
    {
      num: "03",
      title: "Options & estimates evaluated",
      description: "Direct fulfillment vs. vetted provider quotes, with transparent timelines and budgets.",
      icon: Split,
    },
    {
      num: "04",
      title: "You approve the plan",
      description: "Review the clear terms and structured roadmap before any commitment or execution.",
      icon: CheckSquare,
    },
    {
      num: "05",
      title: "Delivered to completion",
      description: "Continuous real-time progress tracking until final handoff and satisfaction.",
      icon: PackageCheck,
    },
  ];

  return (
    <section 
      id="journey" 
      className="relative min-h-screen w-full py-32 px-4 sm:px-6 lg:px-8 bg-[#070709] border-t border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-[11px] uppercase tracking-[0.2em] text-zinc-400 mb-4">
            <span>Chapter 06</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6">
            From asking to done.
          </h2>
          <p className="text-base sm:text-xl text-zinc-400 font-light leading-relaxed">
            A frictionless five-step continuum designed to eliminate guesswork, endless vendor calls, and execution anxiety.
          </p>
        </div>

        {/* Steps Continuum */}
        <div className="relative border-l border-white/10 ml-4 sm:ml-8 pl-8 sm:pl-12 space-y-16">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="relative group">
                {/* Node icon on line */}
                <div className="absolute -left-[45px] sm:-left-[61px] top-0 w-8 h-8 rounded-full bg-zinc-950 border border-white/20 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:border-[#D2FF3A] transition-colors">
                  <Icon className="w-3.5 h-3.5" />
                </div>

                <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-6 mb-2">
                  <span className="text-xs font-mono text-zinc-500 tracking-wider">
                    {step.num}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
                    {step.title}
                  </h3>
                </div>

                <p className="text-sm sm:text-base text-zinc-400 font-light max-w-xl leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
