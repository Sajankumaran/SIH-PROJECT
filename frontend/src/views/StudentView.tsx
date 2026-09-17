import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { useLearning } from '../context/LearningContext';
import { CompetencyDNA } from '../components/dna/CompetencyDNA';
import { 
  BookOpen, 
  Award, 
  Calculator, 
  Trophy, 
  Clock, 
  Flame, 
  Play, 
  CheckCircle2, 
  FileText, 
  Zap, 
  BarChart2, 
  Search, 
  ArrowUpRight, 
  Download, 
  Check, 
  Sparkles, 
  Compass 
} from 'lucide-react';

import { MOCK_COURSES } from '../data/mockCourses';
import { Course } from '../types/index';

export const StudentView: React.FC = () => {
  const { currentOfficial, updateCurrentOfficial } = useAuth();
  const { language } = useLanguage();
  const { openQuizModal, triggerCelebration, addToast } = useLearning();

  const [coursesList, setCoursesList] = useState<Course[]>(MOCK_COURSES);
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'exam' | 'career' | 'lab' | 'leaderboard'>('overview');
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  React.useEffect(() => {
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => {
        if (data && data.success && Array.isArray(data.data) && data.data.length > 0) {
          setCoursesList(data.data);
        }
      })
      .catch(() => {});
  }, []);

  // Course Player Modal State
  const [activeCoursePlayer, setActiveCoursePlayer] = useState<any | null>(null);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);
  const [flashcardFlipped, setFlashcardFlipped] = useState(false);
  const [completedLessons, setCompletedLessons] = useState<number[]>([0]);

  // Certificate Modal State
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [certifiedCourseTitle, setCertifiedCourseTitle] = useState('Official Survey Sampling & MoSPI Microdata Certification');

  // Interactive Lab Calculator States
  const [popSize, setPopSize] = useState<number>(50000);
  const [marginError, setMarginError] = useState<number>(3); // 3%
  const [confLevel, setConfLevel] = useState<number>(1.96); // 95%
  const [pProportion] = useState<number>(0.5);

  // Normal Distribution State
  const [normMean, setNormMean] = useState<number>(100);
  const [normStd, setNormStd] = useState<number>(15);
  const [normX, setNormX] = useState<number>(115);

  // Career Target Selection
  const [targetCareerKey, setTargetCareerKey] = useState<'iss' | 'data_scientist' | 'rbi' | 'state_des'>('iss');

  // Student XP and Level State
  const studentMeta = currentOfficial.studentMetadata || {
    university: 'Indian Statistical Institute (ISI) Kolkata',
    degree: 'B.Stat (Hons) & Data Science Major',
    semester: '6th Semester',
    cgpa: '9.2 / 10.0',
    xpPoints: 2450,
    level: 4,
    levelTitle: 'Statistical Apprentice (Tier 4)',
    targetCareer: 'Indian Statistical Service (ISS) Officer & Survey Scientist',
    badges: [
      { id: 'b1', name: 'Sampling Prodigy', icon: '🎯', earnedDate: '2026-08-15' },
      { id: 'b2', name: 'CAPI Field Certified', icon: '📱', earnedDate: '2026-08-28' },
      { id: 'b3', name: 'Python Microdata Master', icon: '🐍', earnedDate: '2026-09-01' },
      { id: 'b4', name: '10-Day Streak Streak Flame', icon: '🔥', earnedDate: '2026-09-03' }
    ]
  };

  // Sample Size Formula Calculation: n = (Z^2 * p * (1-p) / e^2) / (1 + (Z^2 * p * (1-p) / (e^2 * N)))
  const calculateSampleSize = () => {
    const e = marginError / 100;
    const z = confLevel;
    const p = pProportion;
    const q = 1 - p;
    const n0 = (z * z * p * q) / (e * e);
    const n = Math.ceil(n0 / (1 + (n0 - 1) / popSize));
    return isNaN(n) ? 0 : n;
  };

  // Z-Score and approximate cumulative normal probability
  const zScore = normStd > 0 ? ((normX - normMean) / normStd) : 0;
  const approxNormalProb = () => {
    const z = zScore;
    const t = 1 / (1 + 0.2316419 * Math.abs(z));
    const d = 0.3989423 * Math.exp(-z * z / 2);
    let p = 1 - d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
    if (z < 0) p = 1 - p;
    return Math.min(100, Math.max(0, p * 100)).toFixed(2);
  };

  const handleCompleteLesson = (lessonIdx: number) => {
    if (!completedLessons.includes(lessonIdx)) {
      const nextCompleted = [...completedLessons, lessonIdx];
      setCompletedLessons(nextCompleted);
      
      const updatedMeta = {
        ...studentMeta,
        xpPoints: studentMeta.xpPoints + 150
      };
      
      const updated = {
        ...currentOfficial,
        studentMetadata: updatedMeta,
        learningHoursCompleted: currentOfficial.learningHoursCompleted + 0.8
      };
      updateCurrentOfficial(updated);
      triggerCelebration();
      addToast(
        'Module Completed! 🚀',
        `+150 XP Earned! Total XP: ${updatedMeta.xpPoints}. Statistical DNA score boosted.`,
        'success'
      );
    }
  };

  const handleFinishCourse = (course: any) => {
    setActiveCoursePlayer(null);
    setCertifiedCourseTitle(course.title);
    setShowCertificateModal(true);
    triggerCelebration();
    addToast(
      'Course Completed & Certified! 🎓',
      `You have earned the official MoSPI Certificate for "${course.title}". Added to portfolio!`,
      'success'
    );
  };

  const filteredCourses = coursesList.filter(course => {
    const matchesDomain = selectedDomain === 'all' || course.domainId === selectedDomain;
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          course.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesDomain && matchesSearch;
  });

  const CAREER_PLANS = {
    iss: {
      title: 'Indian Statistical Service (ISS) Officer',
      examBody: 'UPSC Combined Geo-Scientist & Statistical Services Examination',
      expectedTimeline: '10 - 14 Months Intensive Preparation',
      readinessPercent: 74,
      milestones: [
        { name: 'General Statistics Paper 1 (Probability & Sampling Theory)', status: 'completed', score: '88%' },
        { name: 'Paper 2: Statistical Inference & Linear Estimation', status: 'in_progress', score: '72%' },
        { name: 'Paper 3: Applied Statistics, National Accounts & Index Numbers', status: 'in_progress', score: '65%' },
        { name: 'Paper 4: Microdata Analytics & Official Statistics Specialization', status: 'recommended', score: 'Pending' },
        { name: 'UPSC Personality Test & Technical Interview Simulation', status: 'upcoming', score: 'Pending' }
      ]
    },
    data_scientist: {
      title: 'NSSO Survey Data Scientist & Microdata Architect',
      examBody: 'MoSPI Technical Cadre / SSS Recruitment',
      expectedTimeline: '6 - 8 Months Specialization',
      readinessPercent: 82,
      milestones: [
        { name: 'Python & R for Multi-Gigabyte Survey Microdata', status: 'completed', score: '94%' },
        { name: 'CAPI Validation Rule Scripting & Automated Auditing', status: 'completed', score: '85%' },
        { name: 'Small Area Estimation (SAE) with Fay-Herriot Models', status: 'in_progress', score: '60%' },
        { name: 'Spatial GeoPandas Mapping with Census Boundaries', status: 'recommended', score: 'Pending' }
      ]
    },
    rbi: {
      title: 'RBI Grade B (Department of Statistics & Information Management)',
      examBody: 'Reserve Bank of India (DSIM)',
      expectedTimeline: '8 - 12 Months Specialized Economics & Statistics',
      readinessPercent: 68,
      milestones: [
        { name: 'Time Series Econometrics & Seasonal ARIMA Adjustment', status: 'completed', score: '80%' },
        { name: 'National Accounts (SNA 2008) & GVA Output Tables', status: 'in_progress', score: '64%' },
        { name: 'Financial Econometrics & Monetary Aggregates Modelling', status: 'recommended', score: 'Pending' }
      ]
    },
    state_des: {
      title: 'State Directorate of Economics & Statistics (DES) Officer',
      examBody: 'State Public Service Commission',
      expectedTimeline: '4 - 6 Months Rapid Prep',
      readinessPercent: 88,
      milestones: [
        { name: 'District Level SDG Indicator Tracking (NIF)', status: 'completed', score: '90%' },
        { name: 'Agricultural Statistics & Crop Cutting Experiments (GCES)', status: 'completed', score: '86%' },
        { name: 'State Domestic Product (GSDP) Compilation', status: 'completed', score: '88%' }
      ]
    }
  };

  const LEADERBOARD_DATA = [
    { rank: 1, name: 'Aarav Sharma (You)', college: 'ISI Kolkata', score: 2450, streak: 12, badge: '🥇 Gold Fellow' },
    { rank: 2, name: 'Rohan Deshmukh', college: 'Delhi University (Hindu College)', score: 2380, streak: 15, badge: '🥈 Silver Scholar' },
    { rank: 3, name: 'Sneha Mukherjee', college: 'Presidency University Kolkata', score: 2210, streak: 9, badge: '🥉 Bronze Scholar' },
    { rank: 4, name: 'Aditya Verma', college: 'Banaras Hindu University (BHU)', score: 2050, streak: 8, badge: '🎖️ Top 5%' },
    { rank: 5, name: 'Kavya Nair', college: 'University of Kerala', score: 1980, streak: 11, badge: '🎖️ Top 5%' },
    { rank: 6, name: 'Tushar Mehta', college: 'IIT Bombay (Applied Stats)', score: 1920, streak: 6, badge: '🎖️ Top 10%' }
  ];

  return (
    <div className="space-y-6 pb-12">
      
      {/* ================= STUDENT HERO BANNER & LEVEL PROGRESS ================= */}
      <div className="rounded-2xl border border-cyan-500/30 bg-white/90 dark:bg-slate-950/80 p-5 sm:p-6 backdrop-blur-xl shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors">
        <div className="absolute top-0 right-0 h-64 w-64 bg-gradient-to-bl from-cyan-500/20 via-teal-500/10 to-transparent blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          
          {/* Left: Avatar, University, Level info */}
          <div className="flex items-start sm:items-center gap-4">
            <div className="relative">
              <img
                src={currentOfficial.avatarUrl}
                alt={currentOfficial.name}
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover ring-2 ring-cyan-500/50 shadow-lg shadow-cyan-500/25"
              />
              <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-amber-400 to-yellow-500 text-slate-950 shadow font-bold text-xs">
                ⭐
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                  {language === 'hi' ? currentOfficial.nameHi : currentOfficial.name}
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-700 dark:text-cyan-300 font-bold border border-cyan-500/40">
                  {studentMeta.levelTitle}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-700 dark:text-amber-300 font-mono font-semibold border border-amber-500/30">
                  {studentMeta.xpPoints} XP
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
                {studentMeta.degree} • <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{studentMeta.university}</span>
              </p>

              <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400 pt-0.5">
                <span className="font-mono">ID: {currentOfficial.karmayogiId}</span>
                <span>•</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">CGPA: {studentMeta.cgpa}</span>
                <span>•</span>
                <span className="text-amber-600 dark:text-amber-400 font-semibold">Target: {studentMeta.targetCareer}</span>
              </div>
            </div>
          </div>

          {/* Right: Interactive Quick Stats Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 shrink-0">
            <div className="rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 p-2.5 text-center shadow-sm">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold flex items-center justify-center gap-1">
                <Clock className="h-3 w-3 text-cyan-600 dark:text-cyan-400" />
                Study Hours
              </span>
              <div className="text-base font-black text-slate-900 dark:text-white font-mono mt-0.5">
                {currentOfficial.learningHoursCompleted} hrs
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 p-2.5 text-center shadow-sm">
              <span className="text-[10px] text-amber-600 dark:text-amber-400 uppercase font-semibold flex items-center justify-center gap-1">
                <Flame className="h-3 w-3 fill-amber-500" />
                Daily Streak
              </span>
              <div className="text-base font-black text-amber-600 dark:text-amber-300 font-mono mt-0.5">
                {currentOfficial.learningStreakDays} Days
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 p-2.5 text-center shadow-sm">
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 uppercase font-semibold flex items-center justify-center gap-1">
                <Award className="h-3 w-3" />
                Certificates
              </span>
              <div className="text-base font-black text-emerald-600 dark:text-emerald-300 font-mono mt-0.5">
                {currentOfficial.coursesCompletedCount} Earned
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 p-2.5 text-center shadow-sm">
              <span className="text-[10px] text-purple-600 dark:text-purple-400 uppercase font-semibold flex items-center justify-center gap-1">
                <Trophy className="h-3 w-3" />
                Pan-India Rank
              </span>
              <div className="text-base font-black text-purple-600 dark:text-purple-300 font-mono mt-0.5">
                #1 (Top 0.1%)
              </div>
            </div>
          </div>

        </div>

        {/* Level XP Progress Bar */}
        <div className="mt-5 pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="w-full sm:w-2/3">
            <div className="flex items-center justify-between text-xs font-semibold mb-1">
              <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1">
                <Zap className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                Level 4 Progress ({studentMeta.xpPoints} / 3000 XP to Level 5 "Junior Statistical Fellow")
              </span>
              <span className="text-cyan-600 dark:text-cyan-400 font-mono">
                {Math.round((studentMeta.xpPoints / 3000) * 100)}%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-amber-400 transition-all duration-500"
                style={{ width: `${Math.min(100, (studentMeta.xpPoints / 3000) * 100)}%` }}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {studentMeta.badges.map(b => (
              <span
                key={b.id}
                title={`${b.name} (Earned ${b.earnedDate})`}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-xs font-semibold cursor-pointer hover:border-cyan-500/50 transition-all"
              >
                <span>{b.icon}</span>
                <span className="hidden md:inline text-[10px] text-slate-700 dark:text-slate-300">{b.name}</span>
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* ================= STUDENT NAVIGATION TABS ================= */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 dark:border-white/10 pb-3">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'overview'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <BarChart2 className="h-4 w-4" />
          Competency DNA & Overview
        </button>

        <button
          onClick={() => setActiveTab('courses')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'courses'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          Student Course Academy & Player
        </button>

        <button
          onClick={() => setActiveTab('exam')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'exam'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <Award className="h-4 w-4" />
          Mock Exams & Certificates
        </button>

        <button
          onClick={() => setActiveTab('career')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'career'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <Compass className="h-4 w-4" />
          AI Career Roadmap (ISS / MoSPI)
        </button>

        <button
          onClick={() => setActiveTab('lab')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'lab'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <Calculator className="h-4 w-4" />
          Virtual Statistical Lab
        </button>

        <button
          onClick={() => setActiveTab('leaderboard')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'leaderboard'
              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25'
              : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900'
          }`}
        >
          <Trophy className="h-4 w-4" />
          Pan-India Student Leaderboard
        </button>
      </div>

      {/* ================= TAB 1: OVERVIEW & DNA ================= */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          <div className="xl:col-span-6 space-y-6">
            <CompetencyDNA
              competencies={currentOfficial.competencies}
              cadreTitle="Student Scholar vs ISS Officer Benchmark"
            />

            {/* Quick Practice Exam Banner */}
            <div className="rounded-2xl border border-amber-500/30 bg-amber-50/50 dark:bg-amber-950/20 p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5 animate-pulse" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    UPSC ISS 2026 Preparation Mock Test Active
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Test your Probability & Multi-stage Sampling fundamentals with AI-generated Bloom's tiered questions.
                  </p>
                </div>
              </div>

              <button
                onClick={() => openQuizModal('doc-nsso-79')}
                className="rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold px-4 py-2 text-xs shadow-lg shadow-amber-500/20 transition-all shrink-0 active:scale-95"
              >
                Launch Live Mock Quiz
              </button>
            </div>
          </div>

          <div className="xl:col-span-6 space-y-6">
            {/* Student Study Goals & Daily Quests Card */}
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-950/80 p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-cyan-500" />
                  Today's Student Quests & XP Bounties
                </h3>
                <span className="text-[11px] font-mono text-cyan-600 dark:text-cyan-400 font-bold">2/3 Completed</span>
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">Review Neyman Allocation Formula</span>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">Virtual Lab • Stratified Sampling</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">+100 XP (Claimed)</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                  <div className="flex items-center gap-2.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">Python Survey Microdata Cleaning</span>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">Module 3 • NSSO Microdata Processing</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">+150 XP (Claimed)</span>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 hover:border-cyan-500/40 transition-colors">
                  <div className="flex items-center gap-2.5">
                    <div className="h-4 w-4 rounded-full border-2 border-slate-400" />
                    <div>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">Take NSSO 80th Round Practice Exam</span>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400">Mock Exam Center • 5 Questions</p>
                    </div>
                  </div>
                  <button
                    onClick={() => openQuizModal('doc-nsso-79')}
                    className="px-3 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] font-bold transition-all"
                  >
                    Start (+200 XP)
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Access to Student Lab & Career Roadmap */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                onClick={() => setActiveTab('lab')}
                className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-transparent p-5 space-y-3 cursor-pointer hover:border-cyan-500/60 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-xl bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                    <Calculator className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-cyan-600 dark:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">Virtual Statistical Lab</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Interactive calculators for sample size determination, stratified Neyman allocation & normal distributions.
                </p>
              </div>

              <div 
                onClick={() => setActiveTab('career')}
                className="rounded-2xl border border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-transparent p-5 space-y-3 cursor-pointer hover:border-amber-500/60 transition-all group"
              >
                <div className="flex items-center justify-between">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                    <Compass className="h-5 w-5" />
                  </div>
                  <ArrowUpRight className="h-4 w-4 text-amber-600 dark:text-amber-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">ISS & MoSPI Career Planner</h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Track your personalized syllabus readiness for UPSC Indian Statistical Service & MoSPI research fellowships.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: COURSE ACADEMY & INTERACTIVE PLAYER ================= */}
      {activeTab === 'courses' && (
        <div className="space-y-6">
          {/* Filter and Search Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-950 p-4 rounded-2xl border border-slate-200 dark:border-white/10 shadow-sm">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search courses, modules, topics..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              {['all', 'statistical', 'technical', 'governance', 'behavioural'].map(domain => (
                <button
                  key={domain}
                  onClick={() => setSelectedDomain(domain)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all ${
                    selectedDomain === domain
                      ? 'bg-cyan-500 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {domain}
                </button>
              ))}
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <div
                key={course.id}
                className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950/80 overflow-hidden shadow-sm hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/5 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md text-[10px] font-bold text-cyan-400 border border-white/10">
                      {course.level}
                    </div>
                    <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-emerald-500/90 text-[10px] font-extrabold text-white">
                      +{course.competencyDelta.gainPoints}% DNA Gain
                    </div>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                      <span>{course.provider}</span>
                      <span className="font-mono">{course.durationHours} hrs</span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors leading-snug">
                      {course.title}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {course.description}
                    </p>

                    <div className="flex flex-wrap gap-1 pt-1">
                      {course.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => {
                      setActiveCoursePlayer(course);
                      setActiveLessonIndex(0);
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-extrabold py-2.5 shadow-md shadow-cyan-500/20 transition-all"
                  >
                    <Play className="h-3.5 w-3.5 fill-white" />
                    <span>Launch Student Lecture Player</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ================= TAB 3: MOCK EXAMS & CERTIFICATE STUDIO ================= */}
      {activeTab === 'exam' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500/10 via-blue-500/5 to-transparent p-6 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-wider">
                  Official MoSPI Student Certification & Assessment Wing
                </span>
                <h2 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                  National Statistical Competency Examination Center
                </h2>
                <p className="text-xs text-slate-600 dark:text-slate-300 max-w-2xl mt-1 leading-relaxed">
                  Take verified mock tests aligned with the National Statistical Systems Training Academy (NSSTA) standards.
                  Passing score (70%+) instantly issues a verifiable official certificate with QR verification code.
                </p>
              </div>

              <button
                onClick={() => {
                  setCertifiedCourseTitle('Official Survey Sampling & MoSPI Microdata Certification');
                  setShowCertificateModal(true);
                }}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold shadow-lg hover:scale-105 transition-all shrink-0"
              >
                <Award className="h-4 w-4 text-amber-400" />
                <span>View My Earned Certificate</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 text-[10px] font-bold border border-cyan-500/30">
                  UPSC ISS Foundation
                </span>
                <span className="text-xs font-mono text-slate-400">5 Questions</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Multi-Stage Stratified Sampling & Neyman Optimal Allocation
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Covers sample allocation formulas, finite population corrections, and Primary Sampling Unit (PSU) selection.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => openQuizModal('doc-nsso-79')}
                  className="w-full py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs shadow-md shadow-cyan-500/20 transition-all"
                >
                  Start Exam (15 Mins)
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 text-[10px] font-bold border border-amber-500/30">
                  Technical & Coding
                </span>
                <span className="text-xs font-mono text-slate-400">5 Questions</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Python & R for NSSO Large Survey Microdata Processing
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Covers weighted standard errors, survey package in R, Polars DataFrame parsing, and CAPI validation rules.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => openQuizModal('doc-nsso-79')}
                  className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md shadow-amber-500/20 transition-all"
                >
                  Start Exam (15 Mins)
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 p-5 space-y-4 shadow-sm">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                  DPDP Act & Governance
                </span>
                <span className="text-xs font-mono text-slate-400">5 Questions</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Digital Personal Data Protection (DPDPA 2023) in Official Surveys
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Covers statistical disclosure control, k-anonymity, differential privacy, and respondent consent rules.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => openQuizModal('doc-nsso-79')}
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md shadow-emerald-500/20 transition-all"
                >
                  Start Exam (15 Mins)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: AI CAREER ROADMAP ================= */}
      {activeTab === 'career' && (
        <div className="space-y-6">
          {/* Career Choice Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { key: 'iss', label: 'UPSC ISS Officer', badge: 'Apex Cadre' },
              { key: 'data_scientist', label: 'NSSO Data Scientist', badge: 'Technical Lead' },
              { key: 'rbi', label: 'RBI DSIM Specialist', badge: 'Macro Stats' },
              { key: 'state_des', label: 'State DES Officer', badge: 'Regional Stats' }
            ].map(item => (
              <button
                key={item.key}
                onClick={() => setTargetCareerKey(item.key as any)}
                className={`p-4 rounded-2xl border text-left transition-all ${
                  targetCareerKey === item.key
                    ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-500/10 shadow-lg shadow-cyan-500/10'
                    : 'border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-700 dark:text-cyan-300">
                    {item.badge}
                  </span>
                  {targetCareerKey === item.key && <Check className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />}
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-2">{item.label}</h4>
              </button>
            ))}
          </div>

          {/* Selected Plan Details */}
          <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 p-6 space-y-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
              <div>
                <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">Target Career Trajectory</span>
                <h3 className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                  {CAREER_PLANS[targetCareerKey].title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {CAREER_PLANS[targetCareerKey].examBody} • {CAREER_PLANS[targetCareerKey].expectedTimeline}
                </p>
              </div>

              <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-white/10 shrink-0">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Competency Readiness</span>
                  <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">
                    {CAREER_PLANS[targetCareerKey].readinessPercent}% Ready
                  </div>
                </div>
                <div className="h-10 w-10 rounded-xl bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                  🎯
                </div>
              </div>
            </div>

            {/* Milestones Roadmap */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Syllabus Milestones & Prerequisite Skill Tracks
              </h4>

              <div className="space-y-2.5">
                {CAREER_PLANS[targetCareerKey].milestones.map((m, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/60"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`h-6 w-6 rounded-full flex items-center justify-center text-xs font-bold ${
                        m.status === 'completed'
                          ? 'bg-emerald-500 text-white'
                          : m.status === 'in_progress'
                          ? 'bg-amber-500 text-slate-950'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                      }`}>
                        {m.status === 'completed' ? '✓' : idx + 1}
                      </div>

                      <div>
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{m.name}</span>
                        <span className="text-[10px] text-slate-400 block capitalize">{m.status.replace('_', ' ')}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                        {m.score}
                      </span>
                      {m.status !== 'completed' && (
                        <button
                          onClick={() => setActiveTab('courses')}
                          className="px-3 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-[11px] font-bold"
                        >
                          Study Now
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 5: VIRTUAL STATISTICAL LAB ================= */}
      {activeTab === 'lab' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-cyan-500/30 bg-cyan-50 dark:bg-cyan-950/20 p-5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Calculator className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              Interactive Statistical Simulation Lab for NSSO / MoSPI Surveys
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
              Test live sampling formulas, margin of error parameters, and normal probability density functions in real time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Lab Tool 1: Sample Size Determinant (Cochran & Finite Pop) */}
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 p-6 space-y-5 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Survey Sample Size Calculator (Cochran's Formula)
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Calculates required household / FSU sample size with Finite Population Correction (FPC).
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 bg-cyan-500/10 px-2 py-1 rounded">
                  n = {calculateSampleSize()}
                </span>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-slate-700 dark:text-slate-300">Population Size (N)</span>
                    <span className="font-mono text-cyan-600 dark:text-cyan-400">{popSize.toLocaleString()}</span>
                  </div>
                  <input
                    type="range"
                    min="1000"
                    max="500000"
                    step="1000"
                    value={popSize}
                    onChange={e => setPopSize(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-slate-700 dark:text-slate-300">Acceptable Margin of Error (e)</span>
                    <span className="font-mono text-cyan-600 dark:text-cyan-400">&plusmn;{marginError}%</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={marginError}
                    onChange={e => setMarginError(Number(e.target.value))}
                    className="w-full accent-cyan-500 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-slate-700 dark:text-slate-300">Confidence Level (Z-value)</span>
                    <span className="font-mono text-cyan-600 dark:text-cyan-400">
                      {confLevel === 1.645 ? '90% (Z=1.645)' : confLevel === 1.96 ? '95% (Z=1.96)' : '99% (Z=2.576)'}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { z: 1.645, label: '90%' },
                      { z: 1.96, label: '95%' },
                      { z: 2.576, label: '99%' }
                    ].map(item => (
                      <button
                        key={item.label}
                        onClick={() => setConfLevel(item.z)}
                        className={`py-1.5 rounded-lg border text-xs font-bold transition-all ${
                          confLevel === item.z
                            ? 'bg-cyan-500 text-white border-cyan-500'
                            : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-white/10 text-slate-600 dark:text-slate-300'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Calculation Output Box */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-600 dark:text-slate-400">Recommended Sample Size (n):</span>
                    <span className="text-base font-black text-emerald-600 dark:text-emerald-400 font-mono">
                      {calculateSampleSize()} Households
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    Formula: n = [ (Z&sup2; &times; p &times; (1-p)) / e&sup2; ] / [ 1 + (n&#8320; - 1) / N ]
                  </p>
                </div>
              </div>
            </div>

            {/* Lab Tool 2: Normal Distribution & Z-Score Interactive Curve */}
            <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 p-6 space-y-5 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Normal Distribution & Z-Score Probability Curve
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Simulate continuous statistical indicators & compute P(X &le; x).
                  </p>
                </div>
                <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-1 rounded">
                  Z = {zScore.toFixed(2)}
                </span>
              </div>

              {/* Dynamic SVG Bell Curve Visualizer */}
              <div className="h-32 w-full bg-slate-50 dark:bg-slate-900 rounded-xl p-2 relative overflow-hidden flex items-end justify-center">
                <svg viewBox="0 0 300 100" className="w-full h-full overflow-visible">
                  <path
                    d="M 10,95 Q 80,95 120,40 Q 150,5 180,40 Q 220,95 290,95"
                    fill="none"
                    stroke="#06B6D4"
                    strokeWidth="3"
                  />
                  {/* Vertical Cutoff Indicator */}
                  <line
                    x1={Math.min(280, Math.max(20, 150 + zScore * 40))}
                    y1="10"
                    x2={Math.min(280, Math.max(20, 150 + zScore * 40))}
                    y2="95"
                    stroke="#F59E0B"
                    strokeWidth="2.5"
                    strokeDasharray="4"
                  />
                </svg>
                <div className="absolute top-2 right-3 text-[10px] font-mono text-amber-600 dark:text-amber-400 font-bold">
                  P(X &le; {normX}) = {approxNormalProb()}%
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Mean (&mu;)</span>
                    <input
                      type="number"
                      value={normMean}
                      onChange={e => setNormMean(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 font-mono"
                    />
                  </div>
                  <div>
                    <span className="text-slate-700 dark:text-slate-300 font-semibold block mb-1">Std Deviation (&sigma;)</span>
                    <input
                      type="number"
                      value={normStd}
                      onChange={e => setNormStd(Number(e.target.value))}
                      className="w-full p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between font-semibold mb-1">
                    <span className="text-slate-700 dark:text-slate-300">Observation Value (X)</span>
                    <span className="font-mono text-amber-600 dark:text-amber-400">{normX}</span>
                  </div>
                  <input
                    type="range"
                    min={normMean - 3 * normStd}
                    max={normMean + 3 * normStd}
                    step="1"
                    value={normX}
                    onChange={e => setNormX(Number(e.target.value))}
                    className="w-full accent-amber-500 cursor-pointer"
                  />
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* ================= TAB 6: STUDENT LEADERBOARD ================= */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-950 p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
              <div>
                <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-500" />
                  All-India Statistical Scholars Leaderboard (MoSPI Student League)
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  Rankings updated in real time based on completed iGOT modules, mock exam accuracy & streak.
                </p>
              </div>

              <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                Week 36 Active
              </span>
            </div>

            <div className="space-y-2">
              {LEADERBOARD_DATA.map(user => (
                <div
                  key={user.rank}
                  className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                    user.rank === 1
                      ? 'bg-cyan-50 dark:bg-cyan-500/10 border-cyan-500/40 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`h-7 w-7 rounded-full flex items-center justify-center font-black text-xs ${
                      user.rank === 1
                        ? 'bg-amber-400 text-slate-950'
                        : user.rank === 2
                        ? 'bg-slate-300 text-slate-900'
                        : user.rank === 3
                        ? 'bg-amber-700 text-white'
                        : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                    }`}>
                      #{user.rank}
                    </span>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">{user.name}</span>
                        <span className="text-[10px] text-slate-400 font-semibold">{user.badge}</span>
                      </div>
                      <span className="text-[10px] text-slate-500 dark:text-slate-400">{user.college}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-bold">
                      <Flame className="h-3.5 w-3.5 fill-amber-500" />
                      {user.streak}d
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-black">
                      {user.score} XP
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= INTERACTIVE COURSE PLAYER MODAL ================= */}
      {activeCoursePlayer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-4xl rounded-2xl border border-slate-200 dark:border-white/15 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden my-8"
          >
            {/* Player Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950 px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="h-8 w-8 rounded-lg bg-cyan-500/20 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
                  <BookOpen className="h-4 w-4" />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {activeCoursePlayer.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    iGOT Karmayogi Interactive Student Academy
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveCoursePlayer(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                ✕
              </button>
            </div>

            {/* Player Body */}
            <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Left Column: Video & Lesson Content */}
              <div className="md:col-span-8 space-y-4">
                {/* Video Simulator Container */}
                <div className="relative aspect-video rounded-2xl bg-slate-950 overflow-hidden border border-white/10 flex flex-col justify-between p-4 shadow-xl">
                  <div className="flex items-center justify-between text-[11px] text-cyan-400 font-mono z-10">
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                      MoSPI Virtual Masterclass Lesson #{activeLessonIndex + 1}
                    </span>
                    <span>HD 1080p</span>
                  </div>

                  <div className="text-center space-y-2 z-10">
                    <div className="h-14 w-14 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-400/40 flex items-center justify-center mx-auto shadow-xl backdrop-blur-md cursor-pointer hover:scale-110 transition-transform">
                      <Play className="h-6 w-6 fill-cyan-400 ml-1" />
                    </div>
                    <p className="text-xs font-bold text-white tracking-wide">
                      {activeCoursePlayer.syllabus[activeLessonIndex] || 'Official Statistical Survey Sampling Methodology'}
                    </p>
                  </div>

                  <div className="space-y-1 z-10">
                    <div className="h-1 w-full bg-white/20 rounded-full overflow-hidden">
                      <div className="h-full w-2/3 bg-gradient-to-r from-cyan-400 to-blue-500" />
                    </div>
                    <div className="flex justify-between text-[10px] font-mono text-slate-400">
                      <span>18:45</span>
                      <span>28:00</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Flashcard Study Tool */}
                <div
                  onClick={() => setFlashcardFlipped(!flashcardFlipped)}
                  className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-4 cursor-pointer hover:border-amber-500/60 transition-all text-center space-y-2"
                >
                  <span className="text-[10px] uppercase font-bold text-amber-600 dark:text-amber-400 flex items-center justify-center gap-1">
                    <Sparkles className="h-3 w-3" />
                    Interactive Flashcard (Click to Flip)
                  </span>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    {!flashcardFlipped 
                      ? 'Question: When is Neyman Optimal Allocation strictly superior to Proportional Allocation?'
                      : 'Answer: When stratum variances (S_h) differ substantially across strata, reducing total variance for fixed sample size n.'}
                  </p>
                </div>
              </div>

              {/* Right Column: Syllabus Chapters & Completion */}
              <div className="md:col-span-4 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Course Modules ({completedLessons.length}/{activeCoursePlayer.syllabus.length})
                </h4>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {activeCoursePlayer.syllabus.map((topic: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setActiveLessonIndex(idx)}
                      className={`w-full text-left p-3 rounded-xl border text-xs transition-all flex items-center justify-between gap-2 ${
                        activeLessonIndex === idx
                          ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-500/10 text-cyan-900 dark:text-cyan-200 font-bold'
                          : 'border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="font-mono text-[10px] text-slate-400">0{idx + 1}.</span>
                        <span className="truncate">{topic}</span>
                      </div>
                      {completedLessons.includes(idx) && (
                        <Check className="h-4 w-4 text-emerald-500 shrink-0" />
                      )}
                    </button>
                  ))}
                </div>

                <div className="pt-2 space-y-2">
                  <button
                    onClick={() => handleCompleteLesson(activeLessonIndex)}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-1.5"
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Mark Module Completed (+150 XP)</span>
                  </button>

                  <button
                    onClick={() => handleFinishCourse(activeCoursePlayer)}
                    className="w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/20 transition-all"
                  >
                    🎓 Complete & Generate Certificate
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* ================= OFFICIAL CERTIFICATE MODAL ================= */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-3xl rounded-2xl bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 border-4 border-amber-500/40 p-8 shadow-2xl text-center space-y-6 my-8"
          >
            <button
              onClick={() => setShowCertificateModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-900 dark:hover:text-white"
            >
              ✕
            </button>

            {/* Emblem and Seal */}
            <div className="flex items-center justify-center gap-3">
              <div className="h-12 w-12 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xl">
                🏛️
              </div>
              <div className="text-left">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 dark:text-amber-400 block">
                  Ministry of Statistics & Programme Implementation (MoSPI)
                </span>
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  National Statistical Systems Training Academy (NSSTA)
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-serif font-black text-slate-900 dark:text-white tracking-wide">
                CERTIFICATE OF MERIT & EXCELLENCE
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                This is officially certified that
              </p>
            </div>

            <div className="py-2 border-b-2 border-amber-500/40 max-w-md mx-auto">
              <h3 className="text-2xl font-serif font-bold text-cyan-700 dark:text-cyan-300">
                {currentOfficial.name}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                {studentMeta.university} • {studentMeta.degree}
              </p>
            </div>

            <p className="text-xs text-slate-700 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
              has successfully mastered all theoretical and practical competencies in{' '}
              <strong className="text-slate-900 dark:text-white">{certifiedCourseTitle}</strong>, demonstrating exceptional proficiency in Multi-stage Stratified Sampling, CAPI Microdata Quality, and DPDP Compliance.
            </p>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-200 dark:border-white/10 max-w-md mx-auto text-left text-[11px]">
              <div>
                <span className="text-slate-400 block">Certificate ID</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">MOSPI-2026-7892</span>
              </div>
              <div>
                <span className="text-slate-400 block">Issue Date</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">04 Sept 2026</span>
              </div>
              <div>
                <span className="text-slate-400 block">Verification</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">QR Verified ✓</span>
              </div>
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  window.print();
                }}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/25 active:scale-95 transition-all"
              >
                <Download className="h-4 w-4" />
                <span>Download Official PDF Certificate</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
};
