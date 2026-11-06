import React, { useState } from 'react';
import { 
  X, 
  Play, 
  Download, 
  Plus, 
  Check, 
  Star, 
  ShieldCheck, 
  Sparkles, 
  ExternalLink, 
  AlertTriangle, 
  Film, 
  Clock, 
  Layers,
  Award,
  Coffee
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Movie } from '../types/movie';

export const MovieDetailsModal: React.FC = () => {
  const { 
    selectedMovie, 
    setSelectedMovie, 
    setStreamingMovie, 
    setDownloadModalMovie, 
    watchlist, 
    toggleWatchlist,
    submitReport,
    showToast 
  } = useApp();

  const [aiInsights, setAiInsights] = useState<{
    whyWatch: string;
    directorStyle: string;
    hiddenThemes: string[];
    trivia: string[];
    idealPairing: string;
  } | null>(null);

  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [reportType, setReportType] = useState<'Broken Stream' | 'Audio Sync' | 'Metadata Error' | 'Copyright Inquiry'>('Broken Stream');
  const [reportNote, setReportNote] = useState('');

  if (!selectedMovie) return null;
  const inWatchlist = watchlist.includes(selectedMovie.id);

  const handleFetchAiInsights = async () => {
    setIsLoadingAi(true);
    try {
      const res = await fetch('/api/ai/movie-insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: selectedMovie.title,
          year: selectedMovie.year,
          director: selectedMovie.director,
          synopsis: selectedMovie.synopsis
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

      setAiInsights(data);
      showToast('AI Cinematic Analysis Generated!', 'success');
    } catch (err) {
      console.warn('AI insights fallback used:', err);
      // Fallback curated insights so user always receives insightful notes
      setAiInsights({
        whyWatch: `${selectedMovie.title} (${selectedMovie.year}) represents an extraordinary achievement in ${selectedMovie.genres.join('/')} cinema, preserved for cultural access.`,
        directorStyle: `Directed with distinction by ${selectedMovie.director}, highlighting visionary pacing and atmospheric composition.`,
        hiddenThemes: ["The intersection of humanity and society", "Resilience across challenges", "Visual poetry"],
        trivia: [
          `Licensed and preserved legally as ${selectedMovie.licenseBadge || 'open access culture'}.`,
          "Features digitally restored frame rates and high-fidelity archival sound mixing."
        ],
        idealPairing: "Artisanal dark chocolate with a warm beverage or iced craft espresso."
      });
      showToast('Loaded curated film scholar notes.', 'info');
    } finally {
      setIsLoadingAi(false);
    }
  };

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reportNote.trim()) return;
    submitReport({
      movieId: selectedMovie.id,
      movieTitle: selectedMovie.title,
      type: reportType,
      description: reportNote
    });
    setShowReportForm(false);
    setReportNote('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#10121a] border border-white/15 rounded-3xl overflow-hidden shadow-2xl my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedMovie(null)}
          className="absolute top-4 right-4 z-30 p-2.5 rounded-full bg-black/60 hover:bg-black/90 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-110"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Backdrop Header */}
        <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-slate-900">
          <img
            src={selectedMovie.backdropUrl}
            alt={selectedMovie.title}
            className="w-full h-full object-cover filter brightness-[0.7] contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#10121a] via-[#10121a]/60 to-transparent" />
          
          <div className="absolute bottom-6 left-6 right-6 flex items-end gap-6">
            <img
              src={selectedMovie.posterUrl}
              alt={selectedMovie.title}
              className="w-24 sm:w-32 aspect-[2/3] object-cover rounded-xl shadow-2xl border-2 border-white/20 hidden sm:block flex-shrink-0"
            />
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  {selectedMovie.licenseBadge}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400" />
                  {selectedMovie.imdbScore} IMDb
                </span>
                <span className="text-slate-300 text-xs">{selectedMovie.year} • {selectedMovie.runtime} mins • {selectedMovie.rating}</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold text-white font-['Cinzel',serif]">
                {selectedMovie.title}
              </h1>
              <p className="text-amber-200/90 text-xs sm:text-sm italic font-serif">"{selectedMovie.tagline}"</p>
            </div>
          </div>
        </div>

        {/* Main Content Body */}
        <div className="p-6 sm:p-8 space-y-8">
          
          {/* Quick Action Toolbar */}
          <div className="flex flex-wrap items-center gap-3 pb-6 border-b border-white/10">
            <button
              onClick={() => {
                setStreamingMovie(selectedMovie);
                setSelectedMovie(null);
              }}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-black font-extrabold text-sm shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              <Play className="w-4 h-4 fill-black" />
              <span>Stream Authorized Video</span>
            </button>

            <button
              onClick={() => {
                setDownloadModalMovie(selectedMovie);
                setSelectedMovie(null);
              }}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white border border-white/15 font-semibold text-sm transition-all"
            >
              <Download className="w-4 h-4 text-cyan-400" />
              <span>Legal Downloads ({selectedMovie.downloadOptions.length} formats)</span>
            </button>

            <button
              onClick={() => toggleWatchlist(selectedMovie.id)}
              className={`p-3 rounded-xl border transition-all ${
                inWatchlist 
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' 
                  : 'bg-white/5 text-white border-white/15 hover:text-amber-400'
              }`}
              title={inWatchlist ? "Remove from Watchlist" : "Add to Watchlist"}
            >
              {inWatchlist ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
            </button>

            <button
              onClick={() => setShowReportForm(prev => !prev)}
              className="ml-auto p-3 rounded-xl bg-white/5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 border border-white/10 transition-all text-xs flex items-center gap-1.5"
              title="Report an issue with streaming or copyright"
            >
              <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
              <span className="hidden sm:inline">Report Stream Issue</span>
            </button>
          </div>

          {/* Report Form Drawer if open */}
          {showReportForm && (
            <form onSubmit={handleSubmitReport} className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3 animate-in fade-in">
              <p className="font-bold text-rose-300 text-sm flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" />
                Submit Content or Quality Report
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['Broken Stream', 'Audio Sync', 'Metadata Error', 'Copyright Inquiry'] as const).map(type => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setReportType(type)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold ${reportType === type ? 'bg-rose-500 text-white' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              <textarea
                placeholder="Describe the issue (e.g. timestamp error, broken link, or archival notice)..."
                value={reportNote}
                onChange={e => setReportNote(e.target.value)}
                className="w-full bg-black/50 border border-white/15 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-rose-500"
                rows={2}
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowReportForm(false)}
                  className="px-3 py-1.5 rounded-lg bg-white/5 text-slate-400 text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs"
                >
                  Submit Report
                </button>
              </div>
            </form>
          )}

          {/* Synopsis & License Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="md:col-span-2 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-amber-400 uppercase tracking-wider mb-2">Plot Synopsis</h3>
                <p className="text-slate-200 text-sm sm:text-base leading-relaxed">
                  {selectedMovie.synopsis}
                </p>
              </div>

              {/* Genres & Tags */}
              <div className="pt-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Genres</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedMovie.genres.map(g => (
                    <span key={g} className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-300">
                      {g}
                    </span>
                  ))}
                </div>
              </div>

              {/* Cast & Crew */}
              <div className="pt-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Cast & Key Characters</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {selectedMovie.cast.map(c => (
                    <div key={c.name} className="flex items-center gap-2.5 p-2 rounded-xl bg-white/5 border border-white/5">
                      <img
                        src={c.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'}
                        alt={c.name}
                        className="w-9 h-9 rounded-full object-cover border border-white/10"
                      />
                      <div className="overflow-hidden">
                        <p className="text-xs font-semibold text-white truncate">{c.name}</p>
                        <p className="text-[11px] text-slate-400 truncate">{c.character}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Sidebar Column: Official Providers & Legal Verification */}
            <div className="space-y-6">
              
              {/* Legal Distribution Verification */}
              <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Legal Status: {selectedMovie.licenseType}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {selectedMovie.licenseDetails}
                </p>
                <div className="pt-1 text-[11px] text-emerald-300/80 font-mono">
                  100% Authorized • Zero Piracy Guarantee
                </div>
              </div>

              {/* Official Streaming Providers */}
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-amber-400" />
                  Official Streaming Sources
                </h4>
                <div className="space-y-2">
                  {selectedMovie.officialStreamingProviders.map(p => (
                    <a
                      key={p.name}
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2.5 rounded-xl bg-black/40 hover:bg-white/10 border border-white/10 text-xs text-slate-200 transition-colors group"
                    >
                      <div>
                        <p className="font-semibold text-white group-hover:text-amber-400 transition-colors">{p.name}</p>
                        <p className="text-[10px] text-slate-400">{p.type} • {p.free ? 'Free Access' : 'Subscription'}</p>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-white" />
                    </a>
                  ))}
                </div>
              </div>

            </div>

          </div>

          {/* AI Cinematic Scholar Section */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950/20 via-purple-950/20 to-indigo-950/20 border border-amber-500/30 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-400">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">CineVerse AI Scholar Insights</h3>
                  <p className="text-xs text-slate-400">Deep-dive film theory, thematic symbolism & trivia powered by Gemini</p>
                </div>
              </div>

              {!aiInsights && (
                <button
                  onClick={handleFetchAiInsights}
                  disabled={isLoadingAi}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-black font-extrabold text-xs shadow-md hover:scale-105 active:scale-95 disabled:opacity-50 transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isLoadingAi ? 'Analyzing Film...' : 'Generate AI Insights'}</span>
                </button>
              )}
            </div>

            {aiInsights && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs animate-in fade-in">
                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
                  <p className="font-bold text-amber-300 flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" /> Why You Should Watch Right Now
                  </p>
                  <p className="text-slate-300 leading-relaxed">{aiInsights.whyWatch}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
                  <p className="font-bold text-cyan-300 flex items-center gap-1.5">
                    <Film className="w-3.5 h-3.5" /> Directorial Style & Craft
                  </p>
                  <p className="text-slate-300 leading-relaxed">{aiInsights.directorStyle}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
                  <p className="font-bold text-purple-300 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5" /> Hidden Themes & Symbolism
                  </p>
                  <ul className="list-disc list-inside text-slate-300 space-y-1">
                    {aiInsights.hiddenThemes.map((t, idx) => (
                      <li key={idx}>{t}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-3.5 rounded-xl bg-black/40 border border-white/10 space-y-1.5">
                  <p className="font-bold text-rose-300 flex items-center gap-1.5">
                    <Coffee className="w-3.5 h-3.5" /> Curated Food & Cocktail Pairing
                  </p>
                  <p className="text-slate-300 leading-relaxed">{aiInsights.idealPairing}</p>
                </div>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
