'use client'

import Image from 'next/image'
import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Events', href: '/events' },
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
  { label: 'Book Now', href: '/contact' },
]

function InstagramIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  )
}

function SpotifyIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
    </svg>
  )
}

export default function Footer() {
  const reducedMotion = useReducedMotion()

  const colVariants = (delay: number) => ({
    initial: reducedMotion ? undefined : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: reducedMotion ? { duration: 0 } : { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as const },
  })

  return (
    <footer style={{ backgroundColor: '#080808' }}>
      <div style={{ height: '1px', backgroundColor: 'var(--color-blue)', opacity: 0.2 }} />

      <div className="px-6 py-16">
        <div className="mx-auto" style={{ maxWidth: '1200px' }}>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">

            {/* Column 1 — Brand */}
            <motion.div className="flex flex-col gap-4" {...colVariants(0)}>
              <Link href="/" aria-label="Dezmatic Sound — home">
                <Image
                  src="/logo.png"
                  alt="Dezmatic Sound"
                  width={120}
                  height={64}
                  style={{ height: '80px', width: 'auto', objectFit: 'contain' }}
                  priority={false}
                />
              </Link>

              <p
                className="text-sm"
                style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}
              >
                Bristol&apos;s Premier Sound System
              </p>

              <div className="flex gap-3 mt-1">
                <a
                  href="https://www.instagram.com/dezmatics/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Dezmatic Sound on Instagram"
                  className="social-icon-link"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="#"
                  aria-label="Dezmatic Sound on Facebook"
                  className="social-icon-link"
                >
                  <FacebookIcon />
                </a>
                <a
                  href="#"
                  aria-label="Dezmatic Sound on Spotify"
                  className="social-icon-link"
                >
                  <SpotifyIcon />
                </a>
              </div>
            </motion.div>

            {/* Column 2 — Navigation */}
            <motion.div className="flex flex-col gap-4" {...colVariants(0.15)}>
              <h3
                className="text-sm uppercase tracking-widest"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--color-blue)', letterSpacing: '0.12em' }}
              >
                NAVIGATE
              </h3>
              <nav className="flex flex-col gap-3">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="footer-nav-link text-sm"
                    style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </motion.div>

            {/* Column 3 — Contact */}
            <motion.div className="flex flex-col gap-4" {...colVariants(0.3)}>
              <h3
                className="text-sm uppercase tracking-widest"
                style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--color-blue)', letterSpacing: '0.12em' }}
              >
                GET IN TOUCH
              </h3>

              <div className="flex flex-col gap-2">
                <p
                  className="text-sm"
                  style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}
                >
                  📍 Bristol, UK
                </p>
                <p
                  className="text-sm"
                  style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}
                >
                  📱 Available for bookings nationwide
                </p>
              </div>

              <Link
                href="/contact"
                className="footer-book-btn inline-block mt-2 px-6 py-2 rounded text-sm"
                style={{
                  fontFamily: 'var(--font-display)',
                  border: '1px solid var(--color-blue)',
                  color: 'var(--color-blue)',
                  width: 'fit-content',
                }}
              >
                BOOK NOW →
              </Link>
            </motion.div>

          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <motion.div
          className="mx-auto px-6 py-6"
          style={{ maxWidth: '1200px' }}
          initial={reducedMotion ? undefined : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.8, delay: 0.4 }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p
              className="text-xs"
              style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}
            >
              © 2026 Dezmatic Sound. All rights reserved.
            </p>
            <a
              href="https://flowautomationpros.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors duration-200 hover:opacity-70"
              style={{ color: 'var(--color-muted)', fontFamily: 'var(--font-body)' }}
            >
              Website by Flow Automation Pros
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
