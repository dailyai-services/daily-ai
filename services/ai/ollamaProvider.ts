/**
 * DAILY AI - LOCAL OLLAMA PROVIDER
 *
 * Runs the request engine on a model served by Ollama on this machine, so
 * development costs nothing. It fails closed: only loopback hosts are allowed
 * and Ollama "cloud" models are refused, so a misconfiguration can never turn
 * into a paid remote call. Any failure routes to the local free engine.
 */

import { AnalysisContext, StructuredRequirement } from "@/types/request";
import { AIProvider } from "./provider";
import { DEFAULT_AI_CONFIG } from "./freeTierGuard";
import { normalizeRequirement } from "./normalizer";
import { SYSTEM_PROMPT, buildConversation, extractJson } from "./prompt";

const DEFAULT_BASE_URL = "http://127.0.0.1:11434";
const DEFAULT_MODEL = "qwen2.5:7b";
// Local models on a laptop are slower than hosted ones.
const DEFAULT_TIMEOUT_MS = 90_000;

// Small local models occasionally emit malformed JSON; one retry fixes most.
const MAX_ATTEMPTS = 2;

const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]", "::1"]);

function resolveBaseUrl(): string | null {
  const configured = (process.env.OLLAMA_BASE_URL || DEFAULT_BASE_URL).trim();
  try {
    const url = new URL(configured);
    if (!LOOPBACK_HOSTS.has(url.hostname)) return null;
    return url.origin;
  } catch {
    return null;
  }
}

function resolveModel(): string | null {
  const model = (process.env.OLLAMA_MODEL || DEFAULT_MODEL).trim();
  if (!model) return null;
  // Ollama "-cloud" / ":cloud" models run on Ollama's servers, not locally.
  if (model.toLowerCase().includes("cloud")) return null;
  return model;
}

function resolveTimeout(): number {
  const configured = Number(process.env.OLLAMA_TIMEOUT_MS);
  return Number.isFinite(configured) && configured > 0
    ? configured
    : DEFAULT_TIMEOUT_MS;
}

export const ollamaProvider: AIProvider = {
  id: "ollama-local",
  label: "Ollama (Local)",
  tier: "free",

  isConfigured() {
    return resolveBaseUrl() !== null && resolveModel() !== null;
  },

  async analyze(
    prompt: string,
    context?: AnalysisContext,
  ): Promise<StructuredRequirement> {
    const baseUrl = resolveBaseUrl();
    const model = resolveModel();
    if (!baseUrl || !model) {
      throw new Error("Ollama is not configured for local, free use.");
    }

    let lastError: unknown;
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
      try {
        return await requestOnce(baseUrl, model, prompt, context);
      } catch (error) {
        lastError = error;
        // Only a bad payload is worth retrying; a dead server or timeout is not.
        if (!(error instanceof SyntaxError)) break;
      }
    }
    throw lastError;
  },
};

async function requestOnce(
  baseUrl: string,
  model: string,
  prompt: string,
  context?: AnalysisContext,
): Promise<StructuredRequirement> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), resolveTimeout());

  try {
    const response = await fetch(`${baseUrl}/api/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        model,
        stream: false,
        format: "json",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user", content: buildConversation(prompt, context) },
        ],
        options: {
          temperature: 0.2,
          num_predict: DEFAULT_AI_CONFIG.maxTokens,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama responded with ${response.status}.`);
    }

    const payload = await response.json();
    const textResponse: unknown = payload?.message?.content;

    if (typeof textResponse !== "string" || textResponse.trim().length === 0) {
      throw new Error("Ollama returned an empty response.");
    }

    return normalizeRequirement(extractJson(textResponse), { prompt });
  } finally {
    clearTimeout(timeout);
  }
}
