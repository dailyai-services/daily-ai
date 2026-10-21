"use client";

import { useCallback, useRef, useState } from "react";
import type { AnalysisTurn, StructuredRequirement } from "@/types/request";

export type RequestStatus = "idle" | "analyzing" | "ready" | "error";

const ERROR_MESSAGE =
  "DAILY AI could not read that request just now. Nothing was charged - try again in a moment.";

export function useRequestAnalysis() {
  const [status, setStatus] = useState<RequestStatus>("idle");
  const [requirement, setRequirement] = useState<StructuredRequirement | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [providerLabel, setProviderLabel] = useState<string | null>(null);

  const turnsRef = useRef<AnalysisTurn[]>([]);

  const submit = useCallback(
    async (prompt: string, contextTurns: AnalysisTurn[] = []) => {
      const trimmed = prompt.trim();
      if (!trimmed) return;

      setStatus("analyzing");
      setError(null);

      const turns = [
        ...turnsRef.current,
        ...contextTurns,
        { role: "user" as const, content: trimmed },
      ];
      turnsRef.current = turns;

      try {
        const response = await fetch("/api/analyze", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt: trimmed, turns: turns.slice(-8) }),
        });

        const payload: unknown = await response.json();
        const data =
          payload && typeof payload === "object"
            ? (payload as {
                success?: boolean;
                data?: StructuredRequirement;
                error?: string;
                provider?: { label?: string };
              })
            : {};

        if (!response.ok || !data.success || !data.data) {
          throw new Error(data.error || "Analysis failed.");
        }

        setRequirement(data.data);
        setProviderLabel(data.provider?.label ?? null);
        setStatus("ready");

        turnsRef.current = [
          ...turns,
          { role: "assistant", content: data.data.summary },
        ];
      } catch {
        setError(ERROR_MESSAGE);
        setStatus("error");
      }
    },
    []
  );

  const reset = useCallback(() => {
    turnsRef.current = [];
    setRequirement(null);
    setError(null);
    setStatus("idle");
  }, []);

  return { status, requirement, error, providerLabel, submit, reset };
}
