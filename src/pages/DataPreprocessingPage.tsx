import React, { useState } from 'react';
import {
  Sliders,
  CheckCircle2,
  Layers,
  ArrowRight,
  Database,
  Filter,
  FileCheck,
  RotateCcw,
} from 'lucide-react';
import { useAnimeData } from '../context/AnimeDataContext';

export const DataPreprocessingPage: React.FC = () => {
  const { dataset, preprocessingReport, runPreprocessingPipeline, isLoading } = useAnimeData();
  const [activeDecisionsCount] = useState(8);

  const encodingDecisions = [
    {
      feature: 'Format_Type',
      type: 'Nominal Encoding',
      mapping: 'TV → 0, Movie → 1, OVA → 2, Special → 3',
    },
    {
      feature: 'Airing_Status',
      type: 'Binary Encoding',
      mapping: 'Finished Airing → 1, Currently Airing → 0',
    },
    {
      feature: 'Primary_Genre',
      type: 'Multi-Label OHE',
      mapping: 'Action, Adventure, Comedy, Drama (Binary Matrix)',
    },
    {
      feature: 'Demographic_Target',
      type: 'Ordinal Encoding',
      mapping: 'Shounen → 0, Seinen → 1, Shoujo → 2, Josei → 3',
    },
    {
      feature: 'Source_Material',
      type: 'Ordinal Encoding',
      mapping: 'Manga → 0, Light Novel → 1, Original → 2',
    },
    {
      feature: 'Exclusive_Stream',
      type: 'Binary Encoding',
      mapping: 'Crunchyroll Simulcast → 1, Standard → 0',
    },
  ];

  const scalingDecisions = [
    {
      feature: 'Rating (Score)',
      scaler: 'StandardScaler',
      formula: 'z = (x - μ) / σ',
      mean: '7.23 pts',
      stdDev: '1.12 pts',
    },
    {
      feature: 'Log10(Votes)',
      scaler: 'StandardScaler',
      formula: 'z = (log10(x) - μ) / σ',
      mean: '4.18 log-pts',
      stdDev: '0.94 log-pts',
    },
    {
      feature: 'Total_Episodes',
      scaler: 'StandardScaler',
      formula: 'z = (x - μ) / σ',
      mean: '18.40 eps',
      stdDev: '28.20 eps',
    },
    {
      feature: 'Release_Year',
      scaler: 'MinMaxScaler',
      formula: 'z = (x - min) / (max - min)',
      mean: 'Min: 1980',
      stdDev: 'Max: 2025',
    },
    {
      feature: 'Catalog_Popularity',
      scaler: 'MinMaxScaler',
      formula: 'z = (x - min) / (max - min)',
      mean: 'Min: 0.00',
      stdDev: 'Max: 1.00',
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Breadcrumb matching Image 4 */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <span>Crunchyroll Data Science</span>
        <span>&gt;</span>
        <span className="text-white font-medium">Data Preprocessing</span>
      </div>

      {/* Main Header Block matching Image 4 */}
      <div>
        <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Dataset Preprocessing &amp; Feature Engineering Pipeline
          </h1>
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
            Exp 02
          </span>
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            Pipeline Validated
          </span>
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/40">
            animes.csv
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          End-to-end data transformation on animes.csv: resolving missing ratings, one-hot encoding for multi-label genres, and standardizing skewed vote distributions.
        </p>
      </div>

      {/* Top 3 Summary Cards matching Image 4 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Card 1: Matrix Dimensions */}
        <div className="glass-panel p-5 rounded-2xl border border-[#15233D] space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold text-[10px] uppercase tracking-wider">Dataset Matrix Shape</span>
            <Layers className="w-4 h-4 text-purple-400" />
          </div>
          <h3 className="font-display font-bold text-white text-base">
            Matrix Dimensions
          </h3>
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#070E1E] border border-[#15233D] font-mono text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block font-sans">Raw Input</span>
              <span className="text-white font-bold">12,487 × 8</span>
            </div>
            <ArrowRight className="w-4 h-4 text-purple-400" />
            <div>
              <span className="text-[10px] text-slate-400 block font-sans">Clean &amp; Encoded</span>
              <span className="text-cyan-400 font-bold">12,487 × 12</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 leading-tight">
            Expansion from 8 to 12 columns is due to categorical feature encoding.
          </p>
        </div>

        {/* Card 2: Imputation Health */}
        <div className="glass-panel p-5 rounded-2xl border border-[#15233D] space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold text-[10px] uppercase tracking-wider">Imputation Health</span>
            <Filter className="w-4 h-4 text-cyan-400" />
          </div>
          <h3 className="font-display font-bold text-white text-base">
            Missing Value Imputation
          </h3>
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#070E1E] border border-[#15233D] font-mono text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block font-sans">Before Imputation</span>
              <span className="text-amber-400 font-bold">89 Nulls</span>
            </div>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
            <div>
              <span className="text-[10px] text-slate-400 block font-sans">After Mode Fill</span>
              <span className="text-emerald-400 font-bold">0 Nulls</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>Mode/Median imputation applied to categorical &amp; numerical nulls</span>
          </div>
        </div>

        {/* Card 3: Duplicate Verification */}
        <div className="glass-panel p-5 rounded-2xl border border-[#15233D] space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span className="font-bold text-[10px] uppercase tracking-wider">Integrity Check</span>
            <FileCheck className="w-4 h-4 text-emerald-400" />
          </div>
          <h3 className="font-display font-bold text-white text-base">
            Duplicate Verification
          </h3>
          <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#070E1E] border border-[#15233D] font-mono text-xs">
            <div>
              <span className="text-[10px] text-slate-400 block font-sans">Identified Duplicates</span>
              <span className="text-amber-400 font-bold">142 Rows</span>
            </div>
            <ArrowRight className="w-4 h-4 text-emerald-400" />
            <div>
              <span className="text-[10px] text-slate-400 block font-sans">Post-Deduplication</span>
              <span className="text-emerald-400 font-bold">0 Rows</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-[11px] text-emerald-400">
            <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
            <span>Zero duplicate anime entities found in active matrix</span>
          </div>
        </div>
      </div>

      {/* Categorical Encoding Decisions matching Image 4 */}
      <div className="glass-panel rounded-2xl p-6 border border-[#15233D] space-y-4">
        <div className="flex items-center justify-between border-b border-[#15233D] pb-3">
          <div>
            <h3 className="font-display font-bold text-white text-base">
              Categorical Encoding Decisions
            </h3>
            <p className="text-xs text-slate-400">
              Features transformed to preserve ordinal hierarchies and binary relationships
            </p>
          </div>
          <span className="px-2.5 py-1 rounded text-[11px] font-mono font-semibold bg-indigo-950/60 text-indigo-300 border border-indigo-800/50">
            {activeDecisionsCount} Decisions
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
          {encodingDecisions.map((item) => (
            <div
              key={item.feature}
              className="p-3.5 rounded-xl bg-[#070E1E] border border-[#15233D] space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">{item.feature}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  {item.type}
                </span>
              </div>
              <p className="text-[11px] font-mono text-cyan-300">
                {item.mapping}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Scaling & Standardization matching Image 4 */}
      <div className="glass-panel rounded-2xl p-6 border border-[#15233D] space-y-4">
        <div className="flex items-center justify-between border-b border-[#15233D] pb-3">
          <div>
            <h3 className="font-display font-bold text-white text-base">
              Feature Scaling &amp; Standardization
            </h3>
            <p className="text-xs text-slate-400">
              Numerical feature scaling ensures equal gradient propagation in regression and Euclidean distance in clustering
            </p>
          </div>
          <span className="px-2.5 py-1 rounded text-[11px] font-mono font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-800/50">
            StandardScaler &amp; MinMax
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
          {scalingDecisions.map((item) => (
            <div
              key={item.feature}
              className="p-4 rounded-xl bg-[#070E1E] border border-[#15233D] space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white">{item.feature}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950/40 text-blue-300 border border-blue-800/40">
                  {item.scaler}
                </span>
              </div>
              <div className="font-mono text-[11px] text-amber-300 bg-[#0A1428] p-2 rounded border border-[#142646]">
                Formula: {item.formula}
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                <span>{item.mean}</span>
                <span>{item.stdDev}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
