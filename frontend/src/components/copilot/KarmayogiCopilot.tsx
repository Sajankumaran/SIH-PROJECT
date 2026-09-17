import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useLearning } from '../../context/LearningContext';
import { Course } from '../../types/index';
import { 
  Sparkles, 
  X, 
  Send, 
  Bot, 
  User, 
  Zap 
} from 'lucide-react';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  text: string;
  recommendedCourses?: Course[];
  suggestedActions?: {
    label: string;
    actionType: string;
    payload: string;
  }[];
}

export const KarmayogiCopilot: React.FC = () => {
  const { currentOfficial } = useAuth();
  const { language } = useLanguage();
  const { openQuizModal, simulateCourseCompletion } = useLearning();

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-msg-1',
      sender: 'assistant',
      timestamp: 'Just now',
      text: `Namaste **${currentOfficial.name}**! I'm your **Karmayogi AI Sahayak**. I've analyzed your Competency DNA against your **${currentOfficial.designation}** benchmark. How can I assist your statistical learning journey today?`,
      suggestedActions: [
        { label: 'What should I learn next?', actionType: 'query', payload: 'What should I learn next?' },
        { label: 'Explain my Competency DNA gaps', actionType: 'query', payload: 'Explain my Competency DNA gaps' },
        { label: 'DPDP Act 2023 Survey Rules', actionType: 'query', payload: 'DPDP Act 2023 Survey Rules' }
      ]
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (queryText?: string) => {
    const textToSend = queryText || inputValue;
    if (!textToSend.trim()) return;

    const userMsg: ChatMessage = {
      id: 'user-' + Date.now(),
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      text: textToSend
    };

    setMessages(prev => [...prev, userMsg]);
    if (!queryText) setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/copilot/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: textToSend,
          officialId: currentOfficial.id,
          language
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data.data) {
          setMessages(prev => [...prev, {
            id: data.data.id || 'bot-' + Date.now(),
            sender: 'assistant',
            timestamp: data.data.timestamp || 'Just now',
            text: language === 'hi' && data.data.textHi ? data.data.textHi : data.data.text,
            recommendedCourses: data.data.recommendedCourses,
            suggestedActions: data.data.suggestedActions
          }]);
        }
      }
    } catch (err) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: 'bot-' + Date.now(),
          sender: 'assistant',
          timestamp: 'Just now',
          text: `Based on your **${currentOfficial.cadre}** framework, completing advanced multi-stage sampling and X-13ARIMA seasonal adjustment will elevate your score by +18% on the Competency DNA radar.`,
          suggestedActions: [
            { label: 'Open NSS 79th Round Quiz', actionType: 'open_quiz', payload: 'doc-nsso-79' }
          ]
        }]);
      }, 500);
    } finally {
      setIsLoading(false);
    }
  };

  const handleActionClick = (action: any) => {
    if (action.actionType === 'query') {
      handleSendMessage(action.payload);
    } else if (action.actionType === 'open_quiz') {
      openQuizModal(action.payload);
      setIsOpen(false);
    } else if (action.actionType === 'open_course') {
      const course = messages
        .flatMap(m => m.recommendedCourses || [])
        .find(c => c.id === action.payload);
      if (course) {
        simulateCourseCompletion(course.id, course.competencyDelta.gainPoints, course.competencyDelta.domainId, course.title);
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      
      {/* Floating Toggle Button with Glowing AI Badge */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 rounded-full bg-gradient-to-r from-cyan-500 via-teal-500 to-blue-600 p-3.5 sm:px-5 sm:py-3.5 text-slate-950 font-extrabold shadow-2xl shadow-cyan-500/40 border border-white/20"
        >
          <div className="relative flex items-center justify-center">
            <Sparkles className="h-5 w-5 animate-spin-slow text-slate-950" />
            <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-amber-400 animate-ping" />
          </div>
          <span className="hidden sm:inline text-xs tracking-tight">Karmayogi AI Sahayak</span>
        </motion.button>
      )}

      {/* Expandable Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="w-[360px] sm:w-[420px] h-[540px] rounded-2xl border border-slate-200 dark:border-cyan-500/30 bg-white/95 dark:bg-slate-950/95 shadow-2xl backdrop-blur-2xl flex flex-col overflow-hidden transition-colors"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/90 p-3.5">
              <div className="flex items-center gap-2.5">
                <div className="h-8 w-8 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/20 border border-cyan-500/30 dark:border-cyan-500/40 flex items-center justify-center text-cyan-600 dark:text-cyan-300">
                  <Bot className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
                    Karmayogi AI Sahayak
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400 animate-pulse" />
                  </h4>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">Context: {currentOfficial.designation}</span>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 text-xs">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${
                    msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                      msg.sender === 'user'
                        ? 'bg-cyan-600 dark:bg-cyan-500 text-white dark:text-slate-950 font-bold'
                        : 'bg-slate-100 dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 border border-slate-200 dark:border-cyan-500/30'
                    }`}
                  >
                    {msg.sender === 'user' ? <User className="h-3 w-3" /> : <Bot className="h-3 w-3" />}
                  </div>

                  <div
                    className={`max-w-[80%] rounded-2xl p-3 leading-relaxed shadow-sm ${
                      msg.sender === 'user'
                        ? 'bg-cyan-600 dark:bg-cyan-500 text-white dark:text-slate-950 font-medium rounded-tr-none'
                        : 'bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 rounded-tl-none'
                    }`}
                  >
                    <div className="whitespace-pre-line">{msg.text}</div>

                    {/* Course Recommendation Action Card embedded in Chat */}
                    {msg.recommendedCourses && msg.recommendedCourses.length > 0 && (
                      <div className="mt-2 space-y-1.5 border-t border-slate-200 dark:border-white/10 pt-2">
                        {msg.recommendedCourses.map(course => (
                          <div
                            key={course.id}
                            className="rounded-lg bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 p-2 text-[11px] space-y-1 shadow-sm"
                          >
                            <span className="font-bold text-cyan-700 dark:text-cyan-300 block">{course.title}</span>
                            <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
                              <span>{course.durationHours} hrs • {course.provider}</span>
                              <span className="text-emerald-600 dark:text-emerald-400 font-mono">+{course.competencyDelta.gainPoints}% Boost</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Suggested Action Chips */}
                    {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                      <div className="mt-2.5 flex flex-wrap gap-1.5 pt-1">
                        {msg.suggestedActions.map((act, aIdx) => (
                          <button
                            key={aIdx}
                            onClick={() => handleActionClick(act)}
                            className="flex items-center gap-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 px-2.5 py-1 text-[10px] font-semibold text-cyan-700 dark:text-cyan-300 hover:bg-cyan-500/20 transition-all text-left"
                          >
                            <Zap className="h-2.5 w-2.5 shrink-0" />
                            <span>{act.label}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-center gap-2 text-slate-400 text-xs italic py-1">
                  <Sparkles className="h-3.5 w-3.5 animate-spin text-cyan-500" />
                  <span>Karmayogi AI is thinking...</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="p-3 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/90 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="Ask about MoSPI competencies, courses, or gaps..."
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                className="flex-1 rounded-xl bg-white dark:bg-slate-950 border border-slate-200 dark:border-white/10 px-3 py-2 text-xs text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:border-cyan-500 focus:outline-none shadow-sm"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="h-8 w-8 rounded-xl bg-cyan-600 dark:bg-cyan-500 hover:bg-cyan-500 text-white dark:text-slate-950 flex items-center justify-center disabled:opacity-40 transition-all shrink-0 font-bold"
              >
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
