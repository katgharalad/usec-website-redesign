"use client"

import { useState } from "react"
import { motion } from "framer-motion"

// Interactive Prize Row Component
interface PrizeRowProps {
  position: string
  amount: string
  textColor: string
}

function PrizeRow({ position, amount, textColor }: PrizeRowProps) {
  const [hoveredLetterIndex, setHoveredLetterIndex] = useState<number | null>(null)
  const [hoveredAmountIndex, setHoveredAmountIndex] = useState<number | null>(null)
  
  // Bright random colors for letter hover
  const brightColors = [
    '#FF0000', // bright red
    '#FFFF00', // bright yellow
    '#00FF00', // bright green
    '#0000FF', // bright blue
    '#FF8000', // bright orange
    '#8000FF', // bright purple
    '#FF00FF', // bright magenta
    '#00FFFF', // bright cyan
  ]

  const getRandomColor = (index: number) => brightColors[index % brightColors.length]

  return (
    <div className="text-white font-black text-lg flex items-center space-x-2">
      {/* Position text with letter hover effects */}
      <span className="inline-flex">
        {position.split('').map((letter, index) => (
          <motion.span
            key={index}
            className={`${textColor} cursor-pointer`}
            style={{
              fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
              fontWeight: '900',
              display: 'inline-block'
            }}
            onMouseEnter={() => setHoveredLetterIndex(index)}
            onMouseLeave={() => setHoveredLetterIndex(null)}
            animate={{
              color: hoveredLetterIndex === index ? getRandomColor(index) : undefined,
              scale: hoveredLetterIndex === index ? 1.2 : 1,
              y: hoveredLetterIndex === index ? -2 : 0,
              rotateZ: hoveredLetterIndex === index ? ((index * 3) % 12 - 6) : 0, // Deterministic rotation
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
              mass: 0.5
            }}
          >
            {letter}
          </motion.span>
        ))}
      </span>
      
      {/* Amount with 3D pop effect - whole amount moves together */}
      <motion.span 
        className="inline-flex cursor-pointer"
        onMouseEnter={() => setHoveredAmountIndex(0)}
        onMouseLeave={() => setHoveredAmountIndex(null)}
        animate={{
          scale: hoveredAmountIndex === 0 ? 1.2 : 1,
          y: hoveredAmountIndex === 0 ? -6 : 0,
          z: hoveredAmountIndex === 0 ? 20 : 0,
          rotateX: hoveredAmountIndex === 0 ? -8 : 0,
          rotateY: hoveredAmountIndex === 0 ? 3 : 0,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 20,
          mass: 0.3
        }}
        style={{
          textShadow: hoveredAmountIndex === 0 ? 
            '3px 3px 0px rgba(0,0,0,0.8), 6px 6px 0px rgba(0,0,0,0.6)' : 
            'none'
        }}
      >
        {amount.split('').map((char, index) => (
          <span
            key={index}
            className="text-white font-black"
            style={{
              fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
              fontWeight: '900',
              display: 'inline-block'
            }}
          >
            {char}
          </span>
        ))}
      </motion.span>
    </div>
  )
}

