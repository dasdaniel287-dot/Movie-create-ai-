import React, { useState, useEffect } from 'react';
import { 
  User as UserIcon, 
  Bookmark, 
  Heart, 
  Clock, 
  Sparkles, 
  Settings, 
  Check, 
  Trash2, 
  Play, 
  Download, 
  ShieldCheck,
  Film
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MovieCard } from './MovieCard';
import { Movie } from '../types/movie';

export const UserProfilePage: React.FC = () => {
  const { 
    currentUser, 
    updateUserProfile, 
    movies, 
    watchlist, 
    favorites, 
    watchHistory, 
    clearWatchHistory,
    setStreamingMovie,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'watchlist' | 'favorites' | 'history' | 'ai-picks' | 'settings'>('watchlist');

  // Personalized AI Recommendations State
  const [aiPicks, setAiPicks] = useState<any[]>([]);
  const [isLoadingPicks, setIsLoadingPicks] = useState(false);

  // Profile Edit State
  const [name, setName] = useState(currentUser?.name || '');
  const [bio, setBio] = useState(currentUser?.bio || '');
  const [qualityPref, setQualityPref] = useState<'Auto' | '1080p' | '4K' | '720p'>(currentUser?.streamingQualityPreference || '1080p');

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name);
      setBio(currentUser.bio || '');
      setQualityPref(currentUser.streamingQualityPreference || '1080p');
    }
  }, [currentUser]);

  // Movies in watchlist & favorites
  const watchlistMovies = movies.filter(m => watchlist.includes(m.id));
  const favoriteMovies = movies.filter(m => favorites.includes(m.id));

  // Fetch AI personalized recommendations based on watchlist
  const fetchPersonalizedRecommendations = async () => {
    setIsLoadingPicks(true);
    try {
      const watchedTitles = watchlistMovies.map(m => m.title);
      const res = await fetch('/api/ai/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userPreferences: currentUser?.preferredGenres.join(', ') || 'Sci-Fi, Classic, Noir',
          watchedTitles: watchedTitles.length > 0 ? watchedTitles : ['Tears of Steel', 'Metropolis'],
          mood: 'Intellectually thrilling, visually iconic',
          catalogSummary: movies.map(m => `${m.title} (${m.genres.join(', ')})`).join('; ')
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

      setAiPicks(data.recommendations || []);
      showToast('Personalized AI Cine-Radar Generated!', 'success');
    } catch (e) {
      console.warn('AI recommendations fallback used:', e);
      setAiPicks([
        {
          title: "Tears of Steel",
          matchScore: 98,
          reason: "Matches your passion for groundbreaking science-fiction VFX, featuring rogue scientists battling mechanized threats in futuristic Amsterdam.",
          moodFit: "Cyberpunk Action",
          keyThemes: ["Dystopia", "Sci-Fi", "VFX Masterpiece"]
        },
        {
          title: "Metropolis",
          matchScore: 96,
          reason: "Perfect for cinephiles who appreciate foundational dystopian architecture, Expressionist visuals, and deep philosophical themes.",
          moodFit: "Philosophical Sci-Fi",
          keyThemes: ["Class Struggle", "Futurism", "Visionary Architecture"]
        },
        {
          title: "Night of the Living Dead",
          matchScore: 93,
          reason: "An essential thriller showcasing how claustrophobic suspense and social critique revolutionized cinema.",
          moodFit: "Suspense & Tension",
          keyThemes: ["Survival", "Mystery", "Cult Classic"]
        },
        {
          title: "Cosmos Laundromat",
          matchScore: 91,
          reason: "An extraordinary surreal journey traversing parallel realities, packed with artistic innovation.",
          moodFit: "Surreal Adventure",
          keyThemes: ["Existential Drama", "Animation", "Whimsical"]
        }
      ]);
      showToast('Loaded curated cinephile recommendations.', 'info');
    } finally {
      setIsLoadingPicks(false);
    }
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({
      name,
      bio,
      streamingQualityPreference: qualityPref
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Profile Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#10121b] border border-white/10 shadow-2xl flex flex-col md:flex-row items-center md:items-start gap-6">
        <div className="relative">
          <img
            src={currentUser?.avatar}
            alt={currentUser?.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-amber-500/40 shadow-xl"
          />
          <span className="absolute -bottom-2 -right-2 px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-black font-extrabold text-[10px] uppercase shadow">
            {currentUser?.role === 'admin' ? 'Sole Administrator' : 'Member'}
          </span>
        </div>

        <div className="flex-1 text-center md:text-left space-y-2">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white font-['Cinzel',serif]">{currentUser?.name}</h1>
              <p className="text-xs text-slate-400">{currentUser?.email}</p>
            </div>
            <div className="flex items-center gap-2 justify-center">
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-amber-300 font-semibold">
                ⭐ {watchlist.length} Saved in Watchlist
              </span>
              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-rose-300 font-semibold">
                ❤️ {favorites.length} Favorites
              </span>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            {currentUser?.bio || 'Passionate film buff exploring rare public domain works, restored classics, and open-source cinema.'}
          </p>

          <div className="flex flex-wrap items-center gap-1.5 pt-1 justify-center md:justify-start">
            <span className="text-[11px] text-slate-500 font-bold uppercase tracking-wider mr-1">Favorite Genres:</span>
            {currentUser?.preferredGenres.map(g => (
              <span key={g} className="px-2.5 py-0.5 rounded-md bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs">
                {g}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Navigation Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-white/10 pb-3">
        <button
          onClick={() => setActiveTab('watchlist')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'watchlist'
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
              : 'bg-white/5 text-slate-300 hover:bg-white/10'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>My Watchlist ({watchlistMovies.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'favorites'
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
              : 'bg-white/5 text-slate-300 hover:bg-white/10'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Favorites ({favoriteMovies.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'history'
              ? 'bg-amber-500 text-black shadow-md shadow-amber-500/20'
              : 'bg-white/5 text-slate-300 hover:bg-white/10'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Watch History ({watchHistory.length})</span>
        </button>

        <button
          onClick={() => {
            setActiveTab('ai-picks');
            if (aiPicks.length === 0) fetchPersonalizedRecommendations();
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
            activeTab === 'ai-picks'
              ? 'bg-gradient-to-r from-amber-500 to-rose-500 text-black font-extrabold shadow-md'
              : 'bg-white/5 text-amber-300 hover:bg-white/10'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>AI Suggestions</span>
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ml-auto ${
            activeTab === 'settings'
              ? 'bg-amber-500 text-black'
              : 'bg-white/5 text-slate-300 hover:bg-white/10'
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Edit Profile</span>
        </button>
      </div>

      {/* Tab 1: Watchlist Grid */}
      {activeTab === 'watchlist' && (
        <div className="space-y-4">
          {watchlistMovies.length === 0 ? (
            <div className="p-16 rounded-3xl bg-white/5 border border-white/10 text-center space-y-2">
              <Bookmark className="w-8 h-8 text-slate-500 mx-auto" />
              <p className="text-sm font-bold text-white">Your Watchlist is Empty</p>
              <p className="text-xs text-slate-400">Click the '+' button on any movie card or detail page to queue it here.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {watchlistMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Favorites Grid */}
      {activeTab === 'favorites' && (
        <div className="space-y-4">
          {favoriteMovies.length === 0 ? (
            <div className="p-16 rounded-3xl bg-white/5 border border-white/10 text-center space-y-2">
              <Heart className="w-8 h-8 text-slate-500 mx-auto" />
              <p className="text-sm font-bold text-white">No Favorites Added</p>
              <p className="text-xs text-slate-400">Heart any title to curate your personal cinema collection.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
              {favoriteMovies.map(movie => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Watch History */}
      {activeTab === 'history' && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-xs text-slate-400">Shows your timestamp progress across watched films.</p>
            {watchHistory.length > 0 && (
              <button
                onClick={clearWatchHistory}
                className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear Watch History
              </button>
            )}
          </div>

          {watchHistory.length === 0 ? (
            <div className="p-16 rounded-3xl bg-white/5 border border-white/10 text-center space-y-2">
              <Clock className="w-8 h-8 text-slate-500 mx-auto" />
              <p className="text-sm font-bold text-white">No Watch History</p>
              <p className="text-xs text-slate-400">Start watching any movie to track resume points automatically.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {watchHistory.map(item => {
                const movie = movies.find(m => m.id === item.movieId);
                if (!movie) return null;
                const percent = Math.min(100, Math.round((item.progress / (item.duration || movie.runtime * 60)) * 100));
                
                return (
                  <div
                    key={item.movieId}
                    className="p-4 rounded-2xl bg-[#11131c] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-amber-500/30 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={movie.posterUrl}
                        alt={movie.title}
                        className="w-12 h-16 rounded-xl object-cover border border-white/10"
                      />
                      <div>
                        <h4 className="font-bold text-white text-sm">{movie.title}</h4>
                        <p className="text-xs text-slate-400">{movie.genres.join(', ')} • {movie.year}</p>
                        <p className="text-[11px] text-amber-400 font-medium mt-1">
                          {percent}% completed • Left off at {Math.floor(item.progress / 60)}:{(item.progress % 60).toString().padStart(2, '0')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setStreamingMovie(movie)}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs flex items-center gap-1.5 shadow"
                      >
                        <Play className="w-3.5 h-3.5 fill-black" />
                        <span>Resume Playback</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Tab 4: AI Personalized Suggestions */}
      {activeTab === 'ai-picks' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-white font-['Cinzel',serif] flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                Tailored for {currentUser?.name}
              </h3>
              <p className="text-xs text-slate-400">
                Generated using Gemini 3.8 Flash analyzing your preferred genres ({currentUser?.preferredGenres.join(', ')}) and watchlist.
              </p>
            </div>
            <button
              onClick={fetchPersonalizedRecommendations}
              disabled={isLoadingPicks}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/10 flex items-center gap-1.5 disabled:opacity-50"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{isLoadingPicks ? 'Analyzing...' : 'Refresh AI Radar'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aiPicks.map((pick, idx) => {
              const matchedMovie = movies.find(m => m.title.toLowerCase().includes(pick.title.toLowerCase()) || pick.title.toLowerCase().includes(m.title.toLowerCase()));

              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-[#121420] border border-amber-500/30 space-y-3 shadow-xl"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold text-[10px] uppercase border border-amber-500/30">
                        {pick.moodFit}
                      </span>
                      <h4 className="text-lg font-bold text-white mt-1.5 font-['Cinzel',serif]">{pick.title}</h4>
                    </div>
                    <span className="text-sm font-extrabold text-amber-400 font-mono bg-amber-950/40 px-2.5 py-1 rounded-lg border border-amber-500/40">
                      {pick.matchScore}% Match
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{pick.reason}</p>

                  <div className="flex flex-wrap gap-1.5">
                    {pick.keyThemes?.map((theme: string) => (
                      <span key={theme} className="px-2 py-0.5 rounded bg-white/5 text-[11px] text-slate-400">
                        #{theme}
                      </span>
                    ))}
                  </div>

                  {matchedMovie && (
                    <div className="pt-2 border-t border-white/10 flex items-center gap-2">
                      <button
                        onClick={() => setStreamingMovie(matchedMovie)}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 text-black text-xs font-bold flex items-center gap-1"
                      >
                        <Play className="w-3 h-3 fill-black" /> Stream Now
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 5: Settings / Profile Edit */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveProfile} className="max-w-xl p-6 rounded-3xl bg-[#11131c] border border-white/10 space-y-4">
          <h3 className="text-base font-bold text-white font-['Cinzel',serif]">Edit Profile & Streaming Preferences</h3>
          
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Display Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Bio</label>
            <textarea
              rows={3}
              value={bio}
              onChange={e => setBio(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Preferred Streaming Quality</label>
            <select
              value={qualityPref}
              onChange={e => setQualityPref(e.target.value as any)}
              className="w-full bg-[#181a24] border border-white/15 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:ring-1 focus:ring-amber-500"
            >
              <option value="Auto">Auto (Adaptive Bitrate)</option>
              <option value="4K">4K UHD Cinema Experience</option>
              <option value="1080p">1080p Full High Definition</option>
              <option value="720p">720p Mobile / Data Saver</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs transition-all shadow-md shadow-amber-500/20"
          >
            Save Profile Changes
          </button>
        </form>
      )}

    </div>
  );
};
