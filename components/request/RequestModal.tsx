"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import {
  AnalysisTurn,
  StructuredRequirement,
  ChatMessage,
} from "@/types/request";
import { StructuredPlan } from "@/components/request/StructuredPlan";
import { RobotAvatar } from "@/components/request/RobotAvatar";
import { TypingText } from "@/components/request/TypingText";
import { cn } from "@/lib/utils";

interface RequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

function stamp(): string {
  return "";
}

function welcomeMessage(): ChatMessage {
  return {
    id: "msg-init",
    role: "assistant",
    content:
      "Tell me what you need in plain language. I will work out what is missing, what it costs, how long it takes, and who should do it.",
    timestamp: stamp(),
  };
}

/** Earlier conversation sent with each request so follow-ups keep context. */
function toTurns(messages: ChatMessage[]): AnalysisTurn[] {
  return messages
    .filter(
      (message) =>
        message.id !== "msg-init" &&
        (message.role === "user" || message.role === "assistant")
    )
    .map((message) => ({
      role: message.role === "user" ? ("user" as const) : ("assistant" as const),
      content: message.content,
    }));
}

/** The model's own reply, or a specific one built from the plan. */
function replyFor(analysis: StructuredRequirement): string {
  if (analysis.reply) return analysis.reply;
  const question = analysis.suggestedQuestions[0];
  return question
    ? `${analysis.summary} ${question}`
    : `${analysis.summary} Here is the plan. Approve the route you want and DAILY AI takes it from there.`;
}

