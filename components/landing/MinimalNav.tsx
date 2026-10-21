"use client";

import React from "react";
import Link from "next/link";
import { useScrolledPast } from "@/hooks/useScrollProgress";
import { cn } from "@/lib/utils";

// Show the compact wordmark roughly once the hero wordmark has faded.
const WORDMARK_THRESHOLD = 320;

interface MinimalNavProps {
  onOpenRequest: () => void;
}

/**
 * Near-invisible navigation. The wordmark only appears once the opening
 * scene has scrolled away, so the first viewport stays almost empty.
 */
export function MinimalNav({ onOpenRequest }: MinimalNavProps) {
  const scrolled = useScrolledPast(WORDMARK_THRESHOLD);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color] duration-500",
        scrolled
          ? "border-b border-white/[0.06] bg-ink/70 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-[var(--header-height)] max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className={cn(
            "font-wordmark text-xs font-semibold uppercase tracking-[0.18em] text-paper transition-opacity duration-500",
            scrolled ? "opacity-100" : "opacity-0"
          )}
          tabIndex={scrolled ? 0 : -1}
        >
          Daily AI
        </Link>

        <nav className="flex items-center gap-6 sm:gap-8 text-xs text-mute">
          <a href="#process" className="hidden transition-colors hover:text-paper sm:inline">
            How it works
          </a>
          <a href="#request" className="hidden transition-colors hover:text-paper sm:inline">
            Request
          </a>
          <button
            type="button"
            onClick={onOpenRequest}
            className="font-medium text-paper underline decoration-white/20 underline-offset-[6px] transition-colors hover:decoration-iris"
          >
            Ask DAILY AI
          </button>
        </nav>
      </div>
    </header>
  );
}
