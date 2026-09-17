import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useLearning } from '../../context/LearningContext';
import { useTheme, ThemeMode } from '../../context/ThemeContext';
import { 
  Sparkles, 
  Languages, 
  Bell, 
  ChevronDown, 
  UserCheck, 
  Award, 
  FileText, 
  GraduationCap, 
  Building2, 
  CheckCircle2, 
  Flame,
  Sun,
  Moon,
  Laptop,
  Check
} from 'lucide-react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const { currentOfficial, allOfficials, switchOfficial, switchRole } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { toasts, removeToast, openQuizModal } = useLearning();
  const { theme, resolvedTheme, setTheme } = useTheme();

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [isThemeDropdownOpen, setIsThemeDropdownOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  const getThemeIcon = () => {
    if (theme === 'system') return <Laptop className="h-3.5 w-3.5 text-cyan-500 dark:text-cyan-400" />;
    if (theme === 'dark') return <Moon className="h-3.5 w-3.5 text-cyan-400" />;
    return <Sun className="h-3.5 w-3.5 text-amber-500" />;
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 dark:border-white/10 bg-white/90 dark:bg-[#070A13]/90 backdrop-blur-xl transition-colors duration-200">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo & Gov Identity */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate('landing')}>
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[1px] shadow-lg shadow-cyan-500/20">
            <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-white dark:bg-[#070A13]">
              <Sparkles className="h-5 w-5 text-cyan-500 dark:text-cyan-400 animate-pulse-slow" />
            </div>
            <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-amber-400 ring-2 ring-white dark:ring-[#070A13]" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                <span className="bg-gradient-to-r from-cyan-600 via-teal-600 to-amber-500 dark:from-cyan-400 dark:via-teal-300 dark:to-amber-300 bg-clip-text text-transparent">
                  {t('brandTitle')}
                </span>
                <span className="text-xs uppercase tracking-widest px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-white/10 text-cyan-700 dark:text-cyan-300 font-mono font-medium border border-slate-200 dark:border-transparent">
                  GovTech 2.0
                </span>
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium tracking-wide">
              {language === 'hi' ? 'सांख्यिकी एवं कार्यक्रम कार्यान्वयन मंत्रालय (MoSPI)' : 'Ministry of Statistics & Programme Implementation (MoSPI)'}
            </p>
          </div>
        </div>

        {/* Center Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 rounded-full border border-slate-200 dark:border-white/10 bg-slate-100/80 dark:bg-slate-900/60 p-1 backdrop-blur-md">
          <button
            onClick={() => onNavigate('student')}
            className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
              currentView === 'student'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/25'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/5'
            }`}
          >
            <GraduationCap className="h-3.5 w-3.5" />
            <span>Student Portal</span>
          </button>

          <button
            onClick={() => onNavigate('learner')}
            className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
              currentView === 'learner'
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md shadow-blue-500/25'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/5'
            }`}
          >
            <UserCheck className="h-3.5 w-3.5" />
            <span>Officer Learner</span>
          </button>

          <button
            onClick={() => onNavigate('trainer')}
            className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
              currentView === 'trainer'
                ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md shadow-amber-500/25'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/5'
            }`}
          >
            <Sparkles className="h-3.5 w-3.5" />
            <span>NSSTA Trainer</span>
          </button>

          <button
            onClick={() => onNavigate('admin')}
            className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${
              currentView === 'admin'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-md shadow-emerald-500/25'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white dark:hover:bg-white/5'
            }`}
          >
            <Building2 className="h-3.5 w-3.5" />
            <span>MoSPI Apex</span>
          </button>
        </nav>

        {/* Right Action Bar */}
        <div className="flex items-center gap-2.5">

          {/* Instant Quiz Generator CTA Button */}
          <button
            onClick={() => openQuizModal()}
            className="hidden sm:flex items-center gap-2 rounded-lg bg-amber-500/10 dark:bg-amber-500/20 border border-amber-500/40 px-3 py-1.5 text-xs font-bold text-amber-700 dark:text-amber-300 hover:bg-amber-500/20 dark:hover:bg-amber-500/30 hover:border-amber-500 transition-all shadow-sm"
          >
            <FileText className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400 animate-bounce" />
            <span>{t('navQuizGen')}</span>
            <span className="rounded bg-amber-500/20 dark:bg-amber-500/30 px-1 py-0.2 text-[9px] font-mono text-amber-700 dark:text-amber-200">AI</span>
          </button>

          {/* Theme Switcher Dropdown (Dark / Light / System) */}
          <div className="relative">
            <button
              onClick={() => setIsThemeDropdownOpen(!isThemeDropdownOpen)}
              title={`Theme: ${theme.toUpperCase()}`}
              className="flex items-center gap-1 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100/90 dark:bg-slate-900/80 p-2 text-slate-600 dark:text-slate-300 hover:border-cyan-500/50 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors"
            >
              {getThemeIcon()}
              <ChevronDown className="h-3 w-3 opacity-60" />
            </button>

            {isThemeDropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-slate-950 p-1.5 shadow-2xl backdrop-blur-2xl z-50">
                <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-white/10 mb-1">
                  Interface Theme
                </div>

                <button
                  onClick={() => { setTheme('dark'); setIsThemeDropdownOpen(false); }}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                    theme === 'dark'
                      ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-300'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Moon className="h-3.5 w-3.5 text-cyan-500 dark:text-cyan-400" />
                    Dark Mode
                  </span>
                  {theme === 'dark' && <Check className="h-3.5 w-3.5 text-cyan-500 dark:text-cyan-400" />}
                </button>

                <button
                  onClick={() => { setTheme('light'); setIsThemeDropdownOpen(false); }}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                    theme === 'light'
                      ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-300'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Sun className="h-3.5 w-3.5 text-amber-500" />
                    Light Mode
                  </span>
                  {theme === 'light' && <Check className="h-3.5 w-3.5 text-cyan-500 dark:text-cyan-400" />}
                </button>

                <button
                  onClick={() => { setTheme('system'); setIsThemeDropdownOpen(false); }}
                  className={`flex w-full items-center justify-between rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-colors ${
                    theme === 'system'
                      ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-300'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Laptop className="h-3.5 w-3.5 text-slate-500 dark:text-slate-400" />
                    System Default
                  </span>
                  {theme === 'system' && <Check className="h-3.5 w-3.5 text-cyan-500 dark:text-cyan-400" />}
                </button>
              </div>
            )}
          </div>

          {/* Language Switcher (EN / HI) */}
          <button
            onClick={toggleLanguage}
            title="Switch Language (English / हिन्दी)"
            className="flex items-center gap-1.5 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100/90 dark:bg-slate-900/80 px-2.5 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-300 hover:border-cyan-500/50 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors"
          >
            <Languages className="h-3.5 w-3.5 text-cyan-600 dark:text-cyan-400" />
            <span className="font-bold">{language === 'en' ? 'हिन्दी' : 'English'}</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
              className="relative rounded-lg border border-slate-200 dark:border-white/10 bg-slate-100/90 dark:bg-slate-900/80 p-2 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-white/20 hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              <Bell className="h-4 w-4" />
              {toasts.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[9px] font-bold text-white shadow-sm shadow-cyan-500">
                  {toasts.length}
                </span>
              )}
            </button>

            {isNotifDropdownOpen && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-slate-950 p-3 shadow-2xl backdrop-blur-2xl z-50">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/10 pb-2 mb-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Award className="h-3.5 w-3.5 text-cyan-500 dark:text-cyan-400" />
                    Karmayogi Learning Alerts
                  </span>
                  <span className="text-[10px] text-slate-400">{toasts.length} active</span>
                </div>

                <div className="max-h-60 space-y-2 overflow-y-auto">
                  {toasts.length === 0 ? (
                    <p className="text-center py-4 text-xs text-slate-400">No new notifications</p>
                  ) : (
                    toasts.map(toast => (
                      <div key={toast.id} className="relative rounded-lg bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-white/10 p-2.5 text-xs hover:border-cyan-500/40 transition-colors">
                        <button
                          onClick={() => removeToast(toast.id)}
                          className="absolute top-2 right-2 text-slate-400 hover:text-slate-900 dark:hover:text-white text-xs"
                        >
                          ✕
                        </button>
                        <div className="font-semibold text-cyan-700 dark:text-cyan-300 flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3 text-emerald-500 dark:text-emerald-400" />
                          {toast.title}
                        </div>
                        <p className="text-slate-600 dark:text-slate-300 mt-1 text-[11px] leading-relaxed">{toast.message}</p>
                        <span className="text-[9px] text-slate-400 dark:text-slate-500 mt-1 block">{toast.timestamp}</span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Role Switcher & User Profile (Mock SSO) */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center gap-2.5 rounded-lg border border-slate-200 dark:border-white/15 bg-slate-100/90 dark:bg-slate-900/90 px-2.5 py-1.5 hover:border-cyan-500/40 transition-all text-left"
            >
              <img
                src={currentOfficial.avatarUrl}
                alt={currentOfficial.name}
                className="h-7 w-7 rounded-full object-cover ring-1 ring-cyan-500/50"
              />
              <div className="hidden lg:block">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900 dark:text-white leading-none">
                    {language === 'hi' ? currentOfficial.nameHi : currentOfficial.name}
                  </span>
                  <span className={`text-[9px] px-1 py-0.2 rounded font-semibold ${
                    currentOfficial.role === 'admin'
                      ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/40'
                      : currentOfficial.role === 'trainer'
                      ? 'bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40'
                      : 'bg-cyan-500/20 text-cyan-700 dark:text-cyan-300 border border-cyan-500/40'
                  }`}>
                    {currentOfficial.role === 'learner' ? 'STUDENT' : currentOfficial.role.toUpperCase()}
                  </span>
                </div>
                {currentOfficial.role !== 'learner' && (
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block mt-0.5 leading-none">
                    {language === 'hi' ? currentOfficial.designationHi : currentOfficial.designation}
                  </span>
                )}
              </div>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400 ml-1" />
            </button>

            {/* Mock SSO Dropdown Panel */}
            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-xl border border-slate-200 dark:border-white/15 bg-white dark:bg-slate-950 p-3 shadow-2xl backdrop-blur-2xl z-50">
                <div className="border-b border-slate-100 dark:border-white/10 pb-2 mb-2">
                  <p className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                    {t('switchRole')}
                  </p>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">Select persona to simulate official experience</p>
                </div>

                {/* Role Switch Buttons */}
                <div className="grid grid-cols-4 gap-1 mb-3">
                  <button
                    onClick={() => { switchRole('student'); onNavigate('student'); setIsRoleDropdownOpen(false); }}
                    className="rounded-lg bg-cyan-500/15 border border-cyan-500/40 py-1.5 text-[10px] font-bold text-cyan-700 dark:text-cyan-300 hover:bg-cyan-500/25 text-center"
                  >
                    Student
                  </button>
                  <button
                    onClick={() => { switchRole('learner'); onNavigate('learner'); setIsRoleDropdownOpen(false); }}
                    className="rounded-lg bg-blue-500/15 border border-blue-500/40 py-1.5 text-[10px] font-bold text-blue-700 dark:text-blue-300 hover:bg-blue-500/25 text-center"
                  >
                    Officer
                  </button>
                  <button
                    onClick={() => { switchRole('trainer'); onNavigate('trainer'); setIsRoleDropdownOpen(false); }}
                    className="rounded-lg bg-amber-500/15 border border-amber-500/40 py-1.5 text-[10px] font-bold text-amber-700 dark:text-amber-300 hover:bg-amber-500/25 text-center"
                  >
                    Trainer
                  </button>
                  <button
                    onClick={() => { switchRole('admin'); onNavigate('admin'); setIsRoleDropdownOpen(false); }}
                    className="rounded-lg bg-emerald-500/15 border border-emerald-500/40 py-1.5 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 hover:bg-emerald-500/25 text-center"
                  >
                    Admin
                  </button>
                </div>

                {/* Officials Persona List */}
                <div className="space-y-1.5 max-h-56 overflow-y-auto">
                  {allOfficials.map(official => (
                    <button
                      key={official.id}
                      onClick={() => {
                        switchOfficial(official.id);
                        if (official.role === 'admin') onNavigate('admin');
                        else if (official.role === 'trainer') onNavigate('trainer');
                        else if (official.role === 'student') onNavigate('student');
                        else onNavigate('learner');
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`flex w-full items-center gap-2.5 rounded-lg p-2 text-left transition-colors ${
                        currentOfficial.id === official.id
                          ? 'bg-cyan-500/20 border border-cyan-500/50 text-slate-900 dark:text-white'
                          : 'hover:bg-slate-100 dark:hover:bg-white/5 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <img
                        src={official.avatarUrl}
                        alt={official.name}
                        className="h-8 w-8 rounded-full object-cover"
                      />
                      <div className="overflow-hidden">
                        <div className="text-xs font-bold truncate">
                          {language === 'hi' ? official.nameHi : official.name}
                        </div>
                        <div className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                          {official.role === 'student'
                            ? <span className="text-cyan-600 dark:text-cyan-400 font-bold">Student Scholar (ISI / DU)</span>
                            : official.role === 'learner'
                            ? <span className="text-blue-600 dark:text-blue-400 font-semibold">{official.designation} • ISS</span>
                            : `${language === 'hi' ? official.designationHi : official.designation} • ${official.department.split(',')[0]}`
                          }
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Streak Badge */}
                <div className="mt-3 flex items-center justify-between rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-2 text-xs">
                  <span className="flex items-center gap-1 text-amber-600 dark:text-amber-400 font-semibold">
                    <Flame className="h-3.5 w-3.5 fill-amber-500 dark:fill-amber-400" />
                    {currentOfficial.learningStreakDays} Day Streak
                  </span>
                  <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                    {currentOfficial.learningHoursCompleted} hrs on iGOT
                  </span>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
