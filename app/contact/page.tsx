'use client'

import { motion, useReducedMotion } from 'framer-motion'
import BookingCTABanner from '@/components/BookingCTABanner'
import Footer from '@/components/Footer'

const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const

// ─── Data ─────────────────────────────────────────────────────────────────────

const HEADLINE_WORDS = ["LET'S", 'MAKE', 'SOMETHING', 'SPECIAL']

const INFO_ROWS = [
  { icon: '📍', text: 'Bristol, UK — Available nationwide & internationally' },
  { icon: '🕐', text: 'We typically respond within a few hours' },
  { icon: '🎵', text: 'Weddings · Club Nights · Carnivals · Corporate · Private Hire' },
]

// ─── Variants ─────────────────────────────────────────────────────────────────

const wordContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

const wordVariants = {
  hidden: { y: 60, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, ease: EASE_OUT_EXPO },
  },
}

// ─── WhatsApp SVG icon ────────────────────────────────────────────────────────

function WhatsAppIcon({ size = 64 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="#25D366"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      aria-label="WhatsApp"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const reducedMotion = useReducedMotion()

  return (
    <main>

      {/* ── SECTION 1: Page Hero ── */}
      <section
        className="flex flex-col items-center justify-center text-center px-6 pt-32 pb-20"
        style={{ minHeight: '50vh', backgroundColor: 'var(--color-bg)' }}
      >
        {/* Headline — word stagger */}
        <motion.div
          variants={reducedMotion ? {} : wordContainerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center gap-x-5 gap-y-2 mb-6"
          aria-label="Let's make something special"
        >
          {HEADLINE_WORDS.map((word) => (
            <motion.h1
              key={word}
              variants={reducedMotion ? {} : wordVariants}
              className="text-3xl sm:text-4xl md:text-7xl leading-none uppercase"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-white)', letterSpacing: '-0.01em', lineHeight: 0.95 }}
            >
              {word}
            </motion.h1>
          ))}
        </motion.div>

        {/* Subheading */}
        <motion.p
          initial={reducedMotion ? undefined : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={reducedMotion ? { duration: 0 } : { duration: 0.7, delay: 0.7 }}
          className="text-lg mx-auto"
          style={{
            maxWidth: '600px',
            color: 'var(--color-muted)',
            fontFamily: 'var(--font-body)',
          }}
        >
          Ready to book or just have a question? Hit us on WhatsApp and we&apos;ll get back to you fast.
        </motion.p>
      </section>

      {/* ── SECTION 2: Contact Card ── */}
      <section className="py-24 px-6" style={{ backgroundColor: 'var(--color-bg)' }}>
        <div className="mx-auto" style={{ maxWidth: '600px' }}>
          <motion.div
            initial={reducedMotion ? undefined : { y: 40, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.8, ease: 'easeOut' }}
            className="rounded-2xl p-12 flex flex-col items-center text-center"
            style={{
              backgroundColor: 'var(--color-surface)',
              border: '1px solid rgba(77,184,232,0.15)',
              borderLeft: '3px solid var(--color-blue)',
            }}
          >
            {/* WhatsApp icon — spring entrance + idle pulse */}
            <motion.div
              initial={reducedMotion ? undefined : { scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={
                reducedMotion
                  ? { duration: 0 }
                  : { type: 'spring', stiffness: 260, damping: 18, delay: 0.3 }
              }
            >
              <motion.div
                animate={reducedMotion ? undefined : { scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <WhatsAppIcon size={64} />
              </motion.div>
            </motion.div>

            {/* Heading */}
            <h2
              className="text-2xl md:text-3xl mt-6 uppercase"
              style={{ fontFamily: 'var(--font-display)', fontWeight: 800, color: 'var(--color-white)', letterSpacing: '-0.01em' }}
            >
              CHAT WITH US ON WHATSAPP
            </h2>

            {/* Subtext */}
            <p
              className="mt-3 leading-relaxed"
              style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)' }}
            >
              We&apos;re available to discuss bookings, answer questions, and talk through your event ideas.
            </p>

            {/* Primary WhatsApp button */}
            <motion.div
              initial={reducedMotion ? undefined : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={reducedMotion ? { duration: 0 } : { duration: 0.6, delay: 0.5 }}
              className="w-full mt-8"
            >
              <motion.a
                href="https://wa.me/447703762300"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={reducedMotion ? undefined : { scale: 1.02, backgroundColor: '#1ebe5d' }}
                transition={{ duration: 0.2 }}
                animate={
                  reducedMotion
                    ? undefined
                    : {
                        boxShadow: [
                          '0 0 20px rgba(37,211,102,0.3)',
                          '0 0 40px rgba(37,211,102,0.5)',
                          '0 0 20px rgba(37,211,102,0.3)',
                        ],
                      }
                }
                style={{
                  display: 'block',
                  width: '100%',
                  padding: '1.125rem',
                  borderRadius: '12px',
                  backgroundColor: '#25D366',
                  color: 'var(--color-white)',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  fontSize: '1rem',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  textDecoration: 'none',
                  minHeight: '52px',
                }}
              >
                MESSAGE US ON WHATSAPP →
              </motion.a>
            </motion.div>

            {/* Divider */}
            <div
              className="w-full mt-8"
              style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}
            />

            {/* Info rows */}
            <div className="w-full mt-6 flex flex-col gap-4">
              {INFO_ROWS.map((row) => (
                <div
                  key={row.icon}
                  className="flex items-start gap-3 text-left"
                >
                  <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: '2px' }}>
                    {row.icon}
                  </span>
                  <span
                    className="text-sm leading-snug"
                    style={{ fontFamily: 'var(--font-body)', color: 'var(--color-muted)' }}
                  >
                    {row.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Social links */}
            <div className="mt-6 flex gap-4 justify-center">
              <a
                href="https://www.instagram.com/dezmatics/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm transition-all duration-200 hover:underline"
                style={{
                  fontFamily: 'var(--font-body)',
                  color: 'var(--color-blue)',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--color-orange)' }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--color-blue)' }}
              >
                @dezmatics
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── SECTION 3: Booking CTA ── */}
      <BookingCTABanner
        headline="READY TO BOOK?"
        subheading="Drop us a message on WhatsApp and let's make your event unforgettable."
        buttonText="WHATSAPP US NOW"
        buttonLink="https://wa.me/447703762300"
      />

      <Footer />
    </main>
  )
}