export function AwardsTicket() {
  const [isHovered, setIsHovered] = useState(false)

  // Generate realistic barcode pattern
  const generateBarcodePattern = () => {
    const widths = [1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2]
    return widths
  }
  
  const lines = generateBarcodePattern()

  return (
    <motion.div
      className="group relative cursor-pointer"
      style={{ width: '320px', height: '200px' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.9, rotateX: 10 }}
      animate={{ opacity: 1, scale: 1, rotateX: 0 }}
      transition={{ 
        delay: 1.2, 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 120,
        damping: 18
      }}
    >


      {/* Main Ticket */}
      <motion.div
        className="w-full h-full border-2 border-black bg-white relative overflow-hidden"
        animate={{
          scale: isHovered ? 1.05 : 1,
          y: isHovered ? -4 : 0,
          rotateY: isHovered ? 2 : 0,
        }}
        transition={{ 
          type: "spring",
          stiffness: 400,
          damping: 30,
          mass: 0.7
        }}
        style={{
          boxShadow: isHovered ? 
            "0 15px 25px -5px rgba(0, 0, 0, 0.15), 0 8px 12px -3px rgba(0, 0, 0, 0.08)" : 
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        }}
      >
        {/* Color Fill Animation - Diagonal Sweep */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ 
            background: 'linear-gradient(135deg, #0066FF, #00CCFF)',
          }}
          initial={{ 
            clipPath: "polygon(0 100%, 0 100%, 0 100%, 0 100%)"
          }}
          animate={{
            clipPath: isHovered ? 
              "polygon(0 0, 100% 0, 100% 100%, 0 100%)" : 
              "polygon(0 100%, 0 100%, 0 100%, 0 100%)"
          }}
          transition={{ 
            duration: 0.6, 
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 200,
            damping: 25
          }}
        />

        {/* Ticket Content */}
        <div className="relative z-10 p-4 h-full flex flex-col justify-between">
          {/* Header */}
          <div>
            <motion.h3 
              className={`text-xl font-black uppercase tracking-tight leading-tight mb-2 ${
                isHovered ? 'text-yellow-300' : 'text-black'
              }`}
              style={{ 
                fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                fontWeight: '900',
                textShadow: isHovered ? '2px 2px 0px rgba(0,0,0,0.3)' : 'none'
              }}
              animate={{
                scale: isHovered ? 1.05 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              USEC 2025
            </motion.h3>
            <motion.p 
              className={`text-sm font-bold uppercase tracking-wider ${
                isHovered ? 'text-yellow-300 opacity-90' : 'text-black opacity-70'
              }`}
              style={{ 
                fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                fontWeight: '700',
                textShadow: isHovered ? '1px 1px 0px rgba(0,0,0,0.3)' : 'none'
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: isHovered ? 0.9 : 0.7, 
                y: 0,
                scale: isHovered ? 1.02 : 1
              }}
              transition={{ delay: 0.1, duration: 0.3 }}
            >
              Prize Awards
            </motion.p>
          </div>

          {/* Prize Content - Hidden until hover */}
          <motion.div
            className="space-y-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ 
              opacity: isHovered ? 1 : 0,
              y: isHovered ? 0 : 20
            }}
            transition={{ 
              delay: isHovered ? 0.2 : 0,
              duration: 0.4,
              ease: "easeOut"
            }}
          >
            <PrizeRow position="1st" amount="$100000" textColor="text-yellow-300" />
            <PrizeRow position="2nd" amount="$75000" textColor="text-cyan-300" />
            <PrizeRow position="3rd" amount="$50000" textColor="text-pink-300" />
          </motion.div>

          {/* Bottom Content - Properly contained within card */}
          <div className="flex items-end justify-between mt-2">
            {/* Left: Punching Hole - Bottom Left Corner */}
            <div 
              className="w-3 h-3 rounded-full border border-black flex-shrink-0"
              style={{
                backgroundColor: isHovered ? '#FFFFFF' : '#000000'
              }}
            />
            
            {/* Right: Barcode - Compact and contained */}
            <motion.div 
              className="bg-white border border-black flex items-center justify-center flex-shrink-0"
              style={{ 
                width: '50px',
                height: '16px',
                padding: '2px'
              }}
              animate={{
                scale: isHovered ? 1.05 : 1,
                rotate: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3 }}
            >
              <div 
                className="flex items-end justify-center" 
                style={{ 
                  width: '44px',
                  height: '10px',
                  gap: '0.5px'
                }}
              >
                {lines.slice(0, 10).map((width, index) => (
                  <motion.div
                    key={index}
                    className="bg-black"
                    style={{
                      width: `${Math.max(width * 1.2, 1)}px`,
                      height: '100%',
                      minWidth: '1px',
                      maxWidth: '3px'
                    }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ 
                      delay: 1.4 + (index * 0.02), 
                      duration: 0.3,
                      ease: "easeOut"
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
} 