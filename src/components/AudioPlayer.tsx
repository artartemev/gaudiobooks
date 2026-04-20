"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Bookmark,
  Moon,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import type { Book } from "@/lib/data";
import { bookTracks } from "@/lib/data";

interface AudioPlayerProps {
  book: Book;
  onClose: () => void;
}

const SPEEDS = [0.75, 1, 1.25, 1.5, 2] as const;
type Speed = (typeof SPEEDS)[number];

function formatTime(sec: number): string {
  if (!isFinite(sec) || sec < 0) return "0:00";
  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = Math.floor(sec % 60);
  return h > 0
    ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
    : `${m}:${String(s).padStart(2, "0")}`;
}

export function AudioPlayer({ book, onClose }: AudioPlayerProps) {
  const tracks = bookTracks[book.slug] ?? [];

  const [trackIdx, setTrackIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speed, setSpeed] = useState<Speed>(1);
  const [volume, setVolume] = useState(80);
  const [muted, setMuted] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [sleepTimer, setSleepTimer] = useState<number | null>(null);
  const [isSeeking, setIsSeeking] = useState(false);

  const audioRef = useRef<HTMLAudioElement>(null);
  const sleepRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const track = tracks[trackIdx];

  // ── Load new track ────────────────────────────────────────────────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track) return;
    const wasPlaying = isPlaying;
    audio.src = track.file;
    audio.load();
    if (wasPlaying) audio.play().catch(() => setIsPlaying(false));
    setCurrentTime(0);
    setDuration(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trackIdx, book.slug]);

  // ── Sync volume & speed ───────────────────────────────────────────────────
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = muted ? 0 : volume / 100;
  }, [volume, muted]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.playbackRate = speed;
  }, [speed]);

  // ── Sleep timer ───────────────────────────────────────────────────────────
  useEffect(() => {
    if (sleepRef.current) clearTimeout(sleepRef.current);
    if (sleepTimer !== null) {
      sleepRef.current = setTimeout(() => {
        audioRef.current?.pause();
        setIsPlaying(false);
        setSleepTimer(null);
      }, sleepTimer * 60 * 1000);
    }
    return () => { if (sleepRef.current) clearTimeout(sleepRef.current); };
  }, [sleepTimer]);

  // ── Audio event handlers ──────────────────────────────────────────────────
  const onLoadedMetadata = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setDuration(audio.duration);
    audio.volume = muted ? 0 : volume / 100;
    audio.playbackRate = speed;
  };

  const onTimeUpdate = () => {
    if (!isSeeking && audioRef.current)
      setCurrentTime(audioRef.current.currentTime);
  };

  const onEnded = () => {
    if (trackIdx < tracks.length - 1) {
      setTrackIdx((i) => i + 1);
    } else {
      setIsPlaying(false);
    }
  };

  // ── Controls ──────────────────────────────────────────────────────────────
  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    }
  }, [isPlaying]);

  const seek = (val: number) => {
    setCurrentTime(val);
    if (audioRef.current) audioRef.current.currentTime = val;
  };

  const skip = (delta: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    const next = Math.max(0, Math.min(duration, audio.currentTime + delta));
    audio.currentTime = next;
    setCurrentTime(next);
  };

  const prevTrack = () => {
    if (currentTime > 3) {
      seek(0);
    } else if (trackIdx > 0) {
      setTrackIdx((i) => i - 1);
    }
  };

  const nextTrack = () => {
    if (trackIdx < tracks.length - 1) setTrackIdx((i) => i + 1);
  };

  const cycleSpeed = () => {
    const idx = SPEEDS.indexOf(speed);
    setSpeed(SPEEDS[(idx + 1) % SPEEDS.length]);
  };

  const toggleSleepTimer = () => {
    setSleepTimer((prev) => {
      if (prev === null) return 15;
      if (prev === 15) return 30;
      if (prev === 30) return 60;
      return null;
    });
  };

  const progress = duration > 0 ? currentTime : 0;

  return (
    <>
      {/* Hidden real audio element */}
      <audio
        ref={audioRef}
        onLoadedMetadata={onLoadedMetadata}
        onTimeUpdate={onTimeUpdate}
        onEnded={onEnded}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        preload="metadata"
      />

      <div
        className="fixed bottom-0 left-0 right-0 z-50 border-t backdrop-blur-xl shadow-[0_-8px_40px_rgba(0,0,0,0.5)]"
        style={{ background: "#0E0E12", borderColor: "rgba(201,166,107,0.15)" }}
      >
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Progress bar */}
          <div className="mb-3">
            <Slider
              value={[progress]}
              onValueChange={([val]) => { setIsSeeking(true); setCurrentTime(val); }}
              onValueCommit={([val]) => { setIsSeeking(false); seek(val); }}
              max={duration || 100}
              step={1}
              className="h-1 cursor-pointer"
            />
            <div className="flex justify-between text-[#F0E2C8]/30 text-xs mt-1">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            {/* Book info */}
            <div className="flex-1 min-w-0 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#815854]/10 border border-[#815854]/20 flex-shrink-0 overflow-hidden">
                {book.cover ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-[#815854]/20" />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-[#F0E2C8] text-sm font-medium truncate">{book.title}</p>
                <p className="text-[#F0E2C8]/40 text-xs truncate">
                  {track ? `${track.trackNumber ? track.trackNumber + ". " : ""}${track.title}` : book.author}
                </p>
              </div>
            </div>

            {/* Playback controls */}
            <div className="flex items-center gap-1">
              {/* Prev track */}
              <button
                className="p-2 text-[#F0E2C8]/50 hover:text-[#F0E2C8] transition-colors"
                onClick={prevTrack}
                disabled={trackIdx === 0 && currentTime <= 3}
                aria-label="Предыдущая глава"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Rewind 30s */}
              <button
                className="p-2 text-[#F0E2C8]/50 hover:text-[#F0E2C8] transition-colors"
                onClick={() => skip(-30)}
                aria-label="Назад 30 секунд"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              {/* Play/Pause */}
              <button
                onClick={togglePlay}
                className="w-11 h-11 rounded-full bg-[#815854] flex items-center justify-center hover:bg-[#9A6B62] transition-all duration-200 shadow-md mx-1"
                aria-label={isPlaying ? "Пауза" : "Воспроизвести"}
              >
                {isPlaying ? (
                  <Pause className="w-5 h-5 text-[#F0E2C8]" fill="currentColor" />
                ) : (
                  <Play className="w-5 h-5 text-[#F0E2C8] ml-0.5" fill="currentColor" />
                )}
              </button>

              {/* Forward 30s */}
              <button
                className="p-2 text-[#F0E2C8]/50 hover:text-[#F0E2C8] transition-colors"
                onClick={() => skip(30)}
                aria-label="Вперёд 30 секунд"
              >
                <SkipForward className="w-5 h-5" />
              </button>

              {/* Next track */}
              <button
                className="p-2 text-[#F0E2C8]/50 hover:text-[#F0E2C8] transition-colors"
                onClick={nextTrack}
                disabled={trackIdx >= tracks.length - 1}
                aria-label="Следующая глава"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Extra controls */}
            <div className="hidden sm:flex items-center gap-2">
              {/* Speed */}
              <button
                onClick={cycleSpeed}
                className={cn(
                  "px-2.5 py-1 rounded-lg text-xs font-bold border transition-all duration-200 min-w-[42px]",
                  speed !== 1
                    ? "border-[#815854]/60 text-[#815854] bg-[#815854]/10"
                    : "border-white/10 text-[#F0E2C8]/50 hover:text-[#F0E2C8]"
                )}
                aria-label="Скорость воспроизведения"
              >
                {speed}x
              </button>

              {/* Sleep timer */}
              <button
                onClick={toggleSleepTimer}
                className={cn(
                  "p-2 rounded-lg transition-all duration-200 flex flex-col items-center",
                  sleepTimer !== null
                    ? "text-[#815854] bg-[#815854]/10"
                    : "text-[#F0E2C8]/50 hover:text-[#F0E2C8]"
                )}
                aria-label="Таймер сна"
                title={sleepTimer ? `Стоп через ${sleepTimer} мин` : "Таймер сна"}
              >
                <Moon className="w-4 h-4" />
                {sleepTimer && (
                  <span className="text-[8px] font-bold leading-none">{sleepTimer}м</span>
                )}
              </button>

              {/* Bookmark */}
              <button
                onClick={() => setBookmarked((b) => !b)}
                className={cn(
                  "p-2 rounded-lg transition-all duration-200",
                  bookmarked
                    ? "text-[#815854] bg-[#815854]/10"
                    : "text-[#F0E2C8]/50 hover:text-[#F0E2C8]"
                )}
                aria-label="Закладка"
              >
                <Bookmark className="w-4 h-4" fill={bookmarked ? "currentColor" : "none"} />
              </button>

              {/* Volume */}
              <div className="hidden md:flex items-center gap-2 w-28">
                <button
                  onClick={() => setMuted((m) => !m)}
                  className="text-[#F0E2C8]/40 hover:text-[#F0E2C8] transition-colors flex-shrink-0"
                >
                  {muted || volume === 0 ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
                <Slider
                  value={[muted ? 0 : volume]}
                  onValueChange={([v]) => { setVolume(v); setMuted(false); }}
                  max={100}
                  step={1}
                  className="flex-1"
                />
              </div>
            </div>

            {/* Track counter */}
            {tracks.length > 1 && (
              <span className="hidden lg:block text-[#F0E2C8]/25 text-xs flex-shrink-0">
                {trackIdx + 1}/{tracks.length}
              </span>
            )}

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 text-[#F0E2C8]/30 hover:text-[#F0E2C8] transition-colors"
              aria-label="Закрыть плеер"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
