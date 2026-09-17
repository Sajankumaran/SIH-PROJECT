import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GeneratedQuiz, SampleDocument } from '../../types/index';
import { useLanguage } from '../../context/LanguageContext';
import { useLearning } from '../../context/LearningContext';
import { 
  FileText, 
  UploadCloud, 
  Sparkles, 
  Cpu, 
  Play, 
  X, 
  HelpCircle, 
  Award, 
  Timer, 
  ChevronRight, 
  Check, 
  AlertCircle 
} from 'lucide-react';

export const QuizGeneratorModal: React.FC = () => {
  const { language, t } = useLanguage();
  const { isQuizModalOpen, closeQuizModal, selectedDocForQuiz, triggerCelebration, addToast } = useLearning();

  const [step, setStep] = useState<'upload' | 'scanning' | 'review' | 'play' | 'result'>('upload');
  const [sampleDocuments, setSampleDocuments] = useState<SampleDocument[]>([]);
  const [selectedDocId, setSelectedDocId] = useState<string>('doc-nsso-79');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  
  // Scanning animation states
  const [scanProgress, setScanProgress] = useState(0);
  const [scanStepIndex, setScanStepIndex] = useState(0);
  const [generatedQuiz, setGeneratedQuiz] = useState<GeneratedQuiz | null>(null);

  // Play quiz runner states
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [userScore, setUserScore] = useState(0);
  const [timerSeconds, setTimerSeconds] = useState(0);

  const SCAN_STAGES = [
    { title: 'Document Tokenization & Semantic Chunking', desc: 'Parsing 38 pages of official MoSPI field instructions' },
    { title: 'Statistical Concept & Formula Extraction', desc: 'Identified: FSUs, PPS Sampling, Hamlet-Groups, CAPI Rules' },
    { title: 'Bloom\'s Taxonomy Question Synthesis', desc: 'Generating Tiered MCQs: Recall, Application & Analysis' },
    { title: 'Answer Key & Explainability Verification', desc: 'Finalizing pedagogical explanations & Cadre Skill Tags' }
  ];

  useEffect(() => {
    fetch('/api/documents/samples')
      .then(res => res.json())
      .then(data => {
        if (data && data.success && Array.isArray(data.data)) {
          setSampleDocuments(data.data);
          if (selectedDocForQuiz) {
            setSelectedDocId(selectedDocForQuiz);
          }
        }
      })
      .catch(() => {});
  }, [selectedDocForQuiz]);

  useEffect(() => {
    let interval: any;
    if (step === 'scanning') {
      setScanProgress(0);
      setScanStepIndex(0);

      interval = setInterval(() => {
        setScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setStep('review');
            }, 600);
            return 100;
          }
          const next = prev + 4;
          if (next > 25 && next < 50) setScanStepIndex(1);
          else if (next >= 50 && next < 75) setScanStepIndex(2);
          else if (next >= 75) setScanStepIndex(3);
          return next;
        });
      }, 90);
    }
    return () => clearInterval(interval);
  }, [step]);

  useEffect(() => {
    let timer: any;
    if (step === 'play') {
      timer = setInterval(() => {
        setTimerSeconds(s => s + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [step]);

  if (!isQuizModalOpen) return null;

  const handleStartGeneration = async () => {
    setStep('scanning');

    try {
      let response;
      if (uploadedFile) {
        const formData = new FormData();
        formData.append('documentFile', uploadedFile);
        formData.append('title', uploadedFile.name);
        response = await fetch('/api/quiz/generate', {
          method: 'POST',
          body: formData
        });
      } else {
        response = await fetch('/api/quiz/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sampleDocId: selectedDocId })
        });
      }

      const result = await response.json();
      if (result.success && result.data) {
        setGeneratedQuiz(result.data);
      }
    } catch (e) {}
  };

  const handleStartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswerSubmitted(false);
    setUserScore(0);
    setTimerSeconds(0);
    setStep('play');
  };

  const handleSelectOption = (index: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null || !generatedQuiz) return;
    setIsAnswerSubmitted(true);

    const currentQ = generatedQuiz.questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQ.correctOptionIndex;

    if (isCorrect) {
      setUserScore(prev => prev + currentQ.points);
    }
  };

  const handleNextQuestion = () => {
    if (!generatedQuiz) return;
    if (currentQuestionIndex < generatedQuiz.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswerSubmitted(false);
    } else {
      setStep('result');
      triggerCelebration();
      addToast(
        'Quiz Completed! 🏆',
        `Scored ${userScore + (selectedAnswer === generatedQuiz.questions[currentQuestionIndex].correctOptionIndex ? generatedQuiz.questions[currentQuestionIndex].points : 0)} / ${generatedQuiz.totalPoints} points. +6% DNA Score Boost added to Statistical Domain!`,
        'success'
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-3xl rounded-2xl border border-slate-200 dark:border-white/15 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden my-8 transition-colors"
      >
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/80 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400">
              <FileText className="h-4 w-4" />
            </span>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                {t('instantQuizTitle')}
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                MoSPI Automated Competency Assessment Engine (Bloom's Taxonomy Tiered)
              </p>
            </div>
          </div>

          <button
            onClick={closeQuizModal}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-white/10 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* BODY CONTAINER */}
        <div className="p-6">
          
          {/* ================= STEP 1: UPLOAD / SELECT DOCUMENT ================= */}
          {step === 'upload' && (
            <div className="space-y-6">
              
              {/* Drag & Drop File Upload Area */}
              <div
                className="relative rounded-2xl border-2 border-dashed border-cyan-500/40 bg-cyan-50/50 dark:bg-cyan-950/10 p-6 text-center hover:border-cyan-500/70 transition-all cursor-pointer group"
                onClick={() => document.getElementById('manual-upload-input')?.click()}
              >
                <input
                  id="manual-upload-input"
                  type="file"
                  accept=".pdf,.pptx,.docx,.txt"
                  className="hidden"
                  onChange={e => {
                    if (e.target.files && e.target.files[0]) {
                      setUploadedFile(e.target.files[0]);
                    }
                  }}
                />

                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 rounded-full bg-cyan-500/10 dark:bg-cyan-500/20 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <UploadCloud className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                    {uploadedFile ? uploadedFile.name : 'Upload Official Statistical Document (PDF, PPTX, DOCX)'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
                    {uploadedFile 
                      ? `${(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB • Ready for AI Semantic Parsing`
                      : 'Drag and drop any MoSPI survey schedule, manual, or guidelines (Max 50MB)'}
                  </p>
                </div>
              </div>

              {/* Sample Preloaded MoSPI Manuals (1-Click Test Drive) */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                    <Sparkles className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400" />
                    Or Select Preloaded MoSPI / NSSO Manual (1-Click Demo)
                  </span>
                  <span className="text-[10px] text-cyan-600 dark:text-cyan-400 font-mono">3 manuals available</span>
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {sampleDocuments.map(doc => (
                    <button
                      key={doc.id}
                      onClick={() => {
                        setSelectedDocId(doc.id);
                        setUploadedFile(null);
                      }}
                      className={`flex items-start gap-3 rounded-xl p-3 text-left transition-all border ${
                        selectedDocId === doc.id && !uploadedFile
                          ? 'border-cyan-500 bg-cyan-50 dark:border-cyan-500/60 dark:bg-cyan-500/10 shadow-md shadow-cyan-500/10'
                          : 'border-slate-200 dark:border-white/5 bg-slate-50 dark:bg-slate-950/60 hover:bg-slate-100 dark:hover:bg-white/5'
                      }`}
                    >
                      <div className="h-8 w-8 rounded-lg bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                        <FileText className="h-4 w-4 text-cyan-700 dark:text-cyan-300" />
                      </div>
                      <div className="overflow-hidden flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-slate-900 dark:text-white truncate">{doc.title}</span>
                          <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 shrink-0">{doc.fileSize}</span>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">{doc.summary}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="flex justify-end pt-2">
                <button
                  onClick={handleStartGeneration}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 px-6 py-2.5 text-xs font-extrabold text-white shadow-lg shadow-cyan-500/25 transition-all"
                >
                  <Cpu className="h-4 w-4 animate-spin-slow" />
                  <span>{t('generateQuizBtn')}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

            </div>
          )}

          {/* ================= STEP 2: HIGH-TECH AI DOCUMENT SCANNER ANIMATION ================= */}
          {step === 'scanning' && (
            <div className="py-8 space-y-6 text-center">
              
              {/* Animated Laser Scanning Box */}
              <div className="relative mx-auto w-64 h-48 rounded-2xl border border-cyan-500/40 bg-slate-900 dark:bg-slate-950 p-4 overflow-hidden shadow-2xl shadow-cyan-500/20 flex flex-col justify-between">
                
                {/* Laser line moving vertically */}
                <div 
                  className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#06B6D4] z-20"
                  style={{ top: `${scanProgress}%` }}
                />

                {/* Wireframe document lines */}
                <div className="space-y-2 opacity-40 text-left">
                  <div className="h-3 w-3/4 rounded bg-cyan-400" />
                  <div className="h-2 w-full rounded bg-slate-500" />
                  <div className="h-2 w-5/6 rounded bg-slate-500" />
                  <div className="h-2 w-4/5 rounded bg-slate-500" />
                  <div className="h-3 w-1/2 rounded bg-amber-400 mt-3" />
                  <div className="h-2 w-full rounded bg-slate-500" />
                  <div className="h-2 w-3/4 rounded bg-slate-500" />
                </div>

                <div className="flex items-center justify-between text-[10px] font-mono text-cyan-400 border-t border-white/10 pt-2 z-10">
                  <span>PARSING: 38 PAGES</span>
                  <span>{scanProgress}%</span>
                </div>
              </div>

              {/* Step indicator */}
              <div className="space-y-2 max-w-md mx-auto">
                <div className="flex items-center justify-center gap-2 text-cyan-600 dark:text-cyan-300 font-bold text-sm">
                  <Cpu className="h-4 w-4 animate-spin" />
                  <span>{SCAN_STAGES[scanStepIndex].title}</span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {SCAN_STAGES[scanStepIndex].desc}
                </p>

                {/* Progress bar */}
                <div className="h-1.5 w-full rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden mt-3">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-500 via-teal-400 to-amber-400 transition-all duration-150"
                    style={{ width: `${scanProgress}%` }}
                  />
                </div>
              </div>

              {/* Floating Extracted Keywords */}
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {['Multi-stage Stratified Sampling', 'Hamlet-Groups (hg)', 'CAPI Tablets', 'Bloom Level: Application', 'SDRD Kolkata Standards'].map((kw, i) => (
                  <span
                    key={i}
                    className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-700 dark:text-cyan-300 border border-cyan-500/20 animate-pulse"
                  >
                    + {kw}
                  </span>
                ))}
              </div>

            </div>
          )}

          {/* ================= STEP 3: REVIEW AUTO-GENERATED MCQs ================= */}
          {step === 'review' && generatedQuiz && (
            <div className="space-y-5">
              
              <div className="flex items-center justify-between rounded-xl bg-cyan-50 dark:bg-cyan-500/10 border border-cyan-500/30 p-3">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">{generatedQuiz.documentTitle}</h4>
                  <p className="text-[10px] text-cyan-700 dark:text-cyan-300 font-mono">
                    5 Questions Synthesized in {generatedQuiz.processingTimeSeconds}s • {generatedQuiz.totalPoints} Total Marks
                  </p>
                </div>
                <button
                  onClick={handleStartQuiz}
                  className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2 text-xs font-extrabold text-white shadow-lg shadow-emerald-500/20 hover:from-emerald-400 hover:to-teal-500 transition-all active:scale-95"
                >
                  <Play className="h-3.5 w-3.5 fill-white" />
                  <span>{t('launchQuiz')}</span>
                </button>
              </div>

              {/* Question list preview */}
              <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1">
                {generatedQuiz.questions.map((q, idx) => (
                  <div key={q.id} className="rounded-xl border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/70 p-4 space-y-2.5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400">
                        Q{idx + 1} • {q.competencySkillTag}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 font-semibold border border-amber-500/30">
                          {q.bloomsLevel}
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">+{q.points} pts</span>
                      </div>
                    </div>

                    <p className="text-xs font-semibold text-slate-900 dark:text-white leading-relaxed">
                      {language === 'hi' && q.questionHi ? q.questionHi : q.question}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pt-1">
                      {q.options.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={`text-[11px] p-2 rounded-lg border ${
                            oIdx === q.correctOptionIndex
                              ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-700 dark:text-emerald-300 font-medium'
                              : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-white/5 text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <span className="font-mono text-slate-400 mr-1.5">{String.fromCharCode(65 + oIdx)}.</span>
                          {language === 'hi' && q.optionsHi ? q.optionsHi[oIdx] : opt}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ================= STEP 4: INTERACTIVE QUIZ RUNNER (PLAY MODE) ================= */}
          {step === 'play' && generatedQuiz && (
            <div className="space-y-6">
              
              {/* Question Header & Live Progress */}
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-lg bg-cyan-500/10 dark:bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/30">
                    Question {currentQuestionIndex + 1} of {generatedQuiz.questions.length}
                  </span>
                  <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                    Bloom: {generatedQuiz.questions[currentQuestionIndex].bloomsLevel}
                  </span>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                    <Timer className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
                    <span>{Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}</span>
                  </div>
                  <div className="text-emerald-600 dark:text-emerald-400 font-bold">
                    Score: {userScore} pts
                  </div>
                </div>
              </div>

              {/* Current Question Body */}
              <div className="space-y-4">
                <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                  {language === 'hi' && generatedQuiz.questions[currentQuestionIndex].questionHi
                    ? generatedQuiz.questions[currentQuestionIndex].questionHi
                    : generatedQuiz.questions[currentQuestionIndex].question}
                </h4>

                {/* Options List */}
                <div className="space-y-2.5">
                  {generatedQuiz.questions[currentQuestionIndex].options.map((option, idx) => {
                    const currentQ = generatedQuiz.questions[currentQuestionIndex];
                    const isSelected = selectedAnswer === idx;
                    const isCorrect = idx === currentQ.correctOptionIndex;

                    let optionStyle = 'border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-950/80 text-slate-800 dark:text-slate-200 hover:border-cyan-500/40 hover:bg-white dark:hover:bg-slate-900';

                    if (isAnswerSubmitted) {
                      if (isCorrect) {
                        optionStyle = 'border-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-200 font-bold';
                      } else if (isSelected && !isCorrect) {
                        optionStyle = 'border-red-500 bg-red-500/10 dark:bg-red-500/20 text-red-800 dark:text-red-200 font-bold';
                      } else {
                        optionStyle = 'opacity-40 border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-slate-950';
                      }
                    } else if (isSelected) {
                      optionStyle = 'border-cyan-500 bg-cyan-50 dark:bg-cyan-500/20 text-cyan-900 dark:text-cyan-200 font-semibold ring-1 ring-cyan-500/50';
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(idx)}
                        disabled={isAnswerSubmitted}
                        className={`w-full text-left p-3.5 rounded-xl border transition-all flex items-center justify-between gap-3 text-xs sm:text-sm ${optionStyle}`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="font-mono text-xs text-slate-500 dark:text-slate-400 font-bold px-1.5 py-0.5 rounded bg-slate-200 dark:bg-white/5">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>
                            {language === 'hi' && currentQ.optionsHi ? currentQ.optionsHi[idx] : option}
                          </span>
                        </div>

                        {isAnswerSubmitted && isCorrect && (
                          <Check className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        )}
                        {isAnswerSubmitted && isSelected && !isCorrect && (
                          <AlertCircle className="h-5 w-5 text-red-500 dark:text-red-400 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Instant Pedagogical Explanation Box upon Submit */}
                {isAnswerSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-xl border border-cyan-500/30 bg-cyan-50/60 dark:bg-gradient-to-r dark:from-cyan-950/40 dark:to-slate-900 p-4 space-y-1.5"
                  >
                    <div className="flex items-center gap-1.5 text-xs font-bold text-cyan-800 dark:text-cyan-300 uppercase tracking-wider">
                      <HelpCircle className="h-3.5 w-3.5" />
                      MoSPI Official Explanation
                    </div>
                    <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
                      {language === 'hi' && generatedQuiz.questions[currentQuestionIndex].explanationHi
                        ? generatedQuiz.questions[currentQuestionIndex].explanationHi
                        : generatedQuiz.questions[currentQuestionIndex].explanation}
                    </p>
                  </motion.div>
                )}

              </div>

              {/* Bottom Footer Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-white/10">
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Target Competency: <span className="text-cyan-700 dark:text-cyan-300 font-semibold">{generatedQuiz.questions[currentQuestionIndex].competencySkillTag}</span>
                </span>

                {!isAnswerSubmitted ? (
                  <button
                    onClick={handleSubmitAnswer}
                    disabled={selectedAnswer === null}
                    className="rounded-xl bg-cyan-600 dark:bg-cyan-500 hover:bg-cyan-500 text-white dark:text-slate-950 font-extrabold px-5 py-2 text-xs transition-all"
                  >
                    Check Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNextQuestion}
                    className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-5 py-2 text-xs font-extrabold text-white shadow-lg shadow-emerald-500/20"
                  >
                    <span>{currentQuestionIndex < generatedQuiz.questions.length - 1 ? 'Next Question' : 'Finish Assessment'}</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                )}
              </div>

            </div>
          )}

          {/* ================= STEP 5: FINAL CELEBRATORY RESULT & DNA LEVEL UP ================= */}
          {step === 'result' && generatedQuiz && (
            <div className="py-6 space-y-6 text-center">
              
              <div className="relative mx-auto h-24 w-24 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center shadow-2xl shadow-amber-500/30">
                <Award className="h-12 w-12 text-slate-950 animate-bounce" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  Assessment Completed! 🎉
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300">
                  {generatedQuiz.documentTitle}
                </p>
              </div>

              {/* Scorecard Box */}
              <div className="grid grid-cols-3 gap-3 max-w-md mx-auto">
                <div className="rounded-xl bg-slate-50 dark:bg-slate-950 p-3 border border-slate-200 dark:border-white/10 shadow-sm">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase">Final Score</span>
                  <span className="text-xl font-extrabold text-cyan-600 dark:text-cyan-400 font-mono">{userScore} / {generatedQuiz.totalPoints}</span>
                </div>
                <div className="rounded-xl bg-slate-50 dark:bg-slate-950 p-3 border border-slate-200 dark:border-white/10 shadow-sm">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase">Time Taken</span>
                  <span className="text-xl font-extrabold text-slate-700 dark:text-slate-200 font-mono">{timerSeconds}s</span>
                </div>
                <div className="rounded-xl bg-emerald-50 dark:bg-slate-950 p-3 border border-emerald-500/30 dark:bg-emerald-500/10 shadow-sm">
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 block uppercase font-bold">DNA Boost</span>
                  <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-300 font-mono">+6% STAT</span>
                </div>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={closeQuizModal}
                  className="rounded-xl bg-cyan-600 dark:bg-cyan-500 hover:bg-cyan-500 text-white dark:text-slate-950 font-extrabold px-6 py-2.5 text-xs shadow-lg shadow-cyan-500/20"
                >
                  Return to Dashboard & View Updated DNA
                </button>
              </div>

            </div>
          )}

        </div>

      </motion.div>

    </div>
  );
};
