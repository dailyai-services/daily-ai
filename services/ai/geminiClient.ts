/**
 * DAILY AI - GEMINI CLIENT & ORCHESTRATOR (backwards compatible facade)
 *
 * The orchestration logic now lives in `providerRegistry.ts` and the Gemini
 * call itself in `geminiProvider.ts`. This file stays as the stable import
 * path used by the API route and any existing integration.
 */

import { AnalysisContext, StructuredRequirement } from "@/types/request";
import { analyzeRequirement as analyzeWithRegistry } from "./providerRegistry";

export async function analyzeRequirement(
  prompt: string,
  context?: AnalysisContext
): Promise<StructuredRequirement> {
  const { requirement } = await analyzeWithRegistry(prompt, context);
  return requirement;
}

export { describeProvider, selectProvider } from "./providerRegistry";
export { geminiProvider } from "./geminiProvider";
export type { AIProvider } from "./provider";
export type { ProviderInfo, ProviderMode } from "./providerRegistry";
