"use client";

import Link from "next/link";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  Code2,
  MousePointer2,
  Smartphone,
  Wrench,
} from "lucide-react";

const issues = [
  {
    title: "Mobile behaviour",
    description:
      "Layouts that overflow, controls that disappear on touch screens, and sections that stop working at smaller widths.",
    icon: Smartphone,
  },
  {
    title: "Frontend bugs",
    description:
      "Buttons, menus, navigation, spacing, and interactive states that do not behave as intended.",
    icon: Wrench,
  },
  {
    title: "Unclear enquiry path",
    description:
      "Pages that look finished but make it difficult to understand the service or find the next contact step.",
    icon: MousePointer2,
  },
];

const steps = [
  {
    number: "01",
    title: "Share the live page and the issue",
    description:
      "Send the public URL, a short description of what is not working, and the framework or codebase details you know.",
  },
  {
    number: "02",
    title: "Confirm technical fit and scope",
    description:
      "We check whether the work fits our frontend stack, identify the exact deliverables, and clarify what is excluded.",
  },
  {
    number: "03",
    title: "Agree before implementation",
    description:
      "You receive the proposed scope, price, timeline assumptions, and payment milestones in writing before work begins.",
  },
  {
    number: "04",
    title: "Fix, verify, and hand over",
    description:
      "We make the agreed frontend changes, check the affected responsive states, and return the updated source with a short change summary.",
  },
];

export const metadata = {
  title: "AI-Built Website Rescue | DAILY AI",
  description:
    "Frontend fixes for AI-built and unfinished websites: mobile layouts, navigation, buttons, responsive UI, and clearer enquiry paths.",
};

