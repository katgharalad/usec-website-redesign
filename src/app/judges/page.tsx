"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { RightNavbar } from "@/components/ui/right-navbar"
import { PixelTrail } from "@/components/ui/pixel-trail"
import { GooeyFilter } from "@/components/ui/gooey-filter"
import { useScreenSize } from "@/hooks/use-screen-size"
import { AnimatedText } from "@/components/ui/animated-text"

interface Judge {
  id: string
  name: string
  bio: string[]
  image: string
}

const judgesData: Judge[] = [
  { 
    id: "scott", 
    name: "Scott Hauman",
    image: "https://sites.owu.edu/usec/wp-content/uploads/sites/221/2024/09/Scott-Hauman-200x300.jpg",
    bio: [
      "Venture Capital Partner at TechStars",
      "Former CEO of three successful startups",
      "Expert in scaling technology companies",
      "Mentor to 200+ entrepreneurs globally",
      "Focus on AI and fintech investments",
      "Harvard Business School alumnus",
      "Board member at Innovation Hub",
      "20+ years in startup ecosystem"
    ]
  },
  { 
    id: "randy", 
    name: "Randy Mullen Jr.",
    image: "https://sites.owu.edu/usec/wp-content/uploads/sites/221/2024/09/Randy-Mullen-Jr-682x1024.jpg",
    bio: [
      "Serial entrepreneur and angel investor",
      "Founded four companies, three exits",
      "Specializes in B2B SaaS platforms",
      "Former VP of Product at Microsoft",
      "Advisor to Fortune 500 companies",
      "Stanford Engineering graduate",
      "Speaker at major tech conferences",
      "Passionate about sustainable innovation"
    ]
  },
  { 
    id: "andy", 
    name: "Andy Warnock",
    image: "https://sites.owu.edu/usec/wp-content/uploads/sites/221/2024/09/Andy-Warnock-683x1024.jpg",
    bio: [
      "Managing Director at Growth Equity Fund",
      "15 years in private equity",
      "Expert in market expansion strategies",
      "Former McKinsey & Company consultant",
      "Specializes in healthcare technology",
      "Wharton MBA with distinction",
      "Board positions at 12 companies",
      "Champion of diversity in tech"
    ]
  },
  { 
    id: "carol", 
    name: "Carol A. Latham '61",
    image: "https://sites.owu.edu/usec/wp-content/uploads/sites/221/2024/09/Carol-Latham-683x1024.jpg",
    bio: [
      "Ohio Wesleyan University alumna",
      "Pioneering female entrepreneur",
      "Founded biotech company in 1985",
      "Expert in pharmaceutical innovation",
      "Mentor to women in STEM",
      "PhD in Biochemistry from Yale",
      "Author of 'Breaking Barriers'",
      "Philanthropist and education advocate"
    ]
  },
  { 
    id: "sean", 
    name: "Sean Hughes",
    image: "https://sites.owu.edu/usec/wp-content/uploads/sites/221/2024/09/Sean-Hughes-683x1024.jpg",
    bio: [
      "Chief Innovation Officer at Global Corp",
      "Expert in digital transformation",
      "Former startup founder and CTO",
      "Specializes in emerging technologies",
      "MIT Computer Science graduate",
      "Patent holder in blockchain tech",
      "Keynote speaker on innovation",
      "Advisor to government tech initiatives"
    ]
  },
  { 
    id: "nicholas", 
    name: "Dr. Nicholas J. Hill",
    image: "https://sites.owu.edu/usec/wp-content/uploads/sites/221/2024/09/Nicholas-Hill-682x1024.jpg",
    bio: [
      "Professor of Entrepreneurship at OWU",
      "Director of Innovation Center",
      "Former Silicon Valley executive",
      "Expert in startup methodology",
      "PhD in Business Administration",
      "Published researcher on innovation",
      "Consultant to Fortune 100 companies",
      "Passionate educator and mentor"
    ]
  }
]

