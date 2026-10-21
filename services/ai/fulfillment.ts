/**
 * DAILY AI - AI-DIRECT FULFILLMENT
 *
 * Produces the actual deliverable for requests DAILY AI can complete itself
 * (presentations, documents, website copy, lessons...). Every task runs
 * Build -> Check -> Fix on the local Ollama model, so it costs nothing.
 * There is no offline or paid fallback: if the local model is unavailable
 * the task fails closed and says so.
 */

import type {
  AnalysisTurn,
  Deliverable,
  FulfillmentStage,
  StructuredRequirement,
} from "@/types/request";
import { ollamaChat } from "./ollamaClient";
import { extractJson } from "./prompt";

// Deliverables are long and a laptop generates them slowly.
const GENERATION_TIMEOUT_MS = 240_000;
const CHECK_TIMEOUT_MS = 90_000;
const CONTEXT_TOKENS = 8192;
const DELIVERABLE_TOKENS = 1800;

const BUILD_PROMPT = `You are DAILY AI's production engine. You produce the finished deliverable the user asked for, ready to use as it is.

Rules:
- Deliver the work itself. Never describe what you would do, never say "here is", never add a sign-off.
- Write in clean Markdown. Start with a single "# Title" line that names the whole deliverable (for example "# Sugar Loaf Website Copy"), not just its first part.
- Be concise and high quality: aim for under 700 words unless the brief asks for more. Tight beats long.
- Follow every detail in the brief: counts (slides, pages, words), audience, tone, language and format.
- Formats:
  - Presentation: one section per slide as "## Slide N: Title", 3-5 tight bullets, then a line "Speaker notes: ..." .
  - Website copy: one "## Page" section per page, with headline, subheadline, body copy and calls to action.
  - Report or document: an executive summary, then clearly headed sections, then key takeaways.
  - Lesson or explanation: plain-language explanation, worked examples, common mistakes, and a 3-question quick check with answers.
  - Anything else: the most useful structure for that deliverable.
- Never invent facts only the user can know: names, prices, phone numbers, addresses, equipment, history, awards or specific products they did not mention. Use clear placeholders like [Your phone number] or [Your signature bake].
- Statistics, dates and figures: only use ones you are confident about, and mark each one "(verify)" so the user checks it before using it.
- Keep it specific to this user. No generic filler.`;

const CHECK_PROMPT = `You are DAILY AI's quality checker. Compare the deliverable with the brief.

Check: does it fully deliver what was asked (including counts like number of slides or pages), is anything missing or unfinished, does it invent facts it should have left as placeholders, and is it specific rather than generic?

Return ONLY JSON: {"passed": true or false, "issues": ["short, specific problem", "..."]}
Set "passed" to true when there are no real problems. List at most 5 issues. Ignore small style preferences.`;

const FIX_PROMPT = `You are DAILY AI's production engine. Rewrite the deliverable so it fixes every listed issue and still follows the brief.
Return the complete improved deliverable in Markdown, starting with "# Title". Do not mention the issues or explain changes.`;

const REVISE_PROMPT = `You are DAILY AI's production engine. The user reviewed the deliverable and asked for changes.
Apply their feedback fully while keeping everything else that was good. If they ask to add something (a slide, a section, a page), add it as a new one rather than merging it into an existing one. Mark any statistic, date or figure you add with "(verify)". Return the complete updated deliverable in Markdown, starting with "# Title". Do not explain the changes.`;

export interface FulfillmentInput {
  requirement: StructuredRequirement;
  turns?: AnalysisTurn[];
  /** Present when the user asks for changes to an earlier deliverable. */
  revision?: { previous: string; feedback: string };
}

export function canFulfillDirectly(requirement: StructuredRequirement): boolean {
  return requirement.fulfillmentMethod === "ai_direct";
}

function buildBrief({ requirement, turns = [] }: FulfillmentInput): string {
  const details = requirement.requirements
    .map((field) => `- ${field.label}: ${field.value}`)
    .join("\n");
  const conversation = turns
    .slice(-8)
    .map((turn) => `${turn.role === "user" ? "User" : "DAILY AI"}: ${turn.content}`)
    .join("\n");

  return [
    `Request: ${requirement.summary}`,
    `Category: ${requirement.category}`,
    details ? `Details:\n${details}` : "",
    conversation ? `Conversation with the user:\n${conversation}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");
}

function titleOf(content: string, fallback: string): string {
  const heading = content.match(/^#\s+(.+)$/m);
  return heading ? heading[1].trim() : fallback;
}

/** Strips stray code fences some models wrap Markdown in. */
function cleanMarkdown(text: string): string {
  return text
    .replace(/^```(?:markdown|md)?\s*\n/i, "")
    .replace(/\n```\s*$/, "")
    .trim();
}

async function generate(
  system: string,
  user: string,
  signal?: AbortSignal
): Promise<string> {
  const text = await ollamaChat({
    temperature: 0.5,
    maxTokens: DELIVERABLE_TOKENS,
    contextTokens: CONTEXT_TOKENS,
    timeoutMs: GENERATION_TIMEOUT_MS,
    signal,
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
  });
  return cleanMarkdown(text);
}

async function check(
  brief: string,
  draft: string,
  signal?: AbortSignal
): Promise<{ passed: boolean; issues: string[] }> {
  try {
    const text = await ollamaChat({
      json: true,
      temperature: 0,
      maxTokens: 600,
      contextTokens: CONTEXT_TOKENS,
      timeoutMs: CHECK_TIMEOUT_MS,
      signal,
      messages: [
        { role: "system", content: CHECK_PROMPT },
        { role: "user", content: `Brief:\n${brief}\n\nDeliverable:\n${draft}` },
      ],
    });
    const result = extractJson(text) as { passed?: unknown; issues?: unknown };
    const issues = Array.isArray(result.issues)
      ? result.issues
          .filter((issue): issue is string => typeof issue === "string")
          .map((issue) => issue.trim())
          .filter(Boolean)
          .slice(0, 5)
      : [];
    return { passed: result.passed === true || issues.length === 0, issues };
  } catch (error) {
    // A broken check must not throw away a finished deliverable.
    if (signal?.aborted) throw error;
    return { passed: true, issues: [] };
  }
}

/**
 * Runs Build -> Check -> Fix and reports each stage as it starts.
 */
export async function fulfillRequest(
  input: FulfillmentInput,
  onStage: (stage: FulfillmentStage) => void,
  signal?: AbortSignal
): Promise<Deliverable> {
  const brief = buildBrief(input);

  onStage("build");
  const draft = input.revision
    ? await generate(
        REVISE_PROMPT,
        `Brief:\n${brief}\n\nCurrent deliverable:\n${input.revision.previous}\n\nUser feedback:\n${input.revision.feedback}`,
        signal
      )
    : await generate(BUILD_PROMPT, brief, signal);

  onStage("check");
  const review = await check(brief, draft, signal);

  let content = draft;
  if (!review.passed && review.issues.length > 0) {
    onStage("fix");
    content = await generate(
      FIX_PROMPT,
      `Brief:\n${brief}\n\nDeliverable:\n${draft}\n\nIssues to fix:\n${review.issues
        .map((issue) => `- ${issue}`)
        .join("\n")}`,
      signal
    );
  }

  return {
    title: titleOf(content, input.requirement.summary),
    content,
    checks: { passed: review.passed, notes: review.issues },
  };
}