export default function WebsiteRescuePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-ink text-paper">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <Link href="/" className="group flex items-center gap-3" aria-label="DAILY AI home">
            <span className="grid h-10 w-10 place-items-center rounded-xl border border-iris/40 bg-iris/10 text-lg font-semibold text-iris">
              D
            </span>
            <span className="text-sm font-semibold tracking-[0.22em]">DAILY AI</span>
          </Link>
          <a
            href="mailto:dailyai.services@gmail.com?subject=Website%20frontend%20review"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm text-paper transition hover:border-iris/70 hover:bg-iris/10"
          >
            Discuss a frontend issue <ArrowRight size={15} />
          </a>
        </div>
      </header>

      <section className="relative isolate">
        <div className="pointer-events-none absolute -left-40 top-16 -z-10 h-80 w-80 rounded-full bg-iris/15 blur-3xl" />
        <div className="pointer-events-none absolute -right-32 top-28 -z-10 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="mx-auto grid max-w-6xl gap-14 px-5 pb-24 pt-20 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:pb-32 lg:pt-28">
          <div>
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-iris/30 bg-iris/10 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.18em] text-violet-200">
              <span className="h-1.5 w-1.5 rounded-full bg-iris" />
              Frontend repair · Responsive polish · Clear contact paths
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Your AI-built website is a first draft.
              <span className="mt-2 block text-iris">Make the experience work.</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-8 text-mute sm:text-lg">
              AI can help create a website quickly. The details still matter:
              mobile controls, working navigation, consistent layouts, and a
              clear next step for visitors. DAILY AI helps fix and polish
              compatible frontend projects.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:dailyai.services@gmail.com?subject=Website%20frontend%20review&body=Website%20URL%3A%0AFramework%20or%20builder%3A%0AWhat%20needs%20fixing%3A%0A"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-iris px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-violet-300"
              >
                Request a scoped review <ArrowRight size={16} />
              </a>
              <a
                href="#what-we-fix"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3.5 text-sm font-medium text-paper transition hover:border-white/30 hover:bg-white/5"
              >
                Explore the service <ArrowDownRight size={16} />
              </a>
            </div>
            <p className="mt-5 text-xs leading-6 text-mute-dim">
              No generic rebuild pitch. We first check the actual issue and
              confirm whether the codebase is a fit.
            </p>
          </div>

          <div className="relative">
            <div className="rounded-[2rem] border border-white/10 bg-ink-raise p-4 shadow-2xl shadow-black/30 sm:p-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-mute-dim">Frontend check</p>
                  <p className="mt-1 text-sm font-medium">A page visitors can use</p>
                </div>
                <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                  Review checklist
                </span>
              </div>
              <div className="mt-5 space-y-3">
                {[
                  ["Mobile layout", "No sideways scroll or hidden controls"],
                  ["Navigation", "Menus and links work on touch screens"],
                  ["Service message", "Visitors can understand the offer"],
                  ["Contact action", "Call, email, or WhatsApp is easy to find"],
                ].map(([label, detail]) => (
                  <div
                    key={label}
                    className="flex items-start gap-3 rounded-2xl border border-white/8 bg-white/[0.025] p-4"
                  >
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-400/10 text-emerald-300">
                      <Check size={14} />
                    </span>
                    <div>
                      <p className="text-sm font-medium">{label}</p>
                      <p className="mt-1 text-xs leading-5 text-mute">{detail}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl border border-iris/20 bg-iris/[0.07] p-4">
                <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-violet-200">
                  <Code2 size={14} /> Built around the actual brief
                </div>
                <p className="mt-2 text-sm leading-6 text-mute">
                  Small, deliberate changes. No unnecessary redesign or
                  unrelated refactoring.
                </p>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-4 -z-10 h-32 w-32 rounded-full border border-iris/20" />
          </div>
        </div>
      </section>

      <section id="what-we-fix" className="border-y border-white/10 bg-white/[0.02]">
        <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-iris">What we fix</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              The details between a generated page and a usable website.
            </h2>
            <p className="mt-5 leading-7 text-mute">
              We focus on visible frontend issues that can be clearly scoped
              and verified—not vague promises about growth.
            </p>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {issues.map(({ title, description, icon: Icon }) => (
              <article key={title} className="rounded-3xl border border-white/10 bg-ink-raise p-6">
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-iris/25 bg-iris/10 text-iris">
                  <Icon size={19} />
                </span>
                <h3 className="mt-6 text-lg font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-mute">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-iris">How it works</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              A clear scope before any code changes.
            </h2>
            <p className="mt-5 leading-7 text-mute">
              You keep control of the project. We agree on the exact work,
              exclusions, price, and milestones before implementation begins.
            </p>
          </div>
          <div className="space-y-4">
            {steps.map((step) => (
              <div key={step.number} className="grid gap-3 rounded-3xl border border-white/10 p-5 sm:grid-cols-[64px_1fr] sm:p-6">
                <span className="font-mono text-sm text-iris">{step.number}</span>
                <div>
                  <h3 className="font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-mute">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-ink-raise">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-20 sm:px-8 lg:grid-cols-2 lg:py-24">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-iris">Technical fit</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight">
              The right work for our frontend stack.
            </h2>
            <p className="mt-5 leading-7 text-mute">
              We currently focus on compatible projects built with Next.js,
              React, TypeScript, Tailwind CSS, or clearly scoped HTML, CSS and
              JavaScript.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Next.js", "React", "TypeScript", "Tailwind CSS", "HTML", "CSS", "JavaScript"].map((item) => (
                <span key={item} className="rounded-full border border-white/10 px-3 py-2 text-xs text-mute">
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/[0.025] p-6">
            <h3 className="font-semibold">What is outside this service</h3>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-mute">
              {[
                "Backend systems, databases, authentication, or payment processing",
                "Booking systems and complex third-party integrations",
                "WordPress, Wix, Squarespace, Shopify, or closed builders without compatible code access",
                "Hosting, server administration, or domain purchases",
                "Guaranteed enquiries, sales, search rankings, or performance scores",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-0.5 text-rose-300">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8 lg:py-24">
        <div className="rounded-[2rem] border border-iris/25 bg-gradient-to-br from-iris/15 via-ink-raise to-ink-raise p-8 sm:p-12">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-violet-200">Start with the issue</p>
          <h2 className="mt-4 max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl">
            Share the page. Tell us what is not working.
          </h2>
          <p className="mt-5 max-w-2xl leading-7 text-mute">
            Send the public URL, the frontend stack if you know it, and a
            short description of the issue. DAILY AI will confirm whether it
            fits before proposing a scope or price.
          </p>
          <a
            href="mailto:dailyai.services@gmail.com?subject=Website%20frontend%20review&body=Website%20URL%3A%0AFramework%20or%20builder%3A%0AWhat%20needs%20fixing%3A%0A"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-iris px-6 py-3.5 text-sm font-semibold text-black transition hover:bg-violet-300"
          >
            Email DAILY AI <ArrowRight size={16} />
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-xs text-mute-dim sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <span>© {new Date().getFullYear()} DAILY AI. Service demonstration page.</span>
          <Link href="/" className="text-mute transition hover:text-paper">
            Back to DAILY AI
          </Link>
        </div>
      </footer>
    </main>
  );
}
