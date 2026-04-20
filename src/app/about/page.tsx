import Image from "next/image";
import Link from "next/link";
import { Heart, Mic, BookOpen, Globe, ArrowRight } from "lucide-react";

const milestones = [
  {
    year: "2020",
    title: "Идея и начало",
    description:
      "Субал Сакха дас начал делать первые аудиозаписи для личного пользования. Друзья и единомышленники попросили поделиться — так зародилась идея проекта.",
  },
  {
    year: "2021",
    title: "Первые записи",
    description:
      "Были записаны первые главы Бхагавад-гиты. Качество звука и глубина передачи текста сразу получили высокую оценку слушателей.",
  },
  {
    year: "2022",
    title: "Запуск платформы",
    description:
      "Создан веб-сайт Gaudiobooks. Каталог вырос до 30 книг, аудитория перешагнула отметку в 2000 постоянных слушателей.",
  },
  {
    year: "2023",
    title: "Рост и развитие",
    description:
      "Более 80 аудиокниг, сотрудничество с вайшнавскими общинами по всему миру. Начало работы над мобильным приложением.",
  },
  {
    year: "2024",
    title: "Сегодня",
    description:
      "120+ книг в каталоге, 10 000+ слушателей, активное развитие технической платформы и расширение библиотеки.",
  },
];

