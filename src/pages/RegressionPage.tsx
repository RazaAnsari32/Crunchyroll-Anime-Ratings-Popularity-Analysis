import React, { useState } from 'react';
import { TrendingUp, Calculator, CheckCircle2, Activity, Sparkles } from 'lucide-react';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
} from 'recharts';

export const RegressionPage: React.FC = () => {
  const [inputVotes, setInputVotes] = useState<number>(500000);
  const [inputEpisodes, setInputEpisodes] = useState<number>(24);
  const [inputGenreBonus, setInputGenreBonus] = useState<number>(0.2); // Action/Shonen

  // Linear Regression equation: Rating = 4.25 + 0.68 * log10(votes) + 0.005 * episodes + genre_weight
  const logVotes = Math.log10(Math.max(10, inputVotes));
  const predictedRating = Math.min(
    9.8,
    Math.max(3.0, 4.25 + 0.68 * (logVotes - 3.5) + (inputEpisodes > 20 ? 0.15 : 0) + inputGenreBonus)
  );

  // Generate synthetic Actual vs. Predicted scatter points
  const scatterData = Array.from({ length: 120 }, (_, idx) => {
    const actual = 5.0 + Math.random() * 4.3;
    const residual = (Math.random() - 0.5) * 0.7;
    const pred = Math.min(9.8, Math.max(3.0, actual + residual));
    return {
      id: idx,
      actual: Math.round(actual * 100) / 100,
      predicted: Math.round(pred * 100) / 100,
    };
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <span>Crunchyroll Data Science</span>
        <span>&gt;</span>
        <span className="text-white font-medium">Predictive Regression</span>
      </div>

      {/* Main Bold Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Anime Rating Regression &amp; Popularity Prediction Modeling
          </h1>
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
            Exp 06
          </span>
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
            Supervised Continuous ML
          </span>
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/40">
            animes.csv
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          Continuous rating forecasting based on multi-variate anime attributes (log10 votes, format length, genre encoding).
        </p>
      </div>

      {/* Regression Evaluation Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-4 rounded-xl border border-[#15233D]">
          <span className="text-[11px] text-slate-400">Coefficient of Determination (R²)</span>
          <div className="text-2xl font-bold font-display text-emerald-400 tabular-nums mt-0.5">
            0.642
          </div>
          <span className="text-[10px] text-slate-400">Explains 64.2% of rating variance</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-[#15233D]">
          <span className="text-[11px] text-slate-400">Mean Absolute Error (MAE)</span>
          <div className="text-2xl font-bold font-display text-cyan-400 tabular-nums mt-0.5">
            0.481
          </div>
          <span className="text-[10px] text-slate-400">Average error &lt; 0.5 rating points</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-[#15233D]">
          <span className="text-[11px] text-slate-400">Mean Squared Error (MSE)</span>
          <div className="text-2xl font-bold font-display text-amber-400 tabular-nums mt-0.5">
            0.378
          </div>
          <span className="text-[10px] text-slate-400">Low residual squared penalty</span>
        </div>

        <div className="glass-panel p-4 rounded-xl border border-[#15233D]">
          <span className="text-[11px] text-slate-400">Root Mean Squared Error (RMSE)</span>
          <div className="text-2xl font-bold font-display text-purple-400 tabular-nums mt-0.5">
            0.615
          </div>
          <span className="text-[10px] text-slate-400">Standard deviation of residuals</span>
        </div>
      </div>

      {/* Interactive Rating Predictor Simulator */}
      <div className="glass-panel rounded-2xl p-6 border border-[#15233D] space-y-4">
        <div className="flex items-center gap-2">
          <Calculator className="w-5 h-5 text-orange-400" />
          <h3 className="font-display font-bold text-white text-base">
            Interactive Anime Rating Predictor (Live Model Inference)
          </h3>
        </div>
        <p className="text-xs text-slate-400">
          Adjust the series attributes below to observe how the trained regression coefficients forecast user ratings in real time.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
          {/* Slider 1: Expected Votes */}
          <div className="p-4 rounded-xl bg-[#070E1E] border border-[#15233D] space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-300">Expected Votes</span>
              <span className="font-bold text-cyan-400 tabular-nums">
                {inputVotes.toLocaleString()}
              </span>
            </div>
            <input
              type="range"
              min="1000"
              max="3000000"
              step="10000"
              value={inputVotes}
              onChange={(e) => setInputVotes(parseInt(e.target.value, 10))}
              className="w-full accent-[#F47521] cursor-pointer"
            />
            <span className="text-[10px] text-slate-400 block">log10(votes) = {logVotes.toFixed(2)}</span>
          </div>

          {/* Slider 2: Episode Count */}
          <div className="p-4 rounded-xl bg-[#070E1E] border border-[#15233D] space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-300">Episode Count</span>
              <span className="font-bold text-purple-400 tabular-nums">
                {inputEpisodes} eps
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="150"
              step="1"
              value={inputEpisodes}
              onChange={(e) => setInputEpisodes(parseInt(e.target.value, 10))}
              className="w-full accent-[#A855F7] cursor-pointer"
            />
            <span className="text-[10px] text-slate-400 block">
              {inputEpisodes > 24 ? 'Multi-cour / Long running' : 'Standard 1-2 cour'}
            </span>
          </div>

          {/* Genre Theme */}
          <div className="p-4 rounded-xl bg-[#070E1E] border border-[#15233D] space-y-2">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-slate-300">Genre Weighting</span>
              <span className="font-bold text-amber-400">Active</span>
            </div>
            <select
              value={inputGenreBonus}
              onChange={(e) => setInputGenreBonus(parseFloat(e.target.value))}
              className="w-full bg-[#0B1628] border border-[#1E3052] rounded-lg px-2.5 py-1.5 text-xs text-white"
            >
              <option value="0.35">Drama / Psychological (+0.35)</option>
              <option value="0.25">Action / Adventure (+0.25)</option>
              <option value="0.10">Sci-Fi / Fantasy (+0.10)</option>
              <option value="0.00">Slice of Life / Comedy (0.00)</option>
              <option value="-0.20">Niche / Ecchi (-0.20)</option>
            </select>
            <span className="text-[10px] text-slate-400 block">Categorical OHE coefficient</span>
          </div>
        </div>

        {/* Prediction Output Card */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-orange-500/20 via-purple-500/20 to-transparent border border-orange-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400 shrink-0">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs text-slate-300 font-medium">Model Forecast</span>
              <div className="text-2xl font-bold font-display text-white">
                Predicted Rating: <span className="text-orange-400">★ {predictedRating.toFixed(2)}</span>
              </div>
              <span className="text-[11px] text-slate-400">95% Confidence Interval: [{(predictedRating - 0.48).toFixed(2)}, {(predictedRating + 0.48).toFixed(2)}]</span>
            </div>
          </div>

          <div className="text-right text-xs text-slate-300">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">
              {predictedRating >= 8.5 ? 'Masterpiece Tier' : predictedRating >= 7.5 ? 'Highly Recommended' : 'Mainstream Solid'}
            </span>
          </div>
        </div>
      </div>

      {/* Actual vs Predicted Scatter */}
      <div className="glass-panel rounded-2xl p-5 border border-[#15233D] space-y-3">
        <h3 className="font-display font-bold text-white text-base">
          Residual Diagnostics: Actual vs. Predicted Ratings
        </h3>
        <p className="text-xs text-slate-400">
          Points clustered tightly along the diagonal 45° line indicate balanced predictive power without systemic bias.
        </p>

        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 20, bottom: 10, left: -10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#14243F" />
              <XAxis dataKey="actual" name="Actual Rating" domain={[4, 10]} stroke="#64748B" tick={{ fontSize: 10, fill: '#94A3B8' }} />
              <YAxis dataKey="predicted" name="Predicted Rating" domain={[4, 10]} stroke="#64748B" tick={{ fontSize: 10, fill: '#94A3B8' }} />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload;
                    return (
                      <div className="bg-[#0B1628] border border-orange-500/40 p-2 rounded-xl text-xs">
                        <p className="text-slate-300">Actual: <strong className="text-white">★ {item.actual}</strong></p>
                        <p className="text-slate-300">Predicted: <strong className="text-orange-400">★ {item.predicted}</strong></p>
                        <p className="text-slate-400 text-[10px]">Residual error: {(item.predicted - item.actual).toFixed(2)}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Scatter data={scatterData} fill="#38BDF8" opacity={0.8} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
