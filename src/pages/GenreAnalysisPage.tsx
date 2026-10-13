import React, { useState, useMemo } from 'react';
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
import { BarChart3, Star, Users, Flame, Tag, Trophy } from 'lucide-react';
import { useAnimeData } from '../context/AnimeDataContext';
import { AnimeRecord } from '../types/anime';

export const GenreAnalysisPage: React.FC = () => {
  const { dataset, setSelectedAnime } = useAnimeData();
  const [selectedGenreName, setSelectedGenreName] = useState<string>('Action');

  // Compute genre-level analytics
  const genreStats = useMemo(() => {
    const stats: Record<
      string,
      { count: number; totalRating: number; totalVotes: number; animeList: AnimeRecord[] }
    > = {};

    dataset.forEach((anime) => {
      anime.genres.forEach((g) => {
        const genre = g.trim();
        if (!genre) return;
        if (!stats[genre]) {
          stats[genre] = { count: 0, totalRating: 0, totalVotes: 0, animeList: [] };
        }
        stats[genre].count++;
        stats[genre].totalRating += anime.rating;
        stats[genre].totalVotes += anime.votes;
        stats[genre].animeList.push(anime);
      });
    });

    return Object.entries(stats).map(([name, data]) => ({
      name,
      count: data.count,
      avgRating: Math.round((data.totalRating / data.count) * 100) / 100,
      totalVotes: data.totalVotes,
      avgVotes: Math.round(data.totalVotes / data.count),
      topAnime: [...data.animeList].sort((a, b) => b.rating - a.rating).slice(0, 5),
    }));
  }, [dataset]);

  // Top 10 genres by count for visualization
  const top10ByCount = useMemo(() => {
    return [...genreStats].sort((a, b) => b.count - a.count).slice(0, 10);
  }, [genreStats]);

  // Top 10 genres by avg rating (min 15 anime)
  const top10ByRating = useMemo(() => {
    return [...genreStats]
      .filter((g) => g.count >= 15)
      .sort((a, b) => b.avgRating - a.avgRating)
      .slice(0, 10);
  }, [genreStats]);

  // Active genre details
  const activeGenreData = useMemo(() => {
    return genreStats.find((g) => g.name === selectedGenreName) || genreStats[0];
  }, [genreStats, selectedGenreName]);

  return (
    <div className="space-y-6 pb-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <span>Crunchyroll Data Science</span>
        <span>&gt;</span>
        <span className="text-white font-medium">Exploratory Data Analysis</span>
      </div>

      {/* Main Bold Header */}
      <div>
        <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Exploratory Data Analysis: Genre Distributions &amp; Rating Dynamics
          </h1>
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
            Exp 03
          </span>
          <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-purple-500/20 text-purple-300 border border-purple-500/40">
            Distribution &amp; Co-occurrence
          </span>
          <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/40">
            animes.csv
          </span>
        </div>
        <p className="text-xs sm:text-sm text-slate-400">
          Evaluating cross-genre distribution, community voting volumes, and critical rating patterns across Crunchyroll catalog titles.
        </p>
      </div>

      {/* Dual Comparative Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Chart 1: Average Rating by Genre */}
        <div className="glass-panel rounded-2xl p-5 border border-[#15233D] flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
              <Star className="w-4 h-4" />
            </div>
            <h3 className="font-display font-bold text-white text-base">
              Highest Average Rating by Genre
            </h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={top10ByRating} layout="vertical" margin={{ left: 15, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#14243F" horizontal={false} />
                <XAxis type="number" domain={[6.5, 9.0]} stroke="#64748B" tick={{ fontSize: 10, fill: '#94A3B8' }} />
                <YAxis dataKey="name" type="category" stroke="#64748B" tick={{ fontSize: 11, fill: '#E2E8F0' }} width={80} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload;
                      return (
                        <div className="bg-[#0B1628] border border-amber-500/40 p-2.5 rounded-xl text-xs">
                          <p className="font-bold text-white">{item.name}</p>
                          <p className="text-amber-400 font-bold mt-1">★ {item.avgRating} average rating</p>
                          <p className="text-slate-400 mt-0.5">{item.count.toLocaleString()} anime recorded</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="avgRating" fill="#F59E0B" radius={[0, 4, 4, 0]}>
                  {top10ByRating.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === selectedGenreName ? '#F47521' : '#F59E0B'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Anime Catalog Volume by Genre */}
        <div className="glass-panel rounded-2xl p-5 border border-[#15233D] flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400">
              <BarChart3 className="w-4 h-4" />
            </div>
            <h3 className="font-display font-bold text-white text-base">
              Catalog Volume by Top Genres
            </h3>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={top10ByCount} layout="vertical" margin={{ left: 15, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#14243F" horizontal={false} />
                <XAxis type="number" stroke="#64748B" tick={{ fontSize: 10, fill: '#94A3B8' }} />
                <YAxis dataKey="name" type="category" stroke="#64748B" tick={{ fontSize: 11, fill: '#E2E8F0' }} width={80} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const item = payload[0].payload;
                      return (
                        <div className="bg-[#0B1628] border border-orange-500/40 p-2.5 rounded-xl text-xs">
                          <p className="font-bold text-white">{item.name}</p>
                          <p className="text-orange-400 font-bold mt-1">{item.count.toLocaleString()} titles</p>
                          <p className="text-slate-400 mt-0.5">{item.totalVotes.toLocaleString()} total votes</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="count" fill="#F47521" radius={[0, 4, 4, 0]}>
                  {top10ByCount.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.name === selectedGenreName ? '#FF8C42' : '#F47521'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Interactive Genre Inspector Section */}
      <div className="glass-panel rounded-2xl p-5 border border-[#15233D] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-display font-bold text-white text-base">
              Inspect Genre Deep Dive: <span className="text-orange-400">{activeGenreData?.name}</span>
            </h3>
            <p className="text-xs text-slate-400">
              Select any genre tag to inspect its highest-rated canonical representatives.
            </p>
          </div>

          {/* Quick Genre Chips */}
          <div className="flex flex-wrap gap-1.5 max-w-xl">
            {genreStats.slice(0, 12).map((g) => (
              <button
                key={g.name}
                onClick={() => setSelectedGenreName(g.name)}
                className={`px-3 py-1 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  selectedGenreName === g.name
                    ? 'bg-[#F47521] text-white shadow-md'
                    : 'bg-[#070E1E] text-slate-400 hover:text-white border border-[#14233F]'
                }`}
              >
                {g.name}
              </button>
            ))}
          </div>
        </div>

        {activeGenreData && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-xl bg-[#070E1E] border border-[#15233D] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-400">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400">Catalog Count</span>
                <div className="text-xl font-bold font-display text-white tabular-nums">
                  {activeGenreData.count.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#070E1E] border border-[#15233D] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
                <Star className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400">Average Rating</span>
                <div className="text-xl font-bold font-display text-amber-400 tabular-nums">
                  ★ {activeGenreData.avgRating.toFixed(2)}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#070E1E] border border-[#15233D] flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] text-slate-400">Total Votes</span>
                <div className="text-xl font-bold font-display text-blue-400 tabular-nums">
                  {activeGenreData.totalVotes.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Top 5 Anime in Selected Genre */}
        <div className="mt-4 pt-4 border-t border-[#122036]">
          <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
            Top Rated Anime in {activeGenreData?.name}
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            {activeGenreData?.topAnime.map((anime, rank) => (
              <div
                key={anime.id}
                onClick={() => setSelectedAnime(anime)}
                className="p-3 rounded-xl bg-[#070E1E] border border-[#15233D] hover:border-orange-500/40 cursor-pointer transition-all group"
              >
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[10px] font-mono text-slate-400">#{rank + 1}</span>
                  <span className="text-amber-400 font-bold tabular-nums">★ {anime.rating}</span>
                </div>
                <h5 className="font-semibold text-white text-xs truncate group-hover:text-orange-400 transition-colors">
                  {anime.title}
                </h5>
                <p className="text-[10px] text-slate-400 tabular-nums mt-1">
                  {anime.votes.toLocaleString()} votes
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
