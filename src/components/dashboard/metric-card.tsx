"use client";

import React from "react";
import { ArrowUpRight, ArrowDownRight, Minus, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string;
  unit?: string;
  change: string;
  changeType: "positive" | "negative" | "neutral";
  subtext: string;
  sparklineData: number[];
  icon: LucideIcon;
  badgeText?: string;
  badgeType?: "healthy" | "warning" | "info";
  accentColor?: "cyan" | "emerald" | "amber" | "indigo";
}

export function MetricCard({
  title,
  value,
  unit,
  change,
  changeType,
  subtext,
  sparklineData,
  icon: Icon,
  badgeText,
  badgeType = "healthy",
  accentColor = "cyan"
}: MetricCardProps) {
  // Sparkline coordinates calculation
  const min = Math.min(...sparklineData);
  const max = Math.max(...sparklineData);
  const range = max - min || 1;
  const width = 84;
  const height = 28;

  const points = sparklineData
    .map((d, i) => {
      const x = (i / (sparklineData.length - 1)) * width;
      const y = height - ((d - min) / range) * (height - 6) - 3;
      return `${x},${y}`;
    })
    .join(" ");

  const colorStyles = {
    cyan: "border-cyan-500/20 text-cyan-400 group-hover:border-cyan-500/40",
    emerald: "border-emerald-500/20 text-emerald-400 group-hover:border-emerald-500/40",
    amber: "border-amber-500/20 text-amber-400 group-hover:border-amber-500/40",
    indigo: "border-indigo-500/20 text-indigo-400 group-hover:border-indigo-500/40"
  };

  const strokeColors = {
    cyan: "#06b6d4",
    emerald: "#10b981",
    amber: "#f59e0b",
    indigo: "#6366f1"
  };

  return (
    <div
      tabIndex={0}
      className={cn(
        "group relative rounded-xl bg-slate-900/60 border border-slate-800/80 p-5 transition-all duration-200 hover:-translate-y-0.5 hover:bg-slate-900/90 hover:shadow-xl hover:shadow-black/50 focus:outline-none focus:ring-1 focus:ring-cyan-500/40",
        colorStyles[accentColor]
      )}
    >
      {/* Top Header */}
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        <div className="p-2 rounded-lg bg-slate-800/60 border border-slate-700/50 text-slate-300 group-hover:text-white transition-colors">
          <Icon className="w-4 h-4" />
        </div>
      </div>

      {/* Main Value & Sparkline */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold font-mono tracking-tight text-white">
              {value}
            </span>
            {unit && <span className="text-sm font-mono text-slate-400">{unit}</span>}
          </div>

          <div className="flex items-center gap-2 mt-2">
            <span
              className={cn(
                "inline-flex items-center text-xs font-mono font-medium",
                changeType === "positive"
                  ? "text-emerald-400"
                  : changeType === "negative"
                  ? "text-rose-400"
                  : "text-slate-400"
              )}
            >
              {changeType === "positive" && <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" />}
              {changeType === "negative" && <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
              {changeType === "neutral" && <Minus className="w-3.5 h-3.5 mr-0.5" />}
              {change}
            </span>
            <span className="text-[11px] text-slate-400">{subtext}</span>
          </div>
        </div>

        {/* Small SVG Sparkline */}
        <div className="flex flex-col items-end">
          <svg width={width} height={height} className="overflow-visible">
            <polyline
              fill="none"
              stroke={strokeColors[accentColor]}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
            {/* Last dot */}
            {sparklineData.length > 0 && (
              <circle
                cx={width}
                cy={
                  height -
                  ((sparklineData[sparklineData.length - 1] - min) / range) * (height - 6) -
                  3
                }
                r="3"
                fill={strokeColors[accentColor]}
                className="animate-pulse"
              />
            )}
          </svg>
          {badgeText && (
            <div className="mt-2">
              <span
                className={cn(
                  "text-[10px] font-mono px-2 py-0.5 rounded-full border",
                  badgeType === "healthy"
                    ? "bg-emerald-950/60 text-emerald-300 border-emerald-800/40"
                    : badgeType === "warning"
                    ? "bg-amber-950/60 text-amber-300 border-amber-800/40"
                    : "bg-cyan-950/60 text-cyan-300 border-cyan-800/40"
                )}
              >
                {badgeText}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
