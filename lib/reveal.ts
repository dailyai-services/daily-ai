import type { CSSProperties } from "react";

/**
 * Inline style helper for the scroll reveal system.
 * Delays are staggered per element to create a natural reading rhythm.
 */
export function reveal(delay = 0, y = 28): CSSProperties {
  return {
    "--reveal-delay": `${delay}ms`,
    "--reveal-y": `${y}px`,
  } as CSSProperties;
}
