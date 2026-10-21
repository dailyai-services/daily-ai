import React from 'react';
import Link from 'next/link';
import { Sparkles, ShieldCheck } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-zinc-900 bg-black py-16 px-4 sm:px-6 lg:px-8 text-zinc-400 text-sm">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="font-bold text-lg text-white tracking-wider">DAILY AI</span>
          </div>
          <p className="text-xs text-zinc-500 leading-relaxed">
            One place to ask for almost anything you need. We figure out the best way forward through AI, tools, and trusted providers.
          </p>
          <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium bg-zinc-900 border border-zinc-800 px-3 py-1.5 rounded-lg w-fit">
            <ShieldCheck className="w-4 h-4" />
            <span>Zero-Cost Free Tier Protected</span>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">Platform</h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link href="#how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
            <li><Link href="#examples" className="hover:text-white transition-colors">Request Examples</Link></li>
            <li><Link href="#categories" className="hover:text-white transition-colors">Capabilities</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Pricing & Transparency</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">Governance & Trust</h4>
          <ul className="space-y-2.5 text-xs">
            <li><Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Human Review Policy</Link></li>
            <li><Link href="#" className="hover:text-white transition-colors">Safety & Limitations</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-4">Disclaimer</h4>
          <p className="text-xs text-zinc-500 leading-relaxed">
            Some requests require third-party providers, quotes, or human assistance. Prices and timelines are estimates until confirmed. Terms and eligibility apply.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-600 gap-4">
        <p>© 2026 DAILY AI. All rights reserved. Built for everyday request fulfillment.</p>
        <p>CONFIDENTIAL & PROPRIETARY — FREE-TIER ARCHITECTURE</p>
      </div>
    </footer>
  );
}
