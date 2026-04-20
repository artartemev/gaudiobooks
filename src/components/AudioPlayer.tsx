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
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-[#2C1810]/98 border-t border-[#815854]/20 backdrop-blur-xl shadow-[0_-8px_40px_rgba(0,0,0,0.5)] rounded-t-3xl">
      <div className="max-w-7xl mx-auto px-4 py-3">
        {/* Progress bar */}
        <div className="mb-2">
          <Slider
            value={[progress]}
            onValueChange={([val]) => setProgress(val)}
            max={100}
            step={0.1}
            className="h-1 cursor-pointer"
          />
          <div className="flex justify-between text-[#F0E2C8]/40 text-xs mt-1">
            <span>{formatTime(progress)}</span>
            <span>{book.duration}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          {/* Book info */}
          <div className="flex-1 min-w-0">
            <p className="text-[#F0E2C8] text-sm font-medium truncate">{book.title}</p>
            <p className="text-[#F0E2C8]/50 text-xs truncate">{book.author}</p>
          </div>

          {/* Playback controls */}
          <div className="flex items-center gap-2">
            <button
              className="p-1.5 text-[#F0E2C8]/60 hover:text-[#F0E2C8] transition-colors"
              onClick={() => setProgress(Math.max(0, progress - 1))}
              aria-label="Назад 15 секунд"
            >
              <SkipBack className="w-4 h-4" />
            </button>

            <button
              onClick={togglePlay}
              className="w-10 h-10 rounded-full bg-[#815854] flex items-center justify-center hover:bg-[#9A6B62] transition-all duration-200 shadow-md"
              aria-label={isPlaying ? "Пауза" : "Воспроизвести"}
            >
              {isPlaying ? (
                <Pause className="w-4 h-4 text-[#FAF5EE]" fill="currentColor" />
              ) : (
                <Play className="w-4 h-4 text-[#FAF5EE] ml-0.5" fill="currentColor" />
              )}
            </button>

            <button
              className="p-1.5 text-[#F0E2C8]/60 hover:text-[#F0E2C8] transition-colors"
              onClick={() => setProgress(Math.min(100, progress + 1))}
              aria-label="Вперёд 15 секунд"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>

          {/* Speed badge */}
          <button
            onClick={cycleSpeed}
            className={cn(
              "px-2 py-1 rounded text-xs font-bold transition-all duration-200",
              speed !== 1
                ? "bg-[#815854] text-[#FAF5EE]"
                : "bg-white/10 text-[#F0E2C8]/60 hover:text-[#F0E2C8]"
            )}
            aria-label="Скорость воспроизведения"
          >
            ×{speed}
          </button>
        </div>
      </div>
    </div>
  );
}
