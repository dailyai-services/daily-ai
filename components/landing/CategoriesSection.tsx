import React from 'react';
import { CATEGORIES } from '@/config/categories';
import { Code, Sparkles, Briefcase, GraduationCap, MapPin, Package, Layers } from 'lucide-react';

const iconMap: Record<string, any> = {
  Code,
  Sparkles,
  Briefcase,
  GraduationCap,
  MapPin,
  Package
};

export function CategoriesSection() {
  return (
    <section id="categories" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-zinc-900 bg-zinc-950/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs uppercase tracking-widest text-indigo-400 font-semibold mb-3">
            Extensible Architecture
          </h2>
          <h3 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Universal category coverage
          </h3>
          <p className="text-zinc-400 mt-4 text-base sm:text-lg">
            Designed to seamlessly handle diverse requests across technology, creative services, business operations, local life, and procurement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CATEGORIES.map((cat, idx) => {
            const IconComponent = iconMap[cat.iconName] || Layers;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-zinc-900/50 border border-zinc-800 p-8 flex flex-col justify-between hover:border-zinc-700 transition-all"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 mb-6">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3">
                    {cat.name}
                  </h4>
                  <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                    {cat.description}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-zinc-800/80">
                  <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
                    Common Requests
                  </span>
                  <ul className="space-y-1.5 text-xs text-zinc-300">
                    {cat.popularExamples.map((ex, i) => (
                      <li key={i} className="flex items-center gap-2 truncate">
                        <span className="w-1 h-1 rounded-full bg-indigo-400"></span>
                        <span className="truncate">{ex}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
