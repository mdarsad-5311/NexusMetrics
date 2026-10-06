"use client";

import React from "react";
import {
  X,
  Server,
  Cpu,
  HardDrive,
  RotateCw,
  GitCommit
} from "lucide-react";
import { ServiceMetric } from "@/data/dashboard-data";
import { cn } from "@/lib/utils";

interface ServiceDetailProps {
  service: ServiceMetric | null;
  onClose: () => void;
  onTriggerRestart?: (serviceId: string) => void;
}

export function ServiceDetail({ service, onClose, onTriggerRestart }: ServiceDetailProps) {
  if (!service) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="w-full max-w-2xl rounded-2xl bg-[#090e1a] border border-slate-700/80 shadow-2xl shadow-black overflow-hidden flex flex-col max-h-[90vh]"
        role="dialog"
        aria-modal="true"
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-cyan-950/80 border border-cyan-800/40 text-cyan-400">
              <Server className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-white tracking-tight">{service.name}</h3>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {service.version}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">ID: {service.id}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          {/* Key Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Pod Instances</span>
              <span className="text-lg font-bold text-white mt-1 block">
                {service.instances} / {service.totalInstances}
              </span>
              <span className="text-[10px] text-emerald-400">100% quorum</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Median Latency</span>
              <span className="text-lg font-bold text-cyan-400 mt-1 block">
                {service.latency.toFixed(1)}ms
              </span>
              <span className="text-[10px] text-slate-400">SLA &lt;100ms</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Throughput</span>
              <span className="text-lg font-bold text-indigo-400 mt-1 block">
                {(service.requestRate / 1000).toFixed(1)}k
              </span>
              <span className="text-[10px] text-slate-400">req / sec</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-900/90 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Error Rate</span>
              <span
                className={cn(
                  "text-lg font-bold mt-1 block",
                  service.errorRate > 0.05 ? "text-rose-400" : "text-emerald-400"
                )}
              >
                {service.errorRate}%
              </span>
              <span className="text-[10px] text-slate-400">30m window</span>
            </div>
          </div>

          {/* Resource Saturation Meters */}
          <div className="space-y-3 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
              Cluster Node Saturation
            </h4>

            {/* CPU */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5 text-cyan-400" /> CPU Allocation
                </span>
                <span className="text-white font-bold">{service.cpu}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    service.cpu > 80 ? "bg-rose-500" : "bg-cyan-400"
                  )}
                  style={{ width: `${service.cpu}%` }}
                />
              </div>
            </div>

            {/* Memory */}
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-slate-400 flex items-center gap-1.5">
                  <HardDrive className="w-3.5 h-3.5 text-indigo-400" /> Memory Resident Set Size
                </span>
                <span className="text-white font-bold">{service.memory}%</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <div
                  className={cn(
                    "h-full rounded-full transition-all",
                    service.memory > 85 ? "bg-rose-500" : "bg-indigo-400"
                  )}
                  style={{ width: `${service.memory}%` }}
                />
              </div>
            </div>
          </div>

          {/* Deployment History within Modal */}
          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono mb-3">
              Recent Service Releases
            </h4>
            <div className="space-y-2">
              {service.recentDeployments.map((d) => (
                <div
                  key={d.id}
                  className="p-3 rounded-lg bg-slate-900/80 border border-slate-800 flex items-center justify-between text-xs font-mono"
                >
                  <div className="flex items-center gap-3">
                    <GitCommit className="w-4 h-4 text-slate-400" />
                    <div>
                      <span className="text-slate-200 font-semibold">{d.version}</span>
                      <span className="text-slate-400 ml-2">({d.id})</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-slate-400">{d.timestamp}</span>
                    <span
                      className={cn(
                        "text-[10px] px-2 py-0.5 rounded uppercase font-bold",
                        d.status === "success"
                          ? "bg-emerald-950/80 text-emerald-400 border border-emerald-800/40"
                          : d.status === "rollback"
                          ? "bg-amber-950/80 text-amber-400 border border-amber-800/40"
                          : "bg-rose-950/80 text-rose-400 border border-rose-800/40"
                      )}
                    >
                      {d.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div className="p-4 border-t border-slate-800 bg-slate-950/80 flex items-center justify-between">
          <span className="text-[11px] font-mono text-slate-400">
            Node pool: k8s-eu-central-prod-v2
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                if (onTriggerRestart) onTriggerRestart(service.id);
                onClose();
              }}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <RotateCw className="w-3.5 h-3.5 text-cyan-400" />
              Rolling Restart
            </button>
            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-medium text-white transition-colors"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