export function RequestModal({ isOpen, onClose, initialPrompt }: RequestModalProps) {
  const trimmedPrompt = (initialPrompt ?? "").trim();

  const [messages, setMessages] = useState<ChatMessage[]>(() =>
    trimmedPrompt
      ? [
          {
            id: "msg-seed",
            role: "user",
            content: trimmedPrompt,
            timestamp: stamp(),
          },
        ]
      : [welcomeMessage()]
  );
  const [inputVal, setInputVal] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(() => trimmedPrompt.length > 0);
  const [currentAnalysis, setCurrentAnalysis] =
    useState<StructuredRequirement | null>(null);
  const [selectedRouteId, setSelectedRouteId] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // The newest AI reply types itself out; older ones render instantly.
  const [typingId, setTypingId] = useState<string | null>(null);

  const dialogRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const runAnalysis = useCallback(async (promptText: string, turns: AnalysisTurn[] = []) => {
    const trimmed = promptText.trim();
    if (!trimmed) return;

    setIsAnalyzing(true);
    setError(null);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: trimmed, turns }),
      });

      const payload: unknown = await response.json();
      const data =
        payload && typeof payload === "object"
          ? (payload as {
              success?: boolean;
              data?: StructuredRequirement;
              error?: string;
            })
          : {};

      if (!response.ok || !data.success || !data.data) {
        throw new Error(data.error || "Analysis failed.");
      }

      const analysis = data.data;
      // Small talk gets a reply but leaves the current plan untouched.
      const isRequest = analysis.isRequest !== false;
      if (isRequest) {
        setCurrentAnalysis(analysis);
        setSelectedRouteId(
          analysis.recommendedRouteId || analysis.fulfillmentRoutes[0]?.id || ""
        );
      }

      const replyId = `ai-${Date.now()}`;
      setTypingId(replyId);
      setMessages((previous) => [
        ...previous,
        {
          id: replyId,
          role: "assistant",
          content: replyFor(analysis),
          timestamp: stamp(),
          structuredData: isRequest ? analysis : undefined,
        },
      ]);
    } catch {
      setError(
        "DAILY AI could not read that request just now. Nothing was charged - please try again."
      );
    } finally {
      setIsAnalyzing(false);
    }
  }, []);

  // Initial request coming from an example or the nav button.
  useEffect(() => {
    if (!trimmedPrompt) return;
    let cancelled = false;

    void (async () => {
      await runAnalysis(trimmedPrompt);
      if (cancelled) return;
    })();

    return () => {
      cancelled = true;
    };
  }, [trimmedPrompt, runAnalysis]);

  // Focus management, scroll lock and keyboard dismissal.
  useEffect(() => {
    if (!isOpen) return;

    previouslyFocused.current = document.activeElement as HTMLElement | null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 60);

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const node = dialogRef.current;
      if (!node) return;

      const focusable = Array.from(
        node.querySelectorAll<HTMLElement>(FOCUSABLE)
      ).filter((element) => element.offsetParent !== null);

      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, [isOpen, onClose]);

  const handleSend = (event: React.FormEvent) => {
    event.preventDefault();
    const trimmed = inputVal.trim();
    if (!trimmed || isAnalyzing) return;

    setMessages((previous) => [
      ...previous,
      {
        id: `user-${previous.length}`,
        role: "user",
        content: trimmed,
        timestamp: stamp(),
      },
    ]);
    setInputVal("");
    void runAnalysis(trimmed, toTurns(messages));
  };

  const handleApprovePlan = () => {
    setIsSubmitted(true);
    setMessages((previous) => [
      ...previous,
      {
        id: `success-${previous.length}`,
        role: "assistant",
        content:
          "Plan approved. Fulfillment is queued and the selected route has been notified. You will get updates as it moves.",
        timestamp: stamp(),
      },
    ]);
  };

  if (!isOpen) return null;

  const selectedRoute = currentAnalysis?.fulfillmentRoutes.find(
    (route) => route.id === selectedRouteId
  );

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/85 p-0 backdrop-blur-md sm:items-center sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="request-dialog-title"
        className="relative flex h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-t-[28px] border border-white/10 bg-ink shadow-[0_40px_120px_-20px_rgba(0,0,0,0.9)] sm:h-[88vh] sm:rounded-[28px]"
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-4 border-b border-white/[0.07] px-5 py-4 sm:px-7">
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-signal/30 bg-signal/10 text-signal">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <h2
                id="request-dialog-title"
                className="truncate text-sm font-semibold tracking-tight text-paper"
              >
                DAILY AI Request &amp; Fulfilment Engine
              </h2>
              <p className="truncate font-mono text-[10px] uppercase tracking-[0.18em] text-mute-dim">
                Request → Structure → Plan → Fulfilment
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close request panel"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/10 text-mute transition-colors hover:border-white/25 hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Body */}
        <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden lg:grid-cols-12">
          {/* Conversation */}
          <div className="flex min-h-0 flex-col overflow-y-auto border-white/[0.07] px-5 py-6 sm:px-7 lg:col-span-5 lg:border-r">
            <div className="space-y-5">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex flex-col",
                    message.role === "user" ? "items-end" : "items-start"
                  )}
                >
                  <div className="mb-1.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-mute-dim">
                    <span>{message.role === "user" ? "You" : "DAILY AI"}</span>
                    <span aria-hidden="true">·</span>
                    <span>{message.timestamp}</span>
                  </div>
                  <div
                    className={cn(
                      "flex max-w-[92%] items-end gap-2.5",
                      message.role === "user" && "flex-row-reverse"
                    )}
                  >
                    {message.role !== "user" ? <RobotAvatar /> : null}
                    <div
                      className={cn(
                        "min-w-0 rounded-2xl px-4 py-3 text-sm leading-relaxed",
                        message.role === "user"
                          ? "rounded-br-sm bg-signal text-ink"
                          : "rounded-bl-sm border border-white/10 bg-white/[0.04] text-paper/90"
                      )}
                    >
                      <p className="whitespace-pre-wrap">
                        {message.id === typingId ? (
                          <TypingText text={message.content} />
                        ) : (
                          message.content
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              ))}

              {isAnalyzing ? (
                <div className="flex flex-col items-start">
                  <div className="mb-1.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-mute-dim">
                    <span>DAILY AI</span>
                    <span aria-hidden="true">·</span>
                    <span>Thinking</span>
                  </div>
                  <div className="flex items-end gap-2.5">
                    <RobotAvatar thinking />
                    <div
                      role="status"
                      className="flex items-center gap-1.5 rounded-2xl rounded-bl-sm border border-white/10 bg-white/[0.04] px-4 py-4"
                    >
                      <span className="sr-only">DAILY AI is thinking</span>
                      {[0, 1, 2].map((dot) => (
                        <span
                          key={dot}
                          aria-hidden="true"
                          className="typing-dot h-1.5 w-1.5 rounded-full bg-paper/70"
                          style={{ animationDelay: `${dot * 160}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          {/* Structured plan */}
          <div className="min-h-0 overflow-y-auto px-5 py-6 sm:px-7 lg:col-span-7">
            {error ? (
              <div
                role="alert"
                className="rounded-2xl border border-ember/30 bg-ember/[0.06] p-5 text-sm leading-relaxed text-paper/90"
              >
                {error}
              </div>
            ) : null}

            {currentAnalysis ? (
              <StructuredPlan
                requirement={currentAnalysis}
                selectedRouteId={selectedRouteId}
                onSelectRoute={setSelectedRouteId}
                footer={
                  isSubmitted ? (
                    <div className="rounded-2xl border border-mint/35 bg-mint/[0.07] p-5 text-center">
                      <CheckCircle2
                        className="mx-auto h-7 w-7 text-mint"
                        aria-hidden="true"
                      />
                      <h3 className="mt-2 text-sm font-semibold text-paper">
                        Fulfilment queued
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-mute">
                        {selectedRoute
                          ? `${selectedRoute.title} has been notified and work has started.`
                          : "The selected route has been notified and work has started."}
                      </p>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={handleApprovePlan}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-signal px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-[#e0ff6b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
                    >
                      Approve plan and start fulfilment
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </button>
                  )
                }
              />
            ) : !isAnalyzing && !error ? (
              <div className="flex h-full flex-col items-center justify-center px-6 py-16 text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] text-signal">
                  <Sparkles className="h-6 w-6" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-paper">
                  Awaiting your requirement
                </h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-mute">
                  Describe what you need. DAILY AI structures it, estimates it and
                  routes it in seconds.
                </p>
              </div>
            ) : null}
          </div>
        </div>

        {/* Composer */}
        <div className="border-t border-white/[0.07] px-5 py-4 sm:px-7">
          <form onSubmit={handleSend} className="flex items-center gap-3">
            <label htmlFor="request-composer" className="sr-only">
              Add more detail
            </label>
            <input
              id="request-composer"
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(event) => setInputVal(event.target.value)}
              placeholder="Add detail, answer a question, or ask something else..."
              className="min-w-0 flex-1 rounded-full border border-white/10 bg-white/[0.04] px-5 py-3 text-sm text-paper outline-none transition-colors placeholder:text-mute-dim focus:border-signal/50"
            />
            {messages.length > 1 ? (
              <button
                type="button"
                onClick={() => {
                  setMessages([welcomeMessage()]);
                  setCurrentAnalysis(null);
                  setIsSubmitted(false);
                  setError(null);
                }}
                aria-label="Start a new request"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/10 text-mute transition-colors hover:border-white/25 hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
              </button>
            ) : null}
            <button
              type="submit"
              disabled={!inputVal.trim() || isAnalyzing}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition-all",
                inputVal.trim() && !isAnalyzing
                  ? "bg-paper text-ink hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal"
                  : "cursor-not-allowed border border-white/10 bg-white/[0.03] text-mute-dim"
              )}
            >
              Send
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
