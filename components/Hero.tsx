'use client'

import { useEffect } from 'react'
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const ParticleField = dynamic(() => import('./ParticleField'), { ssr: false })

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

const HEADLINE_WORDS = ["BRISTOL'S", 'PREMIER', 'SOUND', 'SYSTEM']

const wordContainerVariants = {
  animate: {
    transition: { delayChildren: 1.4, staggerChildren: 0.12 },
  },
}

const wordVariants = {
  initial: { y: 60, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
}

export default function Hero() {
  const reducedMotion = useReducedMotion()
  const logoControls = useAnimationControls()
  const shockwaveControls = useAnimationControls()
  const contentControls = useAnimationControls()

  const handleScrollDown = () => {
    window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })
  }

  useEffect(() => {
    if (reducedMotion) return

    const runSequence = async () => {
      // Phase 1 — Drop: fast fall from above
      await logoControls.start({
        y: 20, scale: 1.05, opacity: 1, rotate: 2,
        transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
      })
      // Phase 2 — Impact: the thud
      await logoControls.start({
        y: 0, scale: 0.96, rotate: 0,
        transition: { duration: 0.15, ease: 'easeOut' },
      })
      // Phase 3 — Bounce
      await logoControls.start({
        y: -12, scale: 1.02,
        transition: { duration: 0.25, ease: 'easeOut' },
      })
      // Phase 4 — Settle
      await logoControls.start({
        y: 0, scale: 1, rotate: 0,
        transition: { duration: 0.2, ease: 'easeInOut' },
      })
      // Phase 5 — Idle float (infinite, no await)
      logoControls.start({
        y: [0, -10, 0],
        transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
      })
    }

    runSequence()

    // Shockwave ring expands at impact moment (0.6s)
    const shockwaveTimer = setTimeout(() => {
      shockwaveControls.start({
        scale: 3,
        opacity: 0,
        transition: { duration: 0.8, ease: 'easeOut' },
      })
    }, 600)

    // Screen shake at impact moment (0.6s)
    const shakeTimer = setTimeout(() => {
      contentControls.start({
        x: [0, -6, 6, -4, 4, -2, 2, 0],
        transition: { duration: 0.4 },
      })
    }, 600)

    return () => {
      clearTimeout(shockwaveTimer)
      clearTimeout(shakeTimer)
    }
  }, [reducedMotion, logoControls, shockwaveControls, contentControls])

  return (
    <section
      className="hero-noise relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* Particle background */}
      <ParticleField />

      {/* Main content — receives screen shake on impact */}
      <motion.div
        animate={contentControls}
        className="relative flex flex-col items-center text-center px-6 w-full gap-8 py-24"
        style={{ zIndex: 10, maxWidth: '900px', margin: '0 auto' }}
      >
        {/* Logo wrapper */}
        <div style={{ position: 'relative', display: 'inline-block' }}>

          {/* Shockwave ring — expands on impact */}
          <motion.div
            initial={{ scale: 0, opacity: 0.6 }}
            animate={shockwaveControls}
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              border: '2px solid #4DB8E8',
              zIndex: 0,
              pointerEvents: 'none',
            }}
          />

          {/* Logo — cinematic drop sequence */}
          <motion.div
            initial={reducedMotion ? undefined : { y: -300, scale: 1.4, opacity: 0, rotate: -8 }}
            animate={reducedMotion ? { y: 0, scale: 1, opacity: 1, rotate: 0 } : logoControls}
            className="logo-glow flex items-center justify-center"
            style={{ position: 'relative', zIndex: 1 }}
          >
            <Image
              src="/logo.png"
              alt="Dezmatic Sound"
              width={380}
              height={160}
              className="w-[260px] md:w-[380px] h-auto"
              priority
            />
          </motion.div>
        </div>

        {/* Headline — stagger starts after logo settles at 1.4s */}
        <motion.div
          variants={wordContainerVariants}
          initial="initial"
          animate="animate"
          className="flex flex-wrap justify-center gap-x-5 gap-y-1"
          aria-label="Bristol's Premier Sound System"
        >
          {HEADLINE_WORDS.map((word) => (
            <motion.span
              key={word}
              variants={reducedMotion ? {} : wordVariants}
              className="text-4xl sm:text-5xl md:text-8xl text-white uppercase"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 0.95 }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>

        {/* Subheading — +0.4s from original */}
        <motion.p
          initial={reducedMotion ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.8, delay: 2.2 }}
          className="text-base tracking-widest uppercase"
          style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-body)', fontWeight: 400, letterSpacing: '0.15em' }}
        >
          Dancehall · Reggae · Afrobeats · Soca · Hip Hop
        </motion.p>

        {/* CTAs — +0.4s from original */}
        <motion.div
          initial={reducedMotion ? undefined : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.8, delay: 2.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <motion.div whileHover={reducedMotion ? {} : { scale: 1.05 }} transition={{ duration: 0.2 }}>
            <Link
              href="/contact"
              className="inline-block px-8 py-3 rounded transition-colors duration-200 text-xl"
              style={{
                fontFamily: 'var(--font-display)',
                backgroundColor: 'var(--color-blue)',
                color: 'var(--color-bg)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-orange)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-blue)'
              }}
            >
              BOOK NOW
            </Link>
          </motion.div>

          <motion.div whileHover={reducedMotion ? {} : { scale: 1.05 }} transition={{ duration: 0.2 }}>
            <Link
              href="/events"
              className="inline-block px-8 py-3 rounded transition-colors duration-200 text-xl"
              style={{
                fontFamily: 'var(--font-display)',
                backgroundColor: 'transparent',
                border: '2px solid var(--color-blue)',
                color: 'var(--color-white)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'var(--color-blue)'
                e.currentTarget.style.color = 'var(--color-bg)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.color = 'var(--color-white)'
              }}
            >
              SEE OUR EVENTS
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator — +0.4s from original */}
      <motion.div
        initial={reducedMotion ? undefined : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 2.9 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ zIndex: 10 }}
      >
        <button
          onClick={handleScrollDown}
          aria-label="Scroll to next section"
          className="flex flex-col items-center gap-1 opacity-50 hover:opacity-100 transition-opacity duration-300"
          style={{ color: 'var(--color-white)' }}
        >
          <span className="text-xs tracking-widest" style={{ fontFamily: 'var(--font-body)' }}>
            scroll
          </span>
          <motion.div
            animate={reducedMotion ? undefined : { y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </motion.div>
        </button>
      </motion.div>
    </section>
  )
}
