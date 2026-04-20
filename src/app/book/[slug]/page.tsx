"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { use } from "react";
import { useSetAtom } from "jotai";
import {
  Play,
  Clock,
  BookOpen,
  ArrowLeft,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { BookCard } from "@/components/BookCard";
import { books, bookChapters } from "@/lib/data";
import { currentBookAtom } from "@/lib/playerStore";
import { useState } from "react";

interface Props {
  params: Promise<{ slug: string }>;
}

export default function BookPage({ params }: Props) {
  const { slug } = use(params);
  const book = books.find((b) => b.slug === slug);
  const setCurrentBook = useSetAtom(currentBookAtom);
  const [openChapter, setOpenChapter] = useState<number | null>(null);

  if (!book) {
    notFound();
  }

  const chapters = bookChapters[book.slug] ?? Array.from({ length: book.chapters }, (_, i) => ({
    number: i + 1,
    title: `Глава ${i + 1}`,
    duration: "30м",
  }));

  const related = books
    .filter((b) => b.authorId === book.authorId && b.id !== book.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen py-10 pb-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back */}
        <Link
          href="/catalog"
          className="inline-flex items-center gap-2 text-[#F7F1E8]/40 hover:text-[#C9A66B] text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад в каталог
        </Link>

        {/* Book Hero */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 mb-14">
          {/* Cover */}
          <div className="flex-shrink-0">
            <div className="relative w-56 sm:w-64 mx-auto md:mx-0 rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-[#C9A66B]/20">
              <div className="aspect-[2/3] bg-gradient-to-br from-[#1A1A22] to-[#0E0E12]">
                {book.cover ? (
                  <Image
                    src={book.cover}
                    alt={book.title}
                    fill
                    className="object-cover"
                    sizes="256px"
                    priority
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-[#C9A66B]/30" />
                  </div>
                )}
              </div>
              {/* Glow */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-[#C9A66B]/20 pointer-events-none" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-4">
              {book.isNew && (
                <Badge className="bg-[#C9A66B] text-[#0E0E12] font-bold border-0">
                  НОВИНКА
                </Badge>
              )}
              {book.isPopular && (
                <Badge className="bg-white/10 text-[#F7F1E8] border border-white/20">
                  ПОПУЛЯРНОЕ
                </Badge>
              )}
            </div>

            <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-[#F7F1E8] leading-tight mb-3">
              {book.title}
            </h1>

            <p className="text-[#C9A66B] text-lg mb-6">{book.author}</p>

            <div className="flex flex-wrap gap-6 mb-6 text-sm">
              <div className="flex items-center gap-2 text-[#F7F1E8]/50">
                <Clock className="w-4 h-4 text-[#C9A66B]/60" />
                {book.duration}
              </div>
              <div className="flex items-center gap-2 text-[#F7F1E8]/50">
                <BookOpen className="w-4 h-4 text-[#C9A66B]/60" />
                {book.chapters} глав
              </div>
            </div>

            <p className="text-[#F7F1E8]/60 leading-relaxed mb-8 max-w-2xl">
              {book.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setCurrentBook(book)}
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#C9A66B] text-[#0E0E12] font-semibold text-base hover:bg-[#D4B47C] transition-all duration-300 glow-sandalwood shadow-lg shadow-[#C9A66B]/20"
              >
                <Play className="w-5 h-5" fill="currentColor" />
                Слушать сейчас
              </button>
              <button className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl border border-[#C9A66B]/30 bg-white/5 text-[#F7F1E8] font-semibold text-base hover:border-[#C9A66B]/60 transition-all duration-300">
                + В закладки
              </button>
            </div>
          </div>
        </div>

        {/* Chapters */}
        <div className="mb-14">
          <h2 className="font-playfair text-2xl font-bold text-[#F7F1E8] mb-6">
            Содержание
          </h2>
          <div className="space-y-2">
            {chapters.map((chapter) => (
              <div
                key={chapter.number}
                className="card-glow overflow-hidden"
              >
                <button
                  className="w-full flex items-center gap-4 p-4 text-left"
                  onClick={() =>
                    setOpenChapter(
                      openChapter === chapter.number ? null : chapter.number
                    )
                  }
                >
                  <span className="w-8 h-8 rounded-lg bg-[#C9A66B]/10 flex items-center justify-center text-[#C9A66B] text-sm font-bold flex-shrink-0">
                    {chapter.number}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#F7F1E8] text-sm font-medium truncate">
                      {chapter.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <span className="text-[#F7F1E8]/30 text-xs hidden sm:block">
                      {chapter.duration}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentBook(book);
                      }}
                      className="p-1.5 rounded-lg bg-[#C9A66B]/10 text-[#C9A66B] hover:bg-[#C9A66B]/20 transition-colors"
                      aria-label="Воспроизвести главу"
                    >
                      <Play className="w-3.5 h-3.5" fill="currentColor" />
                    </button>
                    {openChapter === chapter.number ? (
                      <ChevronUp className="w-4 h-4 text-[#F7F1E8]/30" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#F7F1E8]/30" />
                    )}
                  </div>
                </button>
                {openChapter === chapter.number && (
                  <div className="px-4 pb-4 pt-0 border-t border-[#C9A66B]/10">
                    <p className="text-[#F7F1E8]/40 text-sm mt-3">
                      Продолжительность: {chapter.duration}. Нажмите кнопку
                      воспроизведения, чтобы начать слушать эту главу.
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Related Books */}
        {related.length > 0 && (
          <div>
            <h2 className="font-playfair text-2xl font-bold text-[#F7F1E8] mb-6">
              Другие книги автора
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {related.map((relBook) => (
                <BookCard key={relBook.id} book={relBook} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
