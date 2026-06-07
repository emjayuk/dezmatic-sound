'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import BookingCTABanner from '@/components/BookingCTABanner'
import Footer from '@/components/Footer'
import { EyeIcon, CloseIcon } from '@/components/icons/EventIcons'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

type ImageItem = { type: 'image'; src: string; alt: string; heightPx: string }
type VideoItem = { type: 'video'; src: string; label: string; heightPx: string }
type GalleryItem = ImageItem | VideoItem

type RawItem =
  | { type: 'image'; src: string; alt: string }
  | { type: 'video'; src: string; label: string }

const HEADLINE = 'FEEL THE VIBE'

const RAW_ITEMS: RawItem[] = [
  { type: 'image', src: '/gallery/event-crowd-1.jpg',  alt: 'Dezmatic Sound event crowd' },
  { type: 'image', src: '/gallery/event-crowd-2.png',  alt: 'Dezmatic Sound crowd energy' },
  { type: 'video', src: '/gallery/event-video-1.mov',  label: 'Event Highlights' },
  { type: 'image', src: '/gallery/event-night-1.jpg',  alt: 'Dezmatic Sound night event' },
  { type: 'image', src: '/gallery/event-night-2.png',  alt: 'Dezmatic Sound night vibes' },
  { type: 'video', src: '/gallery/event-video-2.mov',  label: 'Club Night' },
  { type: 'image', src: '/gallery/event-vibes-1.png',  alt: 'Dezmatic Sound event vibes' },
  { type: 'video', src: '/gallery/event-video-3.mov',  label: 'Live Session' },
  { type: 'video', src: '/gallery/event-video-4.mov',  label: 'Crowd Energy' },
  { type: 'image', src: '/gallery/event-vibes-2.png',  alt: 'Dezmatic Sound event atmosphere' },
  { type: 'image', src: '/gallery/event-stage-1.png',  alt: 'Dezmatic Sound stage setup' },
  { type: 'video', src: '/gallery/event-video-5.mov',  label: 'Stage Vibes' },
  { type: 'video', src: '/gallery/event-video-6.mov',  label: 'Dance Floor' },
  { type: 'video', src: '/gallery/event-video-7.mov',  label: 'Event Night' },
  { type: 'image', src: '/gallery/event-stage-2.png',  alt: 'Dezmatic Sound stage energy' },
  { type: 'image', src: '/gallery/event-stage-3.png',  alt: 'Dezmatic Sound stage crowd' },
]

function buildGalleryItems(): GalleryItem[] {
  let imageCount = 0
  let videoCount = 0
  return RAW_ITEMS.map((item) => {
    if (item.type === 'image') {
      const heightPx = imageCount % 2 === 0 ? '288px' : '384px'
      imageCount++
      return { ...item, heightPx } as ImageItem
    } else {
      const heightPx = videoCount % 2 === 0 ? '320px' : '420px'
      videoCount++
      return { ...item, heightPx } as VideoItem
    }
  })
}

const GALLERY_ITEMS = buildGalleryItems()

const charContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.04 } },
}

const charVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: EASE_OUT_EXPO },
  },
}

const gridContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
}

const tileEntranceVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' as const },
  },
}

const imageScaleVariants = {
  rest: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.3, ease: 'easeOut' as const } },
}

const overlayVariants = {
  rest: { opacity: 0 },
  hover: { opacity: 1, transition: { duration: 0.25 } },
}

function ImageTile({
  item,
  onClick,
}: {
  item: ImageItem
  onClick: () => void
}) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      variants={reducedMotion ? {} : tileEntranceVariants}
      className="mb-4"
      style={{ breakInside: 'avoid' }}
    >
      <motion.div
        initial="rest"
        whileHover={reducedMotion ? undefined : 'hover'}
        onClick={onClick}
        className="relative rounded-xl overflow-hidden cursor-pointer"
        style={{ height: item.heightPx }}
      >
        <motion.div
          variants={reducedMotion ? {} : imageScaleVariants}
          className="absolute inset-0"
        >
          <Image
            src={item.src}
            alt={item.alt}
            fill
            style={{ objectFit: 'cover', objectPosition: 'center' }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </motion.div>

        <motion.div
          variants={reducedMotion ? {} : overlayVariants}
          className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none"
          style={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
        >
          <span style={{ color: 'var(--color-white)' }}>
            <EyeIcon />
          </span>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              color: 'var(--color-white)',
              fontSize: '0.7rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            VIEW
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

function VideoTile({ item }: { item: VideoItem }) {
  const reducedMotion = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  const handleMouseEnter = () => {
    setPlaying(true)
    videoRef.current?.play().catch(() => {})
  }

  const handleMouseLeave = () => {
    setPlaying(false)
    if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }

  const handleClick = () => {
    if (!videoRef.current) return
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {})
      setPlaying(true)
    } else {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
      setPlaying(false)
    }
  }

  return (
    <motion.div
      variants={reducedMotion ? {} : tileEntranceVariants}
      className="mb-4"
      style={{ breakInside: 'avoid' }}
    >
      <motion.div
        whileHover={reducedMotion ? undefined : { scale: 1.02, transition: { duration: 0.3 } }}
        className="relative rounded-xl overflow-hidden cursor-pointer"
        style={{ height: item.heightPx }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <video
          ref={videoRef}
          src={item.src}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full"
          style={{ objectFit: 'cover' }}
        />

        <motion.div
          animate={{ opacity: playing ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-3 pointer-events-none"
          style={{ backgroundColor: 'rgba(0,0,0,0.45)' }}
        >
          <span
            style={{
              fontSize: '2.5rem',
              lineHeight: 1,
              color: 'var(--color-white)',
              display: 'block',
            }}
            aria-hidden="true"
          >
            ▶
          </span>
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              color: 'var(--color-white)',
              fontSize: '0.7rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
            }}
          >
            {item.label}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

function Lightbox({ src, onClose }: { src: string; onClose: () => void }) {
  return (
    <motion.div
      key="lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.95)' }}
      onClick={onClose}
    >
      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 transition-opacity duration-200 hover:opacity-60"
        style={{ color: 'var(--color-white)' }}
        aria-label="Close lightbox"
      >
        <CloseIcon />
      </button>

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: 'min(90vw, 1200px)',
          height: 'min(90vh, 800px)',
        }}
      >
        <Image
          src={src}
          alt="Gallery image"
          fill
          style={{ objectFit: 'contain' }}
          sizes="90vw"
        />
      </motion.div>
    </motion.div>
  )
}

function InstagramIcon() {
  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  )
}

