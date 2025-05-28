"use client"

import React, { useCallback, useMemo, useRef, RefObject } from "react"
import { motion, useAnimationControls } from "framer-motion"
import { v4 as uuidv4 } from "uuid"

import { cn } from "@/lib/utils"
import { useDimensions } from "@/components/hooks/use-debounced-dimensions"

interface PixelTrailRandomProps {
  pixelSize: number // px
  fadeDuration?: number // ms
  delay?: number // ms
  className?: string
}

const PixelTrailRandom: React.FC<PixelTrailRandomProps> = ({
  pixelSize = 20,
  fadeDuration = 500,
  delay = 0,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const dimensions = useDimensions(containerRef as RefObject<HTMLElement>)
  const trailId = useRef(uuidv4())

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const x = Math.floor((e.clientX - rect.left) / pixelSize)
      const y = Math.floor((e.clientY - rect.top) / pixelSize)

      const pixelElement = document.getElementById(
        `${trailId.current}-pixel-${x}-${y}`
      )
      if (pixelElement) {
        const animatePixel = (pixelElement as HTMLDivElement & { __animatePixel?: () => void }).__animatePixel
        if (animatePixel) animatePixel()
      }
    },
    [pixelSize]
  )

  const columns = useMemo(
    () => Math.ceil(dimensions.width / pixelSize),
    [dimensions.width, pixelSize]
  )
  const rows = useMemo(
    () => Math.ceil(dimensions.height / pixelSize),
    [dimensions.height, pixelSize]
  )

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute inset-0 w-full h-full pointer-events-auto",
        className
      )}
      onMouseMove={handleMouseMove}
    >
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div key={rowIndex} className="flex">
          {Array.from({ length: columns }).map((_, colIndex) => (
            <PixelDotRandom
              key={`${colIndex}-${rowIndex}`}
              id={`${trailId.current}-pixel-${colIndex}-${rowIndex}`}
              size={pixelSize}
              fadeDuration={fadeDuration}
              delay={delay}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

interface PixelDotRandomProps {
  id: string
  size: number
  fadeDuration: number
  delay: number
}

const PixelDotRandom: React.FC<PixelDotRandomProps> = React.memo(
  ({ id, size, fadeDuration, delay }) => {
    const controls = useAnimationControls()
    
    // Bright popping colors
    const brightColors = [
      '#FF0000', // bright red
      '#FFFF00', // bright yellow
      '#00FF00', // bright green
      '#0000FF', // bright blue
      '#FF8000', // bright orange
      '#8000FF', // bright purple
    ]
    
    const randomColor = useMemo(() => {
      return brightColors[Math.floor(Math.random() * brightColors.length)]
    }, [brightColors])

    const animatePixel = useCallback(() => {
      controls.start({
        opacity: [1, 0],
        transition: { duration: fadeDuration / 1000, delay: delay / 1000 },
      })
    }, [controls, fadeDuration, delay])

    // Attach the animatePixel function to the DOM element
    const ref = useCallback(
      (node: HTMLDivElement | null) => {
        if (node) {
          ;(node as HTMLDivElement & { __animatePixel?: () => void }).__animatePixel = animatePixel
        }
      },
      [animatePixel]
    )

    return (
      <motion.div
        id={id}
        ref={ref}
        className="cursor-pointer-none"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          backgroundColor: randomColor,
        }}
        initial={{ opacity: 0 }}
        animate={controls}
        exit={{ opacity: 0 }}
      />
    )
  }
)

PixelDotRandom.displayName = "PixelDotRandom"
export { PixelTrailRandom } 