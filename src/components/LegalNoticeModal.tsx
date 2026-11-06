import React from 'react';
import { ShieldCheck, X, FileText, CheckCircle2, Lock, Scale, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LegalNoticeModal: React.FC = () => {
  const { isLegalNoticeOpen, setIsLegalNoticeOpen } = useApp();

  if (!isLegalNoticeOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
      <div className="relative w-full max-w-2xl bg-[#10121c] border border-emerald-500/30 rounded-3xl p-6 sm:p-8 overflow-y-auto max-h-[85vh] space-y-6 shadow-2xl animate-in fade-in zoom-in-95">
        
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-['Cinzel',serif]">
                100% Legal & Authorized Media Notice
              </h2>
              <p className="text-xs text-emerald-400 font-semibold">Strict Copyright & Creative Commons Compliance</p>
            </div>
          </div>

          <button
            onClick={() => setIsLegalNoticeOpen(false)}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="space-y-4 text-xs text-slate-300 leading-relaxed">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
            <h3 className="font-bold text-white text-sm flex items-center gap-2">
              <Scale className="w-4 h-4 text-amber-400" />
              Our Legal Commitment
            </h3>
            <p>
              CineVerse AI operates under the strict ethical and legal mandate that <span className="text-white font-semibold">no copyrighted films are hosted, scraped, or distributed without proper authorization</span>. Every single motion picture available for streaming or offline download on our platform falls under one of the following recognized legal categories:
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
              <span className="font-bold text-emerald-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> 1. Public Domain Cinema
              </span>
              <p className="text-slate-400">
                Films whose copyright term has formally expired (such as pre-1929 works like Fritz Lang's <em>Metropolis</em>, <em>Nosferatu</em>, and <em>The General</em>) or works that failed statutory copyright renewal under the 1909 US Copyright Act (including George A. Romero's <em>Night of the Living Dead</em> and Stanley Donen's <em>Charade</em>).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
              <span className="font-bold text-cyan-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> 2. Creative Commons & Open Movie Foundation
              </span>
              <p className="text-slate-400">
                Films intentionally released into the free culture commons by their creators under Creative Commons licenses (CC BY 3.0 / CC BY 4.0), including celebrated open projects produced by the Blender Animation Studio (<em>Tears of Steel</em>, <em>Cosmos Laundromat</em>, <em>Spring</em>, <em>Sintel</em>, <em>Big Buck Bunny</em>).
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1">
              <span className="font-bold text-purple-300 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> 3. Official Public Repositories & Partners
              </span>
              <p className="text-slate-400">
                Authorized streaming endpoints provided through open cultural archives including the Internet Archive (archive.org), Wikimedia Commons, and library streaming channels.
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200">
            <span className="font-bold">DMCA & Rights Holder Contact: </span>
            If you are a copyright holder or licensed distributor with questions regarding metadata attribution or public domain documentation, please use the in-app reporting tool or contact our content curation desk at legal@cineverse.io.
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={() => setIsLegalNoticeOpen(false)}
            className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-xs transition-all shadow-lg shadow-emerald-500/20"
          >
            I Understand & Agree
          </button>
        </div>

      </div>
    </div>
  );
};
