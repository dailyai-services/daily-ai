/**
 * DAILY AI - MOCK ANALYZER (backwards compatible facade)
 *
 * The implementation now lives in `mockProvider.ts` and returns the canonical
 * `StructuredRequirement` shape. This module keeps the original import path
 * working.
 */

export { analyzeRequirementMock, mockProvider } from "./mockProvider";
