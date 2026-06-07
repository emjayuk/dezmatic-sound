'use client'

import { motion, useReducedMotion } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

const TESTIMONIALS = [
  {
    quote:
      "Dezmatic Sound turned our wedding into the most memorable night of our lives. The music, the energy, the crowd — absolutely electric.",
    name: 'Sarah & Marcus T.',
    event: 'Wedding Reception, Bristol',
  },
  {
    quote:
      "We've had many sound systems at our events but none come close to Dezmatic. The crowd was on their feet from start to finish.",
    name: 'Carnival Collective',
    event: 'Bristol Community Carnival',
  },
  {
    quote:
      'Professional, powerful and culturally on point. Dezmatic Sound is the only call you need to make for any event.',
    name: 'Jordan P.',
    event: 'Corporate Launch Event',
  },
]

const CARD_ANIMATIONS = [
  { initial: { opacity: 0, x: -60 }, animate: { opacity: 1, x: 0 }, delay: 0 },
  { initial: { opacity: 0, y: 60 }, animate: { opacity: 1, y: 0 }, delay: 0.15 },
  { initial: { opacity: 0, x: 60 }, animate: { opacity: 1, x: 0 }, delay: 0.3 },
]

const cardHoverVariants = {
  rest: {
    scale: 1,
    boxShadow: '0 0 0px rgba(245, 166, 35, 0)',
  },
  hover: {
    scale: 1.02,
    boxShadow: '0 0 24px rgba(245, 166, 35, 0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
    transition: { duration: 0.2, ease: 'easeOut' as const },
  },
}

export default function TestimonialsSection() {
  const reducedMotion = useReducedMotion()

  return (
    <section className="py-24 px-6" style={{ backgroundColor: 'var(--color-bg)' }}>
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
            WHAT PEOPLE SAY
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.1}>
          <p
            className="text-center mb-12 mx-auto"
            style={{
              color: 'var(--color-muted)',
              fontFamily: 'var(--font-body)',
              maxWidth: '480px',
              lineHeight: 1.6,
            }}
          >
            Don&apos;t just take our word for it.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => {
            const anim = CARD_ANIMATIONS[i]
            return (
              <motion.div
                key={t.name}
                initial={reducedMotion ? undefined : anim.initial}
                whileInView={reducedMotion ? undefined : anim.animate}
                viewport={{ once: true, amount: 0.2 }}
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : { duration: 0.7, delay: anim.delay, ease: [0.16, 1, 0.3, 1] }
                }
              >
                <motion.div
                  initial="rest"
                  whileHover={reducedMotion ? undefined : 'hover'}
                  variants={reducedMotion ? {} : cardHoverVariants}
                  className="flex flex-col h-full p-8"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid rgba(255,255,255,0.06)',
                    borderRadius: '12px',
                    cursor: 'default',
                  }}
                >
                  <motion.span
                    aria-hidden="true"
                    className="block mb-3"
                    initial={reducedMotion ? undefined : { opacity: 0, scale: 0.5, rotate: -20 }}
                    whileInView={reducedMotion ? undefined : { opacity: 1, scale: 1, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={
                      reducedMotion
                        ? { duration: 0 }
                        : { duration: 0.5, type: 'spring', stiffness: 200 }
                    }
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '4rem',
                      color: 'var(--color-orange)',
                      lineHeight: 1,
                      display: 'block',
                    }}
                  >
                    &ldquo;
                  </motion.span>

                  <p
                    className="leading-relaxed flex-1 mb-8"
                    style={{
                      fontFamily: 'var(--font-body)',
                      color: '#EDE8DC',
                      fontStyle: 'italic',
                    }}
                  >
                    {t.quote}
                  </p>

                  <div>
                    <p
                      className="text-base leading-tight uppercase"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontWeight: 700,
                        color: 'var(--color-blue)',
                        letterSpacing: '0.02em',
                      }}
                    >
                      {t.name}
                    </p>
                    <p
                      className="text-sm mt-1"
                      style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)' }}
                    >
                      {t.event}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
