/**
 * DAILY AI - AI PROVIDER CONTRACT
 *
 * The request engine talks to providers through this interface only.
 * Swapping Gemini for any other (free-tier) model is a matter of writing a
 * new provider and registering it - no UI or API route changes required.
 */

import { AnalysisContext, StructuredRequirement } from "@/types/request";

export interface AIProvider {
  /** Stable identifier, e.g. "gemini-free" or "local-mock". */
  id: string;
  /** Human readable provider name surfaced in the API response. */
  label: string;
  /**
   * Cost tier. DAILY AI is free-first: every registered provider must declare
   * "free". The registry refuses to run anything else.
   */
  tier: "free";
  /** True when the provider can run right now (key present, model allowed). */
  isConfigured(): boolean;
  /** Analyses a natural-language request into the canonical structure. */
  analyze(
    prompt: string,
    context?: AnalysisContext
  ): Promise<StructuredRequirement>;
}
