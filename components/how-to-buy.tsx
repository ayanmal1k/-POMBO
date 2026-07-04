'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const steps = [
  {
    number: '01',
    title: 'Create a TON Wallet',
    description:
      'Download Tonkeeper or use the built-in Telegram Wallet. Create your wallet and safely back up your seed phrase. This is your gateway to the TON ecosystem.',
    color: '#0088cc',
    glow: 'rgba(0,136,204,0.35)',
  },
  {
    number: '02',
    title: 'Get TON Coins',
    description:
      'Buy TON on any major exchange like Binance, OKX, or Bybit, then withdraw to your Tonkeeper wallet. You can also buy TON directly inside Telegram.',
    color: '#00b4d8',
    glow: 'rgba(0,180,216,0.35)',
  },
  {
    number: '03',
    title: 'Open STON.fi or DeDust',
    description:
      'Go to STON.fi or DeDust \u2014 the leading DEXes on TON. Connect your Tonkeeper wallet with one tap. No sign-up, no KYC, fully decentralized.',
    color: '#48cae4',
    glow: 'rgba(72,202,228,0.35)',
  },
  {
    number: '04',
    title: 'Swap TON for $POMBO',
    description:
      'Paste the $POMBO contract address into the swap field. Set slippage to 1\u20133%, confirm the swap in your wallet. Done \u2014 Pombo is now yours.',
    color: '#90e0ef',
    glow: 'rgba(144,224,239,0.35)',
  },
  {
    number: '05',
    title: 'Hold & Join the Flock',
    description:
      'Welcome to the carrier pigeon crew. Join the Telegram community, hold your $POMBO, and ride the meme wave. The pigeon always delivers.',
    color: '#caf0f8',
    glow: 'rgba(202,240,248,0.3)',
  },
]

function WalletIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
      <rect x="6" y="8" width="36" height="32" rx="5" stroke="currentColor" strokeWidth="2.5" />
      <path d="M6 17h36" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="33" cy="29" r="4" stroke="currentColor" strokeWidth="2.5" />
      <path d="M15 25h8M15 31h5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

function CoinIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="16" stroke="currentColor" strokeWidth="2.5" />
      <path d="M24 16v4M24 28v4" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M20 22h8c1.1 0 2 .9 2 2s-.9 2-2 2h-8c-1.1 0-2-.9-2-2s.9-2 2-2z" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function GlobeIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
      <circle cx="24" cy="24" r="15" stroke="currentColor" strokeWidth="2.5" />
      <ellipse cx="24" cy="24" rx="7" ry="15" stroke="currentColor" strokeWidth="2" />
      <path d="M9 24h30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M12 16h24M12 32h24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="3 3" />
    </svg>
  )
}

function SwapIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 18h28M10 18l6-6M10 18l6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M38 30H10M38 30l-6-6M38 30l-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function FlockIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8" xmlns="http://www.w3.org/2000/svg">
      <circle cx="16" cy="16" r="5" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="32" cy="16" r="5" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="24" cy="10" r="4" stroke="currentColor" strokeWidth="2.5" />
      <path d="M6 38c0-5.5 4.5-10 10-10h16c5.5 0 10 4.5 10 10" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  )
}

const StepIcons = [WalletIcon, CoinIcon, GlobeIcon, SwapIcon, FlockIcon]

