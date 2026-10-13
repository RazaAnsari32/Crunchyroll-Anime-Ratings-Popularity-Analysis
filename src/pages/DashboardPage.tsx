import React from 'react';
import {
  Flame,
  Star,
  Users,
  Tag,
  Trophy,
  Compass,
  Boxes,
  Route,
  Sparkles,
  GraduationCap,
  Layers,
  Code2,
} from 'lucide-react';
import { useAnimeData } from '../context/AnimeDataContext';
import { StatCard } from '../components/common/StatCard';
import { RatingDistributionChart } from '../components/charts/RatingDistributionChart';
import { GenreDonutChart } from '../components/charts/GenreDonutChart';
import { VotesVsRatingScatter } from '../components/charts/VotesVsRatingScatter';
import { PROJECT_TEAM_MEMBERS } from '../types/anime';

export const DashboardPage: React.FC = () => {
  const {
    dataset,
    metrics,
    setActiveTab,
    setSelectedAnime,
  } = useAnimeData();

  // Pick top 5 for the bottom cards
  const topRatedFive = metrics.topRated.slice(0, 5);
  const topVotedFive = metrics.topVoted.slice(0, 5);

  return (
    <div className="space-y-6 pb-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <span>Crunchyroll Data Science</span>
        <span>&gt;</span>
        <span className="text-white font-medium">Dashboard Overview</span>
      </div>

      {/* Cinematic Hero Section */}
      <div className="relative rounded-3xl overflow-hidden border border-[#15233D] min-h-[300px] flex items-center shadow-2xl">
        {/* Background Image */}
        <img
          src="/src/assets/images/anime_hero_sunset_1791900925884.jpg"
          alt="Cinematic Anime Sunset"
          className="absolute inset-0 w-full h-full object-cover object-center"
          referrerPolicy="no-referrer"
        />

        {/* Cinematic Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#050B18] via-[#050B18]/85 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050B18] via-transparent to-black/20" />

        {/* Content */}
        <div className="relative z-10 p-6 sm:p-10 max-w-2xl space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-[#F47521] tracking-wider uppercase">
            <span>Welcome To</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
            Crunchyroll Anime<br />
            <span className="bg-gradient-to-r from-[#F47521] via-[#FF8C42] to-amber-300 bg-clip-text text-transparent">
              Ratings &amp; Popularity Analysis
            </span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
            Explore anime data, uncover genre trends, and discover what makes anime popular through data science techniques.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('genres')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#F47521] to-[#FF8C42] hover:from-[#E05E09] hover:to-[#F47521] text-white text-xs sm:text-sm font-semibold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all cursor-pointer"
            >
              Explore EDA
            </button>
            <button
              onClick={() => setActiveTab('clusters')}
              className="px-5 py-2.5 rounded-xl bg-[#0B1628]/80 hover:bg-[#122340] border border-[#1E3358] text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Boxes className="w-4 h-4 text-purple-400" />
              <span>K-Means Clusters</span>
            </button>
            <button
              onClick={() => setActiveTab('study_path')}
              className="px-5 py-2.5 rounded-xl bg-[#0B1628]/80 hover:bg-[#122340] border border-[#1E3358] text-slate-300 hover:text-white text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center gap-1.5"
            >
              <Route className="w-4 h-4 text-cyan-400" />
              <span>A* Study Path</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Stat Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Total Anime"
          value={metrics.totalAnime.toLocaleString()}
          sublabel="in dataset"
          icon={Flame}
          iconBgColor="bg-orange-500/20"
          iconColor="text-orange-400"
        />
        <StatCard
          label="Average Rating"
          value={metrics.avgRating.toFixed(2)}
          sublabel="out of 10"
          icon={Star}
          iconBgColor="bg-purple-500/20"
          iconColor="text-purple-400"
        />
        <StatCard
          label="Total Votes"
          value={metrics.totalVotes.toLocaleString()}
          sublabel="across all anime"
          icon={Users}
          iconBgColor="bg-blue-500/20"
          iconColor="text-blue-400"
        />
        <StatCard
          label="Total Genres"
          value={metrics.totalGenres}
          sublabel="unique genres"
          icon={Tag}
          iconBgColor="bg-cyan-500/20"
          iconColor="text-cyan-400"
        />
      </div>

      {/* 3 Visualizations Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <RatingDistributionChart
          data={metrics.ratingDistribution}
          onViewAll={() => setActiveTab('genres')}
        />
        <GenreDonutChart
          data={metrics.genreDistribution}
          totalAnime={metrics.totalAnime}
        />
        <VotesVsRatingScatter records={dataset} />
      </div>

      {/* Bottom 3 Columns Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Top Rated Anime Table */}
        <div className="lg:col-span-5 glass-panel rounded-2xl p-5 border border-[#15233D] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400">
                  <Trophy className="w-4 h-4" />
                </div>
                <h3 className="font-display font-bold text-white text-base">
                  Top Rated Anime
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('dataset')}
                className="text-xs text-orange-400 hover:text-orange-300 font-medium cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-[#15233D] text-slate-400 font-medium pb-2">
                    <th className="pb-2 pl-1 w-6">#</th>
                    <th className="pb-2">Title</th>
                    <th className="pb-2 text-right">Rating</th>
                    <th className="pb-2 text-right pr-2">Votes</th>
                    <th className="pb-2 hidden sm:table-cell">Genres</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#122036]">
                  {topRatedFive.map((anime, idx) => (
                    <tr
                      key={anime.id}
                      onClick={() => setSelectedAnime(anime)}
                      className="hover:bg-[#0E1C33] cursor-pointer transition-colors group"
                    >
                      <td className="py-2.5 pl-1 font-semibold text-slate-400">
                        {idx + 1}
                      </td>
                      <td className="py-2.5 pr-2 font-medium text-white group-hover:text-orange-400 transition-colors max-w-[160px] truncate">
                        {anime.title}
                      </td>
                      <td className="py-2.5 text-right font-bold text-amber-400 tabular-nums">
                        {anime.rating.toFixed(2)}
                      </td>
                      <td className="py-2.5 text-right pr-2 text-slate-400 tabular-nums">
                        {anime.votes.toLocaleString()}
                      </td>
                      <td className="py-2.5 hidden sm:table-cell text-slate-400 max-w-[120px] truncate">
                        {anime.genres.slice(0, 2).join(', ')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Popular Anime by Votes List */}
        <div className="lg:col-span-4 glass-panel rounded-2xl p-5 border border-[#15233D] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-orange-500/10 flex items-center justify-center text-orange-400">
                  <Flame className="w-4 h-4" />
                </div>
                <h3 className="font-display font-bold text-white text-base">
                  Popular Anime by Votes
                </h3>
              </div>
              <button
                onClick={() => setActiveTab('dataset')}
                className="text-xs text-orange-400 hover:text-orange-300 font-medium cursor-pointer"
              >
                View All
              </button>
            </div>

            <div className="space-y-3">
              {topVotedFive.map((anime, idx) => (
                <div
                  key={anime.id}
                  onClick={() => setSelectedAnime(anime)}
                  className="flex items-center justify-between p-2 rounded-xl hover:bg-[#0E1C33] cursor-pointer transition-colors group border border-transparent hover:border-[#1E3052]"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-orange-500/20 to-purple-500/20 border border-orange-500/30 flex items-center justify-center font-display font-bold text-xs text-orange-300 shrink-0">
                      {idx + 1}
                    </div>
                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-white truncate group-hover:text-orange-400 transition-colors">
                        {anime.title}
                      </p>
                      <p className="text-[11px] text-slate-400 truncate">
                        {anime.genres.slice(0, 2).join(', ')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right text-xs font-bold text-slate-300 tabular-nums shrink-0 pl-2">
                    {anime.votes.toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Actions & Anime Quote Card */}
        <div className="lg:col-span-3 space-y-4">
          <div className="glass-panel rounded-2xl p-5 border border-[#15233D] space-y-3">
            <div className="flex items-center gap-2 mb-1">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="font-display font-bold text-white text-base">
                Quick Actions
              </h3>
            </div>

            <button
              onClick={() => setActiveTab('genres')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#F47521] to-[#FF8C42] hover:from-[#E05E09] hover:to-[#F47521] text-white text-xs font-semibold shadow-md shadow-orange-500/20 transition-all cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>Explore EDA</span>
            </button>

            <button
              onClick={() => setActiveTab('clusters')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#0B1628] hover:bg-[#122340] border border-[#1E3358] text-slate-200 hover:text-white text-xs font-semibold transition-all cursor-pointer"
            >
              <Boxes className="w-4 h-4 text-purple-400" />
              <span>View Clusters</span>
            </button>

            <button
              onClick={() => setActiveTab('study_path')}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#0B1628] hover:bg-[#122340] border border-[#1E3358] text-slate-200 hover:text-white text-xs font-semibold transition-all cursor-pointer"
            >
              <Route className="w-4 h-4 text-cyan-400" />
              <span>A* Study Path</span>
            </button>
          </div>

          {/* Inspirational Anime Quote Card */}
          <div className="glass-panel rounded-2xl p-4 border border-[#15233D] bg-gradient-to-br from-[#0B1628] to-[#121E36]">
            <div className="text-2xl text-orange-400/80 font-serif leading-none">“</div>
            <p className="text-xs font-medium text-slate-200 italic -mt-2 leading-relaxed">
              Good anime isn't just watched, it's felt.
            </p>
            <p className="text-[10px] text-slate-400 mt-2 font-mono">
              アニメはただ見るものじゃない、感じるものだ。
            </p>
          </div>
        </div>
      </div>

      {/* Project Team & Contributors Section (Matching Image 1) */}
      <div className="glass-panel rounded-2xl p-6 border border-[#15233D] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#15233D] pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-white text-base">
                Project Team &amp; Contributors
              </h3>
              <p className="text-[11px] text-slate-400">
                Department of Information Technology · Semester V (5th) · Course: INFT (IDS-1 LAB) · SFIT Mumbai
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-orange-400 bg-orange-950/40 px-3 py-1 rounded-full border border-orange-800/40 self-start sm:self-auto">
            Semester V (5th) · INFT (IDS-1 LAB)
          </span>
        </div>

        {/* 4 Team Member Cards (Matching Image 1 layout) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PROJECT_TEAM_MEMBERS.map((member) => (
            <div
              key={member.id}
              className="p-4 rounded-xl bg-[#070E1E] border border-[#15233D] hover:border-orange-500/40 transition-colors space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 font-mono font-bold text-xs flex items-center justify-center">
                  {member.id}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  Roll No: {member.rollNo}
                </span>
              </div>

              <div>
                <h4 className="font-display font-bold text-white text-sm">
                  {member.name}
                </h4>
                <span className="inline-block px-2 py-0.5 mt-1 rounded bg-[#101D36] text-[10px] font-semibold text-orange-300 border border-orange-800/30">
                  {member.role}
                </span>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed border-t border-[#122036] pt-2">
                {member.contributions}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
