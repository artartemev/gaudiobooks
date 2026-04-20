"use client";

import Link from "next/link";
import Image from "next/image";
import { Play, Clock, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Book } from "@/lib/data";

interface BookCardProps {
  book: Book;
  className?: string;
}

export function BookCard({ book, className }: BookCardProps) {
  return (
    <Link href={`/book/${book.slug}`}>
      <div
        className={cn(
          "card-glow group relative overflow-hidden cursor-pointer",
          className
        )}
      >
        {/* Cover */}
        <div className="relative aspect-[2/3] overflow-hidden rounded-t-xl bg-gradient-to-br from-[#1A1A22] to-[#0E0E12]">
          {book.cover ? (
            <Image
              src={book.cover}
              alt={book.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-[#C9A66B]/30" />
            </div>
          )}
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E12] via-transparent to-transparent opacity-60" />

          {/* Play Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="w-14 h-14 rounded-full bg-[#C9A66B] flex items-center justify-center shadow-lg shadow-[#C9A66B]/40 scale-90 group-hover:scale-100 transition-transform duration-300">
              <Play className="w-6 h-6 text-[#0E0E12] ml-0.5" fill="currentColor" />
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1.5">
            {book.isNew && (
              <Badge className="bg-[#C9A66B] text-[#0E0E12] text-[10px] font-bold px-2 py-0.5 rounded-md border-0">
                НОВИНКА
              </Badge>
            )}
            {book.isPopular && (
              <Badge className="bg-white/10 text-[#F7F1E8] text-[10px] font-medium px-2 py-0.5 rounded-md border border-white/20 backdrop-blur-sm">
                ПОПУЛЯРНОЕ
              </Badge>
            )}
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <h3 className="font-semibold text-[#F7F1E8] text-sm leading-tight line-clamp-2 mb-1 group-hover:text-[#C9A66B] transition-colors duration-200">
            {book.title}
          </h3>
          <p className="text-[#F7F1E8]/50 text-xs mb-2 line-clamp-1">{book.author}</p>
          <div className="flex items-center gap-3 text-[#F7F1E8]/40 text-xs">
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
