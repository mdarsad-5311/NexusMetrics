export interface ServiceMetric {
  id: string;
  name: string;
  category: "gateway" | "auth" | "core" | "data" | "search";
  status: "healthy" | "warning" | "critical";
  instances: number;
  totalInstances: number;
  cpu: number; // percentage
  memory: number; // percentage
  latency: number; // ms
  requestRate: number; // req/sec
  errorRate: number; // percentage
  uptime: string;
  version: string;
  recentDeployments: {
    id: string;
    version: string;
    timestamp: string;
    status: "success" | "rollback" | "failed";
  }[];
}

export interface DeploymentRecord {
  id: string;
  service: string;
  version: string;
  environment: "Production" | "Staging" | "Canary";
  status: "success" | "running" | "failed" | "rollback";
  timestamp: string;
  duration: string;
  commit: string;
  author: string;
}

export interface AlertEvent {
  id: string;
  title: string;
  message: string;
  severity: "critical" | "warning" | "info" | "success";
  timestamp: string;
  service?: string;
  read?: boolean;
}

export interface TrafficNode {
  id: string;
  name: string;
  region: string;
  x: number; // relative SVG percentage (0-100)
  y: number;
  status: "optimal" | "degraded" | "high-load";
  requestsSec: number;
  avgLatency: number;
  activeNodes: number;
}

export const INITIAL_SERVICES: ServiceMetric[] = [
  {
    id: "srv-gateway",
    name: "API Gateway",
    category: "gateway",
    status: "healthy",
    instances: 16,
    totalInstances: 16,
    cpu: 34.2,
    memory: 58.7,
    latency: 18.4,
    requestRate: 48200,
    errorRate: 0.012,
    uptime: "99.994%",
    version: "v2.14.0",
    recentDeployments: [
      { id: "dep-901", version: "v2.14.0", timestamp: "12m ago", status: "success" },
      { id: "dep-884", version: "v2.13.9", timestamp: "3d ago", status: "success" }
    ]
  },
  {
    id: "srv-auth",
    name: "Authentication",
    category: "auth",
    status: "healthy",
    instances: 12,
    totalInstances: 12,
    cpu: 28.5,
    memory: 44.1,
    latency: 24.1,
    requestRate: 18400,
    errorRate: 0.008,
    uptime: "99.999%",
    version: "v1.8.2",
    recentDeployments: [
      { id: "dep-895", version: "v1.8.2", timestamp: "1d ago", status: "success" }
    ]
  },
  {
    id: "srv-payments",
    name: "Payments Engine",
    category: "core",
    status: "warning",
    instances: 8,
    totalInstances: 8,
    cpu: 78.4,
    memory: 76.2,
    latency: 68.2,
    requestRate: 8350,
    errorRate: 0.084,
    uptime: "99.982%",
    version: "v3.1.0",
    recentDeployments: [
      { id: "dep-902", version: "v3.1.0", timestamp: "34m ago", status: "success" },
      { id: "dep-880", version: "v3.0.9", timestamp: "4d ago", status: "rollback" }
    ]
  },
  {
    id: "srv-user",
    name: "User Service",
    category: "core",
    status: "healthy",
    instances: 14,
    totalInstances: 14,
    cpu: 41.0,
    memory: 52.3,
    latency: 22.8,
    requestRate: 31200,
    errorRate: 0.015,
    uptime: "99.991%",
    version: "v2.9.4",
    recentDeployments: [
      { id: "dep-872", version: "v2.9.4", timestamp: "2d ago", status: "success" }
    ]
  },
  {
    id: "srv-notification",
    name: "Notification Dispatcher",
    category: "gateway",
    status: "healthy",
    instances: 10,
    totalInstances: 10,
    cpu: 19.3,
    memory: 38.6,
    latency: 31.5,
    requestRate: 14200,
    errorRate: 0.021,
    uptime: "99.970%",
    version: "v1.4.7",
    recentDeployments: [
      { id: "dep-890", version: "v1.4.7", timestamp: "6h ago", status: "success" }
    ]
  },
  {
    id: "srv-analytics",
    name: "Analytics & Telemetry",
    category: "data",
    status: "healthy",
    instances: 24,
    totalInstances: 24,
    cpu: 56.8,
    memory: 68.4,
    latency: 45.1,
    requestRate: 62400,
    errorRate: 0.038,
    uptime: "99.950%",
    version: "v4.0.1",
    recentDeployments: [
      { id: "dep-898", version: "v4.0.1", timestamp: "18h ago", status: "success" }
    ]
  },
  {
    id: "srv-search",
    name: "Distributed Search Index",
    category: "search",
    status: "critical",
    instances: 18,
    totalInstances: 19,
    cpu: 89.2,
    memory: 92.4,
    latency: 94.6,
    requestRate: 27500,
    errorRate: 0.142,
    uptime: "99.910%",
    version: "v2.3.0-rc2",
    recentDeployments: [
      { id: "dep-904", version: "v2.3.0-rc2", timestamp: "4m ago", status: "failed" },
      { id: "dep-888", version: "v2.2.8", timestamp: "2d ago", status: "success" }
    ]
  },
  {
    id: "srv-billing",
    name: "Billing Reconciliation",
    category: "core",
    status: "healthy",
    instances: 6,
    totalInstances: 6,
    cpu: 22.4,
    memory: 41.2,
    latency: 38.0,
    requestRate: 4100,
    errorRate: 0.005,
    uptime: "99.998%",
    version: "v1.12.0",
    recentDeployments: [
      { id: "dep-864", version: "v1.12.0", timestamp: "5d ago", status: "success" }
    ]
  }
];

