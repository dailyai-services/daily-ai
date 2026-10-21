/**
 * DAILY AI - FREE TIER ONLY GUARD
 * Enforces strict zero-cost protection. Blocks paid model fallbacks and automated billing.
 */

import type { AIProvider } from "./provider";

export interface AIGuardConfig {
  strictZeroCost: boolean;
  maxTokens: number;
  timeoutMs: number;
}

export const DEFAULT_AI_CONFIG: AIGuardConfig = {
  strictZeroCost: process.env.STRICT_ZERO_COST_MODE !== "false",
  maxTokens: 2048,
  timeoutMs: 15000,
};

export class FreeTierViolationError extends Error {
  constructor(message: string) {
    super(`[FREE-TIER POLICY VIOLATION]: ${message}`);
    this.name = "FreeTierViolationError";
  }
}

export function validateFreeTierRequest(modelName: string): void {
  const paidKeywords = ["pro", "ultra", "enterprise", "gpt-4", "claude-3-opus", "paid"];
  const lowerModel = modelName.toLowerCase();

  if (paidKeywords.some(kw => lowerModel.includes(kw) && !lowerModel.includes("flash") && !lowerModel.includes("lite"))) {
    throw new FreeTierViolationError(
      `Model '${modelName}' is not permitted under DAILY AI Free-Tier Only policy.`
    );
  }
}

/**
 * Hard gate applied to every provider before it is allowed to run.
 * DAILY AI never silently incurs cost, so a provider that is not explicitly
 * free is rejected outright rather than silently billed.
 */
export function assertFreeTierProvider(provider: AIProvider): void {
  if (!DEFAULT_AI_CONFIG.strictZeroCost) return;

  if (provider.tier !== "free") {
    throw new FreeTierViolationError(
      `Provider '${provider.id}' declares tier '${provider.tier}'. DAILY AI only runs free-tier providers.`
    );
  }
}

/**
 * The model DAILY AI is allowed to call. Kept on the free tier by policy and
 * overridable only with another free-tier model name.
 */
export function resolveFreeTierModel(): string {
  const configured = (process.env.GEMINI_MODEL || "gemini-1.5-flash").trim();
  const model = configured.length > 0 ? configured : "gemini-1.5-flash";
  validateFreeTierRequest(model);
  return model;
}

/**
 * A tiny in-memory token bucket that keeps the free tier from being drained
 * by bursts of traffic. It never charges anything - it just routes excess
 * demand to the local (always free) provider.
 */
export class FreeTierRateLimiter {
  private readonly capacity: number;
  private readonly refillPerMinute: number;
  private tokens: number;
  private lastRefill: number;

  constructor(capacity = 12, refillPerMinute = 12) {
    this.capacity = capacity;
    this.refillPerMinute = refillPerMinute;
    this.tokens = capacity;
    this.lastRefill = Date.now();
  }

  private refill(): void {
    const now = Date.now();
    const elapsedMinutes = (now - this.lastRefill) / 60_000;
    if (elapsedMinutes <= 0) return;
    this.tokens = Math.min(
      this.capacity,
      this.tokens + elapsedMinutes * this.refillPerMinute
    );
    this.lastRefill = now;
  }

  tryConsume(): boolean {
    this.refill();
    if (this.tokens < 1) return false;
    this.tokens -= 1;
    return true;
  }
}
