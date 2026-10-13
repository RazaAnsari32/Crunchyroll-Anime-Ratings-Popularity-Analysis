import React from 'react';
import { Layers, Activity, Sparkles, CheckCircle2 } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ScatterChart,
  Scatter,
  Cell,
} from 'recharts';

export const PcaPage: React.FC = () => {
  // Scree Plot Data
  const screeData = [
    { component: 'PC1', variance: 62.4, cumulative: 62.4 },
    { component: 'PC2', variance: 24.1, cumulative: 86.5 },
    { component: 'PC3', variance: 9.2, cumulative: 95.7 },
    { component: 'PC4', variance: 4.3, cumulative: 100.0 },
  ];

  // 2D PCA projection synthetic points
  const pcaPoints = Array.from({ length: 150 }, (_, i) => {
    const pc1 = (Math.random() - 0.45) * 5.5;
    const pc2 = (Math.random() - 0.5) * 3.8;
    return {
      id: i,
      pc1: Math.round(pc1 * 100) / 100,
      pc2: Math.round(pc2 * 100) / 100,
      type: pc1 > 1.2 ? 'High Impact Hits' : pc2 > 0.8 ? 'Long Running Serials' : 'Standard Catalog',
      color: pc1 > 1.2 ? '#F47521' : pc2 > 0.8 ? '#A855F7' : '#38BDF8',
    };
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <span>Crunchyroll Data Science</span>
        <span>&gt;</span>
        <span className="text-white font-medium">Dimensionality Reduction</span>
      </div>

      {/* Main Bold Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Principal Component Analysis (PCA) on Anime Attributes
          </h1>
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
            Exp 09
          </span>
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            Variance Decomposition
          </span>
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/40">
            animes.csv
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          Orthogonal eigenvector transformation projecting multi-dimensional anime feature space into 2 principal components with 86.5% explained variance.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-xl border border-[#15233D]">
          <span className="text-[11px] text-slate-400">Total Variance (PC1 + PC2)</span>
          <div className="text-2xl font-bold font-display text-emerald-400 tabular-nums mt-0.5">
            86.5%
          </div>
          <span className="text-[10px] text-slate-400">Preserved in 2D projection</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-[#15233D]">
          <span className="text-[11px] text-slate-400">PC1 Explained Ratio</span>
          <div className="text-2xl font-bold font-display text-cyan-400 tabular-nums mt-0.5">
            62.4%
          </div>
          <span className="text-[10px] text-slate-400">Dominant popularity/sentiment axis</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-[#15233D]">
          <span className="text-[11px] text-slate-400">PC2 Explained Ratio</span>
          <div className="text-2xl font-bold font-display text-purple-400 tabular-nums mt-0.5">
            24.1%
          </div>
          <span className="text-[10px] text-slate-400">Format &amp; episode length axis</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-[#15233D]">
          <span className="text-[11px] text-slate-400">Dimension Reduction</span>
          <div className="text-2xl font-bold font-display text-amber-400 tabular-nums mt-0.5">
            4D &rarr; 2D
          </div>
          <span className="text-[10px] text-slate-400">Zero multicollinearity</span>
        </div>
      </div>

      {/* Dual Visuals: Scree Plot & 2D Projection */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Scree Plot */}
        <div className="glass-panel rounded-2xl p-5 border border-[#15233D] flex flex-col justify-between">
          <div>
            <h3 className="font-display font-bold text-white text-base mb-1">
              Scree Plot: Explained Variance by Component
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              Kaiser-Guttman criterion confirms that retaining 2 principal components accounts for 86.5% of variance.
            </p>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={screeData} margin={{ top: 10, right: 10, bottom: 0, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#14243F" />
                  <XAxis dataKey="component" stroke="#64748B" tick={{ fontSize: 11, fill: '#94A3B8' }} />
                  <YAxis stroke="#64748B" tick={{ fontSize: 11, fill: '#94A3B8' }} tickFormatter={(v) => `${v}%`} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const item = payload[0].payload;
                        return (
                          <div className="bg-[#0B1628] border border-cyan-500/40 p-2 rounded-xl text-xs">
                            <p className="font-bold text-white">{item.component}</p>
                            <p className="text-cyan-400 font-bold mt-0.5">Variance: {item.variance}%</p>
                            <p className="text-slate-400 text-[10px]">Cumulative: {item.cumulative}%</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="variance" fill="#38BDF8" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* 2D PCA Projection */}
        <div className="glass-panel rounded-2xl p-5 border border-[#15233D] flex flex-col justify-between">
          <div>
            <h3 className="font-display font-bold text-white text-base mb-1">
              2D Principal Component Space (PC1 vs. PC2)
            </h3>
            <p className="text-xs text-slate-400 mb-3">
              Uncorrelated orthogonal plane showcasing distinct sub-group separation across dimensions.
            </p>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: -10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#14243F" />
                  <XAxis dataKey="pc1" name="PC1" stroke="#64748B" tick={{ fontSize: 10, fill: '#94A3B8' }} />
                  <YAxis dataKey="pc2" name="PC2" stroke="#64748B" tick={{ fontSize: 10, fill: '#94A3B8' }} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const it = payload[0].payload;
                        return (
                          <div className="bg-[#0B1628] border border-orange-500/40 p-2 rounded-xl text-xs">
                            <p className="font-bold text-white">{it.type}</p>
                            <p className="text-slate-300 font-mono mt-0.5">PC1: {it.pc1} | PC2: {it.pc2}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Scatter data={pcaPoints}>
                    {pcaPoints.map((pt, idx) => (
                      <Cell key={`pt-${idx}`} fill={pt.color} opacity={0.8} r={3.5} />
                    ))}
                  </Scatter>
                </ScatterChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Loadings (Eigenvectors) Table */}
      <div className="glass-panel rounded-2xl p-5 border border-[#15233D] space-y-3">
        <h3 className="font-display font-bold text-white text-base">
          Eigenvector Feature Loading Matrix
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#070E1E] text-slate-400 font-semibold border-b border-[#15233D]">
              <tr>
                <th className="py-2.5 px-3">Original Feature</th>
                <th className="py-2.5 px-3 text-right">PC1 (Popularity Axis)</th>
                <th className="py-2.5 px-3 text-right">PC2 (Format Axis)</th>
                <th className="py-2.5 px-3">Dominant Interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#122036] font-mono">
              <tr className="hover:bg-[#0E1C33]/60">
                <td className="py-2.5 px-3 text-white font-sans font-medium">Rating (Score)</td>
                <td className="py-2.5 px-3 text-right text-emerald-400 font-bold">+0.684</td>
                <td className="py-2.5 px-3 text-right text-slate-300">-0.142</td>
                <td className="py-2.5 px-3 font-sans text-slate-400">High positive correlation with PC1</td>
              </tr>
              <tr className="hover:bg-[#0E1C33]/60">
                <td className="py-2.5 px-3 text-white font-sans font-medium">Log10(Votes)</td>
                <td className="py-2.5 px-3 text-right text-emerald-400 font-bold">+0.692</td>
                <td className="py-2.5 px-3 text-right text-slate-300">+0.098</td>
                <td className="py-2.5 px-3 font-sans text-slate-400">Primary driver of PC1 position</td>
              </tr>
              <tr className="hover:bg-[#0E1C33]/60">
                <td className="py-2.5 px-3 text-white font-sans font-medium">Episodes (Length)</td>
                <td className="py-2.5 px-3 text-right text-slate-300">+0.118</td>
                <td className="py-2.5 px-3 text-right text-purple-400 font-bold">+0.812</td>
                <td className="py-2.5 px-3 font-sans text-slate-400">Primary driver of PC2 position</td>
              </tr>
              <tr className="hover:bg-[#0E1C33]/60">
                <td className="py-2.5 px-3 text-white font-sans font-medium">Release Year</td>
                <td className="py-2.5 px-3 text-right text-slate-300">+0.198</td>
                <td className="py-2.5 px-3 text-right text-purple-400 font-bold">-0.558</td>
                <td className="py-2.5 px-3 font-sans text-slate-400">Moderate negative loading on PC2</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
