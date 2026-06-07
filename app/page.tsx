import Hero from '@/components/Hero'
import AboutStrip from '@/components/AboutStrip'
import EventsStrip from '@/components/EventsStrip'
import GalleryTeaser from '@/components/GalleryTeaser'
import TestimonialsSection from '@/components/TestimonialsSection'
import BookingCTABanner from '@/components/BookingCTABanner'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Hero />
      <AboutStrip />
      <EventsStrip />
      <GalleryTeaser />
      <TestimonialsSection />
      <BookingCTABanner />
      <Footer />
    </main>
  )
}
