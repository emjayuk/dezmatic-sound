# Dezmatic Sound — Claude Code Instructions

## Project Overview
Premium 5-page website for Dezmatic Sound, a Caribbean and international sound system based in Bristol, UK.

## Tech Stack
- Next.js 14, TypeScript, App Router
- Tailwind CSS v4 — ALL styles via @theme block in globals.css. NO tailwind.config.ts
- Framer Motion for all animations
- React Three Fiber + Three.js for 3D hero scene
- next/font for Syne (display) and Outfit (body)

## Design System
- --color-bg: #0D0D0D
- --color-blue: #4DB8E8
- --color-orange: #F5A623
- --color-gold: #FFD700
- --color-white: #FFFFFF
- --color-muted: #A0A0A0
- --color-surface: #1A1A1A
- Font display: Syne Bold/ExtraBold
- Font body: Outfit

## Critical Rules
1. NEVER use tailwind.config.ts — Tailwind v4 only, tokens in globals.css @theme block
2. NEVER use serif fonts or system fonts — Syne and Outfit only
3. NEVER add Lorem Ipsum — write real copy about Dezmatic Sound
4. ALL Framer Motion components and scroll hooks must be marked 'use client'
5. THREE.js / React Three Fiber must be dynamically imported with ssr: false
6. All scroll-triggered animations use whileInView with once: true
7. Respect prefers-reduced-motion media query on all animations
8. Logo file lives at /public/logo.png
9. Gallery assets live at /public/gallery/
10. No placeholder colours — always use CSS variables

## Animation Defaults
- Entrance: opacity 0→1, y: 20→0, duration 0.6s
- Stagger children: 0.08s delay between items
- Spring config for logo: { stiffness: 100, damping: 15 }
- Hover transitions: duration 0.2s ease

## Component Rules
- Navbar.tsx — 'use client', scroll-aware
- Footer.tsx — server component
- EventCard.tsx — 'use client', Framer Motion
- Hero3D.tsx — 'use client', dynamic import ssr:false
- BookingCTABanner.tsx — reusable, accepts headline and CTA text as props

## File Structure
app/
  page.tsx (Home)
  events/page.tsx
  about/page.tsx
  gallery/page.tsx
  contact/page.tsx
  globals.css
  layout.tsx
components/
  Navbar.tsx
  Footer.tsx
  EventCard.tsx
  TestimonialCard.tsx
  BookingCTABanner.tsx
  GalleryGrid.tsx
  Hero3D.tsx
public/
  logo.png
  gallery/