const values = [
  {
    icon: BookOpen,
    title: "Верность источнику",
    description:
      "Мы стремимся максимально точно и глубоко передать смысл и дух оригинальных текстов",
  },
  {
    icon: Mic,
    title: "Качество звука",
    description:
      "Профессиональная запись в студийных условиях обеспечивает комфортное прослушивание",
  },
  {
    icon: Globe,
    title: "Доступность",
    description:
      "Все аудиокниги доступны бесплатно — духовное знание должно быть открыто для всех",
  },
  {
    icon: Heart,
    title: "Служение",
    description:
      "Проект создаётся из любви к традиции и желания распространять духовное знание",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero */}
        <div className="text-center mb-20">
          <h1 className="font-playfair text-4xl sm:text-5xl font-bold mb-6" style={{ color: "var(--text)" }}>
            О проекте{" "}
            <span className="text-gradient-gold">Gaudiobooks</span>
          </h1>
          <p className="text-xl leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--text-2)" }}>
            Мы создаём пространство для знакомства с великим наследием
            гаудия-вайшнавской традиции через силу живого голоса и современные
            технологии.
          </p>
        </div>

        {/* Mission */}
        <div
          className="relative overflow-hidden rounded-2xl p-10 mb-20 text-center border"
          style={{
            background: "color-mix(in srgb, var(--accent) 6%, var(--bg-2))",
            borderColor: "var(--border)",
          }}
        >
          <div
            className="absolute top-0 left-1/2 w-80 h-80 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ background: "color-mix(in srgb, var(--accent) 8%, transparent)" }}
          />
          <div className="relative">
            <div className="font-playfair text-6xl mb-4" style={{ color: "color-mix(in srgb, var(--accent) 25%, transparent)" }}>ॐ</div>
            <h2 className="font-playfair text-2xl sm:text-3xl font-bold mb-4" style={{ color: "var(--text)" }}>
              Наша миссия
            </h2>
            <p className="text-lg leading-relaxed max-w-2xl mx-auto" style={{ color: "var(--text-2)" }}>
              Сделать вечную мудрость Вед доступной каждому ищущему. Мы верим, что
              аудиоформат — один из самых живых и непосредственных способов соприкоснуться
              со священными текстами. Голос несёт вибрацию, а вибрация — это само сознание.
            </p>
          </div>
        </div>

        {/* Narrator */}
        <div className="mb-20">
          <h2 className="font-playfair text-3xl font-bold mb-10 text-center" style={{ color: "var(--text)" }}>
            Голос проекта
          </h2>
          <div className="card-base p-8 flex flex-col sm:flex-row gap-8 items-center sm:items-start">
            <div className="flex-shrink-0">
              <div
                className="w-32 h-32 rounded-full border-2 flex items-center justify-center overflow-hidden"
                style={{
                  background: "color-mix(in srgb, var(--accent) 10%, var(--bg-3))",
                  borderColor: "color-mix(in srgb, var(--accent) 30%, transparent)",
                }}
              >
                <Image
                  src="https://picsum.photos/seed/narrator/200/200"
                  alt="Субал Сакха дас"
                  width={128}
                  height={128}
                  className="object-cover rounded-full"
                />
              </div>
            </div>
            <div>
              <h3 className="font-playfair text-2xl font-bold mb-1" style={{ color: "var(--text)" }}>
                Субал Сакха дас
              </h3>
              <p className="mb-4" style={{ color: "var(--accent)" }}>Диктор и основатель проекта</p>
              <p className="leading-relaxed mb-4" style={{ color: "var(--text-2)" }}>
                Субал Сакха дас — преданный гаудия-вайшнавской традиции с более чем
                20-летним опытом изучения и практики. Получив образование в области
                санскрита и ведической философии, он посвятил своё служение доступному
                изложению сложных философских концепций.
              </p>
              <p className="leading-relaxed" style={{ color: "var(--text-2)" }}>
                Его голос отличается особой теплотой и глубиной — качествами, которые
                помогают слушателю не просто воспринимать информацию, но и чувствовать
                живую связь с традицией. Каждая запись — это не просто чтение, но
                медитация и молитва.
              </p>
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="font-playfair text-3xl font-bold mb-10 text-center" style={{ color: "var(--text)" }}>
            Наши ценности
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((value) => (
              <div key={value.title} className="card-base p-6 flex gap-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 border"
                  style={{
                    background: "color-mix(in srgb, var(--accent) 10%, transparent)",
                    borderColor: "var(--border)",
                  }}
                >
                  <value.icon className="w-5 h-5" style={{ color: "var(--accent)" }} />
                </div>
                <div>
                  <h3 className="font-semibold mb-2" style={{ color: "var(--text)" }}>{value.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
                    {value.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="mb-20">
          <h2 className="font-playfair text-3xl font-bold mb-10 text-center" style={{ color: "var(--text)" }}>
            История проекта
          </h2>
          <div className="relative">
            {/* Line */}
            <div
              className="absolute left-8 top-0 bottom-0 w-px"
              style={{ background: "linear-gradient(to bottom, color-mix(in srgb, var(--accent) 40%, transparent), color-mix(in srgb, var(--accent) 10%, transparent), transparent)" }}
            />

            <div className="space-y-8">
              {milestones.map((milestone) => (
                <div key={milestone.year} className="flex gap-6 pl-4">
                  <div className="relative flex-shrink-0 w-8">
                    <div
                      className="absolute left-1/2 top-1.5 -translate-x-1/2 w-3 h-3 rounded-full"
                      style={{
                        background: "var(--accent)",
                        boxShadow: "0 0 8px color-mix(in srgb, var(--accent) 60%, transparent)",
                      }}
                    />
                  </div>
                  <div className="pb-8">
                    <div className="text-sm font-bold mb-1" style={{ color: "var(--accent)" }}>
                      {milestone.year}
                    </div>
                    <h3 className="font-semibold mb-2" style={{ color: "var(--text)" }}>{milestone.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--text-3)" }}>
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="font-playfair text-3xl font-bold mb-4" style={{ color: "var(--text)" }}>
            Станьте частью нашего сообщества
          </h2>
          <p className="mb-8 max-w-lg mx-auto" style={{ color: "var(--text-3)" }}>
            Поддержите проект и помогите нам продолжать эту важную работу по
            распространению духовного знания
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <Link
              href="/donate"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold transition-all hover:opacity-90"
              style={{ background: "var(--accent)", color: "var(--bg)" }}
            >
              <Heart className="w-5 h-5" />
              Поддержать
            </Link>
            <Link
              href="/catalog"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border font-semibold transition-all hover:opacity-80"
              style={{ borderColor: "var(--border)", color: "var(--text)" }}
            >
              Слушать книги <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
