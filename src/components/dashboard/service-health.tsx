"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertTriangle, AlertCircle, ChevronRight } from "lucide-react";
import { ServiceMetric } from "@/data/dashboard-data";
import { cn } from "@/lib/utils";

interface ServiceHealthProps {
  services: ServiceMetric[];
  onSelectService: (service: ServiceMetric) => void;
}

export function ServiceHealth({ services, onSelectService }: ServiceHealthProps) {
  const [filter, setFilter] = useState<"all" | "healthy" | "warning" | "critical">("all");

  const filteredServices = services.filter((srv) => {
    if (filter === "all") return true;
    return srv.status === filter;
  });

  const getStatusBadge = (status: "healthy" | "warning" | "critical") => {
    switch (status) {
      case "healthy":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
            <CheckCircle2 className="w-3 h-3" />
            Healthy
          </span>
        );
      case "warning":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-amber-950/60 text-amber-400 border border-amber-800/40">
            <AlertTriangle className="w-3 h-3" />
            Warning
          </span>
        );
      case "critical":
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-rose-950/60 text-rose-400 border border-rose-800/40">
            <AlertCircle className="w-3 h-3" />
            Critical
          </span>
        );
    }
  };

  return (
    <div className="rounded-xl bg-slate-900/60 border border-slate-800/80 p-5">
      {/* Header & Status Filter Pills */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-white tracking-tight">
              Microservice Health Monitor
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60">
              {filteredServices.length} Monitored
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time telemetry, pod resource consumption, and latency
          </p>
        </div>

        {/* Filter buttons */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800/80 self-start sm:self-auto">
          {(["all", "healthy", "warning", "critical"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className={cn(
                "px-2.5 py-1 text-xs font-mono rounded capitalize transition-all",
                filter === tab
                  ? "bg-slate-800 text-white font-medium border border-slate-700"
                  : "text-slate-400 hover:text-slate-300"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Responsive Table / Card Container */}
      <div className="overflow-x-auto -mx-5 px-5">
        <table className="w-full text-left border-collapse min-w-[620px]">
          <thead>
            <tr className="border-b border-slate-800/80 text-[11px] font-mono uppercase tracking-wider text-slate-400">
              <th className="py-2.5 px-3">Service Name</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-center">Instances</th>
              <th className="py-2.5 px-3">CPU Usage</th>
              <th className="py-2.5 px-3">Memory</th>
              <th className="py-2.5 px-3 text-right">Latency</th>
              <th className="py-2.5 px-2"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40 text-xs">
            {filteredServices.map((srv) => (
              <tr
                key={srv.id}
                onClick={() => onSelectService(srv)}
                className="group hover:bg-slate-800/40 cursor-pointer transition-colors"
              >
                {/* Name & Version */}
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-200 group-hover:text-cyan-400 transition-colors">
                      {srv.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-800/60 px-1.5 py-0.5 rounded border border-slate-700/40">
                      {srv.version}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {(srv.requestRate / 1000).toFixed(1)}k req/s
                  </span>
                </td>

                {/* Status */}
                <td className="py-3 px-3">{getStatusBadge(srv.status)}</td>

                {/* Instances */}
                <td className="py-3 px-3 text-center font-mono">
                  <span className="text-slate-200">
                    {srv.instances}/{srv.totalInstances}
                  </span>
                </td>

                {/* CPU Bar */}
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          srv.cpu > 80
                            ? "bg-rose-500"
                            : srv.cpu > 65
                            ? "bg-amber-400"
                            : "bg-cyan-400"
                        )}
                        style={{ width: `${srv.cpu}%` }}
                      />
                    </div>
                    <span className="font-mono text-[11px] text-slate-300">{srv.cpu}%</span>
                  </div>
                </td>

                {/* Memory Bar */}
                <td className="py-3 px-3">
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all",
                          srv.memory > 85
                            ? "bg-rose-500"
                            : srv.memory > 70
                            ? "bg-amber-400"
                            : "bg-indigo-400"
                        )}
                        style={{ width: `${srv.memory}%` }}
                      />
                    </div>
                    <span className="font-mono text-[11px] text-slate-300">{srv.memory}%</span>
                  </div>
                </td>

                {/* Latency */}
                <td className="py-3 px-3 text-right font-mono font-medium">
                  <span
                    className={cn(
                      srv.latency > 80
                        ? "text-rose-400"
                        : srv.latency > 50
                        ? "text-amber-400"
                        : "text-emerald-400"
                    )}
                  >
                    {srv.latency.toFixed(1)}ms
                  </span>
                </td>

                {/* Arrow Action */}
                <td className="py-3 px-2 text-right">
                  <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
