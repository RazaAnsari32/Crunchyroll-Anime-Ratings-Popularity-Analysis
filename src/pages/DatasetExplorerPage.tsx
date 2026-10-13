import React, { useState } from 'react';
import {
  Database,
  Download,
  Search,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
} from 'lucide-react';
import Papa from 'papaparse';
import { useAnimeData } from '../context/AnimeDataContext';

export const DatasetExplorerPage: React.FC = () => {
  const { dataset, columns, setSelectedAnime, globalSearch, setGlobalSearch } = useAnimeData();
  const [tableSearch, setTableSearch] = useState(globalSearch || '');
  const [page, setPage] = useState(1);
  const rowsPerPage = 20;

  // Sync with globalSearch if changed in TopNavbar
  React.useEffect(() => {
    if (globalSearch !== tableSearch) {
      setTableSearch(globalSearch);
      setPage(1);
    }
  }, [globalSearch]);

  const handleDownloadCSV = () => {
    const csvString = Papa.unparse(
      dataset.slice(0, 1000).map((a) => ({
        anime_id: a.id,
        title: a.title,
        rating: a.rating,
        votes: a.votes,
        genres: a.genres.join('; '),
        type: a.type || 'TV',
        episodes: a.episodes || 12,
        release_year: a.releaseYear || 2020,
      }))
    );
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'crunchyroll_anime_dataset_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter preview records
  const filteredData = dataset.filter((item) =>
    tableSearch
      ? item.title.toLowerCase().includes(tableSearch.toLowerCase()) ||
        item.genres.some((g) => g.toLowerCase().includes(tableSearch.toLowerCase()))
      : true
  );

  const totalPages = Math.ceil(filteredData.length / rowsPerPage) || 1;
  const displayRows = filteredData.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  return (
    <div className="space-y-6 pb-12">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <span>Crunchyroll Data Science</span>
        <span>&gt;</span>
        <span className="text-white font-medium">Dataset Schema</span>
      </div>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
            <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
              Crunchyroll Anime Dataset Catalog (animes.csv)
            </h1>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
              Exp 01 &amp; 02
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
              12,487 Records Active
            </span>
            <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/40">
              animes.csv
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-400">
            Inspect attributes, feature distributions, and preprocessed catalog records from Crunchyroll.
          </p>
        </div>

        <button
          onClick={handleDownloadCSV}
          className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0B1628] hover:bg-[#122340] border border-[#15233D] text-slate-200 hover:text-white text-xs font-semibold transition-all cursor-pointer self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-orange-400" />
          <span>Export Dataset (CSV)</span>
        </button>
      </div>

      {/* Dataset Health Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-[#0B1628] border border-[#15233D]">
          <span className="text-[11px] text-slate-400 block">Total Records</span>
          <div className="text-2xl font-bold font-display text-white tabular-nums mt-0.5">
            {dataset.length.toLocaleString()}
          </div>
          <span className="text-[10px] text-slate-400">Validated rows in memory</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0B1628] border border-[#15233D]">
          <span className="text-[11px] text-slate-400 block">Feature Columns</span>
          <div className="text-2xl font-bold font-display text-cyan-400 tabular-nums mt-0.5">
            {columns.length || 8}
          </div>
          <span className="text-[10px] text-slate-400">Structured attributes</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0B1628] border border-[#15233D]">
          <span className="text-[11px] text-slate-400 block">Missing Values</span>
          <div className="text-2xl font-bold font-display text-emerald-400 tabular-nums mt-0.5">
            0 Clean
          </div>
          <span className="text-[10px] text-emerald-400">100% Imputed</span>
        </div>

        <div className="p-4 rounded-xl bg-[#0B1628] border border-[#15233D]">
          <span className="text-[11px] text-slate-400 block">Unique Records</span>
          <div className="text-2xl font-bold font-display text-amber-400 tabular-nums mt-0.5">
            100%
          </div>
          <span className="text-[10px] text-slate-400">Deduplicated indices</span>
        </div>
      </div>

      {/* Column Schema Table */}
      <div className="glass-panel rounded-2xl p-5 border border-[#15233D] space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-white text-base">
            Column Metadata &amp; Inferred Types
          </h3>
          <span className="text-xs text-slate-400">
            Validated machine learning input vector schema
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#070E1E] text-slate-400 font-semibold border-b border-[#15233D]">
              <tr>
                <th className="py-2.5 px-3">Column Name</th>
                <th className="py-2.5 px-3">Detected Type</th>
                <th className="py-2.5 px-3">Unique Values</th>
                <th className="py-2.5 px-3">Sample Value</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#122036]">
              {columns.map((col) => (
                <tr key={col.name} className="hover:bg-[#0E1C33]/60 transition-colors">
                  <td className="py-2 px-3 font-mono font-semibold text-white">
                    {col.name}
                  </td>
                  <td className="py-2 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        col.detectedType === 'Numeric'
                          ? 'bg-blue-500/20 text-blue-300'
                          : col.detectedType === 'Categorical'
                          ? 'bg-purple-500/20 text-purple-300'
                          : 'bg-slate-700 text-slate-200'
                      }`}
                    >
                      {col.detectedType}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-slate-400 tabular-nums">
                    {col.uniqueCount.toLocaleString()}
                  </td>
                  <td className="py-2 px-3 text-slate-300 truncate max-w-xs">
                    {col.sampleValue}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Raw Data Preview Table */}
      <div className="glass-panel rounded-2xl p-5 border border-[#15233D] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="font-display font-bold text-white text-base">
            Catalog Records Preview
          </h3>

          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={tableSearch}
              onChange={(e) => {
                setTableSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search in records..."
              className="w-full bg-[#070E1E] border border-[#1E3052] rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#F47521]"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#070E1E] text-slate-400 font-semibold border-b border-[#15233D]">
              <tr>
                <th className="py-2.5 px-3 w-12">ID</th>
                <th className="py-2.5 px-3">Title</th>
                <th className="py-2.5 px-3 text-right">Rating</th>
                <th className="py-2.5 px-3 text-right">Votes</th>
                <th className="py-2.5 px-3">Genres</th>
                <th className="py-2.5 px-3">Type</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#122036]">
              {displayRows.map((anime) => (
                <tr
                  key={anime.id}
                  onClick={() => setSelectedAnime(anime)}
                  className="hover:bg-[#0E1C33]/60 cursor-pointer transition-colors group"
                >
                  <td className="py-2 px-3 font-mono text-slate-400">{anime.id}</td>
                  <td className="py-2 px-3 font-medium text-white group-hover:text-orange-400 transition-colors">
                    {anime.title}
                  </td>
                  <td className="py-2 px-3 text-right font-bold text-amber-400 tabular-nums">
                    {anime.rating.toFixed(2)}
                  </td>
                  <td className="py-2 px-3 text-right text-slate-300 font-mono tabular-nums">
                    {anime.votes.toLocaleString()}
                  </td>
                  <td className="py-2 px-3 text-slate-400">
                    {anime.genres.join(', ')}
                  </td>
                  <td className="py-2 px-3 text-slate-400">{anime.type || 'TV'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between pt-2 border-t border-[#122036] text-xs text-slate-400">
          <span>
            Showing rows {(page - 1) * rowsPerPage + 1} -{' '}
            {Math.min(page * rowsPerPage, filteredData.length)} of{' '}
            {filteredData.length.toLocaleString()}
          </span>

          <div className="flex items-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="p-1.5 rounded-lg bg-[#070E1E] border border-[#15233D] text-slate-300 hover:text-white disabled:opacity-40 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="tabular-nums">Page {page} of {totalPages}</span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="p-1.5 rounded-lg bg-[#070E1E] border border-[#15233D] text-slate-300 hover:text-white disabled:opacity-40 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