export const INITIAL_DEPLOYMENTS: DeploymentRecord[] = [
  {
    id: "dep-904",
    service: "Distributed Search Index",
    version: "v2.3.0-rc2",
    environment: "Production",
    status: "failed",
    timestamp: "4m ago",
    duration: "1m 45s",
    commit: "3f982a1",
    author: "sre-lead"
  },
  {
    id: "dep-903",
    service: "API Gateway",
    version: "v2.14.0",
    environment: "Production",
    status: "running",
    timestamp: "8m ago",
    duration: "4m 12s",
    commit: "98ab21c",
    author: "alex.m"
  },
  {
    id: "dep-902",
    service: "Payments Engine",
    version: "v3.1.0",
    environment: "Production",
    status: "success",
    timestamp: "34m ago",
    duration: "3m 18s",
    commit: "71cb44e",
    author: "elena.k"
  },
  {
    id: "dep-901",
    service: "Notification Dispatcher",
    version: "v1.4.7",
    environment: "Staging",
    status: "success",
    timestamp: "2h ago",
    duration: "2m 04s",
    commit: "55df109",
    author: "ci-bot"
  },
  {
    id: "dep-900",
    service: "User Service",
    version: "v2.9.4",
    environment: "Production",
    status: "rollback",
    timestamp: "6h ago",
    duration: "1m 15s",
    commit: "b810432",
    author: "marcus.v"
  },
  {
    id: "dep-899",
    service: "Analytics & Telemetry",
    version: "v4.0.1",
    environment: "Production",
    status: "success",
    timestamp: "18h ago",
    duration: "5m 40s",
    commit: "cc2901a",
    author: "sarah.t"
  }
];

export const INITIAL_ALERTS: AlertEvent[] = [
  {
    id: "alt-1",
    title: "High Memory Saturation",
    message: "Distributed Search Index node pool memory exceeded 92% threshold",
    severity: "critical",
    timestamp: "Just now",
    service: "Distributed Search Index"
  },
  {
    id: "alt-2",
    title: "Canary Rollback Triggered",
    message: "Deployment dep-904 failed readiness probe; canary traffic reverted",
    severity: "warning",
    timestamp: "4m ago",
    service: "Distributed Search Index"
  },
  {
    id: "alt-3",
    title: "Database Connection Pool Surge",
    message: "PostgreSQL Aurora primary instance active pool climbed to 3,450 connections",
    severity: "info",
    timestamp: "14m ago"
  },
  {
    id: "alt-4",
    title: "Region Failover Recovered",
    message: "EU-Central replica edge latency normalized to 39ms after routing rebalance",
    severity: "success",
    timestamp: "32m ago"
  },
  {
    id: "alt-5",
    title: "Service Deployment Completed",
    message: "Payments Engine v3.1.0 rolled out across all 8 zones cleanly",
    severity: "success",
    timestamp: "34m ago",
    service: "Payments Engine"
  }
];

