"use client";

import { useState, useRef, useCallback } from "react";
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  Bookmark,
  Moon,
  X,
} from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import type { Book } from "@/lib/data";

interface AudioPlayerProps {
  book: Book;
  onClose: () => void;
}

const SPEEDS = [1, 1.25, 1.5, 2] as const;
type Speed = typeof SPEEDS[number];

export function AudioPlayer({ book, onClose }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState<Speed>(1);
  const [volume, setVolume] = useState([80]);
  const [bookmarked, setBookmarked] = useState(false);
  const [sleepTimer, setSleepTimer] = useState<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const togglePlay = useCallback(() => {
    setIsPlaying((prev) => {
      if (!prev) {
        intervalRef.current = setInterval(() => {
          setProgress((p) => (p >= 100 ? 100 : p + 0.05));
        }, 500);
      } else {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
      return !prev;
    });
  }, []);

  const cycleSpeed = () => {
    const idx = SPEEDS.indexOf(speed);
    setSpeed(SPEEDS[(idx + 1) % SPEEDS.length]);
  };

  const toggleSleepTimer = () => {
    setSleepTimer((prev) => {
      if (prev === null) return 30;
      if (prev === 30) return 60;
      if (prev === 60) return 90;
      return null;
    });
  };

  const formatTime = (percent: number) => {
    const totalSeconds = 67500; // ~18h45m for demo
    const elapsed = Math.floor((percent / 100) * totalSeconds);
    const h = Math.floor(elapsed / 3600);
    const m = Math.floor((elapsed % 3600) / 60);
    const s = elapsed % 60;
    return h > 0
      ? `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
      : `${m}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#2C1810]/98 border-t border-[#815854]/20 backdrop-blur-xl shadow-[0_-8px_40px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Progress bar */}
        <div className="mb-3">
          <Slider
            value={[progress]}
            onValueChange={([val]) => setProgress(val)}
            max={100}
            step={0.1}
            className="h-1 cursor-pointer"
          />
          <div className="flex justify-between text-[#F0E2C8]/30 text-xs mt-1">
            <span>{formatTime(progress)}</span>
            <span>{book.duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          {/* Book info */}
          <div className="flex-1 min-w-0 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#815854]/10 border border-[#815854]/20 flex-shrink-0 overflow-hidden">
              {book.cover ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-[#815854]/20" />
              )}
            </div>
            <div className="min-w-0">
              <p className="text-[#F0E2C8] text-sm font-medium truncate">{book.title}</p>
              <p className="text-[#F0E2C8]/40 text-xs truncate">{book.author}</p>
            </div>
          </div>

          {/* Playback controls */}
          <div className="flex items-center gap-2">
            <button
              className="p-2 text-[#F0E2C8]/50 hover:text-[#F0E2C8] transition-colors"
              onClick={() => setProgress(Math.max(0, progress - 1))}
              aria-label="Назад 30 секунд"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={togglePlay}
              className="w-11 h-11 rounded-full bg-[#815854] flex items-center justify-center hover:bg-[#9A6B62] transition-all duration-200 glow-sandalwood shadow-md"
              aria-label={isPlaying ? "Пауза" : "Воспроизвести"}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 text-[#2C1810]" fill="currentColor" />
              ) : (
                <Play className="w-5 h-5 text-[#2C1810] ml-0.5" fill="currentColor" />
              )}
            </button>

            <button
              className="p-2 text-[#F0E2C8]/50 hover:text-[#F0E2C8] transition-colors"
              onClick={() => setProgress(Math.min(100, progress + 1))}
              aria-label="Вперёд 30 секунд"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          {/* Extra controls */}
          <div className="hidden sm:flex items-center gap-2">
            {/* Speed */}
            <button
              onClick={cycleSpeed}
              className={cn(
                "px-2.5 py-1 rounded-lg text-xs font-bold border transition-all duration-200",
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
                "p-2 rounded-lg transition-all duration-200",
                sleepTimer !== null
                  ? "text-[#815854] bg-[#815854]/10"
                  : "text-[#F0E2C8]/50 hover:text-[#F0E2C8]"
              )}
              aria-label="Таймер сна"
              title={sleepTimer ? `Стоп через ${sleepTimer} мин` : "Таймер сна"}
            >
              <Moon className="w-4 h-4" />
              {sleepTimer && (
                <span className="text-[8px] font-bold block -mt-0.5">{sleepTimer}м</span>
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
            <div className="hidden md:flex items-center gap-2 w-24">
              <Volume2 className="w-4 h-4 text-[#F0E2C8]/40 flex-shrink-0" />
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={1}
                className="flex-1"
              />
            </div>
          </div>

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
  );
}
