# DAILY AI

**A request-understanding and fulfilment prototype built with Next.js, TypeScript and local-first AI providers.**

DAILY AI explores a simple workflow: a person describes what they need in plain language, the application turns that request into a structured requirement, and an eligible request can move into a guided fulfilment flow.

> **Project status:** In active development. This repository is a technical work sample, not a claim of a production deployment or a completed client engagement.

## What the prototype contains

- **Request analysis API** — accepts a plain-language prompt and optional conversation turns, validates the input, and returns a structured requirement.
- **Provider abstraction** — keeps the request workflow separate from the model provider so providers can be selected or replaced without coupling the rest of the app to one model.
- **Local-first provider path** — supports a locally served Ollama model, with a Gemini free-tier provider as an optional configured path and a deterministic mock provider as a fallback.
- **Cost guardrails** — includes a free-tier provider check, model-name validation, a small in-memory rate limiter for the remote free tier, request limits, and a fail-closed fulfilment path when the local engine is unavailable.
- **Streaming fulfilment route** — exposes progress events as newline-delimited JSON while a direct-fulfilment request is processed.
- **Responsive landing experience** — a component-based interface with a request modal, prompt examples, process sections and motion/reveal components.

## Technology

| Area | Stack |
|---|---|
| Framework | Next.js 16 App Router |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS v4 |
| AI integration | Provider abstraction, Gemini free-tier API, local Ollama, mock provider |
| API | Next.js route handlers |
| Code quality | ESLint, TypeScript |

## Architecture at a glance

```text
app/
  page.tsx                 Landing page and request-modal state
  api/
    analyze/route.ts        Prompt validation and structured analysis
    fulfill/route.ts        Guarded, streamed fulfilment endpoint

components/
  landing/                  Landing-page sections and request experience
  motion/                   Reveal/scroll behaviour
  request/                  Request modal and request UI

services/ai/
  provider.ts               Provider contract
  providerRegistry.ts        Provider selection and analysis orchestration
  freeTierGuard.ts           Free-tier checks and rate limiting
  ollamaProvider.ts          Local Ollama adapter
  geminiProvider.ts          Gemini free-tier adapter
  mockProvider.ts            Non-model fallback
  fulfillment.ts             Direct-fulfilment orchestration
  normalizer.ts              Structured requirement normalisation
  prompt.ts                  Prompt and conversation construction
```

## API workflow

### 1. Analyse a request

`POST /api/analyze`

Example request:

```json
{
  "prompt": "I need a simple website for my local music academy"
}
```

The route validates the prompt, calls the provider registry and returns the structured requirement together with provider metadata. The route applies input-size and conversation-turn limits.

### 2. Fulfil an eligible request

`POST /api/fulfill`

This route accepts an analysed requirement and streams progress events. It checks whether the request is suitable for direct fulfilment and requires the local Ollama engine to be configured. If the local engine is not available, the route returns a service-unavailable response instead of silently switching to a paid service.

## Run locally

**Prerequisites:** Node.js compatible with the installed Next.js version and npm. Local fulfilment additionally requires Ollama running on the same machine with a supported local model available.

1. Clone the repository and install dependencies:

   ```bash
   git clone https://github.com/dailyai-services/daily-ai.git
   cd daily-ai
   npm install
   ```

2. Copy the example environment file and set only the values you intend to use:

   ```bash
   cp .env.example .env.local
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000).

The Gemini path is optional and requires a valid free-tier API key. The local Ollama path requires Ollama to be installed and running. The mock provider exists for a predictable fallback and should not be described as live AI inference.

## Cost and safety design

- The intended operating policy is free-tier/local-only model usage.
- Provider selection checks the declared provider tier before use.
- The local fulfilment route fails closed if Ollama is not configured.
- Input lengths and conversation history are bounded at the API boundary.
- No paid model fallback is intentionally configured.

These are application-level guardrails, not a guarantee that third-party services will never change their pricing or terms. Operators should review provider terms and usage limits before deployment.

## Current limitations

- This project is a prototype under active development.
- A configured local Ollama installation is required for the fulfilment route.
- The Gemini free tier has external quota and availability limits.
- The mock provider is a fallback, not an AI model.
- Production deployment, external security review, load testing and real customer use have not been represented as completed.

## Repository

- **GitHub:** https://github.com/dailyai-services/daily-ai
- **Owner:** DAILY AI
- **Primary stack:** Next.js · React · TypeScript · Tailwind CSS


## Website development enquiries

DAILY AI also welcomes enquiries for practical website-development work. We first understand the required pages, features, timeline and constraints, then confirm feasibility and provide a scoped proposal.

[Read about website development and tell us what you need](./WEBSITE-DEVELOPMENT.md).
