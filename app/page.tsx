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
        <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white px-4">
          <div className="w-full max-w-md mx-auto flex flex-col gap-8 py-12 md:py-16">
            {/* Profile Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showIntro ? 0 : 1, y: showIntro ? 20 : 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col items-center text-center gap-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: showIntro ? 0 : 1 }}
                transition={{ type: "spring", stiffness: 100, damping: 10, delay: 0.5 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full blur-2xl opacity-50"></div>
                <Image
                  src="/profile-avatar.png"
                  alt="Profile"
                  width={96}
                  height={96}
                  className="relative rounded-full border-4 border-white/10 shadow-lg"
                  priority
                />
              </motion.div>

              <div>
                <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                  biezz
                </h1>
                <p className="text-sm md:text-base text-gray-400 max-w-xs mt-2">
                  Engineer • Student • Building cool stuff on the web
                </p>
              </div>
            </motion.div>

            {/* Links Section */}
            <motion.section
              initial={{ opacity: 0 }}
              animate={{ opacity: showIntro ? 0 : 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col gap-3"
            >
              {links.map((link, index) => (
                <motion.a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: showIntro ? 0 : 1, x: showIntro ? -20 : 0 }}
                  transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                  whileHover={{ scale: 1.02, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative w-full px-6 py-3 rounded-xl overflow-hidden transition-all duration-300"
                >
                  {/* Background gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-100 group-hover:opacity-110 transition-opacity"></div>

                  {/* Content */}
                  <div className="relative flex items-center justify-center gap-3 text-white font-semibold">
                    <span className="text-xl">{link.icon}</span>
                    <span>{link.title}</span>
                  </div>

                  {/* Shine effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                </motion.a>
              ))}
            </motion.section>

            {/* Social Links Footer */}
            <motion.footer
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: showIntro ? 0 : 1, y: showIntro ? 20 : 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="flex justify-center gap-8 pt-8 border-t border-white/10"
            >
              {[
                { name: "Instagram", icon: faInstagram, url: "#" },
                { name: "TikTok", icon: faTiktok, url: "#" },
                { name: "Twitter", icon: faTwitter, url: "#" },
              ].map((social) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  whileHover={{ scale: 1.1, color: "#60a5fa" }}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-1 text-gray-400 hover:text-blue-400 transition-colors"
                >
                  <FontAwesomeIcon icon={social.icon} className="text-2xl" />
                  <span className="text-xs">{social.name}</span>
                </motion.a>
              ))}
            </motion.footer>
          </div>
        </main>
      </motion.div>
    </>
  )
}
