"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Loader2, RotateCcw, Sparkles } from "lucide-react";
import { useRequestAnalysis } from "@/hooks/useRequestAnalysis";
import { StructuredPlan } from "@/components/request/StructuredPlan";
import { cn } from "@/lib/utils";

export interface RequestExample {
  label: string;
  prompt: string;
}

interface RequestConsoleProps {
  examples?: RequestExample[];
  placeholder?: string;
  className?: string;
}

const DEFAULT_PLACEHOLDER =
  "I need a website for my bakery with WhatsApp ordering and a menu page...";

export function RequestConsole({
  examples = [],
  placeholder = DEFAULT_PLACEHOLDER,
  className,
}: RequestConsoleProps) {
  const { status, requirement, error, providerLabel, submit, reset } =
    useRequestAnalysis();

  const [value, setValue] = useState("");
  const [hint, setHint] = useState<string | null>(null);
  const [focused, setFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const resultRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (status === "ready" && resultRef.current) {
      resultRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [status]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || status === "analyzing") return;

    const contextTurns = hint
      ? [{ role: "assistant" as const, content: hint }]
      : [];

    setValue("");
    setHint(null);
    void submit(trimmed, contextTurns);
  };

  const handleExample = (prompt: string) => {
    setValue("");
    setHint(null);
    void submit(prompt);
  };

  const handleAskQuestion = (question: string) => {
    setHint(question);
    setValue("");
    textareaRef.current?.focus();
  };

  const handleReset = () => {
    reset();
    setValue("");
    setHint(null);
  };

  const isAnalyzing = status === "analyzing";

  return (
    <div className={cn("w-full", className)}>
      <form
        onSubmit={handleSubmit}
        className={cn(
          "rounded-[28px] border bg-ink-raise/70 backdrop-blur-xl transition-all duration-500",
          focused
            ? "border-signal/45 shadow-[0_0_70px_-20px_rgba(210,255,58,0.35)]"
            : "border-white/10 hover:border-white/20"
        )}
      >
        <div className="p-5 sm:p-7">
          {hint ? (
            <p className="mb-3 flex items-start gap-2 rounded-xl border border-signal/25 bg-signal/[0.06] px-4 py-3 text-sm leading-relaxed text-paper/90">
              <Sparkles
                className="mt-0.5 h-4 w-4 shrink-0 text-signal"
                aria-hidden="true"
              />
              <span>
                <span className="font-medium text-signal">Answer this: </span>
                {hint}
              </span>
            </p>
          ) : null}

          <label htmlFor="daily-request" className="sr-only">
            Describe what you need
          </label>
          <textarea
            id="daily-request"
            ref={textareaRef}
            value={value}
            onChange={(event) => setValue(event.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSubmit(event);
              }
            }}
            rows={3}
            spellCheck={false}
            placeholder={placeholder}
            aria-describedby="daily-request-hint"
            className="w-full resize-none bg-transparent text-lg leading-relaxed text-paper outline-none placeholder:text-mute-dim sm:text-xl"
          />

          <div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] pt-4">
            <p
              id="daily-request-hint"
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute-dim"
            >
              Plain language is enough · no cost
            </p>

            <div className="flex items-center gap-3">
              {requirement ? (
                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-1.5 rounded-full px-3 py-2 text-xs font-medium text-mute transition-colors hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  Start over
                </button>
              ) : null}

              <button
                type="submit"
                disabled={!value.trim() || isAnalyzing}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300",
                  value.trim() && !isAnalyzing
                    ? "bg-signal text-ink hover:bg-[#e0ff6b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
                    : "cursor-not-allowed border border-white/10 bg-white/[0.04] text-mute-dim"
                )}
              >
                {isAnalyzing ? (
                  <>
                    <Loader2
                      className="h-4 w-4 animate-spin"
                      aria-hidden="true"
                    />
                    Reading it
                  </>
                ) : (
                  <>
                    Figure it out
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>

      {examples.length > 0 && !requirement ? (
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="eyebrow mr-1">Or start with</span>
          {examples.map((example) => (
            <button
              key={example.label}
              type="button"
              onClick={() => handleExample(example.prompt)}
              className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-mute transition-colors hover:border-signal/40 hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
            >
              {example.label}
            </button>
          ))}
        </div>
      ) : null}

      <div ref={resultRef} aria-live="polite" className="mt-8">
        {isAnalyzing ? (
          <div className="rounded-3xl border border-white/10 bg-ink-raise/60 p-7">
            <div className="flex items-center gap-3">
              <Loader2
                className="h-4 w-4 animate-spin text-signal"
                aria-hidden="true"
              />
              <p className="text-sm text-paper/85">
                Reading the request, finding the gaps, checking the routes.
              </p>
            </div>
            <div className="mt-6 space-y-3">
              <div className="skeleton h-4 w-3/4 rounded" />
              <div className="skeleton h-4 w-1/2 rounded" />
              <div className="skeleton h-24 w-full rounded-2xl" />
            </div>
          </div>
        ) : null}

        {error ? (
          <div
            role="alert"
            className="rounded-3xl border border-ember/30 bg-ember/[0.06] p-6 text-sm leading-relaxed text-paper/90"
          >
            {error}
          </div>
        ) : null}

        {requirement ? (
          <StructuredPlan
            requirement={requirement}
            onAskQuestion={handleAskQuestion}
            footer={
              providerLabel ? (
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-mute-dim">
                  Analysed by {providerLabel} · free tier · nothing charged
                </p>
              ) : null
            }
          />
        ) : null}
      </div>
    </div>
  );
}
