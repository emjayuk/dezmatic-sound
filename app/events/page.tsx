'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import BookingCTABanner from '@/components/BookingCTABanner'
import Footer from '@/components/Footer'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

// ─── Types ────────────────────────────────────────────────────────────────────

type EventType = {
  icon: string
  name: string
  description: string
  bullets: [string, string, string]
  floatDuration: number
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const HEADLINE_WORDS = ['EVERY', 'EVENT.', 'ONE', 'SOUND.']

const EVENT_TYPES: EventType[] = [
  {
    icon: '💍',
    name: 'WEDDINGS',
    description:
      'Your special day deserves the perfect soundtrack. We read the room and keep the energy flowing from ceremony to last dance.',
    bullets: ['Ceremony & reception coverage', 'Full indoor/outdoor setup', 'Custom playlist consultation'],
    floatDuration: 2.5,
  },
  {
    icon: '🌙',
    name: 'CLUB NIGHTS & VENUE EVENTS',
    description:
      "Late night sessions, dance parties and venue events — we bring the sound system culture that keeps crowds moving until close.",
    bullets: ['Full PA system setup', 'Guest selectors & MCs available', "Experienced in Bristol's nightlife circuit"],
    floatDuration: 3,
  },
  {
    icon: '🎊',
    name: 'CARNIVALS & FESTIVALS',
    description:
      "Massive stages, massive crowds, massive energy. We've played Bristol's biggest cultural events and we deliver every time.",
    bullets: ['Large-scale outdoor sound', 'Weatherproof equipment', 'Caribbean carnival specialists'],
    floatDuration: 3.5,
  },
  {
    icon: '🎂',
    name: 'BIRTHDAY PARTIES',
    description:
      "Whether it's an intimate gathering or a full-scale party, we bring the music and the vibe that makes birthdays legendary.",
    bullets: ['All age groups catered for', 'Indoor & outdoor setups', 'Custom genre requests welcome'],
    floatDuration: 2.5,
  },
  {
    icon: '🏢',
    name: 'CORPORATE EVENTS',
    description:
      'Professional sound for conferences, product launches, brand activations and staff events. Reliable, polished and on time.',
    bullets: ['Corporate-grade professionalism', 'Background & live event modes', 'Full AV coordination available'],
    floatDuration: 3,
  },
  {
    icon: '🎉',
    name: 'PRIVATE HIRE',
    description:
      'Your event, your rules. We bring the full sound system to your location and set the perfect atmosphere for any occasion.',
    bullets: ['Fully mobile setup', 'Any venue, any location', 'Flexible hire packages'],
    floatDuration: 3.5,
  },
  {
    icon: '🙏',
    name: 'CEREMONIES',
    description:
      "Graduations, memorials, cultural ceremonies and religious celebrations — powerful, respectful sound for life's most significant moments.",
    bullets: ['Sensitive to event tone', 'Microphone & speech setup', 'Cultural ceremony experience'],
    floatDuration: 2.5,
  },
  {
    icon: '🌍',
    name: 'COMMUNITY EVENTS',
    description:
      "Proudly rooted in Bristol's Caribbean community. We support local cultural events, street parties and community gatherings.",
    bullets: ['Community pricing available', 'Bristol-based and proud', 'Cultural events specialists'],
    floatDuration: 3,
  },
  {
    icon: '🎪',
    name: 'POP-UPS & MARKETS',
    description:
      'Outdoor markets, pop-up experiences, street events and brand activations — compact and powerful sound that draws a crowd.',
    bullets: ['Compact outdoor rigs available', 'Quick setup and breakdown', 'Background or feature sound'],
    floatDuration: 3.5,
  },
]

const UPCOMING_EVENTS = [
  { date: 'COMING SOON', name: 'DEZMATIC PRESENTS', venue: 'Phoenix Social Enterprise, Bristol' },
  { date: 'COMING SOON', name: 'SUMMER SESSION', venue: 'Bristol City Centre' },
  { date: 'COMING SOON', name: 'PRIVATE EVENT', venue: 'Location TBC' },
]

// ─── Variants ─────────────────────────────────────────────────────────────────

const wordContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
}

