"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faInstagram, faTiktok, faTwitter } from "@fortawesome/free-brands-svg-icons"
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
        <main className="min-h-screen bg-[#f8f9fd] text-slate-800 px-4">
          <div className="w-full max-w-md mx-auto flex flex-col gap-10 py-16 md:py-24">
            {/* Profile Section */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: showIntro ? 0 : 1, y: showIntro ? 15 : 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col items-center text-center gap-5"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: showIntro ? 0.9 : 1, opacity: showIntro ? 0 : 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.4 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-[#38b2ff] rounded-full blur-2xl opacity-10"></div>
                <Image
                  src="/profile-avatar.png"
                  alt="Profile"
                  width={110}
                  height={110}
                  className="relative rounded-full border-2 border-white shadow-sm"
                  priority
                />
              </motion.div>

              <div className="space-y-1">
                <h1 className="text-3xl font-bold tracking-tight text-slate-900">
                  biezz
                </h1>
                <p className="text-sm md:text-base text-slate-500 font-medium">
                  Engineer • Student • Building cool stuff
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
              className="flex justify-center gap-10 pt-10 border-t border-slate-100"
            >
              {[
                { name: "Instagram", icon: faInstagram, url: "https://www.instagram.com/osissmaitfi" },
                { name: "TikTok", icon: faTiktok, url: "https://www.tiktok.com/@osissmaitfi" },
                { name: "Twitter", icon: faTwitter, url: "https://twitter.com/osissmaitfi" },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  whileHover={{ y: -3, color: "#38b2ff" }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-2 text-slate-400 transition-all"
                >
                  <FontAwesomeIcon icon={social.icon} className="text-2xl" />
                  <span className="text-[10px] uppercase font-bold tracking-widest">{social.name}</span>
                </motion.a>
              ))}
            </motion.footer>
          </div>
        </main>
      </motion.div>
    </>
  )
}
