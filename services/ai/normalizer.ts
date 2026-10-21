/**
 * DAILY AI - NORMALIZER
 *
 * Every AI provider (free tier or otherwise) returns loosely-shaped JSON.
 * This module converts any of those shapes into the single canonical
 * `StructuredRequirement` contract the UI depends on, so the front-end never
 * has to guess and a provider swap can never break the request flow.
 */

import {
  BudgetRange,
  FulfillmentMethod,
  FulfillmentRoute,
  FulfillmentRouteType,
  RequestCategory,
  RequirementField,
  StructuredRequirement,
} from "@/types/request";

export const REQUEST_CATEGORIES: RequestCategory[] = [
  "Digital & Technology",
  "Creative",
  "Business",
  "Education",
  "Local Services",
  "Procurement",
  "General",
];

export const FULFILLMENT_METHOD_LABELS: Record<FulfillmentMethod, string> = {
  ai_direct: "Do it with AI",
  automate: "Automate it",
  provider_match: "Find a provider",
  compare_options: "Compare options",
  coordinate: "Coordinate fulfillment",
  human_escalation: "Escalate to a human",
};

const ROUTE_TYPES: FulfillmentRouteType[] = [
  "direct",
  "external_provider",
  "marketplace_match",
  "human_review",
];

const METHOD_ALIASES: Record<string, FulfillmentMethod> = {
  ai_direct: "ai_direct",
  ai: "ai_direct",
  direct: "ai_direct",
  direct_ai: "ai_direct",
  do_it_with_ai: "ai_direct",
  automate: "automate",
  automation: "automate",
  automated: "automate",
  provider_match: "provider_match",
  provider: "provider_match",
  marketplace_match: "provider_match",
  external_provider: "provider_match",
  find_provider: "provider_match",
  compare_options: "compare_options",
  compare: "compare_options",
  comparison: "compare_options",
  coordinate: "coordinate",
  coordination: "coordinate",
  coordinate_fulfillment: "coordinate",
  orchestrate: "coordinate",
  human_escalation: "human_escalation",
  human_review: "human_escalation",
  human: "human_escalation",
  escalation: "human_escalation",
};

function text(value: unknown, fallback = ""): string {
  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : fallback;
  }
  if (typeof value === "number" && Number.isFinite(value)) return String(value);
  return fallback;
}

function list(value: unknown): unknown[] {
  return Array.isArray(value) ? value : [];
}

function record(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" ? (value as Record<string, unknown>) : {};
}

export function normalizeCategory(value: unknown): RequestCategory {
  const candidate = text(value);
  const direct = REQUEST_CATEGORIES.find(
    (category) => category.toLowerCase() === candidate.toLowerCase()
  );
  if (direct) return direct;
  const loose = REQUEST_CATEGORIES.find((category) =>
    candidate.toLowerCase().includes(category.split(" ")[0].toLowerCase())
  );
  return loose ?? "General";
}

export function normalizeField(value: unknown): RequirementField | null {
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const separator = trimmed.search(/[:\u2013\u2014]/);
    if (separator > 0 && separator < 40) {
      return {
        label: trimmed.slice(0, separator).trim(),
        value: trimmed.slice(separator + 1).trim() || "\u2014",
      };
    }
    return { label: "Note", value: trimmed };
  }

  const source = record(value);
  if (Object.keys(source).length === 0) return null;

  const label =
    text(source.label) || text(source.name) || text(source.key) || "Requirement";
  const valueText =
    text(source.value) ||
    text(source.description) ||
    text(source.detail) ||
    text(source.answer);

  return { label, value: valueText || "\u2014" };
}

export function normalizeFields(value: unknown): RequirementField[] {
  return list(value)
    .map(normalizeField)
    .filter((field): field is RequirementField => field !== null);
}

export function normalizeRoute(
  value: unknown,
  index: number
): FulfillmentRoute | null {
  const source = record(value);
  const title = text(source.title) || text(source.name);
  if (!title) return null;

  const rawType = text(source.type).toLowerCase() as FulfillmentRouteType;
  const type = ROUTE_TYPES.includes(rawType) ? rawType : "direct";

  const rawConfidence = Number(source.confidence);
  const confidence = Number.isFinite(rawConfidence)
    ? Math.min(100, Math.max(0, Math.round(rawConfidence)))
    : 70;

  return {
    id: text(source.id) || `route-${index + 1}`,
    title,
    description:
      text(source.description) ||
      "A fulfilment path proposed for this requirement.",
    type,
    estimatedPrice:
      text(source.estimatedPrice) || text(source.price) || "To be confirmed",
    estimatedTimeline:
      text(source.estimatedTimeline) || text(source.timeline) || "To be confirmed",
    confidence,
    pros: list(source.pros).map((item) => text(item)).filter(Boolean),
    cons: list(source.cons).map((item) => text(item)).filter(Boolean),
  };
}

