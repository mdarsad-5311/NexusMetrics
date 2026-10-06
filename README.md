# NexusMetrics — Cloud Admin Dashboard

> Developer operations interface for monitoring distributed cloud infrastructure.

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-blue?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Recharts](https://img.shields.io/badge/Recharts-3.10-22c55e?style=flat-square)](https://recharts.org/)
[![Lucide](https://img.shields.io/badge/Lucide-React-orange?style=flat-square)](https://lucide.dev/)

---

<!-- Live Demo and Source Code placeholders -->
[**Live Demo**](https://example.com/demo) &nbsp;|&nbsp; [**Source Code**](https://github.com/example/nexusmetrics)

<!-- Main Desktop Dashboard Screenshot Placeholder -->
![NexusMetrics Desktop Dashboard Preview](https://placehold.co/1200x675/090e1a/38bdf8?text=NexusMetrics+Desktop+Dashboard+Preview)

---

## Overview

**NexusMetrics** is a realistic developer operations and SRE dashboard engineered for infrastructure teams managing distributed microservice meshes. Designed with a deep-slate developer tool aesthetic, it centralizes real-time telemetry, pod orchestration quotas, edge ingress routing, and continuous canary rollouts into a unified, high-density interface.

Instead of navigating fragmented monitoring services, engineers can assess global infrastructure health at a glance, drill down into individual microservice metrics, inspect percentile latency distributions, and isolate cross-region bottlenecks.

---

## The Challenge

Modern distributed cloud environments present critical UX and engineering hurdles:

* **Information Overload:** SRE and DevOps teams oversee dozens to hundreds of microservices, making it difficult to surface failing pods before user-facing SLOs degrade.
* **Density vs. Clarity:** Presenting deep telemetry (p50/p95/p99 latency, CPU saturation, memory RSS, ingress rates, deployment status) without causing visual fatigue or cognitive clutter.
* **Cross-Device Usability:** Enabling engineers on call to monitor incidents, inspect deployment logs, and review service health from tablets and mobile screens without sacrificing data density.
* **Surface Realism:** Moving beyond static mockups to create a responsive, interactive operations dashboard featuring live filtering, time-range analysis, environment switching, and simulated telemetry dynamics.

---

## The Solution

NexusMetrics solves these challenges through a thoughtfully structured operations console:

* **High-Density KPI Cards:** Four vital indicators (API Latency, Microservice Quorum, Global Error Rate, and Database Connection Pool) paired with inline sparklines and status badges.
* **Percentile Latency Analytics:** Interactive Recharts area chart breaking down p50, p95, and p99 percentile distribution curves across selectable time horizons (`1H`, `6H`, `24H`, `7D`).
* **Regional Telemetry Comparison:** Multi-line telemetry comparing latency between US-East, EU-Central, and Asia-Pacific edge clusters.
* **Microservice Health Table:** Comprehensive status monitor tracking pod instances, CPU allocation, memory consumption, throughput, and error rates with instant status filtering (`Healthy`, `Warning`, `Critical`).
* **Interactive Diagnostic Drawer:** Drill-down modal for any service detailing recent git release tags, cluster saturation, and simulated rolling restart actions.
* **Global Network Topology Visualizer:** Lightweight, custom-coded SVG world mesh with pulse radar beacons displaying ingress flow and edge cluster RTT.
* **Deployment Audit Pipeline:** CI/CD deployment history table with status badges (`Success`, `Running`, `Failed`, `Rollback`) and duration metrics.
* **Live Incident & Event Stream:** Real-time activity feed highlighting canary adjustments, memory saturation warnings, and auto-failover events.

---

## Key Features

* **Infrastructure Overview:** Single-pane-of-glass dashboard summarizing distributed cluster health.
* **KPI Monitoring:** Instant latency, microservice uptime, error budget, and database saturation indicators.
* **API Latency Analytics:** Smooth percentile visualization with custom SVG gradients and crosshair tooltips.
* **Regional Latency Monitoring:** Cross-region probe telemetry comparing three global availability zones.
* **Microservice Health Monitor:** Real-time pod quotas, resource utilization bars, and latency tracking.
* **Global Traffic Visualizer:** Stylized SVG topology with animated request routing and node inspection.
* **Deployment Monitoring:** Complete rollout audit trail including commit hashes, target environments, and runtimes.
* **Live Activity Feed:** Auto-streaming event feed for cluster warnings, deployments, and node recoveries.
* **Service Detail Drawer:** Contextual diagnostic modal displaying pod quotas, resource bars, and restart capabilities.
* **Multi-Filter Support:** Instant filtering across service health states and deployment release outcomes.
* **Environment Switching:** Interactive switcher for `Production`, `Staging`, and `Canary` environments.
* **Auto-Refresh Simulation:** Dynamic telemetry re-calculation simulating realistic metric fluctuations.
* **Responsive Navigation:** Collapsible desktop sidebar and sliding drawer navigation for mobile devices.

---

## Technical Highlights

* **Next.js App Router:** Server-first foundation optimized with static page generation and lightweight hydration.
* **TypeScript:** Strict type checking across all data structures, component props, and event handlers.
* **Tailwind CSS Engine:** Custom color palette using deep slate surfaces (`#070b14`, `#090e1a`) with subtle cyan (`#38bdf8`) accents.
* **Recharts Telemetry Suite:** Responsive area and line charts with custom tooltip renderers and zero layout shifts.
* **Lucide Iconography:** Clean, modern developer iconography mapped to operational concepts.
* **Modular Architecture:** Clean separation of concerns between layout shells, visualization components, and structured mock datasets.
* **Accessible Dialogs:** ARIA-compliant modal dialogues (`role="dialog"`, `aria-modal="true"`) with keyboard dismissibility.

---

## Architecture

The codebase follows a modular, scalable directory layout:

```text
src/
├── app/
│   ├── globals.css          # Design system tokens, custom scrollbars, and radar animations
│   ├── layout.tsx           # Root HTML structure, typography font loader, and global metadata
│   └── page.tsx             # Root page rendering the DashboardShell
├── components/
│   └── dashboard/
│       ├── dashboard-shell.tsx     # Central state orchestrator (search, filters, telemetry refresh)
│       ├── sidebar.tsx             # Collapsible desktop sidebar & cluster health indicator
│       ├── topbar.tsx              # Navigation bar, search input, environment switcher, notifications
│       ├── metric-card.tsx         # KPI telemetry cards with inline SVG sparklines
│       ├── latency-chart.tsx       # Recharts area graph for p50/p95/p99 latency
│       ├── regional-chart.tsx      # Multi-line regional latency comparison chart
│       ├── service-health.tsx      # Microservice health table with resource bars and filtering
│       ├── traffic-map.tsx         # Stylized SVG world topology visualizer with cluster nodes
│       ├── deployment-history.tsx  # CI/CD release audit log with status filtering
│       ├── activity-feed.tsx       # Live incident and telemetry event feed
│       ├── service-detail.tsx      # Contextual diagnostic drawer/modal with restart action
│       └── case-study.tsx          # Integrated portfolio case study presentation
├── data/
│   └── dashboard-data.ts    # Strongly typed data models and initial infrastructure state
└── lib/
    └── utils.ts             # Class merging (cn) and metric formatting utilities
```

### Component Responsibilities

* **`dashboard-shell.tsx`**: Manages global dashboard state including active environment, search queries, selected services for drill-down inspection, and telemetry refresh simulation.
* **`sidebar.tsx` & `topbar.tsx`**: Provide desktop and mobile navigation, environment switching, notifications popovers, and status indicators.
* **`latency-chart.tsx` & `regional-chart.tsx`**: Encapsulate Recharts data presentation, time-range slicing (`1H`, `6H`, `24H`, `7D`), and percentile thresholds.
* **`traffic-map.tsx`**: Lightweight SVG world map that renders cluster nodes and cross-region network links without third-party GIS library overhead.
* **`service-health.tsx` & `service-detail.tsx`**: Provide high-density microservice table rows with drill-down modal inspection for deep diagnostics.

---

## Data & Interaction Model

NexusMetrics utilizes strongly typed infrastructure data structures defined in [`src/data/dashboard-data.ts`](file:///c:/Users/SIS/OneDrive/Desktop/NexusMetrics/src/data/dashboard-data.ts):

* **Services:** Monitored services with CPU, memory, median latency, request throughput, error rate, pod quorum, and release history.
* **Metrics:** Global metrics including API latency (p50/p95/p99), database pool utilization, and error rate percentages.
* **Regional Series:** Inter-region telemetry across US-East, EU-Central, and Asia-Pacific.
* **Deployments:** Continuous delivery audit logs with commit SHA, author, environment, duration, and status.
* **Alerts:** Operational incident records categorized by severity (`critical`, `warning`, `info`, `success`).

Triggering the **Refresh** button simulates realistic telemetry jitter: CPU utilization adjusts within safe limits, latencies fluctuate by small millisecond increments, and timestamps update across all indicators.

---

## Responsive Design

NexusMetrics implements an adaptive layout tested across 10 discrete viewport sizes:

* **Desktop (`1280px` – `1920px`):** Full 4-column KPI cards, multi-column telemetry graphs, side-by-side service monitors, and an expanded sidebar.
* **Tablet (`768px` – `1024px`):** 2-column KPI cards, full-width responsive charts, and an adaptive collapsible navigation bar.
* **Mobile (`320px` – `430px`):** Single-column stacked cards, slide-out mobile drawer, horizontally scrollable data tables, and touch-friendly controls with zero horizontal page overflow.

### Verified Breakpoints

| Breakpoint | Target Category | Result |
| :--- | :--- | :--- |
| `320px` | Ultra-Compact Mobile (iPhone SE 1st Gen) | **PASS** |
| `375px` | Compact Mobile (iPhone SE 2nd Gen) | **PASS** |
| `390px` | Standard Mobile (iPhone 12/13/14 Pro) | **PASS** |
| `430px` | Large Mobile (iPhone Pro Max) | **PASS** |
| `768px` | Tablet Portrait (iPad Mini) | **PASS** |
| `820px` | Tablet Landscape (iPad Air) | **PASS** |
| `1024px` | Small Laptop / iPad Pro | **PASS** |
| `1280px` | Standard Laptop Displays | **PASS** |
| `1440px` | Desktop HD Displays | **PASS** |
| `1920px` | Ultra-Wide Full HD Workstations | **PASS** |

---

## Accessibility

* **Semantic HTML:** Structured using semantic elements (`<header>`, `<main>`, `<aside>`, `<nav>`, `<section>`, `<table>`, `<footer>`).
* **Accessible Dialogs:** The service detail modal includes `role="dialog"`, `aria-modal="true"`, and descriptive title IDs.
* **Keyboard Navigation:** All interactive buttons, tab selectors, and filter pills support focus rings and keyboard activation.
* **Color Contrast:** Deep slate backgrounds paired with high-contrast slate-200 and white typography ensure readability compliant with WCAG guidelines.

---

## Performance

* **Zero Heavy Map Libraries:** Employs an ultra-lightweight custom SVG world mesh with pulse radar nodes rather than heavy Mapbox or Leaflet bundles.
* **Lightweight Bundle:** Production build generates static HTML and CSS under 115 KB gzipped.
* **Zero Layout Shift:** Chart containers use Recharts `ResponsiveContainer` wrapped in fixed-aspect ratio panels.
* **Controlled Animations:** Micro-interactions and CSS keyframe animations leverage GPU-accelerated transforms and opacity.

---

## Quality Checks & Verification

* **TypeScript Compilation (`npx tsc --noEmit`):** **PASS** (0 errors)
* **ESLint Code Quality (`npm run lint`):** **PASS** (0 errors, 0 warnings)
* **Production Build (`npm run build`):** **PASS** (Static routes prerendered cleanly)
* **Browser Automation QA:** **PASS** (Zero console errors or runtime warnings)
* **Responsive Overflow Inspection:** **PASS** (Zero horizontal scroll across all 10 breakpoints)

---

## Screenshots

<!-- Placeholder links for portfolio visual assets -->
### 1. Desktop Dashboard
![NexusMetrics Desktop Dashboard](https://placehold.co/1200x675/090e1a/38bdf8?text=1.+Desktop+Dashboard+Overview)

### 2. Infrastructure Metrics & Telemetry
![Infrastructure Metrics](https://placehold.co/1200x675/090e1a/38bdf8?text=2.+KPI+Metrics+and+Latency+Distribution)

### 3. Microservice Health Monitor
![Microservice Health](https://placehold.co/1200x675/090e1a/38bdf8?text=3.+Microservice+Health+Monitor)

### 4. Global Traffic Visualization
![Traffic Visualization](https://placehold.co/1200x675/090e1a/38bdf8?text=4.+Global+Traffic+Visualizer)

### 5. Deployment Audit Pipeline
![Deployment History](https://placehold.co/1200x675/090e1a/38bdf8?text=5.+Deployment+Pipeline+and+Rollouts)

### 6. Service Detail Diagnostic Drawer
![Service Detail Drawer](https://placehold.co/1200x675/090e1a/38bdf8?text=6.+Service+Detail+Modal)

### 7. Mobile Viewport Layout
![Mobile Dashboard](https://placehold.co/600x900/090e1a/38bdf8?text=7.+Mobile+Drawer+and+Stacked+Cards)

---

## Project Structure

```text
NexusMetrics/
├── public/                 # Static assets and icons
├── src/
│   ├── app/                # Next.js App Router (layout, page, globals.css)
│   ├── components/         # Modular React components
│   │   └── dashboard/      # Dashboard shells, charts, tables, and drawers
│   ├── data/               # Strongly typed telemetry and service data
│   └── lib/                # Reusable class merging and formatting utilities
├── package.json            # Project dependencies and npm scripts
├── tsconfig.json           # TypeScript configuration
└── README.md               # Project documentation and case study
```

---

## Getting Started

### Prerequisites

* Node.js 18.17 or later
* npm (bundled with Node.js)

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Running Locally

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Validation Commands

Verify code quality, typing, and production build readiness:

```bash
# Validate TypeScript types
npx tsc --noEmit

# Run ESLint validation
npm run lint

# Build optimized production bundle
npm run build
```

---

## Portfolio Case Study

### Challenge
Building an operations dashboard for distributed cloud platforms requires balancing high data density with immediate clarity. Engineers during incident triage need instant answers: Which cluster is bottlenecked? Did the latest canary deploy trigger latency spikes? How saturated is the PostgreSQL connection pool? Presenting these varied data types on one responsive screen without overwhelming the user was the core UX challenge.

### Approach
I adopted a deep-slate developer tool aesthetic inspired by modern cloud consoles. Information hierarchy was established by grouping data from macro to micro: top-level system health and KPIs at the top, percentile latency curves and regional maps in the center, and detailed microservice pod tables and release history below.

### Architecture
The interface is constructed around a centralized state coordinator (`dashboard-shell.tsx`) that manages environment switching, active search filtering, and simulated telemetry dynamics. Presentational components remain isolated and reusable, while data visualization is handled by Recharts wrapped in responsive containers to eliminate layout shifts.

### UX Decisions
* **Muted Surfaces with Focused Color:** Deep slate containers (`#090e1a`) prevent eye strain, while status indicators (cyan for optimal, amber for warning, rose for critical) guide immediate attention to anomalies.
* **Contextual Drill-Downs:** Instead of redirecting users to separate pages to inspect pod memory or rolling release versions, a diagnostic drawer opens in-place, preserving triage context.
* **Accessible Interactions:** Clear keyboard focus outlines, ARIA roles for modal dialogs, and legible monospace numerical typography ensure a comfortable user experience.

### Responsive Strategy
Rather than simply shrinking desktop layouts, the interface reorganizes intelligently:
* Four-column metric grids collapse to two columns on tablets and a single column on mobile.
* The desktop sidebar seamlessly transforms into an animated slide-out drawer.
* Data tables adapt horizontally scrollable containers with sticky context columns.

### Key Learnings
* Crafting custom SVG network topologies provides significantly faster initial load times and smoother animations compared to heavy GIS map libraries when geographic fidelity is secondary to topology clarity.
* Maintaining strict TypeScript definitions for all telemetry models ensures chart configurations and table formatters remain resilient against missing or fluctuating values.

### Results
* **100% Responsive Coverage:** Validated across 10 standard device breakpoints from 320px to 1920px.
* **Production Code Quality:** 0 TypeScript compiler errors, 0 ESLint warnings, and 0 runtime exceptions.
* **High Information Density:** 8 microservices, 7 global edge regions, 6 deployment rollouts, and multi-tier latency metrics presented in a cohesive, single-page interface.

---

## Future Improvements

The following items are planned enhancements for future iterations of NexusMetrics:

* **WebSocket Telemetry Stream:** Integrating live bidirectional WebSocket connections for real-time Prometheus or OpenTelemetry metric ingest.
* **Cloud Provider Connectors:** Pre-built connectors for AWS CloudWatch, Google Cloud Monitoring, and Datadog API keys.
* **Role-Based Access Control (RBAC):** SRE and viewer role management with restricted rollback permissions.
* **Persistent Alert History:** Long-term incident event logging backed by a time-series database.
* **Log Stream Terminal:** Live log tailing panel with search and grep filtering for microservice pods.
* **Infrastructure-as-Code Integration:** Direct links to Terraform state files and Kubernetes manifest diffs.

---

## Portfolio Project Copy

### Short Version
> "NexusMetrics is a production-style cloud operations dashboard designed for monitoring distributed infrastructure, API performance, microservice health, deployments, and regional traffic from a single interface."

### Case Study Summary
> "NexusMetrics is a developer operations and SRE interface built with Next.js, TypeScript, Tailwind CSS, and Recharts. It solves operational data overload by combining high-density KPI telemetry, p50/p95/p99 percentile latency distribution charts, an interactive SVG network topology visualizer, and a microservice health monitor with in-place diagnostic drill-downs. Tested across 10 responsive breakpoints with 0 TypeScript and ESLint errors, it demonstrates a complete approach to engineering modern cloud tooling."
