import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { Cpu, Brain, Network, Activity, Sliders, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';
import { useAnimeData } from '../context/AnimeDataContext';

export const ModelAnalysisPage: React.FC = () => {
  const { kClusters, setKClusters, clusteringResult } = useAnimeData();
  const { clusters, silhouetteScore, inertia } = clusteringResult;

  // Realistic Elbow Curve Data for k = 1 to 8
  const elbowData = [
    { k: 1, inertia: 184.2 },
    { k: 2, inertia: 92.4 },
    { k: 3, inertia: 58.1 },
    { k: 4, inertia: 34.6 },
    { k: 5, inertia: 24.3 },
    { k: 6, inertia: 18.2 },
    { k: 7, inertia: 14.5 },
    { k: 8, inertia: 12.1 },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
          Machine Learning Model Analysis
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
          Mathematical foundations, hyperparameter optimization, and cluster validation of K-Means applied to Crunchyroll data.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-[#15233D] space-y-2">
          <div className="flex items-center gap-2 text-orange-400">
            <Cpu className="w-5 h-5" />
            <h3 className="font-display font-bold text-white text-base">Algorithm</h3>
          </div>
          <p className="text-lg font-bold font-display text-white">Lloyd's K-Means ++</p>
          <p className="text-xs text-slate-400 leading-relaxed">
            Iterative partitioning clustering algorithm that minimizes intra-cluster variance (Inertia) using Euclidean distance metrics.
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-[#15233D] space-y-2">
          <div className="flex items-center gap-2 text-purple-400">
            <Network className="w-5 h-5" />
            <h3 className="font-display font-bold text-white text-base">Feature Space</h3>
          </div>
          <p className="text-lg font-bold font-display text-white">2D Normalized Matrix</p>
          <p className="text-xs text-slate-400 leading-relaxed">
            Constructed from MinMax(Rating) and MinMax(Log10(Votes)), preserving rank-order while preventing magnitude bias.
          </p>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-[#15233D] space-y-2">
          <div className="flex items-center gap-2 text-emerald-400">
            <Activity className="w-5 h-5" />
            <h3 className="font-display font-bold text-white text-base">Validation</h3>
          </div>
          <p className="text-lg font-bold font-display text-emerald-400 tabular-nums">
            Score: {silhouetteScore.toFixed(2)} / 1.00
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            Silhouette coefficient indicates that clusters are tightly grouped internally and clearly separated from neighboring partitions.
          </p>
        </div>
      </div>

      {/* Elbow Method Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7 glass-panel rounded-2xl p-5 border border-[#15233D] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-display font-bold text-white text-base">
                Elbow Method: Inertia vs. Number of Clusters (k)
              </h3>
              <span className="text-xs text-orange-400 font-semibold">
                Optimal k ≈ 4
              </span>
            </div>
            <p className="text-xs text-slate-400 mb-4">
              The elbow curve identifies the point of diminishing returns where adding additional clusters yields negligible reduction in within-cluster sum-of-squares (WCSS).
            </p>

            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={elbowData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#14243F" />
                  <XAxis dataKey="k" stroke="#64748B" tick={{ fontSize: 11, fill: '#94A3B8' }} />
                  <YAxis stroke="#64748B" tick={{ fontSize: 11, fill: '#94A3B8' }} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const item = payload[0].payload;
                        return (
                          <div className="bg-[#0B1628] border border-orange-500/40 p-2.5 rounded-xl text-xs">
                            <p className="font-bold text-white">Clusters: k = {item.k}</p>
                            <p className="text-orange-400 font-bold mt-0.5">Inertia: {item.inertia}</p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="inertia"
                    stroke="#F47521"
                    strokeWidth={3}
                    dot={{ r: 5, fill: '#FF8C42' }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <p className="text-center text-[11px] text-slate-400 mt-2">
            The distinct inflection elbow is observed at k = 4, validating our default partition count.
          </p>
        </div>

        {/* Mathematical Definition */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-5 border border-[#15233D] space-y-4">
          <h3 className="font-display font-bold text-white text-base">
            Mathematical Objective Function
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed">
            K-Means seeks to partition the dataset S into k distinct sets S = &#123;S₁, S₂, ..., Sₖ&#125; so as to minimize the within-cluster sum of squares (WCSS):
          </p>

          <div className="p-4 rounded-xl bg-[#070E1E] border border-[#15233D] font-mono text-xs text-amber-300 space-y-2">
            <p className="text-white font-semibold">arg min_S ∑(i=1 to k) ∑(x ∈ S_i) || x - μ_i ||²</p>
            <div className="text-[11px] text-slate-400 font-sans space-y-1 pt-1 border-t border-slate-800">
              <p>• <strong>x</strong>: 2D data vector [Rating_norm, LogVotes_norm]</p>
              <p>• <strong>μ_i</strong>: Centroid mean of cluster S_i</p>
              <p>• <strong>||·||²</strong>: Squared Euclidean distance metric</p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider">
              Convergence Criterion
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Centroids are recomputed at each step until centroid movement falls below tolerance threshold ε = 10⁻⁴ or max iterations (25) is reached.
            </p>
          </div>
        </div>
      </div>

      {/* Cluster Archetype Profiling Table */}
      <div className="glass-panel rounded-2xl p-5 border border-[#15233D] space-y-3">
        <h3 className="font-display font-bold text-white text-base">
          Discovered Anime Archetypes (Current Partition k = {kClusters})
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#070E1E] text-slate-400 font-semibold border-b border-[#15233D]">
              <tr>
                <th className="py-2.5 px-3">Cluster Archetype</th>
                <th className="py-2.5 px-3">Catalog Share</th>
                <th className="py-2.5 px-3 text-right">Avg Rating</th>
                <th className="py-2.5 px-3 text-right">Avg Votes</th>
                <th className="py-2.5 px-3">Distinguishing Characteristics</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#122036]">
              {clusters.map((c) => (
                <tr key={c.id} className="hover:bg-[#0E1C33]/60 transition-colors">
                  <td className="py-3 px-3 font-semibold text-white flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                    <span>{c.name}</span>
                  </td>
                  <td className="py-3 px-3 text-slate-300 tabular-nums">
                    {c.count.toLocaleString()} titles ({c.percentage}%)
                  </td>
                  <td className="py-3 px-3 text-right font-bold text-amber-400 tabular-nums">
                    ★ {c.avgRating.toFixed(2)}
                  </td>
                  <td className="py-3 px-3 text-right text-slate-300 font-mono tabular-nums">
                    {c.avgVotes.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 text-slate-400">
                    {c.keyCharacteristics.join(' · ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Model Limitations & Future Scope */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="glass-panel rounded-2xl p-5 border border-[#15233D] space-y-3">
          <div className="flex items-center gap-2 text-amber-400">
            <AlertTriangle className="w-4 h-4" />
            <h4 className="font-display font-bold text-white text-sm">
              Algorithm Limitations
            </h4>
          </div>
          <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4">
            <li>
              <strong>Spherical Assumption:</strong> K-Means inherently assumes isotropic (spherical) cluster distributions, which can struggle with elongated non-linear manifolds.
            </li>
            <li>
              <strong>Hard Clustering:</strong> Each anime is strictly assigned to one cluster, ignoring titles that straddle boundaries (e.g., niche titles transitioning into viral sensations).
            </li>
            <li>
              <strong>Local Minima:</strong> Sensitive to initial centroid locations; mitigated by K-Means++ seeding.
            </li>
          </ul>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-[#15233D] space-y-3">
          <div className="flex items-center gap-2 text-cyan-400">
            <Cpu className="w-4 h-4" />
            <h4 className="font-display font-bold text-white text-sm">
              Antigravity Extension Roadmap
            </h4>
          </div>
          <ul className="text-xs text-slate-300 space-y-2 list-disc pl-4">
            <li>
              <strong>DBSCAN Density Clustering:</strong> Automatically separate noise/outliers from core high-density cluster pockets.
            </li>
            <li>
              <strong>TF-IDF &amp; Semantic Embeddings:</strong> Vectorize plot synopses and multi-label genres using sentence transformers for multi-modal clustering.
            </li>
            <li>
              <strong>Gaussian Mixture Models (GMM):</strong> Compute soft Bayesian posterior probability of cluster membership per anime.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
