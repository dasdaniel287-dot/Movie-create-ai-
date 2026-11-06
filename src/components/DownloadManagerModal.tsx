import React, { useState } from 'react';
import { 
  Download, 
  X, 
  ShieldCheck, 
  HardDrive, 
  CheckCircle, 
  Pause, 
  Play, 
  Trash2, 
  FileText, 
  Check, 
  ExternalLink,
  Sparkles,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { DownloadOption, Movie } from '../types/movie';

export const DownloadManagerModal: React.FC = () => {
  const { 
    downloadModalMovie, 
    setDownloadModalMovie, 
    startDownload,
    activeDownloads, 
    downloadHistory, 
    cancelDownload, 
    pauseResumeDownload, 
    clearDownloadHistory,
    showToast 
  } = useApp();

  if (!downloadModalMovie) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-2xl bg-[#10121c] border border-white/15 rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/10">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-[11px] flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                Verified Legal Download
              </span>
              <span className="text-xs text-slate-400">{downloadModalMovie.licenseBadge}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white font-['Cinzel',serif]">
              Download "{downloadModalMovie.title}"
            </h2>
            <p className="text-xs text-slate-300 mt-1">
              Choose your preferred resolution and audio codec. All files are 100% legal to download and store offline.
            </p>
          </div>

          <button
            onClick={() => setDownloadModalMovie(null)}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Resolution Options Grid */}
        <div className="py-5 space-y-3">
          {downloadModalMovie.downloadOptions.map(opt => (
            <div
              key={opt.id}
              className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-amber-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
            >
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white group-hover:text-amber-400 transition-colors">
                    {opt.label}
                  </h4>
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300">
                    {opt.format}
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-1">
                  <span>Res: {opt.resolution}</span>
                  <span>•</span>
                  <span>Codec: {opt.codec}</span>
                  <span>•</span>
                  <span>Audio: {opt.audio}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 sm:self-center">
                <span className="text-sm font-mono font-bold text-cyan-300 bg-cyan-950/40 px-2.5 py-1 rounded-lg border border-cyan-500/30">
                  {opt.fileSize}
                </span>

                <button
                  onClick={() => {
                    startDownload(downloadModalMovie, opt.id);
                    setDownloadModalMovie(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-extrabold text-xs flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all active:scale-95"
                >
                  <Download className="w-4 h-4 fill-black" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Licensing & Legal Transparency Guarantee */}
        <div className="p-3.5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex items-start gap-2.5 text-xs text-emerald-200">
          <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Copyright & License Compliance: </span>
            This title is preserved under {downloadModalMovie.licenseType}. No copyright infringement or piracy is hosted. You have full legal authorization to retain this copy for personal or educational use.
          </div>
        </div>

      </div>
    </div>
  );
};
