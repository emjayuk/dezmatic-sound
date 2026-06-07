'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import BookingCTABanner from '@/components/BookingCTABanner'
import Footer from '@/components/Footer'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

const HERO_LINES = ['THE SOUND.', 'THE CULTURE.', 'THE CREW.']

const ORIGIN_PARAS = [
  "Dezmatic Sound was born from a deep love of Caribbean music culture — the kind that runs through generations, from yard parties in Kingston to carnival stages in Notting Hill.",
  "We planted our roots in Bristol, one of the UK's most vibrant cultural cities, and built a sound system that bridges the Caribbean diaspora with Bristol's own legendary music scene.",
  "Every speaker, every cable, every selector — built and chosen with intention. We don't just play music. We create the kind of atmosphere that people talk about for years.",
  "From intimate ceremonies to massive outdoor stages, Dezmatic Sound has become the trusted name for anyone who wants their event to feel truly alive.",
]

const STATS = [
  { value: '500+', label: 'Events Played' },
  { value: '10+', label: 'Years of Culture' },
  { value: '5', label: 'Genres Mastered' },
]

const SOUND_SYSTEM_PARAS = [
  "A sound system is more than equipment. It's a living tradition that began in Jamaica in the 1950s — where local operators would build their own speakers, source exclusive records, and compete to draw the biggest crowds.",
  "The sound system became the heartbeat of Caribbean social life, eventually spreading to the UK through the Windrush generation and evolving into the foundation of everything from reggae and dancehall to jungle, grime and UK garage.",
  "When you hire Dezmatic Sound, you're not just hiring a PA. You're bringing decades of culture, craft and community into your event.",
]

type Genre = {
  label: string
  dotColor: string
}

const GENRES: Genre[] = [
  { label: 'Dancehall', dotColor: '#F5A623' },
  { label: 'Reggae', dotColor: '#4DB8E8' },
  { label: 'Afrobeats', dotColor: '#F5A623' },
  { label: 'Soca', dotColor: '#FFD700' },
  { label: 'Hip Hop', dotColor: '#4DB8E8' },
]

const heroLineContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

const heroLineVariants = {
  hidden: { y: 80, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
}

const genreContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const genrePillVariants = {
  hidden: { scale: 0, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: { type: 'spring' as const, stiffness: 260, damping: 20 },
  },
}

function GenrePill({ genre, reducedMotion }: { genre: Genre; reducedMotion: boolean | null | undefined }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      variants={reducedMotion ? {} : genrePillVariants}
      whileHover={reducedMotion ? undefined : { scale: 1.05 }}
      transition={{ duration: 0.2 }}
      onHoverStart={() => { if (!reducedMotion) setHovered(true) }}
      onHoverEnd={() => setHovered(false)}
      className="flex items-center gap-3 px-8 py-4 cursor-default"
      style={{
        borderRadius: '9999px',
        background: hovered
          ? 'linear-gradient(135deg, #4DB8E8, #F5A623)'
          : 'var(--color-surface)',
        border: '1px solid rgba(255,255,255,0.1)',
        transition: 'background 0.2s ease',
      }}
    >
      <span
        style={{
          display: 'inline-block',
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: genre.dotColor,
          flexShrink: 0,
        }}
      />
      <span
        className="text-xl uppercase"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          color: hovered ? 'var(--color-bg)' : 'var(--color-white)',
          letterSpacing: '-0.01em',
          transition: 'color 0.2s ease',
        }}
      >
        {genre.label}
      </span>
    </motion.div>
  )
}

