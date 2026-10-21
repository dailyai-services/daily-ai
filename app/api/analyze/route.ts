import { NextResponse } from "next/server";
import { analyzeRequirement } from "@/services/ai/providerRegistry";
import type { AnalysisTurn } from "@/types/request";

const MAX_PROMPT_LENGTH = 4000;
const MAX_TURNS = 12;

function readTurns(value: unknown): AnalysisTurn[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter(
      (turn): turn is Record<string, unknown> =>
        Boolean(turn) && typeof turn === "object"
    )
    .map((turn) => ({
      role: turn.role === "assistant" ? ("assistant" as const) : ("user" as const),
      content:
        typeof turn.content === "string" ? turn.content.trim().slice(0, MAX_PROMPT_LENGTH) : "",
    }))
    .filter((turn) => turn.content.length > 0)
    .slice(-MAX_TURNS);
}

export async function POST(request: Request) {
  try {
    const body: unknown = await request.json();
    const record =
      body && typeof body === "object" ? (body as Record<string, unknown>) : {};

    const rawPrompt = record.prompt;
    const prompt =
      typeof rawPrompt === "string" ? rawPrompt.trim().slice(0, MAX_PROMPT_LENGTH) : "";

    if (!prompt) {
      return NextResponse.json(
        { error: "Prompt is required and must be a non-empty string." },
        { status: 400 }
      );
    }

    const turns = readTurns(record.turns);

    const { requirement, provider } = await analyzeRequirement(prompt, {
      turns: turns.length ? turns : undefined,
    });

    return NextResponse.json({
      success: true,
      data: requirement,
      provider,
      meta: {
        freeTier: true,
        providerLabel: provider.label,
        charged: false,
      },
    });
  } catch (error) {
    console.error("Analysis API error:", error);
    return NextResponse.json(
      {
        error:
          "DAILY AI is temporarily unable to process this request. Please try again in a moment.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      error: "Use POST with a prompt to analyse a requirement.",
    },
    { status: 405 }
  );
}
