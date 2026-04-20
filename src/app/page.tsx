import Link from "next/link";
import { books, authors } from "@/lib/data";

const recentBooks = books.slice(0, 6);
const newBooks = books.filter((b) => b.isNew).slice(0, 8);

// ── ContinueCard (160×210px) ──────────────────────────────────────────────────
function ContinueCard({ book, chapterNum }: { book: (typeof books)[0]; chapterNum: number }) {
  const initial = book.title.charAt(0).toUpperCase();
  const gradients = [
    "from-[#5C3B2E] to-[#8B6555]",
    "from-[#3B4A2E] to-[#6B7A4E]",
    "from-[#2E3B5C] to-[#4E6B8B]",
    "from-[#4A2E3B] to-[#7A4E6B]",
    "from-[#3B3B2E] to-[#6B6B4E]",
    "from-[#2E4A3B] to-[#4E8B6B]",
  ];
  const grad = gradients[parseInt(book.id, 16) % gradients.length] ?? gradients[0];

  return (
    <Link href={`/book/${book.slug}`} className="flex-shrink-0">
      <div className="relative rounded-2xl overflow-hidden" style={{ width: 160, height: 210 }}>
        {/* Background */}
        {book.cover ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={book.cover}
            alt={book.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <div className={`absolute inset-0 bg-gradient-to-br ${grad} flex items-center justify-center`}>
            <span className="font-playfair text-5xl font-bold text-white/30">{initial}</span>
          </div>
        )}
        {/* Bottom gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        {/* Text */}
        <div className="absolute bottom-0 left-0 right-0 p-3">
          <p className="text-white font-bold text-xs leading-tight line-clamp-2 mb-1">
            {book.title}
          </p>
          <p className="text-white/60 text-[10px]">глава {chapterNum}</p>
        </div>
        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
          <div className="h-full bg-[#F0D0A0]" style={{ width: "30%" }} />
        </div>
      </div>
    </Link>
  );
}

// ── SmallBookCard ─────────────────────────────────────────────────────────────
function SmallBookCard({ book }: { book: (typeof books)[0] }) {
  const initial = book.title.charAt(0).toUpperCase();
  const gradients = [
    "from-[#7A4E3B] to-[#A07060]",
    "from-[#4E6B3B] to-[#80A060]",
    "from-[#3B4E7A] to-[#607FA0]",
    "from-[#6B3B6B] to-[#A06BA0]",
    "from-[#6B6B3B] to-[#A0A060]",
    "from-[#3B6B4E] to-[#60A07A]",
    "from-[#6B4E3B] to-[#A0806B]",
    "from-[#3B6B6B] to-[#60A0A0]",
  ];
  const grad = gradients[parseInt(book.id, 16) % gradients.length] ?? gradients[0];

  return (
    <Link href={`/book/${book.slug}`} className="flex-shrink-0">
      <div className="rounded-xl overflow-hidden" style={{ width: 130, height: 170 }}>
        <div className="relative w-full h-full">
          {book.cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`w-full h-full bg-gradient-to-br ${grad} flex items-center justify-center`}>
              <span className="font-playfair text-4xl font-bold text-white/40">{initial}</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-2">
            <p className="text-white font-semibold text-[10px] leading-tight line-clamp-2">
              {book.title}
            </p>
          </div>
          {book.isNew && (
            <div className="absolute top-1.5 left-1.5 bg-[#815854] rounded px-1.5 py-0.5">
              <span className="text-white text-[8px] font-bold">НОВИНКА</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

// ── AuthorCard ────────────────────────────────────────────────────────────────
function AuthorCard({ author }: { author: (typeof authors)[0] }) {
  const initial = author.name.charAt(0).toUpperCase();

  return (
    <Link href={`/catalog?author=${author.id}`} className="flex-shrink-0">
      <div className="flex flex-col items-center" style={{ width: 110 }}>
        {/* Portrait circle */}
        <div className="w-20 h-20 rounded-full overflow-hidden bg-[#D4C4A4] border-2 border-[#815854]/20 flex items-center justify-center mb-2">
          {author.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={author.image}
              alt={author.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-playfair text-2xl font-bold text-[#815854]/60">{initial}</span>
          )}
        </div>
        <p className="text-[#1C0F0A] font-semibold text-xs text-center leading-tight line-clamp-2 mb-0.5">
          {author.name}
        </p>
        <p className="text-[#A08060] text-[10px]">{author.booksCount} книг</p>
      </div>
    </Link>
  );
}

// ── Section heading ───────────────────────────────────────────────────────────
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-playfair text-xl font-bold text-[#1C0F0A] mb-4">{children}</h2>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div className="pb-32 px-4 pt-2">
      {/* Continue Listening */}
      <section className="mb-8">
        <SectionTitle>Продолжить прослушивание</SectionTitle>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar">
          {recentBooks.map((book, idx) => (
            <ContinueCard key={book.id} book={book} chapterNum={idx + 1} />
          ))}
        </div>
      </section>

      {/* New Releases */}
      <section className="mb-8">
        <SectionTitle>Новые публикации</SectionTitle>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar">
          {newBooks.map((book) => (
            <SmallBookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* Author Catalog */}
      <section>
        <SectionTitle>Каталог</SectionTitle>
        <div className="flex gap-4 overflow-x-auto pb-2 -mx-4 px-4 no-scrollbar">
          {authors.map((author) => (
            <AuthorCard key={author.id} author={author} />
          ))}
        </div>
      </section>
    </div>
  );
}
