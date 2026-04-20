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
    partTitle: '',
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
          className="inline-flex items-center gap-2 text-[#6B4C3B]/60 hover:text-[#815854] text-sm mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Назад в каталог
        </Link>

        {/* Book Hero */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 mb-14">
          {/* Cover */}
          <div className="flex-shrink-0">
            <div className="relative w-56 sm:w-64 mx-auto md:mx-0 rounded-2xl overflow-hidden shadow-2xl shadow-black/20 border border-[#815854]/20">
              <div className="aspect-[2/3] bg-gradient-to-br from-[#D4C4A4] to-[#C4B494]">
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
                    <BookOpen className="w-16 h-16 text-[#815854]/30" />
                  </div>
                )}
              </div>
              {/* Glow */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-[#815854]/20 pointer-events-none" />
            </div>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex flex-wrap gap-2 mb-4">
              {book.isNew && (
                <Badge className="bg-[#815854] text-[#FAF5EE] font-bold border-0">
                  НОВИНКА
                </Badge>
              )}
              {book.isPopular && (
                <Badge className="bg-white/15 text-[#1C0F0A] border border-white/20">
                  ПОПУЛЯРНОЕ
                </Badge>
              )}
            </div>

            <h1 className="font-playfair text-3xl sm:text-4xl font-bold text-[#1C0F0A] leading-tight mb-3">
              {book.title}
            </h1>

            <p className="text-[#815854] text-lg mb-6">{book.author}</p>

            <div className="flex flex-wrap gap-6 mb-6 text-sm">
              <div className="flex items-center gap-2 text-[#6B4C3B]">
                <Clock className="w-4 h-4 text-[#815854]/60" />
                {book.duration}
              </div>
              <div className="flex items-center gap-2 text-[#6B4C3B]">
                <BookOpen className="w-4 h-4 text-[#815854]/60" />
                {book.chapters} глав
              </div>
            </div>

            <p className="text-[#6B4C3B] leading-relaxed mb-8 max-w-2xl">
              {book.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setCurrentBook(book)}
                className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-[#815854] text-[#FAF5EE] font-semibold text-base hover:bg-[#9A6B62] transition-all duration-300 glow-sandalwood shadow-lg shadow-[#815854]/20"
              >
                <Play className="w-5 h-5" fill="currentColor" />
                Слушать сейчас
              </button>
              <button className="flex items-center justify-center gap-3 px-8 py-4 rounded-xl border border-[#815854]/30 bg-white/5 text-[#1C0F0A] font-semibold text-base hover:border-[#815854]/60 transition-all duration-300">
                + В закладки
              </button>
            </div>
          </div>
        </div>

        {/* Chapters */}
        <div className="mb-14">
          <h2 className="font-playfair text-2xl font-bold text-[#1C0F0A] mb-6">
            Содержание
          </h2>
          <div className="space-y-2">
            {chapters.map((chapter, idx) => (
              <div key={chapter.number}>
                {/* Part divider when partTitle changes */}
                {chapter.partTitle && (idx === 0 || chapters[idx - 1].partTitle !== chapter.partTitle) && (
                  <p className="text-[#815854]/60 text-xs uppercase tracking-widest font-semibold px-1 pt-4 pb-2 first:pt-0">
                    {chapter.partTitle}
                  </p>
                )}
              <div
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
                  <span className="w-8 h-8 rounded-lg bg-[#815854]/10 flex items-center justify-center text-[#815854] text-sm font-bold flex-shrink-0">
                    {chapter.number}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-[#1C0F0A] text-sm font-medium truncate">
                      {chapter.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <span className="text-[#6B4C3B]/50 text-xs hidden sm:block">
                      {chapter.duration}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setCurrentBook(book);
                      }}
                      className="p-1.5 rounded-lg bg-[#815854]/10 text-[#815854] hover:bg-[#815854]/20 transition-colors"
                      aria-label="Воспроизвести главу"
                    >
                      <Play className="w-3.5 h-3.5" fill="currentColor" />
                    </button>
                    {openChapter === chapter.number ? (
                      <ChevronUp className="w-4 h-4 text-[#6B4C3B]/50" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-[#6B4C3B]/50" />
                    )}
                  </div>
                </button>
                {openChapter === chapter.number && (
                  <div className="px-4 pb-4 pt-0 border-t border-[#815854]/10">
                    <p className="text-[#6B4C3B]/60 text-sm mt-3">
                      Продолжительность: {chapter.duration}. Нажмите кнопку
                      воспроизведения, чтобы начать слушать эту главу.
                    </p>
                  </div>
                )}
              </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Books */}
        {related.length > 0 && (
          <div>
            <h2 className="font-playfair text-2xl font-bold text-[#1C0F0A] mb-6">
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
