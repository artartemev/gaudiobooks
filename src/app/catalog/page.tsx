"use client";

import { useState, useMemo } from "react";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { BookCard } from "@/components/BookCard";
import { SearchBar } from "@/components/SearchBar";
import { books, authors } from "@/lib/data";
import { cn } from "@/lib/utils";

type SortKey = "popular" | "new" | "duration" | "title";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "popular", label: "Популярные" },
  { value: "new", label: "Новинки" },
  { value: "duration", label: "По длительности" },
  { value: "title", label: "По названию" },
];

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [activeAuthor, setActiveAuthor] = useState<string>("all");
  const [sort, setSort] = useState<SortKey>("popular");
  const [showFilters, setShowFilters] = useState(false);

  const filtered = useMemo(() => {
    let result = [...books];

    // Search
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.author.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q)
      );
    }

    // Author filter
    if (activeAuthor !== "all") {
      result = result.filter((b) => b.authorId === activeAuthor);
    }

    // Sort
    switch (sort) {
      case "popular":
        result = result.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
        break;
      case "new":
        result = result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "duration":
        result = result.sort((a, b) => {
          const parseDuration = (d: string) => {
            const h = parseInt(d.match(/(\d+)ч/)?.[1] ?? "0");
            const m = parseInt(d.match(/(\d+)м/)?.[1] ?? "0");
            return h * 60 + m;
          };
          return parseDuration(b.duration) - parseDuration(a.duration);
        });
        break;
      case "title":
        result = result.sort((a, b) => a.title.localeCompare(b.title, "ru"));
        break;
    }

    return result;
  }, [search, activeAuthor, sort]);

  return (
    <div className="min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-10">
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold mb-3" style={{ color: "var(--text)" }}>
            Каталог книг
          </h1>
          <p className="text-lg" style={{ color: "var(--text-3)" }}>
            {books.length} аудиокниг гаудия-вайшнавской традиции
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Найти книгу или автора..."
            className="flex-1"
          />
          <div className="flex gap-3">
            {/* Sort */}
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="appearance-none pl-10 pr-8 py-3 rounded-xl border text-sm focus:outline-none cursor-pointer min-w-[160px]"
                style={{
                  background: "var(--bg-2)",
                  color: "var(--text)",
                  borderColor: "var(--border)",
                }}
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value} style={{ background: "var(--bg-2)" }}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <ArrowUpDown
                className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
                style={{ color: "var(--text-3)" }}
              />
            </div>

            {/* Filter toggle (mobile) */}
            <button
              className={cn(
                "lg:hidden flex items-center gap-2 px-4 py-3 rounded-xl border text-sm transition-all"
              )}
              style={
                showFilters
                  ? { borderColor: "var(--accent)", background: "color-mix(in srgb, var(--accent) 10%, transparent)", color: "var(--accent)" }
                  : { borderColor: "var(--border)", color: "var(--text-2)" }
              }
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4" />
              Фильтры
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside
            className={cn(
              "flex-shrink-0 w-56",
              showFilters ? "block" : "hidden lg:block"
            )}
          >
            <div className="sticky top-24">
              <h3
                className="font-semibold text-xs uppercase tracking-widest mb-4"
                style={{ color: "var(--accent)" }}
              >
                Авторы
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => setActiveAuthor("all")}
                  className="w-full text-left px-3 py-2 rounded-lg text-sm transition-all"
                  style={
                    activeAuthor === "all"
                      ? { background: "color-mix(in srgb, var(--accent) 15%, transparent)", color: "var(--accent)" }
                      : { color: "var(--text-2)" }
                  }
                >
                  Все авторы
                </button>
                {authors.map((author) => (
                  <button
                    key={author.id}
                    onClick={() => setActiveAuthor(author.id)}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm transition-all leading-tight"
                    style={
                      activeAuthor === author.id
                        ? { background: "color-mix(in srgb, var(--accent) 15%, transparent)", color: "var(--accent)" }
                        : { color: "var(--text-2)" }
                    }
                  >
                    <span className="line-clamp-2">{author.name}</span>
                    <span className="text-[10px] mt-0.5 block" style={{ color: "var(--text-3)" }}>
                      {author.booksCount} книг
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Books Grid */}
          <div className="flex-1 min-w-0">
            {filtered.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-lg mb-3" style={{ color: "var(--text-3)" }}>Ничего не найдено</p>
                <p className="text-sm" style={{ color: "var(--text-3)" }}>
                  Попробуйте изменить параметры поиска
                </p>
              </div>
            ) : (
              <>
                <p className="text-sm mb-6" style={{ color: "var(--text-3)" }}>
                  Найдено: {filtered.length} {filtered.length === 1 ? "книга" : "книг"}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
                  {filtered.map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
