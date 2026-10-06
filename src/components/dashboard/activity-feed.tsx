"use client";

import React from "react";
import { AlertCircle, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { AlertEvent } from "@/data/dashboard-data";
import { cn } from "@/lib/utils";

interface ActivityFeedProps {
  alerts: AlertEvent[];
}

export function ActivityFeed({ alerts }: ActivityFeedProps) {
  const getSeverityIcon = (severity: AlertEvent["severity"]) => {
    switch (severity) {
      case "critical":
        return <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />;
      case "success":
        return <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />;
      case "info":
      default:
        return <Info className="w-4 h-4 text-cyan-400 shrink-0" />;
    }
  };

  return (
    <div className="rounded-xl bg-slate-900/60 border border-slate-800/80 p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
            Live Activity & Events
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">Automated incident log & canary notices</p>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60">
          Auto-stream
        </span>
      </div>

      {/* Feed List */}
      <div className="space-y-3 flex-1 overflow-y-auto max-h-[380px] pr-1">
        {alerts.map((item) => (
          <div
            key={item.id}
            className={cn(
              "p-3 rounded-lg border transition-all text-left flex items-start gap-3",
              item.severity === "critical"
                ? "bg-rose-950/20 border-rose-900/40 hover:border-rose-700/50"
                : item.severity === "warning"
                ? "bg-amber-950/20 border-amber-900/40 hover:border-amber-700/50"
                : item.severity === "success"
                ? "bg-emerald-950/20 border-emerald-900/40 hover:border-emerald-700/50"
                : "bg-slate-900/80 border-slate-800 hover:border-slate-700"
            )}
          >
            <div className="mt-0.5">{getSeverityIcon(item.severity)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-xs font-semibold text-slate-200 truncate">{item.title}</p>
                <span className="text-[10px] text-slate-400 font-mono shrink-0">
                  {item.timestamp}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{item.message}</p>
              {item.service && (
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-300 border border-slate-700">
                    {item.service}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
