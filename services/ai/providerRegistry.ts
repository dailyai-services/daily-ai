/**
 * DAILY AI - PROVIDER REGISTRY
 *
 * The single entry point the request engine uses. It prefers the local Ollama
 * model, refuses anything that could cost money, rate-limits remote free
 * tiers and falls back to the always-free local engine if a model provider is
 * unavailable. The rest of the app never needs to know which provider ran.
 */

import { AnalysisContext, StructuredRequirement } from "@/types/request";
import { AIProvider } from "./provider";
import { geminiProvider } from "./geminiProvider";
import { ollamaProvider } from "./ollamaProvider";
import { mockProvider } from "./mockProvider";
import {
  FreeTierRateLimiter,
  assertFreeTierProvider,
  DEFAULT_AI_CONFIG,
} from "./freeTierGuard";

export type ProviderMode = "auto" | "ollama" | "gemini" | "mock";

const limiter = new FreeTierRateLimiter(
  Number(process.env.FREE_TIER_RPM ?? 12),
  Number(process.env.FREE_TIER_RPM ?? 12)
);

export function resolveProviderMode(): ProviderMode {
  const configured = (process.env.AI_PROVIDER || "auto").toLowerCase();
  if (configured === "ollama" || configured === "gemini" || configured === "mock") {
    return configured;
  }
  return "auto";
}

/**
 * Model providers to try, in order, before the local free engine.
 * Auto prefers the on-device model; Gemini is only used when a key is set.
 */
function candidateProviders(mode: ProviderMode): AIProvider[] {
  if (mode === "mock") return [];
  if (mode === "ollama") return [ollamaProvider];
  if (mode === "gemini") return [geminiProvider];
  return [ollamaProvider, geminiProvider].filter((provider) => provider.isConfigured());
}

export function selectProvider(mode: ProviderMode = resolveProviderMode()): AIProvider {
  return candidateProviders(mode)[0] ?? mockProvider;
}

export interface ProviderInfo {
  id: string;
  label: string;
  mode: ProviderMode;
  free: true;
}

export function describeProvider(provider: AIProvider): ProviderInfo {
  return {
    id: provider.id,
    label: provider.label,
    mode: resolveProviderMode(),
    free: true,
  };
}

/**
 * Analyses a request. Always resolves - a provider failure is never surfaced
 * as a broken experience, it simply routes to the local free engine.
 */
export async function analyzeRequirement(
  prompt: string,
  context?: AnalysisContext
): Promise<{ requirement: StructuredRequirement; provider: ProviderInfo }> {
  const trimmed = prompt.trim();

  for (const provider of candidateProviders(resolveProviderMode())) {
    assertFreeTierProvider(provider);

    if (!provider.isConfigured()) continue;
    // Only remote free tiers have quotas to protect; the local model does not.
    if (provider.id === geminiProvider.id && !limiter.tryConsume()) continue;

    try {
      const requirement = await provider.analyze(trimmed, context);
      return { requirement, provider: describeProvider(provider) };
    } catch (error) {
      console.warn(
        `[DAILY AI] ${provider.label} failed, trying the next free option:`,
        error instanceof Error ? error.message : error
      );
    }
  }

  const requirement = await mockProvider.analyze(trimmed, context);
  return { requirement, provider: describeProvider(mockProvider) };
}

export function getAiGuardConfig(): typeof DEFAULT_AI_CONFIG {
  return DEFAULT_AI_CONFIG;
}
