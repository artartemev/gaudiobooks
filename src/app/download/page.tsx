import Link from "next/link";
import {
  Smartphone,
  Download,
  Search,
  BookOpen,
  Play,
  Sparkles,
  Star,
} from "lucide-react";

const APP_STORE_URL = "https://apps.apple.com/us/app/gaudio-books/id6737453115";
const GOOGLE_PLAY_URL = "https://play.google.com/store/apps/details?id=com.gaudio";

const features = [
  {
    icon: BookOpen,
    title: "Огромная библиотека",
    description: "Аудиокниги по гаудия-вайшнавизму — всё собрано в одном месте",
  },
  {
    icon: Search,
    title: "Удобный поиск",
    description: "Быстро находите нужную книгу или автора",
  },
  {
    icon: Download,
    title: "Прослушивание офлайн",
    description: "Скачивайте книги и слушайте без интернета в любом месте",
  },
  {
    icon: Play,
    title: "Продолжайте с места остановки",
    description: "Приложение запомнит, где вы остановились, и продолжит оттуда",
  },
  {
    icon: Sparkles,
    title: "Лёгкий и приятный интерфейс",
    description: "Чистый дизайн без лишнего — ничто не отвлекает от слушания",
  },
];

export default function DownloadPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-medium mb-6 tracking-wider uppercase"
            style={{
              borderColor: "color-mix(in srgb, var(--accent) 30%, transparent)",
              background: "color-mix(in srgb, var(--accent) 10%, transparent)",
              color: "var(--accent)",
            }}
          >
            <Smartphone className="w-3.5 h-3.5" />
            Мобильное приложение
          </div>
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold mb-4" style={{ color: "var(--text)" }}>
            Слушайте везде и всегда
          </h1>
          <p className="text-lg max-w-xl mx-auto" style={{ color: "var(--text-2)" }}>
            Установите приложение Gaudiobooks и носите библиотеку духовных
            знаний в кармане
          </p>
        </div>

        {/* Store Cards */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-20">
          {/* App Store */}
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="card-base p-8 text-center group cursor-pointer"
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg border"
              style={{
                background: "var(--bg-3)",
                borderColor: "var(--border)",
              }}
            >
              <svg viewBox="0 0 24 24" className="w-9 h-9" style={{ fill: "var(--text)" }}>
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
            </div>
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--text-3)" }}>
              Доступно в
            </p>
            <h2 className="font-playfair text-2xl font-bold mb-2" style={{ color: "var(--text)" }}>
              App Store
            </h2>
            <p className="text-sm mb-6" style={{ color: "var(--text-3)" }}>
              iOS 15.0 и выше
            </p>
            <div className="flex items-center justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" style={{ color: "var(--accent)" }} />
              ))}
              <span className="text-xs ml-2" style={{ color: "var(--text-3)" }}>4.9 / 5</span>
            </div>
            <span
              className="block w-full py-3 rounded-xl font-semibold text-sm transition-all group-hover:opacity-90"
              style={{ background: "var(--accent)", color: "var(--bg)" }}
            >
              Скачать для iPhone
            </span>
          </a>

          {/* Google Play */}
          <a
            href={GOOGLE_PLAY_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="card-base p-8 text-center group cursor-pointer"
          >
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg border"
              style={{
                background: "var(--bg-3)",
                borderColor: "var(--border)",
              }}
            >
              <svg viewBox="0 0 24 24" className="w-9 h-9">
                <path fill="#EA4335" d="M3.18 23.76A2.07 2.07 0 0 1 2 21.9V2.1A2.07 2.07 0 0 1 3.18.24L13.9 12z" />
                <path fill="#FBBC05" d="m17.46 15.7-3.56-3.7L3.18 23.76a2.35 2.35 0 0 0 2.68-.15z" />
                <path fill="#4285F4" d="m22 12c0 .72-.4 1.38-1.04 1.73L17.46 15.7 13.9 12l3.56-3.7 3.5 1.97A1.98 1.98 0 0 1 22 12" />
                <path fill="#34A853" d="M3.18.24 13.9 12 17.46 8.3 5.86.39A2.35 2.35 0 0 0 3.18.24" />
              </svg>
            </div>
            <p className="text-xs uppercase tracking-widest mb-1" style={{ color: "var(--text-3)" }}>
              Доступно в
            </p>
            <h2 className="font-playfair text-2xl font-bold mb-2" style={{ color: "var(--text)" }}>
              Google Play
            </h2>
            <p className="text-sm mb-6" style={{ color: "var(--text-3)" }}>
              Android 8.0 и выше
            </p>
            <div className="flex items-center justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" style={{ color: "var(--accent)" }} />
              ))}
              <span className="text-xs ml-2" style={{ color: "var(--text-3)" }}>4.8 / 5</span>
            </div>
            <span
              className="block w-full py-3 rounded-xl font-semibold text-sm transition-all group-hover:opacity-90"
              style={{ background: "var(--accent)", color: "var(--bg)" }}
            >
              Скачать для Android
            </span>
          </a>
        </div>

        {/* Features */}
        <div className="mb-20">
          <h2 className="font-playfair text-3xl font-bold text-center mb-12" style={{ color: "var(--text)" }}>
            Всё, что нужно для вдумчивого слушания
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="card-base p-6">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 border"
                  style={{
                    background: "color-mix(in srgb, var(--accent) 10%, transparent)",
                    borderColor: "var(--border)",
                  }}
                >
                  <feature.icon className="w-5 h-5" style={{ color: "var(--accent)" }} />
                </div>
                <h3 className="font-semibold mb-2" style={{ color: "var(--text)" }}>{feature.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-sm mb-4" style={{ color: "var(--text-3)" }}>
            Не хотите устанавливать приложение? Слушайте прямо на сайте
          </p>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all hover:opacity-90"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
          >
            Открыть каталог
          </Link>
        </div>
      </div>
    </div>
  );
}
