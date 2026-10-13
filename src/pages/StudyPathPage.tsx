import React, { useState } from 'react';
import { Route, Sparkles, CheckCircle2, ChevronDown, Layers, Database, Boxes, Film, Compass } from 'lucide-react';
import { useAnimeData } from '../context/AnimeDataContext';

export const StudyPathPage: React.FC = () => {
  const { dataset } = useAnimeData();
  const [pipelineMode, setPipelineMode] = useState<'curriculum' | 'recommendation'>('curriculum');
  const [currentLevel, setCurrentLevel] = useState('Stage 01 — Raw animes.csv Ingestion');
  const [targetLevel, setTargetLevel] = useState('Production Anime Analytics Engine (Target)');

  // Dynamic steps based on mode
  const curriculumSteps = [
    { id: 1, name: 'Raw animes.csv Ingestion', costLabel: 'START', isStart: true, cost: 0 },
    { id: 2, name: 'Genre Tokenization & OHE', costLabel: '+2', isPath: true, cost: 2 },
    { id: 3, name: 'K-Means Popularity Profiling', costLabel: '+3', isPath: true, cost: 3 },
    { id: 4, name: 'PCA Dimensionality Reduction', costLabel: '+3', isPath: true, cost: 3 },
    { id: 5, name: 'Production Anime Analytics Engine', costLabel: 'Goal State', isGoal: true, cost: 2 },
  ];

  const recommendationSteps = [
    { id: 1, name: 'Starter Classics (Fullmetal Alchemist)', costLabel: 'START', isStart: true, cost: 0 },
    { id: 2, name: 'Mainstream Shonen (Demon Slayer / JJK)', costLabel: '+2', isPath: true, cost: 2 },
    { id: 3, name: 'High-Rated Thrillers (Steins;Gate / Death Note)', costLabel: '+3', isPath: true, cost: 3 },
    { id: 4, name: 'Artistic Masterpieces (Frieren / Vinland)', costLabel: '+3', isPath: true, cost: 3 },
    { id: 5, name: 'Hall of Fame Anime Connoisseur', costLabel: 'Goal State', isGoal: true, cost: 2 },
  ];

  const pathSteps = pipelineMode === 'curriculum' ? curriculumSteps : recommendationSteps;
  const totalCost = pathSteps.reduce((acc, step) => acc + step.cost, 0);

  return (
    <div className="space-y-6 pb-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <span>Crunchyroll Data Science</span>
        <span>&gt;</span>
        <span className="text-white font-medium">Heuristic Path Planning</span>
      </div>

      {/* Main Bold Heading */}
      <div>
        <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            A* Search Heuristic Anime Analytics &amp; Curriculum Path
          </h1>
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
            Exp 04
          </span>
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
            Heuristic AI Search
          </span>
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-orange-500/20 text-orange-400 border border-orange-500/40">
            animes.csv Trajectory
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          State-space trajectory graph minimizing feature complexity and computational cost f(n) = g(n) + h(n) across {dataset.length.toLocaleString()} Crunchyroll catalog records.
        </p>
      </div>

      {/* Mode Switcher */}
      <div className="flex items-center gap-2 p-1 bg-[#0B1628] rounded-xl border border-[#15233D] w-fit">
        <button
          onClick={() => setPipelineMode('curriculum')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            pipelineMode === 'curriculum'
              ? 'bg-gradient-to-r from-[#F47521] to-[#FF8C42] text-white shadow-md shadow-orange-500/25'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>Data Science Pipeline Path</span>
        </button>
        <button
          onClick={() => setPipelineMode('recommendation')}
          className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
            pipelineMode === 'recommendation'
              ? 'bg-gradient-to-r from-[#F47521] to-[#FF8C42] text-white shadow-md shadow-orange-500/25'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Film className="w-3.5 h-3.5" />
          <span>Anime Watchlist Heuristic Path</span>
        </button>
      </div>

      {/* State Space Network Graph (Interactive SVG matching Reference Image) */}
      <div className="glass-panel rounded-2xl p-6 border border-[#15233D] space-y-4">
        <div className="flex items-center justify-between border-b border-[#15233D] pb-3">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            <h3 className="font-display font-bold text-white text-base">
              {pipelineMode === 'curriculum'
                ? 'Crunchyroll Data Mining State Space Network'
                : 'Optimal Anime Watchlist Progression Network'}
            </h3>
          </div>

          {/* Legend matching Reference */}
          <div className="flex items-center gap-3 text-xs font-semibold">
            <div className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Start</span>
            </div>
            <div className="flex items-center gap-1.5 text-purple-400">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
              <span>Path</span>
            </div>
            <div className="flex items-center gap-1.5 text-pink-400">
              <span className="w-2.5 h-2.5 rounded-full bg-pink-500" />
              <span>Goal</span>
            </div>
          </div>
        </div>

        {/* SVG Graph Canvas */}
        <div className="w-full overflow-x-auto py-4">
          <div className="min-w-[840px] h-[340px] relative bg-[#070E1E] rounded-xl border border-[#15233D] p-4 flex flex-col justify-between">
            {/* SVG Connecting Edges */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              {/* Inactive background branches */}
              <line x1="140" y1="170" x2="280" y2="260" stroke="#1E293B" strokeWidth="2" />
              <line x1="280" y1="260" x2="440" y2="260" stroke="#1E293B" strokeWidth="2" />
              <line x1="300" y1="90" x2="440" y2="90" stroke="#1E293B" strokeWidth="2" />
              <line x1="440" y1="90" x2="580" y2="90" stroke="#1E293B" strokeWidth="2" />
              <line x1="580" y1="90" x2="720" y2="90" stroke="#1E293B" strokeWidth="2" />
              <line x1="720" y1="90" x2="720" y2="260" stroke="#1E293B" strokeWidth="2" />
              <line x1="440" y1="90" x2="580" y2="260" stroke="#1E293B" strokeWidth="2" />
              <line x1="580" y1="90" x2="440" y2="260" stroke="#1E293B" strokeWidth="2" />

              {/* Optimal Selected A* Path (Dashed Glowing Lines matching Reference) */}
              <line
                x1="140"
                y1="170"
                x2="280"
                y2="90"
                stroke="#8B5CF6"
                strokeWidth="2.5"
                strokeDasharray="5,5"
              />
              <line
                x1="300"
                y1="90"
                x2="440"
                y2="260"
                stroke="#8B5CF6"
                strokeWidth="2.5"
                strokeDasharray="5,5"
              />
              <line
                x1="460"
                y1="260"
                x2="580"
                y2="260"
                stroke="#8B5CF6"
                strokeWidth="2.5"
                strokeDasharray="5,5"
              />
              <line
                x1="600"
                y1="260"
                x2="720"
                y2="260"
                stroke="#EC4899"
                strokeWidth="2.5"
                strokeDasharray="5,5"
              />
            </svg>

            {/* Top Row Nodes */}
            <div className="flex justify-between items-center px-12 z-10 pt-2">
              <div className="w-28" /> {/* Spacer */}

              {/* Node 2 (Selected Path) */}
              <div className="relative group">
                <span className="absolute -left-12 top-2 text-[10px] font-mono text-purple-300 bg-[#0B1628] px-1.5 py-0.5 rounded border border-purple-500/30">
                  Cost: 2
                </span>
                <div className="px-4 py-2 rounded-xl bg-purple-900/60 border-2 border-purple-500 shadow-lg shadow-purple-500/25 text-xs font-bold text-white text-center cursor-pointer">
                  {pipelineMode === 'curriculum' ? 'Genre Tokenization' : 'Mainstream Shonen'}
                </div>
              </div>

              {/* Alternative Top Node 1 */}
              <div className="relative">
                <span className="absolute -left-12 top-2 text-[10px] font-mono text-slate-400 bg-[#0B1628] px-1.5 py-0.5 rounded border border-[#15233D]">
                  Cost: 4
                </span>
                <div className="px-4 py-2 rounded-xl bg-[#0B1628] border border-[#1E3052] text-xs font-semibold text-slate-300 text-center">
                  {pipelineMode === 'curriculum' ? 'Metadata TF-IDF' : 'Isekai Fantasy'}
                </div>
              </div>

              {/* Alternative Top Node 2 */}
              <div className="relative">
                <span className="absolute -left-12 top-2 text-[10px] font-mono text-slate-400 bg-[#0B1628] px-1.5 py-0.5 rounded border border-[#15233D]">
                  Cost: 5
                </span>
                <div className="px-4 py-2 rounded-xl bg-[#0B1628] border border-[#1E3052] text-xs font-semibold text-slate-300 text-center">
                  {pipelineMode === 'curriculum' ? 'Neural Embeddings' : 'Cult Underground'}
                </div>
              </div>

              {/* Top Endpoint */}
              <div className="px-4 py-2 rounded-xl bg-[#0B1628] border border-[#1E3052] text-xs font-semibold text-slate-300 text-center">
                {pipelineMode === 'curriculum' ? 'Batch Ingestion' : 'Seasonal Tracker'}
              </div>
            </div>

            {/* Middle Node: Start State (Raw animes.csv) */}
            <div className="flex items-center px-6 z-10">
              <div className="px-5 py-2.5 rounded-xl bg-emerald-950/80 border-2 border-emerald-500 shadow-lg shadow-emerald-500/25 text-xs font-bold text-emerald-300 text-center cursor-pointer flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>
                  {pipelineMode === 'curriculum'
                    ? 'Raw animes.csv (Start)'
                    : 'Starter Classics (Start)'}
                </span>
              </div>
            </div>

            {/* Bottom Row Nodes */}
            <div className="flex justify-between items-center px-12 z-10 pb-2">
              <div className="w-28" /> {/* Spacer */}

              {/* Bottom Alternative */}
              <div className="relative">
                <span className="absolute -left-12 top-2 text-[10px] font-mono text-slate-400 bg-[#0B1628] px-1.5 py-0.5 rounded border border-[#15233D]">
                  Cost: 3
                </span>
                <div className="px-4 py-2 rounded-xl bg-[#0B1628] border border-[#1E3052] text-xs font-semibold text-slate-300 text-center">
                  {pipelineMode === 'curriculum' ? 'Missing Imputation' : 'Romance & Slice of Life'}
                </div>
              </div>

              {/* Selected Node 3 */}
              <div className="relative">
                <span className="absolute -left-12 top-2 text-[10px] font-mono text-purple-300 bg-[#0B1628] px-1.5 py-0.5 rounded border border-purple-500/30">
                  Cost: 3
                </span>
                <div className="px-4 py-2 rounded-xl bg-purple-900/60 border-2 border-purple-500 shadow-lg shadow-purple-500/25 text-xs font-bold text-white text-center cursor-pointer">
                  {pipelineMode === 'curriculum' ? 'K-Means Clustering' : 'High-Rated Thrillers'}
                </div>
              </div>

              {/* Selected Node 4 */}
              <div className="relative">
                <span className="absolute -left-12 top-2 text-[10px] font-mono text-purple-300 bg-[#0B1628] px-1.5 py-0.5 rounded border border-purple-500/30">
                  Cost: 3
                </span>
                <div className="px-4 py-2 rounded-xl bg-purple-900/60 border-2 border-purple-500 shadow-lg shadow-purple-500/25 text-xs font-bold text-white text-center cursor-pointer">
                  {pipelineMode === 'curriculum' ? 'PCA Dimensionality' : 'Artistic Masterpieces'}
                </div>
              </div>

              {/* Goal State (Node 5) */}
              <div className="relative">
                <span className="absolute -left-12 top-2 text-[10px] font-mono text-pink-300 bg-[#0B1628] px-1.5 py-0.5 rounded border border-pink-500/30">
                  Cost: 2
                </span>
                <div className="px-5 py-2 rounded-xl bg-pink-950/80 border-2 border-pink-500 shadow-lg shadow-pink-500/25 text-xs font-bold text-pink-300 text-center cursor-pointer flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-pink-400" />
                  <span>
                    {pipelineMode === 'curriculum'
                      ? 'Production Insights (Goal)'
                      : 'Hall of Fame (Goal)'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid matching Reference Image: Configure Milestones (Left) + A* Heuristic Summary (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Configure Learning / Pipeline Milestones */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-6 border border-[#15233D] space-y-4">
          <div className="flex items-center justify-between border-b border-[#15233D] pb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h3 className="font-display font-bold text-white text-base">
                Configure Pipeline Milestones
              </h3>
            </div>
            <span className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE
            </span>
          </div>

          <p className="text-xs text-slate-400">
            The optimal A* sequence evaluates path cost g(n) and heuristic estimate h(n) on Crunchyroll dataset parameters.
          </p>

          <div className="space-y-4 pt-1">
            {/* Current Level */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Starting Pipeline State
              </label>
              <div className="relative">
                <select
                  value={currentLevel}
                  onChange={(e) => setCurrentLevel(e.target.value)}
                  className="w-full bg-[#070E1E] border border-[#1E3052] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#F47521] appearance-none"
                >
                  <option value="Stage 01 — Raw animes.csv Ingestion">
                    Stage 01 — Raw animes.csv Ingestion
                  </option>
                  <option value="Stage 02 — Deduplicated &amp; Cleaned Vectors">
                    Stage 02 — Deduplicated &amp; Cleaned Vectors
                  </option>
                  <option value="Stage 03 — Clustered Representation">
                    Stage 03 — Clustered Representation
                  </option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Target Level */}
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1.5">
                Target Analytical Benchmark
              </label>
              <div className="relative">
                <select
                  value={targetLevel}
                  onChange={(e) => setTargetLevel(e.target.value)}
                  className="w-full bg-[#070E1E] border border-[#1E3052] rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-[#F47521] appearance-none"
                >
                  <option value="Production Anime Analytics Engine (Target)">
                    Production Anime Analytics Engine (Target)
                  </option>
                  <option value="Advanced Heuristic Recommender (Honors)">
                    Advanced Heuristic Recommender (Honors)
                  </option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#070E1E] border border-[#15233D] text-[11px] text-slate-400 flex items-center justify-between">
              <span>Branching Factor: <strong className="text-white font-mono">b = 2.4</strong></span>
              <span>Admissibility: <strong className="text-emerald-400 font-mono">h(n) ≤ h*(n)</strong></span>
            </div>
          </div>
        </div>

        {/* Right: A* Heuristic Summary */}
        <div className="lg:col-span-7 glass-panel rounded-2xl p-6 border border-[#15233D] space-y-4">
          <div className="flex items-center justify-between border-b border-[#15233D] pb-3">
            <h3 className="font-display font-bold text-white text-base uppercase tracking-wider text-xs">
              A* Heuristic Search Execution Summary
            </h3>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              Total Cost: {totalCost}
            </span>
          </div>

          <h4 className="font-semibold text-white text-sm">
            Optimal State Sequence
          </h4>

          {/* Steps Sequence List */}
          <div className="space-y-2">
            {pathSteps.map((step) => (
              <div
                key={step.id}
                className="p-2.5 px-3.5 rounded-xl bg-[#070E1E] border border-[#15233D] flex items-center justify-between text-xs hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold font-mono ${
                      step.isStart
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : step.isGoal
                        ? 'bg-pink-500/20 text-pink-400'
                        : 'bg-purple-500/20 text-purple-300'
                    }`}
                  >
                    {step.id}
                  </span>
                  <span className="font-semibold text-white">{step.name}</span>
                </div>
                <span
                  className={`font-mono font-bold text-[11px] ${
                    step.isStart
                      ? 'text-emerald-400'
                      : step.isGoal
                      ? 'text-pink-400'
                      : 'text-slate-400'
                  }`}
                >
                  {step.costLabel}
                </span>
              </div>
            ))}
          </div>

          {/* Heuristic Formula explanation box */}
          <div className="p-3.5 rounded-xl bg-[#070E1E] border border-cyan-500/30 text-xs text-slate-300 leading-relaxed font-sans">
            <strong>Evaluation Heuristic:</strong>{' '}
            <span className="font-mono text-cyan-400">f(n) = g(n) + h(n)</span>, where{' '}
            <span className="text-slate-400 font-mono">g(n)</span> is the cumulative transformation cost and{' '}
            <span className="text-slate-400 font-mono">h(n)</span> is the Euclidean distance to cluster centroid targets.
          </div>
        </div>
      </div>
    </div>
  );
};
