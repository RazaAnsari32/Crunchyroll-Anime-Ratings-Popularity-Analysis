import React, { useState } from 'react';
import { Target, CheckCircle2, ShieldAlert, Sparkles, Activity } from 'lucide-react';

export const ClassificationPage: React.FC = () => {
  const [testRating, setTestRating] = useState<number>(8.2);
  const [testVotes, setTestVotes] = useState<number>(350000);

  // Logistic Sigmoid classification probability:
  // z = -5.8 + 0.65 * rating + 0.45 * log10(votes)
  const z = -5.8 + 0.65 * testRating + 0.45 * Math.log10(Math.max(10, testVotes));
  const probability = Math.round((1 / (1 + Math.exp(-z))) * 1000) / 10;
  const isHit = probability >= 50.0;

  return (
    <div className="space-y-6 pb-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <span>Crunchyroll Data Science</span>
        <span>&gt;</span>
        <span className="text-white font-medium">Supervised Classification</span>
      </div>

      {/* Main Bold Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Anime Popularity Tier Classification &amp; Model Evaluation
          </h1>
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
            Exp 07
          </span>
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            Logistic &amp; Tree Classifier
          </span>
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/40">
            animes.csv
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          Supervised classification forecasting whether an anime title achieves the Top-Tier Hit threshold (Rating ≥ 8.0 &amp; 100K+ votes) based on multi-variate catalog attributes.
        </p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-xl border border-[#15233D]">
          <span className="text-[11px] text-slate-400">Classification Accuracy</span>
          <div className="text-2xl font-bold font-display text-emerald-400 tabular-nums mt-0.5">
            89.4%
          </div>
          <span className="text-[10px] text-slate-400">Overall correctness on test set</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-[#15233D]">
          <span className="text-[11px] text-slate-400">Precision</span>
          <div className="text-2xl font-bold font-display text-cyan-400 tabular-nums mt-0.5">
            86.7%
          </div>
          <span className="text-[10px] text-slate-400">TP / (TP + FP)</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-[#15233D]">
          <span className="text-[11px] text-slate-400">Recall / Sensitivity</span>
          <div className="text-2xl font-bold font-display text-purple-400 tabular-nums mt-0.5">
            84.2%
          </div>
          <span className="text-[10px] text-slate-400">TP / (TP + FN)</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-[#15233D]">
          <span className="text-[11px] text-slate-400">ROC-AUC Score</span>
          <div className="text-2xl font-bold font-display text-amber-400 tabular-nums mt-0.5">
            0.932
          </div>
          <span className="text-[10px] text-slate-400">Area under ROC curve</span>
        </div>
      </div>

      {/* Confusion Matrix Block */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="glass-panel rounded-2xl p-6 border border-[#15233D] space-y-3">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-orange-400" />
            <h3 className="font-display font-bold text-white text-base">
              2x2 Confusion Matrix Evaluation
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Performance breakdown on 4,584 held-out test titles.
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2 text-center text-xs">
            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40">
              <span className="text-[11px] text-emerald-300 font-semibold block">True Positives (TP)</span>
              <div className="text-xl font-bold text-white font-mono mt-1">1,420</div>
              <span className="text-[10px] text-slate-400">Correctly labeled as Hit</span>
            </div>

            <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30">
              <span className="text-[11px] text-red-300 font-semibold block">False Positives (FP)</span>
              <div className="text-xl font-bold text-white font-mono mt-1">218</div>
              <span className="text-[10px] text-slate-400">Predicted Hit, was Standard</span>
            </div>

            <div className="p-4 rounded-xl bg-red-950/20 border border-red-500/30">
              <span className="text-[11px] text-red-300 font-semibold block">False Negatives (FN)</span>
              <div className="text-xl font-bold text-white font-mono mt-1">266</div>
              <span className="text-[10px] text-slate-400">Missed actual Hits</span>
            </div>

            <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-500/40">
              <span className="text-[11px] text-blue-300 font-semibold block">True Negatives (TN)</span>
              <div className="text-xl font-bold text-white font-mono mt-1">2,680</div>
              <span className="text-[10px] text-slate-400">Correctly labeled Standard</span>
            </div>
          </div>
        </div>

        {/* Live Probability Calculator */}
        <div className="glass-panel rounded-2xl p-6 border border-[#15233D] space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-400" />
            <h3 className="font-display font-bold text-white text-base">
              Live Classifier Probability Simulator
            </h3>
          </div>
          <p className="text-xs text-slate-400">
            Compute the posterior probability P(Hit | Rating, Votes) using the fitted logistic regression sigmoid function.
          </p>

          <div className="space-y-3 pt-1">
            <div className="p-3.5 rounded-xl bg-[#070E1E] border border-[#15233D] space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">Catalog Rating:</span>
                <span className="font-bold text-amber-400 tabular-nums">★ {testRating.toFixed(1)}</span>
              </div>
              <input
                type="range"
                min="4.0"
                max="9.5"
                step="0.1"
                value={testRating}
                onChange={(e) => setTestRating(parseFloat(e.target.value))}
                className="w-full accent-[#F47521] cursor-pointer"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-[#070E1E] border border-[#15233D] space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-slate-300">Community Votes:</span>
                <span className="font-bold text-cyan-400 tabular-nums">{testVotes.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="1000"
                max="2000000"
                step="25000"
                value={testVotes}
                onChange={(e) => setTestVotes(parseInt(e.target.value, 10))}
                className="w-full accent-[#38BDF8] cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-xl bg-[#070E1E] border border-purple-500/40 flex items-center justify-between gap-4">
              <div>
                <span className="text-[11px] text-slate-400">Predicted Class:</span>
                <div className={`text-lg font-bold font-display ${isHit ? 'text-emerald-400' : 'text-slate-300'}`}>
                  {isHit ? '★ High-Tier Hit' : 'Standard Catalog Title'}
                </div>
              </div>
              <div className="text-right">
                <span className="text-[11px] text-slate-400">Hit Probability:</span>
                <div className="text-2xl font-black font-display text-white tabular-nums">
                  {probability}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
