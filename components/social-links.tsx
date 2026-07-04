'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const CONTRACT_ADDRESS = 'EQAme5Z3_wsVhvSemTvwFToq2AIRz_NSfEdiKOgdI8H11EPh'

interface PriceData {
  priceUsd: string | null
  priceChange24h: number | null
  volume24h: number | null
  liquidity: number | null
  pairUrl: string | null
}

const socialLinks = [
  {
    name: 'Telegram',
    href: 'https://t.me/',
    description: 'Join the flock',
    color: '#0088cc',
    icon: (
      <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.98 1.25-5.59 3.69-.53.36-1 .54-1.4.53-.45-.01-1.32-.25-1.97-.46-.8-.26-1.43-.4-1.38-.85.03-.24.36-.48.99-.74 3.86-1.68 6.43-2.78 7.72-3.3 3.67-1.49 4.43-1.75 4.93-1.76.11 0 .36.03.52.16.14.11.18.26.19.38 0 .07.01.22 0 .33z" />
      </svg>
    ),
  },
  {
    name: 'X / Twitter',
    href: 'https://x.com/',
    description: 'Follow updates',
    color: '#ffffff',
    icon: (
      <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: 'DexScreener',
    href: 'https://dexscreener.com/',
    description: 'Live chart',
    color: '#4ade80',
    icon: (
      <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 3v18h18" />
        <path d="M7 16l4-8 4 4 5-10" />
      </svg>
    ),
  },
]


export default function SocialLinks() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLDivElement>(null)
  const linksRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const priceRef = useRef<HTMLDivElement>(null)
  const [price, setPrice] = useState<PriceData>({
    priceUsd: null,
    priceChange24h: null,
    volume24h: null,
    liquidity: null,
    pairUrl: null,
  })

  // Fetch live price from DexScreener
  useEffect(() => {
    const fetchPrice = async () => {
      try {
        const res = await fetch(
          `https://api.dexscreener.com/latest/dex/tokens/${CONTRACT_ADDRESS}`
        )
        const data = await res.json()
        if (data.pairs && data.pairs.length > 0) {
          // Use the pair with highest liquidity
          const sorted = [...data.pairs].sort(
            (a: { liquidity?: { usd?: number } }, b: { liquidity?: { usd?: number } }) =>
              (b.liquidity?.usd ?? 0) - (a.liquidity?.usd ?? 0)
          )
          const best = sorted[0]
          setPrice({
            priceUsd: best.priceUsd ?? null,
            priceChange24h: best.priceChange?.h24 ?? null,
            volume24h: best.volume?.h24 ?? null,
            liquidity: best.liquidity?.usd ?? null,
            pairUrl: best.url ?? null,
          })
        }
      } catch {
        // Silently fail — price section just won't show
      }
    }

    fetchPrice()
    // Refresh every 30 seconds
    const interval = setInterval(fetchPrice, 30000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Header
      if (headerRef.current) {
        gsap.from(headerRef.current, {
          opacity: 0,
          y: 50,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: headerRef.current,
            start: 'top 86%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      // Video slide in from left
      if (videoRef.current) {
        gsap.from(videoRef.current, {
          opacity: 0,
          x: -100,
          scale: 0.92,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: videoRef.current,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      // Links stagger from right
      if (linksRef.current) {
        const cards = linksRef.current.querySelectorAll('.social-card')
        gsap.from(cards, {
          opacity: 0,
          x: 80,
          y: 20,
          stagger: 0.12,
          duration: 0.75,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: linksRef.current,
            start: 'top 88%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      // Price ticker
      if (priceRef.current) {
        gsap.from(priceRef.current, {
          opacity: 0,
          y: 30,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: priceRef.current,
            start: 'top 92%',
            toggleActions: 'play none none reverse',
          },
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  const formatPrice = (p: string | null) => {
    if (!p) return '...'
    const num = parseFloat(p)
    if (num === 0) return '$0.00'
    if (num < 0.000001) {
      // Show as $0.0₅1234 style (subscript zeros notation)
      const str = num.toFixed(20).replace(/0+$/, '')
      const match = str.match(/^0\.(0+)/)
      if (match) {
        const zeroCount = match[1].length
        const significantDigits = str.slice(2 + zeroCount, 2 + zeroCount + 4)
        return `$0.0...${significantDigits}`
      }
      return `$${num.toFixed(10).replace(/0+$/, '')}`
    }
    if (num < 0.01) return `$${num.toFixed(8).replace(/0+$/, '')}`
    if (num < 1) return `$${num.toFixed(6).replace(/0+$/, '')}`
    if (num < 100) return `$${num.toFixed(4).replace(/0+$/, '')}`
    return `$${num.toFixed(2)}`
  }

  const formatVolume = (v: number | null) => {
    if (!v) return '...'
    if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`
    if (v >= 1_000) return `$${(v / 1_000).toFixed(1)}K`
    return `$${v.toFixed(0)}`
  }

  return (
    <section
      ref={sectionRef}
      id="community"
      className="w-full relative overflow-hidden border-t border-white/5"
      style={{ backgroundImage: "url('/hero bg.png')", backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#061225]/80 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#061225] via-transparent to-[#061225] pointer-events-none" />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-0 w-[500px] h-[500px] rounded-full bg-[#0088cc]/8 blur-[140px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#48cae4]/6 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <span className="font-sans font-black text-xs sm:text-sm tracking-widest text-[#9ed3ff] mb-3 uppercase block">
            Join the Community
          </span>
          <h2 className="font-display text-white text-5xl sm:text-6xl md:text-7xl mb-6 text-stroke-pombo-sm uppercase select-none">
            FLY WITH US
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#0088cc] to-transparent mx-auto mb-6" />
          <p className="font-sans text-[#c6e3ff] text-base sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            The pigeon flock grows every day. Join the community, track the chart, and become part of the legacy.
          </p>
        </div>

        {/* Live price ticker */}
        <div ref={priceRef} className="mb-12 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <div className="flex items-center gap-3 bg-[#0a1e3d]/60 backdrop-blur-md border border-white/10 rounded-2xl px-5 py-3">
            <Image src="/logo.png" alt="POMBO" width={28} height={28} className="rounded-full" />
            <span className="font-sans font-black text-white text-lg sm:text-xl tracking-tight">
              $POMBO
            </span>
            <span className="font-mono font-black text-[#48cae4] text-lg sm:text-xl">
              {formatPrice(price.priceUsd)}
            </span>
            {price.priceChange24h !== null && (
              <span
                className={`font-sans font-black text-sm px-2 py-0.5 rounded-lg ${
                  price.priceChange24h >= 0
                    ? 'text-emerald-400 bg-emerald-400/10'
                    : 'text-red-400 bg-red-400/10'
                }`}
              >
                {price.priceChange24h >= 0 ? '+' : ''}
                {price.priceChange24h.toFixed(1)}%
              </span>
            )}
          </div>
          <div className="flex items-center gap-4 text-xs sm:text-sm font-sans font-bold text-[#9ed3ff]/60">
            <span>
              24h Vol:{' '}
              <span className="text-[#c6e3ff] font-black">{formatVolume(price.volume24h)}</span>
            </span>
            <span className="text-white/10">|</span>
            <span>
              Liquidity:{' '}
              <span className="text-[#c6e3ff] font-black">{formatVolume(price.liquidity)}</span>
            </span>
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-emerald-300 font-black tracking-wider uppercase text-[10px]">Live</span>
            </div>
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

          {/* Left — Glide video (unboxed, no border/container) */}
          <div ref={videoRef} className="relative flex items-center justify-center">
            <video
              src="/glide.webm"
              autoPlay
              loop
              muted
              playsInline
              className="w-full max-w-[680px] h-auto object-contain drop-shadow-[0_20px_60px_rgba(0,136,204,0.3)]"
              style={{ filter: 'url(#social-erode)' }}
              aria-hidden="true"
            />
            {/* Behind glow */}
            <div className="absolute w-[70%] h-[70%] rounded-full bg-[#0088cc]/12 blur-[100px] pointer-events-none" />
          </div>

          {/* Right — Social link cards */}
          <div ref={linksRef} className="flex flex-col gap-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`social-card group relative flex items-center gap-5 p-5 sm:p-6 rounded-2xl border backdrop-blur-sm transition-all duration-300 cursor-pointer overflow-hidden
                  ${link.isPrimary
                    ? 'bg-gradient-to-r from-[#0088cc]/20 to-[#00b4d8]/10 border-[#0088cc]/40 hover:border-[#0088cc]/70 hover:from-[#0088cc]/30 hover:to-[#00b4d8]/20 hover:shadow-[0_8px_40px_rgba(0,136,204,0.3)]'
                    : 'bg-[#0a1e3d]/50 border-white/5 hover:border-white/15 hover:bg-[#0a1e3d]/80 hover:shadow-[0_8px_30px_rgba(0,0,0,0.3)]'
                  }`}
              >
                {/* Icon */}
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center border flex-shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                  style={{
                    background: `linear-gradient(135deg, ${link.color}1a, ${link.color}08)`,
                    borderColor: `${link.color}35`,
                    color: link.color,
                    boxShadow: `0 0 20px ${link.color}15`,
                  }}
                >
                  {link.icon}
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <h3
                    className="font-sans font-black text-lg sm:text-xl tracking-tight leading-tight mb-0.5"
                    style={{ color: link.isPrimary ? '#ffffff' : link.color }}
                  >
                    {link.name}
                  </h3>
                  <p className="font-sans text-[#c6e3ff]/60 text-sm">
                    {link.description}
                  </p>
                </div>

                {/* Arrow */}
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  className="w-5 h-5 text-[#c6e3ff]/30 flex-shrink-0 group-hover:text-white group-hover:translate-x-1 transition-all duration-200"
                >
                  <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>

                {/* Corner glow */}
                <div
                  className="absolute top-0 right-0 w-28 h-28 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at top right, ${link.color}15, transparent 70%)`,
                  }}
                />

                {/* Shimmer on primary */}
                {link.isPrimary && (
                  <span
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                    style={{
                      background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.06) 50%, transparent 70%)',
                    }}
                  />
                )}
              </a>
            ))}

            {/* TON Blockchain badge */}
            <div className="flex items-center justify-center gap-3 mt-4 px-6 py-3 rounded-xl bg-[#0a1e3d]/30 border border-white/5">
              <Image src="/ton logo.png" alt="TON" width={20} height={20} className="animate-pulse" />
              <span className="font-sans text-xs font-black tracking-[0.15em] text-[#9ed3ff]/60 uppercase">
                Powered by TON Blockchain
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* SVG erode filter for video alpha fringe (same as hero) */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="social-erode">
            <feMorphology operator="erode" radius="1.2" in="SourceAlpha" result="eroded" />
            <feComposite in="SourceGraphic" in2="eroded" operator="in" />
          </filter>
        </defs>
      </svg>
    </section>
  )
}
