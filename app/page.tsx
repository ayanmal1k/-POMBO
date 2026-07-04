import SmoothScroll from '@/components/smooth-scroll'
import Hero from '@/components/hero'
import MemesSection from '@/components/memes-section'
import HowToBuy from '@/components/how-to-buy'
import SocialLinks from '@/components/social-links'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#061225] font-sans antialiased text-white selection:bg-[#0088cc] selection:text-white">
        <Hero />
        <MemesSection />
        <HowToBuy />
        <SocialLinks />
        <Footer />
      </main>
    </SmoothScroll>
  )
}

