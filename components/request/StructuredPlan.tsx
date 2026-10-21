"use client";

import React from "react";
import {
  ArrowRight,
  Check,
  CircleHelp,
  Clock,
  IndianRupee,
  Route,
  Sparkles,
  Target,
} from "lucide-react";
import type { StructuredRequirement } from "@/types/request";
import { cn, formatBudget, formatConfidence } from "@/lib/utils";

interface StructuredPlanProps {
  requirement: StructuredRequirement;
  selectedRouteId?: string;
  onSelectRoute?: (routeId: string) => void;
  onAskQuestion?: (question: string) => void;
  footer?: React.ReactNode;
  className?: string;
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="eyebrow mb-3 flex items-center gap-2">
      <span className="h-px w-4 bg-signal/50" aria-hidden="true" />
      {children}
    </h4>
  );
}

export function StructuredPlan({
  requirement,
  selectedRouteId,
  onSelectRoute,
  onAskQuestion,
  footer,
  className,
}: StructuredPlanProps) {
  const activeRouteId = selectedRouteId ?? requirement.recommendedRouteId;
  const range = requirement.budgetRange;

  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 bg-ink-raise/80 backdrop-blur-xl",
        className
      )}
    >
      {/* Header */}
      <div className="border-b border-white/[0.07] p-6 sm:p-7">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-signal/30 bg-signal/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-signal">
            <Target className="h-3 w-3" aria-hidden="true" />
            {requirement.category}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-paper/70">
            <Sparkles className="h-3 w-3" aria-hidden="true" />
            {requirement.fulfillmentMethodLabel}
          </span>
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-mute">
            {formatConfidence(requirement.confidence)} confidence
          </span>
        </div>

        <h3 className="mt-5 text-balance text-2xl font-semibold leading-tight tracking-tight text-paper sm:text-[1.75rem]">
          {requirement.summary}
        </h3>

        <p className="mt-3 text-sm leading-relaxed text-mute">
          <span className="text-paper/85">Next action:</span>{" "}
          {requirement.nextAction}
        </p>
      </div>

      <div className="grid gap-7 p-6 sm:p-7">
        {/* Requirement */}
        <section>
          <SectionLabel>What we understood</SectionLabel>
          <dl className="divide-y divide-white/[0.06] border-y border-white/[0.06]">
            {requirement.requirements.map((field, index) => (
              <div
                key={`${field.label}-${index}`}
                className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[minmax(0,10rem)_1fr] sm:gap-6"
              >
                <dt className="text-xs font-medium uppercase tracking-wider text-mute-dim">
                  {field.label}
                </dt>
                <dd className="text-sm leading-relaxed text-paper/90">
                  {field.value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Estimates */}
        <section className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
            <SectionLabel>Estimated timeline</SectionLabel>
            <p className="flex items-center gap-2 text-lg font-semibold tracking-tight text-paper">
              <Clock className="h-4 w-4 text-iris" aria-hidden="true" />
              {requirement.timelineEstimate}
            </p>
          </div>

          <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5">
            <SectionLabel>Estimated budget</SectionLabel>
            <p className="flex items-center gap-2 text-lg font-semibold tracking-tight text-paper">
              <IndianRupee className="h-4 w-4 text-signal" aria-hidden="true" />
              {requirement.budgetEstimate}
            </p>
            {range && range.min !== range.max ? (
              <div className="mt-4 flex items-center gap-3">
                <span className="font-mono text-[11px] text-mute">
                  {formatBudget(range.min, range.currency)}
                </span>
                <span className="relative h-px flex-1 bg-white/15">
                  <span className="absolute left-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-signal" />
                  <span className="absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-signal" />
                </span>
                <span className="font-mono text-[11px] text-mute">
                  {formatBudget(range.max, range.currency)}
                </span>
              </div>
            ) : null}
          </div>
        </section>

        {/* Missing information */}
        {requirement.missingInformationQuestions.length > 0 ? (
          <section>
            <SectionLabel>Missing information</SectionLabel>
            <ul className="space-y-2">
              {requirement.missingInformationQuestions.map((question, index) => (
                <li
                  key={`${question.label}-${index}`}
                  className="flex items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3"
                >
                  <CircleHelp
                    className="mt-0.5 h-4 w-4 shrink-0 text-mute-dim"
                    aria-hidden="true"
                  />
                  <span className="text-sm leading-relaxed text-paper/85">
                    {question.label}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {/* Suggested questions */}
        {requirement.suggestedQuestions.length > 0 ? (
          <section>
            <SectionLabel>Suggested next questions</SectionLabel>
            <ul className="space-y-2">
              {requirement.suggestedQuestions.map((question, index) => {
                const interactive = Boolean(onAskQuestion);
                return (
                  <li key={`${question}-${index}`}>
                    <button
                      type="button"
                      disabled={!interactive}
                      onClick={() => onAskQuestion?.(question)}
                      className={cn(
                        "group flex w-full items-start gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3 text-left transition-colors",
                        interactive &&
                          "hover:border-signal/40 hover:bg-signal/[0.05] focus-visible:border-signal/60"
                      )}
                    >
                      <span className="mt-0.5 font-mono text-[11px] text-mute-dim">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 text-sm leading-relaxed text-paper/85">
                        {question}
                      </span>
                      {interactive ? (
                        <ArrowRight
                          className="mt-0.5 h-4 w-4 shrink-0 text-mute-dim transition-transform group-hover:translate-x-0.5 group-hover:text-signal"
                          aria-hidden="true"
                        />
                      ) : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        ) : null}

        {/* Routes */}
        {requirement.fulfillmentRoutes.length > 0 ? (
          <section>
            <SectionLabel>
              <span className="inline-flex items-center gap-2">
                <Route className="h-3 w-3" aria-hidden="true" />
                Fulfilment routes
              </span>
            </SectionLabel>
            <div className="space-y-2.5">
              {requirement.fulfillmentRoutes.map((route) => {
                const active = route.id === activeRouteId;
                const selectable = Boolean(onSelectRoute);
                return (
                  <div
                    key={route.id}
                    role={selectable ? "radio" : undefined}
                    aria-checked={selectable ? active : undefined}
                    tabIndex={selectable ? 0 : undefined}
                    onClick={() => onSelectRoute?.(route.id)}
                    onKeyDown={(event) => {
                      if (!selectable) return;
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        onSelectRoute?.(route.id);
                      }
                    }}
                    className={cn(
                      "rounded-2xl border p-4 transition-colors sm:p-5",
                      active
                        ? "border-signal/45 bg-signal/[0.06]"
                        : "border-white/[0.07] bg-white/[0.02]",
                      selectable && "cursor-pointer hover:border-white/25"
                    )}
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h5 className="flex items-center gap-2 text-sm font-semibold text-paper">
                        {route.title}
                        {route.id === requirement.recommendedRouteId ? (
                          <span className="rounded-full border border-mint/40 bg-mint/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-mint">
                            Recommended
                          </span>
                        ) : null}
                      </h5>
                      <span className="font-mono text-xs text-signal">
                        {route.estimatedPrice}
                      </span>
                    </div>

                    <p className="mt-2 text-sm leading-relaxed text-mute">
                      {route.description}
                    </p>

                    <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-white/[0.06] pt-3 font-mono text-[11px] uppercase tracking-wider text-mute-dim">
                      <span>Timeline: {route.estimatedTimeline}</span>
                      <span>Match: {route.confidence}%</span>
                      <span className="capitalize">{route.type.replace(/_/g, " ")}</span>
                    </div>

                    {route.pros.length > 0 ? (
                      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
                        {route.pros.slice(0, 3).map((pro) => (
                          <li
                            key={pro}
                            className="flex items-start gap-1.5 text-xs text-paper/70"
                          >
                            <Check
                              className="mt-0.5 h-3 w-3 shrink-0 text-signal"
                              aria-hidden="true"
                            />
                            {pro}
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                );
              })}
            </div>
          </section>
        ) : null}

        {footer ? <div className="pt-1">{footer}</div> : null}
      </div>
    </div>
  );
}
