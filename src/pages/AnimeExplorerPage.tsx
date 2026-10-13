import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Star,
  Users,
  Film,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useAnimeData } from '../context/AnimeDataContext';
import { AnimeRecord } from '../types/anime';

export const AnimeExplorerPage: React.FC = () => {
  const { dataset, setSelectedAnime, globalSearch, setGlobalSearch } = useAnimeData();

  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [minRating, setMinRating] = useState<number>(0);
  const [minVotes, setMinVotes] = useState<number>(0);
  const [sortBy, setSortBy] = useState<'rating_desc' | 'rating_asc' | 'votes_desc' | 'title_asc'>('rating_desc');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 24;

  // Extract all unique genres
  const allGenres = useMemo(() => {
    const set = new Set<string>();
    dataset.forEach((a) => a.genres.forEach((g) => set.add(g.trim())));
    return ['All', ...Array.from(set).sort()];
  }, [dataset]);

  // Filter and sort records
  const filteredRecords = useMemo(() => {
    const q = globalSearch.toLowerCase().trim();
    return dataset
      .filter((anime) => {
        if (q && !anime.title.toLowerCase().includes(q)) return false;
        if (selectedGenre !== 'All' && !anime.genres.includes(selectedGenre)) return false;
        if (anime.rating < minRating) return false;
        if (anime.votes < minVotes) return false;
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'rating_desc') return b.rating - a.rating;
        if (sortBy === 'rating_asc') return a.rating - b.rating;
        if (sortBy === 'votes_desc') return b.votes - a.votes;
        if (sortBy === 'title_asc') return a.title.localeCompare(b.title);
        return 0;
      });
  }, [dataset, globalSearch, selectedGenre, minRating, minVotes, sortBy]);

  // Pagination slice
  const totalPages = Math.ceil(filteredRecords.length / itemsPerPage) || 1;
  const currentRecords = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRecords.slice(start, start + itemsPerPage);
  }, [filteredRecords, currentPage]);

  const handleResetFilters = () => {
    setSelectedGenre('All');
    setMinRating(0);
    setMinVotes(0);
    setSortBy('rating_desc');
    setGlobalSearch('');
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
            Anime Explorer
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Browse and filter through {dataset.length.toLocaleString()} Crunchyroll titles with advanced criteria.
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
              viewMode === 'grid'
                ? 'bg-[#F47521] text-white shadow-md'
                : 'bg-[#0B1628] text-slate-400 hover:text-white border border-[#15233D]'
            }`}
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="hidden sm:inline">Grid</span>
          </button>
          <button
            onClick={() => setViewMode('table')}
            className={`p-2 rounded-xl text-xs font-medium flex items-center gap-1.5 transition-all ${
              viewMode === 'table'
                ? 'bg-[#F47521] text-white shadow-md'
                : 'bg-[#0B1628] text-slate-400 hover:text-white border border-[#15233D]'
            }`}
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">Table</span>
          </button>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="glass-panel rounded-2xl p-4 sm:p-5 border border-[#15233D] space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Genre select */}
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">
              Genre
            </label>
            <select
              value={selectedGenre}
              onChange={(e) => {
                setSelectedGenre(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full bg-[#070E1E] border border-[#1E3052] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F47521]"
            >
              {allGenres.slice(0, 30).map((g) => (
                <option key={g} value={g} className="bg-[#070E1E] text-white">
                  {g}
                </option>
              ))}
            </select>
          </div>

          {/* Min Rating */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-slate-400">
                Minimum Rating
              </label>
              <span className="text-xs font-bold text-amber-400 tabular-nums">
                {minRating > 0 ? `≥ ${minRating}` : 'Any'}
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="9"
              step="0.5"
              value={minRating}
              onChange={(e) => {
                setMinRating(parseFloat(e.target.value));
                setCurrentPage(1);
              }}
              className="w-full accent-[#F47521] cursor-pointer"
            />
          </div>

          {/* Min Votes */}
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">
              Popularity (Min Votes)
            </label>
            <select
              value={minVotes}
              onChange={(e) => {
                setMinVotes(parseInt(e.target.value, 10));
                setCurrentPage(1);
              }}
              className="w-full bg-[#070E1E] border border-[#1E3052] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F47521]"
            >
              <option value="0">All Titles</option>
              <option value="10000">10,000+ Votes</option>
              <option value="50000">50,000+ Votes</option>
              <option value="100000">100,000+ Votes</option>
              <option value="500000">500,000+ Votes (Mega Hits)</option>
              <option value="1000000">1,000,000+ Votes (Viral)</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="text-xs font-semibold text-slate-400 block mb-1.5">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value as any);
                setCurrentPage(1);
              }}
              className="w-full bg-[#070E1E] border border-[#1E3052] rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#F47521]"
            >
              <option value="rating_desc">Highest Rating</option>
              <option value="rating_asc">Lowest Rating</option>
              <option value="votes_desc">Most Votes (Popularity)</option>
              <option value="title_asc">Title (A - Z)</option>
            </select>
          </div>
        </div>

        {/* Filter results status bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#122036] text-xs text-slate-400">
          <div>
            Showing <span className="text-white font-semibold tabular-nums">{filteredRecords.length.toLocaleString()}</span> matching anime
          </div>
          {(selectedGenre !== 'All' || minRating > 0 || minVotes > 0 || globalSearch) && (
            <button
              onClick={handleResetFilters}
              className="text-xs text-orange-400 hover:text-orange-300 font-medium underline cursor-pointer"
            >
              Reset all filters
            </button>
          )}
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
          {currentRecords.map((anime) => (
            <div
              key={anime.id}
              onClick={() => setSelectedAnime(anime)}
              className="glass-panel glass-panel-hover rounded-2xl p-4 border border-[#15233D] flex flex-col justify-between cursor-pointer group"
            >
              <div>
                {/* Visual Header / Cover banner placeholder */}
                <div className="h-28 rounded-xl bg-gradient-to-tr from-[#112038] via-[#1B3258] to-[#244577] p-3 flex flex-col justify-between mb-3 relative overflow-hidden group-hover:border group-hover:border-orange-500/30 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-slate-300 border border-white/10">
                      #{anime.id}
                    </span>
                    <span className="text-xs font-bold text-amber-400 flex items-center gap-1 bg-black/50 px-2 py-0.5 rounded-full tabular-nums">
                      <Star className="w-3 h-3 fill-amber-400" />
                      {anime.rating.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-300 font-medium">
                    <Users className="w-3.5 h-3.5 text-blue-400" />
                    <span className="tabular-nums">{anime.votes.toLocaleString()} votes</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-display font-bold text-white text-sm group-hover:text-orange-400 transition-colors line-clamp-2">
                  {anime.title}
                </h3>

                {/* Genres */}
                <div className="flex flex-wrap gap-1 mt-2">
                  {anime.genres.slice(0, 3).map((g) => (
                    <span
                      key={g}
                      className="text-[10px] px-2 py-0.5 rounded bg-[#070E1E] text-slate-300 border border-[#14233F]"
                    >
                      {g}
                    </span>
                  ))}
                  {anime.genres.length > 3 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#070E1E] text-slate-400">
                      +{anime.genres.length - 3}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 mt-3 border-t border-[#122036]">
                <span>{anime.type || 'TV'} · {anime.episodes || 12} eps</span>
                <span className="text-orange-400 group-hover:translate-x-1 transition-transform">
                  Details &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="glass-panel rounded-2xl border border-[#15233D] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#070E1E] border-b border-[#15233D] text-slate-400 font-semibold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 w-12">#</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4 text-right">Rating</th>
                  <th className="py-3 px-4 text-right">Votes</th>
                  <th className="py-3 px-4">Genres</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#122036]">
                {currentRecords.map((anime) => (
                  <tr
                    key={anime.id}
                    onClick={() => setSelectedAnime(anime)}
                    className="hover:bg-[#0E1C33] cursor-pointer transition-colors group"
                  >
                    <td className="py-3 px-4 text-slate-400 font-mono">
                      {anime.id}
                    </td>
                    <td className="py-3 px-4 font-semibold text-white group-hover:text-orange-400 transition-colors">
                      {anime.title}
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-amber-400 tabular-nums">
                      {anime.rating.toFixed(2)}
                    </td>
                    <td className="py-3 px-4 text-right text-slate-300 tabular-nums font-mono">
                      {anime.votes.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {anime.genres.slice(0, 3).join(', ')}
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {anime.type || 'TV'}
                    </td>
                    <td className="py-3 px-4 text-orange-400 font-medium">
                      Inspect &rarr;
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Pagination Footer */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between gap-4 glass-panel p-4 rounded-2xl border border-[#15233D]">
          <span className="text-xs text-slate-400">
            Page <span className="text-white font-semibold tabular-nums">{currentPage}</span> of{' '}
            <span className="text-white font-semibold tabular-nums">{totalPages}</span>
          </span>

          <div className="flex items-center gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              className="p-2 rounded-xl bg-[#0B1628] border border-[#15233D] text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              className="p-2 rounded-xl bg-[#0B1628] border border-[#15233D] text-slate-300 hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
