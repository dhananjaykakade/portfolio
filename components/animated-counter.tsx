"use client"

import { useState, useEffect, useRef } from "react"
import { useInView } from "framer-motion"

interface AnimatedCounterProps {
  from: number
  to: number
  duration?: number
  delay?: number
}

export function AnimatedCounter({ from, to, duration = 2, delay = 0 }: AnimatedCounterProps) {
  const [count, setCount] = useState(from)
  const countRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(countRef, { once: true, margin: "-100px" })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)

      let startTime: number
      let animationFrameId: number

      const startAnimation = (timestamp: number) => {
        if (!startTime) startTime = timestamp
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)

        setCount(Math.floor(from + progress * (to - from)))

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(startAnimation)
        }
      }

      const timeoutId = setTimeout(() => {
        animationFrameId = requestAnimationFrame(startAnimation)
      }, delay * 1000)

      return () => {
        clearTimeout(timeoutId)
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [isInView, from, to, duration, delay, hasAnimated])

  return <div ref={countRef}>{count}</div>
}
