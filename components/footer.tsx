'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const footer = footerRef.current
    if (!footer) return

    const ctx = gsap.context(() => {
      // Bouncy footer reveal: content inside footer starts translated down, bounces up when revealed
      const inner = footer.querySelector('.footer-inner')
      if (!inner) return

      gsap.fromTo(
        inner,
        { yPercent: 50, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          ease: 'elastic.out(1.2, 0.5)',
          duration: 1.5,
          scrollTrigger: {
            trigger: footer,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Stagger footer elements
      const items = footer.querySelectorAll('.footer-item')
      gsap.fromTo(
        items,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Logo bounce idle
      const logo = footer.querySelector('.footer-logo')
      if (logo) {
        gsap.to(logo, {
          y: -6,
          duration: 2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        })
      }
    }, footer)

    return () => ctx.revert()
  }, [])

  return (
    <footer
      ref={footerRef}
      className="relative w-full bg-[#040d1a] border-t border-white/5 overflow-hidden"
    >
      {/* Subtle ambient glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-[#0088cc]/6 blur-[120px]" />
      </div>

      <div className="footer-inner relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">

        {/* Top section — Logo + tagline */}
        <div className="flex flex-col items-center text-center mb-14">
          <div className="footer-logo footer-item flex items-center gap-3 mb-5">
            <Image
              src="/logo.png"
              alt="POMBO Logo"
              width={52}
              height={52}
              className="rounded-full border-2 border-white/20 shadow-lg"
            />
            <span className="font-display text-white text-4xl sm:text-5xl tracking-wide select-none">
              POMBO
            </span>
          </div>
          <p className="footer-item font-sans text-[#9ed3ff] text-sm sm:text-base font-bold tracking-wider uppercase">
            Your Trusted Carrier Pigeon on TON
          </p>
          <div className="footer-item w-16 h-[2px] bg-gradient-to-r from-transparent via-[#0088cc] to-transparent mt-5" />
        </div>

        {/* Middle section — links row */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 mb-14">
          <a
            href="https://t.me/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-item group flex items-center gap-2 text-[#c6e3ff]/60 hover:text-white transition-colors duration-200"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.98 1.25-5.59 3.69-.53.36-1 .54-1.4.53-.45-.01-1.32-.25-1.97-.46-.8-.26-1.43-.4-1.38-.85.03-.24.36-.48.99-.74 3.86-1.68 6.43-2.78 7.72-3.3 3.67-1.49 4.43-1.75 4.93-1.76.11 0 .36.03.52.16.14.11.18.26.19.38 0 .07.01.22 0 .33z" />
            </svg>
            <span className="font-sans text-sm font-bold tracking-wide group-hover:translate-x-0.5 transition-transform duration-200">
              Telegram
            </span>
          </a>
          <a
            href="https://x.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-item group flex items-center gap-2 text-[#c6e3ff]/60 hover:text-white transition-colors duration-200"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
            <span className="font-sans text-sm font-bold tracking-wide group-hover:translate-x-0.5 transition-transform duration-200">
              X / Twitter
            </span>
          </a>
          <a
            href="https://dexscreener.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-item group flex items-center gap-2 text-[#c6e3ff]/60 hover:text-white transition-colors duration-200"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 3v18h18" />
              <path d="M7 16l4-8 4 4 5-10" />
            </svg>
            <span className="font-sans text-sm font-bold tracking-wide group-hover:translate-x-0.5 transition-transform duration-200">
              DexScreener
            </span>
          </a>
          <a
            href="https://ston.fi"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-item group flex items-center gap-2 text-[#c6e3ff]/60 hover:text-white transition-colors duration-200"
          >
            <Image src="/ton logo.png" alt="TON" width={18} height={18} />
            <span className="font-sans text-sm font-bold tracking-wide group-hover:translate-x-0.5 transition-transform duration-200">
              STON.fi
            </span>
          </a>
        </div>

        {/* Divider */}
        <div className="footer-item w-full h-px bg-white/5 mb-8" />

        {/* Bottom section — copyright + disclaimer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="footer-item flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="POMBO"
              width={20}
              height={20}
              className="rounded-full opacity-40"
            />
            <p className="font-sans text-[#c6e3ff]/30 text-xs sm:text-sm">
              &copy; {new Date().getFullYear()} $POMBO. All rights reserved.
            </p>
          </div>
          <p className="footer-item font-sans text-[#c6e3ff]/20 text-[10px] sm:text-xs text-center sm:text-right max-w-sm">
            $POMBO is a meme token with no intrinsic value or expectation of financial return. Not financial advice. DYOR.
          </p>
        </div>

      </div>
    </footer>
  )
}
