"use client"

import { useRef, useState, useEffect } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { useScreenSize } from "@/hooks/use-screen-size"
import { PixelTrail } from "@/components/ui/pixel-trail"
import { GooeyFilter } from "@/components/ui/gooey-filter"
import { AnimatedText } from "@/components/ui/animated-text"
import { AwardsTicket } from "@/components/ui/awards-ticket"

// Slot machine component for the entire amount
function SlotAmount() {
  const [digits, setDigits] = useState(['1', '0', '0', ',', '0', '0', '0'])
  const [isSpinning, setIsSpinning] = useState(false)
  const [isHoveringFirst, setIsHoveringFirst] = useState(false)
  const [isHoveringLast, setIsHoveringLast] = useState(false)

  useEffect(() => {
    const startAnimation = () => {
      setIsSpinning(true)
      
      const spinDuration = 2000 // 2 seconds
      const spinInterval = 50 // Update every 50ms
      
      let counter = 0
      const interval = setInterval(() => {
        setDigits(prev => prev.map((char, index) => {
          if (char === ',') return ',' // Keep comma static
          // Use deterministic values based on counter and index
          return Math.floor((counter * 7 + index * 3) % 10).toString()
        }))
        counter++
      }, spinInterval)

      // Stop spinning after duration and set final value
      const timeout = setTimeout(() => {
        clearInterval(interval)
        setDigits(['1', '0', '0', ',', '0', '0', '0'])
        setIsSpinning(false)
      }, spinDuration)
      
      return { interval, timeout }
    }

    // Start immediately on mount
    const { timeout: initialTimeout } = startAnimation()

    // Then repeat every 10 seconds
    const repeatInterval = setInterval(() => {
      startAnimation()
    }, 10000)

    return () => {
      clearInterval(repeatInterval)
      clearTimeout(initialTimeout)
    }
  }, [])

  // Handle hover animations
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isHoveringFirst) {
      // Animate all digits when hovering first 3
      setIsSpinning(true)
      let hoverCounter = 0
      interval = setInterval(() => {
        setDigits(prev => prev.map((char, index) => {
          if (char === ',') return ','
          // Use deterministic values based on counter and index
          return Math.floor((hoverCounter * 5 + index * 2) % 10).toString()
        }))
        hoverCounter++
      }, 50)
    } else if (isHoveringLast) {
      // Animate only last 3 digits when hovering last 3
      setIsSpinning(true)
      let lastHoverCounter = 0
      interval = setInterval(() => {
        setDigits(prev => prev.map((char, index) => {
          if (char === ',' || index < 4) return char // Keep comma and first 3 digits static
          // Use deterministic values based on counter and index
          return Math.floor((lastHoverCounter * 3 + index * 4) % 10).toString()
        }))
        lastHoverCounter++
      }, 50)
    } else {
      // Stop hover animation and reset to static with proper alignment
      setIsSpinning(false)
      // Use setTimeout to ensure smooth transition back to static state
      setTimeout(() => {
        setDigits(['1', '0', '0', ',', '0', '0', '0'])
      }, 50)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isHoveringFirst, isHoveringLast])

  return (
    <span 
      className="inline-block font-mono" 
      style={{ 
        fontFamily: 'monospace', 
        letterSpacing: '0.05em',
        minWidth: '8.5em', // Ensure consistent width
        display: 'inline-block',
        textAlign: 'left'
      }}
    >
      <span className="inline-block" style={{ width: '0.6em' }}>$</span>
      {/* First 3 digits + comma */}
      <span 
        className="inline-block"
        onMouseEnter={() => setIsHoveringFirst(true)}
        onMouseLeave={() => setIsHoveringFirst(false)}
      >
        {digits.slice(0, 4).map((char, index) => (
          <motion.span
            key={index}
            className="inline-block"
            style={{ 
              width: char === ',' ? '0.3em' : '0.6em',
              textAlign: 'center',
              display: 'inline-block'
            }}
            animate={isSpinning && char !== ',' && (isHoveringFirst || (!isHoveringFirst && !isHoveringLast)) ? { 
              y: [0, -10, 0],
              scale: [1, 1.1, 1]
            } : {
              y: 0,
              scale: 1
            }}
            transition={{
              duration: isSpinning ? 0.1 : 0.3,
              repeat: isSpinning && char !== ',' && (isHoveringFirst || (!isHoveringFirst && !isHoveringLast)) ? Infinity : 0,
              delay: index * 0.05,
              ease: "easeOut"
            }}
          >
            {char}
          </motion.span>
        ))}
      </span>
      {/* Last 3 digits */}
      <span 
        className="inline-block"
        onMouseEnter={() => setIsHoveringLast(true)}
        onMouseLeave={() => setIsHoveringLast(false)}
      >
        {digits.slice(4).map((char, index) => (
          <motion.span
            key={index + 4}
            className="inline-block"
            style={{ 
              width: '0.6em',
              textAlign: 'center',
              display: 'inline-block'
            }}
            animate={isSpinning && (isHoveringLast || isHoveringFirst || (!isHoveringFirst && !isHoveringLast)) ? { 
              y: [0, -10, 0],
              scale: [1, 1.1, 1]
            } : {
              y: 0,
              scale: 1
            }}
            transition={{
              duration: isSpinning ? 0.1 : 0.3,
              repeat: isSpinning && (isHoveringLast || isHoveringFirst || (!isHoveringFirst && !isHoveringLast)) ? Infinity : 0,
              delay: (index + 4) * 0.05,
              ease: "easeOut"
            }}
          >
            {char}
          </motion.span>
        ))}
      </span>
    </span>
  )
}

