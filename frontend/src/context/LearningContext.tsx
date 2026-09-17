import React, { createContext, useContext, useState, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import { useAuth } from './AuthContext';

export interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'karmayogi';
  title: string;
  message: string;
  timestamp: string;
}

interface LearningContextType {
  toasts: ToastNotification[];
  addToast: (title: string, message: string, type?: ToastNotification['type']) => void;
  removeToast: (id: string) => void;
  isQuizModalOpen: boolean;
  openQuizModal: (sampleDocId?: string) => void;
  closeQuizModal: () => void;
  selectedDocForQuiz?: string;
  simulateCourseCompletion: (courseId: string, gainPoints: number, targetDomain: string, courseTitle: string) => Promise<void>;
  completedCourseIds: string[];
  triggerCelebration: () => void;
}

const LearningContext = createContext<LearningContextType | undefined>(undefined);

export const LearningProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { currentOfficial, updateCurrentOfficial } = useAuth();
  const [toasts, setToasts] = useState<ToastNotification[]>([
    {
      id: 'init-toast-1',
      type: 'karmayogi',
      title: 'iGOT Karmayogi Sync Active',
      message: 'Your official statistical competency profile is synchronized with CBC & NSSTA records.',
      timestamp: 'Just now'
    }
  ]);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);
  const [selectedDocForQuiz, setSelectedDocForQuiz] = useState<string | undefined>(undefined);
  const [completedCourseIds, setCompletedCourseIds] = useState<string[]>([]);

  const addToast = (title: string, message: string, type: ToastNotification['type'] = 'info') => {
    const newToast: ToastNotification = {
      id: 'toast-' + Date.now(),
      type,
      title,
      message,
      timestamp: 'Just now'
    };
    setToasts(prev => [newToast, ...prev.slice(0, 4)]);
    setTimeout(() => {
      removeToast(newToast.id);
    }, 6000);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const triggerCelebration = () => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#06B6D4', '#10B981', '#F59E0B', '#FF9933', '#3B82F6']
    });
  };

  const openQuizModal = (sampleDocId?: string) => {
    setSelectedDocForQuiz(sampleDocId);
    setIsQuizModalOpen(true);
  };

  const closeQuizModal = () => {
    setIsQuizModalOpen(false);
    setSelectedDocForQuiz(undefined);
  };

  const simulateCourseCompletion = async (
    courseId: string,
    gainPoints: number,
    targetDomain: string,
    courseTitle: string
  ) => {
    try {
      // Call backend simulation endpoint
      const response = await fetch(`/api/officials/${currentOfficial.id}/simulate-completion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ courseId, scoreBoost: gainPoints })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.updatedOfficial) {
          updateCurrentOfficial(data.updatedOfficial);
        }
      } else {
        // Local fallback if backend is offline
        const updated = { ...currentOfficial };
        updated.competencies = updated.competencies.map(c => {
          if (c.domainId === targetDomain) {
            return {
              ...c,
              overallScore: Math.min(100, c.overallScore + gainPoints),
              skills: c.skills.map(s => ({ ...s, score: Math.min(100, s.score + gainPoints) }))
            };
          }
          return c;
        });
        updated.coursesCompletedCount += 1;
        updated.learningHoursCompleted += 12;
        updateCurrentOfficial(updated);
      }

      setCompletedCourseIds(prev => [...prev, courseId]);
      triggerCelebration();
      addToast(
        'Competency DNA Leveled Up! 🎉',
        `Completed "${courseTitle}". +${gainPoints}% score added to ${targetDomain.toUpperCase()} domain.`,
        'success'
      );
    } catch (err) {
      // Fallback
      setCompletedCourseIds(prev => [...prev, courseId]);
      triggerCelebration();
      addToast(
        'Competency DNA Leveled Up! 🎉',
        `Completed "${courseTitle}". +${gainPoints}% score boosted!`,
        'success'
      );
    }
  };

  return (
    <LearningContext.Provider value={{
      toasts,
      addToast,
      removeToast,
      isQuizModalOpen,
      openQuizModal,
      closeQuizModal,
      selectedDocForQuiz,
      simulateCourseCompletion,
      completedCourseIds,
      triggerCelebration
    }}>
      {children}
    </LearningContext.Provider>
  );
};

export const useLearning = () => {
  const context = useContext(LearningContext);
  if (!context) throw new Error('useLearning must be used within a LearningProvider');
  return context;
};
