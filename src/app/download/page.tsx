import Link from "next/link";
import {
  Smartphone,
  Download,
  Wifi,
  Moon,
  Bookmark,
  Zap,
  Star,
} from "lucide-react";

const features = [
  {
    icon: Download,
    title: "Загрузка для офлайн",
    description: "Скачивайте книги и слушайте без интернета в любом месте",
  },
  {
    icon: Moon,
    title: "Таймер сна",
    description: "Засыпайте под чтение — плеер остановится сам в нужное время",
  },
  {
    icon: Bookmark,
    title: "Закладки и заметки",
    description: "Отмечайте важные места и добавляйте свои комментарии",
  },
  {
    icon: Zap,
    title: "Скорость воспроизведения",
    description: "Слушайте с комфортной для вас скоростью: 1x, 1.25x, 1.5x, 2x",
  },
  {
    icon: Wifi,
    title: "Синхронизация",
    description: "Продолжайте слушать с любого устройства с того места, где остановились",
  },
  {
    icon: Star,
    title: "Рекомендации",
    description: "Умные рекомендации на основе ваших предпочтений",
  },
];

export default function DownloadPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9A66B]/30 bg-[#C9A66B]/10 text-[#C9A66B] text-xs font-medium mb-6 tracking-wider uppercase">
            <Smartphone className="w-3.5 h-3.5" />
            Мобильное приложение
          </div>
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-[#F7F1E8] mb-4">
            Слушайте везде и всегда
          </h1>
          <p className="text-[#F7F1E8]/60 text-lg max-w-xl mx-auto">
            Установите приложение Gaudiobooks и носите библиотеку духовных
            знаний в кармане
          </p>
        </div>

        {/* Store Cards */}
        <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto mb-20">
          {/* App Store */}
          <div className="card-glow p-8 text-center group cursor-pointer hover:border-[#C9A66B]/50 transition-all">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-white/10 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg viewBox="0 0 24 24" className="w-9 h-9 fill-white">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
            </div>
            <p className="text-[#F7F1E8]/40 text-xs uppercase tracking-widest mb-1">
              Доступно в
            </p>
            <h2 className="font-playfair text-2xl font-bold text-[#F7F1E8] mb-2">
              App Store
            </h2>
            <p className="text-[#F7F1E8]/40 text-sm mb-6">
              iOS 15.0 и выше
            </p>
            <div className="flex items-center justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-[#C9A66B] fill-current" />
              ))}
              <span className="text-[#F7F1E8]/40 text-xs ml-2">4.9 / 5</span>
            </div>
            <button className="w-full py-3 rounded-xl bg-[#C9A66B] text-[#0E0E12] font-semibold text-sm hover:bg-[#D4B47C] transition-colors glow-sandalwood">
              Скачать для iPhone
            </button>
          </div>

          {/* Google Play */}
          <div className="card-glow p-8 text-center group cursor-pointer hover:border-[#C9A66B]/50 transition-all">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1a1a2e] to-[#16213e] border border-white/10 flex items-center justify-center mx-auto mb-6 shadow-lg">
              <svg viewBox="0 0 24 24" className="w-9 h-9">
                <path
                  fill="#EA4335"
                  d="M3.18 23.76A2.07 2.07 0 0 1 2 21.9V2.1A2.07 2.07 0 0 1 3.18.24L13.9 12z"
                />
                <path
                  fill="#FBBC05"
                  d="m17.46 15.7-3.56-3.7L3.18 23.76a2.35 2.35 0 0 0 2.68-.15z"
                />
                <path
                  fill="#4285F4"
                  d="m22 12c0 .72-.4 1.38-1.04 1.73L17.46 15.7 13.9 12l3.56-3.7 3.5 1.97A1.98 1.98 0 0 1 22 12"
                />
                <path
                  fill="#34A853"
                  d="M3.18.24 13.9 12 17.46 8.3 5.86.39A2.35 2.35 0 0 0 3.18.24"
                />
              </svg>
            </div>
            <p className="text-[#F7F1E8]/40 text-xs uppercase tracking-widest mb-1">
              Доступно в
            </p>
            <h2 className="font-playfair text-2xl font-bold text-[#F7F1E8] mb-2">
              Google Play
            </h2>
            <p className="text-[#F7F1E8]/40 text-sm mb-6">
              Android 8.0 и выше
            </p>
            <div className="flex items-center justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-[#C9A66B] fill-current" />
              ))}
              <span className="text-[#F7F1E8]/40 text-xs ml-2">4.8 / 5</span>
            </div>
            <button className="w-full py-3 rounded-xl bg-[#C9A66B] text-[#0E0E12] font-semibold text-sm hover:bg-[#D4B47C] transition-colors glow-sandalwood">
              Скачать для Android
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="mb-20">
          <h2 className="font-playfair text-3xl font-bold text-[#F7F1E8] text-center mb-12">
            Всё, что нужно для вдумчивого слушания
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="card-glow p-6">
                <div className="w-10 h-10 rounded-xl bg-[#C9A66B]/10 border border-[#C9A66B]/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-[#C9A66B]" />
                </div>
                <h3 className="font-semibold text-[#F7F1E8] mb-2">{feature.title}</h3>
                <p className="text-[#F7F1E8]/50 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Screenshots mockup */}
        <div className="text-center">
          <h2 className="font-playfair text-3xl font-bold text-[#F7F1E8] mb-4">
            Красивый и удобный интерфейс
          </h2>
          <p className="text-[#F7F1E8]/50 mb-10">
            Разработан с вниманием к деталям для лучшего опыта прослушивания
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-44 h-80 rounded-3xl border-2 border-[#C9A66B]/20 bg-gradient-to-b from-[#1A1A22] to-[#0E0E12] overflow-hidden shadow-2xl shadow-black/50 flex-shrink-0"
              >
                <div className="w-full h-full bg-gradient-to-br from-[#C9A66B]/5 to-transparent flex items-center justify-center">
                  <Smartphone className="w-16 h-16 text-[#C9A66B]/20" />
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-[#F7F1E8]/20 text-sm">
            Скриншоты будут добавлены после выхода приложения
          </p>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <p className="text-[#F7F1E8]/50 text-sm mb-4">
            Пока приложение разрабатывается — слушайте прямо на сайте
          </p>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#C9A66B] text-[#0E0E12] font-semibold hover:bg-[#D4B47C] transition-all glow-sandalwood"
          >
            Открыть каталог
          </Link>
        </div>
      </div>
    </div>
  );
}
