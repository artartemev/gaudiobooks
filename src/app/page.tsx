import Link from "next/link";
import { ArrowRight, Play } from "lucide-react";
import { BookCard } from "@/components/BookCard";
import { books } from "@/lib/data";
import type { Book } from "@/lib/data";

const featuredBooks = books.filter((b) => b.isPopular).slice(0, 4);
const newBooks = books.filter((b) => b.isNew).slice(0, 4);
const trendingBooks = books.slice(0, 6);

const stats = [
  { value: "58", label: "аудиокниг" },
  { value: "20", label: "авторов" },
  { value: "1 126", label: "треков" },
  { value: "510+", label: "часов" },
];

function SectionHeader({ title, href }: { title: string; href?: string }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="font-playfair text-2xl font-bold" style={{ color: "var(--text)" }}>
        {title}
      </h2>
      {href && (
        <Link
          href={href}
          className="text-xs font-medium flex items-center gap-1 transition-colors"
          style={{ color: "var(--accent)" }}
        >
          Все <ArrowRight className="w-3 h-3" />
        </Link>
      )}
    </div>
  );
}

function TrendingRow({ book, rank }: { book: Book; rank: number }) {
  return (
    <Link href={`/book/${book.slug}`}>
      <div className="card-base flex items-center gap-4 p-4 group cursor-pointer">
        <span
          className="font-playfair text-3xl font-bold w-8 shrink-0 text-center"
          style={{ color: "var(--text-3)" }}
        >
          {rank}
        </span>
        <div
          className="w-10 h-14 rounded-lg overflow-hidden shrink-0"
          style={{ background: "var(--bg-3)" }}
        >
          {book.cover && (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
          )}
        </div>
        <div className="min-w-0">
          <p
            className="text-sm font-medium line-clamp-2 mb-1 transition-colors group-hover:opacity-80"
            style={{ color: "var(--text)" }}
          >
            {book.title}
          </p>
          <p className="text-xs line-clamp-1" style={{ color: "var(--text-2)" }}>
            {book.author}
          </p>
          <p className="text-xs mt-1" style={{ color: "var(--text-3)" }}>
            {book.duration}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default function HomePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-32">
      {/* Hero */}
      <section className="relative py-24 text-center">
        {/* Big blurred glow behind — isolated so overflow-hidden doesn't create dark compositing layer on mobile */}
        <div className="absolute inset-0 pointer-events-none" style={{ contain: "strict" }}>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
            style={{ background: "var(--accent)", opacity: 0.06, filter: "blur(80px)" }}
          />
        </div>
        <p
          className="text-xs uppercase tracking-[0.3em] mb-6 relative"
          style={{ color: "var(--text-3)" }}
        >
          Аудиокниги. Гаудия Вайшнавизм
        </p>
        <h1
          className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight relative"
          style={{ color: "var(--text)" }}
        >
          Слушайте вечную<br />мудрость
        </h1>
        <p
          className="text-lg mb-10 max-w-xl mx-auto relative"
          style={{ color: "var(--text-2)" }}
        >
          510+ часов гаудия-вайшнавских текстов в аудиоформате. Озвучка Субала Сакха даса.
        </p>
        <div className="flex items-center justify-center gap-4 flex-wrap relative">
          <Link
            href="/catalog"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 hover:opacity-90"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
          >
            <Play className="w-4 h-4" fill="currentColor" /> Начать слушать
          </Link>
          <Link
            href="/catalog"
            className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-sm border transition-all duration-200 hover:opacity-80"
            style={{ borderColor: "var(--border)", color: "var(--text-2)" }}
          >
            Весь каталог <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Stats */}
      <section
        className="py-12 grid grid-cols-2 sm:grid-cols-4 gap-6 border-y mb-16"
        style={{ borderColor: "var(--border)" }}
      >
        {stats.map((s) => (
          <div key={s.label} className="text-center">
            <div
              className="font-playfair text-3xl font-bold mb-1"
              style={{ color: "var(--accent)" }}
            >
              {s.value}
            </div>
            <div className="text-xs" style={{ color: "var(--text-3)" }}>
              {s.label}
            </div>
          </div>
        ))}
      </section>

      {/* Featured Books */}
      <section className="mb-16">
        <SectionHeader title="Избранные книги" href="/catalog" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {featuredBooks.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </div>
      </section>

      {/* New Releases */}
      <section className="mb-16">
        <SectionHeader title="Новые поступления" href="/catalog" />
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
          {newBooks.map((b) => (
            <BookCard key={b.id} book={b} />
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="mb-16">
        <SectionHeader title="Популярное" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {trendingBooks.map((b, i) => (
            <TrendingRow key={b.id} book={b} rank={i + 1} />
          ))}
        </div>
      </section>

      {/* CTA — hidden for now */}
    </div>
  );
}
