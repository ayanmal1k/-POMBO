'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Flip } from 'gsap/Flip'

const memes = [
  {
    src: '/meme/WhatsApp Image 2026-07-04 at 11.54.45 PM.jpeg',
    alt: 'Pombo Meme 1',
  },
  {
    src: '/meme/WhatsApp Image 2026-07-04 at 11.54.45 PM (1).jpeg',
    alt: 'Pombo Meme 2',
  },
  {
    src: '/meme/og.jpeg', // Center Item
    alt: 'Original WhatsApp Pigeon Emoji Meme',
  },
  {
    src: '/meme/WhatsApp Image 2026-07-04 at 11.54.46 PM.jpeg',
    alt: 'Pombo Meme 3',
  },
  {
    src: '/meme/WhatsApp Image 2026-07-04 at 11.54.46 PM (1).jpeg',
    alt: 'Pombo Meme 4',
  },
  {
    src: '/meme/WhatsApp Image 2026-07-04 at 11.54.47 PM.jpeg',
    alt: 'Pombo Meme 5',
  },
  {
    src: '/meme/WhatsApp Image 2026-07-04 at 11.54.48 PM.jpeg',
    alt: 'Pombo Meme 6',
  },
  {
    src: '/meme/WhatsApp Image 2026-07-04 at 11.54.48 PM (1).jpeg',
    alt: 'Pombo Meme 7',
  },
]

export default function MemesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const galleryRef = useRef<HTMLDivElement>(null)
  const itemsRef = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger, Flip)

    let ctx: any
    let animationFrameId: number
    let timeoutId: NodeJS.Timeout

    const initFlip = () => {
      const gallery = galleryRef.current
      const container = containerRef.current
      if (!gallery || !container) return

      const items = itemsRef.current.filter((item): item is HTMLDivElement => item !== null)
      if (items.length < 8) {
        animationFrameId = requestAnimationFrame(initFlip)
        return
      }

      // Check if layout dimensions are resolved (non-zero width and height)
      const bounds = items.map((item) => item.getBoundingClientRect())
      const isZero = bounds.some((b) => b.width === 0 || b.height === 0)
      if (isZero) {
        animationFrameId = requestAnimationFrame(initFlip)
        return
      }

      ctx = gsap.context(() => {
        // Ensure starting state
        gallery.classList.remove('gallery--final')

        // Capture expanded state layouts
        gallery.classList.add('gallery--final')
        const state = Flip.getState(items, { props: 'style,transform,border-radius' })
        gallery.classList.remove('gallery--final')

        // Create Flip tween (animating from current small state to captured final state)
        const flipTween = Flip.to(state, {
          simple: true,
          ease: 'power1.inOut',
        })

        // Setup ScrollTrigger with Pinning
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: container,
            start: 'center center',
            end: '+=140%',
            scrub: true,
            pin: true,
            anticipatePin: 1,
          },
        })

        tl.add(flipTween)

        // Fade in the story overlay inside the center item
        tl.fromTo(
          '.meme-story-overlay',
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.35,
            ease: 'power2.out',
          },
          '-=0.15'
        )
      }, container)
    }

    // Wait until document styles are settled, then run initialization
    const handleStart = () => {
      timeoutId = setTimeout(initFlip, 200)
    }

    if (document.readyState === 'complete') {
      handleStart()
    } else {
      window.addEventListener('load', handleStart)
    }

    return () => {
      cancelAnimationFrame(animationFrameId)
      clearTimeout(timeoutId)
      window.removeEventListener('load', handleStart)
      if (ctx) ctx.revert()
    }
  }, [])

  return (
    <section id="memes" className="w-full bg-[#061225] py-20 overflow-hidden relative border-t border-white/5">
      {/* Background ambient light */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#0088cc]/5 blur-[120px] pointer-events-none" />

      {/* Header Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16 relative z-10">
        <span className="font-sans font-black text-xs sm:text-sm tracking-widest text-[#9ed3ff] mb-3 uppercase block">
          Pombo Meme Heritage
        </span>
        <h2 className="font-display text-white text-5xl sm:text-6xl md:text-7xl mb-6 text-stroke-pombo-sm uppercase select-none">
          MEME LEGACY
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#0088cc] to-transparent mx-auto mb-6" />
        <p className="font-sans text-[#c6e3ff] text-base sm:text-lg md:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
          POMBO isn&apos;t just another token. It is a tribute to internet culture, built on the wings of the original carrier pigeon of memes.
        </p>
      </div>

      {/* Bento Grid Wrapper */}
      <div ref={containerRef} className="gallery-wrap">
        <div ref={galleryRef} className="gallery gallery--bento">
          {memes.map((meme, idx) => {
            const isCenter = idx === 2 // 3rd item in HTML is index 2

            return (
              <div
                key={idx}
                ref={(el) => {
                  itemsRef.current[idx] = el
                }}
                className={`gallery__item relative w-full h-full overflow-hidden group ${isCenter ? 'z-30' : 'z-10'}`}
              >
                <Image
                  src={meme.src}
                  alt={meme.alt}
                  fill
                  sizes={isCenter ? '100vw' : '(max-width: 768px) 100vw, 33vw'}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  priority={isCenter}
                />

                {/* Dark Overlay for non-center items on hover */}
                {!isCenter && (
                  <div className="absolute inset-0 bg-gradient-to-t from-[#061225]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                )}

                {/* Center Item Story Overlay */}
                {isCenter && (
                  <div className="meme-story-overlay absolute inset-0 bg-[#061225]/90 flex flex-col justify-center items-center p-6 sm:p-10 md:p-16 select-none">
                    <div className="max-w-2xl bg-[#0a1e3d]/85 backdrop-blur-md border border-[#0088cc]/30 rounded-3xl p-6 sm:p-10 md:p-12 shadow-[0_20px_50px_rgba(0,136,204,0.35)] text-center flex flex-col items-center gap-4 sm:gap-6 border-b-4 border-b-[#0088cc]">
                      <span className="bg-[#0088cc] text-white text-[10px] sm:text-xs font-black tracking-widest px-3 py-1 rounded-full uppercase">
                        Origin Story
                      </span>
                      <h3 className="font-display text-white text-3xl sm:text-4xl md:text-5xl tracking-wide text-stroke-pombo-sm uppercase leading-none">
                        THE OLD EMOJI LEGACY
                      </h3>
                      <div className="w-16 h-[2px] bg-[#0088cc]/50" />
                      <p className="font-sans text-[#c6e3ff] text-sm sm:text-base md:text-lg leading-relaxed font-semibold">
                        Before $POMBO became a token, he was the legendary, deadpan WhatsApp pigeon. In internet culture, this old emoji was the face of silent judgment—sarcasm with a straight face.
                      </p>
                      <p className="font-sans text-[#c6e3ff] text-sm sm:text-base md:text-lg leading-relaxed font-semibold">
                        Pavel Durov built Telegram on pigeons, but WhatsApp accidentally created the ultimate meme bird. $POMBO unites them. We are 100% about the memes, the community, and the legacy of the carrier pigeons who delivered before the paper plane ever flew.
                      </p>
                      <div className="flex items-center gap-2 text-xs sm:text-sm font-extrabold text-[#9ed3ff] bg-[#061225]/60 px-4 py-2 rounded-xl border border-white/5">
                        <span>STILL DELIVERING MEMES</span>
                        <span>•</span>
                        <span>SINCE THE OLD EMOJI DAYS</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
