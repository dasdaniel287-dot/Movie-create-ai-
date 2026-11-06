import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Download, 
  Plus, 
  Check, 
  Info, 
  Star, 
  ShieldCheck, 
  ChevronRight, 
  ChevronLeft,
  Volume2,
  VolumeX,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Movie } from '../types/movie';

export const HeroBanner: React.FC = () => {
  const { 
    movies, 
    setStreamingMovie, 
    setSelectedMovie, 
    setDownloadModalMovie, 
    watchlist, 
    toggleWatchlist 
  } = useApp();

  const featuredMovies = movies.filter(m => m.featured || m.trending).slice(0, 5);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  // Auto-slide every 9 seconds
  useEffect(() => {
    if (featuredMovies.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % featuredMovies.length);
    }, 9000);
    return () => clearInterval(timer);
  }, [featuredMovies.length]);

  if (!featuredMovies.length) return null;
  const currentMovie: Movie = featuredMovies[currentIndex] || featuredMovies[0];
  const inWatchlist = watchlist.includes(currentMovie.id);

  const handleNext = () => {
    setCurrentIndex(prev => (prev + 1) % featuredMovies.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev - 1 + featuredMovies.length) % featuredMovies.length);
  };

  return (
    <div className="relative w-full h-[620px] md:h-[720px] overflow-hidden bg-black select-none">
      
      {/* Background Backdrop Image */}
      <div className="absolute inset-0">
        <img
          key={currentMovie.id}
          src={currentMovie.backdropUrl}
          alt={currentMovie.title}
          className="w-full h-full object-cover object-center transform scale-105 animate-in fade-in zoom-in-105 duration-1000 filter brightness-[0.75] contrast-105"
        />
        {/* Cinematic Multi-layered Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0b0f] via-[#0a0b0f]/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0b0f] via-[#0a0b0f]/80 to-transparent w-full md:w-3/4" />
        <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-[#0a0b0f]/90 to-transparent" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16 md:pb-24">
        
        <div className="max-w-2xl space-y-4 md:space-y-5">
          
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-amber-500 text-black font-extrabold tracking-wider uppercase text-[10px] flex items-center gap-1 shadow-lg shadow-amber-500/20">
              <Sparkles className="w-3 h-3" />
              Spotlight Premiere
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white font-medium flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              {currentMovie.imdbScore} IMDb
            </span>
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              {currentMovie.licenseBadge}
            </span>
            <span className="text-slate-400 font-medium hidden sm:inline">
              {currentMovie.year} • {currentMovie.runtime} mins • {currentMovie.language}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white font-['Cinzel',serif] drop-shadow-2xl leading-none">
            {currentMovie.title}
          </h1>

          {/* Tagline */}
          <p className="text-amber-200/90 text-sm md:text-base italic font-serif max-w-xl">
            "{currentMovie.tagline}"
          </p>

          {/* Synopsis */}
          <p className="text-slate-300 text-sm md:text-base line-clamp-3 max-w-xl leading-relaxed">
            {currentMovie.synopsis}
          </p>

          {/* Genres */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {currentMovie.genres.map(g => (
              <span key={g} className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300 text-xs">
                {g}
              </span>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            
            {/* Stream Now Button */}
            <button
              onClick={() => setStreamingMovie(currentMovie)}
              className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-black font-extrabold text-sm shadow-xl shadow-amber-500/30 hover:shadow-amber-500/50 hover:scale-105 active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>Stream Now</span>
            </button>

            {/* Legal Download Button */}
            <button
              onClick={() => setDownloadModalMovie(currentMovie)}
              className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-white/10 hover:bg-white/15 text-white backdrop-blur-md border border-white/20 font-semibold text-sm hover:scale-105 active:scale-95 transition-all"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Legal Download</span>
            </button>

            {/* Watchlist Toggle */}
            <button
              onClick={() => toggleWatchlist(currentMovie.id)}
              className={`p-3.5 rounded-xl backdrop-blur-md border transition-all ${
                inWatchlist 
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 shadow-inner' 
                  : 'bg-white/10 text-white border-white/20 hover:bg-white/15 hover:text-amber-400'
              }`}
              title={inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            >
              {inWatchlist ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
            </button>

            {/* More Details Modal */}
            <button
              onClick={() => setSelectedMovie(currentMovie)}
              className="p-3.5 rounded-xl bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/15 transition-all"
              title="Full Movie Details & AI Insights"
            >
              <Info className="w-5 h-5" />
            </button>

          </div>

        </div>

      </div>

      {/* Carousel Navigation Indicators */}
      <div className="absolute right-6 bottom-8 z-20 hidden md:flex items-center gap-3">
        <button
          onClick={handlePrev}
          className="p-2 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-1.5">
          {featuredMovies.map((m, idx) => (
            <button
              key={m.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-8 bg-amber-400' : 'w-2 bg-white/30 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-black/40 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

    </div>
  );
};
