'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    })

    const root = document.documentElement
    const isScrollLocked = () => root.dataset.scrollLock === 'true'

    const syncLenisState = () => {
      if (isScrollLocked()) {
        lenis.stop()
      } else {
        lenis.start()
      }
    }

    const preventLockedScroll = (event: Event) => {
      if (!isScrollLocked()) {
        return
      }

      event.preventDefault()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isScrollLocked()) {
        return
      }

      const blockedKeys = [
        'ArrowUp',
        'ArrowDown',
        'PageUp',
        'PageDown',
        'Home',
        'End',
        ' ',
      ]

      if (blockedKeys.includes(event.key)) {
        event.preventDefault()
      }
    }

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    lenis.on('scroll', ScrollTrigger.update)
    syncLenisState()
    requestAnimationFrame(raf)
    ScrollTrigger.refresh()

    const observer = new MutationObserver(syncLenisState)
    observer.observe(root, { attributes: true, attributeFilter: ['data-scroll-lock'] })

    window.addEventListener('wheel', preventLockedScroll, { passive: false, capture: true })
    window.addEventListener('touchmove', preventLockedScroll, { passive: false, capture: true })
    window.addEventListener('keydown', handleKeyDown, { capture: true })

    return () => {
      observer.disconnect()
      window.removeEventListener('wheel', preventLockedScroll, true)
      window.removeEventListener('touchmove', preventLockedScroll, true)
      window.removeEventListener('keydown', handleKeyDown, true)
      lenis.destroy()
    }
  }, [])

  return <>{children}</>
}
