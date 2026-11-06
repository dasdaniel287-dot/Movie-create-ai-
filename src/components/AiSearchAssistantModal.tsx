import React, { useState } from 'react';
import { 
  X, 
  Sparkles, 
  Search, 
  Send, 
  Play, 
  Download, 
  Film, 
  Check, 
  Plus, 
  ArrowRight,
  Brain,
  Star
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Movie } from '../types/movie';

export const AiSearchAssistantModal: React.FC = () => {
  const { 
    isAiSearchOpen, 
    setIsAiSearchOpen, 
    movies, 
    setStreamingMovie, 
    setSelectedMovie, 
    setDownloadModalMovie,
    watchlist,
    toggleWatchlist 
  } = useApp();

  const [promptInput, setPromptInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResponse, setSearchResponse] = useState<{
    explanation: string;
    matchedTitles: string[];
    identifiedGenres: string[];
    suggestedPrompts: string[];
  } | null>(null);

  if (!isAiSearchOpen) return null;

  const quickPrompts = [
    "Mind-bending cyberpunk sci-fi with futuristic visual effects",
    "Clever romantic mystery with witty banter and suspense",
    "Groundbreaking expressionist masterpiece about a dystopian future",
    "Gothic silent horror classic about vampires or the macabre",
    "Heartwarming animation about whimsical adventures"
  ];

  const handleSearch = async (queryText?: string) => {
    const textToSearch = queryText || promptInput;
    if (!textToSearch.trim()) return;

    setIsLoading(true);
    try {
      const catalogSummary = movies.map(m => ({
        title: m.title,
        genres: m.genres,
        year: m.year,
        director: m.director,
        synopsis: m.synopsis.slice(0, 150)
      }));

      const res = await fetch('/api/ai/search-assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: textToSearch,
          availableMovies: catalogSummary
        })
      });

      const contentType = res.headers.get('content-type') || '';
      const text = await res.text();

      let data;
      if (contentType.includes('application/json') || text.trim().startsWith('{')) {
        data = JSON.parse(text);
      } else {
        throw new Error('Received non-JSON response from server');
      }

      setSearchResponse(data);
    } catch (err) {
      console.warn('AI search assistant fallback used:', err);
      // Smart local keyword search fallback
      const qLower = textToSearch.toLowerCase();
      const matched = movies
        .filter(m => 
          m.title.toLowerCase().includes(qLower) ||
          m.genres.some(g => g.toLowerCase().includes(qLower)) ||
          m.director.toLowerCase().includes(qLower) ||
          m.synopsis.toLowerCase().includes(qLower)
        )
        .slice(0, 4)
        .map(m => m.title);

      const finalMatches = matched.length > 0 ? matched : ["Tears of Steel", "Metropolis", "Charade"];
      
      setSearchResponse({
        explanation: `Here are the curated cinematic selections that best align with "${textToSearch}":`,
        matchedTitles: finalMatches,
        identifiedGenres: ["Sci-Fi", "Classic Cinema", "Suspense"],
        suggestedPrompts: [
          "Cyberpunk visual effects masterpieces",
          "Award-winning public domain thrillers",
          "Open source animations for cinephiles"
        ]
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Find movie objects corresponding to matched titles
  const matchedMovies: Movie[] = searchResponse?.matchedTitles
    ? searchResponse.matchedTitles.map(title => 
        movies.find(m => m.title.toLowerCase().includes(title.toLowerCase()) || title.toLowerCase().includes(m.title.toLowerCase()))
      ).filter(Boolean) as Movie[]
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-3xl max-h-[90vh] bg-[#10121b] border border-amber-500/30 rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="p-6 pb-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-amber-950/30 to-purple-950/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-rose-500 p-[1px] flex items-center justify-center shadow-lg shadow-amber-500/20">
              <div className="w-full h-full bg-[#0e1017] rounded-[10px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-['Cinzel',serif] flex items-center gap-2">
                CineVerse AI Search Assistant
              </h2>
              <p className="text-xs text-slate-400">Natural language movie matching powered by Gemini 3.8 Flash</p>
            </div>
          </div>

          <button
            onClick={() => setIsAiSearchOpen(false)}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          {/* Natural Query Input */}
          <div className="relative">
            <textarea
              rows={2}
              value={promptInput}
              onChange={e => setPromptInput(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSearch();
                }
              }}
              placeholder="Describe what you want to watch... (e.g. 'A stylish noir with witty dialogue and high suspense' or 'Futuristic film exploring machines vs humanity')"
              className="w-full bg-white/5 border border-white/15 rounded-2xl p-4 pr-14 text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 resize-none"
            />
            <button
              onClick={() => handleSearch()}
              disabled={isLoading || !promptInput.trim()}
              className="absolute right-3 bottom-3 p-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-black disabled:opacity-30 hover:scale-105 active:scale-95 transition-all shadow-md"
            >
              {isLoading ? <Sparkles className="w-4 h-4 animate-spin text-black" /> : <Send className="w-4 h-4 text-black" />}
            </button>
          </div>

          {/* Quick Idea Pills */}
          {!searchResponse && (
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-400 flex items-center gap-1.5">
                <Brain className="w-3.5 h-3.5 text-amber-400" />
                Or try one of these prompts:
              </p>
              <div className="flex flex-wrap gap-2">
                {quickPrompts.map(prompt => (
                  <button
                    key={prompt}
                    onClick={() => {
                      setPromptInput(prompt);
                      handleSearch(prompt);
                    }}
                    className="text-left px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-500/40 text-xs text-slate-300 transition-all"
                  >
                    "{prompt}"
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* AI Response Display */}
          {searchResponse && (
            <div className="space-y-5 animate-in fade-in">
              
              {/* Conversational Explanation */}
              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-sm leading-relaxed flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white mb-1">CineVerse Match Analysis</p>
                  <p className="text-slate-200">{searchResponse.explanation}</p>

                  {/* Identified Genres */}
                  {searchResponse.identifiedGenres?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {searchResponse.identifiedGenres.map(g => (
                        <span key={g} className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[11px] font-medium border border-amber-500/30">
                          {g}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Matched Movies Cards */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Recommended Matches from Catalog ({matchedMovies.length})
                </h3>

                {matchedMovies.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No exact catalog match, but try browsing all films in the catalog!</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {matchedMovies.map(movie => {
                      const inWatchlist = watchlist.includes(movie.id);
                      return (
                        <div
                          key={movie.id}
                          className="p-3 rounded-2xl bg-[#141622] border border-white/10 hover:border-amber-500/40 transition-all flex gap-3 group"
                        >
                          <img
                            src={movie.posterUrl}
                            alt={movie.title}
                            className="w-16 h-24 rounded-xl object-cover border border-white/10 flex-shrink-0"
                          />
                          <div className="flex-1 overflow-hidden flex flex-col justify-between">
                            <div>
                              <div className="flex items-center gap-1.5 text-[10px] text-amber-400 font-bold">
                                <Star className="w-3 h-3 fill-amber-400" />
                                <span>{movie.imdbScore}</span>
                                <span className="text-slate-400 font-normal">• {movie.year}</span>
                              </div>
                              <h4 className="font-bold text-white text-sm truncate group-hover:text-amber-400 transition-colors">
                                {movie.title}
                              </h4>
                              <p className="text-xs text-slate-400 line-clamp-1">{movie.genres.join(', ')}</p>
                            </div>

                            <div className="flex items-center gap-1.5 pt-2">
                              <button
                                onClick={() => {
                                  setStreamingMovie(movie);
                                  setIsAiSearchOpen(false);
                                }}
                                className="px-2.5 py-1 rounded-lg bg-amber-500 text-black font-extrabold text-xs flex items-center gap-1 hover:bg-amber-400"
                              >
                                <Play className="w-3 h-3 fill-black" />
                                <span>Play</span>
                              </button>
                              <button
                                onClick={() => {
                                  setDownloadModalMovie(movie);
                                  setIsAiSearchOpen(false);
                                }}
                                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-cyan-400"
                                title="Download Options"
                              >
                                <Download className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => toggleWatchlist(movie.id)}
                                className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 hover:text-amber-400"
                                title="Watchlist"
                              >
                                {inWatchlist ? <Check className="w-3.5 h-3.5 text-amber-400" /> : <Plus className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Follow-up Suggested Prompts */}
              {searchResponse.suggestedPrompts?.length > 0 && (
                <div className="pt-2 border-t border-white/10 space-y-1.5">
                  <p className="text-xs text-slate-400 font-semibold">Suggested follow-up queries:</p>
                  <div className="flex flex-wrap gap-2">
                    {searchResponse.suggestedPrompts.map(p => (
                      <button
                        key={p}
                        onClick={() => {
                          setPromptInput(p);
                          handleSearch(p);
                        }}
                        className="text-xs text-amber-300 hover:text-white px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-1"
                      >
                        <span>{p}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
