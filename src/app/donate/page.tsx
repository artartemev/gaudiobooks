import Link from "next/link";
import { Heart, ExternalLink, CreditCard, CheckCircle, ArrowRight } from "lucide-react";

const donationOptions = [
  {
    name: "Patreon",
    description:
      "Ежемесячная подписка с доступом к эксклюзивному контенту, закулисным видео и прямым общением с командой",
    icon: "/patreon.svg",
    emoji: "🎨",
    color: "from-[#FF424D]/10 to-[#FF424D]/5",
    border: "border-[#FF424D]/20 hover:border-[#FF424D]/50",
    buttonText: "Поддержать на Patreon",
    href: "https://patreon.com",
    tiers: ["от 3$/мес — Основная поддержка", "от 10$/мес — Ранний доступ к записям", "от 25$/мес — Поддержка + персональное общение"],
  },
  {
    name: "Boosty",
    description:
      "Российская платформа поддержки авторов. Удобная оплата рублями, разовые донаты или подписка на любой срок",
    icon: "/boosty.svg",
    emoji: "🚀",
    color: "from-[#FF6B35]/10 to-[#FF6B35]/5",
    border: "border-[#FF6B35]/20 hover:border-[#FF6B35]/50",
    buttonText: "Поддержать на Boosty",
    href: "https://boosty.to",
    tiers: ["Разовый донат — любая сумма", "от 200₽/мес — Подписчик", "от 500₽/мес — Активный поддержатель"],
  },
  {
    name: "Stripe / Карта",
    description:
      "Прямой донат банковской картой через защищённый платёжный шлюз Stripe. Принимаем Visa, Mastercard, Мир",
    icon: null,
    emoji: "💳",
    color: "from-[#635BFF]/10 to-[#635BFF]/5",
    border: "border-[#635BFF]/20 hover:border-[#635BFF]/50",
    buttonText: "Пожертвовать картой",
    href: "#stripe",
    tiers: ["Разовый перевод — любая сумма", "Выбери сумму сам", "100% идёт на проект"],
  },
];

const impactItems = [
  { emoji: "🎙️", text: "1 000₽ — покрывает час студийной записи" },
  { emoji: "📚", text: "5 000₽ — финансирует новую аудиокнигу" },
  { emoji: "💻", text: "10 000₽ — поддерживает сервер на месяц" },
  { emoji: "🌱", text: "50 000₽ — позволяет нанять редактора" },
];

export default function DonatePage() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex w-16 h-16 rounded-full bg-[#C9A66B]/10 border border-[#C9A66B]/30 items-center justify-center mx-auto mb-6">
            <Heart className="w-7 h-7 text-[#C9A66B]" fill="currentColor" />
          </div>
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold text-[#F7F1E8] mb-4">
            Поддержите миссию
          </h1>
          <p className="text-[#F7F1E8]/60 text-xl max-w-2xl mx-auto leading-relaxed">
            Каждое пожертвование помогает нам создавать новые аудиокниги, улучшать
            качество записей и делать духовное знание доступным для всех
          </p>
        </div>

        {/* Motivational quote */}
        <div className="relative overflow-hidden rounded-2xl border border-[#C9A66B]/20 bg-gradient-to-br from-[#C9A66B]/8 to-transparent p-8 mb-16 text-center">
          <div className="text-[#C9A66B] font-playfair italic text-xl sm:text-2xl leading-relaxed mb-4">
            «Тот, кто распространяет это высшее знание среди преданных, несомненно
            достигнет Меня»
          </div>
          <p className="text-[#F7F1E8]/40 text-sm">— Бхагавад-гита 18.68</p>
        </div>

        {/* Donation Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {donationOptions.map((option) => (
            <div
              key={option.name}
              className={`card-glow p-6 flex flex-col bg-gradient-to-br ${option.color} ${option.border} transition-all duration-300`}
            >
              <div className="text-4xl mb-4">{option.emoji}</div>
              <h3 className="font-playfair text-xl font-bold text-[#F7F1E8] mb-3">
                {option.name}
              </h3>
              <p className="text-[#F7F1E8]/50 text-sm leading-relaxed mb-6 flex-1">
                {option.description}
              </p>
              <ul className="space-y-2 mb-6">
                {option.tiers.map((tier) => (
                  <li key={tier} className="flex items-start gap-2 text-xs text-[#F7F1E8]/40">
                    <CheckCircle className="w-3.5 h-3.5 text-[#C9A66B]/60 flex-shrink-0 mt-0.5" />
                    {tier}
                  </li>
                ))}
              </ul>
              <a
                href={option.href}
                target={option.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#C9A66B] text-[#0E0E12] font-semibold text-sm hover:bg-[#D4B47C] transition-colors glow-sandalwood w-full"
              >
                {option.buttonText}
                {option.href.startsWith("http") && (
                  <ExternalLink className="w-3.5 h-3.5" />
                )}
              </a>
            </div>
          ))}
        </div>

        {/* Impact */}
        <div className="mb-16">
          <h2 className="font-playfair text-3xl font-bold text-[#F7F1E8] text-center mb-8">
            Что даёт ваша поддержка?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {impactItems.map((item) => (
              <div key={item.text} className="card-glow p-5 flex items-center gap-4">
                <span className="text-3xl flex-shrink-0">{item.emoji}</span>
                <p className="text-[#F7F1E8]/70 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stripe Form placeholder */}
        <div id="stripe" className="card-glow p-8 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <CreditCard className="w-5 h-5 text-[#C9A66B]" />
            <h3 className="font-playfair text-xl font-bold text-[#F7F1E8]">
              Пожертвование картой
            </h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-3 mb-6">
            {[300, 500, 1000, 2000, 5000].map((amount) => (
              <button
                key={amount}
                className="py-3 rounded-xl border border-[#C9A66B]/20 text-[#F7F1E8]/70 text-sm hover:border-[#C9A66B]/50 hover:text-[#C9A66B] transition-all"
              >
                {amount.toLocaleString("ru")} ₽
              </button>
            ))}
            <button className="py-3 rounded-xl border border-[#C9A66B]/20 text-[#F7F1E8]/70 text-sm hover:border-[#C9A66B]/50 hover:text-[#C9A66B] transition-all">
              Другая сумма
            </button>
          </div>
          <button className="w-full py-4 rounded-xl bg-[#C9A66B] text-[#0E0E12] font-semibold hover:bg-[#D4B47C] transition-colors glow-sandalwood flex items-center justify-center gap-2">
            <CreditCard className="w-5 h-5" />
            Перейти к оплате
          </button>
          <p className="text-center text-[#F7F1E8]/20 text-xs mt-4">
            Защищено Stripe · PCI DSS compliant
          </p>
        </div>

        {/* Thank you */}
        <div className="text-center">
          <h2 className="font-playfair text-2xl font-bold text-[#F7F1E8] mb-4">
            Харе Кришна! 🙏
          </h2>
          <p className="text-[#F7F1E8]/50 mb-8 max-w-lg mx-auto">
            Благодарим всех, кто уже поддерживает проект. Ваша любовь и помощь
            вдохновляют нас продолжать.
          </p>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 text-[#C9A66B] hover:gap-3 transition-all"
          >
            Перейти к каталогу <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
