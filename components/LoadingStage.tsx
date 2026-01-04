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
      className="fixed inset-0 z-[9999] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center pointer-events-none"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Technical Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full">
          <defs>
            <pattern id="tech-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="#ff0088"
                strokeWidth="0.3"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#tech-grid)" />
        </svg>
      </div>

      {/* Main Counter Container */}
      <div className="relative flex flex-col items-center gap-6">
        {/* Decorative top dots */}
        <div className="flex gap-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#ff0088]"
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>

        {/* Percentage Counter */}
        <div className="flex items-center gap-2">
          <motion.span
            className="font-mono text-6xl md:text-8xl text-white tracking-[0.5rem]"
            key={count}
            initial={{ opacity: 0.7 }}
            animate={{ opacity: 1 }}
          >
            {count.toString().padStart(3, '0')}
          </motion.span>
          <motion.span
            className="font-mono text-6xl md:text-8xl text-[#ff0088]"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            %
          </motion.span>
        </div>

        {/* Status Message */}
        <motion.div
          className="text-center"
          key={messageIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="font-mono text-sm md:text-base text-gray-400 tracking-wider">
            {statusMessages[messageIndex]}
          </p>
        </motion.div>

        {/* Decorative bottom dots */}
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-1 rounded-full bg-[#ff0088]"
              animate={{
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.15
              }}
            />
          ))}
        </div>
      </div>

      {/* Subtle glow effect */}
      <motion.div
        className="absolute w-64 h-64 bg-[#ff0088] rounded-full blur-[120px] opacity-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.15, 0.1]
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.div>
  )
}
