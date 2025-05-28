"use client"

import { useState } from "react"
import { motion } from "framer-motion"

interface AnimatedTextProps {
  text?: string
  className?: string
  style?: React.CSSProperties
  lines?: string[]
}

export function AnimatedText({ text, className = "", style = {}, lines }: AnimatedTextProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  
  // Bright colors for random selection
  const brightColors = [
    "#FF0080", // Hot pink
    "#00FF80", // Bright green
    "#8000FF", // Electric purple
    "#FF8000", // Orange
    "#00FFFF", // Cyan
    "#FFFF00", // Yellow
    "#FF4000", // Red-orange
    "#4000FF", // Blue-purple
    "#80FF00", // Lime green
    "#FF0040", // Deep pink
    "#0080FF", // Sky blue
    "#FF4080", // Pink-red
  ]
  
  const getRandomColor = (index: number) => {
    return brightColors[index % brightColors.length]
  }
  
  // If lines are provided, render multi-line text
  if (lines) {
    let globalIndex = 0
    
    return (
      <div className={className} style={style}>
        {lines.map((line, lineIndex) => (
          <div key={lineIndex} className="block">
            {line.split('').map((char, charIndex) => {
              const currentIndex = globalIndex++
              const isHovered = hoveredIndex === currentIndex
              
              return (
                <motion.span
                  key={`${lineIndex}-${charIndex}`}
                  className="inline-block cursor-pointer select-none"
                  style={{
                    transformOrigin: 'center',
                    userSelect: 'none',
                    WebkitUserSelect: 'none',
                    MozUserSelect: 'none',
                    msUserSelect: 'none'
                  }}
                  onMouseEnter={() => setHoveredIndex(currentIndex)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  initial={{
                    color: style.color || "#000000"
                  }}
                  animate={{
                    color: isHovered ? getRandomColor(currentIndex) : (style.color || "#000000")
                  }}
                  transition={{
                    duration: 0.1,
                    ease: "linear"
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </motion.span>
              )
            })}
          </div>
        ))}
      </div>
    )
  }
  
  // Single line text
  if (!text) return null
  
  return (
    <div className={className} style={style}>
      {text.split('').map((char, index) => {
        const isHovered = hoveredIndex === index
        
        return (
          <motion.span
            key={index}
            className="inline-block cursor-pointer select-none"
            style={{
              transformOrigin: 'center',
              userSelect: 'none',
              WebkitUserSelect: 'none',
              MozUserSelect: 'none',
              msUserSelect: 'none'
            }}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            initial={{
              color: style.color || "#000000"
            }}
            animate={{
              color: isHovered ? getRandomColor(index) : (style.color || "#000000")
            }}
            transition={{
              duration: 0.1,
              ease: "linear"
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        )
      })}
    </div>
  )
} 