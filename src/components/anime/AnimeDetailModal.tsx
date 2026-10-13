import React from 'react';
import { X, Star, Users, Film, Calendar, Tag, Sparkles } from 'lucide-react';
import { AnimeRecord } from '../../types/anime';

interface AnimeDetailModalProps {
  anime: AnimeRecord | null;
  onClose: () => void;
}

export const AnimeDetailModal: React.FC<AnimeDetailModalProps> = ({ anime, onClose }) => {
  if (!anime) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-xl bg-[#0B1628] border border-[#1E3052] rounded-2xl shadow-2xl overflow-hidden">
        {/* Top Header Background Banner */}
        <div className="relative h-32 bg-gradient-to-r from-orange-600/30 via-purple-600/30 to-blue-600/30 p-6 flex flex-col justify-end">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-black/40 text-slate-300 hover:text-white hover:bg-black/60 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2 text-xs font-semibold text-orange-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Crunchyroll Analytics Entry #{anime.id}</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-white truncate mt-1">
            {anime.title}
          </h2>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-3 p-3.5 rounded-xl bg-[#070E1E] border border-[#15233D]">
            <div className="text-center">
              <span className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> Rating
              </span>
              <div className="text-xl font-bold font-display text-white tabular-nums mt-0.5">
                {anime.rating.toFixed(2)}
              </div>
              <span className="text-[10px] text-slate-400">out of 10</span>
            </div>

            <div className="text-center border-x border-[#15233D]">
              <span className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                <Users className="w-3.5 h-3.5 text-blue-400" /> Votes
              </span>
              <div className="text-xl font-bold font-display text-white tabular-nums mt-0.5">
                {anime.votes.toLocaleString()}
              </div>
              <span className="text-[10px] text-slate-400">community votes</span>
            </div>

            <div className="text-center">
              <span className="text-[11px] text-slate-400 flex items-center justify-center gap-1">
                <Film className="w-3.5 h-3.5 text-purple-400" /> Format
              </span>
              <div className="text-xl font-bold font-display text-white mt-0.5">
                {anime.type || 'TV'}
              </div>
              <span className="text-[10px] text-slate-400">
                {anime.episodes ? `${anime.episodes} episodes` : 'Standard'}
              </span>
            </div>
          </div>

          {/* Genres */}
          <div>
            <span className="text-xs font-semibold text-slate-400 flex items-center gap-1.5 mb-2">
              <Tag className="w-3.5 h-3.5 text-orange-400" /> Genres &amp; Tags
            </span>
            <div className="flex flex-wrap gap-1.5">
              {anime.genres.map((g) => (
                <span
                  key={g}
                  className="px-2.5 py-1 rounded-lg text-xs font-medium bg-[#14233F] text-slate-200 border border-[#1E355E]"
                >
                  {g}
                </span>
              ))}
            </div>
          </div>

          {/* Synopsis */}
          <div>
            <h4 className="text-xs font-semibold text-slate-400 mb-1.5">Synopsis</h4>
            <p className="text-sm text-slate-300 leading-relaxed bg-[#070E1E] p-3.5 rounded-xl border border-[#15233D]">
              {anime.synopsis ||
                `${anime.title} is a prominent entry in the Crunchyroll anime catalog. With an aggregate rating of ${anime.rating} and ${anime.votes.toLocaleString()} community votes, it forms an essential reference point for audience preference analysis.`}
            </p>
          </div>

          {/* Metadata footer */}
          <div className="flex items-center justify-between pt-3 border-t border-[#15233D] text-xs text-slate-400">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {anime.releaseYear ? `Released: ${anime.releaseYear}` : 'Catalog Release'}
            </span>
            <span className="text-emerald-400 font-medium">
              {anime.status || 'Finished Airing'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