// Judge Card Component
function JudgeCard({ judge, index }: { judge: Judge; index: number }) {
  const [isHovered, setIsHovered] = useState(false)
  const [colorUnloaded, setColorUnloaded] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Colors for each card
  const colors = [
    "#00FF88", // acid green
    "#F72585", // neon magenta
    "#00D4FF", // electric blue
    "#0F0F0F", // black
    "#161616", // charcoal
    "#00FF88"  // acid green
  ]
  const cardColor = colors[index % colors.length]

  // Set mounted state and trigger color unload animation
  useEffect(() => {
    setIsMounted(true)
    
    const timer = setTimeout(() => {
      setColorUnloaded(true)
    }, 500 + (index * 200)) // Staggered animation
    
    return () => clearTimeout(timer)
  }, [index])

  return (
    <motion.div
      className="group w-full max-w-md bg-white border-2 border-black overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 80, scale: 0.85, rotateX: 10 }}
      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ 
        delay: index * 0.12, 
        duration: 0.8, 
        ease: [0.25, 0.46, 0.45, 0.94],
        type: "spring",
        stiffness: 120,
        damping: 18
      }}
      animate={{
        scale: isHovered ? 1.04 : 1,
        y: isHovered ? -12 : 0,
        rotateY: isHovered ? 3 : 0,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 30,
          mass: 0.7
        }
      }}
      style={{
        boxShadow: isHovered ? 
          "0 30px 40px -5px rgba(0, 0, 0, 0.2), 0 20px 20px -5px rgba(0, 0, 0, 0.1)" : 
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
      }}
    >
      {/* IMAGE CONTAINER - Fixed aspect ratio */}
      <div className="relative w-full aspect-[2/3] overflow-hidden">
        {/* Color Overlay - Smooth unload from top to bottom on page load */}
        <motion.div
          className="absolute inset-0 z-10"
          style={{ backgroundColor: cardColor }}
          initial={{ y: "0%", opacity: 1 }}
          animate={{
            y: isMounted && colorUnloaded ? "-100%" : "0%",
            opacity: isMounted && colorUnloaded ? 0 : 1
          }}
          transition={{ 
            duration: 1.4, 
            ease: [0.25, 0.46, 0.45, 0.94],
            delay: 0.4 + (index * 0.25),
            type: "spring",
            stiffness: 80,
            damping: 20
          }}
        />
        
        {/* Judge Image */}
        <Image
          src={judge.image}
          alt={judge.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={index < 2}
        />
      </div>

      {/* NAME BLOCK */}
      <div className="p-4 text-center border-t-2 border-black bg-white">
        <h3 
          className="font-black uppercase tracking-tight leading-tight text-black text-sm"
          style={{ 
            fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
            fontWeight: '900',
            fontSize: 'clamp(0.9rem, 1.2vw, 1.1rem)'
          }}
        >
          {judge.name}
        </h3>
      </div>

      {/* BIO BLOCK ON HOVER - Overlay */}
      <motion.div 
        className="absolute inset-0 bg-white bg-opacity-95 p-6 flex flex-col justify-center items-start text-sm leading-relaxed font-mono tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        style={{ 
          pointerEvents: isHovered ? 'auto' : 'none',
          fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif'
        }}
      >
        <motion.h4 
          className="font-black uppercase tracking-tight leading-tight text-black mb-4 text-lg"
          style={{ 
            fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
            fontWeight: '900'
          }}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: isHovered ? 0 : 20, opacity: isHovered ? 1 : 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
        >
          {judge.name}
        </motion.h4>
        
        <div className="space-y-2">
          {judge.bio.map((line, lineIndex) => (
            <motion.p 
              key={lineIndex}
              className="text-black font-bold leading-tight text-xs"
              style={{ 
                fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                fontWeight: '700',
                fontSize: 'clamp(0.75rem, 1vw, 0.9rem)'
              }}
              initial={{ x: -20, opacity: 0 }}
              animate={{ 
                x: isHovered ? 0 : -20, 
                opacity: isHovered ? 1 : 0 
              }}
              transition={{ 
                delay: 0.2 + (lineIndex * 0.05), 
                duration: 0.3,
                ease: "easeOut"
              }}
            >
              • {line}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Judges() {
  const screenSize = useScreenSize()

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      <GooeyFilter id="gooey-filter-judges" strength={3} />
      
      {/* Right vertical navigation - inherited from main page */}
      <RightNavbar />
      
      {/* Scrolling "Apply Now" banner on top - inherited from main page */}
      <div className="absolute top-0 left-0 w-full h-6 bg-lime-400 overflow-hidden z-50 border-b border-green-500 marquee-strip">
        <div className="absolute whitespace-nowrap animate-marquee text-black font-semibold tracking-[0.2em] text-xs sm:text-sm uppercase font-mono">
          {Array(12).fill("Apply Now • ").join("")}
        </div>
        <div className="absolute whitespace-nowrap animate-marquee text-black font-semibold tracking-[0.2em] text-xs sm:text-sm uppercase font-mono" style={{ animationDelay: '-9s' }}>
          {Array(12).fill("Apply Now • ").join("")}
        </div>
      </div>



      <div className="flex min-h-screen">
        {/* LEFT PANEL - Static Title with Brutalist Background (expanded width) */}
        <div className="w-2/5 relative z-[15] flex items-end overflow-visible" style={{ zIndex: 15 }}>
          {/* White background */}
          <div className="absolute inset-0 z-0 bg-white"></div>

          {/* Gooey pixel trail overlay - extended to overflow into right panel */}
          <div
            className="absolute inset-0 z-5"
            style={{ 
              filter: "url(#gooey-filter-judges)",
              width: "120%", // Extend beyond the left panel boundary
              right: "-20%" // Position to overflow into the gap
            }}
          >
            <PixelTrail
              pixelSize={screenSize.lessThan(`md`) ? 48 : 64}
              fadeDuration={0}
              delay={500}
              useRandomColors={true}
            />
          </div>

          <div className="absolute bottom-12 left-12 bg-white px-4 py-2 -ml-4 z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <AnimatedText
                lines={["2024", "JUDGES"]}
                className="font-sans font-black uppercase tracking-tight leading-[0.85]"
                style={{ 
                  fontSize: 'clamp(3rem, 10vw, 10rem)',
                  fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                  color: '#000000'
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* RIGHT PANEL - Scrollable Content (adjusted width) */}
        <div className="w-3/5 relative z-10 overflow-y-auto h-screen bg-white">
          <div className="p-8 pr-16">
            
            {/* Judges Grid - Responsive layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center max-w-6xl mx-auto">
              {judgesData.map((judge, index) => (
                <JudgeCard key={judge.id} judge={judge} index={index} />
              ))}
            </div>

            {/* Additional spacing at bottom */}
            <div className="h-8"></div>

          </div>
        </div>
      </div>
    </section>
  )
} 