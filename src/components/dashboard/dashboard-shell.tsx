"use client";

import React, { useState, useEffect } from "react";
import {
  Activity,
  Server,
  AlertTriangle,
  Database,
  RefreshCw,
  Clock
} from "lucide-react";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { MetricCard } from "./metric-card";
import { LatencyChart } from "./latency-chart";
import { RegionalChart } from "./regional-chart";
import { ServiceHealth } from "./service-health";
import { TrafficMap } from "./traffic-map";
import { DeploymentHistory } from "./deployment-history";
import { ActivityFeed } from "./activity-feed";
import { ServiceDetail } from "./service-detail";
import { PortfolioCaseStudy } from "./case-study";
import {
  INITIAL_SERVICES,
  INITIAL_DEPLOYMENTS,
  INITIAL_ALERTS,
  SPARKLINE_LATENCY,
  SPARKLINE_SERVICES,
  SPARKLINE_ERRORS,
  SPARKLINE_DBCONN,
  ServiceMetric,
  AlertEvent,
  DeploymentRecord
} from "@/data/dashboard-data";
import { cn } from "@/lib/utils";

export function DashboardShell() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeNav, setActiveNav] = useState("overview");
  const [environment, setEnvironment] = useState("Production");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState("Just now");

  // Dynamic state for simulations
  const [services, setServices] = useState<ServiceMetric[]>(INITIAL_SERVICES);
  const [deployments] = useState<DeploymentRecord[]>(INITIAL_DEPLOYMENTS);
  const [alerts, setAlerts] = useState<AlertEvent[]>(INITIAL_ALERTS);
  const [selectedService, setSelectedService] = useState<ServiceMetric | null>(null);

  // Dynamic KPIs
  const [globalLatency, setGlobalLatency] = useState(42);
  const [dbConnections, setDbConnections] = useState(3450);
  const [errorRate, setErrorRate] = useState(0.03);

  // Auto-refresh simulation
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      // Simulate micro-fluctuations in metrics
      setGlobalLatency(Number((40 + Math.random() * 4).toFixed(0)));
      setDbConnections(Math.floor(3420 + Math.random() * 60));
      setErrorRate(Number((0.028 + Math.random() * 0.006).toFixed(3)));

      setServices((prev) =>
        prev.map((srv) => ({
          ...srv,
          cpu: Number(Math.min(98, Math.max(10, srv.cpu + (Math.random() * 4 - 2))).toFixed(1)),
          latency: Number(
            Math.min(120, Math.max(12, srv.latency + (Math.random() * 3 - 1.5))).toFixed(1)
          )
        }))
      );

      setLastUpdated(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
      setIsRefreshing(false);
    }, 600);
  };

  // Auto-interval update every 30s
  useEffect(() => {
    const timer = setInterval(() => {
      setLastUpdated(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }));
    }, 30000);
    return () => clearInterval(timer);
  }, []);

  // Filter services by search
  const displayedServices = services.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div id="dashboard-top" className="flex min-h-screen bg-[#070b14] text-slate-100 antialiased font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
          activeNav={activeNav}
          onSelectNav={setActiveNav}
        />
      </div>

      {/* Mobile Sidebar Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/80 flex">
          <div className="w-64 h-full bg-[#090e1a]">
            <Sidebar
              collapsed={false}
              onToggle={() => setMobileMenuOpen(false)}
              activeNav={activeNav}
              onSelectNav={(id) => {
                setActiveNav(id);
                setMobileMenuOpen(false);
              }}
            />
          </div>
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar
          environment={environment}
          onEnvironmentChange={setEnvironment}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          alerts={alerts}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />

        <main className="p-4 sm:p-6 lg:p-8 max-w-[1600px] w-full mx-auto space-y-6">
          {/* Dashboard Header Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-800/60">
            <div>
              <div className="flex items-center gap-2.5">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
                  Infrastructure Overview
                </h1>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-mono bg-cyan-950/80 text-cyan-400 border border-cyan-800/40">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                  {environment} Cluster
                </span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Real-time telemetry, pod orchestration, and globally distributed mesh health.
              </p>
            </div>

            {/* Quick Actions (Refresh + Time range indicator) */}
            <div className="flex items-center gap-2.5 self-start md:self-auto">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-slate-800">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>Updated: {lastUpdated}</span>
              </div>

              <button
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 border border-cyan-500/40 text-xs font-mono font-medium transition-all"
                aria-label="Refresh telemetry data"
              >
                <RefreshCw className={cn("w-3.5 h-3.5", isRefreshing && "animate-spin")} />
                <span>{isRefreshing ? "Syncing..." : "Refresh"}</span>
              </button>
            </div>
          </div>

          {/* 4 Key KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Global API Latency"
              value={`${globalLatency}`}
              unit="ms"
              change="-4.2%"
              changeType="positive"
              subtext="vs last 24 hours"
              sparklineData={SPARKLINE_LATENCY}
              icon={Activity}
              badgeText="p50 Optimal"
              badgeType="healthy"
              accentColor="cyan"
            />
            <MetricCard
              title="Active Microservices"
              value="114"
              unit="/ 115"
              change="99.1%"
              changeType="positive"
              subtext="healthy quorum"
              sparklineData={SPARKLINE_SERVICES}
              icon={Server}
              badgeText="1 Degrading"
              badgeType="warning"
              accentColor="emerald"
            />
            <MetricCard
              title="Global Error Rate"
              value={`${errorRate}%`}
              change="-0.004%"
              changeType="positive"
              subtext="within 99.9% SLO"
              sparklineData={SPARKLINE_ERRORS}
              icon={AlertTriangle}
              badgeText="SLA Compliant"
              badgeType="healthy"
              accentColor="indigo"
            />
            <MetricCard
              title="Database Connections"
              value={`${dbConnections}`}
              change="+2.1%"
              changeType="neutral"
              subtext="68% pool cap"
              sparklineData={SPARKLINE_DBCONN}
              icon={Database}
              badgeText="Aurora Cluster"
              badgeType="info"
              accentColor="amber"
            />
          </div>

          {/* Charts Row: Latency Distribution (7 cols) + Regional Latency (5 cols) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7">
              <LatencyChart />
            </div>
            <div className="lg:col-span-5">
              <RegionalChart />
            </div>
          </div>

          {/* Real-Time Traffic Visualizer */}
          <TrafficMap />

          {/* Service Health & Live Activity Feed Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-8">
              <ServiceHealth
                services={displayedServices}
                onSelectService={(srv) => setSelectedService(srv)}
              />
            </div>
            <div className="lg:col-span-4">
              <ActivityFeed alerts={alerts} />
            </div>
          </div>

          {/* Deployment History Table */}
          <DeploymentHistory deployments={deployments} />

          {/* Portfolio Case Study Presentation Section */}
          <PortfolioCaseStudy />
        </main>

        {/* Global Footer */}
        <footer className="mt-auto border-t border-slate-800/80 bg-[#070b14] py-6 px-6 text-center text-xs text-slate-400 font-mono flex flex-col sm:flex-row items-center justify-between gap-3 max-w-[1600px] w-full mx-auto">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>NexusMetrics Control Plane • Production Ready Architecture</span>
          </div>
          <div>Built for Cloud Infrastructure & High-Density SRE Observability</div>
        </footer>
      </div>

      {/* Service Detail Modal */}
      <ServiceDetail
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onTriggerRestart={(id) => {
          setAlerts((prev) => [
            {
              id: `alt-${Date.now()}`,
              title: "Rolling Restart Initiated",
              message: `Operator initiated zero-downtime rolling restart for ${id}`,
              severity: "info",
              timestamp: "Just now"
            },
            ...prev
          ]);
        }}
      />
    </div>
  );
}
