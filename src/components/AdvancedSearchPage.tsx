import React, { useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  RotateCcw, 
  Star, 
  Filter, 
  Sparkles,
  Calendar,
  Film,
  User,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ALL_GENRES } from '../data/moviesData';
import { MovieCard } from './MovieCard';

export const AdvancedSearchPage: React.FC = () => {
  const { movies, filters, setFilters, resetFilters, setIsAiSearchOpen } = useApp();

  const handleGenreToggle = (genre: string) => {
    if (genre === 'All') {
      setFilters(prev => ({ ...prev, genres: [] }));
      return;
    }
    setFilters(prev => {
      const exists = prev.genres.includes(genre);
      const nextGenres = exists 
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre];
      return { ...prev, genres: nextGenres };
    });
  };

  // Filter & Sort Logic
  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      // Query match (title or synopsis)
      if (filters.query.trim()) {
        const q = filters.query.toLowerCase();
        const matchesTitle = movie.title.toLowerCase().includes(q);
        const matchesSynopsis = movie.synopsis.toLowerCase().includes(q);
        const matchesCast = movie.cast.some(c => c.name.toLowerCase().includes(q));
        const matchesDirector = movie.director.toLowerCase().includes(q);
        if (!matchesTitle && !matchesSynopsis && !matchesCast && !matchesDirector) return false;
      }

      // Actor filter
      if (filters.actor.trim()) {
        const act = filters.actor.toLowerCase();
        if (!movie.cast.some(c => c.name.toLowerCase().includes(act))) return false;
      }

      // Director filter
      if (filters.director.trim()) {
        const dir = filters.director.toLowerCase();
        if (!movie.director.toLowerCase().includes(dir)) return false;
      }

      // Genre filter
      if (filters.genres.length > 0) {
        const hasGenre = filters.genres.some(g => movie.genres.includes(g));
        if (!hasGenre) return false;
      }

      // Rating filter
      if (filters.minRating > 0 && movie.imdbScore < filters.minRating) {
        return false;
      }

      // Year range filter
      if (movie.year < filters.yearRange[0] || movie.year > filters.yearRange[1]) {
        return false;
      }

      // Language filter
      if (filters.language !== 'All') {
        if (!movie.language.toLowerCase().includes(filters.language.toLowerCase())) {
          return false;
        }
      }

      // License type filter
      if (filters.licenseType !== 'All') {
        if (movie.licenseType !== filters.licenseType) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'popularity') {
        return (b.communityScore || 0) - (a.communityScore || 0);
      }
      if (filters.sortBy === 'newest') {
        return b.year - a.year;
      }
      if (filters.sortBy === 'oldest') {
        return a.year - b.year;
      }
      if (filters.sortBy === 'rating') {
        return b.imdbScore - a.imdbScore;
      }
      if (filters.sortBy === 'runtime') {
        return b.runtime - a.runtime;
      }
      if (filters.sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });
  }, [movies, filters]);

  const activeFilterCount = 
    (filters.query ? 1 : 0) + 
    filters.genres.length + 
    (filters.actor ? 1 : 0) + 
    (filters.director ? 1 : 0) + 
    (filters.minRating > 0 ? 1 : 0) + 
    (filters.language !== 'All' ? 1 : 0) + 
    (filters.licenseType !== 'All' ? 1 : 0) +
    (filters.yearRange[0] > 1920 ? 1 : 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Search & AI Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-['Cinzel',serif]">
            Cinema Discovery & Deep Search
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Search across {movies.length} verified titles by title, actor, director, genre, and licensing classification.
          </p>
        </div>

        <button
          onClick={() => setIsAiSearchOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 text-black font-extrabold text-xs shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all self-start md:self-auto"
        >
          <Sparkles className="w-4 h-4 text-black" />
          <span>Ask AI Search Assistant</span>
        </button>
      </div>

      {/* Filter Control Center */}
      <div className="p-6 rounded-3xl bg-[#10121b] border border-white/10 shadow-xl space-y-5">
        
        {/* Top Text Inputs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Title or keyword */}
          <div className="relative">
            <input
              type="text"
              placeholder="Movie title, theme, or plot..."
              value={filters.query}
              onChange={e => setFilters(f => ({ ...f, query: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Actor search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by actor (e.g. Cary Grant)..."
              value={filters.actor}
              onChange={e => setFilters(f => ({ ...f, actor: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Director search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by director (e.g. Fritz Lang)..."
              value={filters.director}
              onChange={e => setFilters(f => ({ ...f, director: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
            <Film className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

        </div>

        {/* Genre Filter Chips */}
        <div>
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-semibold">
            <span>Filter by Genre:</span>
            {filters.genres.length > 0 && (
              <span className="text-amber-400">{filters.genres.length} selected</span>
            )}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {ALL_GENRES.map(genre => {
              const isSelected = genre === 'All' ? filters.genres.length === 0 : filters.genres.includes(genre);
              return (
                <button
                  key={genre}
                  onClick={() => handleGenreToggle(genre)}
                  className={`px-3 py-1 rounded-xl text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-black font-bold shadow-md shadow-amber-500/20'
                      : 'bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10'
                  }`}
                >
                  {genre}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dropdowns & Sliders: Rating, Year, Language, License, Sort By */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-2 border-t border-white/10 text-xs">
          
          {/* Min Rating */}
          <div>
            <div className="flex justify-between text-slate-400 font-semibold mb-1">
              <span>Min Rating:</span>
              <span className="text-amber-400 font-bold">{filters.minRating > 0 ? `${filters.minRating} ★` : 'Any'}</span>
            </div>
            <input
              type="range"
              min={0}
              max={9}
              step={0.5}
              value={filters.minRating}
              onChange={e => setFilters(f => ({ ...f, minRating: parseFloat(e.target.value) }))}
              className="w-full h-1.5 bg-white/20 rounded accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Release Year Filter */}
          <div>
            <div className="flex justify-between text-slate-400 font-semibold mb-1">
              <span>Since Year:</span>
              <span className="text-amber-400 font-bold">{filters.yearRange[0] > 1920 ? filters.yearRange[0] : 'All Era'}</span>
            </div>
            <input
              type="range"
              min={1920}
              max={2026}
              step={2}
              value={filters.yearRange[0]}
              onChange={e => {
                const y = parseInt(e.target.value);
                setFilters(f => ({ ...f, yearRange: [y, f.yearRange[1]] }));
              }}
              className="w-full h-1.5 bg-white/20 rounded accent-amber-500 cursor-pointer"
            />
          </div>

          {/* Language */}
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Language</label>
            <select
              value={filters.language}
              onChange={e => setFilters(f => ({ ...f, language: e.target.value }))}
              className="w-full bg-[#161822] border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="All">All Languages</option>
              <option value="English">English</option>
              <option value="Silent">Silent Cinema</option>
              <option value="French">French</option>
            </select>
          </div>

          {/* License Type */}
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Legal License</label>
            <select
              value={filters.licenseType}
              onChange={e => setFilters(f => ({ ...f, licenseType: e.target.value }))}
              className="w-full bg-[#161822] border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="All">All Authorized Types</option>
              <option value="Public Domain">Public Domain Only</option>
              <option value="Creative Commons">Creative Commons</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-slate-400 font-semibold mb-1">Sort Results By</label>
            <select
              value={filters.sortBy}
              onChange={e => setFilters(f => ({ ...f, sortBy: e.target.value as any }))}
              className="w-full bg-[#161822] border border-white/10 rounded-xl px-2.5 py-1.5 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="popularity">Popularity / Community</option>
              <option value="rating">Highest IMDb Score</option>
              <option value="newest">Release Year (Newest)</option>
              <option value="oldest">Release Year (Oldest)</option>
              <option value="runtime">Duration (Longest)</option>
              <option value="title">Title (A - Z)</option>
            </select>
          </div>

        </div>

        {/* Clear Filters Bar */}
        {activeFilterCount > 0 && (
          <div className="pt-2 flex items-center justify-between text-xs">
            <span className="text-slate-400">
              Showing <span className="font-bold text-white">{filteredMovies.length}</span> films matching active filters
            </span>
            <button
              onClick={resetFilters}
              className="px-3 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-semibold flex items-center gap-1.5 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

      </div>

      {/* Movies Grid */}
      <div>
        {filteredMovies.length === 0 ? (
          <div className="p-16 rounded-3xl bg-white/5 border border-white/10 text-center space-y-3">
            <Search className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-lg font-bold text-white">No films found matching your search</h3>
            <p className="text-xs text-slate-400 max-w-md mx-auto">
              Try loosening your filters, adjusting the IMDb threshold, or ask our AI Search Assistant for natural recommendations.
            </p>
            <button
              onClick={resetFilters}
              className="px-4 py-2 rounded-xl bg-amber-500 text-black font-bold text-xs"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {filteredMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
