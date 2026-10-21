"use client";

import React from "react";
import { Cpu, Search, Sparkles, Filter, CheckCircle2 } from "lucide-react";

export function IntelligenceSection() {
  const flowSteps = [
    {
      label: "Intake",
      title: "One Request",
      desc: "Natural language input without needing technical jargon or artificial prompts.",
      icon: Sparkles,
      color: "#FFFFFF",
    },
    {
      label: "Analysis",
      title: "Understand",
      desc: "Instant deconstruction into scope, budget ranges, timelines, and missing parameters.",
      icon: Cpu,
      color: "#A78BFA",
    },
    {
      label: "Orchestration",
      title: "Figure It Out",
      desc: "Evaluating whether the task is best fulfilled by AI code, tools, or human experts.",
      icon: Search,
      color: "#A78BFA",
    },
    {
      label: "Decision",
      title: "Find The Best Path",
      desc: "Generating clear quotes, timelines, and options for user review and approval.",
      icon: Filter,
      color: "#FFFFFF",
    },
    {
      label: "Delivery",
      title: "Get It Done",
      desc: "Continuous supervision and seamless final handoff with end-to-end accountability.",
      icon: CheckCircle2,
      color: "#D2FF3A",
    },
  ];

  return (
    <section 
      id="intelligence" 
      className="relative min-h-screen w-full py-32 px-4 sm:px-6 lg:px-8 bg-[#070709] border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background ambient glow - Vivid Violet */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#A78BFA]/[0.03] blur-[150px] pointer-events-none rounded-full"
        aria-hidden="true"
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-[11px] uppercase tracking-[0.2em] text-[#A78BFA] mb-4">
            <span>Chapter 04</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6">
            We figure out the best way forward.
          </h2>
          <p className="text-base sm:text-xl text-zinc-400 font-light leading-relaxed">
            DAILY AI isn&apos;t just answering questions. It is an intelligent fulfillment engine designed to bridge the gap between intent and real-world execution.
          </p>
        </div>

        {/* Abstract Orchestration Visual Flow */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[1px] bg-gradient-to-r from-white/10 via-[#A78BFA]/40 to-[#D2FF3A]/30 -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 relative z-10">
            {flowSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div
                  key={idx}
                  className="rounded-3xl bg-zinc-950/90 border border-white/10 hover:border-[#A78BFA]/50 p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 shadow-xl group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500">
                        0{idx + 1}
                      </span>
                      <div 
                        className="w-10 h-10 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center transition-transform group-hover:scale-110"
                        style={{ color: step.color }}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <span className="text-[10px] uppercase tracking-wider text-zinc-500 font-mono block mb-1">
                      {step.label}
                    </span>
                    <h3 className="text-lg font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-xs text-zinc-400 font-light leading-relaxed">
                      {step.desc}
                    </p>
                  </div>

                  <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center gap-2">
                    <span 
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: step.color }}
                    />
                    <span className="text-[10px] text-zinc-500 tracking-wider uppercase font-mono">
                      Phase {idx + 1}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
