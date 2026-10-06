"use client";

import React, { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import { Activity, Zap } from "lucide-react";
import { TIME_RANGE_LATENCY } from "@/data/dashboard-data";

interface LatencyChartProps {
  onTimeRangeChange?: (range: string) => void;
}

export function LatencyChart({ onTimeRangeChange }: LatencyChartProps) {
  const [selectedRange, setSelectedRange] = useState<"1H" | "6H" | "24H" | "7D">("1H");

  const data = TIME_RANGE_LATENCY[selectedRange];

  const handleRangeChange = (range: "1H" | "6H" | "24H" | "7D") => {
    setSelectedRange(range);
    if (onTimeRangeChange) onTimeRangeChange(range);
  };

  return (
    <div className="rounded-xl bg-slate-900/60 border border-slate-800/80 p-5 flex flex-col justify-between">
      {/* Chart Top Header & Time Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              API Latency Distribution
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/40">
              Live Edge (p50 / p95 / p99)
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            End-to-end gateway response latency across worldwide microservice mesh
          </p>
        </div>

        {/* Range Selector Controls */}
        <div className="flex items-center gap-1 bg-slate-950/80 p-1 rounded-lg border border-slate-800 self-start sm:self-auto">
          {(["1H", "6H", "24H", "7D"] as const).map((range) => (
            <button
              key={range}
              onClick={() => handleRangeChange(range)}
              className={`px-2.5 py-1 text-xs font-mono rounded-md transition-all ${
                selectedRange === range
                  ? "bg-cyan-500/20 text-cyan-300 font-semibold border border-cyan-500/30"
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Latency Legend / Summary Indicators */}
      <div className="flex flex-wrap items-center gap-4 mb-4 text-xs font-mono text-slate-400 border-b border-slate-800/60 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-sm bg-cyan-400" />
          <span>p50 Median: <strong className="text-white">34ms</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-sm bg-blue-500" />
          <span>p95 Target: <strong className="text-white">48ms</strong></span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-sm bg-indigo-500" />
          <span>p99 SLA Limit: <strong className="text-amber-400">72ms</strong></span>
        </div>
        <div className="ml-auto hidden md:flex items-center gap-1.5 text-[11px] text-slate-400">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span>Sample interval: 10s streaming</span>
        </div>
      </div>

      {/* Recharts Area Container */}
      <div className="w-full h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="latencyGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.4} />
                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0.0} />
              </linearGradient>
              <linearGradient id="p99Gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" opacity={0.6} />
            <XAxis
              dataKey="time"
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: "#334155" }}
            />
            <YAxis
              stroke="#64748b"
              fontSize={11}
              tickLine={false}
              axisLine={{ stroke: "#334155" }}
              tickFormatter={(v) => `${v}ms`}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-[#0b1120] border border-slate-700/80 p-3 rounded-lg shadow-xl shadow-black/80 font-mono text-xs">
                      <p className="text-slate-300 font-semibold mb-1.5">{label} UTC</p>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-4 text-cyan-400">
                          <span>p50 Latency:</span>
                          <span className="font-bold">{payload[0]?.value}ms</span>
                        </div>
                        <div className="flex items-center justify-between gap-4 text-blue-400">
                          <span>p95 Latency:</span>
                          <span className="font-bold">{payload[1]?.value}ms</span>
                        </div>
                        <div className="flex items-center justify-between gap-4 text-indigo-400">
                          <span>p99 Latency:</span>
                          <span className="font-bold">{payload[2]?.value}ms</span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="p50"
              stroke="#06b6d4"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#latencyGradient)"
            />
            <Area
              type="monotone"
              dataKey="p95"
              stroke="#3b82f6"
              strokeWidth={1.5}
              fillOpacity={0}
              strokeDasharray="4 4"
            />
            <Area
              type="monotone"
              dataKey="p99"
              stroke="#6366f1"
              strokeWidth={1.5}
              fillOpacity={1}
              fill="url(#p99Gradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
