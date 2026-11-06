import React, { useRef, useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  Maximize, 
  Minimize, 
  RotateCcw, 
  RotateCw, 
  Subtitles, 
  Settings, 
  X, 
  ShieldCheck,
  Check,
  Download,
  Info
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Movie } from '../types/movie';

export const VideoPlayerModal: React.FC = () => {
  const { 
    streamingMovie, 
    setStreamingMovie, 
    updateWatchProgress, 
    getMovieProgress, 
    setDownloadModalMovie,
    showToast 
  } = useApp();

  if (!streamingMovie) return null;

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.9);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  
  // Settings dropdowns
  const [showSettings, setShowSettings] = useState(false);
  const [currentQuality, setCurrentQuality] = useState('1080p FHD');
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [selectedSubtitle, setSelectedSubtitle] = useState<string>('en');
  const [currentSubtitleText, setCurrentSubtitleText] = useState<string>('');

  // Resume prompt state
  const previousProgress = getMovieProgress(streamingMovie.id);
  const [showResumePrompt, setShowResumePrompt] = useState(previousProgress > 10);
  const [hasVideoError, setHasVideoError] = useState(false);

  // Auto-hide controls when mouse is still
  const handleMouseMove = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) clearTimeout(controlsTimeoutRef.current);
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) setShowControls(false);
    }, 3500);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!streamingMovie) return;
      if (e.key === 'Escape') {
        if (isFullscreen) {
          document.exitFullscreen?.();
        } else {
          handleClose();
        }
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      } else if (e.key === 'ArrowRight') {
        seekBy(10);
      } else if (e.key === 'ArrowLeft') {
        seekBy(-10);
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.key === 'm' || e.key === 'M') {
        toggleMute();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [streamingMovie, isPlaying, isFullscreen]);

  // Handle active subtitle rendering based on video currentTime
  useEffect(() => {
    if (selectedSubtitle === 'off' || !streamingMovie.subtitles) {
      setCurrentSubtitleText('');
      return;
    }
    const track = streamingMovie.subtitles.find(s => s.lang === selectedSubtitle);
    if (!track || !track.lines) {
      setCurrentSubtitleText('');
      return;
    }

    const activeLine = track.lines.find(
      l => currentTime >= l.start && currentTime <= l.end
    );
    setCurrentSubtitleText(activeLine ? activeLine.text : '');
  }, [currentTime, selectedSubtitle, streamingMovie]);

  // Time tracking & progress persistence
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    setCurrentTime(curr);
    if (videoRef.current.duration) {
      setDuration(videoRef.current.duration);
    }
    // Update progress periodically
    if (Math.floor(curr) % 3 === 0) {
      updateWatchProgress(streamingMovie.id, curr, videoRef.current.duration || 0);
    }
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const seekBy = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, Math.min(videoRef.current.duration || 0, videoRef.current.currentTime + seconds));
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const target = parseFloat(e.target.value);
    videoRef.current.currentTime = target;
    setCurrentTime(target);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    if (isMuted) {
      videoRef.current.muted = false;
      setIsMuted(false);
      if (volume === 0) {
        setVolume(0.7);
        videoRef.current.volume = 0.7;
      }
    } else {
      videoRef.current.muted = true;
      setIsMuted(true);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const val = parseFloat(e.target.value);
    setVolume(val);
    videoRef.current.volume = val;
    setIsMuted(val === 0);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  const handleSpeedChange = (speed: number) => {
    setPlaybackSpeed(speed);
    if (videoRef.current) videoRef.current.playbackRate = speed;
  };

  const handleClose = () => {
    if (videoRef.current) {
      updateWatchProgress(streamingMovie.id, videoRef.current.currentTime, videoRef.current.duration || 0);
    }
    setStreamingMovie(null);
  };

  const resumeAtPrevious = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = previousProgress;
      videoRef.current.play();
      setIsPlaying(true);
    }
    setShowResumePrompt(false);
    showToast(`Resumed playback at ${formatTime(previousProgress)}`, 'info');
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-2xl">
      <div 
        ref={containerRef}
        onMouseMove={handleMouseMove}
        className="relative w-full h-full max-w-7xl max-h-[92vh] mx-auto md:p-4 flex flex-col justify-center items-center select-none"
      >
        
        {/* Main Video Element */}
        <div className="relative w-full h-full bg-black rounded-none md:rounded-3xl overflow-hidden flex items-center justify-center shadow-2xl border border-white/10">
          <video
            ref={videoRef}
            src={streamingMovie.streamUrl}
            playsInline
            onTimeUpdate={handleTimeUpdate}
            onError={() => setHasVideoError(true)}
            onLoadedMetadata={() => {
              setHasVideoError(false);
              if (videoRef.current) {
                setDuration(videoRef.current.duration);
                videoRef.current.volume = volume;
                videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
              }
            }}
            onClick={togglePlay}
            className="w-full h-full object-contain cursor-pointer"
          />

          {/* Video Stream Load Error Fallback */}
          {hasVideoError && (
            <div className="absolute inset-0 z-35 flex flex-col items-center justify-center p-6 bg-black/90 text-center space-y-3">
              <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400">
                <Info className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Stream Connection Notice</h3>
              <p className="text-xs text-slate-300 max-w-md">
                The primary video mirror is connecting or requires permission. Switch to the high-speed W3C open master stream or download the verified MP4 directly.
              </p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                <button
                  onClick={() => {
                    setHasVideoError(false);
                    if (videoRef.current) {
                      videoRef.current.src = 'https://media.w3.org/2010/05/bunny/movie.mp4';
                      videoRef.current.load();
                      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
                    }
                    showToast('Switched to ultra-fast W3C master video stream', 'info');
                  }}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 text-black font-extrabold text-xs shadow-md hover:scale-105 active:scale-95 transition-all"
                >
                  ⚡ Play Fast Master Stream
                </button>
                <button
                  onClick={() => {
                    setHasVideoError(false);
                    if (videoRef.current) {
                      videoRef.current.load();
                      videoRef.current.play().catch(() => {});
                    }
                  }}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs transition-all"
                >
                  Retry Original
                </button>
                <button
                  onClick={() => setDownloadModalMovie(streamingMovie)}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium text-xs border border-white/20 flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Download MP4</span>
                </button>
              </div>
            </div>
          )}

          {/* Subtitle Rendering Overlay */}
          {currentSubtitleText && (
            <div className="absolute bottom-24 inset-x-8 text-center pointer-events-none z-30">
              <span className="inline-block px-4 py-2 rounded-xl bg-black/75 backdrop-blur-md text-amber-200 text-lg md:text-2xl font-bold tracking-wide drop-shadow-md border border-white/10">
                {currentSubtitleText}
              </span>
            </div>
          )}

          {/* Resume Watching Floating Banner */}
          {showResumePrompt && (
            <div className="absolute top-20 left-6 z-40 bg-black/85 backdrop-blur-xl border border-amber-500/50 p-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in fade-in slide-in-from-top-4">
              <div>
                <p className="text-white text-sm font-bold">Resume Watching?</p>
                <p className="text-slate-300 text-xs">You left off at {formatTime(previousProgress)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={resumeAtPrevious}
                  className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold transition-all shadow-md"
                >
                  Resume
                </button>
                <button
                  onClick={() => setShowResumePrompt(false)}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-all"
                >
                  Start Over
                </button>
              </div>
            </div>
          )}

          {/* Top Header Overlay */}
          <div className={`absolute top-0 inset-x-0 p-4 md:p-6 bg-gradient-to-b from-black/90 via-black/40 to-transparent flex items-center justify-between z-30 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="flex items-center gap-3">
              <button
                onClick={handleClose}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 transition-all hover:scale-105"
                title="Close Player"
              >
                <X className="w-5 h-5" />
              </button>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg md:text-xl font-bold text-white font-['Cinzel',serif]">{streamingMovie.title}</h2>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[10px] font-bold flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-emerald-400" />
                    {streamingMovie.licenseBadge}
                  </span>
                </div>
                <p className="text-xs text-slate-300">{streamingMovie.year} • Directed by {streamingMovie.director}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setDownloadModalMovie(streamingMovie)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 text-xs font-medium"
              >
                <Download className="w-3.5 h-3.5 text-cyan-400" />
                <span>Save Offline</span>
              </button>
            </div>
          </div>

          {/* Central Big Play/Pause Splash Icon when paused */}
          {!isPlaying && (
            <button
              onClick={togglePlay}
              className="absolute z-20 w-20 h-20 rounded-full bg-amber-500/90 text-black flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all"
            >
              <Play className="w-10 h-10 fill-black translate-x-1" />
            </button>
          )}

          {/* Bottom Player Controls Overlay */}
          <div className={`absolute bottom-0 inset-x-0 p-4 md:p-6 bg-gradient-to-t from-black/95 via-black/60 to-transparent z-30 transition-opacity duration-300 space-y-3 ${showControls ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            
            {/* Timeline Progress Slider */}
            <div className="group/timeline relative flex items-center">
              <input
                type="range"
                min={0}
                max={duration || 100}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-500 group-hover/timeline:h-2.5 transition-all"
              />
            </div>

            {/* Bottom Controls Bar */}
            <div className="flex items-center justify-between text-white text-xs sm:text-sm">
              
              {/* Left Controls */}
              <div className="flex items-center gap-3 sm:gap-4">
                
                {/* Play/Pause */}
                <button
                  onClick={togglePlay}
                  className="p-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-black transition-all hover:scale-105"
                  title={isPlaying ? "Pause (Space)" : "Play (Space)"}
                >
                  {isPlaying ? <Pause className="w-4 h-4 fill-black" /> : <Play className="w-4 h-4 fill-black" />}
                </button>

                {/* Skip Backward 10s */}
                <button
                  onClick={() => seekBy(-10)}
                  className="p-1.5 text-slate-300 hover:text-white transition-colors"
                  title="Rewind 10s (Left Arrow)"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Skip Forward 10s */}
                <button
                  onClick={() => seekBy(10)}
                  className="p-1.5 text-slate-300 hover:text-white transition-colors"
                  title="Forward 10s (Right Arrow)"
                >
                  <RotateCw className="w-4 h-4" />
                </button>

                {/* Volume Slider */}
                <div className="flex items-center gap-2 group/vol">
                  <button onClick={toggleMute} className="text-slate-300 hover:text-white">
                    {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.05}
                    value={isMuted ? 0 : volume}
                    onChange={handleVolumeChange}
                    className="w-16 h-1 bg-white/30 rounded accent-amber-400 cursor-pointer hidden sm:block"
                  />
                </div>

                {/* Time Display */}
                <div className="text-xs font-mono text-slate-300">
                  <span>{formatTime(currentTime)}</span>
                  <span className="text-slate-500 mx-1">/</span>
                  <span>{formatTime(duration)}</span>
                </div>

              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-3">
                
                {/* Subtitle Selector */}
                <div className="relative">
                  <button
                    onClick={() => setShowSettings(prev => !prev)}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-xs font-medium transition-all ${
                      selectedSubtitle !== 'off' 
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' 
                        : 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10'
                    }`}
                    title="Subtitles & Audio"
                  >
                    <Subtitles className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">CC: {selectedSubtitle.toUpperCase()}</span>
                  </button>
                </div>

                {/* Settings Menu Button */}
                <button
                  onClick={() => setShowSettings(prev => !prev)}
                  className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  title="Playback Settings"
                >
                  <Settings className="w-4 h-4" />
                </button>

                {/* Fullscreen */}
                <button
                  onClick={toggleFullscreen}
                  className="p-1.5 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                  title="Fullscreen (F)"
                >
                  {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                </button>

              </div>

            </div>

          </div>

          {/* Settings Overlay Drawer */}
          {showSettings && (
            <div className="absolute right-6 bottom-20 z-40 w-72 rounded-2xl bg-[#11131c] border border-white/20 p-4 shadow-2xl backdrop-blur-2xl text-xs space-y-4 animate-in fade-in zoom-in-95">
              
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="font-bold text-white text-sm">Playback Settings</span>
                <button onClick={() => setShowSettings(false)} className="text-slate-400 hover:text-white">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Speed Selection */}
              <div>
                <p className="text-slate-400 font-semibold mb-1.5">Playback Speed</p>
                <div className="grid grid-cols-4 gap-1">
                  {[0.75, 1, 1.25, 1.5].map(speed => (
                    <button
                      key={speed}
                      onClick={() => handleSpeedChange(speed)}
                      className={`py-1 rounded font-medium ${playbackSpeed === speed ? 'bg-amber-500 text-black font-bold' : 'bg-white/5 text-slate-300 hover:bg-white/10'}`}
                    >
                      {speed}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Quality Selection */}
              <div>
                <p className="text-slate-400 font-semibold mb-1.5">Stream Quality</p>
                <div className="space-y-1">
                  {['4K UHD (Master)', '1080p FHD (Active)', '720p HD (Data Saver)'].map(q => (
                    <button
                      key={q}
                      onClick={() => {
                        setCurrentQuality(q);
                        showToast(`Switched stream quality to ${q}`, 'info');
                      }}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between bg-white/5 hover:bg-white/10 text-slate-300"
                    >
                      <span>{q}</span>
                      {currentQuality === q && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subtitles Selection */}
              <div>
                <p className="text-slate-400 font-semibold mb-1.5">Closed Captions / Subtitles</p>
                <div className="space-y-1">
                  <button
                    onClick={() => setSelectedSubtitle('off')}
                    className="w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between bg-white/5 hover:bg-white/10 text-slate-300"
                  >
                    <span>Off</span>
                    {selectedSubtitle === 'off' && <Check className="w-3.5 h-3.5 text-amber-400" />}
                  </button>
                  {streamingMovie.subtitles?.map(sub => (
                    <button
                      key={sub.lang}
                      onClick={() => setSelectedSubtitle(sub.lang)}
                      className="w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between bg-white/5 hover:bg-white/10 text-slate-300"
                    >
                      <span>{sub.label}</span>
                      {selectedSubtitle === sub.lang && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};
