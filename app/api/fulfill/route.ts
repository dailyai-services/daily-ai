import { NextResponse } from "next/server";
import { canFulfillDirectly, fulfillRequest } from "@/services/ai/fulfillment";
import { normalizeRequirement } from "@/services/ai/normalizer";
import { resolveOllamaTarget } from "@/services/ai/ollamaClient";
import type { AnalysisTurn, FulfillmentEvent } from "@/types/request";

const MAX_TEXT_LENGTH = 4000;
const MAX_DELIVERABLE_LENGTH = 30000;
const MAX_TURNS = 12;

function readText(value: unknown, max: number): string {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function readTurns(value: unknown): AnalysisTurn[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter(
      (turn): turn is Record<string, unknown> =>
        Boolean(turn) && typeof turn === "object"
    )
    .map((turn) => ({
      role: turn.role === "assistant" ? ("assistant" as const) : ("user" as const),
      content: readText(turn.content, MAX_TEXT_LENGTH),
    }))
    .filter((turn) => turn.content.length > 0)
    .slice(-MAX_TURNS);
}

/**
 * Builds the deliverable for an approved AI-direct request and streams
 * progress as newline-delimited JSON (`FulfillmentEvent`s).
 */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    const parsed: unknown = await request.json();
    body = parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : {};
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const rawRequirement =
    body.requirement && typeof body.requirement === "object"
      ? (body.requirement as Record<string, unknown>)
      : null;
  const summary = readText(rawRequirement?.summary, MAX_TEXT_LENGTH);

  if (!rawRequirement || !summary) {
    return NextResponse.json(
      { error: "An analysed requirement is required." },
      { status: 400 }
    );
  }

  const requirement = normalizeRequirement(rawRequirement, { prompt: summary });

  if (!canFulfillDirectly(requirement)) {
    return NextResponse.json(
      { error: "This request needs a provider or a person, not direct AI fulfilment." },
      { status: 400 }
    );
  }

  // Fail closed: no local model means no fulfilment, never a paid fallback.
  if (!resolveOllamaTarget()) {
    return NextResponse.json(
      { error: "DAILY AI's local engine is not configured. Nothing was charged." },
      { status: 503 }
    );
  }

  const rawRevision =
    body.revision && typeof body.revision === "object"
      ? (body.revision as Record<string, unknown>)
      : null;
  const previous = readText(rawRevision?.previous, MAX_DELIVERABLE_LENGTH);
  const feedback = readText(rawRevision?.feedback, MAX_TEXT_LENGTH);
  const revision = previous && feedback ? { previous, feedback } : undefined;

  const turns = readTurns(body.turns);
  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const send = (event: FulfillmentEvent) => {
        try {
          controller.enqueue(encoder.encode(`${JSON.stringify(event)}\n`));
        } catch {
          // The browser went away; nothing left to tell it.
        }
      };

      try {
        const deliverable = await fulfillRequest(
          { requirement, turns, revision },
          (stage) => send({ type: "stage", stage }),
          request.signal
        );
        send({ type: "done", deliverable });
      } catch (error) {
        if (!request.signal.aborted) {
          console.warn(
            "[DAILY AI] Fulfilment failed:",
            error instanceof Error ? error.message : error
          );
          send({
            type: "error",
            message:
              "DAILY AI's local engine could not finish this. Make sure Ollama is running, then try again. Nothing was charged.",
          });
        }
      } finally {
        try {
          controller.close();
        } catch {
          // Already closed by a disconnect.
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "application/x-ndjson; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}

export async function GET() {
  return NextResponse.json(
    { error: "Use POST with an analysed requirement to fulfil it." },
    { status: 405 }
  );
}
