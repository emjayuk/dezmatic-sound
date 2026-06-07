'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'
import { CameraIcon } from './icons/EventIcons'

const TILES = [
  {
    label: 'CLUB NIGHT',
    gradient: 'linear-gradient(135deg, #1a1a2e 0%, #4DB8E8 100%)',
  },
  {
    label: 'WEDDING VIBES',
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #F5A623 100%)',
  },
  {
    label: 'CARNIVAL ENERGY',
    gradient: 'linear-gradient(135deg, #0d1117 0%, #4DB8E8 100%)',
  },
  {
    label: 'PRIVATE PARTY',
    gradient: 'linear-gradient(135deg, #1a1a1a 0%, #F5A623 100%)',
  },
] as const

const tileVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const tileItemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
}

const tileHoverVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.3, ease: 'easeOut' as const } },
}

const overlayVariants = {
  rest: { y: '100%' },
  hover: { y: 0, transition: { duration: 0.3, ease: 'easeOut' as const } },
}

export default function GalleryTeaser() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="py-24 px-6" style={{ backgroundColor: '#111111' }}>
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>

        <ScrollReveal direction="down" delay={0}>
          <h2
            className="text-5xl text-center mb-3 uppercase"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              color: 'var(--color-white)',
              letterSpacing: '-0.01em',
            }}
          >
            CATCH THE VIBE
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.1}>
          <p
            className="text-center mx-auto mb-12"
            style={{
              color: 'var(--color-muted)',
              fontFamily: 'var(--font-body)',
              maxWidth: '480px',
              lineHeight: 1.6,
            }}
          >
            A glimpse of what Dezmatic Sound brings to every event.
          </p>
        </ScrollReveal>

        <motion.div
          variants={reducedMotion ? {} : tileVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-14"
        >
          {TILES.map((tile) => (
            <motion.div key={tile.label} variants={reducedMotion ? {} : tileItemVariants}>
              <div
                className="overflow-hidden rounded-xl relative"
                style={{ aspectRatio: '4/3' }}
              >
                <motion.div
                  initial="rest"
                  whileHover={reducedMotion ? undefined : 'hover'}
                  variants={reducedMotion ? {} : tileHoverVariants}
                  className="relative w-full h-full cursor-pointer"
                  style={{ background: tile.gradient }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 z-10 pointer-events-none">
                    <span style={{ color: 'var(--color-muted)' }}>
                      <CameraIcon />
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 800,
                        color: 'rgba(255,255,255,0.75)',
                        fontSize: '1.25rem',
                        letterSpacing: '0.04em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {tile.label}
                    </span>
                  </div>

                  <motion.div
                    variants={reducedMotion ? {} : overlayVariants}
                    className="absolute inset-0 flex items-center justify-center z-20"
                    style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        color: 'var(--color-white)',
                        fontSize: '1.75rem',
                        letterSpacing: '0.08em',
                      }}
                    >
                      VIEW GALLERY →
                    </span>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <ScrollReveal direction="scale" delay={0.5} className="flex justify-center">
          <Link
            href="/gallery"
            className="inline-block px-10 py-3 rounded text-xl transition-colors duration-200"
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
            SEE THE FULL GALLERY
          </Link>
        </ScrollReveal>

      </div>
    </section>
  )
}
