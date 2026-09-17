import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DepartmentMetric } from '../../types/index';
import { useLanguage } from '../../context/LanguageContext';
import { 
  CloudRain, 
  Sun, 
  CloudSun, 
  TrendingUp, 
  Users, 
  Award, 
  Layers, 
  BarChart4 
} from 'lucide-react';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend 
} from 'recharts';

export const AdminPredictiveRadar: React.FC = () => {
  const { t } = useLanguage();
  const [departments, setDepartments] = useState<DepartmentMetric[]>([]);
  const [selectedHorizonMonths, setSelectedHorizonMonths] = useState<number>(6);
  const [selectedDeptId, setSelectedDeptId] = useState<string>('nsso-sdrd');

  useEffect(() => {
    fetch('/api/analytics/departments')
      .then(res => res.json())
      .then(data => {
        if (data && data.success && Array.isArray(data.departments)) {
          setDepartments(data.departments);
        }
      })
      .catch(() => {});
  }, []);

  const selectedDept = departments.find(d => d.id === selectedDeptId) || departments[0];

  // Radar Chart Data preparation
  const radarData = selectedDept ? [
    { subject: 'Statistical', Score: selectedDept.avgScores.statistical, Benchmark: 88 },
    { subject: 'Technical', Score: selectedDept.avgScores.technical, Benchmark: 80 },
    { subject: 'Governance', Score: selectedDept.avgScores.governance, Benchmark: 85 },
    { subject: 'Behavioural', Score: selectedDept.avgScores.behavioural, Benchmark: 86 }
  ] : [];

  const barChartData = departments.map(d => ({
    name: d.shortName,
    Statistical: d.avgScores.statistical,
    Technical: d.avgScores.technical,
    Governance: d.avgScores.governance,
    Behavioural: d.avgScores.behavioural
  }));

  const getWeatherIcon = (weather: string) => {
    switch (weather) {
      case 'Sunny':
        return <Sun className="h-6 w-6 text-amber-500 dark:text-amber-400 animate-spin-slow" />;
      case 'Cloudy':
        return <CloudSun className="h-6 w-6 text-cyan-600 dark:text-cyan-300" />;
      case 'Stormy':
      default:
        return <CloudRain className="h-6 w-6 text-red-500 dark:text-red-400 animate-bounce" />;
    }
  };

  const getWeatherBadgeClass = (risk: string) => {
    switch (risk) {
      case 'Low':
        return 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 dark:border-emerald-500/40';
      case 'Medium':
        return 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-700 dark:text-amber-300 border-amber-500/30 dark:border-amber-500/40';
      case 'Critical':
      default:
        return 'bg-red-500/10 dark:bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/30 dark:border-red-500/40';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Global Statistics Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-950/80 p-4 backdrop-blur-xl shadow-sm dark:shadow-xl">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1 text-xs">
            <span>Statistical Personnel Mapped</span>
            <Users className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">42,350</div>
          <span className="text-[10px] text-cyan-700 dark:text-cyan-300 font-semibold">Across MoSPI, NSSO & 28 State DES</span>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-950/80 p-4 backdrop-blur-xl shadow-sm dark:shadow-xl">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1 text-xs">
            <span>Competency Framework</span>
            <Layers className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">148 Nodes</div>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">Under Karmayogi & NSSTA Guidelines</span>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-950/80 p-4 backdrop-blur-xl shadow-sm dark:shadow-xl">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1 text-xs">
            <span>Karmayogi Course Velocity</span>
            <Award className="h-4 w-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white font-mono">28,400</div>
          <span className="text-[10px] text-amber-700 dark:text-amber-300 font-semibold">Active Enrollments this Quarter</span>
        </div>

        <div className="rounded-2xl border border-slate-200 dark:border-white/10 bg-white/90 dark:bg-slate-950/80 p-4 backdrop-blur-xl shadow-sm dark:shadow-xl">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1 text-xs">
            <span>Avg Skill Gap Reduction</span>
            <TrendingUp className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
          </div>
          <div className="text-2xl font-black text-cyan-700 dark:text-cyan-300 font-mono">+28.4%</div>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-semibold">Post-Assessment Competency Growth</span>
        </div>

      </div>

      {/* ================= WORKFORCE WEATHER FORECASTING (6-12 MONTHS OUT) ================= */}
      <div className="rounded-2xl border border-cyan-500/30 bg-white/90 dark:bg-slate-950/90 p-6 backdrop-blur-2xl shadow-xl dark:shadow-2xl relative overflow-hidden transition-colors">
        
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400">
                <Sun className="h-4 w-4 animate-spin-slow" />
              </span>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                {t('workforceWeatherTitle')}
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              AI Forward Projection Model predicting cadre deficits, survey readiness risks, and training interventions
            </p>
          </div>

          {/* Forecast Time Horizon Slider / Pills */}
          <div className="flex items-center gap-1.5 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-white/10 p-1 text-xs">
            {[3, 6, 9, 12].map(months => (
              <button
                key={months}
                onClick={() => setSelectedHorizonMonths(months)}
                className={`rounded-lg px-3 py-1.5 font-bold transition-all ${
                  selectedHorizonMonths === months
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 shadow-md shadow-amber-500/20'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {months} Months Out
              </button>
            ))}
          </div>
        </div>

        {/* Weather Forecast Grid by Department */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {departments.map(dept => {
            const isSelected = selectedDeptId === dept.id;
            return (
              <motion.div
                key={dept.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedDeptId(dept.id)}
                className={`rounded-xl border p-4 cursor-pointer transition-all shadow-sm ${
                  isSelected
                    ? 'border-cyan-500 bg-cyan-50/50 dark:border-cyan-500/80 dark:bg-slate-900 shadow-xl shadow-cyan-500/10'
                    : 'border-slate-200 dark:border-white/10 bg-slate-50/70 dark:bg-slate-950/60 hover:border-slate-300 dark:hover:border-white/20'
                }`}
              >
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <span className="text-xs font-extrabold text-slate-900 dark:text-white block">{dept.shortName}</span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400">{dept.totalOfficers} Officers</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {getWeatherIcon(dept.forecastDeficit.weather)}
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getWeatherBadgeClass(dept.forecastDeficit.riskLevel)}`}>
                      {dept.forecastDeficit.riskLevel} Risk
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-700 dark:text-slate-300">
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">Projected Shortage:</span>
                    <span className="font-mono font-bold text-red-600 dark:text-red-400">
                      -{dept.forecastDeficit.projectedShortagePercent}% in {dept.forecastDeficit.shortageDomain}
                    </span>
                  </div>

                  <div className="rounded-lg bg-white dark:bg-slate-900/90 border border-slate-200 dark:border-white/5 p-2 text-[11px] text-slate-700 dark:text-slate-300 leading-snug shadow-sm">
                    <span className="text-cyan-700 dark:text-cyan-300 font-semibold block mb-0.5">Recommended Intervention:</span>
                    {dept.forecastDeficit.recommendedIntervention}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ================= RADAR VISUALIZATION & HEATMAP SECTION ================= */}
        {selectedDept && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4 border-t border-slate-200 dark:border-white/10">
            
            {/* Left: Interactive Radar Chart comparing Department vs MoSPI Cadre Benchmark */}
            <div className="lg:col-span-5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 p-4 flex flex-col items-center shadow-sm">
              <div className="w-full flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                  <BarChart4 className="h-4 w-4 text-cyan-600 dark:text-cyan-400" />
                  {selectedDept.name} • Competency Radar
                </h3>
                <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono">Target: 85% Benchmark</span>
              </div>

              <div className="w-full h-64 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={radarData}>
                    <PolarGrid stroke="rgba(100,116,139,0.3)" />
                    <PolarAngleAxis dataKey="subject" stroke="#64748B" tick={{ fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="rgba(100,116,139,0.3)" />
                    <Radar name="Department Avg" dataKey="Score" stroke="#06B6D4" fill="#06B6D4" fillOpacity={0.4} />
                    <Radar name="MoSPI Benchmark" dataKey="Benchmark" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.15} strokeDasharray="3 3" />
                    <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '11px', color: '#fff' }} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Right: Cross-Department Competency Comparison Bar Chart */}
            <div className="lg:col-span-7 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 p-4 shadow-sm">
              <div className="w-full flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                  Pan-India Statistical Divisions Heatmap Comparison
                </h3>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Scores out of 100</span>
              </div>

              <div className="w-full h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barChartData}>
                    <XAxis dataKey="name" stroke="#64748B" tick={{ fontSize: 10 }} />
                    <YAxis stroke="#64748B" domain={[0, 100]} tick={{ fontSize: 10 }} />
                    <Tooltip contentStyle={{ backgroundColor: '#0F172A', borderColor: '#334155', borderRadius: '8px', fontSize: '11px', color: '#fff' }} />
                    <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                    <Bar dataKey="Statistical" fill="#06B6D4" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Technical" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Governance" fill="#10B981" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Behavioural" fill="#F59E0B" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
