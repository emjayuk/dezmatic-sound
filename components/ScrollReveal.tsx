'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale'
  duration?: number
  className?: string
}

export default function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.7,
  className = '',
}: ScrollRevealProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return <div className={className}>{children}</div>
  }

  const directionMap = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
    scale: { scale: 0.85, y: 0, x: 0 },
  }

  const initial = {
    opacity: 0,
    ...directionMap[direction],
    ...(direction === 'scale' ? {} : { scale: 1 }),
  }

  const animate = {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
  }

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
