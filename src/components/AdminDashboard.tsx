import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Film, 
  Users, 
  BarChart3, 
  Plus, 
  Trash2, 
  Edit3, 
  CheckCircle2, 
  AlertTriangle, 
  HardDrive, 
  TrendingUp, 
  Eye, 
  Download,
  X,
  ShieldCheck,
  Search,
  Sparkles,
  Flame,
  Star,
  Heart,
  RefreshCw,
  Clock,
  Play,
  FileText,
  UserPlus
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Movie, LicenseType } from '../types/movie';

export const AdminDashboard: React.FC = () => {
  const { 
    movies, 
    addMovie, 
    updateMovie, 
    deleteMovie, 
    resetCatalog,
    toggleMovieCategory,
    usersList, 
    addUser,
    deleteUser,
    reports, 
    updateReportStatus, 
    deleteReport,
    submitReport,
    currentUser,
    loginAs,
    setSelectedMovie,
    setStreamingMovie,
    showToast 
  } = useApp();

  // Ensure Daniel Das is always logged in as admin when entering this dashboard
  useEffect(() => {
    if (currentUser?.role !== 'admin' || currentUser?.id !== 'admin-daniel') {
      loginAs('admin');
    }
  }, [currentUser, loginAs]);

  const [adminTab, setAdminTab] = useState<'analytics' | 'movies' | 'users' | 'reports'>('analytics');
  
  // Movie Catalog Filter & Search State
  const [movieSearch, setMovieSearch] = useState('');
  const [filterLicense, setFilterLicense] = useState<string>('All');
  const [filterCategory, setFilterCategory] = useState<string>('All');

  // Modal for Adding / Editing Movie
  const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Movie Form State
  const [title, setTitle] = useState('');
  const [tagline, setTagline] = useState('');
  const [synopsis, setSynopsis] = useState('');
  const [year, setYear] = useState<number>(2024);
  const [runtime, setRuntime] = useState<number>(90);
  const [imdbScore, setImdbScore] = useState<number>(8.0);
  const [director, setDirector] = useState('');
  const [genres, setGenres] = useState('Sci-Fi, Action');
  const [licenseType, setLicenseType] = useState<LicenseType>('Creative Commons');
  const [licenseBadge, setLicenseBadge] = useState('CC BY 4.0');
  const [streamUrl, setStreamUrl] = useState('');
  const [posterUrl, setPosterUrl] = useState('');
  const [backdropUrl, setBackdropUrl] = useState('');
  const [isFeatured, setIsFeatured] = useState(false);
  const [isTrending, setIsTrending] = useState(true);
  const [isPopular, setIsPopular] = useState(true);
  const [isLatest, setIsLatest] = useState(false);

  // Reports Filter & Add Modal State
  const [reportFilter, setReportFilter] = useState<'All' | 'Pending' | 'Resolved' | 'Dismissed'>('All');
  const [isAddReportModalOpen, setIsAddReportModalOpen] = useState(false);
  const [newReportMovie, setNewReportMovie] = useState('');
  const [newReportType, setNewReportType] = useState<'Broken Stream' | 'Audio Sync' | 'Metadata Error' | 'Copyright Inquiry'>('Metadata Error');
  const [newReportNote, setNewReportNote] = useState('');

  // User Add Modal State
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserQuality, setNewUserQuality] = useState<'Auto' | '1080p' | '4K' | '720p'>('1080p');

  const openAddModal = () => {
    setEditingMovie(null);
    setTitle('');
    setTagline('A legal cinematic vision');
    setSynopsis('');
    setYear(2024);
    setRuntime(90);
    setImdbScore(7.8);
    setDirector('');
    setGenres('Sci-Fi, Action');
    setLicenseType('Creative Commons');
    setLicenseBadge('CC BY 4.0');
    setStreamUrl('https://archive.org/download/Tears-of-Steel/tears_of_steel_720p.mp4');
    setPosterUrl('https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80');
    setBackdropUrl('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80');
    setIsFeatured(false);
    setIsTrending(true);
    setIsPopular(true);
    setIsLatest(true);
    setIsAddModalOpen(true);
  };

  const openEditModal = (movie: Movie) => {
    setEditingMovie(movie);
    setTitle(movie.title || '');
    setTagline(movie.tagline || '');
    setSynopsis(movie.synopsis || '');
    setYear(movie.year || 2024);
    setRuntime(movie.runtime || 90);
    setImdbScore(movie.imdbScore || 7.5);
    setDirector(movie.director || '');
    setGenres(Array.isArray(movie.genres) ? movie.genres.join(', ') : 'Sci-Fi');
    setLicenseType(movie.licenseType || 'Creative Commons');
    setLicenseBadge(movie.licenseBadge || 'CC BY 3.0');
    setStreamUrl(movie.streamUrl || '');
    setPosterUrl(movie.posterUrl || '');
    setBackdropUrl(movie.backdropUrl || '');
    setIsFeatured(Boolean(movie.featured));
    setIsTrending(Boolean(movie.trending));
    setIsPopular(Boolean(movie.popular));
    setIsLatest(Boolean(movie.latest));
    setIsAddModalOpen(true);
  };

  const handleSaveMovie = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const genreList = genres.split(',').map(g => g.trim()).filter(Boolean);

    if (editingMovie) {
      // Update existing movie
      const updatedDownloadOptions = (editingMovie.downloadOptions && editingMovie.downloadOptions.length > 0)
        ? editingMovie.downloadOptions.map(opt => ({ ...opt, url: streamUrl }))
        : [
            {
              id: `opt-1080p-${Date.now()}`,
              label: '1080p Full HD MP4',
              resolution: '1920x1080',
              codec: 'H.264',
              bitrate: '10 Mbps',
              audio: 'Stereo AAC',
              fileSize: '840 MB',
              fileSizeBytes: 880803840,
              url: streamUrl,
              format: 'MP4' as const
            }
          ];

      updateMovie(editingMovie.id, {
        title,
        tagline,
        synopsis,
        year,
        runtime,
        imdbScore,
        director,
        genres: genreList,
        licenseType,
        licenseBadge,
        streamUrl,
        trailerUrl: streamUrl,
        posterUrl,
        backdropUrl,
        featured: isFeatured,
        trending: isTrending,
        popular: isPopular,
        latest: isLatest,
        downloadOptions: updatedDownloadOptions,
        officialStreamingProviders: [
          { name: 'Authorized Cinema Feed', url: streamUrl, free: true, type: 'Direct Stream' }
        ]
      });
    } else {
      // Add new movie
      addMovie({
        title,
        tagline,
        synopsis,
        year,
        runtime,
        rating: 'PG-13',
        imdbScore,
        communityScore: 9.1,
        genres: genreList,
        language: 'English',
        director,
        cast: [
          { name: 'Lead Performer', character: 'Protagonist' },
          { name: 'Supporting Artist', character: 'Allied Key' }
        ],
        posterUrl: posterUrl || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
        backdropUrl: backdropUrl || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1600&auto=format&fit=crop&q=80',
        trailerUrl: streamUrl,
        streamUrl,
        licenseType,
        licenseBadge,
        licenseDetails: 'Authorized open release verified by content moderation committee.',
        officialStreamingProviders: [
          { name: 'Open Archive Stream', url: streamUrl, free: true, type: 'Direct Stream' }
        ],
        downloadOptions: [
          {
            id: `opt-1080p-${Date.now()}`,
            label: '1080p Full HD MP4',
            resolution: '1920x1080',
            codec: 'H.264',
            bitrate: '10 Mbps',
            audio: 'Stereo AAC',
            fileSize: '820 MB',
            fileSizeBytes: 859832320,
            url: streamUrl,
            format: 'MP4'
          },
          {
            id: `opt-720p-${Date.now()}`,
            label: '720p HD MP4 (Mobile Ready)',
            resolution: '1280x720',
            codec: 'H.264',
            bitrate: '4 Mbps',
            audio: 'Stereo AAC',
            fileSize: '410 MB',
            fileSizeBytes: 429916160,
            url: streamUrl,
            format: 'MP4'
          }
        ],
        subtitles: [],
        featured: isFeatured,
        trending: isTrending,
        popular: isPopular,
        latest: isLatest
      });
    }

    setIsAddModalOpen(false);
  };

  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReportMovie.trim() || !newReportNote.trim()) return;

    submitReport({
      movieId: `custom-${Date.now()}`,
      movieTitle: newReportMovie,
      type: newReportType,
      description: newReportNote
    });

    setIsAddReportModalOpen(false);
    setNewReportMovie('');
    setNewReportNote('');
    showToast('Moderation audit ticket created!', 'success');
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserName.trim() || !newUserEmail.trim()) return;

    addUser({
      name: newUserName,
      email: newUserEmail,
      preferredGenres: ['Sci-Fi', 'Classic Cinema'],
      streamingQualityPreference: newUserQuality
    });

    setIsAddUserModalOpen(false);
    setNewUserName('');
    setNewUserEmail('');
  };

  const handleExportCatalog = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(movies, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `cineverse-catalog-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Catalog exported to JSON!', 'success');
  };

  // Filter movies
  const filteredMovies = movies.filter(m => {
    const matchesSearch = 
      m.title.toLowerCase().includes(movieSearch.toLowerCase()) ||
      m.director.toLowerCase().includes(movieSearch.toLowerCase()) ||
      m.genres.some(g => g.toLowerCase().includes(movieSearch.toLowerCase()));
    
    const matchesLicense = filterLicense === 'All' || m.licenseType === filterLicense;
    
    let matchesCategory = true;
    if (filterCategory === 'Featured') matchesCategory = Boolean(m.featured);
    if (filterCategory === 'Trending') matchesCategory = Boolean(m.trending);
    if (filterCategory === 'Popular') matchesCategory = Boolean(m.popular);
    if (filterCategory === 'Latest') matchesCategory = Boolean(m.latest);

    return matchesSearch && matchesLicense && matchesCategory;
  });

  // Filter reports
  const filteredReports = reports.filter(r => {
    if (reportFilter === 'All') return true;
    return r.status === reportFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Header Banner - Daniel Das Sole Administrator */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#121520] via-[#161a29] to-[#121420] border border-amber-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-rose-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src="/assets/aistudio/abc3e8cc-34ef-4791-b779-484b4e70b381_a03036d9.jpg"
                alt="Daniel Das"
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-2 border-amber-400 shadow-xl shadow-amber-500/20"
              />
              <div className="absolute -bottom-1 -right-1 p-1 bg-amber-500 text-black rounded-lg shadow-md" title="Sole Verified Administrator">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-0.5 rounded-full bg-gradient-to-r from-amber-500/20 to-rose-500/20 text-amber-300 font-extrabold text-xs uppercase border border-amber-500/40 flex items-center gap-1.5 shadow-sm">
                  <ShieldAlert className="w-3.5 h-3.5 text-amber-400" />
                  Sole Platform Administrator & Founder
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 font-semibold text-xs border border-emerald-500/30 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Root Active
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white font-['Cinzel',serif] tracking-wide">
                Daniel Das
              </h1>

              <p className="text-xs text-slate-300 flex items-center gap-2">
                <span className="font-mono text-amber-400 font-semibold">dasdaniel287@gmail.com</span>
                <span>•</span>
                <span>CineVerse AI Command Hub</span>
                <span>•</span>
                <span className="text-emerald-400 font-medium">100% Legal Distribution</span>
              </p>
            </div>
          </div>

          {/* Quick Hub Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={openAddModal}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-black font-extrabold text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Movie</span>
            </button>

            <button
              onClick={handleExportCatalog}
              className="px-3.5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10 hover:border-white/20 font-semibold text-xs flex items-center gap-1.5 transition-all"
              title="Download full catalog as JSON"
            >
              <Download className="w-3.5 h-3.5 text-cyan-400" />
              <span>Export JSON</span>
            </button>

            <button
              onClick={() => {
                if (window.confirm('Restore official 12+ public domain and creative commons movies to catalog?')) {
                  resetCatalog();
                }
              }}
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-amber-400 border border-white/10 transition-all"
              title="Reset Catalog to Default"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Admin Tabs Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setAdminTab('analytics')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              adminTab === 'analytics'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Telemetry & Overview</span>
          </button>

          <button
            onClick={() => setAdminTab('movies')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              adminTab === 'movies'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Film className="w-4 h-4" />
            <span>Movie Catalog & Sources ({movies.length})</span>
          </button>

          <button
            onClick={() => setAdminTab('reports')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              adminTab === 'reports'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>Moderation & Reports ({reports.filter(r => r.status === 'Pending').length} pending)</span>
          </button>

          <button
            onClick={() => setAdminTab('users')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              adminTab === 'users'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'bg-white/5 text-slate-300 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>User Accounts ({usersList.length})</span>
          </button>
        </div>

        <div className="text-xs text-slate-400 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Admin Session: <strong className="text-white">Daniel Das</strong></span>
        </div>
      </div>

      {/* TAB 1: ANALYTICS & TELEMETRY */}
      {adminTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            
            <div className="p-5 rounded-2xl bg-[#11131c] border border-white/10 space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Total Stream Views</span>
                <Eye className="w-4 h-4 text-amber-400" />
              </div>
              <p className="text-2xl font-bold text-white font-mono">148,290</p>
              <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                <TrendingUp className="w-3 h-3" /> +18.4% this week
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#11131c] border border-white/10 space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Legal Downloads</span>
                <Download className="w-4 h-4 text-cyan-400" />
              </div>
              <p className="text-2xl font-bold text-white font-mono">54,120</p>
              <p className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                <TrendingUp className="w-3 h-3" /> +12.1% this week
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#11131c] border border-white/10 space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Verified Legal Titles</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <p className="text-2xl font-bold text-white font-mono">{movies.length}</p>
              <p className="text-[11px] text-emerald-300 font-semibold">100% Authorized & Preserved</p>
            </div>

            <div className="p-5 rounded-2xl bg-[#11131c] border border-white/10 space-y-1">
              <div className="flex items-center justify-between text-slate-400 text-xs">
                <span>Bandwidth Delivered</span>
                <HardDrive className="w-4 h-4 text-purple-400" />
              </div>
              <p className="text-2xl font-bold text-white font-mono">42.8 TB</p>
              <p className="text-[11px] text-slate-400">P2P & Open Mirrors</p>
            </div>

          </div>

          {/* Legal Licensing Distribution */}
          <div className="p-6 rounded-3xl bg-[#11131c] border border-white/10 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-white font-['Cinzel',serif]">
                  Catalog Distribution by Legal Licensing & Heritage
                </h3>
                <p className="text-xs text-slate-400">Strict adherence to copyright boundaries and open culture licenses</p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-300 text-xs font-semibold border border-emerald-500/20">
                Audited & Approved by Daniel Das
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-amber-500/30 transition-all cursor-pointer" onClick={() => { setFilterLicense('Public Domain'); setAdminTab('movies'); }}>
                <p className="text-xs text-slate-400">Public Domain Masterpieces</p>
                <p className="text-2xl font-bold text-amber-400 mt-1">
                  {movies.filter(m => m.licenseType === 'Public Domain').length} films
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">Pre-1929 & Unrenewed Works</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-500/30 transition-all cursor-pointer" onClick={() => { setFilterLicense('Creative Commons'); setAdminTab('movies'); }}>
                <p className="text-xs text-slate-400">Creative Commons</p>
                <p className="text-2xl font-bold text-cyan-400 mt-1">
                  {movies.filter(m => m.licenseType === 'Creative Commons').length} films
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">CC BY 3.0 / 4.0 Open Pipelines</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-indigo-500/30 transition-all cursor-pointer" onClick={() => { setFilterLicense('Open Movie Foundation'); setAdminTab('movies'); }}>
                <p className="text-xs text-slate-400">Open Movie Foundation</p>
                <p className="text-2xl font-bold text-indigo-400 mt-1">
                  {movies.filter(m => m.licenseType === 'Open Movie Foundation').length} films
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">Blender Open Movie Releases</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 transition-all cursor-pointer" onClick={() => { setFilterLicense('Licensed Partner'); setAdminTab('movies'); }}>
                <p className="text-xs text-slate-400">Licensed Partner Portals</p>
                <p className="text-2xl font-bold text-purple-400 mt-1">
                  {movies.filter(m => m.licenseType === 'Licensed Partner').length} films
                </p>
                <p className="text-[11px] text-slate-500 mt-0.5">Internet Archive & Kanopy Feeds</p>
              </div>
            </div>
          </div>

          {/* System Health & AI Telemetry */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#11131c] border border-white/10 space-y-3">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-400" />
                Gemini 3.8 Flash AI Recommendation Service
              </h4>
              <p className="text-xs text-slate-300">
                Server-side intelligent movie recommendations, natural language search assistant, and deep film scholar insights are active.
              </p>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  API Status: Online
                </span>
                <span className="text-slate-400">Latency: ~240ms</span>
                <span className="text-slate-400">Model: gemini-3.8-flash</span>
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-[#11131c] border border-white/10 space-y-3">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Content Protection & Anti-Piracy Policy
              </h4>
              <p className="text-xs text-slate-300">
                Zero scraping of unauthorized streaming hubs. All streams point to public repositories, verified archives, and Creative Commons master mirrors.
              </p>
              <div className="flex items-center gap-4 text-xs font-mono">
                <span className="text-emerald-400">Authorized URLs: 100%</span>
                <span className="text-slate-400">DMCA Clean: 0 notices</span>
                <span className="text-slate-400">Host: Cloud Run</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MOVIE CATALOG & SOURCE MANAGEMENT */}
      {adminTab === 'movies' && (
        <div className="space-y-4">
          
          {/* Controls: Search, Filters, Add */}
          <div className="p-4 rounded-2xl bg-[#11131c] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex flex-1 flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px] max-w-sm">
                <input
                  type="text"
                  placeholder="Filter movies by title, director, genre..."
                  value={movieSearch}
                  onChange={e => setMovieSearch(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              {/* License Filter */}
              <select
                value={filterLicense}
                onChange={e => setFilterLicense(e.target.value)}
                className="bg-[#161822] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="All">All Licenses</option>
                <option value="Public Domain">Public Domain</option>
                <option value="Creative Commons">Creative Commons</option>
                <option value="Open Movie Foundation">Open Movie Foundation</option>
                <option value="Licensed Partner">Licensed Partner</option>
              </select>

              {/* Category Filter */}
              <select
                value={filterCategory}
                onChange={e => setFilterCategory(e.target.value)}
                className="bg-[#161822] border border-white/10 rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="All">All Categories</option>
                <option value="Featured">Featured</option>
                <option value="Trending">Trending</option>
                <option value="Popular">Popular</option>
                <option value="Latest">Latest</option>
              </select>

              {(movieSearch || filterLicense !== 'All' || filterCategory !== 'All') && (
                <button
                  onClick={() => { setMovieSearch(''); setFilterLicense('All'); setFilterCategory('All'); }}
                  className="text-xs text-amber-400 hover:underline"
                >
                  Clear Filters
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={openAddModal}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold text-xs flex items-center gap-1.5 shadow transition-all"
              >
                <Plus className="w-4 h-4" />
                <span>Add Movie</span>
              </button>
            </div>
          </div>

          {/* Movies Table */}
          <div className="rounded-2xl border border-white/10 overflow-hidden bg-[#11131c] shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-white/5 text-slate-400 uppercase text-[10px] tracking-wider border-b border-white/10">
                  <tr>
                    <th className="p-3.5">Movie & Director</th>
                    <th className="p-3.5">Year / Run</th>
                    <th className="p-3.5">License Type</th>
                    <th className="p-3.5">IMDb Score</th>
                    <th className="p-3.5">Categories (Click to Toggle)</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-slate-300">
                  {filteredMovies.map(movie => (
                    <tr key={movie.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-3.5 flex items-center gap-3">
                        <img
                          src={movie.posterUrl}
                          alt={movie.title}
                          className="w-9 h-13 rounded-lg object-cover border border-white/10 flex-shrink-0"
                        />
                        <div className="min-w-0">
                          <p className="font-bold text-white text-xs truncate">{movie.title}</p>
                          <p className="text-[11px] text-slate-400 truncate">Dir: {movie.director}</p>
                          <p className="text-[10px] text-slate-500 truncate max-w-xs">{movie.genres.join(', ')}</p>
                        </div>
                      </td>

                      <td className="p-3.5 font-mono text-[11px]">
                        <div>{movie.year}</div>
                        <div className="text-slate-500">{movie.runtime} mins</div>
                      </td>

                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 whitespace-nowrap">
                          {movie.licenseType}
                        </span>
                        <div className="text-[9px] text-slate-500 font-mono mt-0.5">{movie.licenseBadge}</div>
                      </td>

                      <td className="p-3.5 font-mono font-bold text-amber-400">
                        {movie.imdbScore} ★
                      </td>

                      {/* Interactive Category Badges */}
                      <td className="p-3.5">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <button
                            onClick={() => toggleMovieCategory(movie.id, 'featured')}
                            title={movie.featured ? 'Featured in Hero Spotlight (Click to remove)' : 'Click to make Featured'}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all ${
                              movie.featured 
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' 
                                : 'bg-white/5 text-slate-500 hover:text-slate-300'
                            }`}
                          >
                            <Star className="w-2.5 h-2.5" />
                            <span>Featured</span>
                          </button>

                          <button
                            onClick={() => toggleMovieCategory(movie.id, 'trending')}
                            title={movie.trending ? 'Trending on platform (Click to remove)' : 'Click to make Trending'}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all ${
                              movie.trending 
                                ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' 
                                : 'bg-white/5 text-slate-500 hover:text-slate-300'
                            }`}
                          >
                            <Flame className="w-2.5 h-2.5" />
                            <span>Trending</span>
                          </button>

                          <button
                            onClick={() => toggleMovieCategory(movie.id, 'popular')}
                            title={movie.popular ? 'Popular with viewers (Click to remove)' : 'Click to make Popular'}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all ${
                              movie.popular 
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' 
                                : 'bg-white/5 text-slate-500 hover:text-slate-300'
                            }`}
                          >
                            <Heart className="w-2.5 h-2.5" />
                            <span>Popular</span>
                          </button>

                          <button
                            onClick={() => toggleMovieCategory(movie.id, 'latest')}
                            title={movie.latest ? 'Latest Release category (Click to remove)' : 'Click to make Latest'}
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 transition-all ${
                              movie.latest 
                                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' 
                                : 'bg-white/5 text-slate-500 hover:text-slate-300'
                            }`}
                          >
                            <Sparkles className="w-2.5 h-2.5" />
                            <span>Latest</span>
                          </button>
                        </div>
                      </td>

                      {/* Action buttons */}
                      <td className="p-3.5 text-right whitespace-nowrap space-x-1.5">
                        <button
                          onClick={() => setSelectedMovie(movie)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all"
                          title="Preview Movie Details & Streaming Links"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setStreamingMovie(movie)}
                          className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 transition-all"
                          title="Test Stream Playback"
                        >
                          <Play className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => openEditModal(movie)}
                          className="p-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 transition-all"
                          title="Edit Movie Metadata"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete "${movie.title}" from catalog?`)) {
                              deleteMovie(movie.id);
                            }
                          }}
                          className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-all"
                          title="Delete Movie"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredMovies.length === 0 && (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-slate-400 text-xs">
                        No movies match your filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MODERATION & REPORTS */}
      {adminTab === 'reports' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#11131c] border border-white/10">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Filter by status:</span>
              {(['All', 'Pending', 'Resolved', 'Dismissed'] as const).map(st => (
                <button
                  key={st}
                  onClick={() => setReportFilter(st)}
                  className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                    reportFilter === st 
                      ? 'bg-amber-500 text-black shadow' 
                      : 'bg-white/5 text-slate-300 hover:bg-white/10'
                  }`}
                >
                  {st} {st !== 'All' && `(${reports.filter(r => r.status === st).length})`}
                </button>
              ))}
            </div>

            <button
              onClick={() => setIsAddReportModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-white font-semibold text-xs flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-amber-400" />
              <span>Log Moderation Audit Ticket</span>
            </button>
          </div>

          <div className="space-y-3">
            {filteredReports.map(rep => (
              <div
                key={rep.id}
                className="p-4 sm:p-5 rounded-2xl bg-[#11131c] border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-white/20 transition-all"
              >
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      {rep.type}
                    </span>
                    <h4 className="font-bold text-white text-sm">{rep.movieTitle}</h4>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      rep.status === 'Resolved' ? 'bg-emerald-500/20 text-emerald-300' :
                      rep.status === 'Dismissed' ? 'bg-slate-500/20 text-slate-400' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {rep.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">{rep.description}</p>
                  <p className="text-[10px] text-slate-500 font-mono">Submitted: {rep.timestamp}</p>
                </div>

                {/* Status Switcher Buttons */}
                <div className="flex items-center gap-2 self-end md:self-center">
                  {rep.status !== 'Resolved' && (
                    <button
                      onClick={() => updateReportStatus(rep.id, 'Resolved')}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600/80 hover:bg-emerald-500 text-white font-bold text-xs transition-all"
                    >
                      Mark Resolved
                    </button>
                  )}
                  {rep.status !== 'Pending' && (
                    <button
                      onClick={() => updateReportStatus(rep.id, 'Pending')}
                      className="px-3 py-1.5 rounded-lg bg-amber-600/80 hover:bg-amber-500 text-black font-bold text-xs transition-all"
                    >
                      Reopen as Pending
                    </button>
                  )}
                  {rep.status !== 'Dismissed' && (
                    <button
                      onClick={() => updateReportStatus(rep.id, 'Dismissed')}
                      className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300 text-xs transition-all"
                    >
                      Dismiss
                    </button>
                  )}
                  <button
                    onClick={() => deleteReport(rep.id)}
                    className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 transition-all"
                    title="Delete Report"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}

            {filteredReports.length === 0 && (
              <div className="p-8 text-center rounded-2xl bg-[#11131c] border border-white/10 text-slate-400 text-xs">
                No moderation reports found under status "{reportFilter}".
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 4: USERS MANAGEMENT */}
      {adminTab === 'users' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#11131c] border border-white/10">
            <div>
              <p className="text-xs text-white font-bold">Registered Members & Administrator Governance</p>
              <p className="text-[11px] text-slate-400">Strict Single-Administrator Architecture: Only Daniel Das holds root privileges.</p>
            </div>
            <button
              onClick={() => setIsAddUserModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-bold text-xs flex items-center gap-1.5 shadow"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Add Member Profile</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {usersList.map(u => {
              const isAdmin = u.id === 'admin-daniel';
              return (
                <div 
                  key={u.id} 
                  className={`p-5 rounded-2xl bg-[#11131c] border transition-all ${
                    isAdmin ? 'border-amber-500/40 shadow-lg shadow-amber-500/5' : 'border-white/10'
                  } flex flex-col justify-between gap-4`}
                >
                  <div className="flex items-start gap-4">
                    <img 
                      src={u.avatar} 
                      alt={u.name} 
                      className={`w-14 h-14 rounded-2xl object-cover border ${
                        isAdmin ? 'border-amber-400 shadow-md' : 'border-white/10'
                      }`} 
                    />
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-white text-sm truncate">{u.name}</h4>
                        {isAdmin && (
                          <span className="px-2 py-0.2 rounded-full bg-amber-500/20 text-amber-300 font-extrabold text-[9px] uppercase border border-amber-500/30">
                            Permanent Admin
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 font-mono truncate">{u.email}</p>
                      <p className="text-[11px] text-slate-300 line-clamp-2 mt-1">{u.bio || 'Film lover and active community participant.'}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-white/5 text-xs">
                    <div className="text-slate-400 text-[11px]">
                      Quality: <span className="text-white font-mono">{u.streamingQualityPreference || '1080p'}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {isAdmin ? (
                        <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-bold border border-amber-500/40">
                          👑 Sole Platform Owner
                        </span>
                      ) : (
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete member "${u.name}"?`)) {
                              deleteUser(u.id);
                            }
                          }}
                          className="px-3 py-1 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 text-[11px] font-semibold"
                        >
                          Remove Member
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add / Edit Movie Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          <div className="relative w-full max-w-2xl bg-[#11131c] border border-white/15 rounded-3xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h2 className="text-lg font-bold text-white font-['Cinzel',serif]">
                {editingMovie ? `Edit Movie: ${editingMovie.title}` : 'Add New Movie to Legal Catalog'}
              </h2>
              <button onClick={() => setIsAddModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveMovie} className="space-y-3.5 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Movie Title *</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                  placeholder="e.g. Tears of Steel"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Tagline</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={e => setTagline(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Plot Synopsis *</label>
                <textarea
                  rows={3}
                  required
                  value={synopsis}
                  onChange={e => setSynopsis(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white resize-none"
                  placeholder="Enter detailed plot synopsis..."
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Release Year</label>
                  <input
                    type="number"
                    value={year}
                    onChange={e => setYear(parseInt(e.target.value) || 2024)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Runtime (mins)</label>
                  <input
                    type="number"
                    value={runtime}
                    onChange={e => setRuntime(parseInt(e.target.value) || 90)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">IMDb Rating</label>
                  <input
                    type="number"
                    step={0.1}
                    value={imdbScore}
                    onChange={e => setImdbScore(parseFloat(e.target.value) || 7.0)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Director *</label>
                  <input
                    type="text"
                    required
                    value={director}
                    onChange={e => setDirector(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                    placeholder="e.g. Ian Hubert"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Genres (comma separated)</label>
                  <input
                    type="text"
                    value={genres}
                    onChange={e => setGenres(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                    placeholder="Sci-Fi, Action, VFX"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">License Type</label>
                  <select
                    value={licenseType}
                    onChange={e => setLicenseType(e.target.value as LicenseType)}
                    className="w-full bg-[#161822] border border-white/15 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Public Domain">Public Domain</option>
                    <option value="Creative Commons">Creative Commons</option>
                    <option value="Open Movie Foundation">Open Movie Foundation</option>
                    <option value="Licensed Partner">Licensed Partner</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">License Badge</label>
                  <input
                    type="text"
                    value={licenseBadge}
                    onChange={e => setLicenseBadge(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                    placeholder="e.g. CC BY 3.0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Authorized Video Stream MP4 URL *</label>
                <input
                  type="url"
                  required
                  value={streamUrl}
                  onChange={e => setStreamUrl(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white font-mono text-[11px]"
                  placeholder="https://..."
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Poster Image URL</label>
                  <input
                    type="url"
                    value={posterUrl}
                    onChange={e => setPosterUrl(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white font-mono text-[11px]"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-semibold mb-1">Backdrop Image URL</label>
                  <input
                    type="url"
                    value={backdropUrl}
                    onChange={e => setBackdropUrl(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white font-mono text-[11px]"
                  />
                </div>
              </div>

              {/* Category Checkboxes */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-2">
                <p className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">Homepage Movie Categories</p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isFeatured}
                      onChange={e => setIsFeatured(e.target.checked)}
                      className="rounded text-amber-500 focus:ring-0"
                    />
                    <span className="text-white">Featured Hero</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isTrending}
                      onChange={e => setIsTrending(e.target.checked)}
                      className="rounded text-amber-500 focus:ring-0"
                    />
                    <span className="text-white">Trending</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isPopular}
                      onChange={e => setIsPopular(e.target.checked)}
                      className="rounded text-amber-500 focus:ring-0"
                    />
                    <span className="text-white">Popular</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={isLatest}
                      onChange={e => setIsLatest(e.target.checked)}
                      className="rounded text-amber-500 focus:ring-0"
                    />
                    <span className="text-white">Latest Releases</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 text-slate-300 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold shadow"
                >
                  {editingMovie ? 'Save Changes' : 'Publish Movie'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Log Moderation Audit Ticket Modal */}
      {isAddReportModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          <div className="relative w-full max-w-md bg-[#11131c] border border-white/15 rounded-3xl p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h2 className="text-base font-bold text-white font-['Cinzel',serif]">
                Log Moderation Audit Ticket
              </h2>
              <button onClick={() => setIsAddReportModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateReport} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Target Movie Title *</label>
                <input
                  type="text"
                  required
                  value={newReportMovie}
                  onChange={e => setNewReportMovie(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                  placeholder="e.g. Tears of Steel"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Category / Type</label>
                <select
                  value={newReportType}
                  onChange={e => setNewReportType(e.target.value as any)}
                  className="w-full bg-[#161822] border border-white/15 rounded-xl px-3 py-2 text-white"
                >
                  <option value="Broken Stream">Broken Stream</option>
                  <option value="Audio Sync">Audio Sync</option>
                  <option value="Metadata Error">Metadata Error</option>
                  <option value="Copyright Inquiry">Copyright Inquiry</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Technical Audit Note *</label>
                <textarea
                  rows={3}
                  required
                  value={newReportNote}
                  onChange={e => setNewReportNote(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white resize-none"
                  placeholder="Describe resolution notes, bitrate adjustments, or moderation review..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddReportModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-xl bg-white/5 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold"
                >
                  Log Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xl">
          <div className="relative w-full max-w-md bg-[#11131c] border border-white/15 rounded-3xl p-6 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <h2 className="text-base font-bold text-white font-['Cinzel',serif]">
                Register Community Member
              </h2>
              <button onClick={() => setIsAddUserModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={newUserName}
                  onChange={e => setNewUserName(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                  placeholder="e.g. Cinema Enthusiast"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Email Address *</label>
                <input
                  type="email"
                  required
                  value={newUserEmail}
                  onChange={e => setNewUserEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white"
                  placeholder="user@cineverse.io"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Streaming Preference</label>
                <select
                  value={newUserQuality}
                  onChange={e => setNewUserQuality(e.target.value as any)}
                  className="w-full bg-[#161822] border border-white/15 rounded-xl px-3 py-2 text-white"
                >
                  <option value="1080p">1080p Full HD</option>
                  <option value="4K">4K Ultra HD</option>
                  <option value="720p">720p HD</option>
                  <option value="Auto">Auto Adaptive</option>
                </select>
              </div>

              <p className="text-[11px] text-slate-400 italic">
                * Note: New accounts are assigned Member role. Daniel Das remains the permanent sole administrator.
              </p>

              <div className="flex justify-end gap-2 pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-3.5 py-1.5 rounded-xl bg-white/5 text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black font-extrabold"
                >
                  Register Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
