"use client";

import React, { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Copy,
  Download,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";
import type { Deliverable, FulfillmentStage } from "@/types/request";
import type { FulfillmentStatus } from "@/hooks/useFulfillment";
import { MarkdownView } from "@/components/request/MarkdownView";
import { RobotAvatar } from "@/components/request/RobotAvatar";
import { cn } from "@/lib/utils";

interface DeliverablePanelProps {
  status: FulfillmentStatus;
  stage: FulfillmentStage | null;
  deliverable: Deliverable | null;
  error: string | null;
  onRevise: (feedback: string) => void;
  onRetry: () => void;
  onBackToPlan: () => void;
}

const STAGES: { id: FulfillmentStage; label: string; detail: string }[] = [
  { id: "build", label: "Build", detail: "Writing the deliverable" },
  { id: "check", label: "Check", detail: "Comparing it with your request" },
  { id: "fix", label: "Fix", detail: "Fixing what the check found" },
];

function fileNameFor(title: string): string {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);
  return `${slug || "daily-ai-deliverable"}.md`;
}

export function DeliverablePanel({
  status,
  stage,
  deliverable,
  error,
  onRevise,
  onRetry,
  onBackToPlan,
}: DeliverablePanelProps) {
  const [feedback, setFeedback] = useState("");
  const [copied, setCopied] = useState(false);
  const working = status === "working";

  const handleCopy = async () => {
    if (!deliverable) return;
    try {
      await navigator.clipboard.writeText(deliverable.content);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  const handleDownload = () => {
    if (!deliverable) return;
    const blob = new Blob([deliverable.content], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileNameFor(deliverable.title);
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleRevise = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = feedback.trim();
    if (!trimmed || working) return;
    onRevise(trimmed);
    setFeedback("");
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-ink-raise/80">
      {/* Header */}
      <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] px-6 py-4 sm:px-7">
        <button
          type="button"
          onClick={onBackToPlan}
          className="inline-flex items-center gap-1.5 text-xs text-mute transition-colors hover:text-paper"
        >
          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
          Plan
        </button>

        {deliverable && !working ? (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-paper/85 transition-colors hover:border-white/25"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-signal" aria-hidden="true" />
              ) : (
                <Copy className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              {copied ? "Copied" : "Copy"}
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs text-paper/85 transition-colors hover:border-white/25"
            >
              <Download className="h-3.5 w-3.5" aria-hidden="true" />
              Download
            </button>
          </div>
        ) : null}
      </div>

      {/* Progress */}
      {working ? (
        <div className="border-b border-white/[0.07] px-6 py-6 sm:px-7" role="status">
          <div className="flex items-center gap-3">
            <RobotAvatar thinking />
            <div>
              <p className="text-sm font-medium text-paper">
                {deliverable ? "Applying your changes" : "DAILY AI is building it"}
              </p>
              <p className="text-xs text-mute">
                Runs on the local engine, free. This can take a minute.
              </p>
            </div>
          </div>

          <ol className="mt-6 grid grid-cols-3 gap-3">
            {STAGES.map((item) => {
              const order = STAGES.findIndex((entry) => entry.id === item.id);
              const current = STAGES.findIndex((entry) => entry.id === stage);
              const active = item.id === stage;
              const done = current > order;
              return (
                <li key={item.id} className="min-w-0">
                  <div
                    className={cn(
                      "h-0.5 rounded-full transition-colors duration-500",
                      active ? "bg-signal" : done ? "bg-signal/50" : "bg-white/10"
                    )}
                  />
                  <p
                    className={cn(
                      "mt-2 font-mono text-[10px] uppercase tracking-[0.18em]",
                      active ? "text-signal" : done ? "text-paper/70" : "text-mute-dim"
                    )}
                  >
                    {item.label}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-mute">{item.detail}</p>
                </li>
              );
            })}
          </ol>
        </div>
      ) : null}

      {/* Error */}
      {status === "error" && error ? (
        <div className="px-6 py-6 sm:px-7">
          <div
            role="alert"
            className="rounded-2xl border border-ember/30 bg-ember/[0.06] p-5 text-sm leading-relaxed text-paper/90"
          >
            {error}
          </div>
          <button
            type="button"
            onClick={onRetry}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-paper px-5 py-2.5 text-sm font-semibold text-ink"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Try again
          </button>
        </div>
      ) : null}

      {/* Deliverable */}
      {deliverable ? (
        <div className={cn("px-6 py-6 transition-opacity sm:px-7", working && "opacity-40")}>
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/30 bg-signal/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-signal">
              <ShieldCheck className="h-3 w-3" aria-hidden="true" />
              {deliverable.checks.passed
                ? "Checked"
                : `Checked · fixed ${deliverable.checks.notes.length} issue${
                    deliverable.checks.notes.length === 1 ? "" : "s"
                  }`}
            </span>
            <span className="text-xs text-mute">
              Facts marked (verify) need a quick check before you use them.
            </span>
          </div>

          <MarkdownView content={deliverable.content} />

          {/* Ask for changes */}
          <form onSubmit={handleRevise} className="hairline-t mt-8 flex items-center gap-3 pt-6">
            <label htmlFor="deliverable-feedback" className="sr-only">
              Ask for changes
            </label>
            <input
              id="deliverable-feedback"
              type="text"
              value={feedback}
              onChange={(event) => setFeedback(event.target.value)}
              disabled={working}
              placeholder="Ask for changes, e.g. make it shorter, add a slide on costs..."
              className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-paper outline-none transition-colors placeholder:text-mute-dim focus:border-signal/50"
            />
            <button
              type="submit"
              disabled={!feedback.trim() || working}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-colors",
                feedback.trim() && !working
                  ? "bg-paper text-ink hover:bg-white"
                  : "cursor-not-allowed border border-white/10 bg-white/[0.03] text-mute-dim"
              )}
            >
              Update
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      ) : null}
    </div>
  );
}
