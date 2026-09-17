import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { AdminPredictiveRadar } from '../components/admin/AdminPredictiveRadar';
import { 
  Building2, 
  ShieldCheck, 
  MapPin 
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { currentOfficial } = useAuth();
  const { language } = useLanguage();

  return (
    <div className="space-y-6">
      
      {/* Top Leadership Banner */}
      <div className="rounded-2xl border border-emerald-500/30 bg-white/90 dark:bg-slate-950/80 p-5 sm:p-6 backdrop-blur-xl shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors">
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={currentOfficial.avatarUrl}
                alt={currentOfficial.name}
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-2xl object-cover ring-2 ring-emerald-500/40 shadow-lg shadow-emerald-500/20"
              />
              <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-slate-950 shadow">
                <Building2 className="h-3.5 w-3.5" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white">
                  {language === 'hi' ? currentOfficial.nameHi : currentOfficial.name}
                </h1>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 font-semibold border border-emerald-500/30 dark:border-emerald-500/40">
                  {language === 'hi' ? currentOfficial.designationHi : currentOfficial.designation}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 font-medium">
                {language === 'hi' ? currentOfficial.departmentHi : currentOfficial.department}
              </p>

              <div className="flex items-center gap-3 text-[11px] text-slate-500 dark:text-slate-400">
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">MoSPI Apex Capacity Monitoring</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-3 w-3 text-slate-400" />
                  {currentOfficial.location}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Badges */}
          <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-xl p-3 shadow-sm">
            <div className="text-right">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-semibold">Statistical Readiness</span>
              <div className="text-lg font-black text-emerald-600 dark:text-emerald-400 font-mono">
                Optimal (78.4%)
              </div>
            </div>
            <div className="h-9 w-9 rounded-lg bg-emerald-500/10 dark:bg-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <ShieldCheck className="h-5 w-5" />
            </div>
          </div>

        </div>

      </div>

      {/* Main Admin Predictive Radar & Department Analytics */}
      <AdminPredictiveRadar />

    </div>
  );
};
