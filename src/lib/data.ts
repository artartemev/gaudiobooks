export const authors = [
  { id: 'prabhupada', name: 'А.Ч. Бхактиведанта Свами Прабхупада', booksCount: 45 },
  { id: 'bhaktivinoda', name: 'Бхактивинода Тхакур', booksCount: 20 },
  { id: 'visvanatha', name: 'Вишванатха Чакраварти Тхакур', booksCount: 15 },
  { id: 'rupa', name: 'Рупа Госвами', booksCount: 8 },
  { id: 'krishnadasa', name: 'Кришнадаса Кавираджа Госвами', booksCount: 5 },
]

export interface Book {
  id: string
  slug: string
  title: string
  author: string
  authorId: string
  duration: string
  chapters: number
  description: string
  isNew: boolean
  isPopular: boolean
  cover?: string
}

export const books: Book[] = [
  {
    id: 'bhagavad-gita',
    slug: 'bhagavad-gita',
    title: 'Бхагавад-гита как она есть',
    author: 'А.Ч. Бхактиведанта Свами Прабхупада',
    authorId: 'prabhupada',
    duration: '18ч 45м',
    chapters: 18,
    description: 'Бхагавад-гита — одно из важнейших произведений мировой духовной литературы. Данное издание представляет собой классический перевод с комментариями Его Божественной Милости А.Ч. Бхактиведанты Свами Прабхупады. Беседа между Кришной и Арджуной на поле битвы Курукшетра раскрывает глубочайшую философию жизни, природу души, закон кармы и путь к освобождению.',
    isNew: false,
    isPopular: true,
    cover: 'https://picsum.photos/seed/bhagavad/400/600',
  },
  {
    id: 'srimad-bhagavatam-1',
    slug: 'srimad-bhagavatam-1',
    title: 'Шримад-Бхагаватам. Песнь Первая',
    author: 'А.Ч. Бхактиведанта Свами Прабхупада',
    authorId: 'prabhupada',
    duration: '24ч 10м',
    chapters: 19,
    description: 'Шримад-Бхагаватам — великий эпос ведической мудрости, составленный мудрецом Вьясадевой. Первая Песнь посвящена творению вселенной и деяниям великих преданных Господа. Здесь повествуется о встрече царя Парикшита с мудрецом Шукадевой Госвами, о последних часах великих героев, покинувших мир после битвы на Курукшетре.',
    isNew: false,
    isPopular: true,
    cover: 'https://picsum.photos/seed/bhagavatam1/400/600',
  },
  {
    id: 'chaitanya-charitamrita-1',
    slug: 'chaitanya-charitamrita-1',
    title: 'Чайтанья-чаритамрита. Ади-лила',
    author: 'Кришнадаса Кавираджа Госвами',
    authorId: 'krishnadasa',
    duration: '30ч 20м',
    chapters: 17,
    description: 'Чайтанья-чаритамрита — биография и философское учение Шри Чайтаньи Махапрабху, написанная Кришнадасой Кавираджей Госвами. Ади-лила охватывает ранние игры Господа Чайтаньи, Его духовную миссию и учение о санкиртане — совместном воспевании Святых Имён Господа как главном методе духовного самопознания в эпоху Кали.',
    isNew: true,
    isPopular: false,
    cover: 'https://picsum.photos/seed/chaitanya/400/600',
  },
  {
    id: 'nectar-of-devotion',
    slug: 'nectar-of-devotion',
    title: 'Нектар преданности',
    author: 'А.Ч. Бхактиведанта Свами Прабхупада',
    authorId: 'prabhupada',
    duration: '15ч 30м',
    chapters: 42,
    description: 'Нектар преданности — полное изложение науки бхакти-йоги, основанное на Бхакти-расамрита-синдху Рупы Госвами. В книге детально описаны все аспекты преданного служения: от основных принципов до высших форм экстатической любви к Богу. Это незаменимое руководство для всех, кто стремится к духовному совершенству.',
    isNew: true,
    isPopular: true,
    cover: 'https://picsum.photos/seed/nectar/400/600',
  },
  {
    id: 'jaiva-dharma',
    slug: 'jaiva-dharma',
    title: 'Джайва-дхарма',
    author: 'Бхактивинода Тхакур',
    authorId: 'bhaktivinoda',
    duration: '22ч 15м',
    chapters: 39,
    description: 'Джайва-дхарма — классический духовный роман Бхактиноды Тхакура, раскрывающий вечную природу живого существа и его взаимоотношения с Верховным Господом. Через диалоги учителей и учеников автор излагает глубокую философию гаудия-вайшнавизма, отличая вечную дхарму от временных религиозных практик.',
    isNew: false,
    isPopular: false,
    cover: 'https://picsum.photos/seed/jaiva/400/600',
  },
  {
    id: 'bhakti-rasamrita-sindhu',
    slug: 'bhakti-rasamrita-sindhu',
    title: 'Бхакти-расамрита-синдху',
    author: 'Рупа Госвами',
    authorId: 'rupa',
    duration: '12ч 45м',
    chapters: 28,
    description: 'Бхакти-расамрита-синдху — Океан нектара чистого преданного служения. Этот труд великого Рупы Госвами является фундаментальным произведением гаудия-вайшнавской философии. В нём систематически изложены все уровни и проявления бхакти — преданного служения Господу Кришне.',
    isNew: false,
    isPopular: false,
    cover: 'https://picsum.photos/seed/bhakti/400/600',
  },
]

export const bookChapters: Record<string, Array<{ number: number; title: string; duration: string }>> = {
  'bhagavad-gita': [
    { number: 1, title: 'Наблюдение за армиями на поле битвы Курукшетра', duration: '58м' },
    { number: 2, title: 'Содержание Гиты вкратце', duration: '1ч 12м' },
    { number: 3, title: 'Карма-йога', duration: '48м' },
    { number: 4, title: 'Трансцендентное знание', duration: '1ч 02м' },
    { number: 5, title: 'Карма-йога — действие в сознании Кришны', duration: '45м' },
    { number: 6, title: 'Дхьяна-йога', duration: '55м' },
    { number: 7, title: 'Знание об Абсолютной Истине', duration: '50м' },
    { number: 8, title: 'Достижение Высшего', duration: '48м' },
    { number: 9, title: 'Самое сокровенное знание', duration: '52м' },
    { number: 10, title: 'Мистическое могущество Верховного', duration: '58м' },
    { number: 11, title: 'Вселенская форма', duration: '1ч 05м' },
    { number: 12, title: 'Преданное служение', duration: '35м' },
    { number: 13, title: 'Природа, наслаждающийся и сознание', duration: '1ч 15м' },
    { number: 14, title: 'Три гуны материальной природы', duration: '42м' },
    { number: 15, title: 'Йога Верховной Личности', duration: '40м' },
    { number: 16, title: 'Божественные и демонические натуры', duration: '45м' },
    { number: 17, title: 'Три вида веры', duration: '42м' },
    { number: 18, title: 'Заключение — совершенство отречения', duration: '1ч 38м' },
  ],
  'nectar-of-devotion': Array.from({ length: 42 }, (_, i) => ({
    number: i + 1,
    title: `Глава ${i + 1}`,
    duration: `${20 + Math.floor(Math.random() * 20)}м`,
  })),
}
