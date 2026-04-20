import Link from "next/link";
import { Play, Smartphone } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0E0E12] via-[#111118] to-[#0E0E12]" />

      {/* Animated glow orbs */}
      <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-[#C9A66B]/5 blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full bg-[#C9A66B]/8 blur-3xl animate-pulse delay-1000" />

      {/* Decorative Sanskrit */}
      <div className="absolute top-12 right-8 text-[#C9A66B]/8 font-playfair text-7xl font-bold select-none hidden lg:block">
        ॐ
      </div>
      <div className="absolute bottom-16 left-8 text-[#C9A66B]/5 font-playfair text-5xl font-bold select-none hidden lg:block">
        हरे कृष्ण
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#C9A66B]/30 bg-[#C9A66B]/10 text-[#C9A66B] text-xs font-medium mb-8 tracking-wider uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A66B] animate-pulse" />
          Духовная мудрость в аудиоформате
        </div>

        <h1 className="font-playfair text-4xl sm:text-5xl lg:text-7xl font-bold text-[#F7F1E8] leading-tight mb-6">
          Слушайте{" "}
          <span className="text-gradient-gold">вечную мудрость</span>
          <br />
          в современном формате
        </h1>

        <p className="text-[#F7F1E8]/60 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Бхагавад-гита, Шримад-Бхагаватам, Чайтанья-чаритамрита и другие священные
          тексты гаудия-вайшнавской традиции — в профессиональном аудиоисполнении.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/catalog"
            className="group flex items-center gap-3 px-8 py-4 rounded-xl bg-[#C9A66B] text-[#0E0E12] font-semibold text-base hover:bg-[#D4B47C] transition-all duration-300 glow-sandalwood shadow-lg shadow-[#C9A66B]/20 w-full sm:w-auto justify-center"
          >
            <Play className="w-5 h-5" fill="currentColor" />
            Начать слушать
          </Link>
          <Link
            href="/download"
            className="flex items-center gap-3 px-8 py-4 rounded-xl border border-[#C9A66B]/30 bg-white/5 text-[#F7F1E8] font-semibold text-base hover:border-[#C9A66B]/60 hover:bg-white/8 transition-all duration-300 w-full sm:w-auto justify-center"
          >
            <Smartphone className="w-5 h-5 text-[#C9A66B]" />
            Скачать приложение
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex items-center justify-center gap-8 flex-wrap">
          {[
            { value: "120+", label: "книг" },
            { value: "50+", label: "авторов" },
            { value: "10 000+", label: "слушателей" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-playfair text-2xl font-bold text-[#C9A66B]">{stat.value}</div>
              <div className="text-[#F7F1E8]/40 text-xs mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0E0E12] to-transparent" />
    </section>
  );
}
