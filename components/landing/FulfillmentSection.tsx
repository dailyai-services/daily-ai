"use client";

import React from "react";
import { Zap, Users, ShieldCheck, CheckCircle2 } from "lucide-react";

export function FulfillmentSection() {
  return (
    <section 
      id="fulfillment" 
      className="relative min-h-screen w-full py-32 px-4 sm:px-6 lg:px-8 bg-[#070709] border-t border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-[11px] uppercase tracking-[0.2em] text-[#10B981] mb-4">
            <span>Chapter 05</span>
          </div>
          <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-6">
            AI when AI can do it. <br />
            <span className="text-zinc-500 font-light">People when people are needed.</span>
          </h2>
          <p className="text-base sm:text-xl text-zinc-400 font-light leading-relaxed">
            We do not pretend AI can replace everything. DAILY AI intelligently pairs machine speed with vetted human craft and local services.
          </p>
        </div>

        {/* Dual Fulfillment Architectural Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Pillar 1: Direct AI & Tools */}
          <div className="relative rounded-3xl bg-zinc-950/80 border border-white/10 p-8 sm:p-10 flex flex-col justify-between hover:border-white/20 transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white mb-8">
                <Zap className="w-5 h-5 text-[#D2FF3A]" />
              </div>

              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
                Automated Route
              </span>
              <h3 className="text-2xl font-bold text-white mb-4">
                Direct AI & Tool Execution
              </h3>
              <p className="text-sm text-zinc-400 font-light leading-relaxed mb-8">
                For tasks that software, algorithms, code, and language models can solve instantly. Zero delay, automated precision, and negligible friction.
              </p>

              <ul className="space-y-3 text-xs text-zinc-300 font-light">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D2FF3A]" />
                  <span>Instant data formatting, extraction & document synthesis</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D2FF3A]" />
                  <span>Interactive web application & landing page generation</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#D2FF3A]" />
                  <span>Research deconstruction & custom study curriculum</span>
                </li>
              </ul>
            </div>

            <div className="mt-10 pt-6 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-500 font-mono">
              <span>Velocity: Immediate</span>
              <span className="text-[#D2FF3A]">AI Direct →</span>
            </div>
          </div>

          {/* Pillar 2: Human & Verified Provider Network */}
          <div className="relative rounded-3xl bg-zinc-950/80 border border-white/10 p-8 sm:p-10 flex flex-col justify-between hover:border-white/20 transition-all duration-300">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-white/[0.05] border border-white/10 flex items-center justify-center text-white mb-8">
                <Users className="w-5 h-5 text-[#10B981]" />
              </div>

              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-500 block mb-2">
                Curated Route
              </span>
              <h3 className="text-2xl font-bold text-white mb-4">
                Verified Provider Orchestration
              </h3>
              <p className="text-sm text-zinc-400 font-light leading-relaxed mb-8">
                For physical presence, specialized craft, local real estate, and high-stakes procurement. We compare verified quotes and oversee fulfillment.
              </p>

              <ul className="space-y-3 text-xs text-zinc-300 font-light">
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>Vetted local photographers, videographers & designers</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>Direct owner real estate visits & legal title checks</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
                  <span>Verified manufacturing suppliers & competitive bulk RFQ</span>
                </li>
              </ul>
            </div>

            <div className="mt-10 pt-6 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-500 font-mono">
              <span>Human Oversight: Built-in</span>
              <span className="text-[#10B981]">Provider Match →</span>
            </div>
          </div>
        </div>

        {/* Trust & Transparency Note */}
        <div className="mt-12 rounded-2xl bg-zinc-950/40 border border-white/5 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-[#10B981]" />
            <p className="text-xs text-zinc-400 font-light">
              High-value transactions, unusual requests, or sensitive decisions always mandate human review. No blind recommendations.
            </p>
          </div>
          <span className="text-[10px] text-zinc-600 uppercase font-mono tracking-wider whitespace-nowrap">
            Zero Hidden Cost
          </span>
        </div>
      </div>
    </section>
  );
}
