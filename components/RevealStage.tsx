"use client"

import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import Image from "next/image"

interface RevealStageProps {
    duration?: number
    onComplete?: () => void
}

export default function RevealStage({
    duration = 1500,
    onComplete
}: RevealStageProps) {
    const [sparkles, setSparkles] = useState<Array<{
        left: number
        top: number
        delay: number
        scale: number
    }>>([])

    useEffect(() => {
        // Generate 40 random particles
        setSparkles(
            [...Array(40)].map(() => ({
                left: Math.random() * 100,
                top: Math.random() * 100,
                delay: Math.random() * 0.5,
                scale: 0.5 + Math.random() * 1.5,
            }))
        )

        const timer = setTimeout(() => onComplete?.(), duration)
        return () => clearTimeout(timer)
    }, [duration, onComplete])

    return (
        <motion.div
            className="fixed inset-0 z-[9999] bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center overflow-hidden pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 1, 0] }}
            transition={{ duration: duration / 1000, times: [0, 0.8, 1] }}
        >
            {/* Cinematic Flash Spread */}
            <motion.div
                className="absolute inset-0 z-30"
                initial={{ opacity: 0 }}
                animate={{
                    opacity: [0, 1, 0],
                    backgroundColor: ["rgba(255,255,255,0)", "rgba(255,255,255,0.2)", "rgba(255,255,255,0)"]
                }}
                transition={{ duration: 0.8, times: [0, 0.2, 1] }}
            />

            {/* Concentric Shockwaves (Igloo Style) - 3 waves */}
            {[...Array(3)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-[300px] h-[300px] border-[0.5px] border-[#ff0088] rounded-full z-10"
                    style={{
                        left: '50%',
                        top: '50%',
                        marginLeft: '-150px',
                        marginTop: '-150px'
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                        scale: [0, 15],
                        opacity: [0, 0.3, 0],
                    }}
                    transition={{
                        duration: 1.5,
                        delay: i * 0.15,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                />
            ))}

            {/* Radial Burst of Particles */}
            {sparkles.map((sparkle, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-blue-400 rounded-full z-20"
                    style={{
                        left: `${sparkle.left}%`,
                        top: `${sparkle.top}%`,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                        scale: [0, sparkle.scale, 0],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: 1,
                        delay: sparkle.delay,
                        ease: "easeOut"
                    }}
                />
            ))}

            {/* Technical Grid Dissolve Effect */}
            <motion.div
                className="absolute inset-0 opacity-[0.05] pointer-events-none"
                animate={{
                    opacity: [0.05, 0.1, 0],
                    scale: [1, 1.1]
                }}
                transition={{ duration: 1.5 }}
            >
                <svg className="w-full h-full">
                    <defs>
                        <pattern id="transition-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ff0088" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#transition-grid)" />
                </svg>
            </motion.div>

            {/* Placeholder SVG Integration - The "exploding" core asset */}
            <motion.div
                className="absolute z-25 w-48 h-48 md:w-64 md:h-64"
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale: [0, 1.5, 2],
                    opacity: [0, 0.8, 0],
                }}
                transition={{
                    duration: 1.2,
                    ease: "easeOut"
                }}
            >
                <Image
                    src="/placeholder.svg"
                    alt="Core Asset"
                    fill
                    className="object-contain opacity-50"
                />
            </motion.div>

            {/* Center Core Light */}
            <motion.div
                className="absolute w-[200px] h-[200px] bg-[#ff0088] rounded-full blur-[100px]"
                style={{
                    left: '50%',
                    top: '50%',
                    marginLeft: '-100px',
                    marginTop: '-100px'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale: [0, 5],
                    opacity: [0, 0.6, 0]
                }}
                transition={{ duration: 1.2, ease: "easeOut" }}
            />
        </motion.div>
    )
}
