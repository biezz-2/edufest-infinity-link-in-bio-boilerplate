"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram, faTiktok, faTwitter, faWhatsapp } from "@fortawesome/free-brands-svg-icons"
import { links } from "@/data/links"
import IntroSequence from "@/components/IntroSequence"

export default function HomePage() {
  const [mounted, setMounted] = useState(false)
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <>
      {/* Intro Animation Sequence */}
      <AnimatePresence>
        {showIntro && (
          <IntroSequence onComplete={() => setShowIntro(false)} />
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showIntro ? 0 : 1 }}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.1 }}
        style={{
          visibility: showIntro ? "hidden" : "visible",
          pointerEvents: showIntro ? "none" : "auto"
        }}
      >
      <main className="min-h-screen relative text-slate-100 px-4 overflow-hidden">
        {/* Background Layers */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          {/* Layer 1: Sky */}
          <div className="absolute inset-0">
            <Image 
              src="/background/bg-sky.png" 
              alt="Sky Background" 
              fill 
              className="object-cover"
              priority
              quality={100}
            />
          </div>
          {/* Layer 2: Main Background */}
          <div className="absolute inset-0 mix-blend-multiply">
            <Image 
              src="/background/bg.png" 
              alt="Main Background" 
              fill 
              className="object-cover"
              priority
              quality={100}
            />
          </div>
          {/* Optional Overlay for readability */}
          <div className="absolute inset-0 bg-black/10" />
        </div>

        <div className="relative z-10 w-full max-w-md mx-auto flex flex-col gap-10 py-16 md:py-24">
          {/* Profile Section */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: showIntro ? 0 : 1, y: showIntro ? 15 : 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col items-center text-center gap-5 bg-white p-8 rounded-3xl shadow-xl"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: showIntro ? 0.9 : 1, opacity: showIntro ? 0 : 1 }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.4 }}
              className="relative"
            >
              <div className="absolute inset-0 bg-[#38b2ff] rounded-full blur-2xl opacity-20"></div>
              <Image
                src="/logo/logo-edufest.svg"
                alt="Edufest Logo"
                width={2000}
                height={1000}
                className="relative rounded-full border-2 border-slate-100 shadow-lg"
                priority
              />
            </motion.div>

            <div className="space-y-1">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900">
                INFINITY
              </h1>
              <p className="text-sm md:text-base text-slate-600 font-medium">
                The Eighth Annual Fithrah Insani Education Festival
              </p>
            </div>
          </motion.div>

            {/* Links Section */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: showIntro ? 0 : 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-col gap-4"
            >
              {links.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: showIntro ? 0 : 1, y: showIntro ? 10 : 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  whileHover={{ y: -2, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="group relative w-full px-6 py-4 bg-white rounded-2xl border border-slate-100 shadow-[0_4px_12px_-2px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_20px_-4px_rgba(56,178,255,0.15)] hover:border-[#38b2ff]/30 transition-all duration-300"
                >
                  {/* Content */}
                  <div className="relative flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#f8f9fd] text-xl group-hover:bg-[#38b2ff]/10 group-hover:text-[#38b2ff] transition-colors">
                      {link.icon}
                    </div>
                    <span className="font-semibold text-slate-700 group-hover:text-slate-900 transition-colors">
                      {link.title}
                    </span>
                  </div>

                  {/* Arrow indicator */}
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                    <svg className="w-5 h-5 text-[#38b2ff]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </motion.a>
              ))}
            </motion.section>

            {/* Social Links Footer */}
            <motion.footer
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: showIntro ? 0 : 1, y: showIntro ? 10 : 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
              className="flex flex-col items-center gap-8 pt-10 border-t border-white/20"
            >
              <div className="flex gap-10">
                {[
                  { name: "Instagram", icon: faInstagram, url: "https://www.instagram.com/fi.edufest" },
                  { name: "TikTok", icon: faTiktok, url: "https://www.tiktok.com/@fi.edufest8?_r=1&_t=ZS-92oQ7GOVK5v" },
                  { name: "WhatsApp", icon: faWhatsapp, url: "https://wa.me/6285693564029" },
                ].map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    whileHover={{ y: -3, color: "#38b2ff" }}
                    whileTap={{ scale: 0.95 }}
                    className="flex flex-col items-center gap-2 text-slate-200 transition-all hover:text-white"
                  >
                    <FontAwesomeIcon icon={social.icon} className="text-2xl" />
                    <span className="text-[10px] uppercase font-bold tracking-widest opacity-80">{social.name}</span>
                  </motion.a>
                ))}
              </div>

              <div className="relative flex flex-col items-center justify-center mt-6">
                {/* MacOS Terminal Window */}
                <div className="w-full max-w-[320px] bg-[#1e1e1e] rounded-lg shadow-2xl overflow-hidden border border-white/10 font-mono">
                  {/* Terminal Header */}
                  <div className="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-white/5">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F56] hover:bg-[#FF5F56]/80 transition-colors" />
                    <div className="w-3 h-3 rounded-full bg-[#FFBD2E] hover:bg-[#FFBD2E]/80 transition-colors" />
                    <div className="w-3 h-3 rounded-full bg-[#27C93F] hover:bg-[#27C93F]/80 transition-colors" />
                    <div className="ml-2 text-[10px] text-gray-400 select-none">biezz-2 — -zsh</div>
                  </div>
                  
                  {/* Terminal Content */}
                  <div className="p-4 flex flex-col items-center gap-3 bg-[#1e1e1e]/95 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-1">
                      <motion.a
                        href="https://github.com/biezz-2"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-green-400 hover:text-green-300 transition-colors font-medium flex items-center gap-2"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="text-pink-500">➜</span>
                        <span className="text-cyan-400">~</span>
                        <span>Designed by biezz-2</span>
                      </motion.a>
                      <motion.a
                        href="https://lucifiz-api.biezz.my.id/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[10px] text-slate-400 hover:text-[#38b2ff] transition-colors mt-1"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="opacity-50">$</span> Visit my Website
                        <span className="animate-pulse ml-1 inline-block w-1.5 h-3 bg-slate-400 align-middle"></span>
                      </motion.a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.footer>
          </div>
        </main>
      </motion.div>
    </>
  )
}
