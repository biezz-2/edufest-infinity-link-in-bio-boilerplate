"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"

interface LoadingStageProps {
  duration?: number
  onComplete?: () => void
}

const statusMessages = [
  "DATA STREAM SYNCHRONIZATION",
  "ID: INF-2025-V1",
  "SECURE LINK ESTABLISHED",
  "INITIALIZING SECURE CONNECTION",
  "LOADING ASSETS..."
]

export default function LoadingStage({
  duration = 3000,
  onComplete
}: LoadingStageProps) {
  const [count, setCount] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    // Counter animation
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => onComplete?.(), 300)
          return 100
        }
        return prev + 1
      })
    }, duration / 100)

    // Cycle status messages
    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % statusMessages.length)
    }, 800)

    return () => {
      clearInterval(interval)
      clearInterval(messageInterval)
    }
  }, [duration, onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-[#f8f9fd] flex items-center justify-center pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Technical Grid Background - Faint Blue */}
      <div className="absolute inset-0 opacity-[0.05]">
        <svg className="w-full h-full">
          <defs>
            <pattern id="tech-grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path
                d="M 60 0 L 0 0 0 60"
                fill="none"
                stroke="#38b2ff"
                strokeWidth="0.5"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tech-grid)" />
        </svg>
      </div>

      {/* Main Counter Container */}
      <div className="relative flex flex-col items-center gap-8">
        {/* Infinity Logo Integration - Modern Blue Glow */}
        <motion.div
          className="relative w-24 h-24"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
          }}
          transition={{
            duration: 1,
            ease: "easeOut"
          }}
        >
          <div className="absolute inset-0 bg-[#38b2ff] rounded-full blur-2xl opacity-10 animate-pulse"></div>
          <Image
            src="/logo/icon.svg"
            alt="Infinity Logo"
            fill
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Minimalist Progress Indicator */}
        <div className="flex flex-col items-center gap-2">
            <div className="flex items-baseline gap-1">
              <motion.span
                className="font-sans text-7xl md:text-9xl font-light text-slate-800 tracking-tighter"
                key={count}
              >
                {count}
              </motion.span>
              <span className="text-2xl md:text-3xl font-medium text-[#38b2ff]">%</span>
            </div>
            
            {/* Status Message */}
            <motion.div
              className="mt-4"
              key={messageIndex}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p className="font-sans text-xs md:text-sm font-medium text-slate-400 tracking-[0.2em] uppercase">
                {statusMessages[messageIndex]}
              </p>
            </motion.div>
        </div>

        {/* Decorative thin line */}
        <motion.div 
            className="w-12 h-[1px] bg-slate-200"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
        />
      </div>

      {/* Subtle corner accents */}
      <div className="absolute top-12 left-12 w-8 h-8 border-t border-l border-[#38b2ff]/20" />
      <div className="absolute bottom-12 right-12 w-8 h-8 border-b border-r border-[#38b2ff]/20" />
    </motion.div>
  )
}
