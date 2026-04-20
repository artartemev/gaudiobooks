---
name: Project Gaudiobooks
description: Core context for the Gaudiobooks digital audiobook platform — tech stack, design system, pages, goals
type: project
---

Gaudiobooks is a Gaudiya Vaishnava audiobook platform being built from scratch.

**Why:** To distribute spiritual knowledge (Gaudiya Vaishnava texts) as audiobooks online and via mobile apps.

**How to apply:** All features, design decisions, and copy should align with this spiritual/cultural context. UI text is in Russian.

## Tech Stack
- Next.js 15 (App Router, src/ directory layout)
- Tailwind CSS v4
- shadcn/ui (slate base)
- TypeScript
- Jotai for global audio player state
- Supabase / Firebase for backend (planned)
- Audio streaming CDN (planned)

## Design System
- Deep Night `#0E0E12` — background
- Sandalwood `#C9A66B` — primary accent, CTAs, borders
- Cream `#F7F1E8` — main text
- Soft Gold glow via box-shadow rgba(201,166,107,0.3)
- Fonts: Geist Sans (body), Playfair Display (headings)

## Pages Built (all in src/app/)
- `/` — Home: Hero, stats, featured books, new releases
- `/catalog` — Searchable book grid, author filter, sort
- `/book/[slug]` — Book detail, chapter accordion, embedded player
- `/about` — Project history, narrator (Субал Сакха дас), mission
- `/donate` — Patreon/Boosty/Stripe donation options
- `/download` — App Store + Google Play download cards

## Key Components (src/components/)
- `AudioPlayer.tsx` — Fixed bottom bar: play/pause, progress, speed (1x/1.25/1.5/2x), sleep timer, bookmark
- `AudioPlayerWrapper.tsx` — Jotai global player state wrapper
- `BookCard.tsx` — Cover, title, author, duration, play button
- `HeroSection.tsx` — Animated gradient hero with Sanskrit decoration
- `layout/Header.tsx`, `layout/Footer.tsx`

## Data (src/lib/data.ts)
6 sample books, 5 authors. Real content from Supabase/Firebase to be added later.

## Narrator
Субал Сакха дас — primary voice for all recordings.
