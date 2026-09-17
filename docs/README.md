# KaushalAI (कौशलAI)
### AI-Enabled Skill Intelligence & Karmayogi Learning Recommendation Platform for India's Official Statistical System

> **Developed for Techathon / Hackathon Demonstration**  
> Tailored for **Ministry of Statistics and Programme Implementation (MoSPI)**, **National Sample Survey Office (NSSO)**, **Central Statistics Office (CSO)**, and **State Directorates of Economics & Statistics (DES)**.

---

## 🏛️ System Architecture

```
 ┌─────────────────────────────────────────────────────────────────────────────────┐
 │                      KaushalAI Frontend (React + TypeScript + Vite)             │
 │  ┌────────────────────────┐ ┌─────────────────────────┐ ┌─────────────────────┐ │
 │  │ Mock SSO Role Switcher │ │ Animated Competency DNA │ │ AI Explainability   │ │
 │  │ Learner/Trainer/Admin  │ │ Radial / Hex Graphic    │ │ Recommendation Feed │ │
 │  └────────────────────────┘ └─────────────────────────┘ └─────────────────────┘ │
 │  ┌────────────────────────┐ ┌─────────────────────────┐ ┌─────────────────────┐ │
 │  │ Instant AI Quiz        │ │ Predictive Skill Radar  │ │ Karmayogi AI        │ │
 │  │ Document Scanner & Play│ │ Workforce Weather       │ │ Sahayak (Copilot)   │ │
 │  └────────────────────────┘ └─────────────────────────┘ └─────────────────────┘ │
 └────────────────────────────────────────┬────────────────────────────────────────┘
                                          │ REST API / JSON
 ┌────────────────────────────────────────▼────────────────────────────────────────┐
 │                      KaushalAI Backend Server (Node.js + Express)               │
 │  ┌────────────────────────┐ ┌─────────────────────────┐ ┌─────────────────────┐ │
 │  │ Official Cadre Store   │ │ iGOT Course Catalogue   │ │ LLM Service &       │ │
 │  │ (ISS / SSS Profiles)   │ │ (NSSTA, ISI, IIPS, CBC) │ │ Bloom's Generator   │ │
 │  └────────────────────────┘ └─────────────────────────┘ └─────────────────────┘ │
 │  ┌────────────────────────┐ ┌─────────────────────────┐ ┌─────────────────────┐ │
 │  │ Document Parser        │ │ Skill Gap Matcher &     │ │ Predictive Cadre    │ │
 │  │ (PDF/PPT/DOCX)         │ │ Reasoning Chains        │ │ Deficit Engine      │ │
 │  └────────────────────────┘ └─────────────────────────┘ └─────────────────────┘ │
 └─────────────────────────────────────────────────────────────────────────────────┘
```

---

## ⚡ Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Lucide React Icons, Framer Motion, Recharts, Canvas Confetti.
- **Design System**: GovTech Modernization Aesthetic — Midnight Dark (`#070A13`), Vibrant Cyan (`#06B6D4`), Emerald Green (`#10B981`), Imperial Amber (`#F59E0B`), and Royal Saffron (`#FF9933`).
- **Backend**: Node.js, Express, TypeScript/ESM, Multer (multipart upload), PDF Parser.
- **AI / LLM Engine**: Multi-stage semantic chunking, Bloom's Taxonomy question synthesis, Cadre gap explainability reasoner, and context-aware conversational copilot.

---

## 🚀 Quick Setup & Run Guide

### 1. Prerequisites
- Node.js (v18+ recommended)
- npm (v9+)

### 2. Start Backend Server
```bash
cd backend
npm install
npm run dev
# Server running at http://localhost:5000
```

### 3. Start Frontend Client
```bash
cd frontend
npm install
npm run dev
# Frontend running at http://localhost:3000
```

Open your browser at **`http://localhost:3000`** to view the platform!

---

## 🧬 Key Differentiators Built for Demo

1. **Animated "Competency DNA" Visualizer**:
   - Circular multi-tier chromosome rings visualizing 4 domains: *Statistical & Methodological*, *Technical & Data Engineering*, *Digital Governance & DPDPA*, *Behavioural & Leadership*.
   - Dynamic fill animation that levels up in real-time when courses or quizzes are completed.

2. **AI Explainability Reasoning Chains**:
   - Every course recommendation shows explicit reasoning cards detailing the **Cadre Gap Identified**, **Ministry Alignment**, and **Projected Competency Gain**.
   - Interactive **"Simulate Course Completion"** button triggering instant DNA growth and confetti celebration.

3. **Instant Document-to-Quiz Generator (The Showstopper)**:
   - Upload any official MoSPI survey manual or pick preloaded guidelines (e.g. *NSSO 79th Round Sampling Design Manual*).
   - High-tech 4-stage AI document scanner animation.
   - Interactive quiz runner with instant scoring, pedagogical explanations, and automated Competency DNA boost.

4. **Admin Predictive Skill Radar ("Workforce Weather Forecast")**:
   - Forward-looking 6-12 month horizon warning MoSPI leadership of impending skill deficits across statistical divisions.
   - Categorized as **Sunny (Optimal)**, **Cloudy (Moderate Risk)**, and **Stormy (Critical Shortage)** with actionable intervention recommendations.

5. **Conversational AI Copilot ("Karmayogi AI Sahayak")**:
   - Persistent assistant floating in bottom right with prompt chips and deep-linked course actions.

6. **Bilingual & Role Switcher (Mock SSO)**:
   - Instant English / Hindi (हिन्दी) localization toggle.
   - Seamless role switching between **Learner** (Dr. Priya Sharma, Deputy Director), **Trainer** (Prof. Venkatraman, NSSTA), and **Admin** (Joint Secretary Amitabh Verma, IAS).