export default function AboutPageClient() {
  const reducedMotion = useReducedMotion()

  return (
    <main>

      {/* ── SECTION 1: Page Hero ── */}
      <section
        className="hero-noise relative flex flex-col items-center justify-center text-center px-6 pt-32 pb-20 overflow-hidden"
        style={{ minHeight: '70vh', backgroundColor: 'var(--color-bg)' }}
      >
        <motion.div
          animate={reducedMotion ? undefined : { scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(ellipse 60% 60% at 50% 50%, #4DB8E820, transparent)',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />

        <div style={{ position: 'relative', zIndex: 1 }}>
          <motion.div
            variants={reducedMotion ? {} : heroLineContainerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center gap-1 mb-6"
            aria-label="The Sound. The Culture. The Crew."
          >
            {HERO_LINES.map((line) => (
              <motion.h1
                key={line}
                variants={reducedMotion ? {} : heroLineVariants}
                className="text-3xl sm:text-4xl md:text-7xl leading-none uppercase"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-white)', letterSpacing: '-0.01em' }}
              >
                {line}
              </motion.h1>
            ))}
          </motion.div>

          <motion.p
            initial={reducedMotion ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.7, delay: 0.6 }}
            className="text-xl"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-blue)',
              fontStyle: 'italic',
            }}
          >
            Rooted in Caribbean tradition. Bred in Bristol.
          </motion.p>
        </div>
      </section>

      {/* ── SECTION 2: Origin Story ── */}
      <section className="py-24 px-6" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="mx-auto" style={{ maxWidth: '1200px' }}>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-16">

            <motion.div
              initial={reducedMotion ? undefined : { x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.8, ease: 'easeOut' }}
              className="md:col-span-3 flex flex-col"
            >
              <p
                className="text-xs tracking-widest mb-4 uppercase"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--color-blue)', letterSpacing: '0.18em' }}
              >
                OUR STORY
              </p>
              <h2
                className="text-4xl md:text-5xl leading-tight mb-6 uppercase"
                style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-white)', letterSpacing: '-0.01em' }}
              >
                MORE THAN A SOUND SYSTEM
              </h2>
              <div className="flex flex-col gap-5">
                {ORIGIN_PARAS.map((para, i) => (
                  <p
                    key={i}
                    className="leading-relaxed"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)' }}
                  >
                    {para}
                  </p>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={reducedMotion ? undefined : { x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.8, ease: 'easeOut', delay: 0.2 }}
              className="md:col-span-2"
            >
              <div
                className="rounded-2xl p-8 h-full flex flex-col justify-between"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  border: '1px solid rgba(77,184,232,0.15)',
                  borderLeft: '3px solid var(--color-blue)',
                }}
              >
                <div className="mb-8">
                  <p
                    className="text-xl leading-relaxed mb-4"
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontWeight: 300,
                      color: '#EDE8DC',
                      fontStyle: 'italic',
                      letterSpacing: '0.01em',
                      lineHeight: 1.6,
                    }}
                  >
                    &ldquo;We don&apos;t just play music. We create the atmosphere.&rdquo;
                  </p>
                  <p
                    className="text-sm"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--color-blue)' }}
                  >
                    — Dezmatic Sound, Bristol
                  </p>
                </div>

                <div className="flex flex-col gap-5">
                  {STATS.map((stat) => (
                    <div key={stat.label} className="flex flex-col gap-0.5">
                      <span
                        className="text-4xl leading-none"
                        style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-orange)', letterSpacing: '-0.02em' }}
                      >
                        {stat.value}
                      </span>
                      <span
                        className="text-sm"
                        style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)' }}
                      >
                        {stat.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: What Is A Sound System ── */}
      <section className="py-24 px-6" style={{ backgroundColor: '#111111' }}>
        <div className="mx-auto text-center" style={{ maxWidth: '900px' }}>

          <motion.p
            initial={reducedMotion ? undefined : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.5 }}
            className="text-xs tracking-widest mb-4 uppercase"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--color-orange)', letterSpacing: '0.18em' }}
          >
            THE CULTURE
          </motion.p>

          <motion.h2
            initial={reducedMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }}
            className="text-4xl md:text-5xl mb-8 uppercase"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-white)', letterSpacing: '-0.01em' }}
          >
            WHAT IS A SOUND SYSTEM?
          </motion.h2>

          <motion.p
            initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.1 }}
            className="leading-relaxed mb-8 mx-auto"
            style={{ maxWidth: '700px', fontFamily: 'var(--font-body)', color: 'var(--color-muted)' }}
          >
            {SOUND_SYSTEM_PARAS[0]}
          </motion.p>

          <motion.p
            initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.2 }}
            className="leading-relaxed mb-12 mx-auto"
            style={{ maxWidth: '700px', fontFamily: 'var(--font-body)', color: 'var(--color-muted)' }}
          >
            {SOUND_SYSTEM_PARAS[1]}
          </motion.p>

          <motion.div
            initial={reducedMotion ? undefined : { scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.7, ease: 'easeOut' }}
            className="relative py-12 px-8 mb-12 rounded-xl"
            style={{
              background: 'radial-gradient(ellipse 80% 80% at 50% 50%, #4DB8E815, transparent)',
            }}
          >
            <div className="flex flex-col items-center text-center gap-4">
              <p
                className="text-2xl sm:text-3xl md:text-4xl leading-tight mx-auto uppercase"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  color: 'var(--color-white)',
                  letterSpacing: '-0.01em',
                  maxWidth: '680px',
                }}
              >
                &ldquo;THE HEARTBEAT OF CARIBBEAN CULTURE — NOW IN BRISTOL.&rdquo;
              </p>
              <div
                style={{
                  width: '48px',
                  height: '2px',
                  backgroundColor: 'var(--color-blue)',
                  borderRadius: '1px',
                }}
              />
            </div>
          </motion.div>

          <motion.p
            initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.1 }}
            className="leading-relaxed mx-auto"
            style={{ maxWidth: '700px', fontFamily: 'var(--font-body)', color: 'var(--color-muted)' }}
          >
            {SOUND_SYSTEM_PARAS[2]}
          </motion.p>
        </div>
      </section>

      {/* ── SECTION 4: The Music ── */}
      <section className="py-24 px-6" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="mx-auto text-center" style={{ maxWidth: '1000px' }}>

          <motion.p
            initial={reducedMotion ? undefined : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.5 }}
            className="text-xs tracking-widest mb-4 uppercase"
            style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--color-blue)', letterSpacing: '0.18em' }}
          >
            WHAT WE PLAY
          </motion.p>

          <motion.h2
            initial={reducedMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6, ease: 'easeOut' }}
            className="text-4xl md:text-5xl mb-8 uppercase"
            style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-white)', letterSpacing: '-0.01em' }}
          >
            THE MUSIC
          </motion.h2>

          <motion.div
            variants={reducedMotion ? {} : genreContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            {GENRES.map((genre) => (
              <GenrePill key={genre.label} genre={genre} reducedMotion={reducedMotion} />
            ))}
          </motion.div>

          <motion.p
            initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.4 }}
            className="leading-relaxed mt-8 mx-auto"
            style={{
              maxWidth: '600px',
              fontFamily: 'var(--font-body)',
              color: 'var(--color-muted)',
            }}
          >
            From roots reggae to the latest dancehall anthems — we know the music, we know the crowd, and we know how to keep the energy alive all night.
          </motion.p>
        </div>
      </section>

      {/* ── SECTION 5: Booking CTA ── */}
      <BookingCTABanner
        headline="WANT TO KNOW MORE?"
        subheading="Get in touch and let's talk about your event."
        buttonText="CONTACT US"
        buttonLink="/contact"
      />

      <Footer />
    </main>
  )
}
