import React from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface ExamplesSectionProps {
  onSelectExample: (prompt: string) => void;
}

export function ExamplesSection({ onSelectExample }: ExamplesSectionProps) {
  const examples = [
    {
      category: "Digital & Technology",
      prompt: "I need a professional website for my new business with 5 pages and WhatsApp chat."
    },
    {
      category: "Local Services",
      prompt: "Find me a 2BHK apartment near Whitefield under ₹80 lakh with gated security."
    },
    {
      category: "Procurement",
      prompt: "I need 500 units of custom cotton t-shirts at the best wholesale price."
    },
    {
      category: "Creative",
      prompt: "I need a 30-second Instagram reel edited with engaging captions and dynamic transitions."
    },
    {
      category: "Education",
      prompt: "Teach me quantum physics like I'm a beginner with intuitive analogies."
    },
    {
      category: "Local Services",
      prompt: "I need an event photographer this Saturday for a 3-hour family celebration."
    }
  ];

  return (
    <section id="examples" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-3">
              Real World Versatility
            </h2>
            <h3 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
              Whatever the request, start here.
            </h3>
          </div>
          <p className="text-zinc-400 max-w-md text-base">
            From everyday errands and local services to software, design, and procurement. Click any example to test the live AI analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {examples.map((item, idx) => (
            <div
              key={idx}
              onClick={() => onSelectExample(item.prompt)}
              className="group cursor-pointer rounded-2xl bg-zinc-900/40 border border-zinc-800/80 p-6 hover:border-indigo-500/50 hover:bg-zinc-900/80 transition-all duration-300 flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs px-3 py-1 rounded-full bg-indigo-950/80 text-indigo-300 border border-indigo-800/55 font-medium">
                    {item.category}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-white group-hover:bg-indigo-600 transition-all">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-white text-lg font-medium group-hover:text-indigo-200 transition-colors leading-snug">
                  &ldquo;{item.prompt}&rdquo;
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs text-zinc-500">
                <span>Click to analyze requirement</span>
                <span className="text-indigo-400 font-semibold flex items-center gap-1 opacity-0 group-hover:opacity-150 transition-opacity">
                  <Sparkles className="w-3 h-3" /> Run AI
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