const wordVariants = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
}

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
}

const cardEntranceVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

const cardHoverVariants = {
  rest: { scale: 1, boxShadow: '0 0 0px rgba(77,184,232,0)' },
  hover: {
    scale: 1.03,
    boxShadow: '0 0 32px rgba(77,184,232,0.2)',
    transition: { duration: 0.2, ease: 'easeOut' as const },
  },
}

const iconHoverVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.3,
    transition: { type: 'spring' as const, stiffness: 300, damping: 15 },
  },
}

const upcomingGridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const upcomingCardVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

// ─── Event Type Card ──────────────────────────────────────────────────────────

function EventTypeCard({ event }: { event: EventType }) {
  const reducedMotion = useReducedMotion()
  const [hovered, setHovered] = useState(false)

  return (
    // Outer div participates in parent stagger via cardEntranceVariants
    <motion.div variants={reducedMotion ? {} : cardEntranceVariants}>
      <motion.div
        initial="rest"
        whileHover={reducedMotion ? undefined : 'hover'}
        variants={reducedMotion ? {} : cardHoverVariants}
        onHoverStart={() => { if (!reducedMotion) setHovered(true) }}
        onHoverEnd={() => setHovered(false)}
        className="flex flex-col items-center text-center p-8 h-full"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderWidth: '1px',
          borderStyle: 'solid',
          borderColor: hovered ? '#4DB8E8' : 'rgba(255,255,255,0.06)',
          borderRadius: '12px',
          transition: 'border-color 0.2s ease',
        }}
      >
        {/* Float wrapper — drives y animation, passes hover state to icon child */}
        <motion.div
          animate={reducedMotion ? undefined : { y: [0, -8, 0] }}
          transition={{ duration: event.floatDuration, repeat: Infinity, ease: 'easeInOut' }}
          style={{ display: 'inline-block' }}
        >
          <motion.span
            variants={reducedMotion ? {} : iconHoverVariants}
            style={{ display: 'inline-block', fontSize: '3rem', lineHeight: 1 }}
            role="img"
            aria-label={event.name.toLowerCase()}
          >
            {event.icon}
          </motion.span>
        </motion.div>

        {/* Event name */}
        <h3
          className="text-2xl mt-4 uppercase"
          style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-white)', letterSpacing: '-0.01em', lineHeight: 1.05 }}
        >
          {event.name}
        </h3>

        {/* Blue divider */}
        <div
          style={{
            width: '40px',
            height: '2px',
            backgroundColor: 'var(--color-blue)',
            margin: '1rem auto',
            borderRadius: '1px',
          }}
        />

        {/* Description */}
        <p
          className="leading-relaxed"
          style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)' }}
        >
          {event.description}
        </p>

        {/* Bullet list */}
        <ul className="mt-4 text-left w-full flex flex-col gap-2">
          {event.bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-center gap-2 text-sm"
              style={{ fontFamily: 'var(--font-body)', color: '#EDE8DC' }}
            >
              <span
                style={{
                  display: 'inline-block',
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  backgroundColor: 'var(--color-blue)',
                  flexShrink: 0,
                }}
              />
              {bullet}
            </li>
          ))}
        </ul>

        {/* CTA link */}
        <Link
          href="/contact"
          className="mt-6 hover:underline transition-all duration-200"
          style={{
            fontFamily: 'var(--font-display)',
            color: 'var(--color-blue)',
            fontSize: '1rem',
          }}
        >
          Book for this event →
        </Link>
      </motion.div>
    </motion.div>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function EventsPage() {
  const reducedMotion = useReducedMotion()

  return (
    <main>

      {/* ── SECTION 1: Page Hero ── */}
      <section
        className="flex flex-col items-center justify-center text-center px-6 pt-32 pb-20"
        style={{ minHeight: '60vh', backgroundColor: 'var(--color-bg)' }}
      >
        {/* Headline — word stagger */}
        <motion.div
          variants={reducedMotion ? {} : wordContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-6"
          aria-label="Every event. One sound."
        >
          {HEADLINE_WORDS.map((word) => (
            <motion.span
              key={word}
              variants={reducedMotion ? {} : wordVariants}
              className="text-4xl sm:text-5xl md:text-8xl leading-none uppercase"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-white)', letterSpacing: '-0.02em', lineHeight: 0.95 }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* Animated blue underline */}
        <motion.div
          initial={reducedMotion ? undefined : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.8, delay: 0.5, ease: 'easeOut' }}
          style={{
            width: '120px',
            height: '3px',
            backgroundColor: 'var(--color-blue)',
            transformOrigin: 'left',
            margin: '0 auto 2rem',
            borderRadius: '2px',
          }}
        />

        {/* Subheading */}
        <motion.p
          initial={reducedMotion ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.7, delay: 0.7 }}
          className="text-lg mx-auto text-center"
          style={{
            maxWidth: '560px',
            color: 'var(--color-muted)',
            fontFamily: 'var(--font-body)',
            lineHeight: 1.6,
          }}
        >
          From intimate ceremonies to massive festival stages — Dezmatic Sound delivers every time.
        </motion.p>
      </section>

      {/* ── SECTION 2: Event Types Grid ── */}
      <section className="py-24 px-6" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="mx-auto" style={{ maxWidth: '1200px' }}>

          {/* Label */}
          <motion.p
            initial={reducedMotion ? undefined : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.5 }}
            className="text-xs text-center tracking-widest mb-12 uppercase"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--color-blue)', letterSpacing: '0.18em' }}
          >
            WHAT WE COVER
          </motion.p>

          {/* Cards grid */}
          <motion.div
            variants={reducedMotion ? {} : gridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {EVENT_TYPES.map((event) => (
              <EventTypeCard key={event.name} event={event} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 3: Upcoming Events ── */}
      <section className="py-24 px-6" style={{ backgroundColor: '#111111' }}>
        <div className="mx-auto" style={{ maxWidth: '1200px' }}>

          <motion.h2
            initial={reducedMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }}
            className="text-5xl text-center mb-3 uppercase"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-white)', letterSpacing: '-0.01em' }}
          >
            UPCOMING EVENTS
          </motion.h2>

          <motion.p
            initial={reducedMotion ? undefined : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.1 }}
            className="text-center mb-16"
            style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)' }}
          >
            Stay tuned — next dates dropping soon.
          </motion.p>

          <motion.div
            variants={reducedMotion ? {} : upcomingGridVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {UPCOMING_EVENTS.map((event) => (
              <motion.div
                key={event.name}
                variants={reducedMotion ? {} : upcomingCardVariants}
                className="flex flex-col gap-3 p-6 rounded-xl"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
              >
                <span
                  className="inline-block px-4 py-1 rounded self-start text-lg"
                  style={{
                    fontFamily: 'var(--font-display)',
                    backgroundColor: 'var(--color-blue)',
                    color: 'var(--color-bg)',
                  }}
                >
                  {event.date}
                </span>

                <h3
                  className="text-2xl uppercase"
                  style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-white)', letterSpacing: '-0.01em' }}
                >
                  {event.name}
                </h3>

                <p
                  className="text-sm"
                  style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)' }}
                >
                  {event.venue}
                </p>

                <Link
                  href="/contact"
                  className="text-sm mt-2 hover:underline transition-all duration-200"
                  style={{ fontFamily: 'var(--font-body)', color: 'var(--color-orange)' }}
                >
                  Get Tickets →
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 4: Booking CTA ── */}
      <BookingCTABanner
        headline="READY TO BOOK?"
        subheading="Tell us about your event and we'll make it unforgettable."
        buttonText="GET IN TOUCH"
        buttonLink="/contact"
      />

      <Footer />
    </main>
  )
}
