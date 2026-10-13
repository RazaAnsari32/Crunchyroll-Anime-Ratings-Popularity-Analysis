import React from 'react';
import {
  Home,
  Database,
  Filter,
  BarChart2,
  Sigma,
  TrendingUp,
  Target,
  Boxes,
  Layers,
  Route,
  Info,
  X,
  GraduationCap,
} from 'lucide-react';
import { useAnimeData } from '../../context/AnimeDataContext';
import { PROJECT_TEAM_MEMBERS } from '../../types/anime';

interface SidebarProps {
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onCloseMobile }) => {
  const { activeTab, setActiveTab } = useAnimeData();

  // Navigation items matching side panel specifications:
  // Note: 'report' was removed and replaced with 'about'
  const navItems = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'dataset', label: 'Dataset', icon: Database },
    { id: 'preprocessing', label: 'Preprocessing', icon: Filter },
    { id: 'genres', label: 'EDA', icon: BarChart2 },
    { id: 'statistics', label: 'Statistics', icon: Sigma },
    { id: 'regression', label: 'Regression', icon: TrendingUp },
    { id: 'classification', label: 'Classification', icon: Target },
    { id: 'clusters', label: 'Clustering', icon: Boxes },
    { id: 'pca', label: 'PCA', icon: Layers },
    { id: 'study_path', label: 'Study Path', icon: Route },
    { id: 'about', label: 'About', icon: Info },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    if (mobileOpen) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-[#0A1224] border-r border-[#15233D] flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Header / Brand matching Crunchyroll theme without ML badge */}
        <div className="p-5 border-b border-[#15233D] flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Crunchyroll Orange stylized badge */}
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#F47521] to-[#FF8C42] flex items-center justify-center shadow-lg shadow-orange-500/25 shrink-0">
              <div className="w-4 h-4 rounded-full border-2 border-white/95 border-t-transparent -rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display text-base font-bold tracking-tight text-white">
                  crunchyroll
                </span>
              </div>
              <p className="text-[10px] font-medium text-slate-400 tracking-wide">
                Experiments 1–10 Suite
              </p>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800/50"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 px-3 py-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-[#F47521] to-[#E05E09] text-white shadow-lg shadow-orange-500/25 font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-[#0E1B33]'
                }`}
              >
                <Icon
                  className={`w-4 h-4 shrink-0 ${
                    isActive ? 'text-white' : 'text-slate-400'
                  }`}
                />
                <span className="truncate">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* College Project Group Members Footer Badge */}
        <div className="p-3.5 border-t border-[#15233D] bg-[#070E1E]/80">
          <div
            onClick={() => handleNavClick('about')}
            className="flex items-center justify-between text-[11px] text-slate-400 mb-2 cursor-pointer hover:text-white transition-colors"
          >
            <span className="font-semibold text-slate-200 flex items-center gap-1.5">
              <GraduationCap className="w-3.5 h-3.5 text-orange-400" />
              <span>Project Group</span>
            </span>
            <span className="text-orange-400 font-mono text-[10px] bg-orange-950/40 px-1.5 py-0.5 rounded border border-orange-800/40">
              Sem V · INFT (IDS-1 LAB)
            </span>
          </div>

          <div className="space-y-1 text-[11px] text-slate-300">
            {PROJECT_TEAM_MEMBERS.map((member) => (
              <div
                key={member.id}
                onClick={() => handleNavClick('about')}
                className="truncate flex items-center justify-between hover:text-orange-300 cursor-pointer transition-colors py-0.5"
              >
                <span className="truncate pr-1">
                  • {member.name} ({member.role.split('&')[0].trim()})
                </span>
                <span className="text-orange-400 font-mono text-[10px] shrink-0">
                  {member.rollNo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
};
