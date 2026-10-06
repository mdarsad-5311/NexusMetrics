import { DashboardShell } from "@/components/dashboard/dashboard-shell";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NexusMetrics — Cloud Admin Dashboard",
  description:
    "Developer operations interface for monitoring distributed cloud infrastructure, service health, API performance, deployments, and real-time telemetry."
};

export default function Home() {
  return <DashboardShell />;
}
