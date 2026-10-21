import React from 'react';
import { MessageSquare, Cpu, GitBranch, CheckCircle2, Zap } from 'lucide-react';

export function HowItWorksSection() {
  const steps = [
    {
      number: "01",
      title: "Tell us what you need.",
      description: "Describe any everyday requirement in plain natural language, attach files, or share links.",
      icon: MessageSquare
    },
    {
      number: "02",
      title: "DAILY AI understands.",
      description: "Our intelligent engine analyzes the core intent, scope, and missing details instantly.",
      icon: Cpu
    },
    {
      number: "03",
      title: "We find the best path.",
      description: "Evaluating direct execution, software tools, multiple vetted providers, or cost options.",
      icon: GitBranch
    },
    {
      number: "04",
      title: "You approve the plan.",
      description: "Review structured estimates, timeline, and pricing before any fulfillment begins.",
      icon: CheckCircle2
    },
    {
      number: "05",
      title: "We handle the rest.",
      description: "Sit back while DAILY AI orchestrates completion, updates, and final delivery.",
      icon: Zap
    }
  ];

  return (
    <section id="how-it-works" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-zinc-950/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-3">
            Simple & Transparent Process
          </h2>
          <h3 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            How DAILY AI works for you
          </h3>
          <p className="text-zinc-400 mt-4 text-base sm:text-lg">
            Instead of figuring out who to call, what tools to use, or how to coordinate, start here.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((step, idx) => {
            const IconComponent = step.icon;
            return (
              <div
                key={idx}
                className="relative rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-6 flex flex-col justify-between hover:border-zinc-700 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-3xl font-black text-indigo-500/40 group-hover:text-indigo-400 transition-colors">
                      {step.number}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-zinc-800/80 flex items-center justify-center text-indigo-400 border border-zinc-700/50">
                      <IconComponent className="w-5 h-5" />
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2 tracking-tight">
                    {step.title}
                  </h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
                <div className="mt-8 pt-4 border-t border-zinc-800/55 flex items-center justify-between text-xs text-zinc-500 font-medium">
                  <span>Step {idx + 1} of 5</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
