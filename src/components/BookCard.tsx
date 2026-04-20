"use client";

import Link from "next/link";
import Image from "next/image";
import { Play, Clock, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Book } from "@/lib/data";

// Warm earthy gradients for placeholder covers — cycle by book index
const COVER_GRADIENTS = [
  "from-[#5C3B2A] to-[#8B6248]",
  "from-[#3B4A2E] to-[#6B7A4E]",
  "from-[#2E3B5C] to-[#4E6B8B]",
  "from-[#4A2E3B] to-[#7A4E6B]",
  "from-[#3B3B2A] to-[#6B6B48]",
  "from-[#2E4A3B] to-[#4E8B6B]",
  "from-[#5C2E2E] to-[#8B5858]",
  "from-[#2E2E5C] to-[#4E4E8B]",
];

function gradientForBook(book: Book) {
  // Stable color per book based on title
  const idx = (book.title.charCodeAt(0) + book.title.length) % COVER_GRADIENTS.length;
  return COVER_GRADIENTS[idx];
}

interface BookCardProps {
  book: Book;
  className?: string;
}

export function BookCard({ book, className }: BookCardProps) {
  const grad = gradientForBook(book);
  const initial = book.title.charAt(0);

  return (
    <Link href={`/book/${book.slug}`}>
      <div className={cn("card-glow group relative overflow-hidden cursor-pointer", className)}>

        {/* Cover */}
        <div className={cn(
          "relative aspect-[2/3] overflow-hidden rounded-t-xl bg-gradient-to-br",
          grad
        )}>
          {book.cover ? (
            <Image
              src={book.cover}
              alt={book.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center select-none">
              <span className="font-playfair text-6xl font-bold text-white/20">{initial}</span>
            </div>
          )}

          {/* Bottom gradient for text legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70" />

          {/* Play Button on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-[#815854] flex items-center justify-center shadow-lg shadow-black/40 scale-90 group-hover:scale-100 transition-transform duration-300">
              <Play className="w-6 h-6 text-white ml-0.5" fill="currentColor" />
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1.5">
            {book.isNew && (
              <Badge className="bg-[#815854] text-white text-[10px] font-bold px-2 py-0.5 rounded-md border-0">
                НОВИНКА
              </Badge>
            )}
            {book.isPopular && (
              <Badge className="bg-black/30 text-white text-[10px] font-medium px-2 py-0.5 rounded-md border border-white/20 backdrop-blur-sm">
                ТОП
              </Badge>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <h3 className="font-semibold text-[#1C0F0A] text-sm leading-tight line-clamp-2 mb-1 group-hover:text-[#815854] transition-colors duration-200">
            {book.title}
          </h3>
          <p className="text-[#6B4C3B] text-xs mb-2 line-clamp-1">{book.author}</p>
          <div className="flex items-center gap-3 text-[#A08060] text-xs">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {book.duration}
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-3 h-3" />
              {book.chapters} гл.
            </span>
          </div>
        </div>

      </div>
    </Link>
  );
}
