"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from "recharts";
import { Globe2 } from "lucide-react";
import { REGIONAL_SERIES } from "@/data/dashboard-data";

export function RegionalChart() {
  return (
    <div className="rounded-xl bg-slate-900/60 border border-slate-800/80 p-5 flex flex-col justify-between">
      {/* Top Header */}
      <div className="flex items-center justify-between gap-4 mb-3">
        <div>
          <h3 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
            <Globe2 className="w-4 h-4 text-indigo-400" />
            Regional Latency Comparison
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Inter-region round-trip telemetry across primary edge locations
          </p>
        </div>
        <div className="flex items-center gap-1.5 text-[10px] font-mono bg-indigo-950/70 text-indigo-300 border border-indigo-800/50 px-2 py-0.5 rounded">
          <span>Active Probes: 3</span>
        </div>
      </div>

      {/* Regional Chart Container */}
      <div className="w-full h-[240px] mt-2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={REGIONAL_SERIES} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
                    <div className="bg-[#0b1120] border border-slate-700/80 p-3 rounded-lg shadow-xl font-mono text-xs">
                      <p className="text-slate-300 font-semibold mb-1.5">{label} UTC</p>
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-4 text-emerald-400">
                          <span>US-East:</span>
                          <span className="font-bold">{payload[0]?.value}ms</span>
                        </div>
                        <div className="flex items-center justify-between gap-4 text-cyan-400">
                          <span>EU-Central:</span>
                          <span className="font-bold">{payload[1]?.value}ms</span>
                        </div>
                        <div className="flex items-center justify-between gap-4 text-purple-400">
                          <span>Asia-Pacific:</span>
                          <span className="font-bold">{payload[2]?.value}ms</span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              verticalAlign="top"
              align="right"
              iconType="circle"
              wrapperStyle={{ paddingBottom: 10, fontSize: "11px", fontFamily: "monospace" }}
            />
            <Line
              name="US-East"
              type="monotone"
              dataKey="usEast"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 3, fill: "#10b981" }}
              activeDot={{ r: 5 }}
            />
            <Line
              name="EU-Central"
              type="monotone"
              dataKey="euCentral"
              stroke="#06b6d4"
              strokeWidth={2}
              dot={{ r: 3, fill: "#06b6d4" }}
              activeDot={{ r: 5 }}
            />
            <Line
              name="Asia-Pacific"
              type="monotone"
              dataKey="asiaPacific"
              stroke="#a855f7"
              strokeWidth={2}
              dot={{ r: 3, fill: "#a855f7" }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
