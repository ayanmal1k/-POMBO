import SmoothScroll from '@/components/smooth-scroll'
import Hero from '@/components/hero'

export default function Home() {
  return (
    <SmoothScroll>
      <main className="min-h-screen bg-[#061225] font-sans antialiased text-white selection:bg-[#0088cc] selection:text-white">
        <Hero />
      </main>
    </SmoothScroll>
  )
}
