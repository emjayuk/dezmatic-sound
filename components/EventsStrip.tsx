'use client'

import { motion, useReducedMotion } from 'framer-motion'
import EventCard from './EventCard'
import ScrollReveal from './ScrollReveal'

const EVENTS = [
  {
    icon: '💍',
    name: 'WEDDINGS',
    description: 'Make your special day unforgettable with the perfect soundtrack.',
  },
  {
    icon: '🌙',
    name: 'CLUB NIGHTS',
    description: 'Late night sessions, venue events and dance parties done right.',
  },
  {
    icon: '🎊',
    name: 'CARNIVALS & FESTIVALS',
    description: 'Massive stages, massive crowds, massive energy.',
  },
  {
    icon: '🎂',
    name: 'BIRTHDAY PARTIES',
    description: 'From intimate gatherings to full-scale celebrations.',
  },
  {
    icon: '🏢',
    name: 'CORPORATE EVENTS',
    description: 'Professional sound for conferences, launches and brand events.',
  },
  {
    icon: '🎉',
    name: 'PRIVATE HIRE',
    description: 'Your event, your vibe — we bring the sound system to you.',
  },
  {
    icon: '🙏',
    name: 'CEREMONIES',
    description: "Respectful, powerful sound for life's most meaningful moments.",
  },
  {
    icon: '🌍',
    name: 'COMMUNITY EVENTS',
    description: "Proudly supporting Bristol's vibrant cultural community.",
  },
  {
    icon: '🎪',
    name: 'POP-UPS & MARKETS',
    description: 'Outdoor events, street markets and pop-up experiences.',
  },
] as const

const gridVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.07, delayChildren: 0.1 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const },
  },
}

export default function EventsStrip() {
  const reducedMotion = useReducedMotion()

  return (
    <section
      id="events-strip"
      className="py-24 px-6"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>

        <ScrollReveal direction="down" delay={0}>
          <h2
            className="text-5xl text-center mb-4 uppercase"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              color: 'var(--color-white)',
              letterSpacing: '-0.01em',
            }}
          >
            WE PLAY EVERY EVENT
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={0.15}>
          <p
            className="text-center mx-auto mb-12"
            style={{
              color: 'var(--color-muted)',
              fontFamily: 'var(--font-body)',
              maxWidth: '560px',
              lineHeight: 1.6,
            }}
          >
            From intimate ceremonies to massive festival stages — Dezmatic Sound delivers every time.
          </p>
        </ScrollReveal>

        <motion.div
          variants={reducedMotion ? {} : gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {EVENTS.map((event) => (
            <motion.div key={event.name} variants={reducedMotion ? {} : cardVariants}>
              <EventCard
                icon={event.icon}
                name={event.name}
                description={event.description}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  )
}
