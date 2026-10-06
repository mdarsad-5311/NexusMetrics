"use client";

import React from "react";
import {
  Activity,
  Layers,
  Server,
  Terminal,
  GitCommit,
  Bell,
  Settings,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Cpu
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
  activeNav: string;
  onSelectNav: (id: string) => void;
}

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: Layers, badge: null },
  { id: "infrastructure", label: "Infrastructure", icon: Server, badge: "7 Regions" },
  { id: "services", label: "Services", icon: Cpu, badge: "8 Active" },
  { id: "api-metrics", label: "API Metrics", icon: Activity, badge: null },
  { id: "deployments", label: "Deployments", icon: GitCommit, badge: "1 Active" },
  { id: "logs", label: "Logs", icon: Terminal, badge: null },
  { id: "alerts", label: "Alerts", icon: Bell, badge: "2 Active" },
  { id: "settings", label: "Settings", icon: Settings, badge: null }
];

export function Sidebar({ collapsed, onToggle, activeNav, onSelectNav }: SidebarProps) {
  return (
    <aside
      className={cn(
        "h-screen sticky top-0 flex flex-col border-r border-slate-800/80 bg-[#090e1a]/95 backdrop-blur-xl transition-all duration-300 z-30 select-none",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Brand Header */}
      <div className="h-16 flex items-center px-4 border-b border-slate-800/80 justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 shrink-0">
            <Activity className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div className="flex flex-col truncate">
              <span className="font-semibold text-sm tracking-tight text-white flex items-center gap-1.5">
                NexusMetrics
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-950/80 text-cyan-400 border border-cyan-800/50">
                  v2.4
                </span>
              </span>
              <span className="text-[11px] text-slate-400 truncate">Cloud Operations Platform</span>
            </div>
          )}
        </div>
        <button
          onClick={onToggle}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800/60 transition-colors hidden md:flex items-center justify-center"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        <div className="px-2 mb-2">
          {!collapsed && (
            <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
              Management
            </span>
          )}
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = activeNav === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectNav(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all group relative",
                isActive
                  ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm shadow-cyan-950"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/50"
              )}
              title={collapsed ? item.label : undefined}
            >
              <Icon
                className={cn(
                  "w-4 h-4 shrink-0 transition-transform group-hover:scale-110",
                  isActive ? "text-cyan-400" : "text-slate-400 group-hover:text-slate-200"
                )}
              />
              {!collapsed && (
                <div className="flex-1 flex items-center justify-between truncate text-left">
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span
                      className={cn(
                        "text-[10px] font-mono px-1.5 py-0.5 rounded-full border",
                        isActive
                          ? "bg-cyan-950/70 text-cyan-300 border-cyan-700/50"
                          : "bg-slate-800/80 text-slate-400 border-slate-700/60"
                      )}
                    >
                      {item.badge}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* System Health Status Footer */}
      <div className="p-3 border-t border-slate-800/80 bg-slate-900/40">
        {!collapsed ? (
          <div className="p-2.5 rounded-lg border border-emerald-500/20 bg-emerald-950/20 flex items-center gap-2.5">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-emerald-400">All Clusters Green</p>
              <p className="text-[10px] text-slate-400 font-mono">99.98% Global Uptime</p>
            </div>
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          </div>
        ) : (
          <div className="flex justify-center py-1">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
          </div>
        )}
      </div>
    </aside>
  );
}
