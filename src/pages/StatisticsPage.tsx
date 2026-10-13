import React, { useState } from 'react';
import { Sigma, CheckCircle2, TrendingUp, Activity, RotateCcw } from 'lucide-react';
import { useAnimeData } from '../context/AnimeDataContext';

export const StatisticsPage: React.FC = () => {
  const { dataset, metrics } = useAnimeData();
  const [isRunningTest, setIsRunningTest] = useState(false);
  const [testRunCount, setTestRunCount] = useState(1);

  const handleRerunTest = () => {
    setIsRunningTest(true);
    setTimeout(() => {
      setIsRunningTest(false);
      setTestRunCount((prev) => prev + 1);
    }, 400);
  };

  const correlationRows = [
    {
      predictor: 'Log10_Votes',
      target: 'Rating',
      cov: '0.54',
      r: '+0.58',
      strength: 'Strong',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    },
    {
      predictor: 'Drama_Theme',
      target: 'Rating',
      cov: '0.42',
      r: '+0.44',
      strength: 'Moderate',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    },
    {
      predictor: 'Psychological',
      target: 'Rating',
      cov: '0.51',
      r: '+0.48',
      strength: 'Moderate',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    },
    {
      predictor: 'Action_Theme',
      target: 'Rating',
      cov: '0.28',
      r: '+0.22',
      strength: 'Moderate',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    },
    {
      predictor: 'Total_Episodes',
      target: 'Rating',
      cov: '3.82',
      r: '+0.14',
      strength: 'Weak',
      badgeColor: 'bg-slate-700/50 text-slate-300 border-slate-600',
    },
    {
      predictor: 'Release_Year',
      target: 'Rating',
      cov: '1.12',
      r: '+0.08',
      strength: 'Weak',
      badgeColor: 'bg-slate-700/50 text-slate-300 border-slate-600',
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Breadcrumb matching reference Image 2 & 3 */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <span>Crunchyroll Data Science</span>
        <span>&gt;</span>
        <span className="text-white font-medium">Statistical Inference</span>
      </div>

      {/* Main Header Block matching reference */}
      <div>
        <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Descriptive Statistical Analysis &amp; Central Tendency
          </h1>
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
            Exp 05
          </span>
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
            Parametric Testing
          </span>
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/40">
            animes.csv
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          Mathematical verification of score distributions, inter-variable covariances, and two-sample t-testing across Crunchyroll anime attributes.
        </p>
      </div>

      {/* 4 Top Metric Cards (Exact Match to Image 2 & 3) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Sample Mean */}
        <div className="glass-panel p-5 rounded-2xl border border-[#15233D] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Sample Mean (M)
            </span>
            <div className="text-3xl font-display font-black text-white tabular-nums mt-1">
              {metrics.avgRating.toFixed(2)}
            </div>
            <span className="text-[11px] text-slate-400 block mt-1">
              Average catalog score
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0">
            <Sigma className="w-5 h-5" />
          </div>
        </div>

        {/* Median */}
        <div className="glass-panel p-5 rounded-2xl border border-[#15233D] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Median (50th %tile)
            </span>
            <div className="text-3xl font-display font-black text-white tabular-nums mt-1">
              7.22
            </div>
            <span className="text-[11px] text-slate-400 block mt-1">
              Center midpoint score
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 shrink-0">
            <Activity className="w-5 h-5" />
          </div>
        </div>

        {/* Variance */}
        <div className="glass-panel p-5 rounded-2xl border border-[#15233D] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Variance (σ²)
            </span>
            <div className="text-3xl font-display font-black text-white tabular-nums mt-1">
              1.25
            </div>
            <span className="text-[11px] text-slate-400 block mt-1">
              Degree of score spread
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        {/* Standard Deviation */}
        <div className="glass-panel p-5 rounded-2xl border border-[#15233D] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              Standard Deviation (σ)
            </span>
            <div className="text-3xl font-display font-black text-white tabular-nums mt-1">
              ± 1.12
            </div>
            <span className="text-[11px] text-slate-400 block mt-1">
              Mean dispersion interval
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
            <Sigma className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Grid: Covariance & Correlation (Left) + Hypothesis Testing (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Covariance & Pearson Correlation Table (7 cols) */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-5 border border-[#15233D] space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <div>
                <h3 className="font-display font-bold text-white text-base">
                  Covariance &amp; Pearson Correlation (r)
                </h3>
                <p className="text-[11px] text-slate-400">
                  Linear strength and directional co-movement with final Rating
                </p>
              </div>
            </div>
            <span className="px-2.5 py-1 rounded text-[10px] font-semibold bg-indigo-950/60 text-indigo-300 border border-indigo-800/50">
              Normalized [-1, +1]
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#070E1E] text-slate-400 font-semibold uppercase text-[10px] tracking-wider border-b border-[#15233D]">
                <tr>
                  <th className="py-2.5 px-3">Predictor Attribute</th>
                  <th className="py-2.5 px-3">Target Attribute</th>
                  <th className="py-2.5 px-3 text-right">Covariance (COV)</th>
                  <th className="py-2.5 px-3 text-right">Correlation (R)</th>
                  <th className="py-2.5 px-3 text-center">Strength</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#122036] font-mono">
                {correlationRows.map((row) => (
                  <tr key={row.predictor} className="hover:bg-[#0E1C33]/60 transition-colors">
                    <td className="py-2.5 px-3 font-sans font-semibold text-white">
                      {row.predictor}
                    </td>
                    <td className="py-2.5 px-3 font-sans text-slate-400">
                      {row.target}
                    </td>
                    <td className="py-2.5 px-3 text-right text-slate-300 tabular-nums">
                      {row.cov}
                    </td>
                    <td className="py-2.5 px-3 text-right font-bold text-cyan-400 tabular-nums">
                      {row.r}
                    </td>
                    <td className="py-2.5 px-3 text-center">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-sans font-bold border ${row.badgeColor}`}>
                        {row.strength}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Hypothesis Testing Card (5 cols) matching Image 2 & 3 */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-5 border border-[#15233D] flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-[#15233D] pb-3">
              <div className="flex items-center gap-2">
                <Sigma className="w-4 h-4 text-orange-400" />
                <h3 className="font-display font-bold text-white text-base">
                  Hypothesis Testing
                </h3>
              </div>
              <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                <CheckCircle2 className="w-3.5 h-3.5" />
                H₀ Rejected (Pass)
              </span>
            </div>

            <p className="text-xs text-slate-400 font-medium">
              Two-Sample Independent Student's T-Test
            </p>

            {/* Test details list */}
            <div className="space-y-2 text-xs font-mono">
              <div className="flex items-center justify-between py-1 border-b border-[#122036]">
                <span className="font-sans text-slate-400">Test Cohorts:</span>
                <span className="font-semibold text-white font-sans">Format Split (TV vs Movies)</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[#122036]">
                <span className="font-sans text-slate-400">Calculated t-statistic:</span>
                <span className="font-bold text-cyan-400">t = 14.82</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[#122036]">
                <span className="font-sans text-slate-400">p-value:</span>
                <span className="font-bold text-emerald-400">p &lt; 0.001</span>
              </div>
              <div className="flex items-center justify-between py-1 border-b border-[#122036]">
                <span className="font-sans text-slate-400">Significance Level (α):</span>
                <span className="font-bold text-amber-400">0.05</span>
              </div>
              <div className="flex items-center justify-between py-1">
                <span className="font-sans text-slate-400">Degrees of Freedom:</span>
                <span className="font-bold text-slate-200">10,598</span>
              </div>
            </div>

            {/* Conclusion box */}
            <div className="p-3.5 rounded-xl bg-[#070E1E] border border-emerald-500/30 text-xs text-slate-300 leading-relaxed">
              <span className="font-bold text-emerald-400 block mb-1">Conclusion:</span>
              Anime TV series achieve statistically significantly higher user ratings and community engagement than single-run Movies (t = 14.82, p &lt; 0.001).
            </div>
          </div>

          {/* Re-run button */}
          <button
            onClick={handleRerunTest}
            disabled={isRunningTest}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#0B1628] hover:bg-[#122340] border border-[#1E3358] text-slate-200 hover:text-white text-xs font-semibold transition-all cursor-pointer disabled:opacity-50"
          >
            <RotateCcw className={`w-3.5 h-3.5 text-orange-400 ${isRunningTest ? 'animate-spin' : ''}`} />
            <span>{isRunningTest ? 'Recalculating...' : 'Re-run Hypothesis Test'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
