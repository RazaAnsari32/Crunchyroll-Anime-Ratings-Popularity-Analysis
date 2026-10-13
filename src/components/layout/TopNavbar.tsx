import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Search,
  Menu,
  GraduationCap,
  ChevronDown,
  X,
  Star,
  Users,
  Film,
  Sparkles,
  Check,
  ArrowRight,
  Database,
} from 'lucide-react';
import { useAnimeData } from '../../context/AnimeDataContext';
import { PROJECT_TEAM_MEMBERS, AnimeRecord } from '../../types/anime';

interface TopNavbarProps {
  onOpenMobileSidebar: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ onOpenMobileSidebar }) => {
  const {
    globalSearch,
    setGlobalSearch,
    setActiveTab,
    dataset,
    setSelectedAnime,
  } = useAnimeData();

  // Active switchable group member (defaults to Raza Ansari, Roll 62)
  const [activeMemberId, setActiveMemberId] = useState<string>('01');
  const [teamDropdownOpen, setTeamDropdownOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const teamDropdownRef = useRef<HTMLDivElement>(null);

  const activeMember =
    PROJECT_TEAM_MEMBERS.find((m) => m.id === activeMemberId) ||
    PROJECT_TEAM_MEMBERS[0];

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .slice(0, 2);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setSearchFocused(false);
      }
      if (
        teamDropdownRef.current &&
        !teamDropdownRef.current.contains(event.target as Node)
      ) {
        setTeamDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute live responsive search results across the entire dataset
  const searchResults = useMemo(() => {
    const q = globalSearch.trim().toLowerCase();
    if (!q) return [];

    return dataset
      .filter((anime) => {
        const titleMatch = anime.title.toLowerCase().includes(q);
        const genreMatch = anime.genres.some((g) => g.toLowerCase().includes(q));
        const synMatch = anime.synopsis?.toLowerCase().includes(q);
        return titleMatch || genreMatch || synMatch;
      })
      .slice(0, 8); // Top 8 relevant matches
  }, [globalSearch, dataset]);

  const handleSelectAnime = (anime: AnimeRecord) => {
    setSelectedAnime(anime);
    setSearchFocused(false);
  };

  const handleOpenInDataset = () => {
    setActiveTab('dataset');
    setSearchFocused(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (searchResults.length > 0) {
        setSelectedAnime(searchResults[0]);
        setSearchFocused(false);
      } else {
        handleOpenInDataset();
      }
    } else if (e.key === 'Escape') {
      setSearchFocused(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 h-18 bg-[#050B18]/95 backdrop-blur-md border-b border-[#15233D] px-4 lg:px-8 flex items-center justify-between gap-4">
      {/* Mobile Hamburger & Left Responsive Search */}
      <div className="flex items-center gap-3 flex-1 max-w-2xl">
        <button
          onClick={onOpenMobileSidebar}
          className="lg:hidden p-2 text-slate-400 hover:text-white rounded-xl hover:bg-[#0E1B33]"
          aria-label="Open navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Global Interactive Live Search Bar */}
        <div ref={searchContainerRef} className="relative w-full max-w-lg">
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <input
              type="text"
              value={globalSearch}
              onChange={(e) => {
                setGlobalSearch(e.target.value);
                setSearchFocused(true);
              }}
              onFocus={() => setSearchFocused(true)}
              onKeyDown={handleKeyDown}
              placeholder="Search anime from dataset... (e.g. Naruto, One Piece, Bleach, Jujutsu)"
              className="w-full bg-[#0B1628] border border-[#1A2C4C] rounded-xl pl-10 pr-9 py-2 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#F47521] focus:ring-1 focus:ring-[#F47521] transition-all"
            />
            {globalSearch && (
              <button
                onClick={() => {
                  setGlobalSearch('');
                  setSearchFocused(false);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white rounded-md cursor-pointer"
                aria-label="Clear search"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Live Search Results Dropdown Overlay */}
          {searchFocused && globalSearch.trim().length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#0B1628] border border-[#1E3052] rounded-2xl shadow-2xl overflow-hidden z-50 animate-fade-in divide-y divide-[#15233D]">
              <div className="p-2.5 bg-[#070E1E] flex items-center justify-between text-xs text-slate-400">
                <span className="font-semibold text-slate-300">
                  {searchResults.length > 0
                    ? `Found ${searchResults.length} matches for "${globalSearch}"`
                    : `No matches found for "${globalSearch}"`}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  Press Enter or Click to view details
                </span>
              </div>

              {searchResults.length > 0 ? (
                <>
                  <div className="max-h-80 overflow-y-auto divide-y divide-[#122036]">
                    {searchResults.map((anime) => (
                      <div
                        key={anime.id}
                        onClick={() => handleSelectAnime(anime)}
                        className="p-3 hover:bg-[#11223F] cursor-pointer transition-colors flex items-center justify-between gap-3 group"
                      >
                        <div className="min-w-0 flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/30 flex items-center justify-center font-display font-bold text-xs text-orange-400 shrink-0 overflow-hidden">
                            {anime.imageUrl ? (
                              <img
                                src={anime.imageUrl}
                                alt={anime.title}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display = 'none';
                                }}
                              />
                            ) : (
                              <span>#{anime.id}</span>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-white group-hover:text-orange-400 transition-colors truncate">
                              {anime.title}
                            </p>
                            <p className="text-[11px] text-slate-400 truncate">
                              {anime.genres.slice(0, 3).join(', ')} · {anime.type || 'TV'}
                            </p>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <div className="text-xs font-bold text-amber-400 tabular-nums flex items-center justify-end gap-1">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span>{anime.rating.toFixed(2)}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 tabular-nums">
                            {anime.votes.toLocaleString()} votes
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2.5 bg-[#070E1E] flex items-center justify-between">
                    <button
                      onClick={handleOpenInDataset}
                      className="text-xs text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Database className="w-3.5 h-3.5" />
                      <span>View full results in Dataset Table</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] text-slate-500">
                      Total Catalog: {dataset.length.toLocaleString()}
                    </span>
                  </div>
                </>
              ) : (
                <div className="p-6 text-center text-xs text-slate-400 space-y-3">
                  <p>No exact match found in current catalog for "{globalSearch}".</p>
                  <div className="text-[11px] text-slate-500">
                    Try searching for popular canonical titles:
                  </div>
                  <div className="flex flex-wrap justify-center gap-1.5 pt-1">
                    {['Naruto', 'One Piece', 'Bleach', 'Jujutsu Kaisen', 'Demon Slayer', 'Chainsaw Man', 'Steins;Gate'].map((suggest) => (
                      <button
                        key={suggest}
                        onClick={() => {
                          setGlobalSearch(suggest);
                        }}
                        className="px-2 py-1 rounded-lg bg-[#070E1E] text-orange-400 hover:text-white border border-[#15233D] cursor-pointer text-xs"
                      >
                        {suggest}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Catalog Record Badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#0B1628] border border-[#1A2C4C] text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-slate-300 font-medium">
            {dataset.length.toLocaleString()} Anime Indexed
          </span>
        </div>

        {/* Project Group Profile / Switchable Dropdown */}
        <div ref={teamDropdownRef} className="relative">
          <button
            onClick={() => setTeamDropdownOpen(!teamDropdownOpen)}
            className="flex items-center gap-2.5 p-1.5 sm:px-3 sm:py-1.5 rounded-xl bg-[#0B1628] hover:bg-[#122340] border border-[#1A2C4C] transition-all cursor-pointer group"
            title="Click to switch active project team member view"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#F47521] via-amber-500 to-orange-400 p-[1.5px] shadow-sm shrink-0">
              <div className="w-full h-full rounded-full bg-[#0B1628] flex items-center justify-center text-xs font-bold text-white group-hover:text-orange-400 transition-colors">
                {getInitials(activeMember.name)}
              </div>
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-semibold text-slate-200 leading-none group-hover:text-white">
                {activeMember.name}
              </div>
              <div className="text-[10px] text-orange-400 leading-tight mt-0.5 font-medium">
                Roll: {activeMember.rollNo} · {activeMember.role.split('&')[0].trim()}
              </div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-white transition-colors hidden sm:block" />
          </button>

          {/* Dropdown Menu showing all 4 switchable project group members */}
          {teamDropdownOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-[#0B1628] border border-[#1E3052] rounded-2xl shadow-2xl p-3 z-50 animate-fade-in">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#15233D] text-xs font-bold text-white">
                <div className="flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-orange-400" />
                  <span>Switch Team Member View</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  Sem V (5th) · INFT (IDS-1 LAB)
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                {PROJECT_TEAM_MEMBERS.map((m) => {
                  const isSelected = m.id === activeMember.id;
                  return (
                    <div
                      key={m.id}
                      onClick={() => {
                        setActiveMemberId(m.id);
                        setTeamDropdownOpen(false);
                      }}
                      className={`p-2.5 rounded-xl cursor-pointer transition-all flex items-start justify-between gap-2.5 ${
                        isSelected
                          ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/10 border border-orange-500/40 text-white'
                          : 'bg-[#070E1E] hover:bg-[#101F38] border border-[#15233D] text-slate-300'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
                            isSelected
                              ? 'bg-[#F47521] text-white'
                              : 'bg-slate-800 text-slate-300'
                          }`}
                        >
                          {getInitials(m.name)}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-xs truncate flex items-center gap-1.5">
                            <span className={isSelected ? 'text-orange-300' : 'text-white'}>
                              {m.name}
                            </span>
                            {isSelected && (
                              <span className="text-[9px] bg-orange-500 text-white px-1.5 py-0.2 rounded font-bold uppercase tracking-wider">
                                Active
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">
                            {m.role}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col items-end shrink-0 gap-1">
                        <span className="text-[10px] font-mono text-orange-400 bg-orange-950/40 px-1.5 py-0.5 rounded border border-orange-800/40">
                          Roll: {m.rollNo}
                        </span>
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-orange-400" />
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2.5 mt-2.5 border-t border-[#15233D] text-[10px] text-slate-400 flex items-center justify-between">
                <span>Semester V (5th) · Course: INFT (IDS-1 LAB)</span>
                <span className="text-orange-400 font-mono">SFIT Mumbai</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
