import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useLearning } from '../../context/LearningContext';
import { 
  GraduationCap, 
  Plus, 
  Users, 
  Calendar, 
  FileText, 
  Send 
} from 'lucide-react';

interface Assignment {
  id: string;
  title: string;
  assignedToCadre: string;
  assignedBy: string;
  dueDate: string;
  totalEnrolled: number;
  completionRate: number;
  status: string;
}

export const TrainerStudio: React.FC = () => {
  const { currentOfficial } = useAuth();
  const { openQuizModal, addToast } = useLearning();

  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCadre, setNewCadre] = useState('NSSO Field Operations Division (All JSOs)');
  const [newDueDate, setNewDueDate] = useState('2026-10-31');

  useEffect(() => {
    fetch('/api/trainer/assignments')
      .then(res => res.json())
      .then(data => {
        if (data && data.success && Array.isArray(data.data)) {
          setAssignments(data.data);
        }
      })
      .catch(() => {});
  }, []);

  const handleCreateAssignment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    try {
      const response = await fetch('/api/trainer/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle,
          assignedToCadre: newCadre,
          assignedBy: currentOfficial.name,
          dueDate: newDueDate,
          totalEnrolled: 420
        })
      });

      if (response.ok) {
        const data = await response.json();
        setAssignments(prev => [data.data, ...prev]);
        setIsCreatingNew(false);
        setNewTitle('');
        addToast(
          'Assignment Track Dispatched! 🚀',
          `Dispatched "${newTitle}" to ${newCadre}.`,
          'success'
        );
      }
    } catch (err) {
      const created = {
        id: 'asg-' + Date.now(),
        title: newTitle,
        assignedToCadre: newCadre,
        assignedBy: currentOfficial.name,
        dueDate: newDueDate,
        totalEnrolled: 420,
        completionRate: 0,
        status: 'Active'
      };
      setAssignments(prev => [created, ...prev]);
      setIsCreatingNew(false);
      setNewTitle('');
      addToast(
        'Assignment Track Dispatched! 🚀',
        `Dispatched "${newTitle}" to ${newCadre}.`,
        'success'
      );
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="rounded-2xl border border-amber-500/30 bg-white/90 dark:bg-slate-950/80 p-6 backdrop-blur-xl shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/20">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                NSSTA Faculty & Cadre Training Studio
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                National Statistical Systems Training Academy • Dispatch Mandated Learning Tracks
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => openQuizModal()}
              className="flex items-center gap-2 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/15 px-4 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800 transition-all shadow-sm"
            >
              <FileText className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
              <span>Generate New Cadre Quiz</span>
            </button>

            <button
              onClick={() => setIsCreatingNew(!isCreatingNew)}
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 px-4 py-2 text-xs font-extrabold text-slate-950 shadow-lg shadow-amber-500/20 transition-all"
            >
              <Plus className="h-4 w-4" />
              <span>Assign Learning Track</span>
            </button>
          </div>
        </div>

        {/* Create Assignment Form */}
        {isCreatingNew && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            onSubmit={handleCreateAssignment}
            className="mt-6 border-t border-slate-200 dark:border-white/10 pt-4 space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Learning Track / Assessment Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NSS 80th Round CAPI Pre-Survey Certification"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 px-3 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Target Cadre / Division</label>
                <select
                  value={newCadre}
                  onChange={e => setNewCadre(e.target.value)}
                  className="w-full rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 px-3 py-2 text-xs text-slate-900 dark:text-white focus:border-amber-400 focus:outline-none"
                >
                  <option value="NSSO Field Operations Division (All JSOs)">NSSO Field Operations Division (All JSOs)</option>
                  <option value="Survey Design & Research Division (SDRD)">Survey Design & Research Division (SDRD)</option>
                  <option value="National Accounts Division (CSO NAD)">National Accounts Division (CSO NAD)</option>
                  <option value="State Directorates of Economics & Statistics">State Directorates of Economics & Statistics</option>
                  <option value="Junior Statistical Officers (2023 Batch)">Junior Statistical Officers (2023 Batch)</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block mb-1">Target Completion Due Date</label>
                <input
                  type="date"
                  value={newDueDate}
                  onChange={e => setNewDueDate(e.target.value)}
                  className="w-full rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 px-3 py-2 text-xs text-slate-900 dark:text-white focus:border-amber-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsCreatingNew(false)}
                className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-100 dark:bg-slate-900 px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 px-5 py-2 text-xs font-extrabold text-slate-950 shadow-md shadow-amber-500/20"
              >
                <Send className="h-3.5 w-3.5" />
                <span>Dispatch to Cadre</span>
              </button>
            </div>
          </motion.form>
        )}
      </div>

      {/* Active Cadre Assignments List */}
      <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-950/80 p-6 backdrop-blur-xl shadow-xl dark:shadow-2xl transition-colors">
        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Users className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          Active Cadre Cohorts & Compliance Tracking
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assignments.map(asg => (
            <div key={asg.id} className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/60 p-4 space-y-3 shadow-sm">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-xs font-bold text-slate-900 dark:text-white block">{asg.title}</span>
                  <span className="text-[11px] text-amber-700 dark:text-amber-300 font-medium">{asg.assignedToCadre}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30">
                  {asg.status}
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                  <span>Batch Completion Rate</span>
                  <span className="font-mono font-bold text-cyan-700 dark:text-cyan-300">{asg.completionRate}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-emerald-500"
                    style={{ width: `${asg.completionRate}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 border-t border-slate-200 dark:border-white/5 pt-2">
                <span className="flex items-center gap-1">
                  <Users className="h-3 w-3 text-slate-400" />
                  {asg.totalEnrolled} Officers Enrolled
                </span>
                <span className="flex items-center gap-1 text-slate-700 dark:text-slate-300 font-mono">
                  <Calendar className="h-3 w-3 text-amber-500 dark:text-amber-400" />
                  Due {asg.dueDate}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
