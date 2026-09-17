# KaushalAI (कौशलAI)
### AI-Enabled Skill Intelligence and Learning Platform for India's Official Statistical System

A demo-ready, full-stack GovTech SaaS platform built for **Ministry of Statistics and Programme Implementation (MoSPI)**, **National Sample Survey Office (NSSO)**, **Central Statistics Office (CSO)**, and **State Directorates of Economics & Statistics (DES)** to power competency-based personalized learning recommendations on **iGOT Karmayogi**.

---

## 🌟 Quick Start

### 1. Run the Backend API Server (Port 5000)
```bash
cd backend
npm install
npm run dev
```

### 2. Run the Frontend Client (Port 3000)
```bash
cd frontend
npm install
npm run dev
```

Open **`http://localhost:3000`** in your browser.

---

## 📁 Repository Structure

- **`/frontend`**: React + TypeScript + Vite + Tailwind CSS + Framer Motion + Recharts
  - `/src/components/dna`: Animated **Competency DNA** Radial / Hex Visualizer
  - `/src/components/recommendations`: **AI Explainability Panel** with reasoning chains
  - `/src/components/quiz`: Instant **Document-to-Quiz Generator** with live AI scanner & player
  - `/src/components/admin`: **Predictive Skill Shortage Radar ("Workforce Weather Forecast")**
  - `/src/components/trainer`: NSSTA Faculty cohort dispatcher
  - `/src/components/copilot`: Floating **Karmayogi AI Sahayak** assistant
- **`/backend`**: Node.js + Express API Server with realistic MoSPI / NSSO seed data, document parsers, and LLM reasoning engines.
- **`/docs`**:
  - `README.md`: In-depth Architecture & API reference
  - `DEMO_SCRIPT.md`: Step-by-step 4-minute presentation script for hackathon judges

---

## 🏆 Key Demo Differentiators

1. **Competency DNA Visualization**: Animated radial multi-tier chromosome graphic that grows as officials complete learning modules.
2. **AI Explainability Panel**: Explicit reasoning chains on every iGOT recommendation (*Cadre Gap Identified → Mission Alignment → Predicted Impact*).
3. **Instant Quiz Generator**: 4-stage visual AI scanner that generates Bloom's taxonomy MCQs from MoSPI manuals with interactive quiz taking, instant scoring, and live DNA score boosts.
4. **Predictive Workforce Weather Radar (Admin)**: 6-12 month forward forecasting of statistical capability deficits (Sunny, Cloudy, Stormy).
5. **Karmayogi AI Sahayak**: Context-aware floating assistant with 1-click course actions.
6. **Bilingual (English / हिन्दी)** and **Role Switcher (Mock SSO)** for Learner, Trainer, and Admin personas.
