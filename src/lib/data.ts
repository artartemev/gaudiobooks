import rawData from './authors-library.json'

// ─── Transliteration (Cyrillic → Latin for URL slugs) ───────────────────────
const TR: Record<string, string> = {
  а:'a', б:'b', в:'v', г:'g', д:'d', е:'e', ё:'yo', ж:'zh', з:'z', и:'i',
  й:'y', к:'k', л:'l', м:'m', н:'n', о:'o', п:'p', р:'r', с:'s', т:'t',
  у:'u', ф:'f', х:'kh', ц:'ts', ч:'ch', ш:'sh', щ:'shch', ъ:'', ы:'y',
  ь:'', э:'e', ю:'yu', я:'ya',
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .split('')
    .map(c => TR[c] ?? (c.match(/[a-z0-9]/) ? c : '-'))
    .join('')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatSeconds(sec: number | string): string {
  const s = Number(sec)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  return h > 0 ? `${h}ч ${m}м` : `${m}м`
}

function stripHtml(html: string): string {
  return (html ?? '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

// CDN base URL — set NEXT_PUBLIC_CDN_URL env var when deploying
export const CDN_BASE = process.env.NEXT_PUBLIC_CDN_URL ?? ''

// ─── Types ───────────────────────────────────────────────────────────────────
export interface Author {
  id: string
  name: string
  booksCount: number
  description: string
  image: string
}

export interface Track {
  id: string
  title: string
  file: string
  duration: string         // "16:41"
  durationSec: number      // 1001
  trackNumber: string
  partTitle: string
}

export interface Book {
  id: string
  slug: string
  title: string
  author: string
  authorId: string
  duration: string         // "45ч 36м"
  durationSec: number
  chapters: number         // total track count
  description: string
  isNew: boolean
  isPopular: boolean
  cover: string            // full URL or empty → shows fallback icon
  lastModified: number
}

// ─── Derived constants ───────────────────────────────────────────────────────
// "New" = modified within last 12 months relative to today (2026-04-20)
const ONE_YEAR_AGO = new Date('2025-04-20').getTime()

// Average track count across all books (used for isPopular threshold)
const totalTracks = rawData.authors.reduce(
  (sum, a) => sum + a.books.reduce((s, b) => s + b.parts.reduce((ss, p) => ss + p.tracks.length, 0), 0),
  0
)
const totalBooks = rawData.authors.reduce((sum, a) => sum + a.books.length, 0)
const avgTracks = totalTracks / totalBooks

// ─── Authors ─────────────────────────────────────────────────────────────────
export const authors: Author[] = rawData.authors.map(a => ({
  id: slugify(a.author),
  name: a.author,
  booksCount: a.books.length,
  description: a.description,
  image: a.image,
}))

// ─── Books + Chapters (built together to share slug dedup state) ──────────────
const _slugCounts: Record<string, number> = {}
const _tracksBySlug: Record<string, Track[]> = {}

export const books: Book[] = rawData.authors.flatMap(author => {
  const authorId = slugify(author.author)

  return author.books.map(book => {
    // Slug dedup: same title from different authors gets -2, -3 suffix
    const base = slugify(book.title)
    _slugCounts[base] = (_slugCounts[base] ?? 0) + 1
    const slug = _slugCounts[base] > 1 ? `${base}-${_slugCounts[base]}` : base

    // Flatten all tracks across all parts
    let trackIndex = 0
    const tracks: Track[] = book.parts.flatMap(part =>
      part.tracks.map(track => {
        trackIndex++
        return {
          id: track.id,
          title: track.title,
          file: track.file,
          duration: track.length_formatted,
          durationSec: track.length,
          trackNumber: track.track_number,
          partTitle: part.title ?? '',
        }
      })
    )
    _tracksBySlug[slug] = tracks

    const trackCount = tracks.length
    const isPopular = trackCount > avgTracks

    return {
      id: book.id,
      slug,
      title: book.title,
      author: author.author,
      authorId,
      duration: formatSeconds(book.time),
      durationSec: Number(book.time),
      chapters: trackCount,
      description: stripHtml(book.description || book.shortDescription || ''),
      isNew: book.lastModified > ONE_YEAR_AGO,
      isPopular,
      cover: CDN_BASE && book.image ? `${CDN_BASE}/${book.image}` : '',
      lastModified: book.lastModified,
    }
  })
})

// Map: slug → flat list of chapters (for Book page)
export const bookChapters: Record<string, Array<{ number: number; title: string; duration: string; partTitle: string }>> =
  Object.fromEntries(
    Object.entries(_tracksBySlug).map(([slug, tracks]) => [
      slug,
      tracks.map((t, i) => ({
        number: i + 1,
        title: t.title,
        duration: t.duration,
        partTitle: t.partTitle,
      })),
    ])
  )

// Map: slug → raw tracks (for the audio player)
export const bookTracks: Record<string, Track[]> = _tracksBySlug
