import React from "react";

export function SiteFooter() {
  return (
    <footer className="relative border-t border-white/[0.06] px-4 py-10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="font-wordmark text-xs font-semibold uppercase tracking-[0.18em] text-paper">
          Daily AI
        </span>

        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute-dim">
          AI · Automation · Trusted providers
        </p>

        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-mute-dim">
          &copy; DAILY AI
        </p>
      </div>
    </footer>
  );
}
