import React, { useState } from 'react';
import { 
  Film, 
  Sparkles, 
  Search, 
  Download, 
  Bookmark, 
  ShieldCheck, 
  Sun, 
  Moon, 
  User as UserIcon, 
  ShieldAlert, 
  Menu, 
  X,
  SlidersHorizontal,
  Heart
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Navbar: React.FC = () => {
  const { 
    isDark, 
    toggleTheme, 
    activeTab, 
    setActiveTab, 
    watchlist, 
    activeDownloads, 
    currentUser, 
    loginAs, 
    setIsAiSearchOpen,
    setIsLegalNoticeOpen,
    filters,
    setFilters
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveTab('browse');
  };

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-300 bg-black/70 border-white/10 dark:bg-[#0a0b0f]/80 dark:border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('home')}
            className="flex items-center gap-3 cursor-pointer group flex-shrink-0"
          >
            <div className="relative w-11 h-11 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-indigo-600 p-[2px] shadow-lg shadow-amber-500/20 group-hover:shadow-amber-500/40 transition-all duration-300">
              <div className="w-full h-full bg-[#0d0f17] rounded-[10px] flex items-center justify-center">
                <Film className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-2xl tracking-tight bg-gradient-to-r from-amber-200 via-amber-400 to-rose-400 bg-clip-text text-transparent font-['Cinzel',serif]">
                  CineVerse
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  AI
                </span>
              </div>
              <p className="text-[11px] text-slate-400 tracking-wider font-medium hidden sm:block">
                Discovery • Streaming • Legal Downloads
              </p>
            </div>
          </div>

          {/* Quick Search Bar */}
          <div className="hidden md:flex flex-1 max-w-md items-center">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search movies, actors, directors..."
                value={filters.query}
                onChange={(e) => {
                  setFilters(f => ({ ...f, query: e.target.value }));
                  if (activeTab !== 'browse' && e.target.value.trim().length > 0) {
                    setActiveTab('browse');
                  }
                }}
                className="w-full bg-white/5 border border-white/10 rounded-full pl-10 pr-24 py-2 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500/50 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <button
                type="button"
                onClick={() => setIsAiSearchOpen(true)}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-purple-500/20 border border-amber-500/30 text-amber-300 text-xs font-medium hover:border-amber-400 transition-all"
              >
                <Sparkles className="w-3 h-3 text-amber-400 animate-pulse" />
                <span>AI Search</span>
              </button>
            </form>
          </div>

          {/* Nav Links Desktop */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            <button
              onClick={() => setActiveTab('home')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'home'
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              Spotlight
            </button>
            <button
              onClick={() => setActiveTab('browse')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'browse'
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Browse & Filters
            </button>
            <button
              onClick={() => setActiveTab('downloads')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'downloads'
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              Downloads
              {activeDownloads.length > 0 && (
                <span className="w-5 h-5 rounded-full bg-amber-500 text-black font-extrabold text-[11px] flex items-center justify-center animate-bounce">
                  {activeDownloads.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'profile'
                  ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30 shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              Watchlist
              {watchlist.length > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-white/10 text-slate-300 text-[10px] font-semibold">
                  {watchlist.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('admin')}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeTab === 'admin'
                  ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30 shadow-sm'
                  : 'text-slate-400 hover:text-rose-300 hover:bg-rose-500/10'
              }`}
            >
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              Admin
            </button>
          </nav>

          {/* Action Tools & User */}
          <div className="flex items-center gap-2">
            
            {/* Legal compliance trigger */}
            <button
              onClick={() => setIsLegalNoticeOpen(true)}
              title="Verified 100% Legal Distribution Compliance"
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold hover:bg-emerald-500/20 transition-all"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span className="hidden xl:inline">100% Legal</span>
            </button>

            {/* AI Assistant Button (Compact) */}
            <button
              onClick={() => setIsAiSearchOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-rose-500 text-black font-semibold text-xs shadow-md shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Assist</span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
              title={isDark ? "Switch to Light Mode" : "Switch to Cinematic Dark Mode"}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
            </button>

            {/* User Profile / Role switcher */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(prev => !prev)}
                className="flex items-center gap-2 p-1.5 rounded-xl bg-white/5 border border-white/10 hover:border-amber-500/40 transition-all"
              >
                <img
                  src={currentUser?.avatar}
                  alt={currentUser?.name}
                  className="w-7 h-7 rounded-lg object-cover border border-amber-400/30"
                />
                <span className="text-xs font-medium text-slate-200 hidden md:block max-w-[90px] truncate">
                  {currentUser?.name}
                </span>
              </button>

              {userDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#11131a] border border-white/10 p-3 shadow-2xl backdrop-blur-2xl z-50 text-xs animate-in fade-in zoom-in-95 duration-200"
                  onMouseLeave={() => setUserDropdownOpen(false)}
                >
                  <div className="flex items-center gap-3 pb-3 mb-2 border-b border-white/10">
                    <img
                      src={currentUser?.avatar}
                      alt={currentUser?.name}
                      className="w-10 h-10 rounded-xl object-cover border border-amber-400/40"
                    />
                    <div>
                      <p className="font-bold text-white text-sm">{currentUser?.name}</p>
                      <p className="text-[11px] text-slate-400">{currentUser?.email}</p>
                      <span className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase mt-1 ${
                        currentUser?.role === 'admin' 
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' 
                          : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      }`}>
                        {currentUser?.role === 'admin' ? '🛡️ Administrator' : '🎬 Member'}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 mb-2">
                    <button
                      onClick={() => {
                        setActiveTab('profile');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-slate-300 hover:text-white flex items-center justify-between"
                    >
                      <span>My Profile & Stats</span>
                      <UserIcon className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('profile');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-slate-300 hover:text-white flex items-center justify-between"
                    >
                      <span>Saved Watchlist</span>
                      <Bookmark className="w-3.5 h-3.5 text-amber-400" />
                    </button>
                    <button
                      onClick={() => {
                        setActiveTab('downloads');
                        setUserDropdownOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/5 text-slate-300 hover:text-white flex items-center justify-between"
                    >
                      <span>Legal Downloads</span>
                      <Download className="w-3.5 h-3.5 text-cyan-400" />
                    </button>
                  </div>

                  <div className="pt-2 border-t border-white/10">
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider mb-1.5 font-bold">Switch Account Mode</p>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        onClick={() => {
                          loginAs('admin');
                          setUserDropdownOpen(false);
                        }}
                        className={`py-1.5 px-2 rounded-lg text-center font-semibold transition-all ${
                          currentUser?.role === 'admin' 
                            ? 'bg-rose-500 text-white shadow-md' 
                            : 'bg-white/5 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        Daniel Das (Admin)
                      </button>
                      <button
                        onClick={() => {
                          loginAs('user');
                          setUserDropdownOpen(false);
                        }}
                        className={`py-1.5 px-2 rounded-lg text-center font-semibold transition-all ${
                          currentUser?.role === 'user' 
                            ? 'bg-amber-500 text-black shadow-md' 
                            : 'bg-white/5 text-slate-300 hover:bg-white/10'
                        }`}
                      >
                        Guest Member
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="p-2 rounded-xl text-slate-300 hover:text-white hover:bg-white/5 lg:hidden"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-white/10 space-y-3">
            <form onSubmit={handleSearchSubmit} className="relative w-full">
              <input
                type="text"
                placeholder="Search movies, cast, genres..."
                value={filters.query}
                onChange={(e) => setFilters(f => ({ ...f, query: e.target.value }))}
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-slate-200 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </form>

            <div className="grid grid-cols-2 gap-2 text-sm font-medium">
              <button
                onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left flex items-center gap-2 ${
                  activeTab === 'home' ? 'bg-amber-500/20 text-amber-300' : 'bg-white/5 text-slate-200'
                }`}
              >
                <Film className="w-4 h-4 text-amber-400" />
                Spotlight
              </button>
              <button
                onClick={() => { setActiveTab('browse'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left flex items-center gap-2 ${
                  activeTab === 'browse' ? 'bg-amber-500/20 text-amber-300' : 'bg-white/5 text-slate-200'
                }`}
              >
                <SlidersHorizontal className="w-4 h-4 text-amber-400" />
                Browse & Filters
              </button>
              <button
                onClick={() => { setActiveTab('downloads'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left flex items-center gap-2 ${
                  activeTab === 'downloads' ? 'bg-amber-500/20 text-amber-300' : 'bg-white/5 text-slate-200'
                }`}
              >
                <Download className="w-4 h-4 text-cyan-400" />
                Downloads ({activeDownloads.length})
              </button>
              <button
                onClick={() => { setActiveTab('profile'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left flex items-center gap-2 ${
                  activeTab === 'profile' ? 'bg-amber-500/20 text-amber-300' : 'bg-white/5 text-slate-200'
                }`}
              >
                <Bookmark className="w-4 h-4 text-amber-400" />
                Watchlist ({watchlist.length})
              </button>
              <button
                onClick={() => { setActiveTab('admin'); setMobileMenuOpen(false); }}
                className={`p-2.5 rounded-xl text-left flex items-center gap-2 ${
                  activeTab === 'admin' ? 'bg-rose-500/20 text-rose-300' : 'bg-white/5 text-slate-200'
                }`}
              >
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                Admin Dashboard
              </button>
              <button
                onClick={() => { setIsLegalNoticeOpen(true); setMobileMenuOpen(false); }}
                className="p-2.5 rounded-xl text-left flex items-center gap-2 bg-emerald-500/10 text-emerald-300"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                100% Legal Policy
              </button>
            </div>
          </div>
        )}

      </div>
    </header>
  );
};
