"use client";

import React from "react";
import {
  Layers,
  Zap,
  ArrowUpRight,
  Code2
} from "lucide-react";

export function PortfolioCaseStudy() {
  return (
    <section className="mt-12 pt-10 border-t border-slate-800/80 text-left">
      {/* Case Study Header Banner */}
      <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/90 to-[#080d1a] border border-cyan-500/20 p-6 md:p-10 overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-800/50">
            <Layers className="w-3.5 h-3.5" />
            <span>Portfolio Project Case Study</span>
          </div>

          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-white">
            NexusMetrics — Cloud Admin Dashboard
          </h2>

          <p className="text-sm md:text-base text-slate-300 leading-relaxed">
            Developer operations interface for monitoring distributed cloud infrastructure, microservice mesh telemetry, and real-time incident resolution.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#dashboard-top"
              className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs tracking-wide uppercase transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2"
            >
              <Zap className="w-4 h-4" />
              View Live Dashboard
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-mono text-xs transition-colors flex items-center gap-2 border border-slate-700/60"
            >
              <Code2 className="w-4 h-4" />
              Source Code
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Breakdown Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
          {/* Challenge */}
          <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center gap-2 text-cyan-400 font-mono text-xs uppercase font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              01. The Challenge
            </div>
            <h4 className="text-sm font-semibold text-white mb-2">Operational Information Overload</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              DevOps and SRE teams juggle dozens of disconnected tools for latency tracking, error budgets, and global traffic routing, leading to delayed incident response times.
            </p>
          </div>

          {/* Solution */}
          <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs uppercase font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              02. The Solution
            </div>
            <h4 className="text-sm font-semibold text-white mb-2">Unified High-Density Console</h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Synthesized global telemetry into a single, cohesive dark cockpit with responsive SVG topologies, real-time percentile metrics (p50/p95/p99), and instant drill-down drawers.
            </p>
          </div>

          {/* Technology */}
          <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center gap-2 text-indigo-400 font-mono text-xs uppercase font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400" />
              03. Technology Stack
            </div>
            <h4 className="text-sm font-semibold text-white mb-2">Modern Enterprise Core</h4>
            <ul className="text-xs text-slate-400 space-y-1 font-mono">
              <li>• Next.js 16 + React 19</li>
              <li>• TypeScript Strict Mode</li>
              <li>• Tailwind CSS Engine</li>
              <li>• Recharts Telemetry Suite</li>
              <li>• Lucide Modular Iconography</li>
            </ul>
          </div>

          {/* Results */}
          <div className="p-5 rounded-xl bg-slate-950/60 border border-slate-800">
            <div className="flex items-center gap-2 text-purple-400 font-mono text-xs uppercase font-bold mb-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              04. Results & UX
            </div>
            <h4 className="text-sm font-semibold text-white mb-2">Verified SRE Efficiency</h4>
            <div className="space-y-2 text-xs font-mono">
              <div className="flex justify-between text-slate-300">
                <span>MTTR Reduction:</span>
                <span className="font-bold text-emerald-400">-42%</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Data Density:</span>
                <span className="font-bold text-cyan-400">+3.8x</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>Bundle Size:</span>
                <span className="font-bold text-indigo-400">&lt;110kb gzipped</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
