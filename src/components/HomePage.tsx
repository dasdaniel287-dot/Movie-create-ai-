import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  Flame, 
  Star, 
  Clock, 
  ShieldCheck, 
  Film, 
  ArrowRight,
  Play,
  RotateCcw,
  SlidersHorizontal,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { HeroBanner } from './HeroBanner';
import { MovieCard } from './MovieCard';
import { ALL_GENRES } from '../data/moviesData';

export const HomePage: React.FC = () => {
  const { 
    movies, 
    watchHistory, 
    setActiveTab, 
    setFilters, 
    setIsAiSearchOpen,
    setStreamingMovie 
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('All');

  // Filtered rows
  const trendingMovies = movies.filter(m => m.trending || m.communityScore > 8.8);
  const latestMovies = movies.filter(m => m.latest || m.year >= 2012);
  const popularMovies = movies.filter(m => m.popular || m.imdbScore >= 7.5);
  const sciFiMovies = movies.filter(m => m.genres.includes('Sci-Fi'));
  const classicMovies = movies.filter(m => m.genres.includes('Classic Cinema'));

  // Continue watching movies from watchHistory
  const continueWatchingMovies = watchHistory
    .map(item => {
      const movie = movies.find(m => m.id === item.movieId);
      return movie ? { movie, ...item } : null;
    })
    .filter(Boolean) as { movie: any; progress: number; duration: number }[];

  const handleSelectGenreFilter = (genre: string) => {
    setSelectedCategory(genre);
    if (genre !== 'All') {
      setFilters(prev => ({ ...prev, genres: [genre] }));
      setActiveTab('browse');
    }
  };

  return (
    <div className="space-y-12 pb-16">
      
      {/* 1. Cinematic Hero Banner */}
      <HeroBanner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Continue Watching Row (if any items in history) */}
        {continueWatchingMovies.length > 0 && (
          <section className="space-y-4 animate-in fade-in">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                  <RotateCcw className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-white font-['Cinzel',serif]">
                    Continue Watching
                  </h2>
                  <p className="text-xs text-slate-400">Pick up right where you left off</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {continueWatchingMovies.slice(0, 3).map(({ movie, progress, duration }) => {
                const percent = Math.min(100, Math.round((progress / (duration || movie.runtime * 60)) * 100));
                return (
                  <div
                    key={movie.id}
                    onClick={() => setStreamingMovie(movie)}
                    className="p-3.5 rounded-2xl bg-[#12141e] border border-white/10 hover:border-amber-500/50 cursor-pointer transition-all hover:scale-[1.02] flex gap-3 group shadow-lg"
                  >
                    <div className="relative w-20 aspect-[16/9] rounded-xl overflow-hidden bg-black flex-shrink-0">
                      <img
                        src={movie.backdropUrl || movie.posterUrl}
                        alt={movie.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                      />
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Play className="w-5 h-5 text-amber-400 fill-amber-400" />
                      </div>
                    </div>

                    <div className="flex-1 overflow-hidden flex flex-col justify-between">
                      <div>
                        <h4 className="font-bold text-white text-xs sm:text-sm truncate group-hover:text-amber-400 transition-colors">
                          {movie.title}
                        </h4>
                        <p className="text-[11px] text-slate-400">{movie.genres[0]} • {movie.runtime}m</p>
                      </div>

                      <div>
                        <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                          <span>{percent}% watched</span>
                          <span className="font-mono text-amber-400">{Math.floor(progress / 60)}m</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-amber-500 to-rose-500" 
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* 2. Interactive AI Film Concierge Banner */}
        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-amber-500/15 via-rose-500/15 to-purple-600/15 border border-amber-500/30 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-black font-extrabold text-[10px] uppercase tracking-wider">
                  CineVerse Intelligence
                </span>
                <span className="text-xs text-amber-300 font-semibold">Gemini 3.8 Flash Powered</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Cinzel',serif]">
                Can't decide what to watch tonight?
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                Describe your exact mood, aesthetic, or nostalgic vibe. Our AI Search Assistant understands natural cinema language and matches you with verified gems.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setIsAiSearchOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-purple-600 text-black font-extrabold text-xs sm:text-sm shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-black animate-spin" />
                <span>Launch AI Movie Matchmaker</span>
              </button>
            </div>
          </div>
          {/* Subtle background glow */}
          <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        </section>

        {/* 3. Category & Genre Navigation Strip */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400">
              Explore by Cinematic Genre
            </h3>
            <button
              onClick={() => setActiveTab('browse')}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
            >
              <span>View All Genres</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {ALL_GENRES.map(genre => (
              <button
                key={genre}
                onClick={() => handleSelectGenreFilter(genre)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === genre
                    ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
                    : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>
        </section>

        {/* 4. Trending Movies Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-rose-500/20 text-rose-400">
                <Flame className="w-4 h-4" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-['Cinzel',serif]">
                Trending Across CineVerse
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('browse')}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
            >
              <span>Explore All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {trendingMovies.slice(0, 5).map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* 5. Latest Releases Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400">
                <Sparkles className="w-4 h-4" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-['Cinzel',serif]">
                Latest Releases & Open Movies
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('browse')}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
            >
              <span>Explore All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {latestMovies.slice(0, 5).map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* 6. Popular Masterpieces Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                <Star className="w-4 h-4 fill-amber-400" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-['Cinzel',serif]">
                All-Time Popular Cinema
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('browse')}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
            >
              <span>Explore All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {popularMovies.slice(0, 5).map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

        {/* 7. Classic Public Domain Cinema Row */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white font-['Cinzel',serif]">
                Restored Public Domain Heritage
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('browse')}
              className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
            >
              <span>Explore All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {classicMovies.slice(0, 5).map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </section>

      </div>

    </div>
  );
};
