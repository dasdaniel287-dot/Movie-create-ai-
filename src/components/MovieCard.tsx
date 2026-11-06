import React from 'react';
import { 
  Play, 
  Download, 
  Plus, 
  Check, 
  Star, 
  ShieldCheck, 
  Info,
  Clock
} from 'lucide-react';
import { Movie } from '../types/movie';
import { useApp } from '../context/AppContext';

interface MovieCardProps {
  movie: Movie;
  showProgress?: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, showProgress = true }) => {
  const { 
    setSelectedMovie, 
    setStreamingMovie, 
    setDownloadModalMovie, 
    watchlist, 
    toggleWatchlist,
    getMovieProgress,
    isFavorite,
    toggleFavorite
  } = useApp();

  const inWatchlist = watchlist.includes(movie.id);
  const favorite = isFavorite(movie.id);
  const progressSec = getMovieProgress(movie.id);
  const totalSec = movie.runtime * 60;
  const progressPercent = totalSec > 0 ? Math.min(100, Math.round((progressSec / totalSec) * 100)) : 0;

  return (
    <div className="group relative flex flex-col rounded-2xl overflow-hidden bg-[#12141c] border border-white/10 hover:border-amber-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 hover:-translate-y-1.5">
      
      {/* Poster Image Container */}
      <div 
        onClick={() => setSelectedMovie(movie)}
        className="relative aspect-[2/3] w-full overflow-hidden cursor-pointer bg-slate-900"
      >
        <img
          src={movie.posterUrl}
          alt={movie.title}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-10">
          {/* Rating */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-amber-400 font-bold text-[11px] shadow">
            <Star className="w-3 h-3 fill-amber-400" />
            <span>{movie.imdbScore}</span>
          </div>

          {/* Legal License Chip */}
          <div className="px-2 py-0.5 rounded-full bg-emerald-950/80 backdrop-blur-md border border-emerald-500/40 text-emerald-300 font-medium text-[10px] flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            <span>{movie.licenseType === 'Creative Commons' ? 'CC Open' : 'Public Domain'}</span>
          </div>
        </div>

        {/* Hover Overlay with Quick Actions */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4 z-20">
          
          <p className="text-white font-bold text-base mb-1 line-clamp-1">{movie.title}</p>
          <p className="text-slate-300 text-xs mb-3 line-clamp-2">{movie.synopsis}</p>

          <div className="flex items-center gap-2">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setStreamingMovie(movie);
              }}
              className="flex-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/30 active:scale-95 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-black" />
              <span>{progressPercent > 5 ? 'Resume' : 'Play'}</span>
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                setDownloadModalMovie(movie);
              }}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-cyan-400 border border-white/20 transition-all"
              title="Download Options"
            >
              <Download className="w-4 h-4" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWatchlist(movie.id);
              }}
              className={`p-2 rounded-xl border transition-all ${
                inWatchlist 
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' 
                  : 'bg-white/10 text-white border-white/20 hover:text-amber-400'
              }`}
              title={inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            >
              {inWatchlist ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Resume Watch Progress Bar */}
        {showProgress && progressPercent > 0 && (
          <div className="absolute bottom-0 inset-x-0 h-1.5 bg-black/60 z-30">
            <div 
              className="h-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        )}

      </div>

      {/* Card Info Below Poster */}
      <div 
        onClick={() => setSelectedMovie(movie)}
        className="p-3.5 flex flex-col flex-1 justify-between cursor-pointer"
      >
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
            <span>{movie.year} • {movie.runtime}m</span>
            <span className="font-medium text-amber-400/90">{movie.genres[0]}</span>
          </div>
          <h3 className="font-bold text-slate-100 text-sm group-hover:text-amber-400 transition-colors line-clamp-1">
            {movie.title}
          </h3>
        </div>

        <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
          <span className="truncate max-w-[140px] text-[11px]">Dir: {movie.director}</span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleFavorite(movie.id);
              }}
              className={`p-1 rounded hover:bg-white/10 transition-colors ${favorite ? 'text-rose-500' : 'text-slate-500 hover:text-rose-400'}`}
              title="Favorite"
            >
              <span className="text-xs">❤️</span>
            </button>
            <span className="text-[10px] uppercase font-bold text-slate-400">{movie.language.split(',')[0]}</span>
          </div>
        </div>

      </div>

    </div>
  );
};
