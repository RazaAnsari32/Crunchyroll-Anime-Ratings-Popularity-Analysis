import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
} from 'recharts';
import { BarChart3 } from 'lucide-react';

interface RatingDistributionChartProps {
  data: { range: string; count: number }[];
  onViewAll?: () => void;
}

export const RatingDistributionChart: React.FC<RatingDistributionChartProps> = ({
  data,
  onViewAll,
}) => {
  return (
    <div className="glass-panel rounded-2xl p-5 border border-[#15233D] flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400">
            <BarChart3 className="w-4 h-4" />
          </div>
          <h3 className="font-display font-bold text-white text-base">
            Rating Distribution
          </h3>
        </div>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-xs text-orange-400 hover:text-orange-300 font-medium transition-colors"
          >
            View All
          </button>
        )}
      </div>

      {/* Chart container */}
      <div className="w-full h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#14243F" vertical={false} />
            <XAxis
              dataKey="range"
              stroke="#64748B"
              tickLine={false}
              axisLine={{ stroke: '#15233D' }}
              tick={{ fontSize: 11, fill: '#94A3B8' }}
            />
            <YAxis
              stroke="#64748B"
              tickLine={false}
              axisLine={{ stroke: '#15233D' }}
              tick={{ fontSize: 11, fill: '#94A3B8' }}
              tickFormatter={(v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}K` : v)}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  return (
                    <div className="bg-[#0B1628] border border-orange-500/40 p-2.5 rounded-xl shadow-xl">
                      <p className="text-xs font-semibold text-slate-300">
                        Rating Tier: <span className="text-white">{item.range}.0 - {item.range}.9</span>
                      </p>
                      <p className="text-xs font-bold text-orange-400 mt-1 tabular-nums">
                        {item.count.toLocaleString()} anime
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {data.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill="#F47521"
                  className="hover:opacity-80 transition-opacity"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="text-center text-[11px] text-slate-400 mt-1">
        Rating Scale (1 - 10)
      </div>
    </div>
  );
};
