"use client";

import React, { useState } from "react";
import { GitCommit, CheckCircle2, Clock, XCircle, RotateCcw } from "lucide-react";
import { DeploymentRecord } from "@/data/dashboard-data";
import { cn } from "@/lib/utils";

interface DeploymentHistoryProps {
  deployments: DeploymentRecord[];
}

export function DeploymentHistory({ deployments }: DeploymentHistoryProps) {
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredDeployments = deployments.filter((d) => {
    if (statusFilter === "all") return true;
    return d.status === statusFilter;
  });

  const getStatusBadge = (status: DeploymentRecord["status"]) => {
    switch (status) {
      case "success":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/60 text-emerald-400 border border-emerald-800/40">
            <CheckCircle2 className="w-3 h-3" />
            Success
          </span>
        );
      case "running":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-950/60 text-cyan-400 border border-cyan-800/40 animate-pulse">
            <Clock className="w-3 h-3" />
            Running
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-rose-950/60 text-rose-400 border border-rose-800/40">
            <XCircle className="w-3 h-3" />
            Failed
          </span>
        );
      case "rollback":
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono bg-amber-950/60 text-amber-400 border border-amber-800/40">
            <RotateCcw className="w-3 h-3" />
            Rollback
          </span>
        );
    }
  };

  return (
    <div className="rounded-xl bg-slate-900/60 border border-slate-800/80 p-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
              <GitCommit className="w-4 h-4 text-cyan-400" />
              Deployment Pipeline & Rollouts
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700/60">
              CI/CD Webhook
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Audit trail of continuous delivery triggers and automated cluster rolls
          </p>
        </div>

        {/* Filter selection */}
        <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 self-start sm:self-auto">
          {["all", "success", "running", "failed", "rollback"].map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={cn(
                "px-2 py-0.5 text-xs font-mono rounded capitalize transition-all",
                statusFilter === tab
                  ? "bg-slate-800 text-cyan-400 font-medium border border-slate-700"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Deployment Table */}
      <div className="overflow-x-auto -mx-5 px-5">
        <table className="w-full text-left border-collapse min-w-[620px]">
          <thead>
            <tr className="border-b border-slate-800/80 text-[11px] font-mono uppercase tracking-wider text-slate-400">
              <th className="py-2.5 px-3">Deployment ID</th>
              <th className="py-2.5 px-3">Target Service</th>
              <th className="py-2.5 px-3">Version</th>
              <th className="py-2.5 px-3">Env</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3">Duration</th>
              <th className="py-2.5 px-3 text-right">Triggered</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/40 text-xs">
            {filteredDeployments.map((d) => (
              <tr key={d.id} className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3 px-3 font-mono font-medium text-cyan-400">
                  <div className="flex items-center gap-1.5">
                    <span>{d.id}</span>
                    <span className="text-[10px] text-slate-400 bg-slate-800/60 px-1 rounded">
                      {d.commit}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-3 text-slate-200 font-medium">{d.service}</td>
                <td className="py-3 px-3 font-mono text-slate-400">{d.version}</td>
                <td className="py-3 px-3">
                  <span
                    className={cn(
                      "text-[10px] font-mono px-1.5 py-0.5 rounded",
                      d.environment === "Production"
                        ? "bg-slate-800 text-slate-300"
                        : "bg-cyan-950 text-cyan-300 border border-cyan-800/40"
                    )}
                  >
                    {d.environment}
                  </span>
                </td>
                <td className="py-3 px-3">{getStatusBadge(d.status)}</td>
                <td className="py-3 px-3 font-mono text-slate-400">{d.duration}</td>
                <td className="py-3 px-3 text-right font-mono text-slate-400">{d.timestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
