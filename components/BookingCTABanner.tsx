'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

interface BookingCTABannerProps {
  headline?: string
  subheading?: string
  buttonText?: string
  buttonLink?: string
}

const charContainerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.03 },
  },
}

const charVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.1 },
  },
}

const subVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.3, ease: 'easeOut' as const },
  },
}

export default function BookingCTABanner({
  headline = 'READY TO MAKE NOISE?',
  subheading = 'Book Dezmatic Sound for your next event — weddings, club nights, carnivals, corporate and more.',
  buttonText = 'BOOK US NOW',
  buttonLink = '/contact',
}: BookingCTABannerProps) {
  const reducedMotion = useReducedMotion()
  const chars = headline.split('')

  return (
    <motion.section
      className="banner-gradient relative py-20 px-6"
      initial={reducedMotion ? undefined : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={reducedMotion ? { duration: 0 } : { duration: 0.8 }}
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}
    >
      {/* Top accent line — scaleX reveal */}
      <motion.div
        className="absolute top-0 left-0 right-0"
        initial={reducedMotion ? undefined : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={reducedMotion ? { duration: 0 } : { duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          height: '1px',
          backgroundColor: 'var(--color-blue)',
          opacity: 0.4,
          transformOrigin: 'left',
        }}
      />

      <ScrollReveal direction="scale" delay={0} className="w-full">
        <div
          className="mx-auto flex flex-col items-center text-center"
          style={{ maxWidth: '800px', width: '100%', margin: '0 auto' }}
        >
          {/* Headline — character stagger */}
          <motion.h2
            variants={reducedMotion ? {} : charContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="mb-6 leading-none"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              fontSize: 'clamp(2.2rem, 6vw, 3.5rem)',
              color: 'var(--color-white)',
              letterSpacing: '-0.02em',
              lineHeight: 1.0,
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              textAlign: 'center',
            }}
          >
            {reducedMotion
              ? headline
              : chars.map((char, i) => (
                  <motion.span
                    key={i}
                    variants={charVariants}
                    style={{ display: 'inline-block' }}
                  >
                    {char === ' ' ? ' ' : char}
                  </motion.span>
                ))}
          </motion.h2>

          {/* Subheading */}
          <motion.p
            variants={reducedMotion ? {} : subVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-lg"
            style={{
              color: 'var(--color-muted)',
              fontFamily: 'var(--font-body)',
              textAlign: 'center',
              maxWidth: '600px',
              margin: '0 auto',
            }}
          >
            {subheading}
          </motion.p>

          {/* Button */}
          <ScrollReveal direction="up" delay={0.4} className="flex justify-center w-full mt-8">
            <motion.div
              whileHover={reducedMotion ? undefined : { scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="cta-glow inline-block rounded"
            >
              <Link
                href={buttonLink}
                className="inline-block px-12 py-4 rounded"
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  backgroundColor: 'var(--color-blue)',
                  color: 'var(--color-bg)',
                  transition: 'background-color 0.2s ease',
                  minHeight: '52px',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-orange)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'var(--color-blue)'
                }}
              >
                {buttonText}
              </Link>
            </motion.div>
          </ScrollReveal>
        </div>
      </ScrollReveal>
    </motion.section>
  )
}
