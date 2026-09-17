import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DomainCompetency, MicroCompetency } from '../../types/index';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Activity, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  Sparkles, 
  ShieldAlert, 
  Layers 
} from 'lucide-react';

interface CompetencyDNAProps {
  competencies: DomainCompetency[];
  cadreTitle: string;
  onOpenSkillDetails?: (skill: MicroCompetency) => void;
}

export const CompetencyDNA: React.FC<CompetencyDNAProps> = ({ 
  competencies, 
  cadreTitle,
  onOpenSkillDetails 
}) => {
  const { language, t } = useLanguage();
  const [selectedDomainId, setSelectedDomainId] = useState<string>('statistical');

  // Compute average overall score
  const avgScore = Math.round(
    competencies.reduce((acc, curr) => acc + curr.overallScore, 0) / Math.max(1, competencies.length)
  );

  const avgBenchmark = Math.round(
    competencies.reduce((acc, curr) => acc + curr.cadreBenchmark, 0) / Math.max(1, competencies.length)
  );

  const selectedDomain = competencies.find(c => c.domainId === selectedDomainId) || competencies[0];

  // SVG Geometry for Radial DNA rings
  const size = 340;
  const center = size / 2;
  const radiusList = [60, 85, 110, 135]; // 4 rings for the 4 domains

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-950/80 p-6 backdrop-blur-xl shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors">
      
      {/* Background glow accents */}
      <div className="absolute -top-20 -left-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      {/* Header with Title & Cadre Tag */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 dark:border-white/10 pb-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-600 dark:text-cyan-400">
              <Activity className="h-4 w-4 animate-pulse" />
            </span>
            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
              {t('competencyDnaTitle')}
              <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 font-mono font-normal border border-cyan-500/30">
                v2.4 Live
              </span>
            </h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t('competencyDnaSubtitle')} • <span className="text-amber-600 dark:text-amber-300 font-semibold">{cadreTitle}</span>
          </p>
        </div>

        {/* Global DNA Readiness Indicator */}
        <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 rounded-xl px-3.5 py-2 shadow-sm">
          <div className="text-right">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider block">Cadre Readiness</span>
            <div className="text-base font-extrabold text-cyan-600 dark:text-cyan-300 font-mono">
              {avgScore}% <span className="text-xs text-slate-400 dark:text-slate-500 font-normal">/ {avgBenchmark}% target</span>
            </div>
          </div>
          <div className="h-9 w-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-cyan-600 dark:text-cyan-400 animate-pulse-slow" />
          </div>
        </div>
      </div>

      {/* Main Grid: Radial DNA Graphic (Left) & Domain Skill Breakdown (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        
        {/* LEFT: Animated Circular Competency DNA Graphic */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
          
          <div className="relative w-[340px] h-[340px] flex items-center justify-center">
            
            <svg width={size} height={size} className="transform -rotate-90">
              <defs>
                <linearGradient id="grad-statistical" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06B6D4" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
                <linearGradient id="grad-technical" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#8B5CF6" />
                </linearGradient>
                <linearGradient id="grad-governance" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
                <linearGradient id="grad-behavioural" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#EF4444" />
                </linearGradient>
              </defs>

              {/* Concentric Guide Grid */}
              {radiusList.map((r, idx) => (
                <circle
                  key={'guide-' + idx}
                  cx={center}
                  cy={center}
                  r={r}
                  fill="none"
                  stroke="currentColor"
                  className="text-slate-200 dark:text-white/5"
                  strokeWidth="10"
                />
              ))}

              {/* Cadre Benchmark Ring Dotted Guides */}
              {competencies.map((comp, idx) => {
                const r = radiusList[idx];
                const circumference = 2 * Math.PI * r;
                const benchmarkLength = (comp.cadreBenchmark / 100) * circumference;
                return (
                  <circle
                    key={'bench-' + comp.domainId}
                    cx={center}
                    cy={center}
                    r={r}
                    fill="none"
                    stroke="#F59E0B"
                    strokeWidth="1.5"
                    strokeDasharray="3 4"
                    opacity="0.5"
                    strokeDashoffset={circumference - benchmarkLength}
                  />
                );
              })}

              {/* Active Animated Competency DNA Arc Bands */}
              {competencies.map((comp, idx) => {
                const r = radiusList[idx];
                const circumference = 2 * Math.PI * r;
                const strokeLength = (comp.overallScore / 100) * circumference;
                const isSelected = selectedDomainId === comp.domainId;

                return (
                  <motion.circle
                    key={'arc-' + comp.domainId}
                    cx={center}
                    cy={center}
                    r={r}
                    fill="none"
                    stroke={`url(#grad-${comp.domainId})`}
                    strokeWidth={isSelected ? '12' : '8'}
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    initial={{ strokeDashoffset: circumference }}
                    animate={{ strokeDashoffset: circumference - strokeLength }}
                    transition={{ duration: 1.4, ease: 'easeOut', delay: idx * 0.15 }}
                    className="cursor-pointer transition-all hover:opacity-100"
                    style={{ opacity: isSelected ? 1 : 0.7 }}
                    onClick={() => setSelectedDomainId(comp.domainId)}
                  />
                );
              })}
            </svg>

            {/* Center Core Floating Badge */}
            <div className="absolute flex flex-col items-center justify-center text-center p-3 rounded-full bg-white/95 dark:bg-slate-900/90 border border-slate-200 dark:border-white/15 backdrop-blur-md h-28 w-28 shadow-xl">
              <Award className="h-5 w-5 text-cyan-600 dark:text-cyan-400 mb-0.5 animate-bounce" />
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider">Overall</span>
              <span className="text-xl font-black text-slate-900 dark:text-white font-mono">{avgScore}%</span>
              <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
                <TrendingUp className="h-2.5 w-2.5" /> +14% QoQ
              </span>
            </div>

            {/* Live Indicator Ring */}
            <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-spin-slow pointer-events-none" />
          </div>

          {/* Color Legend beneath the DNA Graphic */}
          <div className="grid grid-cols-2 gap-2 mt-3 w-full max-w-xs text-[11px]">
            {competencies.map(comp => (
              <button
                key={'legend-' + comp.domainId}
                onClick={() => setSelectedDomainId(comp.domainId)}
                className={`flex items-center gap-2 rounded-lg px-2.5 py-1.5 transition-all text-left ${
                  selectedDomainId === comp.domainId
                    ? 'bg-slate-100 dark:bg-white/10 border border-slate-300 dark:border-white/20 text-slate-900 dark:text-white font-bold'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: comp.color }} />
                <span className="truncate">{language === 'hi' ? comp.domainNameHi : comp.domainName.split('&')[0]}</span>
                <span className="ml-auto font-mono text-[10px] font-bold text-slate-600 dark:text-slate-300">{comp.overallScore}%</span>
              </button>
            ))}
          </div>

        </div>

        {/* RIGHT: Domain Detailed Competency Breakdown & Gap Analysis */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Domain Selector Tabs */}
          <div className="flex flex-wrap gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10">
            {competencies.map(comp => (
              <button
                key={'tab-' + comp.domainId}
                onClick={() => setSelectedDomainId(comp.domainId)}
                className={`flex-1 min-w-[120px] rounded-lg py-2 px-3 text-xs font-bold transition-all text-center ${
                  selectedDomainId === comp.domainId
                    ? 'bg-white dark:bg-gradient-to-r dark:from-slate-800 dark:to-slate-700 text-slate-900 dark:text-white shadow border border-slate-200 dark:border-white/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <div className="flex items-center justify-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ backgroundColor: comp.color }} />
                  <span className="truncate">{language === 'hi' ? comp.domainNameHi : comp.domainName}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Selected Domain Summary Card */}
          <div className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                  {language === 'hi' ? selectedDomain.domainNameHi : selectedDomain.domainName}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Target Cadre Benchmark: <span className="text-amber-600 dark:text-amber-400 font-semibold">{selectedDomain.cadreBenchmark}%</span>
                </p>
              </div>

              <div className="text-right">
                <div className="text-lg font-black text-cyan-600 dark:text-cyan-400 font-mono">
                  {selectedDomain.overallScore}%
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                  selectedDomain.overallScore >= selectedDomain.cadreBenchmark
                    ? 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30'
                    : 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30'
                }`}>
                  {selectedDomain.overallScore >= selectedDomain.cadreBenchmark
                    ? 'Cadre Compliant'
                    : `${selectedDomain.cadreBenchmark - selectedDomain.overallScore}% Gap Detected`}
                </span>
              </div>
            </div>

            {/* Micro-Competency Bars */}
            <div className="space-y-3 pt-2">
              {selectedDomain.skills.map(skill => {
                const isBelow = skill.score < skill.target;
                const gap = skill.target - skill.score;

                return (
                  <motion.div
                    key={skill.id}
                    whileHover={{ scale: 1.01 }}
                    className="rounded-lg bg-white dark:bg-slate-950/60 border border-slate-200 dark:border-white/5 p-3 hover:border-cyan-500/40 transition-colors cursor-pointer shadow-sm"
                    onClick={() => onOpenSkillDetails && onOpenSkillDetails(skill)}
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-semibold text-slate-800 dark:text-slate-200">
                        {language === 'hi' ? skill.nameHi : skill.name}
                      </span>
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-cyan-700 dark:text-cyan-300 font-bold">{skill.score}%</span>
                        <span className="text-slate-400 dark:text-slate-500 text-[11px]">/ {skill.target}% target</span>
                      </div>
                    </div>

                    {/* Comparative Progress Bar */}
                    <div className="relative h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      {/* Cadre Target Marker Line */}
                      <div
                        className="absolute top-0 bottom-0 w-[2px] bg-amber-500 dark:bg-amber-400 z-10 shadow-sm"
                        style={{ left: `${skill.target}%` }}
                        title={`Target: ${skill.target}%`}
                      />

                      {/* Current Score Fill */}
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.score}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                    </div>

                    <div className="flex items-center justify-between mt-1.5 text-[10px]">
                      <span className="text-slate-500 dark:text-slate-400 truncate max-w-[280px]">
                        {skill.description}
                      </span>
                      {isBelow ? (
                        <span className="text-amber-600 dark:text-amber-400 font-semibold flex items-center gap-0.5 shrink-0">
                          <ShieldAlert className="h-3 w-3" /> -{gap}% gap
                        </span>
                      ) : (
                        <span className="text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5 shrink-0">
                          <CheckCircle2 className="h-3 w-3" /> Mastered
                        </span>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
