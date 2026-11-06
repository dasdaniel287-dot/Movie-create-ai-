import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Movie, 
  User, 
  WatchHistoryItem, 
  DownloadItem, 
  FilterState, 
  ReportItem 
} from '../types/movie';
import { INITIAL_MOVIES, INITIAL_REPORTS } from '../data/moviesData';

export type ActiveTab = 'home' | 'browse' | 'downloads' | 'profile' | 'admin';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface AppContextType {
  // Theme
  isDark: boolean;
  toggleTheme: () => void;

  // Navigation
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;

  // Catalog Management
  movies: Movie[];
  addMovie: (movie: Omit<Movie, 'id'>) => void;
  updateMovie: (id: string, movie: Partial<Movie>) => void;
  deleteMovie: (id: string) => void;
  resetCatalog: () => void;
  toggleMovieCategory: (id: string, category: 'featured' | 'trending' | 'popular' | 'latest') => void;

  // User & Auth
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  usersList: User[];
  loginAs: (userRole: 'user' | 'admin') => void;
  updateUserProfile: (profile: Partial<User>) => void;
  addUser: (userData: { name: string; email: string; preferredGenres?: string[]; streamingQualityPreference?: 'Auto' | '1080p' | '4K' | '720p' }) => void;
  deleteUser: (id: string) => void;

  // User Lists
  watchlist: string[];
  toggleWatchlist: (movieId: string) => void;
  isInWatchlist: (movieId: string) => boolean;

  favorites: string[];
  toggleFavorite: (movieId: string) => void;
  isFavorite: (movieId: string) => boolean;

  // Watch History & Resume
  watchHistory: WatchHistoryItem[];
  updateWatchProgress: (movieId: string, progress: number, duration: number) => void;
  getMovieProgress: (movieId: string) => number;
  clearWatchHistory: () => void;

  // Downloads
  activeDownloads: DownloadItem[];
  downloadHistory: DownloadItem[];
  startDownload: (movie: Movie, optionId: string) => void;
  cancelDownload: (downloadId: string) => void;
  pauseResumeDownload: (downloadId: string) => void;
  clearDownloadHistory: () => void;

  // Filter & Search
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
  resetFilters: () => void;

  // Modals
  selectedMovie: Movie | null;
  setSelectedMovie: (movie: Movie | null) => void;
  streamingMovie: Movie | null;
  setStreamingMovie: (movie: Movie | null) => void;
  downloadModalMovie: Movie | null;
  setDownloadModalMovie: (movie: Movie | null) => void;
  isAiSearchOpen: boolean;
  setIsAiSearchOpen: (open: boolean) => void;
  isLegalNoticeOpen: boolean;
  setIsLegalNoticeOpen: (open: boolean) => void;

  // Reports (Admin & Moderation)
  reports: ReportItem[];
  submitReport: (report: Omit<ReportItem, 'id' | 'status' | 'timestamp'>) => void;
  updateReportStatus: (id: string, status: 'Pending' | 'Resolved' | 'Dismissed') => void;
  deleteReport: (id: string) => void;

  // Toasts
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

const DEFAULT_FILTERS: FilterState = {
  query: '',
  genres: [],
  actor: '',
  director: '',
  minRating: 0,
  yearRange: [1920, 2026],
  language: 'All',
  licenseType: 'All',
  sortBy: 'popularity'
};

const INITIAL_USERS: User[] = [
  {
    id: 'admin-daniel',
    name: 'Daniel Das',
    email: 'dasdaniel287@gmail.com',
    avatar: '/assets/aistudio/abc3e8cc-34ef-4791-b779-484b4e70b381_a03036d9.jpg',
    role: 'admin',
    bio: 'Founder & Sole Administrator of CineVerse AI. Dedicated to cinema preservation, legal streaming, and open-source film curation.',
    preferredGenres: ['Sci-Fi', 'Classic Cinema', 'Action', 'Animation'],
    streamingQualityPreference: '4K'
  },
  {
    id: 'usr-member',
    name: 'Cinema Guest Member',
    email: 'guest@cineverse.io',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    role: 'user',
    bio: 'Film enthusiast and cinephile exploring open-access motion pictures.',
    preferredGenres: ['Sci-Fi', 'Classic Cinema', 'Film Noir'],
    streamingQualityPreference: '1080p'
  }
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('cineverse_theme');
    return saved ? saved === 'dark' : true;
  });

  const toggleTheme = () => {
    setIsDark(prev => {
      const next = !prev;
      localStorage.setItem('cineverse_theme', next ? 'dark' : 'light');
      return next;
    });
  };

  // Tab Navigation
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');

  // Movies Catalog
  const [movies, setMovies] = useState<Movie[]>(() => {
    const saved = localStorage.getItem('cineverse_movies_v2');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && !saved.includes('commondatastorage.googleapis.com')) {
          return parsed;
        }
      } catch (e) {
        return INITIAL_MOVIES;
      }
    }
    // Purge outdated cache with broken google storage URLs
    try {
      localStorage.removeItem('cineverse_movies');
      localStorage.setItem('cineverse_movies_v2', JSON.stringify(INITIAL_MOVIES));
    } catch (e) {}
    return INITIAL_MOVIES;
  });

  useEffect(() => {
    localStorage.setItem('cineverse_movies_v2', JSON.stringify(movies));
  }, [movies]);

  const addMovie = (newMovieData: Omit<Movie, 'id'>) => {
    const newMovie: Movie = {
      ...newMovieData,
      id: `movie-${Date.now()}`
    };
    setMovies(prev => [newMovie, ...prev]);
    showToast(`Added "${newMovie.title}" to catalog!`, 'success');
  };

  const updateMovie = (id: string, movieData: Partial<Movie>) => {
    setMovies(prev => prev.map(m => m.id === id ? { ...m, ...movieData } : m));
    showToast('Movie metadata updated successfully.', 'success');
  };

  const deleteMovie = (id: string) => {
    setMovies(prev => prev.filter(m => m.id !== id));
    if (selectedMovie?.id === id) setSelectedMovie(null);
    if (streamingMovie?.id === id) setStreamingMovie(null);
    showToast('Movie removed from catalog.', 'info');
  };

  const resetCatalog = () => {
    setMovies(INITIAL_MOVIES);
    localStorage.setItem('cineverse_movies_v2', JSON.stringify(INITIAL_MOVIES));
    showToast('Catalog restored to verified legal collection.', 'success');
  };

  const toggleMovieCategory = (id: string, category: 'featured' | 'trending' | 'popular' | 'latest') => {
    setMovies(prev => prev.map(m => {
      if (m.id === id) {
        const nextVal = !m[category];
        return { ...m, [category]: nextVal };
      }
      return m;
    }));
    showToast(`Category updated for movie.`, 'info');
  };

  // User & Auth
  const [usersList, setUsersList] = useState<User[]>(() => {
    const saved = localStorage.getItem('cineverse_users');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Always ensure Daniel Das is the root admin
          const hasDaniel = parsed.some(u => u.id === 'admin-daniel' && u.role === 'admin');
          if (hasDaniel) return parsed;
        }
      } catch (e) {}
    }
    return INITIAL_USERS;
  });

  useEffect(() => {
    localStorage.setItem('cineverse_users', JSON.stringify(usersList));
  }, [usersList]);

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    return INITIAL_USERS[0]; // Daniel Das by default
  });

  const loginAs = (role: 'user' | 'admin') => {
    if (role === 'admin') {
      const adminUser = usersList.find(u => u.id === 'admin-daniel') || INITIAL_USERS[0];
      setCurrentUser(adminUser);
      showToast(`Active Session: ${adminUser.name} (Sole Administrator)`, 'info');
    } else {
      const member = usersList.find(u => u.role === 'user') || INITIAL_USERS[1];
      setCurrentUser(member);
      showToast(`Switched to preview mode as ${member.name}`, 'info');
    }
  };

  const updateUserProfile = (profile: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...profile };
    setCurrentUser(updated);
    setUsersList(prev => prev.map(u => u.id === currentUser.id ? updated : u));
    showToast('Profile updated!', 'success');
  };

  const addUser = (userData: { name: string; email: string; preferredGenres?: string[]; streamingQualityPreference?: 'Auto' | '1080p' | '4K' | '720p' }) => {
    const newUser: User = {
      id: `usr-${Date.now()}`,
      name: userData.name,
      email: userData.email,
      avatar: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
      role: 'user', // Enforce only user role for other users
      bio: 'CineVerse community film enthusiast.',
      preferredGenres: userData.preferredGenres || ['Sci-Fi', 'Classic Cinema'],
      streamingQualityPreference: userData.streamingQualityPreference || '1080p'
    };
    setUsersList(prev => [...prev, newUser]);
    showToast(`Added user ${newUser.name}`, 'success');
  };

  const deleteUser = (id: string) => {
    if (id === 'admin-daniel') {
      showToast('Cannot delete Daniel Das (Sole Platform Administrator).', 'error');
      return;
    }
    setUsersList(prev => prev.filter(u => u.id !== id));
    if (currentUser?.id === id) {
      setCurrentUser(INITIAL_USERS[0]);
    }
    showToast('User account removed.', 'info');
  };

  // Watchlist
  const [watchlist, setWatchlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('cineverse_watchlist');
    return saved ? JSON.parse(saved) : ['tears-of-steel', 'metropolis-1927'];
  });

  useEffect(() => {
    localStorage.setItem('cineverse_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  const toggleWatchlist = (movieId: string) => {
    setWatchlist(prev => {
      const exists = prev.includes(movieId);
      const next = exists ? prev.filter(id => id !== movieId) : [...prev, movieId];
      showToast(exists ? 'Removed from Watchlist' : 'Added to Watchlist', 'info');
      return next;
    });
  };

  const isInWatchlist = (movieId: string) => watchlist.includes(movieId);

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem('cineverse_favorites');
    return saved ? JSON.parse(saved) : ['charade-1963', 'cosmos-laundromat'];
  });

  useEffect(() => {
    localStorage.setItem('cineverse_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (movieId: string) => {
    setFavorites(prev => {
      const exists = prev.includes(movieId);
      const next = exists ? prev.filter(id => id !== movieId) : [...prev, movieId];
      showToast(exists ? 'Removed from Favorites' : 'Added to Favorites ❤️', 'info');
      return next;
    });
  };

  const isFavorite = (movieId: string) => favorites.includes(movieId);

  // Watch History & Resume
  const [watchHistory, setWatchHistory] = useState<WatchHistoryItem[]>(() => {
    const saved = localStorage.getItem('cineverse_watch_history');
    return saved ? JSON.parse(saved) : [
      { movieId: 'tears-of-steel', progress: 180, duration: 720, lastWatched: '2026-11-05', completed: false }
    ];
  });

  useEffect(() => {
    localStorage.setItem('cineverse_watch_history', JSON.stringify(watchHistory));
  }, [watchHistory]);

  const updateWatchProgress = (movieId: string, progress: number, duration: number) => {
    setWatchHistory(prev => {
      const filtered = prev.filter(item => item.movieId !== movieId);
      const completed = duration > 0 && progress >= duration * 0.92;
      return [
        {
          movieId,
          progress: Math.floor(progress),
          duration: Math.floor(duration),
          lastWatched: new Date().toISOString(),
          completed
        },
        ...filtered
      ];
    });
  };

  const getMovieProgress = (movieId: string): number => {
    const item = watchHistory.find(h => h.movieId === movieId);
    return item ? item.progress : 0;
  };

  const clearWatchHistory = () => {
    setWatchHistory([]);
    showToast('Watch history cleared', 'info');
  };

  // Downloads Manager
  const [activeDownloads, setActiveDownloads] = useState<DownloadItem[]>([]);
  const [downloadHistory, setDownloadHistory] = useState<DownloadItem[]>(() => {
    const saved = localStorage.getItem('cineverse_download_history');
    return saved ? JSON.parse(saved) : [
      {
        id: 'dl-seed-1',
        movieId: 'tears-of-steel',
        movieTitle: 'Tears of Steel',
        posterUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=600&auto=format&fit=crop&q=80',
        quality: '1080p Full HD MP4',
        fileSize: '740 MB',
        progress: 100,
        status: 'completed',
        speed: '0 MB/s',
        timestamp: '2026-11-04 16:30'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('cineverse_download_history', JSON.stringify(downloadHistory));
  }, [downloadHistory]);

  // Simulated download progress ticker
  useEffect(() => {
    if (activeDownloads.length === 0) return;

    const interval = setInterval(() => {
      setActiveDownloads(prev => {
        let hasCompleted = false;
        const next = prev.map(dl => {
          if (dl.status !== 'downloading') return dl;
          const increment = Math.floor(Math.random() * 8) + 5;
          const newProgress = Math.min(100, dl.progress + increment);
          const currentSpeed = `${(Math.random() * 8 + 12).toFixed(1)} MB/s`;

          if (newProgress >= 100) {
            hasCompleted = true;
            const completedItem: DownloadItem = {
              ...dl,
              progress: 100,
              status: 'completed',
              speed: 'Done'
            };
            setDownloadHistory(h => [completedItem, ...h.filter(x => x.id !== dl.id)]);
            showToast(`Download finished: ${dl.movieTitle} (${dl.quality})`, 'success');
            return null;
          }

          return {
            ...dl,
            progress: newProgress,
            speed: currentSpeed
          };
        }).filter(Boolean) as DownloadItem[];

        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [activeDownloads.length]);

  const startDownload = (movie: Movie, optionId: string) => {
    const opt = movie.downloadOptions.find(o => o.id === optionId) || movie.downloadOptions[0];
    const newDl: DownloadItem = {
      id: `dl-${Date.now()}`,
      movieId: movie.id,
      movieTitle: movie.title,
      posterUrl: movie.posterUrl,
      quality: opt.label,
      fileSize: opt.fileSize,
      progress: 0,
      status: 'downloading',
      speed: '14.2 MB/s',
      timestamp: new Date().toLocaleString()
    };

    setActiveDownloads(prev => [newDl, ...prev]);
    showToast(`Authorized download started: ${movie.title}`, 'info');

    // Trigger genuine browser download for open video source
    if (opt.url && !opt.isTorrent) {
      try {
        const a = document.createElement('a');
        a.href = opt.url;
        a.download = `${movie.title.replace(/\s+/g, '_')}_${opt.resolution}.${opt.format.toLowerCase()}`;
        a.target = '_blank';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } catch (e) {
        console.warn('Browser download trigger notice:', e);
      }
    }
  };

  const cancelDownload = (downloadId: string) => {
    setActiveDownloads(prev => prev.filter(dl => dl.id !== downloadId));
    showToast('Download cancelled', 'warning');
  };

  const pauseResumeDownload = (downloadId: string) => {
    setActiveDownloads(prev => prev.map(dl => {
      if (dl.id === downloadId) {
        const newStatus = dl.status === 'downloading' ? 'paused' : 'downloading';
        return { ...dl, status: newStatus, speed: newStatus === 'paused' ? 'Paused' : '15.0 MB/s' };
      }
      return dl;
    }));
  };

  const clearDownloadHistory = () => {
    setDownloadHistory([]);
    showToast('Download history cleared', 'info');
  };

  // Filters
  const [filters, setFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const resetFilters = () => setFilters(DEFAULT_FILTERS);

  // Modals
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [streamingMovie, setStreamingMovie] = useState<Movie | null>(null);
  const [downloadModalMovie, setDownloadModalMovie] = useState<Movie | null>(null);
  const [isAiSearchOpen, setIsAiSearchOpen] = useState<boolean>(false);
  const [isLegalNoticeOpen, setIsLegalNoticeOpen] = useState<boolean>(false);

  // Reports
  const [reports, setReports] = useState<ReportItem[]>(() => {
    const saved = localStorage.getItem('cineverse_reports');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {}
    }
    return INITIAL_REPORTS;
  });

  useEffect(() => {
    localStorage.setItem('cineverse_reports', JSON.stringify(reports));
  }, [reports]);

  const submitReport = (reportData: Omit<ReportItem, 'id' | 'status' | 'timestamp'>) => {
    const newReport: ReportItem = {
      ...reportData,
      id: `rep-${Date.now()}`,
      status: 'Pending',
      timestamp: new Date().toLocaleString()
    };
    setReports(prev => [newReport, ...prev]);
    showToast('Report received. Content moderation team will review promptly.', 'info');
  };

  const updateReportStatus = (id: string, status: 'Pending' | 'Resolved' | 'Dismissed') => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status } : r));
    showToast(`Report status updated to ${status}.`, 'info');
  };

  const deleteReport = (id: string) => {
    setReports(prev => prev.filter(r => r.id !== id));
    showToast('Moderation report deleted.', 'info');
  };

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'info') => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  return (
    <AppContext.Provider
      value={{
        isDark,
        toggleTheme,
        activeTab,
        setActiveTab,
        movies,
        addMovie,
        updateMovie,
        deleteMovie,
        resetCatalog,
        toggleMovieCategory,
        currentUser,
        setCurrentUser,
        usersList,
        loginAs,
        updateUserProfile,
        addUser,
        deleteUser,
        watchlist,
        toggleWatchlist,
        isInWatchlist,
        favorites,
        toggleFavorite,
        isFavorite,
        watchHistory,
        updateWatchProgress,
        getMovieProgress,
        clearWatchHistory,
        activeDownloads,
        downloadHistory,
        startDownload,
        cancelDownload,
        pauseResumeDownload,
        clearDownloadHistory,
        filters,
        setFilters,
        resetFilters,
        selectedMovie,
        setSelectedMovie,
        streamingMovie,
        setStreamingMovie,
        downloadModalMovie,
        setDownloadModalMovie,
        isAiSearchOpen,
        setIsAiSearchOpen,
        isLegalNoticeOpen,
        setIsLegalNoticeOpen,
        reports,
        submitReport,
        updateReportStatus,
        deleteReport,
        toasts,
        showToast
      }}
    >
      <div className={isDark ? 'dark bg-[#0a0b0f] text-slate-100 min-h-screen' : 'bg-slate-50 text-slate-900 min-h-screen'}>
        {children}
      </div>
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
