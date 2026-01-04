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
        // Generate 30 random particles (slightly fewer for minimalism)
        setSparkles(
            [...Array(30)].map(() => ({
                left: Math.random() * 100,
                top: Math.random() * 100,
                delay: Math.random() * 0.3,
                scale: 0.4 + Math.random() * 1.2,
            }))
        )

        const timer = setTimeout(() => onComplete?.(), duration)
        return () => clearTimeout(timer)
    }, [duration, onComplete])

    return (
        <motion.div
            className="fixed inset-0 z-[9999] bg-[#f8f9fd] flex items-center justify-center overflow-hidden pointer-events-none"
            initial={{ opacity: 1 }}
            animate={{ opacity: [1, 1, 0] }}
            transition={{ duration: duration / 1000, times: [0, 0.8, 1] }}
        >
            {/* Elegant Clean Flash */}
            <motion.div
                className="absolute inset-0 z-30"
                initial={{ opacity: 0 }}
                animate={{
                    opacity: [0, 0.8, 0],
                    backgroundColor: ["#ffffff", "#f8f9fd", "#f8f9fd"]
                }}
                transition={{ duration: 0.6, times: [0, 0.3, 1] }}
            />

            {/* Soft Radial Waves - Professional Blue */}
            {[...Array(2)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-[400px] h-[400px] border-[0.5px] border-[#38b2ff]/30 rounded-full z-10"
                    style={{
                        left: '50%',
                        top: '50%',
                        marginLeft: '-200px',
                        marginTop: '-200px'
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                        scale: [0, 8],
                        opacity: [0, 0.2, 0],
                    }}
                    transition={{
                        duration: 1.2,
                        delay: i * 0.2,
                        ease: [0.16, 1, 0.3, 1]
                    }}
                />
            ))}

            {/* Light Blue Particles */}
            {sparkles.map((sparkle, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1.5 h-1.5 bg-[#38b2ff] rounded-full z-20"
                    style={{
                        left: `${sparkle.left}%`,
                        top: `${sparkle.top}%`,
                    }}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{
                        scale: [0, sparkle.scale, 0],
                        opacity: [0, 0.6, 0],
                    }}
                    transition={{
                        duration: 0.8,
                        delay: sparkle.delay,
                        ease: "easeOut"
                    }}
                />
            ))}

            {/* Placeholder SVG Integration - The "exploding" core asset - Softened */}
            <motion.div
                className="absolute z-25 w-48 h-48 md:w-64 md:h-64"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{
                    scale: [0.5, 1.2, 2],
                    opacity: [0, 0.4, 0],
                }}
                transition={{
                    duration: 1,
                    ease: "easeOut"
                }}
            >
                <Image
                    src="/placeholder.svg"
                    alt="Core Asset"
                    fill
                    className="object-contain opacity-20 grayscale brightness-110"
                />
            </motion.div>

            {/* Center Core Light - Professional Blue Glow */}
            <motion.div
                className="absolute w-[300px] h-[300px] bg-[#38b2ff] rounded-full blur-[120px]"
                style={{
                    left: '50%',
                    top: '50%',
                    marginLeft: '-150px',
                    marginTop: '-150px'
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                    scale: [0, 4],
                    opacity: [0, 0.3, 0]
                }}
                transition={{ duration: 1, ease: "easeOut" }}
            />
        </motion.div>
    )
}
