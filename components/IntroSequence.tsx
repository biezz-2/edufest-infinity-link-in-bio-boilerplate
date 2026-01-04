"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
import LoadingStage from "./LoadingStage"
import RevealStage from "./RevealStage"

interface IntroSequenceProps {
    onComplete?: () => void
}

type Stage = 'loading' | 'reveal' | 'complete'

export default function IntroSequence({ onComplete }: IntroSequenceProps) {
    const [stage, setStage] = useState<Stage>('loading')

    useEffect(() => {
        // Check if intro has been shown before
        const hasSeenIntro = localStorage.getItem('hasSeenIntro')

        if (hasSeenIntro) {
            // Skip intro if already seen
            setStage('complete')
            onComplete?.()
        }
    }, [onComplete])

    const handleStageComplete = (nextStage: Stage) => {
        setStage(nextStage)

        if (nextStage === 'complete') {
            // Mark intro as seen
            localStorage.setItem('hasSeenIntro', 'true')
            onComplete?.()
        }
    }

    if (stage === 'complete') {
        return null
    }

    return (
        <AnimatePresence mode="wait">
            {stage === 'loading' && (
                <LoadingStage
                    key="loading"
                    duration={3000}
                    onComplete={() => handleStageComplete('reveal')}
                />
            )}

            {stage === 'reveal' && (
                <RevealStage
                    key="reveal"
                    duration={1500}
                    onComplete={() => handleStageComplete('complete')}
                />
            )}
        </AnimatePresence>
    )
}
