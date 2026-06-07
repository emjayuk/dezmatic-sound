'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useInView } from 'framer-motion'
import ScrollReveal from './ScrollReveal'

// ─── Count-up hook ────────────────────────────────────────────────────────────

function useCountUp(target: number, inView: boolean, duration = 1.8): number {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return

    let rafId: number
    const startTime = performance.now()

    const tick = (now: number) => {
      const elapsed = (now - startTime) / (duration * 1000)
      const progress = Math.min(elapsed, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        rafId = requestAnimationFrame(tick)
      } else {
        setCount(target)
      }
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [inView, target, duration])

  return count
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function CountStat({
  target,
  suffix,
  inView,
}: {
  target: number
  suffix: string
  inView: boolean
}) {
  const count = useCountUp(target, inView)
  return (
    <>
      {count}
      {suffix}
    </>
  )
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { display: '500+', numValue: 500, suffix: '+', label: 'EVENTS PLAYED', isNumeric: true },
  { display: '5', numValue: 5, suffix: '', label: 'GENRES COVERED', isNumeric: true },
  { display: 'Bristol', numValue: null, suffix: '', label: 'HOME BASE', isNumeric: false },
] as const

const STAT_DELAYS = [0, 0.15, 0.3] as const

const PARAGRAPHS = [
  "Dezmatic Sound has been shaking Bristol's foundations for years — bringing the authentic Caribbean sound system experience to every event we touch.",
  'From intimate birthday parties to massive carnival stages, we bring the hardware, the music, and the culture. Every. Single. Time.',
  'Based in Bristol. Known internationally. Rooted in Dancehall, Reggae, Afrobeats, Soca and Hip Hop.',
]

// ─── Main component ───────────────────────────────────────────────────────────

export default function AboutStrip() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 px-6"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="mx-auto" style={{ maxWidth: '1200px' }}>

        {/* Top divider */}
        <div
          className="w-full mb-16"
          style={{ height: '1px', backgroundColor: 'var(--color-blue)', opacity: 0.3 }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">

          {/* ── Left column: Stats ── */}
          <div className="flex flex-col gap-10 items-center md:items-start" style={{ position: 'relative' }}>

            {/* Blue radial glow */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(77,184,232,0.08) 0%, transparent 70%)',
                pointerEvents: 'none',
                zIndex: 0,
              }}
            />

            {/* Logo watermark */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '320px',
                height: '320px',
                opacity: 0.08,
                pointerEvents: 'none',
                zIndex: 0,
              }}
            >
              <Image src="/logo.png" alt="" fill style={{ objectFit: 'contain' }} />
            </div>

            {STATS.map((stat, i) => (
              <ScrollReveal key={stat.label} direction="left" delay={STAT_DELAYS[i]}>
                <div
                  className="flex flex-col gap-1 items-center md:items-start"
                  style={{ position: 'relative', zIndex: 1 }}
                >
                  <span
                    className="text-5xl leading-none"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontWeight: 800,
                      color: 'var(--color-blue)',
                      letterSpacing: '-0.02em',
                    }}
                  >
                    {stat.isNumeric ? (
                      <CountStat
                        target={stat.numValue as number}
                        suffix={stat.suffix}
                        inView={isInView}
                      />
                    ) : (
                      stat.display
                    )}
                  </span>
                  <span
                    className="text-sm uppercase tracking-widest"
                    style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}
                  >
                    {stat.label}
                  </span>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* ── Right column: Brand statement ── */}
          <div className="flex flex-col gap-6">

            <ScrollReveal direction="right" delay={0.1}>
              <h2
                className="text-3xl md:text-4xl text-center md:text-left uppercase"
                style={{
                  fontFamily: 'var(--font-display)',
                  fontWeight: 800,
                  color: 'var(--color-white)',
                  letterSpacing: '-0.01em',
                  lineHeight: 1.05,
                }}
              >
                MORE THAN MUSIC. IT&apos;S A MOVEMENT.
              </h2>
            </ScrollReveal>

            <div className="flex flex-col gap-4">
              {PARAGRAPHS.map((para, i) => (
                <ScrollReveal key={i} direction="up" delay={0.2 + i * 0.1}>
                  <p
                    className="leading-relaxed"
                    style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}
                  >
                    {para}
                  </p>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal direction="up" delay={0.5}>
              <Link
                href="/about"
                className="group inline-flex items-center gap-2 transition-colors duration-200"
                style={{ color: 'var(--color-blue)', fontFamily: 'var(--font-body)' }}
              >
                <span className="group-hover:underline">Learn Our Story</span>
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </ScrollReveal>

          </div>

        </div>
      </div>
    </section>
  )
}
