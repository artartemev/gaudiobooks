import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer
      className="border-t mt-auto pb-24 md:pb-0"
      style={{ background: "var(--bg)", borderColor: "var(--border)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <Image
                src="/logo.svg"
                alt="Gaudiobooks"
                width={140}
                height={24}
                style={{ height: "22px", width: "auto" }}
                className="dark:brightness-150 dark:saturate-50"
              />
            </Link>
            <p className="text-sm leading-relaxed max-w-xs" style={{ color: "var(--text-3)" }}>
              Платформа духовных аудиокниг гаудия-вайшнавской традиции. Слушайте
              вечную мудрость в современном формате.
            </p>
            <p className="mt-4 text-xs" style={{ color: "var(--text-3)" }}>
              Начитывает: Субала Сакха дас
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold text-xs mb-4 uppercase tracking-wider" style={{ color: "var(--accent)" }}>
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
                    className="text-sm transition-colors duration-200 hover:opacity-100 opacity-70"
                    style={{ color: "var(--text-2)" }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support — hidden for now */}
        </div>

        {/* Bottom */}
        <div
          className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: "var(--border)" }}
        >
          <p className="text-xs" style={{ color: "var(--text-3)" }}>
            © 2024 Gaudiobooks. Распространяется с любовью.
          </p>
          <p className="text-xs flex items-center gap-1" style={{ color: "var(--text-3)" }}>
            Сделано с <Heart className="w-3 h-3" style={{ color: "var(--accent)" }} /> для служения
          </p>
        </div>
      </div>
    </footer>
  );
}
