/**
 * DAILY AI - LOCAL OLLAMA PROVIDER
 *
 * Runs request analysis on a model served by Ollama on this machine, so
 * development costs nothing. Safety rules (loopback only, no cloud models)
 * live in `ollamaClient.ts`. Any failure routes to the local free engine.
 */

import { AnalysisContext, StructuredRequirement } from "@/types/request";
import { AIProvider } from "./provider";
import { DEFAULT_AI_CONFIG } from "./freeTierGuard";
import { normalizeRequirement } from "./normalizer";
import { ollamaChat, resolveOllamaTarget } from "./ollamaClient";
import { SYSTEM_PROMPT, buildConversation, extractJson } from "./prompt";

// Small local models occasionally emit malformed JSON; one retry fixes most.
const MAX_ATTEMPTS = 2;

export const ollamaProvider: AIProvider = {
  id: "ollama-local",
  label: "Ollama (Local)",
  tier: "free",

  isConfigured() {
    return resolveOllamaTarget() !== null;
  },

  async analyze(
    prompt: string,
    context?: AnalysisContext
  ): Promise<StructuredRequirement> {
    let lastError: unknown;
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
      try {
        const text = await ollamaChat({
          json: true,
          maxTokens: DEFAULT_AI_CONFIG.maxTokens,
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            { role: "user", content: buildConversation(prompt, context) },
          ],
        });
        return normalizeRequirement(extractJson(text), { prompt });
      } catch (error) {
        lastError = error;
        // Only a bad payload is worth retrying; a dead server or timeout is not.
        if (!(error instanceof SyntaxError)) break;
      }
    }
    throw lastError;
  },
};