export const TRAFFIC_NODES: TrafficNode[] = [
  { id: "us-east", name: "US-East (N. Virginia)", region: "NA", x: 28, y: 38, status: "optimal", requestsSec: 54200, avgLatency: 28, activeNodes: 42 },
  { id: "us-west", name: "US-West (Oregon)", region: "NA", x: 18, y: 35, status: "optimal", requestsSec: 38100, avgLatency: 34, activeNodes: 28 },
  { id: "eu-central", name: "EU-Central (Frankfurt)", region: "EU", x: 52, y: 32, status: "optimal", requestsSec: 46800, avgLatency: 39, activeNodes: 36 },
  { id: "eu-west", name: "EU-West (London)", region: "EU", x: 47, y: 30, status: "optimal", requestsSec: 32400, avgLatency: 35, activeNodes: 24 },
  { id: "ap-southeast", name: "Asia-Pacific (Singapore)", region: "APAC", x: 76, y: 58, status: "optimal", requestsSec: 39700, avgLatency: 54, activeNodes: 30 },
  { id: "ap-northeast", name: "Asia-Pacific (Tokyo)", region: "APAC", x: 84, y: 38, status: "degraded", requestsSec: 29500, avgLatency: 64, activeNodes: 22 },
  { id: "sa-east", name: "SA-East (São Paulo)", region: "SA", x: 34, y: 72, status: "optimal", requestsSec: 14200, avgLatency: 72, activeNodes: 12 }
];

export const TIME_RANGE_LATENCY: Record<string, { time: string; p50: number; p95: number; p99: number; volume: number }[]> = {
  "1H": [
    { time: "17:00", p50: 32, p95: 46, p99: 68, volume: 1420 },
    { time: "17:10", p50: 34, p95: 48, p99: 72, volume: 1560 },
    { time: "17:20", p50: 33, p95: 45, p99: 66, volume: 1610 },
    { time: "17:30", p50: 39, p95: 58, p99: 89, volume: 1840 },
    { time: "17:40", p50: 44, p95: 64, p99: 104, volume: 2100 },
    { time: "17:50", p50: 42, p95: 59, p99: 94, volume: 1980 }
  ],
  "6H": [
    { time: "12:00", p50: 30, p95: 42, p99: 61, volume: 8400 },
    { time: "13:00", p50: 33, p95: 45, p99: 64, volume: 9200 },
    { time: "14:00", p50: 35, p95: 48, p99: 70, volume: 10400 },
    { time: "15:00", p50: 38, p95: 52, p99: 78, volume: 11600 },
    { time: "16:00", p50: 40, p95: 56, p99: 85, volume: 12100 },
    { time: "17:00", p50: 42, p95: 60, p99: 96, volume: 13500 }
  ],
  "24H": [
    { time: "00:00", p50: 28, p95: 39, p99: 55, volume: 45000 },
    { time: "04:00", p50: 26, p95: 36, p99: 50, volume: 32000 },
    { time: "08:00", p50: 34, p95: 47, p99: 69, volume: 68000 },
    { time: "12:00", p50: 41, p95: 58, p99: 88, volume: 94000 },
    { time: "16:00", p50: 43, p95: 62, p99: 95, volume: 102000 },
    { time: "20:00", p50: 39, p95: 54, p99: 78, volume: 81000 }
  ],
  "7D": [
    { time: "Mon", p50: 36, p95: 51, p99: 75, volume: 540000 },
    { time: "Tue", p50: 38, p95: 53, p99: 78, volume: 580000 },
    { time: "Wed", p50: 44, p95: 66, p99: 102, volume: 640000 },
    { time: "Thu", p50: 40, p95: 57, p99: 84, volume: 610000 },
    { time: "Fri", p50: 42, p95: 61, p99: 91, volume: 630000 },
    { time: "Sat", p50: 32, p95: 44, p99: 62, volume: 410000 },
    { time: "Sun", p50: 31, p95: 42, p99: 59, volume: 390000 }
  ]
};

export const REGIONAL_SERIES = [
  { time: "12:00", usEast: 28, euCentral: 39, asiaPacific: 58 },
  { time: "13:00", usEast: 29, euCentral: 41, asiaPacific: 61 },
  { time: "14:00", usEast: 31, euCentral: 40, asiaPacific: 59 },
  { time: "15:00", usEast: 33, euCentral: 44, asiaPacific: 66 },
  { time: "16:00", usEast: 32, euCentral: 42, asiaPacific: 63 },
  { time: "17:00", usEast: 34, euCentral: 45, asiaPacific: 68 }
];

export const SPARKLINE_LATENCY = [38, 39, 41, 40, 43, 41, 42];
export const SPARKLINE_SERVICES = [112, 113, 114, 114, 114, 114, 114];
export const SPARKLINE_ERRORS = [0.05, 0.04, 0.035, 0.04, 0.032, 0.031, 0.030];
export const SPARKLINE_DBCONN = [3200, 3280, 3310, 3390, 3420, 3440, 3450];
