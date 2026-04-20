"use client";

/**
 * Based on kokonutui carousel-cards + spotlight-cards
 * https://github.com/kokonut-labs/kokonutui
 */

import Link from "next/link";
import Image from "next/image";
import { Play, Clock, BookOpen, Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Book } from "@/lib/data";

// Warm earthy palette for gradient covers — one per book (stable)
const GRADIENTS = [
  { from: "#5C3B2A", to: "#8B6248", text: "#F5E8D8" },
  { from: "#3B4A2E", to: "#6B7A4E", text: "#E8F0D8" },
  { from: "#2E3B5C", to: "#4E6B8B", text: "#D8E8F5" },
  { from: "#4A2E3B", to: "#7A4E6B", text: "#F5D8E8" },
  { from: "#3B3B2A", to: "#6B6B48", text: "#F0F0D8" },
  { from: "#5C2E2E", to: "#8B5858", text: "#F5D8D8" },
  { from: "#2A3B4A", to: "#486B7A", text: "#D8EDF5" },
  { from: "#4A3B2E", to: "#7A6B48", text: "#F5ECD8" },
];

function getGradient(book: Book) {
  const idx = (book.title.charCodeAt(0) + book.title.length) % GRADIENTS.length;
  return GRADIENTS[idx];
}

interface BookCardProps {
  book: Book;
  className?: string;
}

export function BookCard({ book, className }: BookCardProps) {
  const grad = getGradient(book);
  const initial = book.title.charAt(0);

  return (
    <Link
      href={`/book/${book.slug}`}
      className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#815854] focus-visible:ring-offset-2"
    >
      <Card
        className={cn(
          "group relative flex flex-col overflow-hidden rounded-xl border-0",
          "bg-[#E0D2B8] shadow-sm transition-shadow duration-300 hover:shadow-md",
          className
        )}
      >
        {/* ── Cover ── */}
        <div className="relative aspect-[2/3] w-full overflow-hidden rounded-t-xl">

          {/* Image or gradient placeholder */}
          {book.cover ? (
            <Image
              src={book.cover}
              alt={book.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          ) : (
            <div
              className="absolute inset-0 flex items-center justify-center select-none transition-transform duration-500 group-hover:scale-105"
              style={{ background: `linear-gradient(135deg, ${grad.from}, ${grad.to})` }}
            >
              {/* Subtle noise texture overlay */}
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }}
              />
              <span
                className="font-playfair text-[72px] font-bold leading-none opacity-25 select-none"
                style={{ color: grad.text }}
              >
                {initial}
              </span>
            </div>
          )}

          {/* Shimmer sweep on hover (from spotlight-cards) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-[55%] -translate-x-full -skew-x-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[280%]"
          />

          {/* Bookmark button (replaces heart from carousel-cards) */}
          <button
            onClick={(e) => e.preventDefault()}
            className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-white/70 backdrop-blur-sm flex items-center justify-center text-[#1C0F0A]/60 hover:bg-white/90 hover:text-[#815854] transition-all duration-200"
            aria-label="Добавить в закладки"
          >
            <Bookmark className="w-3.5 h-3.5" />
          </button>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {book.isNew && (
              <Badge className="rounded-md bg-[#815854] text-white text-[9px] font-bold px-1.5 py-0.5 border-0">
                НОВИНКА
              </Badge>
            )}
            {book.isPopular && (
              <Badge className="rounded-md bg-white/80 text-[#1C0F0A] text-[9px] font-medium px-1.5 py-0.5 border-0 backdrop-blur-sm">
                ТОП
              </Badge>
            )}
          </div>

          {/* Play on hover */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
            <div className="w-12 h-12 rounded-full bg-[#815854] flex items-center justify-center shadow-lg shadow-black/30 scale-90 group-hover:scale-100 transition-transform duration-300">
              <Play className="w-5 h-5 text-white ml-0.5" fill="currentColor" />
            </div>
          </div>

          {/* Bottom gradient for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          {/* Accent bottom line (from spotlight-cards) */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full transition-all duration-500 group-hover:w-full"
            style={{ background: `linear-gradient(to right, ${grad.to}cc, transparent)` }}
          />
        </div>

        {/* ── Info ── */}
        <CardContent className="p-3 pb-1">
          <h3 className="font-semibold text-[#1C0F0A] text-sm leading-tight line-clamp-2 mb-1 group-hover:text-[#815854] transition-colors duration-200">
            {book.title}
          </h3>
          <p className="text-[#6B4C3B] text-xs line-clamp-1">{book.author}</p>
        </CardContent>

        <CardFooter className="px-3 pb-3 pt-1 flex items-center gap-3 text-[#A08060] text-xs">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {book.duration}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            {book.chapters} гл.
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
}
