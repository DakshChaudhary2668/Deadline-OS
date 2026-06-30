# DeadlineOS ── AI Chief of Staff

> *A high-fidelity Cognitive Operating System designed to predict execution risks, simulate strategic decisions, optimize schedules, and orchestrate automated recovery protocols.*

[![License: MIT](https://img.shields.io/badge/License-MIT-000000.svg?style=flat-square&colorA=111111&colorB=222222)](LICENSE)
[![Release: Beta](https://img.shields.io/badge/Release-v1.0.0--RC1-000000.svg?style=flat-square&colorA=111111&colorB=10B981)](https://github.com/)
[![Runtime: Node.js](https://img.shields.io/badge/Runtime-Node.js_v20+-000000.svg?style=flat-square&colorA=111111&colorB=222222)](https://nodejs.org/)
[![Database: Local_JSON](https://img.shields.io/badge/Database-Local_JSON--Persistence-000000.svg?style=flat-square&colorA=111111&colorB=222222)](database.json)

<p align="center">
  <img src="hero img.png" alt="DeadlineOS Banner">
</p>

---

## Project Status

| Dimension | Attribute |
| :--- | :--- |
| **Current Release** | `v1.0.0-RC1` (Stable Release Phase) |
| **Status** | Production Ready & Stable |
| **Primary Deployment Target** | Google Cloud Run (Containerized Node.js Environment) |
| **AI Processing Unit** | Gemini 2.5 Flash via `@google/genai` TypeScript SDK |
| **PDF Generation** | Available (High-Fidelity Executive Grade Reports) |
| **Responsiveness** | Desktop, Tablet, and Mobile Optimized |

---

## Table of Contents

- [Overview](#overview)
- [Why DeadlineOS?](#why-deadlineos)
- [Key Features](#key-features)
- [Project Highlights](#project-highlights)
- [Why I Built DeadlineOS](#why-i-built-deadlineos)
- [Workspace Modes](#workspace-modes)
- [AI Intelligence Pipeline](#ai-intelligence-pipeline)
- [System Architecture](#system-architecture)
- [Project Folder Structure](#project-folder-structure)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Deployment](#deployment)
- [REST API Overview](#rest-api-overview)
- [AI Engine Architecture](#ai-engine-architecture)
- [Executive PDF Export](#executive-pdf-export)
- [Future Roadmap](#future-roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Executive Contact & Author](#executive-contact--author)

---

## Overview

**DeadlineOS** is a next-generation **AI Chief of Staff** rather than a passive task organizer. 

Traditional task managers log deadlines and wait for you to miss them. **DeadlineOS** acts as an active, cognitive partner. It runs sophisticated, continuous intelligence models that analyze active tasks, calculate resource constraints, simulate execution risks, and automatically build dynamic contingency and SLA recovery plans.

By integrating structured, specialized decision layers with the **Gemini 2.5 API**, DeadlineOS is built to help professionals, developers, students, and job-seekers manage their most constrained resource: **Time**.

---

## Why DeadlineOS?

Modern work doesn't suffer from a lack of task lists; it suffers from **cognitive overload** and **poor decision intelligence**. When deadlines crash together, standard productivity software gives you a red flag and a notification. 

DeadlineOS evaluates:
* **True Resource Cost**: How many hours of focus are physically available vs. how many are demanded by outstanding deliverables.
* **Risk Topography**: Not just high/low labels, but calculated risk percentages driven by proximity, complexity, and historical focus velocity.
* **Stochastic Recovery**: Automated, context-aware recovery pathways designed to salvage slipping milestones through scope reduction, task deconstruction, or timeline shifting.

### Feature Comparison Matrix

| Core Capabilities | Traditional Task Managers (Jira, Todoist) | DeadlineOS AI Chief of Staff |
| :--- | :---: | :---: |
| **Data Paradigm** | Static tables and checklists | Live kinetic model of active bandwidth |
| **Notification Style** | Passive banners & alert fatigue | Proactive strategic brief & intervention alerts |
| **Risk Assessment** | Static manual priority tags | Real-time stochastically calculated risk indices (0-100) |
| **Slippage Handling** | Overdue tasks pile up silently | Automated SLA Recovery protocols triggered immediately |
| **Strategic Modeling** | None | Interactive "What-If" scenario simulator |
| **Planning Engine** | Manual calendar dragging | Dynamically optimized daily & weekly timeline alignment |

---

## Key Features

* **AI Executive Briefings**: Personalized morning assessments that deliver high-value action metrics and reasoning from your AI Chief of Staff.
* **Dynamic Timeline Planner**: Fully automated daily (24h) and weekly schedules structured using outstanding task parameters, remaining focus hours, and difficulty metrics.
* **Recovery Intelligence**: Immediate SLA recovery playbooks designed to autonomously deconstruct slipping tasks and recommend actionable contingency steps.
* **What-If Simulator**: Interactive playground to simulate key changes in capacity, scope, and deadlines, instantly visualizing updated risk topographies.
* **Career Planning (Job Search)**: Dedicated job-seeker pipeline workspace prioritizing interview prep, networking outreach, and ATS-tailored resume submissions.
* **Student Planning**: Academic optimization module designed to align study blocks with coursework weights, stress boundaries, and grade-impact metrics.
* **Developer Sprint Planning**: High-throughput development workspace built to streamline release milestones, refactoring tasks, and technical debt.
* **Executive PDF Reports**: Single-click compilation of high-fidelity PDF documents detailing diagnostics, recovery paths, and complete action plans.
* **Interactive Dashboard**: Modern, high-density HUD including animated metrics, risk forecasts, and custom priority tables with zero visual clutter.
* **Offline AI Fallback**: Self-contained local fallback heuristics that calculate risk indices, balance schedules, and run mock simulators when no network or API keys are available.

---

## Project Highlights

| Component | Technical Selection |
| :--- | :--- |
| **Frontend** | React 18 + Vite + Tailwind CSS |
| **Backend** | Express + TypeScript (`tsx` + `esbuild`) |
| **AI Processing** | Google Gemini 2.5 Flash via `@google/genai` |
| **Workspace Profiles** | 4 Specialized Contexts (Developer, Student, Career, Professional) |
| **PDF Reporting** | High-Fidelity Executive Grade Compiler (`jspdf` integration) |
| **Offline Capabilities** | Supported via native fallback algorithms |
| **Interactive Charts** | Recharts & Custom SVG Indicators |
| **Visual Architecture** | Executive Dark Mode cockpit dashboard |

---

## Why I Built DeadlineOS

Traditional productivity tools are essentially databases with calendar views. They require the user to perform all the cognitive labor: identifying which task is slipping, figuring out how to rebalance the week, and guessing what the downstream impact of a delay will be. As modern workflows become faster and more complex, these static boards lead to alarm fatigue, missed deadlines, and severe burnout.

I built DeadlineOS to flip this paradigm. Instead of asking "What tasks are on my list?", DeadlineOS answers the critical executive question: *"Given my current velocity, remaining focus hours, and incoming deadlines, am I actually on track to deliver, and if not, exactly what decisions do I need to make right now to recover?"*

At its core, DeadlineOS is built on the philosophy of **Decision Intelligence**. By calculating a real-time risk index for every deliverable, it turns subjective stress into objective, actionable data. If a project enters a warning state, the system doesn't just send a generic notification; it actively drafts a tactical recovery playbook, breaking the milestone into atomic tasks and shifting lower-priority items back.

This is the true role of a Chief of Staff: filtering out the noise, summarizing critical metrics, anticipating bottlenecks before they occur, and presenting clear, structured trade-offs. 

Whether you are an engineer managing complex sprint releases, a student balancing heavy coursework, a candidate maintaining an active job-search pipeline, or an executive running operations, DeadlineOS provides a clean, native cockpit designed to protect your most valuable and exhaustible asset—your cognitive bandwidth.

---

## Workspace Modes

DeadlineOS alters its entire linguistic model, priority weights, and UI configuration depending on the active **Workspace Context Profile**.

### 1. Developer Mode
Designed for high-throughput software engineers and dev leads.
* **Dynamic Translation**: Focuses on *Sprint Tickets*, *Refactoring Blocks*, and *Release Milestones*.
* **Risk Assessment**: Models tech debt accumulation and dependencies.
* **Heuristics**: Tracks lines of code, code complexity, and integration timelines.

### 2. Student Mode
Designed for academic achievement and rigorous coursework coordination.
* **Dynamic Translation**: Focuses on *Curriculums*, *Study Blocks*, and *Milestones*.
* **Risk Assessment**: Tracks grade impact, exam weight, and study stress level.
* **Heuristics**: Distinguishes between light homework, dense projects, and critical exam preparation.

### 3. Career Mode
Designed for job-seekers executing systematic, high-conversion pipelines.
* **Dynamic Translation**: Focuses on *Job Applications*, *Interview Prep*, and *Networking Outreaches*.
* **Risk Assessment**: Measures funnel stagnation, response times, and interview prep readiness.
* **Heuristics**: Balances networking weight vs. portfolio build velocity.

### 4. Professional Mode
The default enterprise operating system profile.
* **Dynamic Translation**: Focuses on *Operations*, *Skill Acquisition*, and *Strategic Business Deliverables*.
* **Risk Assessment**: Calculates service-level agreement (SLA) breaches and client delivery impact.
* **Heuristics**: Maximizes high-leverage outcomes and capacity protection.

---

## AI Intelligence Pipeline

```
  ┌───────────────────────────────────────────────────────────────┐
  │                        Active Tasks                           │
  │     (Title, Description, Effort Hours, Due Date, Profile)     │
  └───────────────────────────────┬───────────────────────────────┘
                                  │
                                  ▼
  ┌───────────────────────────────────────────────────────────────┐
  │                 Shared Analytics Engine                       │
  │    - Computes Available vs Demanded Bandwidth                 │
  │    - Calculates Risk Scores based on Proximity & Complexity   │
  │    - Aggregates Team/Individual Velocity Coefficients         │
  └───────────────────────────────┬───────────────────────────────┘
                                  │
                                  ▼
  ┌───────────────────────────────────────────────────────────────┐
  │                     Gemini API Grounding                      │
  │    - Structures custom system instructions matching context   │
  │    - Injects computed mathematical metrics                    │
  │    - Applies Strict Output JSON Schema formatting             │
  └───────────────────────────────┬───────────────────────────────┘
                                  │
         ┌────────────────────────┴────────────────────────┐
         ▼                                                 ▼
┌───────────────────────────────┐                 ┌───────────────────────────────┐
│     Tactical Deliverables     │                 │     Strategic Decisions       │
│ - Daily 24h Timetable Plan    │                 │ - High-Value Tradeoffs        │
│ - Weekly Pipeline Schedule    │                 │ - SLA Recovery Playbooks      │
│ - Focused Actionable Tasks    │                 │ - Dynamic "What-If" Insights  │
└───────────────────────────────┘                 └───────────────────────────────┘
```

---

## System Architecture

DeadlineOS is built as a full-stack, real-time application:

* **Client Layer (SPA)**: Rich React 18 frontend built with Vite, styled with Tailwind CSS, and animated using Framer Motion. Uses Recharts and D3 for executive telemetry panels.
* **Service Layer (API Core)**: Express.js server running in high-performance Node.js environment, handling database transactions, analytic computations, and serving as a secure proxy to the LLM core.
* **Database (JSON State)**: Local file-based JSON database engine, providing schema-locked persistence and zero-overhead cold-starts.
* **AI Orchestrator**: Uses the `@google/genai` TypeScript SDK to ground queries with strict, context-appropriate prompts based on active profile states.

---

## Project Folder Structure

```
.
├── .env.example                 # Declares required environment variables
├── .gitignore                   # Workspace exclusions
├── server.ts                    # Full-stack Express.js & Vite middleware engine
├── package.json                 # Dependency manifests & run scripts
├── tsconfig.json                # Strict TypeScript configuration
├── vite.config.ts               # Vite bundler configuration
├── database.json                # JSON local database file
│
├── src/
│   ├── main.tsx                 # Client entry point
│   ├── App.tsx                  # Core App layout, state management, and routers
│   ├── index.css                # Global CSS imports including Tailwind v4
│   ├── types.ts                 # Strict TypeScript type definitions
│   │
│   ├── components/              # Highly modular executive UI components
│   │   ├── AIChat.tsx           # Dialogue interface for the AI Chief of Staff
│   │   ├── AnimatedMetric.tsx   # Premium telemetry display widgets
│   │   ├── DailyBriefing.tsx    # Live Executive Status report generator
│   │   ├── LandingPage.tsx      # High-fidelity terminal-boot landing screen
│   │   ├── PlanningAgent.tsx    # Temporal Scheduler UI (Daily/Weekly views)
│   │   ├── RecoveryHub.tsx      # SLA breach controller & mitigation center
│   │   ├── StrategicDecisions.tsx # Tactical tradeoff prioritization dashboard
│   │   ├── TaskForm.tsx         # Detailed task creation/edit form modal
│   │   ├── TaskList.tsx         # Custom filtered interactive task tables
│   │   ├── WhatIfSimulator.tsx  # Dynamic multi-variable simulation interface
│   │   └── Skeletons.tsx        # Seamless loader states
│   │
│   └── utils/
│       ├── modeLanguage.ts      # Profile localizations and semantic translations
│       └── pdfExport.ts         # High-fidelity PDF report compilation engine
```

---

## Technology Stack

### Frontend
* **Core Framework**: React 18+ (TypeScript) with Vite
* **Styles**: Tailwind CSS (optimized for ultra-high contrast dark theme UI)
* **Animations**: Framer Motion (deliberate, purposeful, low-flicker transitions)
* **Data Visualization**: Recharts, D3
* **Icons**: Lucide React (standardized executive icon suite)

### Backend
* **Runtime**: Node.js 20+
* **Framework**: Express.js
* **TypeScript Transpilation**: `tsx` (for development), `esbuild` (for ultra-fast bundling to single-file `.cjs` production distribution)

### AI Layer
* **SDK**: `@google/genai` SDK
* **Model**: `gemini-2.5-flash` (for extremely fast, high-context logical reasoning)
* **Grounding Context**: Richly formatted active workspace metadata, bandwidth analytics, velocity measurements, and profile-specific rule files.

---

## Installation

### Environment Variables
Before running the application, configure your `.env` file (copied from `.env.example`) to establish the required system variables:

```env
# Server-side secrets. Never exposed to browser.
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
NODE_ENV=production
```

> **Note**: If `GEMINI_API_KEY` is omitted, the system will automatically activate **Offline fallback heuristics**. It will continue performing accurate deterministic calculations, schedule optimizations, and mockup scenario simulations. Full contextualized AI dialogue and custom strategy creation will become active once the key is provided.

### Development Setup
To run DeadlineOS in a local development environment with hot-reload support:

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/dakshchaudhary/deadlineos.git
   cd deadlineos
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Dev Server**:
   ```bash
   npm run dev
   ```
   This boots the backend Express.js server and mounts the Vite middleware on [http://localhost:3000](http://localhost:3000).

### Production Build
To compile the client bundle and bundle the server script for local or bare-metal production:

1. **Build Client and Server Bundle**:
   ```bash
   npm run build
   ```
   This executes a multi-stage compilation:
   - Compiles Vite client assets into high-performance static files in `/dist`.
   - Bundles the complete backend TypeScript server into a self-contained, single-file `/dist/server.cjs` script using `esbuild`.

2. **Launch Production Server**:
   ```bash
   npm start
   ```
   This directly executes `node dist/server.cjs` on port `3000`.

---

## Deployment

### Docker Containerization
DeadlineOS is fully optimized to run in a stateless containerized runtime.

1. **Dockerfile Configuration**:
   Create a `Dockerfile` at the root of the project to package the compiled code:
   ```dockerfile
   FROM node:20-slim
   WORKDIR /app
   COPY package*.json ./
   RUN npm ci --only=production
   COPY dist/ ./dist/
   ENV PORT=3000
   ENV NODE_ENV=production
   EXPOSE 3000
   CMD ["node", "dist/server.cjs"]
   ```

2. **Build the Container Image**:
   ```bash
   docker build -t deadlineos:latest .
   ```

3. **Run the Container Locally**:
   ```bash
   docker run -p 3000:3000 --env GEMINI_API_KEY=your_key_here deadlineos:latest
   ```

### Google Cloud Run Deployment
DeadlineOS compiles into a single, light-weight, highly efficient production server, making it a perfect fit for **Google Cloud Run**.

#### Step 1: Authentication & Prerequisites
Ensure you have the Google Cloud SDK installed, initialized, and linked to a Google Cloud Platform (GCP) project with active billing:
```bash
# Log in to your Google Account
gcloud auth login

# Set active project
gcloud config set project YOUR_GCP_PROJECT_ID

# Enable required Google APIs
gcloud services enable run.googleapis.com \
                       cloudbuild.googleapis.com \
                       artifactregistry.googleapis.com
```

#### Step 2: Build Image via Google Cloud Build & Artifact Registry
Submit your source directory directly to Google Cloud Build. This securely compiles the codebase and pushes the final container image to Google Artifact Registry:
```bash
gcloud builds submit --tag gcr.io/YOUR_GCP_PROJECT_ID/deadlineos:latest
```

#### Step 3: Deploy to Google Cloud Run
Once the image is ready in Artifact Registry, deploy it to a managed Cloud Run instance. Cloud Run will host the server on a secure, public HTTPS URL and automatically scale down to zero when idle to conserve resources:
```bash
gcloud run deploy deadlineos \
  --image gcr.io/YOUR_GCP_PROJECT_ID/deadlineos:latest \
  --platform managed \
  --port 3000 \
  --allow-unauthenticated \
  --set-env-vars GEMINI_API_KEY=your_key_here,NODE_ENV=production
```

---

## REST API Overview

DeadlineOS exposes a series of highly functional REST endpoints, structured for fast integrations:

### 1. Task Operations
* **`GET /api/tasks`**: Returns all persistence-locked tasks. Filterable by `?role=<profile>`.
* **`POST /api/tasks`**: Create or update a task structure.
  * *Request Body*:
    ```json
    {
      "id": "optional-id-for-update",
      "title": "Database Schema Audit",
      "description": "Optimize indexes and constraints on PostgreSQL",
      "profile": "developer",
      "category": "Engineering Project",
      "dueDate": "2026-07-05",
      "estimatedEffort": 6,
      "urgency": "high"
    }
    ```

### 2. AI & Telemetry
* **`GET /api/ai/briefing`**: Synthesizes custom metrics and computes current focus areas.
  * *Query Parameters*: `?role=developer`
  * *Response*:
    ```json
    {
      "dateLabel": "Tuesday, June 30",
      "successReason": "Your Sprint velocity is highly stable. Committing 4 focus hours today safeguards the July 5th database release.",
      "strategicFocusArea": "Database Schema Audit",
      "totalTasks": 8,
      "pendingTasksCount": 3,
      "completedTasksCount": 5,
      "demandedEffort": 14,
      "overallRiskIndex": 24
    }
    ```

* **`POST /api/tasks/:id/recovery`**: Triggers immediate SLA mitigation protocols for a task.
  * *Response*:
    ```json
    {
      "mitigationPlan": "Deconstruct Database Schema Audit into 3 atomic steps: index assessment (2h), constraint review (2h), patch deployment (2h). Shift personal routine tasks back 24 hours.",
      "alternativeOptions": "1. Delegate personal training review. 2. Request 48h deadline extension based on high engineering complexity."
    }
    ```

* **`POST /api/ai/simulate`**: Executes What-If capacity forecasts.
  * *Request Body*:
    ```json
    {
      "taskId": "task-uuid-1234",
      "scenario": "reallocate"
    }
    ```

---

## AI Engine Architecture

DeadlineOS structures its intelligence pipeline into **Five Cognitive Engines**:

### 1. Analytics Engine
Calculates the numerical workspace telemetry. Computes:
* **Workload Ratio**: $\text{Demanded Effort Hours} / \text{Available Time}$.
* **Overdue Ratio**: The percentage of outstanding milestones currently behind schedule.
* **Risk Score**: Calculated as:
  $$\text{Risk} = \text{Complexity Weight} \times \left(1.0 - \frac{\text{Time Remaining}}{\text{Effort Required}}\right)$$

### 2. Decision Engine
Responsible for formulating strategic options. Instead of listing generic productivity tips, it analyzes actual effort, deadline conflicts, opportunity costs, and calculated trade-offs. It explains **WHY** recommendations are made, providing clear decisions rather than simple lists.

### 3. Planning Engine
Takes outstanding tasks and arranges them across a **24-hour temporal layout** or a **7-day weekly alignment**. It slots items based on priority class, remaining hours, and estimated difficulty density.

### 4. Recovery Engine
A reactive agent triggered when tasks are overdue or breach safety risk thresholds. It generates highly tactical mitigations: deconstructing work into modular chunks, suggesting explicit scope reduction, or calculating shift durations to guarantee that the primary milestone does not fail.

### 5. What-If Simulator
An interactive tool that lets you alter workspace conditions (e.g., reallocating +2 focus hours, shifting specific milestones by 3 days, or modeling a 30% reduction in scope) and immediately view recalculated risk topographies.

---

## Executive PDF Export

DeadlineOS includes an enterprise-grade high-fidelity PDF report compilation engine. Designed for interviews, productivity reviews, academic review boards, and portfolio demonstrations, the generator compiles several key strategic sections:

* **Executive Summary**: High-level diagnostic summary from your AI Chief of Staff.
* **AI Diagnostics**: Comprehensive telemetry breakdown including risk indices, focus categories, and bottleneck forecasts.
* **Recovery Timeline**: Step-by-step contingency timeline detailing recommended SLA recoveries and alternative options.
* **Task Appendix**: Full, transparent inventory of all tasks, complete with priority weights, remaining effort hours, and status indicators.
* **Risk Analysis Grids**: Beautifully formatted tables framing risk topographies and resource balances.
* **Professional Formatting**: Styled strictly using high-contrast corporate palettes, custom typography margins, and clear structural headers.
* **Executive Footer**: Includes generation timestamps and metadata signatures to verify the report's diagnostic integrity.

---

## Future Roadmap

### Phase 1: Current Release (v1.0.0-RC1)
* Fully functional high-contrast workspace context engines.
* Real-time local database synchronization.
* Proactive executive briefing compiler.
* "What-If" scenario simulator with automated local offline fallbacks.
* Multi-format PDF Executive Report compilation.

### Phase 2: Q3 2026
* **Multi-agent Collaboration**: Linking multiple individual DeadlineOS engines together to model team-wide sprint slippage and cross-resource capacity conflicts.
* **External Integrations**: Native background sync agents for Jira Cloud, GitHub Projects, Canvas LMS, and Google Calendar.
* **Live API Feed**: Real-time websocket streaming of live telemetry.

### Phase 3: Long-term Vision
* **Continuous Ambient Planning**: A zero-input ambient scheduling engine that infers daily capacity and fatigue levels via continuous telemetry, modifying execution risk indicators fully in the background.

---

## Contributing

We welcome professional, architecture-respecting contributions.

1. **Fork the repository** on GitHub.
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/amazing-capability
   ```
3. **Commit your changes** following strict semantic commit guidelines:
   ```bash
   git commit -m "feat: implement real-time team slack reporting adapter"
   ```
4. **Push your branch**:
   ```bash
   git push origin feature/amazing-capability
   ```
5. **Open a Pull Request** describing your exact design decisions, trade-offs evaluated, and schema impacts.

---

## License

Distributed under the **MIT License**. See `LICENSE` for details.

---

## Executive Contact & Author

* **Strategic Architect**: Daksh Chaudhary
* **Project Repository**: [https://github.com/dakshchaudhary/deadlineos](https://github.com/dakshchaudhary/deadlineos)
* **Chief of Staff Core**: Powered by Google Gemini
