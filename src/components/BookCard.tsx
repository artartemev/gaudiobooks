"use client";

/**
 * Based on kokonutui carousel-cards + spotlight-cards
 * https://github.com/kokonut-labs/kokonutui
 */

import Link from "next/link";
import Image from "next/image";
import { Play, Clock, BookOpen, Bookmark } from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
      className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
      style={{ "--tw-ring-color": "var(--accent)" } as React.CSSProperties}
    >
      <div
        className={cn(
          "card-base group relative flex flex-col overflow-hidden rounded-xl",
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
              <div
                className="absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                }}
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

          {/* Bookmark button */}
          <button
            onClick={(e) => e.preventDefault()}
            className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full backdrop-blur-sm flex items-center justify-center transition-all duration-200"
            style={{ background: "rgba(255,255,255,0.7)", color: "var(--text-2)" }}
            aria-label="Добавить в закладки"
          >
            <Bookmark className="w-3.5 h-3.5" />
          </button>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {book.isNew && (
              <Badge
                className="rounded-md text-[9px] font-bold px-1.5 py-0.5 border-0"
                style={{ background: "var(--accent)", color: "var(--bg)" }}
              >
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
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg shadow-black/30 scale-90 group-hover:scale-100 transition-transform duration-300"
              style={{ background: "var(--accent)" }}
            >
              <Play className="w-5 h-5 ml-0.5" fill="currentColor" style={{ color: "var(--bg)" }} />
            </div>
          </div>

          {/* Bottom gradient for legibility */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

          {/* Accent bottom line */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-0 h-[2px] w-0 rounded-full transition-all duration-500 group-hover:w-full"
            style={{ background: `linear-gradient(to right, ${grad.to}cc, transparent)` }}
          />
        </div>

        {/* ── Info ── */}
        <div className="p-3 pb-1">
          <h3
            className="font-semibold text-sm leading-tight line-clamp-2 mb-1 transition-colors duration-200 group-hover:opacity-80"
            style={{ color: "var(--text)" }}
          >
            {book.title}
          </h3>
          <p className="text-xs line-clamp-1" style={{ color: "var(--text-2)" }}>
            {book.author}
          </p>
        </div>

        <div className="px-3 pb-3 pt-1 flex items-center gap-3 text-xs" style={{ color: "var(--text-3)" }}>
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
    </Link>
  );
}
