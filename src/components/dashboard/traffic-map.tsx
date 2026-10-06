"use client";

import React, { useState } from "react";
import { Globe, Radio } from "lucide-react";
import { TRAFFIC_NODES, TrafficNode } from "@/data/dashboard-data";
import { cn } from "@/lib/utils";

export function TrafficMap() {
  const [activeNode, setActiveNode] = useState<TrafficNode | null>(TRAFFIC_NODES[0]);

  return (
    <div className="rounded-xl bg-slate-900/60 border border-slate-800/80 p-5 flex flex-col justify-between">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
              <Globe className="w-4 h-4 text-cyan-400" />
              Real-Time Global Traffic Visualizer
            </h3>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/70 text-emerald-400 border border-emerald-800/40">
              Mesh Synced
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-0.5">
            Cross-region ingress routes, BGP anycast routing & edge cluster nodes
          </p>
        </div>

        {/* Global ingress counter */}
        <div className="flex items-center gap-3 text-xs font-mono bg-slate-950/70 px-3 py-1.5 rounded-lg border border-slate-800/80">
          <div>
            <span className="text-slate-400 text-[10px] block">TOTAL INGRESS</span>
            <span className="text-cyan-400 font-bold">254,900 req/s</span>
          </div>
          <div className="w-[1px] h-6 bg-slate-800" />
          <div>
            <span className="text-slate-400 text-[10px] block">AVG RTT</span>
            <span className="text-emerald-400 font-bold">39.2ms</span>
          </div>
        </div>
      </div>

      {/* Stylized SVG Map Container */}
      <div className="relative w-full h-[320px] bg-[#070b14] rounded-lg border border-slate-800/80 overflow-hidden flex items-center justify-center">
        {/* Background Grid Pattern */}
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(#38bdf8 1px, transparent 1px)`,
            backgroundSize: "24px 24px"
          }}
        />

        {/* Stylized World Continents SVG Outlines */}
        <svg
          viewBox="0 0 1000 500"
          className="w-full h-full object-contain pointer-events-none select-none opacity-40"
        >
          {/* North America */}
          <path
            d="M 150,90 Q 240,80 290,140 Q 310,210 250,260 Q 180,240 140,170 Z"
            fill="#1e293b"
            stroke="#334155"
            strokeWidth="1.5"
          />
          {/* South America */}
          <path
            d="M 280,270 Q 360,290 350,380 Q 320,450 290,480 Q 260,390 280,270 Z"
            fill="#1e293b"
            stroke="#334155"
            strokeWidth="1.5"
          />
          {/* Europe */}
          <path
            d="M 460,100 Q 560,90 580,160 Q 530,220 460,190 Q 440,140 460,100 Z"
            fill="#1e293b"
            stroke="#334155"
            strokeWidth="1.5"
          />
          {/* Africa */}
          <path
            d="M 470,200 Q 570,210 580,310 Q 540,400 490,410 Q 450,310 470,200 Z"
            fill="#1e293b"
            stroke="#334155"
            strokeWidth="1.5"
          />
          {/* Asia */}
          <path
            d="M 590,90 Q 820,80 870,220 Q 800,280 690,260 Q 610,200 590,90 Z"
            fill="#1e293b"
            stroke="#334155"
            strokeWidth="1.5"
          />
          {/* Australia */}
          <path
            d="M 780,330 Q 880,340 870,420 Q 800,430 770,380 Z"
            fill="#1e293b"
            stroke="#334155"
            strokeWidth="1.5"
          />

          {/* Inter-region Animated Network Connection Lines */}
          <g stroke="#06b6d4" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.5">
            <line x1="280" y1="190" x2="520" y2="160" />
            <line x1="520" y1="160" x2="760" y2="290" />
            <line x1="760" y1="290" x2="840" y2="190" />
            <line x1="280" y1="190" x2="340" y2="360" />
            <line x1="180" y1="175" x2="280" y2="190" />
            <line x1="470" y1="150" x2="520" y2="160" />
          </g>
        </svg>

        {/* Dynamic Nodes Placed Absolutely */}
        {TRAFFIC_NODES.map((node) => {
          const isSelected = activeNode?.id === node.id;
          return (
            <div
              key={node.id}
              style={{ left: `${node.x}%`, top: `${node.y}%` }}
              onClick={() => setActiveNode(node)}
              className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
            >
              {/* Pulsing ring */}
              <div className="relative flex items-center justify-center">
                <span
                  className={cn(
                    "absolute w-6 h-6 rounded-full animate-ping-slow opacity-60",
                    node.status === "degraded" ? "bg-amber-400" : "bg-cyan-400"
                  )}
                />
                <span
                  className={cn(
                    "relative w-3.5 h-3.5 rounded-full border-2 border-slate-900 transition-transform group-hover:scale-125 shadow-md",
                    node.status === "degraded" ? "bg-amber-400" : "bg-cyan-400"
                  )}
                />
              </div>

              {/* Node Tooltip Label on Hover / Active */}
              <div
                className={cn(
                  "absolute top-5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 rounded bg-[#090e1a]/95 border text-[10px] font-mono shadow-lg transition-all pointer-events-none z-20",
                  isSelected
                    ? "border-cyan-500 text-cyan-300 opacity-100 scale-100"
                    : "border-slate-700 text-slate-300 opacity-0 group-hover:opacity-100 group-hover:scale-100"
                )}
              >
                {node.name.split(" ")[0]} ({node.avgLatency}ms)
              </div>
            </div>
          );
        })}

        {/* Selected Node Floating Details Bar */}
        {activeNode && (
          <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-md bg-[#090e1a]/90 backdrop-blur-md border border-slate-800/90 rounded-lg p-2.5 flex items-center justify-between gap-4 text-xs font-mono shadow-xl z-20">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
              <div>
                <span className="font-semibold text-white">{activeNode.name}</span>
                <span className="text-[10px] text-slate-400 block">
                  {activeNode.activeNodes} Cluster Pods Online
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[10px] text-slate-400">INGRESS RATE</span>
                <p className="font-bold text-cyan-400">
                  {(activeNode.requestsSec / 1000).toFixed(1)}k /s
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400">RTT</span>
                <p className="font-bold text-emerald-400">{activeNode.avgLatency}ms</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
