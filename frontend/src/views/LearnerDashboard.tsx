import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useLearning } from '../context/LearningContext';
import { CompetencyDNA } from '../components/dna/CompetencyDNA';
import { AIExplainabilityFeed } from '../components/recommendations/AIExplainabilityFeed';
import { 
  Flame, 
  Clock, 
  Award, 
  FileText, 
  ShieldCheck 
} from 'lucide-react';

export const LearnerDashboard: React.FC = () => {
  const { currentOfficial } = useAuth();
  const { language } = useLanguage();
  const { openQuizModal } = useLearning();

  return (
    <div className="space-y-6">
      
      {/* ================= TOP OFFICIAL PROFILE & REPUTATION BANNER ================= */}
      <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-950/80 p-5 sm:p-6 backdrop-blur-xl shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors">
        
        {/* Background gradient flare */}
        <div className="absolute top-0 right-0 h-48 w-48 bg-cyan-500/10 blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          
          {/* Left: Avatar & Cadre Info */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="relative">
              <img
                src={currentOfficial.avatarUrl}
                alt={currentOfficial.name}
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover ring-2 ring-cyan-500/40 shadow-lg shadow-cyan-500/20"
              />
              <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-cyan-500 text-slate-950 shadow">
                <ShieldCheck className="h-3.5 w-3.5" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white">
                  {language === 'hi' ? currentOfficial.nameHi : currentOfficial.name}
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-semibold border border-cyan-500/30 dark:border-cyan-500/40">
                  STUDENT
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 pt-0.5">
                <span className="font-mono text-slate-400">
                  ID: {currentOfficial.karmayogiId}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Key Stats Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 shrink-0">
            
            <div className="rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 p-2.5 text-center shadow-sm">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold flex items-center justify-center gap-1">
                <Clock className="h-3 w-3 text-cyan-600 dark:text-cyan-400" />
                Learning Hours
              </span>
              <div className="text-base font-black text-slate-900 dark:text-white font-mono mt-0.5">
                {currentOfficial.learningHoursCompleted} hrs
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 p-2.5 text-center shadow-sm">
              <span className="text-[10px] text-amber-600 dark:text-amber-400 uppercase font-semibold flex items-center justify-center gap-1">
                <Flame className="h-3 w-3 fill-amber-500 dark:fill-amber-400" />
                Streak
              </span>
              <div className="text-base font-black text-amber-600 dark:text-amber-300 font-mono mt-0.5">
                {currentOfficial.learningStreakDays} Days
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 p-2.5 text-center shadow-sm">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold flex items-center justify-center gap-1">
                <Award className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                Courses Done
              </span>
              <div className="text-base font-black text-emerald-600 dark:text-emerald-300 font-mono mt-0.5">
                {currentOfficial.coursesCompletedCount}
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 p-2.5 text-center shadow-sm">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold flex items-center justify-center gap-1">
                <FileText className="h-3 w-3 text-purple-600 dark:text-purple-400" />
                Quizzes
              </span>
              <div className="text-base font-black text-purple-600 dark:text-purple-300 font-mono mt-0.5">
                {currentOfficial.quizzesAttemptedCount}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ================= MAIN 2-COLUMN SECTION ================= */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        
        {/* LEFT COL: COMPETENCY DNA VISUALIZER & GAP ANALYZER */}
        <div className="xl:col-span-6 space-y-6">
          <CompetencyDNA
            competencies={currentOfficial.competencies}
            cadreTitle={currentOfficial.designation + ' Benchmark'}
          />

          {/* Quick Assessment Callout */}
          <div className="rounded-2xl border border-amber-500/30 bg-amber-50/50 dark:bg-gradient-to-r dark:from-amber-950/30 dark:to-orange-950/20 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <FileText className="h-5 w-5 animate-pulse" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Prepare for NSSO 80th Round Sampling Certification
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Upload latest field manual or test sample questions to boost your Statistical DNA score.
                </p>
              </div>
            </div>

            <button
              onClick={() => openQuizModal('doc-nsso-79')}
              className="rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-4 py-2 text-xs shadow-lg shadow-amber-500/20 transition-all shrink-0 active:scale-95"
            >
              Take Practice Quiz
            </button>
          </div>
        </div>

        {/* RIGHT COL: AI EXPLAINABILITY COURSE RECOMMENDATIONS */}
        <div className="xl:col-span-6">
          <AIExplainabilityFeed />
        </div>

      </div>

    </div>
  );
};
