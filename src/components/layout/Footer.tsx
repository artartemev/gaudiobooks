import Link from "next/link";
import { BookAudio, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#C9A66B]/15 bg-[#0E0E12] mt-auto pb-24 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#C9A66B]/10 border border-[#C9A66B]/30 flex items-center justify-center">
                <BookAudio className="w-4 h-4 text-[#C9A66B]" />
              </div>
              <span className="font-playfair text-xl font-bold text-gradient-gold">
                Gaudiobooks
              </span>
            </Link>
            <p className="text-[#F7F1E8]/50 text-sm leading-relaxed max-w-xs">
              Платформа духовных аудиокниг гаудия-вайшнавской традиции. Слушайте
              вечную мудрость в современном формате.
            </p>
            <p className="mt-4 text-[#F7F1E8]/40 text-xs">
              Начитывает: Субал Сакха дас
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-[#C9A66B] font-semibold text-sm mb-4 uppercase tracking-wider">
              Навигация
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Главная" },
                { href: "/catalog", label: "Каталог книг" },
                { href: "/about", label: "О проекте" },
                { href: "/download", label: "Скачать приложение" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[#F7F1E8]/50 hover:text-[#C9A66B] text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-[#C9A66B] font-semibold text-sm mb-4 uppercase tracking-wider">
              Поддержка
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/donate", label: "Поддержать проект" },
                { href: "https://patreon.com", label: "Patreon", external: true },
                { href: "https://boosty.to", label: "Boosty", external: true },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-[#F7F1E8]/50 hover:text-[#C9A66B] text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t border-[#C9A66B]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[#F7F1E8]/30 text-xs">
            © 2024 Gaudiobooks. Распространяется с любовью.
          </p>
          <p className="text-[#F7F1E8]/30 text-xs flex items-center gap-1">
            Сделано с <Heart className="w-3 h-3 text-[#C9A66B]" /> для служения
          </p>
        </div>
      </div>
    </footer>
  );
}
