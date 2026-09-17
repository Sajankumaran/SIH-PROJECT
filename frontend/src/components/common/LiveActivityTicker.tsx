import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Users, Award, Zap, CheckCircle2 } from 'lucide-react';

const LIVE_EVENTS = [
  { icon: '🎓', text: 'Aarav Sharma (ISI Kolkata) completed "Multi-Stage Stratified Sampling"', badge: '+150 XP' },
  { icon: '⚡', text: 'Live: 42,350 Statistical Officers & Students actively training across 28 States', badge: 'MoSPI Active' },
  { icon: '🏆', text: 'Rohan Deshmukh (DU) achieved a 15-Day Continuous Study Streak', badge: '🔥 Hot Streak' },
  { icon: '📊', text: 'New NSSO 80th Round CAPI Household Listing Guidelines Quiz generated', badge: 'AI Scanner' },
  { icon: '🏛️', text: 'NSSTA Greater Noida dispatched new Batch Cohort for 850 JSO Trainees', badge: 'Training Track' },
  { icon: '🎯', text: 'Sneha Mukherjee scored 100% on UPSC ISS Probability Paper Mock Test', badge: 'Gold Score' }
];

export const LiveActivityTicker: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % LIVE_EVENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const current = LIVE_EVENTS[currentIndex];

  return (
    <div className="w-full bg-cyan-950/40 dark:bg-cyan-950/60 border-b border-cyan-500/20 backdrop-blur-md py-1.5 px-4 text-xs">
      <div className="mx-auto max-w-7xl flex items-center justify-between gap-4">
        
        {/* Left Pulse Pill */}
        <div className="flex items-center gap-2 shrink-0">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest text-cyan-700 dark:text-cyan-300 hidden sm:inline">
            National Statistical Grid Live
          </span>
        </div>

        {/* Center Animated Message */}
        <div className="overflow-hidden flex-1 text-center sm:text-left">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-center sm:justify-start gap-2 text-slate-800 dark:text-slate-200 text-[11px] font-medium truncate"
            >
              <span>{current.icon}</span>
              <span className="truncate">{current.text}</span>
              <span className="hidden md:inline-block px-1.5 py-0.2 rounded bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 text-[9px] font-mono font-bold border border-cyan-500/30">
                {current.badge}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Metric */}
        <div className="hidden lg:flex items-center gap-3 text-[10px] text-slate-600 dark:text-slate-400 font-mono shrink-0">
          <span className="flex items-center gap-1">
            <Users className="h-3 w-3 text-cyan-600 dark:text-cyan-400" />
            42.3k Online
          </span>
          <span>•</span>
          <span className="text-emerald-600 dark:text-emerald-400 font-bold">
            99.98% Karmayogi Uptime
          </span>
        </div>

      </div>
    </div>
  );
};
