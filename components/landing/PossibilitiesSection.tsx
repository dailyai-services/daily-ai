"use client";

import React from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";

interface PossibilitiesSectionProps {
  onSelectPrompt: (prompt: string) => void;
}

const POSSIBILITIES = [
  {
    tag: "Digital & Tech",
    title: "“I need a modern website with WhatsApp ordering for my local store.”",
    detail: "Direct code generation & deployment, or top vetted UI/UX engineer match.",
    accentColor: "#D2FF3A",
  },
  {
    tag: "Local Life",
    title: "“Find me a 2BHK near Whitefield under ₹80 lakh with power backup.”",
    detail: "Verified direct-owner listings, legal title verification, and tour scheduling.",
    accentColor: "#FFFFFF",
  },
  {
    tag: "Procurement",
    title: "“I need 500 units of custom packaging at lowest factory rate.”",
    detail: "Automated RFQ across 25+ certified manufacturing partners with price guarantee.",
    accentColor: "#D2FF3A",
  },
  {
    tag: "Creative",
    title: "“Edit a 30-second Instagram reel with dynamic subtitles and pacing.”",
    detail: "Fast AI audio-sync & styling, or matched with high-performing reel creator.",
    accentColor: "#FFFFFF",
  },
  {
    tag: "Learning",
    title: "“Teach me quantum computing concepts using simple everyday analogies.”",
    detail: "Interactive personalized lesson breakdowns, visual summaries, and key takeaways.",
    accentColor: "#FFFFFF",
  },
  {
    tag: "Events",
    title: "“I need a candid event photographer this Saturday for 4 hours.”",
    detail: "Availability verification, portfolio comparison, and guaranteed booking lock.",
    accentColor: "#D2FF3A",
  },
];

export function PossibilitiesSection({ onSelectPrompt }: PossibilitiesSectionProps) {
  return (
    <section 
      id="possibilities" 
      className="relative min-h-screen w-full py-32 px-4 sm:px-6 lg:px-8 bg-[#070709] border-t border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.02] text-[11px] uppercase tracking-[0.2em] text-[#D2FF3A] mb-4">
              <span>Chapter 03</span>
            </div>
            <h2 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-tight">
              One request. <br />
              <span className="text-zinc-500 font-light">Many possibilities.</span>
            </h2>
          </div>
          <p className="text-zinc-400 max-w-md text-sm sm:text-base font-light leading-relaxed">
            Students, business owners, creators, and families. DAILY AI takes whatever you need and determines the best execution path.
          </p>
        </div>

        {/* Dynamic Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSSIBILITIES.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onSelectPrompt(item.title.replace(/[“”]/g, ""))}
              className="group cursor-pointer relative rounded-3xl bg-zinc-950/70 border border-white/10 hover:border-white/30 p-7 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:scale-[1.01] hover:bg-zinc-900/60"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span 
                    className="text-[11px] uppercase tracking-wider font-semibold px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.04]"
                    style={{ color: item.accentColor }}
                  >
                    {item.tag}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-zinc-400 group-hover:text-black group-hover:bg-[#D2FF3A] transition-all duration-300">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>

                <p className="text-lg sm:text-xl font-medium text-white group-hover:text-zinc-200 transition-colors leading-snug mb-4">
                  {item.title}
                </p>

                <p className="text-xs text-zinc-500 font-light leading-relaxed">
                  {item.detail}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/[0.06] flex items-center justify-between text-[11px] text-zinc-600 group-hover:text-zinc-400 transition-colors">
                <span>Click to analyze requirement</span>
                <span className="text-[#D2FF3A] flex items-center gap-1 font-mono">
                  Test prompt →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
