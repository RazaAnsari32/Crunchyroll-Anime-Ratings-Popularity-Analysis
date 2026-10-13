import React from 'react';
import {
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';
import { Sparkles } from 'lucide-react';
import { AnimeRecord } from '../../types/anime';

interface VotesVsRatingScatterProps {
  records: AnimeRecord[];
}

export const VotesVsRatingScatter: React.FC<VotesVsRatingScatterProps> = ({ records }) => {
  // Subsample to 250 points for snappy scatter rendering
  const step = Math.max(1, Math.floor(records.length / 250));
  const scatterData = records
    .filter((_, idx) => idx % step === 0)
    .map((item) => ({
      title: item.title,
      votes: Math.max(10, item.votes),
      rating: item.rating,
      genres: item.genres.slice(0, 2).join(', '),
      color:
        item.rating >= 8.5
          ? '#F47521' // Top tier orange
          : item.rating >= 7.0
          ? '#A855F7' // Purple
          : '#38BDF8', // Cyan
    }));

  return (
    <div className="glass-panel rounded-2xl p-5 border border-[#15233D] flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="w-7 h-7 rounded-lg bg-pink-500/10 flex items-center justify-center text-pink-400">
          <Sparkles className="w-4 h-4" />
        </div>
        <h3 className="font-display font-bold text-white text-base">
          Votes vs Rating
        </h3>
      </div>

      {/* Chart */}
      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <ScatterChart margin={{ top: 10, right: 15, bottom: 5, left: -20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#14243F" />
            <XAxis
              type="number"
              dataKey="votes"
              name="Votes"
              scale="log"
              domain={[100, 5000000]}
              stroke="#64748B"
              tickLine={false}
              axisLine={{ stroke: '#15233D' }}
              tick={{ fontSize: 10, fill: '#94A3B8' }}
              tickFormatter={(v) => {
                if (v >= 1000000) return '10⁶';
                if (v >= 100000) return '10⁵';
                if (v >= 10000) return '10⁴';
                if (v >= 1000) return '10³';
                return v;
              }}
            />
            <YAxis
              type="number"
              dataKey="rating"
              name="Rating"
              domain={[0, 10]}
              ticks={[0, 2, 4, 6, 8, 10]}
              stroke="#64748B"
              tickLine={false}
              axisLine={{ stroke: '#15233D' }}
              tick={{ fontSize: 10, fill: '#94A3B8' }}
            />
            <Tooltip
              cursor={{ strokeDasharray: '3 3', stroke: '#38BDF8' }}
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-[#0B1628] border border-orange-500/40 p-2.5 rounded-xl shadow-xl max-w-xs">
                      <p className="text-xs font-bold text-white truncate">{data.title}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{data.genres}</p>
                      <div className="flex items-center gap-3 mt-1.5 pt-1.5 border-t border-slate-700/50 text-xs">
                        <span className="text-amber-400 font-semibold tabular-nums">
                          ★ {data.rating}
                        </span>
                        <span className="text-slate-300 tabular-nums">
                          {data.votes.toLocaleString()} votes
                        </span>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Scatter name="Anime" data={scatterData}>
              {scatterData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  opacity={0.8}
                  r={3.5}
                />
              ))}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center text-[11px] text-slate-400 mt-1">
        Votes (log scale)
      </div>
    </div>
  );
};
