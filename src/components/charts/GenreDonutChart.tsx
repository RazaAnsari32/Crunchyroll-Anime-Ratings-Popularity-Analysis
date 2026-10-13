import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import { PieChart as PieIcon } from 'lucide-react';

interface GenreDonutChartProps {
  data: { name: string; count: number; percentage: number; color: string }[];
  totalAnime: number;
}

export const GenreDonutChart: React.FC<GenreDonutChartProps> = ({
  data,
  totalAnime,
}) => {
  return (
    <div className="glass-panel rounded-2xl p-5 border border-[#15233D] flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <div className="w-7 h-7 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400">
          <PieIcon className="w-4 h-4" />
        </div>
        <h3 className="font-display font-bold text-white text-base">
          Top Genres by Anime Count
        </h3>
      </div>

      {/* Main Container: Donut + Legend */}
      <div className="flex-1 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Donut Chart with Center Text */}
        <div className="relative w-48 h-48 sm:w-52 sm:h-52 shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const item = payload[0].payload;
                    return (
                      <div className="bg-[#0B1628] border border-cyan-500/40 p-2.5 rounded-xl shadow-xl">
                        <p className="text-xs font-semibold" style={{ color: item.color }}>
                          {item.name}
                        </p>
                        <p className="text-xs text-white font-medium mt-0.5 tabular-nums">
                          {item.count.toLocaleString()} anime ({item.percentage}%)
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={80}
                paddingAngle={3}
                dataKey="count"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke="#070E1E" strokeWidth={2} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          {/* Center text in donut */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-base sm:text-lg font-display font-black text-white tabular-nums leading-none">
              {totalAnime.toLocaleString()}
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-wide mt-1">
              Total Anime
            </span>
          </div>
        </div>

        {/* Legend matching screenshot */}
        <div className="w-full sm:w-auto flex-1 space-y-1.5 pl-2">
          {data.map((item) => (
            <div
              key={item.name}
              className="flex items-center justify-between text-xs py-0.5 hover:bg-[#0E1B33] px-2 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-300 font-medium">{item.name}</span>
              </div>
              <div className="text-right text-slate-400 font-medium tabular-nums text-[11px]">
                {item.count.toLocaleString()} <span className="text-slate-400">({item.percentage}%)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
