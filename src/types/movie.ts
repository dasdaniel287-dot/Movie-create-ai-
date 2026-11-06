export type LicenseType = 
  | 'Public Domain' 
  | 'Creative Commons' 
  | 'Open Movie Foundation' 
  | 'Licensed Partner';

export interface CastMember {
  name: string;
  character: string;
  avatar?: string;
}

export interface StreamingProvider {
  name: string;
  url: string;
  free: boolean;
  type: 'Direct Stream' | 'Public Archive' | 'Partner Platform';
}

export interface DownloadOption {
  id: string;
  label: string;
  resolution: string;
  codec: string;
  bitrate: string;
  audio: string;
  fileSize: string;
  fileSizeBytes: number;
  url: string;
  format: 'MP4' | 'MKV' | 'WEBM' | 'TORRENT';
  isTorrent?: boolean;
}

export interface SubtitleTrack {
  lang: string;
  label: string;
  src?: string;
  lines?: { start: number; end: number; text: string }[];
}

export interface Movie {
  id: string;
  title: string;
  tagline: string;
  synopsis: string;
  year: number;
  runtime: number; // in minutes
  rating: string; // e.g. "PG-13", "G", "R", "NR"
  imdbScore: number;
  communityScore: number;
  genres: string[];
  language: string;
  director: string;
  cast: CastMember[];
  posterUrl: string;
  backdropUrl: string;
  trailerUrl: string;
  streamUrl: string;
  licenseType: LicenseType;
  licenseBadge: string;
  licenseDetails: string;
  officialStreamingProviders: StreamingProvider[];
  downloadOptions: DownloadOption[];
  subtitles: SubtitleTrack[];
  featured?: boolean;
  trending?: boolean;
  popular?: boolean;
  latest?: boolean;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'user';
  bio?: string;
  preferredGenres: string[];
  streamingQualityPreference: 'Auto' | '1080p' | '4K' | '720p';
}

export interface WatchHistoryItem {
  movieId: string;
  progress: number; // in seconds
  duration: number; // in seconds
  lastWatched: string;
  completed: boolean;
}

export interface DownloadItem {
  id: string;
  movieId: string;
  movieTitle: string;
  posterUrl: string;
  quality: string;
  fileSize: string;
  progress: number; // 0 - 100
  status: 'downloading' | 'completed' | 'paused' | 'failed';
  speed: string;
  timestamp: string;
  localBlobUrl?: string;
}

export interface FilterState {
  query: string;
  genres: string[];
  actor: string;
  director: string;
  minRating: number;
  yearRange: [number, number];
  language: string;
  licenseType: string;
  sortBy: 'popularity' | 'newest' | 'oldest' | 'rating' | 'runtime' | 'title';
}

export interface ReportItem {
  id: string;
  movieId: string;
  movieTitle: string;
  type: 'Broken Stream' | 'Audio Sync' | 'Metadata Error' | 'Copyright Inquiry';
  description: string;
  status: 'Pending' | 'Resolved' | 'Dismissed';
  timestamp: string;
}

export interface AiRecommendationResult {
  title: string;
  matchScore: number;
  reason: string;
  moodFit: string;
  keyThemes: string[];
  movie?: Movie;
}
