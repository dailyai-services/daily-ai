"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type {
  AnalysisTurn,
  Deliverable,
  FulfillmentEvent,
  FulfillmentStage,
  StructuredRequirement,
} from "@/types/request";

export type FulfillmentStatus = "idle" | "working" | "ready" | "error";

const FAILURE_MESSAGE =
  "DAILY AI could not finish this just now. Nothing was charged - please try again.";

/**
 * Drives /api/fulfill: starts a build (or a revision), follows the streamed
 * stages and keeps the latest deliverable.
 */
export function useFulfillment() {
  const [status, setStatus] = useState<FulfillmentStatus>("idle");
  const [stage, setStage] = useState<FulfillmentStage | null>(null);
  const [deliverable, setDeliverable] = useState<Deliverable | null>(null);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => () => abortRef.current?.abort(), []);

  const run = useCallback(
    async (
      requirement: StructuredRequirement,
      turns: AnalysisTurn[],
      revision?: { previous: string; feedback: string }
    ): Promise<Deliverable | null> => {
      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;

      setStatus("working");
      setStage("build");
      setError(null);

      try {
        const response = await fetch("/api/fulfill", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ requirement, turns, revision }),
          signal: controller.signal,
        });

        if (!response.ok || !response.body) {
          const payload = (await response.json().catch(() => ({}))) as { error?: string };
          throw new Error(payload.error || FAILURE_MESSAGE);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let result: Deliverable | null = null;

        for (;;) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            if (!line.trim()) continue;
            const event = JSON.parse(line) as FulfillmentEvent;
            if (event.type === "stage") setStage(event.stage);
            if (event.type === "error") throw new Error(event.message);
            if (event.type === "done") result = event.deliverable;
          }
        }

        if (!result) throw new Error(FAILURE_MESSAGE);

        setDeliverable(result);
        setStatus("ready");
        setStage(null);
        return result;
      } catch (caught) {
        if (controller.signal.aborted) return null;
        setError(caught instanceof Error ? caught.message : FAILURE_MESSAGE);
        setStatus("error");
        setStage(null);
        return null;
      }
    },
    []
  );

  const reset = useCallback(() => {
    abortRef.current?.abort();
    setStatus("idle");
    setStage(null);
    setDeliverable(null);
    setError(null);
  }, []);

  return { status, stage, deliverable, error, run, reset };
}
