import React from 'react';
import { 
  Download, 
  ShieldCheck, 
  HardDrive, 
  CheckCircle, 
  Pause, 
  Play, 
  Trash2, 
  FileText, 
  ExternalLink,
  Sparkles,
  Info,
  Film
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DownloadsPage: React.FC = () => {
  const { 
    movies, 
    activeDownloads, 
    downloadHistory, 
    cancelDownload, 
    pauseResumeDownload, 
    clearDownloadHistory,
    setDownloadModalMovie,
    setStreamingMovie
  } = useApp();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-extrabold text-xs flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              100% Legal & DMCA Compliant Offline Storage
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white font-['Cinzel',serif]">
            Legal Movie Download Hub
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Download high-definition public-domain and open-license films directly to your device without subscriptions, paywalls, or copyright infringement risk.
          </p>
        </div>

        {/* Storage Counter */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
            <HardDrive className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Active Downloads</p>
            <p className="text-xl font-bold text-white">{activeDownloads.length} active • {downloadHistory.length} completed</p>
          </div>
        </div>
      </div>

      {/* Active Downloads Section (If Any) */}
      {activeDownloads.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 font-['Cinzel',serif]">
            <Download className="w-5 h-5 text-amber-400 animate-bounce" />
            Active Downloads ({activeDownloads.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeDownloads.map(dl => (
              <div 
                key={dl.id}
                className="p-4 rounded-2xl bg-[#12141e] border border-amber-500/30 space-y-3 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={dl.posterUrl}
                    alt={dl.movieTitle}
                    className="w-12 h-16 rounded-lg object-cover border border-white/10"
                  />
                  <div className="flex-1 overflow-hidden">
                    <h3 className="font-bold text-white text-sm truncate">{dl.movieTitle}</h3>
                    <p className="text-xs text-amber-400/90">{dl.quality}</p>
                    <p className="text-[11px] text-slate-400 font-mono mt-0.5">{dl.fileSize} • {dl.speed}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => pauseResumeDownload(dl.id)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 transition-colors"
                      title={dl.status === 'downloading' ? 'Pause' : 'Resume'}
                    >
                      {dl.status === 'downloading' ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-emerald-400" />}
                    </button>
                    <button
                      onClick={() => cancelDownload(dl.id)}
                      className="p-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-colors"
                      title="Cancel Download"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Progress bar */}
                <div>
                  <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                    <span>{dl.status === 'paused' ? 'Paused' : 'Transferring payload...'}</span>
                    <span className="font-bold text-amber-400 font-mono">{dl.progress}%</span>
                  </div>
                  <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-amber-500 to-rose-500 transition-all duration-300"
                      style={{ width: `${dl.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Download History Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center gap-2 font-['Cinzel',serif]">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            Download History
          </h2>
          {downloadHistory.length > 0 && (
            <button
              onClick={clearDownloadHistory}
              className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Clear History
            </button>
          )}
        </div>

        {downloadHistory.length === 0 ? (
          <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center space-y-2">
            <Download className="w-8 h-8 text-slate-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-300">No downloads saved yet</p>
            <p className="text-xs text-slate-400">Click any movie below to initiate a legal multi-resolution download.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {downloadHistory.map(item => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between gap-4 hover:border-white/20 transition-all"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={item.posterUrl}
                    alt={item.movieTitle}
                    className="w-10 h-14 rounded-lg object-cover border border-white/10"
                  />
                  <div>
                    <h4 className="font-bold text-white text-sm">{item.movieTitle}</h4>
                    <p className="text-xs text-slate-400">{item.quality} • {item.fileSize}</p>
                    <p className="text-[10px] text-slate-500">Saved: {item.timestamp}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold flex items-center gap-1">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Downloaded
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Available Catalog for Instant Download */}
      <div className="space-y-4 pt-4">
        <div>
          <h2 className="text-xl font-bold text-white font-['Cinzel',serif]">
            Verified Movies Available for Download
          </h2>
          <p className="text-xs text-slate-400">
            All files are mirrored on high-speed open cloud storage and verified for pristine quality and authenticity.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {movies.map(movie => (
            <div
              key={movie.id}
              className="p-4 rounded-2xl bg-[#11131c] border border-white/10 hover:border-amber-500/40 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="flex gap-3">
                <img
                  src={movie.posterUrl}
                  alt={movie.title}
                  className="w-16 h-24 rounded-xl object-cover border border-white/10 flex-shrink-0"
                />
                <div className="overflow-hidden">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    {movie.licenseType}
                  </span>
                  <h3 className="font-bold text-white text-sm mt-1 truncate">{movie.title}</h3>
                  <p className="text-xs text-slate-400">{movie.year} • {movie.runtime}m</p>
                  <p className="text-xs text-amber-400 font-medium mt-1">
                    {movie.downloadOptions.length} available formats
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setDownloadModalMovie(movie)}
                  className="flex-1 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-black font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 hover:scale-102 active:scale-98 transition-all"
                >
                  <Download className="w-3.5 h-3.5 fill-black" />
                  <span>Choose Resolution</span>
                </button>
                <button
                  onClick={() => setStreamingMovie(movie)}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/15 text-white transition-colors"
                  title="Stream Preview"
                >
                  <Film className="w-4 h-4 text-slate-300" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
