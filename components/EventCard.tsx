'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

interface EventCardProps {
  icon: string
  name: string
  description: string
}

const cardVariants = {
  rest: {
    scale: 1,
    boxShadow: '0 0 0px rgba(77, 184, 232, 0)',
  },
  hover: {
    scale: 1.03,
    boxShadow: '0 0 24px rgba(77, 184, 232, 0.25), inset 0 1px 0 rgba(255,255,255,0.05)',
    transition: { duration: 0.2, ease: 'easeOut' },
  },
}

const iconVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.2,
    transition: { type: 'spring' as const, stiffness: 300, damping: 15 },
  },
}

export default function EventCard({ icon, name, description }: EventCardProps) {
  const [hovered, setHovered] = useState(false)
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      initial="rest"
      whileHover={reducedMotion ? undefined : 'hover'}
      variants={reducedMotion ? {} : cardVariants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="flex flex-col items-center text-center p-6"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: hovered ? '#4DB8E8' : 'rgba(255,255,255,0.06)',
        borderRadius: '12px',
        transition: 'border-color 0.2s ease',
      }}
    >
      {/* Icon */}
      <motion.span
        variants={reducedMotion ? {} : iconVariants}
        className="block mb-4"
        style={{ fontSize: '2.5rem', lineHeight: 1 }}
        role="img"
        aria-label={name.toLowerCase()}
      >
        {icon}
      </motion.span>

      {/* Event name */}
      <h3
        className="text-xl mb-2 uppercase"
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 800,
          color: 'var(--color-white)',
          letterSpacing: '-0.01em',
          lineHeight: 1.05,
        }}
      >
        {name}
      </h3>

      {/* Description */}
      <p
        className="text-sm leading-snug mb-5 flex-1"
        style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}
      >
        {description}
      </p>

      {/* Book CTA */}
      <Link
        href="/contact"
        className="text-sm transition-opacity duration-200 hover:opacity-70"
        style={{ color: 'var(--color-blue)', fontFamily: 'var(--font-body)' }}
      >
        Book for this event →
      </Link>
    </motion.div>
  )
}
