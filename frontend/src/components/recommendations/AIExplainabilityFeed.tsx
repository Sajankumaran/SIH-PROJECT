import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExplainableRecommendation } from '../../types/index';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useLearning } from '../../context/LearningContext';
import { 
  Sparkles, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  Star, 
  TrendingUp, 
  CheckCircle2, 
  ExternalLink, 
  Zap, 
  Target, 
  ShieldCheck, 
  Building 
} from 'lucide-react';

export const AIExplainabilityFeed: React.FC = () => {
  const { currentOfficial } = useAuth();
  const { language, t } = useLanguage();
  const { simulateCourseCompletion, completedCourseIds } = useLearning();

  const [recommendations, setRecommendations] = useState<ExplainableRecommendation[]>([]);
  const [selectedDomainFilter, setSelectedDomainFilter] = useState<string>('all');
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null);
  const [isSimulatingId, setIsSimulatingId] = useState<string | null>(null);

  useEffect(() => {
    fetch(`/api/courses/recommendations/${currentOfficial.id}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.success && Array.isArray(data.data)) {
          setRecommendations(data.data);
          if (data.data.length > 0) {
            setExpandedCourseId(data.data[0].course.id);
          }
        }
      })
      .catch(() => {});
  }, [currentOfficial]);

  const toggleExpand = (courseId: string) => {
    setExpandedCourseId(expandedCourseId === courseId ? null : courseId);
  };

  const handleSimulate = async (rec: ExplainableRecommendation) => {
    setIsSimulatingId(rec.course.id);
    await simulateCourseCompletion(
      rec.course.id,
      rec.course.competencyDelta.gainPoints,
      rec.course.competencyDelta.domainId,
      rec.course.title
    );
    setIsSimulatingId(null);
  };

  const filteredRecs = recommendations.filter(rec => {
    if (selectedDomainFilter === 'all') return true;
    return rec.course.domainId === selectedDomainFilter;
  });

  return (
    <div className="space-y-4">
      
      {/* Header and Domain Filter Pills */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-white/10 pb-3">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
            {t('recommendedTitle')}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Powered by MoSPI Skill Ontology & Karmayogi AI Matching
          </p>
        </div>

        {/* Domain Filter Buttons */}
        <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 text-xs">
          <button
            onClick={() => setSelectedDomainFilter('all')}
            className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
              selectedDomainFilter === 'all'
                ? 'bg-cyan-600 dark:bg-cyan-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            All Domains
          </button>
          <button
            onClick={() => setSelectedDomainFilter('statistical')}
            className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
              selectedDomainFilter === 'statistical'
                ? 'bg-cyan-600 dark:bg-cyan-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Statistical
          </button>
          <button
            onClick={() => setSelectedDomainFilter('technical')}
            className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
              selectedDomainFilter === 'technical'
                ? 'bg-blue-600 dark:bg-blue-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Technical
          </button>
          <button
            onClick={() => setSelectedDomainFilter('governance')}
            className={`rounded-lg px-2.5 py-1 font-semibold transition-all ${
              selectedDomainFilter === 'governance'
                ? 'bg-emerald-600 dark:bg-emerald-500 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Governance & DPDP
          </button>
        </div>
      </div>

      {/* Recommendations Feed List */}
      <div className="space-y-3.5">
        {filteredRecs.map(rec => {
          const isExpanded = expandedCourseId === rec.course.id;
          const isCompleted = completedCourseIds.includes(rec.course.id);
          const isSimulating = isSimulatingId === rec.course.id;

          return (
            <motion.div
              key={rec.course.id}
              layout
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isExpanded 
                  ? 'border-cyan-500/40 bg-white dark:bg-slate-900/90 shadow-xl shadow-cyan-500/5' 
                  : 'border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-950/70 hover:border-slate-300 dark:hover:border-white/20 shadow-sm'
              }`}
            >
              {/* Card Header Row */}
              <div className="p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  
                  {/* Left: Course Thumbnail + Meta */}
                  <div className="flex items-start gap-4">
                    <img
                      src={rec.course.thumbnail}
                      alt={rec.course.title}
                      className="h-16 w-20 sm:h-20 sm:w-28 rounded-xl object-cover ring-1 ring-slate-200 dark:ring-white/10 shrink-0"
                    />

                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-white/10 text-cyan-700 dark:text-cyan-300 border border-slate-200 dark:border-white/10">
                          {rec.course.igotCourseId}
                        </span>

                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          rec.urgency === 'Immediate Priority'
                            ? 'bg-red-500/10 dark:bg-red-500/20 text-red-700 dark:text-red-300 border border-red-500/30 dark:border-red-500/40'
                            : rec.urgency === 'Recommended'
                            ? 'bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30 dark:border-cyan-500/40'
                            : 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 dark:border-amber-500/40'
                        }`}>
                          {rec.urgency}
                        </span>

                        <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
                          <Building className="h-3 w-3 text-slate-400" />
                          {rec.course.provider}
                        </span>
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                        {language === 'hi' ? rec.course.titleHi : rec.course.title}
                      </h3>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400 pt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3.5 w-3.5 text-slate-400" />
                          {rec.course.durationHours} hrs
                        </span>
                        <span className="flex items-center gap-1 text-amber-500 dark:text-amber-400">
                          <Star className="h-3.5 w-3.5 fill-amber-500 dark:fill-amber-400" />
                          {rec.course.rating}
                        </span>
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold font-mono">
                          +{rec.course.competencyDelta.gainPoints}% {rec.course.competencyDelta.domainId.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right: AI Match Score & Action Buttons */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100 dark:border-white/5 shrink-0">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-medium">AI Match Score</span>
                      <span className="text-lg font-black text-cyan-600 dark:text-cyan-400 font-mono">
                        {rec.matchScore}%
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleExpand(rec.course.id)}
                        className="flex items-center gap-1 rounded-lg border border-cyan-500/30 bg-cyan-500/10 px-2.5 py-1.5 text-xs font-bold text-cyan-700 dark:text-cyan-300 hover:bg-cyan-500/20 transition-colors"
                      >
                        <Zap className="h-3.5 w-3.5" />
                        <span className="hidden sm:inline">Why Recommended</span>
                        {isExpanded ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                      </button>
                    </div>

                  </div>

                </div>
              </div>

              {/* EXPANDABLE AI EXPLAINABILITY PANEL */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-slate-200 dark:border-white/10 bg-slate-50/90 dark:bg-slate-950/90 p-4 sm:p-5 space-y-4"
                  >
                    
                    {/* Explainability Reasoning Banner */}
                    <div className="rounded-xl border border-cyan-500/30 bg-cyan-50/60 dark:bg-gradient-to-r dark:from-cyan-950/40 dark:to-blue-950/30 p-4 shadow-sm">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                        <h4 className="text-xs font-extrabold uppercase tracking-wider text-cyan-800 dark:text-cyan-300">
                          {t('whyRecommended')}
                        </h4>
                      </div>

                      {/* Step-by-step Reasoning Chain */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                        
                        <div className="rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/5 p-3 space-y-1 shadow-sm">
                          <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1">
                            <Target className="h-3 w-3" /> 1. Cadre Gap Identified
                          </span>
                          <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                            {language === 'hi' ? rec.reasoningChain.gapIdentifiedHi : rec.reasoningChain.gapIdentified}
                          </p>
                        </div>

                        <div className="rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/5 p-3 space-y-1 shadow-sm">
                          <span className="text-[10px] font-bold text-cyan-700 dark:text-cyan-400 uppercase tracking-wider flex items-center gap-1">
                            <ShieldCheck className="h-3 w-3" /> 2. Ministry Alignment
                          </span>
                          <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                            {language === 'hi' ? rec.reasoningChain.missionContextHi : rec.reasoningChain.missionContext}
                          </p>
                        </div>

                        <div className="rounded-lg bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/5 p-3 space-y-1 shadow-sm">
                          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider flex items-center gap-1">
                            <TrendingUp className="h-3 w-3" /> 3. Predicted Impact
                          </span>
                          <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                            {language === 'hi' ? rec.reasoningChain.projectedOutcomeHi : rec.reasoningChain.projectedOutcome}
                          </p>
                        </div>

                      </div>

                    </div>

                    {/* Course Syllabus Overview & Target Skills */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">
                          Key Competencies Addressed:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {rec.course.targetCompetencies.map((tc, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-cyan-900 dark:text-cyan-200 border border-slate-300 dark:border-white/10"
                            >
                              ✓ {tc}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Interactive Simulate Completion CTA */}
                      <div className="flex items-center gap-2">
                        {isCompleted ? (
                          <div className="flex items-center gap-1.5 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 dark:border-emerald-500/40 px-4 py-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">
                            <CheckCircle2 className="h-4 w-4" />
                            {t('completedBadge')} (+{rec.course.competencyDelta.gainPoints}% DNA)
                          </div>
                        ) : (
                          <button
                            onClick={() => handleSimulate(rec)}
                            disabled={isSimulating}
                            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950 px-4 py-2 text-xs font-extrabold shadow-lg shadow-amber-500/20 transition-all active:scale-95 disabled:opacity-50"
                          >
                            <Zap className="h-4 w-4 fill-slate-950 animate-bounce" />
                            <span>{isSimulating ? 'Simulating...' : t('simulateCompletion')}</span>
                          </button>
                        )}

                        <a
                          href="https://igotkarmayogi.gov.in"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-slate-800 px-3 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors shadow-sm"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          <span className="hidden sm:inline">iGOT Portal</span>
                        </a>
                      </div>

                    </div>

                  </motion.div>
                )}
              </AnimatePresence>

            </motion.div>
          );
        })}
      </div>

    </div>
  );
};
