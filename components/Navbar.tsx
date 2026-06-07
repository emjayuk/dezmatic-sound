'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { CloseIcon } from './icons/EventIcons'

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Events', href: '/events' },
  { label: 'About', href: '/about' },
  { label: 'Gallery', href: '/gallery' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 h-20"
        animate={{
          backgroundColor: scrolled
            ? 'rgba(13, 13, 13, 0.95)'
            : 'rgba(13, 13, 13, 0)',
          backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
        }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Dezmatic Sound"
            width={150}
            height={56}
            className="h-[44px] md:h-[56px] w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
              <div
                key={link.href}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '3px' }}
              >
                <Link
                  href={link.href}
                  className={`uppercase tracking-widest text-sm transition-colors duration-200 ${
                    isActive ? 'text-[var(--color-blue)]' : 'text-white hover:text-[var(--color-blue)]'
                  }`}
                  style={{ fontFamily: 'var(--font-body)' }}
                >
                  {link.label}
                </Link>
                <span
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '2px',
                    backgroundColor: isActive ? 'var(--color-blue)' : 'transparent',
                    borderRadius: '1px',
                    transition: 'background-color 0.2s ease',
                  }}
                />
              </div>
            )
          })}
          <Link
            href="/contact"
            className="book-now-btn px-6 py-2 rounded text-sm uppercase transition-all duration-200"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              backgroundColor: 'transparent',
              border: '2px solid #F5A623',
              color: '#F5A623',
              letterSpacing: '0.05em',
              minHeight: '44px',
              display: 'inline-flex',
              alignItems: 'center',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#F5A623'
              e.currentTarget.style.color = '#0D0D0D'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#F5A623'
            }}
          >
            BOOK NOW
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setMenuOpen(true)}
          aria-label="Open navigation menu"
        >
          <span className="block w-6 h-[2px] rounded" style={{ backgroundColor: 'var(--color-white)' }} />
          <span className="block w-6 h-[2px] rounded" style={{ backgroundColor: 'var(--color-white)' }} />
          <span className="block w-6 h-[2px] rounded" style={{ backgroundColor: 'var(--color-white)' }} />
        </button>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[100] flex flex-col px-8 pt-10 pb-16"
            style={{ backgroundColor: 'var(--color-bg)' }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            {/* Close button */}
            <button
              className="absolute top-6 right-6 p-2 transition-opacity duration-200 hover:opacity-60"
              style={{ color: 'var(--color-white)' }}
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              <CloseIcon />
            </button>

            {/* Logo in menu */}
            <Link href="/" onClick={() => setMenuOpen(false)} className="mb-12">
              <Image
                src="/logo.png"
                alt="Dezmatic Sound"
                width={120}
                height={44}
                className="h-[44px] w-auto object-contain"
              />
            </Link>

            {/* Mobile nav links */}
            <nav className="flex flex-col gap-8">
              {navLinks.map((link, i) => {
                const isActive = pathname === link.href
                return (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.08, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMenuOpen(false)}
                      className="uppercase tracking-tight transition-colors duration-200"
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '2.5rem',
                        fontWeight: 800,
                        color: isActive ? 'var(--color-blue)' : 'var(--color-white)',
                        letterSpacing: '-0.01em',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = 'var(--color-blue)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = isActive ? 'var(--color-blue)' : 'var(--color-white)'
                      }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                )
              })}

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + navLinks.length * 0.08, duration: 0.3 }}
                className="mt-4"
              >
                <Link
                  href="/contact"
                  onClick={() => setMenuOpen(false)}
                  className="inline-block px-8 py-3 rounded tracking-wide transition-all duration-200"
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: '1rem',
                    letterSpacing: '0.05em',
                    backgroundColor: 'transparent',
                    border: '2px solid #F5A623',
                    color: '#F5A623',
                    textTransform: 'uppercase',
                    minHeight: '44px',
                    display: 'inline-flex',
                    alignItems: 'center',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#F5A623'
                    e.currentTarget.style.color = '#0D0D0D'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = '#F5A623'
                  }}
                >
                  BOOK NOW
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
