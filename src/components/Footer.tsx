import React from 'react';
import { Film, ShieldCheck, Heart, Sparkles, ExternalLink } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Footer: React.FC = () => {
  const { setActiveTab, setIsAiSearchOpen, setIsLegalNoticeOpen } = useApp();

  return (
    <footer className="border-t border-white/10 bg-[#08090d] text-slate-400 text-xs py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-rose-500 p-[1px]">
                <div className="w-full h-full bg-black rounded-[7px] flex items-center justify-center">
                  <Film className="w-4 h-4 text-amber-400" />
                </div>
              </div>
              <span className="font-extrabold text-xl text-white font-['Cinzel',serif]">
                CineVerse AI
              </span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              The premier destination for legal cinema discovery, cinematic streaming, and authorized open-culture downloads powered by Gemini 3.8 Flash.
            </p>
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
              <ShieldCheck className="w-4 h-4" />
              <span>100% Authorized & Public Domain</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Navigation</h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => setActiveTab('home')} className="hover:text-amber-400 transition-colors">
                  Spotlight Premiere
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('browse')} className="hover:text-amber-400 transition-colors">
                  Browse Catalog & Filters
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('downloads')} className="hover:text-amber-400 transition-colors">
                  Legal Downloads Hub
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('profile')} className="hover:text-amber-400 transition-colors">
                  Watchlist & History
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('admin')} className="hover:text-rose-400 transition-colors">
                  Admin Control Center
                </button>
              </li>
            </ul>
          </div>

          {/* AI & Features */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">AI Capabilities</h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => setIsAiSearchOpen(true)} className="hover:text-amber-400 flex items-center gap-1 transition-colors">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>AI Movie Search Assistant</span>
                </button>
              </li>
              <li>
                <button onClick={() => setActiveTab('profile')} className="hover:text-amber-400 transition-colors">
                  Personalized AI Radar
                </button>
              </li>
              <li>
                <span className="text-slate-500">CineVerse Scholar Deep Insights</span>
              </li>
              <li>
                <span className="text-slate-500">Intelligent Taste & Mood Matching</span>
              </li>
            </ul>
          </div>

          {/* Legal Transparency */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Compliance & Rights</h4>
            <ul className="space-y-1.5">
              <li>
                <button onClick={() => setIsLegalNoticeOpen(true)} className="hover:text-emerald-400 transition-colors">
                  Public Domain Documentation
                </button>
              </li>
              <li>
                <button onClick={() => setIsLegalNoticeOpen(true)} className="hover:text-emerald-400 transition-colors">
                  Creative Commons Attribution
                </button>
              </li>
              <li>
                <a href="https://studio.blender.org/films/" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1 transition-colors">
                  <span>Blender Open Projects</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
              <li>
                <a href="https://archive.org/details/movies" target="_blank" rel="noreferrer" className="hover:text-white flex items-center gap-1 transition-colors">
                  <span>Internet Archive Partner</span>
                  <ExternalLink className="w-3 h-3 text-slate-500" />
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} CineVerse AI. Dedicated to the preservation, discovery, and open celebration of cinema.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3 h-3 text-rose-500 fill-rose-500" /> for cinephiles worldwide.
          </p>
        </div>

      </div>
    </footer>
  );
};