export default function HowToBuy() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<(HTMLDivElement | null)[]>([])
  const connectorsRef = useRef<(HTMLDivElement | null)[]>([])
  const ctaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      // Header slide in
      gsap.from(headerRef.current, {
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      // Step cards — alternate left/right slide
      stepsRef.current.forEach((step, i) => {
        if (!step) return
        const xFrom = i % 2 === 1 ? 80 : -80

        gsap.from(step, {
          opacity: 0,
          x: xFrom,
          y: 30,
          scale: 0.93,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 89%',
            toggleActions: 'play none none reverse',
          },
        })

        // Icon pop-rotate
        const icon = step.querySelector('.htb-icon')
        if (icon) {
          gsap.from(icon, {
            scale: 0,
            rotate: -25,
            opacity: 0,
            duration: 0.65,
            delay: 0.2,
            ease: 'back.out(1.8)',
            scrollTrigger: {
              trigger: step,
              start: 'top 89%',
              toggleActions: 'play none none reverse',
            },
          })
        }

        // Number fade up
        const num = step.querySelector('.htb-number')
        if (num) {
          gsap.from(num, {
            opacity: 0,
            y: 16,
            duration: 0.5,
            delay: 0.1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: step,
              start: 'top 89%',
              toggleActions: 'play none none reverse',
            },
          })
        }
      })

      // Connector line draw-in
      connectorsRef.current.forEach((conn) => {
        if (!conn) return
        gsap.from(conn, {
          scaleY: 0,
          transformOrigin: 'top center',
          duration: 0.6,
          ease: 'power2.inOut',
          scrollTrigger: {
            trigger: conn,
            start: 'top 92%',
            toggleActions: 'play none none reverse',
          },
        })
      })

      // CTA bounce in + float
      if (ctaRef.current) {
        gsap.from(ctaRef.current, {
          opacity: 0,
          y: 50,
          scale: 0.85,
          duration: 0.9,
          ease: 'back.out(1.5)',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 93%',
            toggleActions: 'play none none reverse',
          },
        })
        gsap.to(ctaRef.current, {
          y: -9,
          duration: 1.9,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 1,
        })
      }
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="how-to-buy"
      className="w-full bg-[#061225] py-24 overflow-hidden relative border-t border-white/5"
    >
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[550px] h-[550px] rounded-full bg-[#0088cc]/6 blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[450px] h-[450px] rounded-full bg-[#48cae4]/5 blur-[130px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <span className="font-sans font-black text-xs sm:text-sm tracking-widest text-[#9ed3ff] mb-3 uppercase block">
            Step by Step
          </span>
          <h2 className="font-display text-white text-5xl sm:text-6xl md:text-7xl mb-6 text-stroke-pombo-sm uppercase select-none">
            HOW TO BUY
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#0088cc] to-transparent mx-auto mb-6" />
          <p className="font-sans text-[#c6e3ff] text-base sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            Buying $POMBO on TON is fast, decentralized, and fully on-chain. Follow these five steps and join the flock.
          </p>
        </div>

        {/* Steps */}
        <div className="relative flex flex-col">
          {steps.map((step, idx) => {
            const isLast = idx === steps.length - 1
            const isRight = idx % 2 === 1
            const Icon = StepIcons[idx]

            return (
              <div key={idx} className="relative">
                {/* Card */}
                <div
                  ref={(el) => { stepsRef.current[idx] = el }}
                  className={`group relative flex items-start gap-5 sm:gap-7 p-6 sm:p-8 rounded-2xl border border-white/5 bg-[#0a1e3d]/50 backdrop-blur-sm
                    hover:border-white/15 hover:bg-[#0a1e3d]/80 transition-colors duration-500 cursor-default
                    ${isRight ? 'md:ml-20' : 'md:mr-20'}`}
                  onMouseEnter={(e) => {
                    gsap.to(e.currentTarget, {
                      boxShadow: `0 8px 44px 0 ${step.glow}`,
                      duration: 0.35,
                    })
                  }}
                  onMouseLeave={(e) => {
                    gsap.to(e.currentTarget, {
                      boxShadow: '0 0 0 0 transparent',
                      duration: 0.35,
                    })
                  }}
                >
                  {/* Icon column */}
                  <div className="flex flex-col items-center gap-2 flex-shrink-0 w-16 sm:w-20">
                    <span
                      className="htb-number font-sans text-[10px] font-black tracking-[0.2em] uppercase"
                      style={{ color: step.color }}
                    >
                      {step.number}
                    </span>
                    <div
                      className="htb-icon w-14 h-14 sm:w-[72px] sm:h-[72px] rounded-2xl flex items-center justify-center border transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                      style={{
                        background: `linear-gradient(135deg, ${step.color}1a, ${step.color}08)`,
                        borderColor: `${step.color}35`,
                        color: step.color,
                        boxShadow: `0 0 24px ${step.color}20`,
                      }}
                    >
                      <Icon />
                    </div>
                  </div>

                  {/* Text column */}
                  <div className="flex flex-col justify-center pt-6">
                    <h3
                      className="font-sans font-black text-lg sm:text-xl md:text-2xl mb-2 tracking-tight leading-tight"
                      style={{ color: step.color }}
                    >
                      {step.title}
                    </h3>
                    <p className="font-sans text-[#c6e3ff]/75 text-sm sm:text-base leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Corner glow on hover */}
                  <div
                    className="absolute top-0 right-0 w-24 h-24 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `radial-gradient(circle at top right, ${step.color}20, transparent 70%)`,
                    }}
                  />
                </div>

                {/* Connector line between steps */}
                {!isLast && (
                  <div
                    ref={(el) => { connectorsRef.current[idx] = el }}
                    className={`flex items-start py-1 ${isRight ? 'md:ml-20' : 'md:mr-20'}`}
                  >
                    <div className="ml-9 sm:ml-11 flex flex-col items-center">
                      <div
                        className="w-px h-10 rounded-full"
                        style={{
                          background: `linear-gradient(to bottom, ${step.color}70, ${steps[idx + 1].color}40)`,
                        }}
                      />
                      <div
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: steps[idx + 1].color + '70' }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div ref={ctaRef} className="mt-20 flex flex-col items-center gap-4">
          <p className="font-sans text-[#9ed3ff] text-xs font-black tracking-[0.2em] uppercase">
            Ready to board?
          </p>
          <a
            href="https://ston.fi"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-2xl font-sans font-black text-base sm:text-lg text-white uppercase tracking-wider overflow-hidden transition-transform duration-200 hover:scale-105 active:scale-95"
            style={{
              background: 'linear-gradient(135deg, #0088cc, #00b4d8)',
              boxShadow: '0 0 40px rgba(0,136,204,0.5), 0 4px 20px rgba(0,0,0,0.4)',
            }}
          >
            {/* Shine sweep */}
            <span
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)',
              }}
            />
            {/* Diamond icon */}
            <svg viewBox="0 0 32 32" fill="none" className="w-6 h-6 flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 4L4 14l12 14 12-14L16 4z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
              <path d="M16 4v24M4 14h24" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            Buy $POMBO on TON
            <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5 flex-shrink-0 group-hover:translate-x-1 transition-transform duration-200" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <p className="font-sans text-[#c6e3ff]/35 text-xs">
            Also available on DeDust&nbsp;&bull;&nbsp;No KYC&nbsp;&bull;&nbsp;Fully on-chain
          </p>
        </div>

      </div>
    </section>
  )
}
