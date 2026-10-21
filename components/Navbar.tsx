import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenRequestModal?: () => void;
}

export function Navbar({ onOpenRequestModal }: NavbarProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-wider text-white flex items-center gap-1.5">
              DAILY <span className="text-indigo-400 font-extrabold">AI</span>
            </span>
          </div>
        </Link>

        {/* Center navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm text-zinc-400 font-medium">
          <Link href="#how-it-works" className="hover:text-white transition-colors">
            How it works
          </Link>
          <Link href="#examples" className="hover:text-white transition-colors">
            Examples
          </Link>
          <Link href="#categories" className="hover:text-white transition-colors">
            Capabilities
          </Link>
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 border border-zinc-800 px-2.5 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Free-Tier Protected</span>
          </div>
        </nav>

        {/* Right CTA */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenRequestModal}
            className="relative group overflow-hidden rounded-full p-px font-semibold text-xs uppercase tracking-widest text-white shadow-2xl focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-black"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 animate-pulse"></span>
            <span className="relative flex items-center gap-2 rounded-full bg-zinc-950 px-5 py-2.5 transition-all duration-300 group-hover:bg-opacity-80">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>Tell us what you need</span>
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
