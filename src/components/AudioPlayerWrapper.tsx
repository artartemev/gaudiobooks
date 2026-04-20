"use client";

import { useAtom } from "jotai";
import { currentBookAtom } from "@/lib/playerStore";
import { AudioPlayer } from "@/components/AudioPlayer";

export function AudioPlayerWrapper() {
  const [currentBook, setCurrentBook] = useAtom(currentBookAtom);

  if (!currentBook) return null;

  return (
    <AudioPlayer
      book={currentBook}
      onClose={() => setCurrentBook(null)}
    />
  );
}
