'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, Variants } from 'framer-motion'
import { toast } from 'sonner'
import Image from 'next/image'
import { Copy, Check, Send, BarChart3, Menu, X as CloseIcon } from 'lucide-react'

// Custom SVGs for Socials
const TelegramIcon = () => (
  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69.01-.03.01-.14-.07-.2-.08-.06-.19-.04-.27-.02-.12.02-1.98 1.25-5.59 3.69-.53.36-1 .54-1.4.53-.45-.01-1.32-.25-1.97-.46-.8-.26-1.43-.4-1.38-.85.03-.24.36-.48.99-.74 3.86-1.68 6.43-2.78 7.72-3.3 3.67-1.49 4.43-1.75 4.93-1.76.11 0 .36.03.52.16.14.11.18.26.19.38 0 .07.01.22 0 .33z"/>
  </svg>
)

const XIcon = () => (
  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

export default function Hero() {
  const [copied, setCopied] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const contractAddress = 'EQAme5Z3_wsVhvSemTvwFToq2AIRz_NSFediKOgdl8H11EPh'


  const copyToClipboard = () => {
    navigator.clipboard.writeText(contractAddress)
    setCopied(true)
    toast.success('Contract Address Copied!', {
      description: 'Address copied to your clipboard.',
    })
    setTimeout(() => setCopied(false), 2000)
  }

  // Animation variants
  const fadeInUp: Variants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } }
  }

  const staggerContainer: Variants = {
    animate: { transition: { staggerChildren: 0.1 } }
  }


  return (
    <section className="relative w-full min-h-[82vh] lg:min-h-[88vh] flex flex-col justify-between bg-cover bg-center overflow-x-hidden" style={{ backgroundImage: "url('/hero bg.png')" }}>
      {/* Dark overlay at top for navigation contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f2347]/60 via-transparent to-[#0a1e3d]/30 pointer-events-none" />

      {/* Header / Navbar */}
      <header className="relative w-full z-50 backdrop-blur-md border-b border-white/10 bg-white/5 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Image src="/logo.png" alt="POMBO Logo" width={48} height={48} className="rounded-full shadow-lg border-2 border-white/25" />
            <div className="flex flex-col">
              <span className="font-display text-2xl tracking-wide text-white text-stroke-pombo-header select-none">POMBO</span>
              <span className="text-[9px] font-sans font-bold tracking-widest text-[#9ed3ff]">YOUR TRUSTED CARRIER PIGEON</span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {['HOME', 'ABOUT', 'TOKENOMICS', 'ROADMAP', 'HOW TO BUY', 'FAQ'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                className={`text-sm font-sans font-extrabold tracking-wider transition-colors relative py-1 ${
                  link === 'HOME' ? 'text-white' : 'text-[#c6e3ff] hover:text-white'
                }`}
              >
                {link}
                {link === 'HOME' && (
                  <motion.div
                    layoutId="activeNavBorder"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#0088cc] rounded-full"
                  />
                )}
              </a>
            ))}
          </nav>

          {/* Desktop CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="https://t.me/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 border-2 border-[#0088cc] rounded-xl text-sm font-sans font-extrabold tracking-wider text-[#0088cc] hover:bg-[#0088cc]/10 hover:text-white hover:border-white transition-all duration-300"
            >
              <Send className="w-4 h-4 -rotate-45" />
              JOIN TELEGRAM
            </a>
            <a
              href="#buy"
              className="flex items-center gap-2 px-4 py-2 bg-[#0088cc] hover:bg-[#0099e6] rounded-xl text-sm font-sans font-extrabold tracking-wider text-white shadow-lg hover:scale-105 active:scale-95 transition-all duration-300 border-b-4 border-[#005580]"
            >
              <Send className="w-4 h-4 -rotate-45" />
              BUY POMBO
              <Image src="/ton logo.png" alt="TON" width={16} height={16} />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#c6e3ff] hover:text-white focus:outline-none"
          >
            {mobileMenuOpen ? <CloseIcon className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[#0a1e3d]/95 backdrop-blur-lg border-b border-white/10 px-4 py-6 flex flex-col gap-4 z-50"
          >
            {['HOME', 'ABOUT', 'TOKENOMICS', 'ROADMAP', 'HOW TO BUY', 'FAQ'].map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-base font-sans font-extrabold tracking-wider text-[#c6e3ff] hover:text-white py-2 border-b border-white/5"
              >
                {link}
              </a>
            ))}
            <div className="flex flex-col gap-3 mt-4">
              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 border-2 border-[#0088cc] rounded-xl text-sm font-sans font-extrabold tracking-wider text-[#0088cc]"
              >
                <Send className="w-4 h-4 -rotate-45" />
                JOIN TELEGRAM
              </a>
              <a
                href="#buy"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 py-3 bg-[#0088cc] rounded-xl text-sm font-sans font-extrabold tracking-wider text-white border-b-4 border-[#005580]"
              >
                <Send className="w-4 h-4 -rotate-45" />
                BUY POMBO
                <Image src="/ton logo.png" alt="TON" width={16} height={16} />
              </a>
            </div>
          </motion.div>
        )}
      </header>

      {/* Main Hero Body */}
      <div className="relative flex-grow flex items-center px-4 sm:px-6 lg:px-8 py-8 md:py-12 lg:py-14 max-w-7xl mx-auto w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Left Column - Content */}
          <motion.div
            className="lg:col-span-6 flex flex-col items-start text-left"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.h1
              variants={fadeInUp}
              className="font-display text-white text-7xl sm:text-8xl md:text-[8.5rem] leading-[0.85] tracking-wide mb-6 select-none text-stroke-pombo"
            >
              POMBO
            </motion.h1>

            <motion.div variants={fadeInUp} className="flex flex-col gap-1 mb-8">
              <span className="font-sans font-black text-xl sm:text-2xl md:text-3xl text-white tracking-wider uppercase drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                YOUR TRUSTED CARRIER PIGEON
              </span>
              <span className="font-sans font-black text-xl sm:text-2xl md:text-3xl text-[#9ed3ff] tracking-wider uppercase flex items-center gap-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
                ON 
                <Image src="/ton logo.png" alt="TON" width={28} height={28} className="inline-block animate-pulse" />
                TON BLOCKCHAIN
              </span>
            </motion.div>

            {/* Blue Divider Line */}
            <motion.div
              variants={fadeInUp}
              className="w-full max-w-[420px] h-[2px] bg-gradient-to-r from-[#0088cc]/80 to-transparent mb-8"
            />

            {/* Tagline */}
            <motion.p
              variants={fadeInUp}
              className="font-sans italic font-black text-2xl sm:text-3xl text-[#12396b] tracking-wide mb-10 leading-snug drop-shadow-[0_1px_1px_rgba(255,255,255,0.4)]"
            >
              My duty is to deliver.<br />And deliver I shall.
            </motion.p>

            {/* Interactive Buy/Join buttons */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-10"
            >
              <a
                href="#buy"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-[#0088cc] hover:bg-[#0099e6] rounded-2xl text-base font-sans font-extrabold tracking-wider text-white shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 border-b-4 border-[#005580]"
              >
                <Send className="w-5 h-5 -rotate-45" />
                BUY POMBO
                <Image src="/ton logo.png" alt="TON Logo" width={20} height={20} />
              </a>
              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-8 py-4 bg-white text-[#0088cc] hover:text-[#0077b3] rounded-2xl text-base font-sans font-extrabold tracking-wider border-b-4 border-[#cbd5e1] hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_4px_0_#94a3b8] hover:translate-y-[2px]"
              >
                <Send className="w-5 h-5 -rotate-45" />
                JOIN TELEGRAM
              </a>
            </motion.div>

            {/* Contract Address Card */}
            <motion.div
              variants={fadeInUp}
              className="w-full max-w-[480px] bg-[#0c1f3c]/60 backdrop-blur-md border border-[#1b3d6c]/50 rounded-2xl p-4 sm:p-5 mb-8 shadow-2xl relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-sans font-black tracking-widest text-[#9ed3ff]/80">CONTRACT ADDRESS</span>
                <div className="flex items-center justify-between gap-3 bg-[#061225]/80 border border-[#16335a] rounded-xl px-3 py-2">
                  <span className="font-mono text-xs text-white/90 truncate select-all">{contractAddress}</span>
                  <button
                    onClick={copyToClipboard}
                    className="p-2 hover:bg-white/10 rounded-lg text-[#9ed3ff] hover:text-white transition-colors focus:outline-none"
                    title="Copy Address"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              variants={fadeInUp}
              className="flex items-center gap-4"
            >
              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white text-[#0088cc] hover:bg-[#0088cc] hover:text-white flex items-center justify-center shadow-lg border-2 border-white/20 transition-all duration-300 hover:scale-110 active:scale-90"
              >
                <TelegramIcon />
              </a>
              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white text-black hover:bg-black hover:text-white flex items-center justify-center shadow-lg border-2 border-white/20 transition-all duration-300 hover:scale-110 active:scale-90"
              >
                <XIcon />
              </a>
              <a
                href="https://ton.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white text-[#0088cc] hover:bg-sky-50 flex items-center justify-center shadow-lg border-2 border-white/20 transition-all duration-300 hover:scale-110 active:scale-90 p-[10px]"
              >
                <Image src="/ton logo.png" alt="TON" width={24} height={24} />
              </a>
              <a
                href="https://dextools.io/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white text-[#0088cc] hover:bg-sky-50 flex items-center justify-center shadow-lg border-2 border-white/20 transition-all duration-300 hover:scale-110 active:scale-90"
              >
                <BarChart3 className="w-5 h-5 text-[#0088cc]" />
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column - Visual (Pigeon Video) */}
          <div className="lg:col-span-6 relative w-full flex flex-col items-center justify-center lg:overflow-visible">
            
            {/* Ambient background glow for pigeon */}
            <div className="absolute w-[80%] h-[80%] rounded-full bg-[#0088cc]/10 blur-[100px] pointer-events-none" />

            {/* Floating Pigeon WebM Video */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{
                y: [0, -15, 0],
                opacity: 1,
              }}
              transition={{
                y: {
                  repeat: Infinity,
                  duration: 6,
                  ease: 'easeInOut',
                },
                opacity: { duration: 1 }
              }}
              className="w-full max-w-[750px] md:max-w-[850px] lg:max-w-[1000px] xl:max-w-[1100px] lg:scale-125 xl:scale-135 relative z-10 select-none"
            >
              <video
                src="/hero.webm"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-contain pointer-events-none"
                style={{ filter: 'url(#erode-filter) drop-shadow(0 20px 50px rgba(0,136,204,0.3))' }}
                aria-hidden="true"
              />
            </motion.div>

          </div>

        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ type: 'spring', delay: 0.4, stiffness: 80 }}
        className="absolute right-4 bottom-0 md:right-8 z-30 w-[130px] md:w-[160px] lg:w-[185px] hidden md:flex flex-col items-center select-none"
      >
        {/* The stack of planks */}
        <div className="flex flex-col items-center gap-1.5 w-full relative z-10">
          {/* Plank 1 */}
          <div
            className="w-full bg-[#6a3e1e] border-[3px] border-[#44250e] rounded-xl px-2.5 py-1.5 text-center rotate-[-1.5deg] shadow-[inset_0_2px_0_rgba(255,255,255,0.15),_0_5px_0_rgba(0,0,0,0.3)] hover:rotate-[0deg] transition-transform duration-300"
            style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.1) 50%, transparent 50%)", backgroundSize: "100% 4px" }}
          >
            <span className="font-display text-white text-sm md:text-base lg:text-lg tracking-wider drop-shadow-[0_2px_0_#44250e]">FAST.</span>
          </div>

          {/* Plank 2 */}
          <div
            className="w-[95%] bg-[#6a3e1e] border-[3px] border-[#44250e] rounded-xl px-2.5 py-1.5 text-center rotate-[1deg] shadow-[inset_0_2px_0_rgba(255,255,255,0.15),_0_5px_0_rgba(0,0,0,0.3)] hover:rotate-[0deg] transition-transform duration-300"
            style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.1) 50%, transparent 50%)", backgroundSize: "100% 4px" }}
          >
            <span className="font-display text-white text-sm md:text-base lg:text-lg tracking-wider drop-shadow-[0_2px_0_#44250e]">RELIABLE.</span>
          </div>

          {/* Plank 3 */}
          <div
            className="w-full bg-[#6a3e1e] border-[3px] border-[#44250e] rounded-xl px-2.5 py-1.5 text-center rotate-[-2deg] shadow-[inset_0_2px_0_rgba(255,255,255,0.15),_0_5px_0_rgba(0,0,0,0.3)] hover:rotate-[0deg] transition-transform duration-300"
            style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.1) 50%, transparent 50%)", backgroundSize: "100% 4px" }}
          >
            <span className="font-display text-white text-xs md:text-sm lg:text-base tracking-wider drop-shadow-[0_2px_0_#44250e]">DECENTRALIZED.</span>
          </div>

          {/* Plank 4 */}
          <div
            className="w-[105%] bg-[#6a3e1e] border-[3px] border-[#44250e] rounded-xl px-2.5 py-1.5 text-center rotate-[1.5deg] shadow-[inset_0_2px_0_rgba(255,255,255,0.15),_0_5px_0_rgba(0,0,0,0.3)] hover:rotate-[0deg] transition-transform duration-300"
            style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.1) 50%, transparent 50%)", backgroundSize: "100% 4px" }}
          >
            <span className="font-display text-[#9ed3ff] text-[10px] md:text-xs lg:text-sm tracking-wider drop-shadow-[0_2px_0_#44250e]">POMBO DELIVERS.</span>
          </div>
        </div>

        {/* Wooden Post */}
        <div className="w-3.5 h-12 md:h-16 bg-[#44250e] border-x-[2px] border-b-[2px] border-[#291405] shadow-[inset_-2px_0_0_rgba(255,255,255,0.1),_0_4px_0_rgba(0,0,0,0.2)] mt-[-4px]" />
      </motion.div>

      {/* SVG Erode Filter to shave off 1.2px transparent video black alpha-fringe outline */}
      <svg className="absolute w-0 h-0 pointer-events-none" aria-hidden="true">
        <defs>
          <filter id="erode-filter">
            <feMorphology operator="erode" radius="1.2" in="SourceAlpha" result="eroded" />
            <feComposite in="SourceGraphic" in2="eroded" operator="in" />
          </filter>
        </defs>
      </svg>
    </section>
  )
}