function GooeyDemo() {
  const screenSize = useScreenSize()
  const sectionRef = useRef(null)
  
  // Scroll-based animations for hero text
  const { scrollYProgress } = useScroll({ 
    target: sectionRef,
    offset: ["start start", "end start"]
  })
  
  const titleOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])
  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -150])
  const titleScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.8])

  return (
    <div ref={sectionRef} className="w-screen h-responsive-screen flex overflow-visible relative safe-width" style={{ maxWidth: '100vw' }}>
      <GooeyFilter id="gooey-filter-pixel-trail" strength={5} />
      
      {/* Left Half */}
      <div className="w-2/5 h-full relative flex flex-col justify-center px-responsive py-responsive overflow-visible">
          {/* Brutalist color blocks - sharp geometric layout */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {/* Black base */}
            <div className="absolute inset-0" style={{ backgroundColor: '#0F0F0F' }}></div>
            
            {/* Off-white block - top right */}
            <div className="absolute top-0 right-0 w-1/3 h-1/4" style={{ backgroundColor: '#00D4FF' }}></div>
            
            {/* Bright orange block - middle left */}
            <div className="absolute top-1/4 left-0 w-1/2 h-1/3" style={{ backgroundColor: '#FF6B00' }}></div>
            
            {/* Acid green block - bottom right corner */}
            <div className="absolute bottom-0 right-0 w-1/2 h-1/5" style={{ backgroundColor: '#00FF88' }}></div>
            
            {/* Charcoal accent - thin vertical strip */}
            <div className="absolute top-1/3 right-1/3 w-1/12 h-1/2" style={{ backgroundColor: '#161616' }}></div>
            
            {/* Additional geometric shapes */}
            <div className="absolute top-3/4 left-1/4 w-1/4 h-1/6" style={{ backgroundColor: '#f7d92d' }}></div>
          </div>

          {/* Pixel trail overlay */}
          <div
            className="absolute inset-0 z-5 overflow-visible"
            style={{ filter: "url(#gooey-filter-pixel-trail)" }}
          >
            <PixelTrail
              pixelSize={screenSize.lessThan(`md`) ? 48 : 64}
              fadeDuration={0}
              delay={500}
              pixelClassName="bg-yellow-400"
            />
          </div>

          {/* Main title text - Brutalist typography - MOVED INSIDE LEFT SECTION */}
          <motion.div 
            className="absolute z-70 text-left text-overflow-safe"
            style={{ 
              opacity: titleOpacity, 
              y: titleY, 
              scale: titleScale,
              left: 'clamp(0.5rem, 1.5vw, 2rem)', // Reduced left margin for smaller screens
              top: '32%',
              transform: 'translateY(-50%)',
              maxWidth: 'min(55vw, 700px)' // Extended max width to allow overflow into right section
            }}
          >
            <h1 className="font-mono font-black leading-[0.9] tracking-tight uppercase text-overflow-safe" style={{ 
              fontWeight: '900', 
              fontFamily: 'Satoshi, Inter, "Helvetica Neue", monospace',
              fontSize: 'clamp(2.8rem, 4.5vw + 1.5rem, 7.7rem)' // Reverted to larger size for better readability
            }}>
              {/* UNITED STATES */}
              <div className="text-white mb-2 text-overflow-safe">
                <span className="inline-block hover:text-yellow-500 transition-colors duration-300">U</span>
                <span className="inline-block hover:text-cyan-500 transition-colors duration-300">N</span>
                <span className="inline-block hover:text-pink-500 transition-colors duration-300">I</span>
                <span className="inline-block hover:text-green-500 transition-colors duration-300">T</span>
                <span className="inline-block hover:text-purple-500 transition-colors duration-300">E</span>
                <span className="inline-block hover:text-orange-500 transition-colors duration-300">D</span><br />
                <span className="inline-block hover:text-red-500 transition-colors duration-300">S</span>
                <span className="inline-block hover:text-blue-500 transition-colors duration-300">T</span>
                <span className="inline-block hover:text-lime-500 transition-colors duration-300">A</span>
                <span className="inline-block hover:text-indigo-500 transition-colors duration-300">T</span>
                <span className="inline-block hover:text-rose-500 transition-colors duration-300">E</span>
                <span className="inline-block hover:text-emerald-500 transition-colors duration-300">S</span>
              </div>
              
              {/* ENTREPRENEURIAL with color block background - ONLY behind ENTREPRENEUR */}
              <div className="relative mb-2 group text-overflow-safe overflow-visible">
                {/* Static pink background - positioned to start at 1/3 of 3rd E (where right section begins) */}
                <div 
                  className="absolute -z-20 transform -skew-x-2" 
                  style={{ 
                    backgroundColor: '#F72585', 
                    left: '1.8em', // Starts at approximately 1/3 of 3rd E
                    width: 'calc(100% - 1.8em)', // Extends to end of word
                    height: '1.1em',
                    top: '0'
                  }}
                ></div>
                
                {/* Initial loading animation - from left to right on page load */}
                <motion.div 
                  className="absolute -z-10 transform -skew-x-2" 
                  style={{ 
                    backgroundColor: '#F72585', 
                    left: '1.8em', // Starts at approximately 1/3 of 3rd E
                    width: 'calc(100% - 1.8em)', // Extends to end of word
                    height: '1.1em',
                    top: '0'
                  }}
                  initial={{ 
                    scaleX: 0,
                    transformOrigin: 'left'
                  }}
                  animate={{ 
                    scaleX: 1,
                    transformOrigin: 'left'
                  }}
                  transition={{ 
                    duration: 1.2, 
                    delay: 0.5,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                ></motion.div>
                
                {/* Hover animation - positioned to extend across sections */}
                <div 
                  className="absolute transform -skew-x-2 scale-x-0 group-hover:scale-x-100 transition-transform duration-600 origin-left" 
                  style={{ 
                    backgroundColor: '#00FFFF', // Bright cyan for contrast
                    left: '0', // Start from beginning of word
                    width: '25em', // Much larger width to ensure it reaches the right section
                    height: '1.1em',
                    top: '0',
                    zIndex: 5, // Positive z-index to ensure visibility
                    pointerEvents: 'none',
                    overflow: 'visible' // Ensure it can extend beyond container
                  }}
                ></div>
                
                <span className="text-white relative z-50 text-overflow-safe whitespace-nowrap">
                  <span className="group-hover:text-black transition-colors duration-300 relative z-10">
                    <span className="inline-block hover:text-yellow-500 transition-colors duration-200">E</span>
                    <span className="inline-block hover:text-cyan-500 transition-colors duration-200">N</span>
                    <span className="inline-block hover:text-pink-500 transition-colors duration-200">T</span>
                  </span>
                  <span style={{ color: '#FF1B8D', fontWeight: '900' }} className="group-hover:text-yellow-400 transition-colors duration-300 relative z-10">REPRENEUR</span>
                  <span style={{ color: '#00FF88', fontWeight: '900' }} className="group-hover:text-purple-600 transition-colors duration-300 relative z-10">IAL</span>
                </span>
              </div>
              
              {/* COMPETITION */}
              <div className="text-white text-overflow-safe relative z-50 group">
                <span className="group-hover:text-white-400 transition-colors duration-000">
                  <span className="inline-block hover:text-red-500 transition-colors duration-200">C</span>
                  <span className="inline-block hover:text-blue-500 transition-colors duration-200">O</span>
                  <span className="inline-block hover:text-green-500 transition-colors duration-200">M</span>
                  <span className="inline-block hover:text-purple-500 transition-colors duration-200">P</span>
                  <span className="inline-block hover:text-orange-500 transition-colors duration-200">E</span>
                  <span className="inline-block hover:text-pink-500 transition-colors duration-200">T</span>
                  <span className="inline-block hover:text-lime-500 transition-colors duration-200">I</span>
                  <span className="inline-block hover:text-indigo-500 transition-colors duration-200">T</span>
                  <span className="inline-block hover:text-rose-500 transition-colors duration-200">I</span>
                  <span className="inline-block hover:text-emerald-500 transition-colors duration-200">O</span>
                </span>
                <span style={{ color: '#00FF88', fontWeight: '900', position: 'relative', zIndex: 60 }} className="group-hover:text-cyan-400 transition-colors duration-300 inline-block hover:text-yellow-400">N</span>
              </div>
            </h1>
          </motion.div>
        </div>
        
        {/* Right Half */}
        <div className="w-1/2 h-full relative bg-white flex flex-col justify-center px-responsive py-responsive overflow-visible">
          {/* Pixel trail background - lower z-index */}
          <div
            className="absolute inset-0 z-20 overflow-visible"
            style={{ filter: "url(#gooey-filter-pixel-trail)" }}
          >
            <PixelTrail
              pixelSize={screenSize.lessThan(`md`) ? 48 : 64}
              fadeDuration={0}
              delay={500}
              pixelClassName="bg-red-500"
            />
          </div>

          {/* Editorial text blocks - higher z-index with selective pointer events */}
          <div className="absolute inset-0 z-30 pointer-events-none overflow-visible" style={{ 
            paddingLeft: 'clamp(1.5rem, 5vw, 5rem)', 
            paddingRight: 'clamp(1.5rem, 5vw, 5rem)',
            paddingTop: 'clamp(3rem, 8vw, 8rem)', // Added top padding to avoid marquee overlap
            paddingBottom: 'clamp(1.5rem, 5vw, 5rem)'
          }}>
            {/* Top-left: $100K Prize Line - moved down to avoid marquee */}
            <motion.div 
              className="absolute left-0 max-w-[75%] pointer-events-auto text-overflow-safe"
              style={{ top: 'clamp(1rem, 3vw, 3rem)' }} // Positioned below marquee
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <h2 className="text-black font-sans font-bold leading-relaxed text-overflow-safe" style={{ 
                fontSize: 'clamp(0.85rem, 1.8vw + 0.55rem, 4rem)', // Reduced by ~30% for smaller screens
                lineHeight: '1.3' // Improved line height to prevent overlapping
              }}>
                                  <AnimatedText
                    text="Compete for "
                    className="text-black font-sans font-bold leading-tight text-overflow-safe"
                    style={{ 
                      fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                      fontWeight: '700',
                      color: '#000000',
                      fontSize: 'inherit'
                    }}
                  />
                <span className="text-emerald-400"><SlotAmount /></span>
                                  <AnimatedText
                    text="Ohio&apos;s Biggest Startup Prize"
                    className="text-black font-sans font-bold leading-tight text-overflow-safe"
                    style={{ 
                      fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                      fontWeight: '700',
                      color: '#000000',
                      fontSize: 'inherit'
                    }}
                  />
              </h2>
            </motion.div>

            {/* Bottom-left: Oct 5 Line - responsive positioning */}
            <motion.div 
              className="absolute left-0 max-w-[65%] pointer-events-auto text-overflow-safe"
              style={{ bottom: 'clamp(0.5rem, 2vw, 2rem)' }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
            >
              <div className="text-black font-sans font-light italic leading-tight tracking-wide text-overflow-safe" style={{ 
                fontSize: 'clamp(0.85rem, 1.5vw + 0.4rem, 2.5rem)' // Reduced by ~30% for smaller screens
              }}>
                <AnimatedText
                  text="Winners revealed "
                  className="text-black font-sans font-light italic leading-tight tracking-wide text-overflow-safe"
                  style={{ 
                    fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                    fontWeight: '300',
                    fontStyle: 'italic',
                    color: '#000000',
                    fontSize: 'inherit'
                  }}
                />
                <span className="text-purple-400 font-bold not-italic">Oct 5</span>
                <AnimatedText
                  text=" at Homecoming."
                  className="text-black font-sans font-light italic leading-tight tracking-wide text-overflow-safe"
                  style={{ 
                    fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                    fontWeight: '300',
                    fontStyle: 'italic',
                    color: '#000000',
                    fontSize: 'inherit'
                  }}
                />
                <br />
                <span className="font-bold not-italic">
                  <AnimatedText
                    text="Win. Launch. Scale."
                    className="text-black font-sans font-bold not-italic leading-tight tracking-wide text-overflow-safe"
                    style={{ 
                      fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                      fontWeight: '700',
                      fontStyle: 'normal',
                      color: '#000000',
                      fontSize: 'inherit'
                    }}
                  />
                </span>
              </div>
            </motion.div>
          </div>
        </div>

      {/* Right-side stacked text module - flush against navbar */}
      <motion.div 
        className="absolute top-0 right-0 flex flex-col items-end justify-start gap-[3.2rem] z-50 max-w-xs text-right"
        style={{ 
          opacity: titleOpacity, 
          y: titleY, 
          scale: titleScale,
          paddingTop: 'clamp(2.5rem, 5vh, 5rem)', // Below marquee strip
          paddingRight: 'clamp(0.75rem, 2vw, 2rem)', // Reverted to original positioning
          paddingBottom: 'clamp(1rem, 3vh, 2rem)'
        }}
      >
        {/* Innovation meets OPPORTUNITY tagline */}
        <div className="font-milker-bold leading-tight text-overflow-safe whitespace-nowrap" style={{ 
          fontSize: 'clamp(1.0rem, 2.0vw + 0.6rem, 2.5rem)' // Responsive sizing
        }}>
          <div className="text-blue-700">Innovation</div>
          <div className="text-purple-500">meets</div>
          <div className="text-red-600 font-black uppercase">OPPORTUNITY</div>
        </div>

        {/* Pitch live on September 26 text */}
        <div className="text-black font-sans leading-relaxed text-right text-overflow-safe" style={{ 
          fontSize: 'clamp(1rem, 1.8vw + 0.5rem, 1.8rem)' // Responsive sizing
        }}>
          <AnimatedText
            text="Pitch live on "
            className="text-black font-sans leading-relaxed text-right text-overflow-safe"
            style={{ 
              fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
              fontWeight: '400',
              color: '#000000',
              fontSize: 'inherit'
            }}
          />
          <span className="text-blue-700 font-semibold">September 26</span>
          <AnimatedText
            text=". Face top judges. Real stakes."
            className="text-black font-sans leading-relaxed text-right text-overflow-safe"
            style={{ 
              fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
              fontWeight: '400',
              color: '#000000',
              fontSize: 'inherit'
            }}
          />
        </div>
      </motion.div>

      {/* Awards Ticket - positioned separately below the stacked module */}
      <motion.div 
        className="absolute pointer-events-auto"
        style={{ 
          top: 'clamp(55%, 60%, 65%)', // Positioned below the stacked text module
          right: 'clamp(0.75rem, 2vw, 2rem)', // Same right padding as stacked module
          transform: 'translateY(-50%)' // Center vertically at this position
        }}
        initial={{ opacity: 0, scale: 0.8, x: -30 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ delay: 0.9, duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <AwardsTicket />
      </motion.div>
    </div>
  )
}

export { GooeyDemo } 