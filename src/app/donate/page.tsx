import Link from "next/link";
import { Heart, ExternalLink, CreditCard, CheckCircle, ArrowRight } from "lucide-react";

const donationOptions = [
  {
    name: "Patreon",
    description:
      "Ежемесячная подписка с доступом к эксклюзивному контенту, закулисным видео и прямым общением с командой",
    emoji: "🎨",
    buttonText: "Поддержать на Patreon",
    href: "https://patreon.com",
    tiers: ["от 3$/мес — Основная поддержка", "от 10$/мес — Ранний доступ к записям", "от 25$/мес — Поддержка + персональное общение"],
  },
  {
    name: "Boosty",
    description:
      "Российская платформа поддержки авторов. Удобная оплата рублями, разовые донаты или подписка на любой срок",
    emoji: "🚀",
    buttonText: "Поддержать на Boosty",
    href: "https://boosty.to",
    tiers: ["Разовый донат — любая сумма", "от 200₽/мес — Подписчик", "от 500₽/мес — Активный поддержатель"],
  },
  {
    name: "Stripe / Карта",
    description:
      "Прямой донат банковской картой через защищённый платёжный шлюз Stripe. Принимаем Visa, Mastercard, Мир",
    emoji: "💳",
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
          <div
            className="inline-flex w-16 h-16 rounded-full items-center justify-center mx-auto mb-6 border"
            style={{
              background: "color-mix(in srgb, var(--accent) 10%, transparent)",
              borderColor: "color-mix(in srgb, var(--accent) 30%, transparent)",
            }}
          >
            <Heart className="w-7 h-7" fill="currentColor" style={{ color: "var(--accent)" }} />
          </div>
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold mb-4" style={{ color: "var(--text)" }}>
            Поддержите миссию
          </h1>
          <p className="text-xl max-w-2xl mx-auto leading-relaxed" style={{ color: "var(--text-2)" }}>
            Каждое пожертвование помогает нам создавать новые аудиокниги, улучшать
            качество записей и делать духовное знание доступным для всех
          </p>
        </div>

        {/* Motivational quote */}
        <div
          className="relative overflow-hidden rounded-2xl border p-8 mb-16 text-center"
          style={{
            background: "color-mix(in srgb, var(--accent) 6%, var(--bg-2))",
            borderColor: "var(--border)",
          }}
        >
          <div className="font-playfair italic text-xl sm:text-2xl leading-relaxed mb-4" style={{ color: "var(--accent)" }}>
            «Тот, кто распространяет это высшее знание среди преданных, несомненно
            достигнет Меня»
          </div>
          <p className="text-sm" style={{ color: "var(--text-3)" }}>— Бхагавад-гита 18.68</p>
        </div>

        {/* Donation Options */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {donationOptions.map((option) => (
            <div key={option.name} className="card-base p-6 flex flex-col">
              <div className="text-4xl mb-4">{option.emoji}</div>
              <h3 className="font-playfair text-xl font-bold mb-3" style={{ color: "var(--text)" }}>
                {option.name}
              </h3>
              <p className="text-sm leading-relaxed mb-6 flex-1" style={{ color: "var(--text-2)" }}>
                {option.description}
              </p>
              <ul className="space-y-2 mb-6">
                {option.tiers.map((tier) => (
                  <li key={tier} className="flex items-start gap-2 text-xs" style={{ color: "var(--text-3)" }}>
                    <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" style={{ color: "color-mix(in srgb, var(--accent) 60%, transparent)" }} />
                    {tier}
                  </li>
                ))}
              </ul>
              <a
                href={option.href}
                target={option.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-sm transition-all hover:opacity-90 w-full"
                style={{ background: "var(--accent)", color: "var(--bg)" }}
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
          <h2 className="font-playfair text-3xl font-bold text-center mb-8" style={{ color: "var(--text)" }}>
            Что даёт ваша поддержка?
          </h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {impactItems.map((item) => (
              <div key={item.text} className="card-base p-5 flex items-center gap-4">
                <span className="text-3xl flex-shrink-0">{item.emoji}</span>
                <p className="text-sm" style={{ color: "var(--text-2)" }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stripe Form placeholder */}
        <div id="stripe" className="card-base p-8 mb-16">
          <div className="flex items-center gap-3 mb-6">
            <CreditCard className="w-5 h-5" style={{ color: "var(--accent)" }} />
            <h3 className="font-playfair text-xl font-bold" style={{ color: "var(--text)" }}>
              Пожертвование картой
            </h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-3 mb-6">
            {[300, 500, 1000, 2000, 5000].map((amount) => (
              <button
                key={amount}
                className="py-3 rounded-xl border text-sm transition-all hover:opacity-80"
                style={{ borderColor: "var(--border)", color: "var(--text-2)" }}
              >
                {amount.toLocaleString("ru")} ₽
              </button>
            ))}
            <button
              className="py-3 rounded-xl border text-sm transition-all hover:opacity-80"
              style={{ borderColor: "var(--border)", color: "var(--text-2)" }}
            >
              Другая сумма
            </button>
          </div>
          <button
            className="w-full py-4 rounded-xl font-semibold transition-all hover:opacity-90 flex items-center justify-center gap-2"
            style={{ background: "var(--accent)", color: "var(--bg)" }}
          >
            <CreditCard className="w-5 h-5" />
            Перейти к оплате
          </button>
          <p className="text-center text-xs mt-4" style={{ color: "var(--text-3)" }}>
            Защищено Stripe · PCI DSS compliant
          </p>
        </div>

        {/* Thank you */}
        <div className="text-center">
          <h2 className="font-playfair text-2xl font-bold mb-4" style={{ color: "var(--text)" }}>
            Харе Кришна! 🙏
          </h2>
          <p className="mb-8 max-w-lg mx-auto" style={{ color: "var(--text-3)" }}>
            Благодарим всех, кто уже поддерживает проект. Ваша любовь и помощь
            вдохновляют нас продолжать.
          </p>
          <Link
            href="/catalog"
            className="inline-flex items-center gap-2 transition-all hover:gap-3"
            style={{ color: "var(--accent)" }}
          >
            Перейти к каталогу <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