export function normalizeMethod(value: unknown): FulfillmentMethod | null {
  const candidate = text(value).toLowerCase().replace(/[\s-]+/g, "_");
  if (!candidate) return null;
  return METHOD_ALIASES[candidate] ?? null;
}

/**
 * Parses a human budget label ("₹15,000 – ₹25,000", "₹65L – ₹78L") into a
 * numeric range so the UI can visualise it. Returns null when the budget
 * genuinely cannot be estimated.
 */
export function parseBudgetRange(label: string): BudgetRange | null {
  if (!label) return null;

  const symbolMatch = label.match(/[\u20b9$€£]/);
  const currency = symbolMatch ? symbolMatch[0] : "INR";

  const pattern = /([\u20b9$€£])\s*(\d[\d,]*(?:\.\d+)?)\s*([KkLlMm])?/g;
  const values: number[] = [];

  for (const match of label.matchAll(pattern)) {
    const base = Number(match[2].replace(/,/g, ""));
    if (!Number.isFinite(base)) continue;
    const suffix = match[3]?.toUpperCase();
    const multiplier =
      suffix === "K" ? 1_000 : suffix === "L" ? 100_000 : suffix === "M" ? 1_000_000 : 1;
    values.push(base * multiplier);
    if (values.length === 2) break;
  }

  if (values.length === 0) return null;

  const min = values[0];
  const max = values.length > 1 ? values[1] : values[0];

  return {
    min: Math.min(min, max),
    max: Math.max(min, max),
    currency,
    label: label.trim(),
    confidence: values.length > 1 ? "medium" : "low",
  };
}

export function normalizeRequirement(
  raw: unknown,
  fallback: { prompt: string; category?: RequestCategory }
): StructuredRequirement {
  const source = record(raw);

  const category = normalizeCategory(source.category ?? fallback.category);

  const summary =
    text(source.summary) ||
    text(source.understanding) ||
    (fallback.prompt.length > 90
      ? `${fallback.prompt.slice(0, 87)}...`
      : fallback.prompt);

  const requirements = normalizeFields(source.requirements);
  if (requirements.length === 0) {
    requirements.push({ label: "Request", value: summary });
  }

  const missingInformationQuestions = normalizeFields(
    source.missingInformationQuestions ?? source.missingInformation ?? source.gaps
  );

  const suggestedQuestions = list(
    source.suggestedQuestions ?? source.nextQuestions ?? source.questions
  )
    .map((item) => text(item))
    .filter(Boolean);

  const budgetEstimate =
    text(source.budgetEstimate) || text(source.budget) || "To be estimated";

  const routes = list(source.fulfillmentRoutes)
    .map(normalizeRoute)
    .filter((route): route is FulfillmentRoute => route !== null);

  const fulfillmentRoutes: FulfillmentRoute[] =
    routes.length > 0
      ? routes
      : [
          {
            id: "route-1",
            title: "DAILY AI Orchestrated Fulfillment",
            description:
              "One accountable path from requirement to delivery, supervised end to end.",
            type: "direct",
            estimatedPrice: "To be confirmed",
            estimatedTimeline: "To be confirmed",
            confidence: 70,
            pros: ["Single point of accountability"],
            cons: ["Scope confirmation needed before execution"],
          },
        ];

  const recommendedRouteId =
    text(source.recommendedRouteId) || fulfillmentRoutes[0].id;

  const reply = text(source.reply);

  const method = normalizeMethod(source.fulfillmentMethod) ?? "coordinate";

  const rawConfidence = Number(source.confidence);
  const confidence = Number.isFinite(rawConfidence)
    ? Math.min(100, Math.max(0, Math.round(rawConfidence)))
    : fulfillmentRoutes[0].confidence;

  return {
    category,
    summary,
    requirements,
    budgetEstimate,
    budgetRange: parseBudgetRange(budgetEstimate),
    timelineEstimate:
      text(source.timelineEstimate) || text(source.timeline) || "To be estimated",
    missingInformationQuestions,
    suggestedQuestions,
    fulfillmentMethod: method,
    fulfillmentMethodLabel:
      text(source.fulfillmentMethodLabel) || FULFILLMENT_METHOD_LABELS[method],
    nextAction:
      text(source.nextAction) ||
      "Review the structured plan and approve the recommended fulfilment path.",
    confidence,
    fulfillmentRoutes,
    recommendedRouteId,
    ...(reply ? { reply } : {}),
    ...(source.isRequest === false ? { isRequest: false } : {}),
  };
}
