/**
 * DAILY AI - LOCAL OLLAMA CLIENT
 *
 * The one place that talks to Ollama. It fails closed: only loopback hosts
 * are allowed and Ollama "cloud" models are refused, so a misconfiguration
 * can never turn into a paid remote call.
 */

const DEFAULT_BASE_URL = "http://127.0.0.1:11434";
const DEFAULT_MODEL = "qwen2.5:7b";
// Local models on a laptop are slower than hosted ones.
const DEFAULT_TIMEOUT_MS = 90_000;

const LOOPBACK_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]", "::1"]);

export interface OllamaTarget {
  baseUrl: string;
  model: string;
}

export interface OllamaMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface OllamaChatOptions {
  messages: OllamaMessage[];
  /** Ask Ollama to constrain the output to JSON. */
  json?: boolean;
  temperature?: number;
  maxTokens?: number;
  /** Context window; longer deliverables need more than Ollama's default. */
  contextTokens?: number;
  timeoutMs?: number;
  /** Aborts generation, e.g. when the browser disconnects. */
  signal?: AbortSignal;
}

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

export function resolveOllamaTimeout(): number {
  const configured = Number(process.env.OLLAMA_TIMEOUT_MS);
  return Number.isFinite(configured) && configured > 0
    ? configured
    : DEFAULT_TIMEOUT_MS;
}

/** The local Ollama server and model, or null if the config is not local and free. */
export function resolveOllamaTarget(): OllamaTarget | null {
  const baseUrl = resolveBaseUrl();
  const model = resolveModel();
  return baseUrl && model ? { baseUrl, model } : null;
}

/** Sends one non-streaming chat request and returns the model's text. */
export async function ollamaChat({
  messages,
  json = false,
  temperature = 0.2,
  maxTokens,
  contextTokens,
  timeoutMs = resolveOllamaTimeout(),
  signal,
}: OllamaChatOptions): Promise<string> {
  const target = resolveOllamaTarget();
  if (!target) {
    throw new Error("Ollama is not configured for local, free use.");
  }

  const timeoutSignal = AbortSignal.timeout(timeoutMs);
  const response = await fetch(`${target.baseUrl}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    signal: signal ? AbortSignal.any([signal, timeoutSignal]) : timeoutSignal,
    body: JSON.stringify({
      model: target.model,
      stream: false,
      ...(json ? { format: "json" } : {}),
      messages,
      options: {
        temperature,
        ...(maxTokens ? { num_predict: maxTokens } : {}),
        ...(contextTokens ? { num_ctx: contextTokens } : {}),
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Ollama responded with ${response.status}.`);
  }

  const payload = await response.json();
  const text: unknown = payload?.message?.content;

  if (typeof text !== "string" || text.trim().length === 0) {
    throw new Error("Ollama returned an empty response.");
  }

  return text;
}
