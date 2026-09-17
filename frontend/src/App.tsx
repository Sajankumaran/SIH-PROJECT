import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { LearningProvider } from './context/LearningContext';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/navbar/Navbar';
import { DynamicBackground } from './components/common/DynamicBackground';
import { LiveActivityTicker } from './components/common/LiveActivityTicker';
import { LandingView } from './views/LandingView';
import { StudentView } from './views/StudentView';
import { LearnerDashboard } from './views/LearnerDashboard';
import { AdminDashboard } from './views/AdminDashboard';
import { TrainerView } from './views/TrainerView';
import { QuizGeneratorModal } from './components/quiz/QuizGeneratorModal';
import { KarmayogiCopilot } from './components/copilot/KarmayogiCopilot';
import { motion, AnimatePresence } from 'framer-motion';

const MainAppContent: React.FC = () => {
  const [currentView, setCurrentView] = useState<string>('landing');

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#070A13] text-slate-900 dark:text-slate-100 flex flex-col justify-between selection:bg-cyan-500/30 selection:text-cyan-800 dark:selection:text-cyan-200 transition-colors duration-200 relative">
      
      {/* Background dynamic ambient particle network */}
      <DynamicBackground />

      <div className="relative z-10">
        {/* Live Statistical Grid Activity Ticker */}
        <LiveActivityTicker />

        {/* Top Sticky Navbar */}
        <Navbar currentView={currentView} onNavigate={setCurrentView} />

        {/* Main Content Area */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-6 pb-12">
          <AnimatePresence mode="wait">
            {currentView === 'landing' && (
              <motion.div
                key="landing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <LandingView onNavigate={setCurrentView} />
              </motion.div>
            )}

            {currentView === 'student' && (
              <motion.div
                key="student"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <StudentView />
              </motion.div>
            )}

            {currentView === 'learner' && (
              <motion.div
                key="learner"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <LearnerDashboard />
              </motion.div>
            )}

            {currentView === 'trainer' && (
              <motion.div
                key="trainer"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <TrainerView />
              </motion.div>
            )}

            {currentView === 'admin' && (
              <motion.div
                key="admin"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <AdminDashboard />
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>

      {/* Global Interactive Elements */}
      <QuizGeneratorModal />
      <KarmayogiCopilot />

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-950/80 py-6 text-center text-xs text-slate-500 dark:text-slate-400 transition-colors">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-slate-900 dark:text-white">KaushalAI (कौशलAI)</span>
            <span>•</span>
            <span>Official Statistical System Competency Platform</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-500 dark:text-slate-400">
            <span>MoSPI</span>
            <span>•</span>
            <span>NSSO (SDRD / FOD / DPD)</span>
            <span>•</span>
            <span>NSSTA Greater Noida</span>
            <span>•</span>
            <span>iGOT Karmayogi CBC</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LanguageProvider>
          <LearningProvider>
            <MainAppContent />
          </LearningProvider>
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
