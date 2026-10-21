"use client";

import React from "react";
import {
  Bot,
  Building2,
  Camera,
  Compass,
  Handshake,
  Lightbulb,
  ListChecks,
  MonitorSmartphone,
  Presentation,
  Repeat,
  Route,
  Search,
  ShoppingBag,
  Split,
  Target,
  Workflow,
} from "lucide-react";
import { reveal } from "@/lib/reveal";

const REQUESTS = [
  {
    icon: MonitorSmartphone,
    text: "Build a website",
  },
  {
    icon: Camera,
    text: "Find a photographer",
  },
  {
    icon: Split,
    text: "Compare prices",
  },
  {
    icon: Presentation,
    text: "Create a presentation",
  },
  {
    icon: ShoppingBag,
    text: "Find a product",
  },
  {
    icon: Workflow,
    text: "Automate a business task",
  },
  {
    icon: Building2,
    text: "Find a local service",
  },
];

const CAPABILITIES = [
  {
    icon: Bot,
    title: "Do it with AI",
    description: "Drafts, builds, edits and delivers the work itself.",
  },
  {
    icon: Repeat,
    title: "Automate it",
    description: "Turns a repeat task into a running workflow.",
  },
  {
    icon: Search,
    title: "Find a provider",
    description: "Matches you with a verified specialist near you.",
  },
  {
    icon: Split,
    title: "Compare options",
    description: "Quotes, prices and trade-offs lined up clearly.",
  },
  {
    icon: Route,
    title: "Coordinate fulfillment",
    description: "One coordinator sequences and tracks every step.",
  },
  {
    icon: Handshake,
    title: "Escalate to a human",
    description: "Sensitive or high-stakes work goes to the right person.",
  },
];

export function EverydayFlow() {
  return (
    <section className="relative px-4 py-24 sm:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute left-1/2 top-1/3 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(210,255,58,0.07),rgba(210,255,58,0)_62%)] blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Everyday requests */}
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
          <div data-reveal style={reveal(0)}>
            <div className="eyebrow mb-6 inline-flex items-center gap-2">
              <span className="h-px w-4 bg-white/30" aria-hidden="true" />
              Everyday requests
            </div>
            <h2 className="display-tight text-balance text-[clamp(2.6rem,9vw,6.5rem)] font-semibold tracking-[-0.045em] text-paper">
              If you can say it,
              <br />
              <span className="serif-accent text-paper/90">it can start here.</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-mute">
              From building things to booking things, DAILY AI meets real
              everyday needs without forcing them into a category dropdown.
            </p>
          </div>

          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {REQUESTS.map((request, index) => {
              const Icon = request.icon;
              return (
                <li
                  key={request.text}
                  data-reveal
                  style={reveal(100 + index * 70)}
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] px-5 py-4 transition-colors hover:border-signal/40 hover:bg-signal/[0.04]"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-mute transition-colors group-hover:text-signal">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="text-base text-paper/90">{request.text}</span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Understanding */}
        <div className="mt-24 text-center sm:mt-32" data-reveal style={reveal(0)}>
          <div className="eyebrow mx-auto mb-6 inline-flex items-center gap-2">
            <span className="h-px w-4 bg-white/30" aria-hidden="true" />
            Understanding
            <span className="h-px w-4 bg-white/30" aria-hidden="true" />
          </div>
          <h2 className="display-tight text-balance text-[clamp(2.6rem,9vw,6.8rem)] font-semibold tracking-[-0.045em] text-paper">
            DAILY AI understands the requirement
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-mute sm:text-xl">
            It picks out what you actually need, asks only the questions that
            block starting, estimates timeline and budget when possible, and
            chooses the right way to fulfil it.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {["Requirements", "Missing info", "Timeline", "Budget", "Next action"].map(
              (label) => (
                <span
                  key={label}
                  className="rounded-full border border-white/10 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-mute"
                >
                  {label}
                </span>
              )
            )}
          </div>
        </div>

        {/* Capabilities */}
        <div className="mt-24 sm:mt-32">
          <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div data-reveal style={reveal(0)}>
              <div className="eyebrow mb-6 inline-flex items-center gap-2">
                <span className="h-px w-4 bg-white/30" aria-hidden="true" />
                How it can deliver
              </div>
              <h2 className="display-tight text-balance text-[clamp(2.4rem,8vw,5.8rem)] font-semibold tracking-[-0.045em] text-paper">
                Do it. Automate it. Find help.
              </h2>
            </div>
            <p
              data-reveal
              style={reveal(100)}
              className="max-w-md text-balance text-lg leading-relaxed text-mute"
            >
              The answer is never just &quot;ask an AI&quot;. It is the right
              combination of AI, automation, or a real person.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2 md:grid-cols-2 xl:grid-cols-3">
            {CAPABILITIES.map((item, index) => {
              const Icon = item.icon;
              return (
                <article
                  key={item.title}
                  data-reveal
                  style={reveal(80 + index * 60)}
                  className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.02] p-6 transition-colors hover:border-signal/40"
                >
                  <div
                    aria-hidden="true"
                    className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(210,255,58,0.08),transparent_68%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  />
                  <div className="relative flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-mute transition-colors group-hover:text-signal">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold tracking-tight text-paper">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed text-mute">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
