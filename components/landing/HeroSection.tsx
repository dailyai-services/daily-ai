import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Paperclip, Mic } from 'lucide-react';
import { ROTATING_PLACEHOLDERS } from '@/config/categories';

interface HeroSectionProps {
  onSubmitRequest: (prompt: string) => void;
}

export function HeroSection({ onSubmitRequest }: HeroSectionProps) {
  const [inputValue, setInputValue] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % ROTATING_PLACEHOLDERS.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onSubmitRequest(inputValue);
  };

  const handleQuickPrompt = (promptText: string) => {
    setInputValue(promptText);
    onSubmitRequest(promptText);
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-12 pb-24 overflow-hidden">
      {/* Background radial glow & grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-600/10 blur-[140px] rounded-full pointer-events-none"></div>
      
      {/* Abstract intelligent core illustration */}
      <div className="relative mb-8 flex items-center justify-center">
        <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 opacity-30 blur-md animate-pulse"></div>
        <div className="relative px-4 py-1.5 rounded-full bg-zinc-900/95 border border-zinc-800 text-xs text-zinc-300 flex items-center gap-2 shadow-xl">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="font-medium text-white">DAILY AI Core v1.0</span>
          <span className="text-zinc-500">|</span>
          <span className="text-indigo-400">Request → Intelligence → Fulfillment</span>
        </div>
      </div>

      {/* Main Headline */}
      <div className="text-center max-w-4xl mx-auto space-y-6 z-10">
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.05]">
          Tell us what <br />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            you need.
          </span>
        </h1>
        
        <p className="text-lg sm:text-2xl text-zinc-400 max-w-2xl mx-auto font-normal leading-relaxed">
          One place to ask. We&apos;ll figure out the best way forward—whether through AI, software tools, or trusted providers.
        </p>
      </div>

      {/* Central Request Box */}
      <div className="w-full max-w-3xl mx-auto mt-10 z-10">
        <form
          onSubmit={handleSubmit}
          className={`relative rounded-2xl transition-all duration-300 bg-zinc-950/80 backdrop-blur-2xl border ${
            isFocused ? "border-indigo-500/80 shadow-2xl shadow-indigo-500/20" : "border-zinc-800 hover:border-zinc-700"
          }`}
        >
          <div className="p-3 sm:p-4">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              rows={3}
              placeholder={ROTATING_PLACEHOLDERS[placeholderIndex]}
              className="w-full bg-transparent text-white placeholder-zinc-600 text-base sm:text-lg resize-none focus:outline-none px-2"
            />

            <div className="flex items-center justify-between pt-3 border-t border-zinc-900 mt-2">
              <div className="flex items-center gap-2 text-zinc-400 text-xs sm:text-sm">
                <button
                  type="button"
                  onClick={() => alert("File & image upload UI is ready for attachment integration.")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 transition-colors border border-zinc-800/80"
                  title="Attach file or image"
                >
                  <Paperclip className="w-4 h-4 text-indigo-400" />
                  <span className="hidden sm:inline">Attach</span>
                </button>
                <button
                  type="button"
                  onClick={() => alert("Voice input placeholder ready for speech recognition.")}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-300 transition-colors border border-zinc-800/80"
                  title="Voice input"
                >
                  <Mic className="w-4 h-4 text-purple-400" />
                  <span className="hidden sm:inline">Voice</span>
                </button>
                <span className="text-zinc-600 hidden md:inline">| Press Enter to submit</span>
              </div>

              <button
                type="submit"
                disabled={!inputValue.trim()}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm transition-all shadow-lg ${
                  inputValue.trim()
                    ? "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white shadow-indigo-500/25 scale-[1.02]"
                    : "bg-zinc-900 text-zinc-600 cursor-not-allowed border border-zinc-800"
                }`}
              >
                <span>Analyze Request</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </form>

        {/* Quick Sample Chips */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-zinc-500 font-medium mr-1">Try asking:</span>
          {[
            "I need a website for my business",
            "Find me a 2BHK near Whitefield",
            "I need 500 units of custom packaging",
            "I need a photographer this Saturday"
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickPrompt(prompt)}
              className="text-xs px-3 py-1.5 rounded-full bg-zinc-900/90 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 transition-all hover:border-zinc-700"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