export default function GalleryPageClient() {
  const reducedMotion = useReducedMotion()
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null)
  const chars = HEADLINE.split('')

  return (
    <main>

      {/* ── SECTION 1: Page Hero ── */}
      <section
        className="flex flex-col items-center justify-center text-center px-6 pt-32 pb-20"
        style={{ minHeight: '50vh', backgroundColor: 'var(--color-bg)' }}
      >
        <motion.h1
          variants={reducedMotion ? {} : charContainerVariants}
          initial="hidden"
          animate="visible"
          className="text-4xl sm:text-6xl md:text-8xl leading-none mb-6 uppercase"
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 800,
            color: 'var(--color-white)',
            letterSpacing: '-0.02em',
            lineHeight: 0.95,
          }}
          aria-label={HEADLINE}
        >
          {reducedMotion
            ? HEADLINE
            : chars.map((char, i) => (
                <motion.span
                  key={i}
                  variants={charVariants}
                  style={{ display: 'inline-block' }}
                >
                  {char === ' ' ? ' ' : char}
                </motion.span>
              ))}
        </motion.h1>

        <motion.p
          initial={reducedMotion ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.7, delay: 0.8 }}
          className="text-base mx-auto text-center"
          style={{
            color: 'var(--color-muted)',
            fontFamily: 'var(--font-body)',
            maxWidth: '480px',
            lineHeight: 1.6,
          }}
        >
          Real events. Real energy. Real Dezmatic Sound.
        </motion.p>
      </section>

      {/* ── SECTION 2: Gallery Grid ── */}
      <section className="py-16 px-6" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="mx-auto" style={{ maxWidth: '1400px' }}>
          <motion.div
            variants={reducedMotion ? {} : gridContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-40px' }}
            className="columns-1 sm:columns-2 lg:columns-3 gap-4"
          >
            {GALLERY_ITEMS.map((item, i) =>
              item.type === 'image' ? (
                <ImageTile
                  key={i}
                  item={item}
                  onClick={() => setLightboxSrc(item.src)}
                />
              ) : (
                <VideoTile key={i} item={item} />
              )
            )}
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 3: Instagram CTA ── */}
      <section className="py-16 px-6" style={{ backgroundColor: '#111111' }}>
        <motion.div
          initial={reducedMotion ? undefined : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.7, ease: 'easeOut' }}
          className="mx-auto flex flex-col items-center text-center"
          style={{ maxWidth: '800px' }}
        >
          <span style={{ color: 'var(--color-white)' }}>
            <InstagramIcon />
          </span>

          <h2
            className="text-4xl mt-4 uppercase"
            style={{
              fontFamily: 'var(--font-display)',
              fontWeight: 800,
              color: 'var(--color-white)',
              letterSpacing: '-0.01em',
            }}
          >
            FOLLOW THE JOURNEY
          </h2>

          <p
            className="mt-2 mx-auto text-center"
            style={{
              fontFamily: 'var(--font-body)',
              color: 'var(--color-muted)',
              maxWidth: '480px',
              lineHeight: 1.6,
            }}
          >
            See our latest events, mixes and behind-the-scenes moments on Instagram.
          </p>

          <motion.a
            href="https://www.instagram.com/dezmatics/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={reducedMotion ? undefined : { scale: 1.05, filter: 'brightness(1.1)' }}
            transition={{ duration: 0.2 }}
            className="inline-block mt-6 px-10 py-4 rounded-full"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: '0.9rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              background: 'linear-gradient(135deg, #833ab4, #fd1d1d, #f77737)',
              color: 'var(--color-white)',
              minHeight: '52px',
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            @dezmatics
          </motion.a>
        </motion.div>
      </section>

      {/* ── SECTION 4: Booking CTA ── */}
      <BookingCTABanner
        headline="LIKE WHAT YOU SEE?"
        subheading="Book Dezmatic Sound and create memories worth capturing."
        buttonText="BOOK US NOW"
        buttonLink="/contact"
      />

      <Footer />

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxSrc && (
          <Lightbox src={lightboxSrc} onClose={() => setLightboxSrc(null)} />
        )}
      </AnimatePresence>
    </main>
  )
}
