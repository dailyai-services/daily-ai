export type RequestCategory =
  | "Digital & Technology"
  | "Creative"
  | "Business"
  | "Education"
  | "Local Services"
  | "Procurement"
  | "General";

export interface RequirementField {
  label: string;
  value: string;
}

export type FulfillmentRouteType =
  | "direct"
  | "external_provider"
  | "marketplace_match"
  | "human_review";

export interface FulfillmentRoute {
  id: string;
  title: string;
  description: string;
  type: FulfillmentRouteType;
  estimatedPrice: string;
  estimatedTimeline: string;
  confidence: number; // 0 - 100
  pros: string[];
  cons: string[];
}

/**
 * The six fulfilment paths DAILY AI can take once it understands a request.
 */
export type FulfillmentMethod =
  | "ai_direct"
  | "automate"
  | "provider_match"
  | "compare_options"
  | "coordinate"
  | "human_escalation";

export interface FulfillmentMethodMeta {
  id: FulfillmentMethod;
  label: string;
  detail: string;
}

export const FULFILLMENT_METHODS: FulfillmentMethodMeta[] = [
  {
    id: "ai_direct",
    label: "Do it with AI",
    detail:
      "Software, code and models can produce the deliverable directly. No handoff, no waiting.",
  },
  {
    id: "automate",
    label: "Automate it",
    detail:
      "A repeatable business task becomes a running workflow, monitored end to end.",
  },
  {
    id: "provider_match",
    label: "Find a provider",
    detail:
      "Matched with a verified human or local specialist who can actually do the work.",
  },
  {
    id: "compare_options",
    label: "Compare options",
    detail:
      "Quotes, prices and providers lined up side by side so the decision is yours.",
  },
  {
    id: "coordinate",
    label: "Coordinate fulfillment",
    detail:
      "Multi-step work sequenced, tracked and delivered by one accountable owner.",
  },
  {
    id: "human_escalation",
    label: "Escalate to a human",
    detail:
      "High stakes, unusual or sensitive requests are handed to a DAILY AI specialist.",
  },
];

export interface BudgetRange {
  min: number;
  max: number;
  currency: string;
  label: string;
  confidence: "low" | "medium" | "high";
}

export interface StructuredRequirement {
  /** What the user actually needs, in one line. */
  category: RequestCategory;
  summary: string;
  /** The requirement, decomposed into named parts. */
  requirements: RequirementField[];
  /** Estimated budget when it can be estimated. */
  budgetEstimate: string;
  /** Parsed budget range for visualisation. Null when it cannot be estimated. */
  budgetRange: BudgetRange | null;
  /** Estimated timeline. */
  timelineEstimate: string;
  /** Facts still missing from the request. */
  missingInformationQuestions: RequirementField[];
  /** Natural-language questions DAILY AI wants to ask next. */
  suggestedQuestions: string[];
  /** The fulfilment path this request needs. */
  fulfillmentMethod: FulfillmentMethod;
  fulfillmentMethodLabel: string;
  /** The single next thing that happens. */
  nextAction: string;
  /** How confident DAILY AI is in the read of the request (0 - 100). */
  confidence: number;
  fulfillmentRoutes: FulfillmentRoute[];
  recommendedRouteId: string;
  /** The model's own conversational answer to the user, when it gave one. */
  reply?: string;
  /** False when the message was not a request yet (a greeting, small talk). */
  isRequest?: boolean;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: string;
  structuredData?: StructuredRequirement;
  status?: "analyzing" | "ready" | "completed" | "human_review_required";
}

export interface CategoryInfo {
  id: RequestCategory;
  name: string;
  description: string;
  iconName: string;
  popularExamples: string[];
}

export interface AnalysisTurn {
  role: "user" | "assistant";
  content: string;
}

export interface AnalysisContext {
  turns?: AnalysisTurn[];
}
