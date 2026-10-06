"use client";

import React, { useState } from "react";
import {
  Search,
  Bell,
  CheckCircle2,
  ChevronDown,
  Layers,
  Command,
  X,
  ExternalLink
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AlertEvent } from "@/data/dashboard-data";

interface TopbarProps {
  environment: string;
  onEnvironmentChange: (env: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  alerts: AlertEvent[];
  onOpenMobileMenu?: () => void;
}

export function Topbar({
  environment,
  onEnvironmentChange,
  searchQuery,
  onSearchChange,
  alerts,
  onOpenMobileMenu
}: TopbarProps) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showEnvDropdown, setShowEnvDropdown] = useState(false);

  const environments = ["Production", "Staging", "Canary"];

  return (
    <header className="h-16 border-b border-slate-800/80 bg-[#090e1a]/90 backdrop-blur-md px-4 lg:px-6 flex items-center justify-between sticky top-0 z-20">
      {/* Left: Mobile trigger & Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <button
          onClick={onOpenMobileMenu}
          className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/50 border border-slate-700/60"
          aria-label="Toggle mobile menu"
        >
          <Layers className="w-5 h-5 text-cyan-400" />
        </button>

        {/* Global Search Bar */}
        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search microservices, deployments, traces..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-900/80 border border-slate-800/90 rounded-lg pl-9 pr-12 py-1.5 text-xs text-slate-200 placeholder-slate-400 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all font-mono"
          />
          <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[10px] text-slate-400 font-mono bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700/50">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Environment Selector Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowEnvDropdown(!showEnvDropdown)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:border-slate-700 transition-colors"
          >
            <span
              className={cn(
                "w-2 h-2 rounded-full",
                environment === "Production"
                  ? "bg-emerald-400 shadow-sm shadow-emerald-400"
                  : environment === "Staging"
                  ? "bg-amber-400"
                  : "bg-cyan-400"
              )}
            />
            <span className="font-medium text-white">{environment}</span>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {showEnvDropdown && (
            <div className="absolute right-0 mt-2 w-40 rounded-lg bg-[#0c1222] border border-slate-800 shadow-xl shadow-black/60 py-1 z-50 animate-in fade-in zoom-in-95">
              <div className="px-3 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                Select Environment
              </div>
              {environments.map((env) => (
                <button
                  key={env}
                  onClick={() => {
                    onEnvironmentChange(env);
                    setShowEnvDropdown(false);
                  }}
                  className={cn(
                    "w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-800/60 font-mono",
                    environment === env ? "text-cyan-400 font-semibold" : "text-slate-300"
                  )}
                >
                  {env}
                  {environment === env && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Global System Health Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900/60 border border-slate-800/80">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-xs font-mono text-slate-300">Operational</span>
          </div>
          <span className="text-slate-700">|</span>
          <span className="text-[11px] font-mono text-cyan-400">99.98% SLA</span>
        </div>

        {/* Notifications Popover */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 text-slate-400 hover:text-white rounded-lg bg-slate-900/80 border border-slate-800/80 hover:border-slate-700 transition-colors"
            aria-label="View notifications"
          >
            <Bell className="w-4 h-4" />
            {alerts.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400 ring-2 ring-slate-900" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl bg-[#0b1120] border border-slate-800 shadow-2xl shadow-black/80 py-2 z-50">
              <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800/80">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-white">Live Event Feed</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800/40">
                    {alerts.length} New
                  </span>
                </div>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto divide-y divide-slate-800/40">
                {alerts.map((alert) => (
                  <div
                    key={alert.id}
                    className="p-3 hover:bg-slate-900/60 transition-colors text-left flex gap-3 items-start"
                  >
                    <span
                      className={cn(
                        "w-2 h-2 rounded-full mt-1.5 shrink-0",
                        alert.severity === "critical"
                          ? "bg-rose-500 shadow-sm shadow-rose-500"
                          : alert.severity === "warning"
                          ? "bg-amber-400"
                          : alert.severity === "success"
                          ? "bg-emerald-400"
                          : "bg-cyan-400"
                      )}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="text-xs font-medium text-slate-200 truncate">{alert.title}</p>
                        <span className="text-[10px] text-slate-400 font-mono shrink-0">
                          {alert.timestamp}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-0.5 leading-snug line-clamp-2">
                        {alert.message}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-2 border-t border-slate-800/80 bg-slate-950/40 text-center">
                <a
                  href="#alerts"
                  onClick={() => setShowNotifications(false)}
                  className="text-[11px] text-cyan-400 hover:underline font-mono inline-flex items-center gap-1"
                >
                  View All Telemetry Alerts <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* User / Profile menu */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-cyan-600 to-indigo-600 p-[1px]">
            <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
              <span className="text-xs font-mono font-semibold text-cyan-300">NX</span>
            </div>
          </div>
          <div className="hidden xl:flex flex-col text-left">
            <span className="text-xs font-medium text-white leading-tight">Lead SRE Engineer</span>
            <span className="text-[10px] text-slate-400 font-mono">admin@nexusmetrics.io</span>
          </div>
        </div>
      </div>
    </header>
  );
}
