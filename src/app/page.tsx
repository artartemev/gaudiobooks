import Link from "next/link";
import { ArrowRight, Star, TrendingUp, Sparkles } from "lucide-react";
import { HeroSection } from "@/components/HeroSection";
import { BookCard } from "@/components/BookCard";
import { books } from "@/lib/data";

const featuredBooks = books.filter((b) => b.isPopular).slice(0, 4);
const newReleases = books.filter((b) => b.isNew).slice(0, 4);

const stats = [
  { value: "58", label: "аудиокниг в каталоге", icon: "📚" },
  { value: "20", label: "авторов и ачарьев", icon: "✍️" },
  { value: "1 126", label: "глав и треков", icon: "🎧" },
  { value: "510+", label: "часов записей", icon: "⏱️" },
];

export default function HomePage() {
  return (
    <div className="pb-10">
      <HeroSection />

      {/* Stats */}
      <section className="py-14 border-y border-[#C9A66B]/10 bg-gradient-to-r from-[#0E0E12] via-[#111118] to-[#0E0E12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center group">
                <div className="text-2xl mb-2">{stat.icon}</div>
                <div className="font-playfair text-3xl font-bold text-[#C9A66B] mb-1">
                  {stat.value}
                </div>
                <div className="text-[#F7F1E8]/40 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Star className="w-5 h-5 text-[#C9A66B]" />
              <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#F7F1E8]">
                Избранные книги
              </h2>
            </div>
            <Link
              href="/catalog"
              className="flex items-center gap-1.5 text-[#C9A66B] text-sm hover:gap-2.5 transition-all duration-200"
            >
              Все книги <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {featuredBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* New Releases */}
      <section className="py-16 bg-gradient-to-b from-transparent via-[#111118]/50 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-[#C9A66B]" />
              <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#F7F1E8]">
                Новые поступления
              </h2>
            </div>
            <Link
              href="/catalog?filter=new"
              className="flex items-center gap-1.5 text-[#C9A66B] text-sm hover:gap-2.5 transition-all duration-200"
            >
              Смотреть все <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {newReleases.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-8">
            <TrendingUp className="w-5 h-5 text-[#C9A66B]" />
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold text-[#F7F1E8]">
              Популярное сейчас
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {books.slice(0, 3).map((book, idx) => (
              <Link key={book.id} href={`/book/${book.slug}`}>
                <div className="card-glow flex items-center gap-4 p-4">
                  <span className="font-playfair text-4xl font-bold text-[#C9A66B]/20 w-10 flex-shrink-0">
                    {idx + 1}
                  </span>
                  <div className="w-12 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-[#C9A66B]/10">
                    {book.cover && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[#F7F1E8] font-medium text-sm leading-tight line-clamp-2 mb-1">
                      {book.title}
                    </p>
                    <p className="text-[#F7F1E8]/40 text-xs">{book.author}</p>
                    <p className="text-[#C9A66B]/70 text-xs mt-1">{book.duration}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl border border-[#C9A66B]/20 bg-gradient-to-r from-[#C9A66B]/10 via-[#C9A66B]/5 to-transparent p-10 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#C9A66B]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <h2 className="font-playfair text-3xl sm:text-4xl font-bold text-[#F7F1E8] mb-4">
              Поддержите распространение
              <br />
              <span className="text-gradient-gold">духовных знаний</span>
            </h2>
            <p className="text-[#F7F1E8]/60 max-w-xl mx-auto mb-8">
              Ваша поддержка помогает нам создавать новые аудиокниги и делать
              вечную мудрость доступной для всех.
            </p>
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#C9A66B] text-[#0E0E12] font-semibold hover:bg-[#D4B47C] transition-all duration-300 glow-sandalwood"
            >
              Поддержать проект <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
