/**
 * DAILY AI - GEMINI FREE TIER PROVIDER
 *
 * Uses the Gemini free-tier endpoint only. If the key is missing, the model is
 * not free-tier eligible, the call fails, or it times out, this provider
 * resolves gracefully instead of surfacing an error.
 */

import { AnalysisContext, StructuredRequirement } from "@/types/request";
import { AIProvider } from "./provider";
import { DEFAULT_AI_CONFIG, resolveFreeTierModel } from "./freeTierGuard";
import { normalizeRequirement } from "./normalizer";
import { SYSTEM_PROMPT, buildConversation, extractJson } from "./prompt";

const ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models";

function hasUsableKey(): boolean {
  const key = process.env.GEMINI_API_KEY;
  if (!key) return false;
  const trimmed = key.trim();
  return trimmed.length > 0 && trimmed !== "your_free_gemini_api_key_here";
}

export const geminiProvider: AIProvider = {
  id: "gemini-free",
  label: "Gemini Free Tier",
  tier: "free",

  isConfigured() {
    if (!hasUsableKey()) return false;
    try {
      resolveFreeTierModel();
      return true;
    } catch {
      return false;
    }
  },

  async analyze(
    prompt: string,
    context?: AnalysisContext
  ): Promise<StructuredRequirement> {
    const apiKey = process.env.GEMINI_API_KEY as string;
    const model = resolveFreeTierModel();
    const controller = new AbortController();
    const timeout = setTimeout(
      () => controller.abort(),
      DEFAULT_AI_CONFIG.timeoutMs
    );

    try {
      const response = await fetch(
        `${ENDPOINT}/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [{ text: `${SYSTEM_PROMPT}\n\n${buildConversation(prompt, context)}` }],
              },
            ],
            generationConfig: {
              temperature: 0.2,
              maxOutputTokens: DEFAULT_AI_CONFIG.maxTokens,
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Gemini responded with ${response.status}.`);
      }

      const payload = await response.json();
      const textResponse: unknown = payload?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (typeof textResponse !== "string" || textResponse.trim().length === 0) {
        throw new Error("Gemini returned an empty response.");
      }

      return normalizeRequirement(extractJson(textResponse), { prompt });
    } finally {
      clearTimeout(timeout);
    }
  },
};
