import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useLearning } from '../context/LearningContext';
import { 
  Sparkles, 
  Activity, 
  FileText, 
  Sun, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  GraduationCap, 
  UserCheck
} from 'lucide-react';

interface LandingViewProps {
  onNavigate: (view: string) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onNavigate }) => {
  const { switchRole } = useAuth();
  const { t } = useLanguage();
  const { openQuizModal } = useLearning();

  const handleRoleSelect = (role: 'student' | 'learner' | 'trainer' | 'admin') => {
    switchRole(role);
    onNavigate(role);
  };

  return (
    <div className="space-y-16 pb-16">
      
      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-8 pb-12 overflow-hidden text-center">
        
        {/* Background ambient lighting */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-500/15 via-blue-600/10 to-amber-500/10 blur-[120px] pointer-events-none" />

        <div className="relative mx-auto max-w-4xl space-y-6">
          
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 dark:bg-cyan-950/40 px-4 py-1.5 text-xs font-semibold text-cyan-700 dark:text-cyan-300 backdrop-blur-md shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-cyan-500 dark:text-cyan-400 animate-pulse" />
            <span>Official Statistical System • Mission Karmayogi AI Engine</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white leading-tight"
          >
            Skill Intelligence & Learning for India’s{' '}
            <span className="bg-gradient-to-r from-cyan-600 via-teal-600 to-amber-500 dark:from-cyan-400 dark:via-teal-300 dark:to-amber-400 bg-clip-text text-transparent">
              Official Statistical System
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto max-w-2xl text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed"
          >
            Empowering students, researchers, and officers across <strong>MoSPI, NSSO, CSO, and State Statistical Departments</strong> with 
            animated <strong>Competency DNA</strong> mapping, interactive <strong>Virtual Statistical Labs</strong>, explainable <strong>iGOT Karmayogi</strong> pathways, 
            and instant <strong>Document-to-Quiz AI generation</strong>.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-3 pt-2"
          >
            <button
              onClick={() => handleRoleSelect('student')}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold px-6 py-3 text-xs sm:text-sm shadow-xl shadow-cyan-500/25 transition-all active:scale-95"
            >
              <GraduationCap className="h-4 w-4" />
              <span>Enter Student & Aspirant Portal</span>
              <ArrowRight className="h-4 w-4" />
            </button>

            <button
              onClick={() => handleRoleSelect('learner')}
              className="flex items-center gap-2 rounded-xl border border-slate-300 dark:border-white/20 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-900 dark:text-white font-bold px-5 py-3 text-xs sm:text-sm transition-all"
            >
              <UserCheck className="h-4 w-4 text-blue-500" />
              <span>ISS In-Service Official</span>
            </button>

            <button
              onClick={() => openQuizModal()}
              className="flex items-center gap-2 rounded-xl border border-amber-500/40 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 font-extrabold px-5 py-3 text-xs sm:text-sm transition-all"
            >
              <FileText className="h-4 w-4 text-amber-500 dark:text-amber-400" />
              <span>Try Instant AI Quiz Generator</span>
            </button>
          </motion.div>

        </div>

      </section>

      {/* ================= LIVE METRICS BAR ================= */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-950/70 p-5 text-center backdrop-blur-xl shadow-sm">
          <div className="text-2xl sm:text-3xl font-black text-cyan-600 dark:text-cyan-400 font-mono">42,350+</div>
          <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold mt-1">Learners & Students Mapped</p>
          <span className="text-[10px] text-slate-500">MoSPI, NSSO, ISI & Universities</span>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-950/70 p-5 text-center backdrop-blur-xl shadow-sm">
          <div className="text-2xl sm:text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono">148</div>
          <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold mt-1">Competencies Indexed</p>
          <span className="text-[10px] text-slate-500">Cadre Benchmarked by NSSTA</span>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-950/70 p-5 text-center backdrop-blur-xl shadow-sm">
          <div className="text-2xl sm:text-3xl font-black text-amber-600 dark:text-amber-400 font-mono">350+</div>
          <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold mt-1">iGOT Karmayogi Courses</p>
          <span className="text-[10px] text-slate-500">NSSTA, ISI, IIPS & LBSNAA</span>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-950/70 p-5 text-center backdrop-blur-xl shadow-sm">
          <div className="text-2xl sm:text-3xl font-black text-purple-600 dark:text-purple-400 font-mono">92%</div>
          <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold mt-1">Skill Gap Reduction</p>
          <span className="text-[10px] text-slate-500">Predictive Workforce Alignment</span>
        </div>
      </section>

      {/* ================= ROLE SELECTOR EXPERIENCES (MOCK SSO) ================= */}
      <section className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            Experience KaushalAI by Role
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Select a persona to test the targeted features built for students, in-service officers, trainers, and leadership
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Student Card */}
          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => handleRoleSelect('student')}
            className="rounded-2xl border border-cyan-500/40 bg-white dark:bg-slate-950/80 p-6 space-y-4 cursor-pointer hover:border-cyan-500 transition-all shadow-xl shadow-cyan-500/5 group"
          >
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center font-bold">
                <GraduationCap className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 dark:border-cyan-500/40">
                Student / Aspirant
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-300 transition-colors">
                Aarav Sharma
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Student Fellow • ISI Kolkata / Delhi University
              </p>
            </div>

            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-500 shrink-0" />
                Virtual Statistical Lab & Calculators
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-500 shrink-0" />
                Timed Mock Exams & Official Certificates
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-cyan-500 shrink-0" />
                AI Career Roadmap (UPSC ISS / MoSPI)
              </li>
            </ul>

            <div className="pt-2 flex items-center justify-between text-xs font-bold text-cyan-600 dark:text-cyan-400">
              <span>Launch Student Portal</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Official Learner Card */}
          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => handleRoleSelect('learner')}
            className="rounded-2xl border border-blue-500/30 bg-white dark:bg-slate-950/80 p-6 space-y-4 cursor-pointer hover:border-blue-500/60 transition-all shadow-xl shadow-blue-500/5 group"
          >
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                <UserCheck className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500/10 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 border border-blue-500/30">
                Official Learner
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                Dr. Priya Sharma
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Deputy Director • SDRD, NSSO Kolkata
              </p>
            </div>

            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                Animated Competency DNA Graphic
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                AI Explainability Reasoning Chains
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                1-Click Course Completion Sync
              </li>
            </ul>

            <div className="pt-2 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-blue-400">
              <span>Launch Officer View</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Trainer Card */}
          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => handleRoleSelect('trainer')}
            className="rounded-2xl border border-amber-500/30 bg-white dark:bg-slate-950/80 p-6 space-y-4 cursor-pointer hover:border-amber-500/60 transition-all shadow-xl shadow-amber-500/5 group"
          >
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                <Sparkles className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 dark:border-amber-500/40">
                NSSTA Faculty
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">
                Prof. R. Venkatraman
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Lead Trainer • NSSTA Greater Noida
              </p>
            </div>

            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                Document-to-Quiz AI Generation
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                Cadre Cohort Dispatcher
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-amber-500 shrink-0" />
                Batch Compliance Analytics
              </li>
            </ul>

            <div className="pt-2 flex items-center justify-between text-xs font-bold text-amber-600 dark:text-amber-400">
              <span>Launch Trainer Studio</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

          {/* Admin Card */}
          <motion.div
            whileHover={{ y: -4 }}
            onClick={() => handleRoleSelect('admin')}
            className="rounded-2xl border border-emerald-500/30 bg-white dark:bg-slate-950/80 p-6 space-y-4 cursor-pointer hover:border-emerald-500/60 transition-all shadow-xl shadow-emerald-500/5 group"
          >
            <div className="flex items-center justify-between">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                <Building2 className="h-5 w-5" />
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 dark:border-emerald-500/40">
                MoSPI Leadership
              </span>
            </div>

            <div className="space-y-1">
              <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-300 transition-colors">
                Amitabh Verma, IAS
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Joint Secretary • MoSPI HQ
              </p>
            </div>

            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                Workforce Weather Predictive Radar
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                State Competency Heatmaps
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                Cadre Readiness & Training ROI
              </li>
            </ul>

            <div className="pt-2 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
              <span>Launch MoSPI Apex</span>
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </motion.div>

        </div>
      </section>

      {/* ================= KEY DIFFERENTIATORS SHOWCASE ================= */}
      <section className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            What Makes KaushalAI Unique
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Solving the core pain points of government capacity building with explainable AI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 p-4 space-y-2 shadow-sm">
            <div className="h-8 w-8 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
              <Activity className="h-4 w-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Competency DNA</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Replaces boring tables with an interactive radial graphic that visibly fills as officers complete courses.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 p-4 space-y-2 shadow-sm">
            <div className="h-8 w-8 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Sparkles className="h-4 w-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">AI Explainability</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Every course recommendation includes transparent reasoning chains showing exact gap metrics and mission alignment.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 p-4 space-y-2 shadow-sm">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <FileText className="h-4 w-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Instant Quiz Scanner</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Upload any official manual and generate Bloom's taxonomy tiered MCQs with live scanning animations.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 p-4 space-y-2 shadow-sm">
            <div className="h-8 w-8 rounded-lg bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <Sun className="h-4 w-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">Workforce Weather</h4>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Forward-looking predictive radar warning MoSPI leadership of critical statistical skill shortages 6-12 months out.
            </p>
          </div>

        </div>
      </section>

    </div>
  );
};
