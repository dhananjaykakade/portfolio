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
  const countRef = useRef<HTMLSpanElement>(null)
  const isInView = useInView(countRef, { once: true })
  const [hasAnimated, setHasAnimated] = useState(false)

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true)

      // Calculate the increment per frame
      const totalFrames = duration * 60 // Assuming 60fps
      const increment = (to - from) / totalFrames
      let currentCount = from

      const timer = setInterval(() => {
        currentCount += increment

        if ((increment > 0 && currentCount >= to) || (increment < 0 && currentCount <= to)) {
          clearInterval(timer)
          setCount(to)
        } else {
          setCount(Math.floor(currentCount))
        }
      }, 1000 / 60)

      return () => clearInterval(timer)
    }
  }, [isInView, from, to, duration, hasAnimated])

  return <span ref={countRef}>{count}</span>
}
