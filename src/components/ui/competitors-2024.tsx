"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { PixelTrail } from "@/components/ui/pixel-trail"
import { GooeyFilter } from "@/components/ui/gooey-filter"
import { useScreenSize } from "@/hooks/use-screen-size"
import { AnimatedText } from "@/components/ui/animated-text"

// Barcode Component for aesthetic purposes
interface BarcodeProps {
  corner: 'bottom-left' | 'bottom-right'
}

function Barcode({ corner }: BarcodeProps) {
  // Generate realistic barcode pattern with variable line widths - horizontal only
  const generateBarcodePattern = () => {
    const widths = [1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2]
    return widths // Optimized pattern for horizontal display
  }
  
  const lines = generateBarcodePattern()
  const isBottomLeft = corner === 'bottom-left'
  
  // Calculate total barcode width (all barcodes are horizontal now)
  const totalBarcodeWidth = lines.reduce((sum, width) => sum + width, 0) + (lines.length - 1) // include gaps
  
  // Container sizing for horizontal barcodes only
  const padding = 4
  const containerWidth = totalBarcodeWidth + (padding * 2) + 4
  const containerHeight = 20 + (padding * 2)
  
  // Barcode dimensions (always horizontal)
  const barcodeWidth = totalBarcodeWidth
  const barcodeHeight = 16
  
  return (
    <div 
      className={`absolute ${isBottomLeft ? 'bottom-2 left-2' : 'bottom-2 right-2'} bg-white z-20 flex items-center justify-center`}
      style={{ 
        width: `${containerWidth}px`,
        height: `${containerHeight}px`,
        border: '1px solid #000',
        borderRadius: '2px',
        padding: `${padding}px`
      }}
    >
      <div 
        className="flex items-end justify-center gap-px" 
        style={{ 
          width: `${barcodeWidth}px`,
          height: `${barcodeHeight}px`
        }}
      >
        {lines.map((width, index) => (
          <div
            key={index}
            className="bg-black"
            style={{
              width: `${width}px`,
              height: '100%',
              minWidth: `${width}px`,
              maxWidth: `${width}px`
            }}
          />
        ))}
      </div>
    </div>
  )
}

interface Competitor {
  id: string
  title: string
  subtitle: string
  description: string
  type: "student" | "professional"
  color: string
  textColor: "white" | "black"
}

const competitorsData: Competitor[] = [
  // Professional Competitors
  {
    id: "eternium",
    title: "Eternium Aerospace",
    subtitle: "Next-gen satellite propulsion",
    description: "Eternium Aerospace develops revolutionary electric propulsion systems for small satellites, enabling more efficient orbital maneuvers and extended mission life. Their proprietary ion drive technology reduces fuel requirements by 60% while providing precise attitude control.",
    type: "professional",
    color: "#00FF88",
    textColor: "black"
  },
  {
    id: "hyperspectral",
    title: "Industrial Hyperspectral Solutions",
    subtitle: "Advanced material analysis",
    description: "Industrial Hyperspectral Solutions creates cutting-edge imaging systems that can identify material composition in real-time. Their technology is revolutionizing quality control in manufacturing, enabling instant detection of defects and contamination.",
    type: "professional",
    color: "#F72585",
    textColor: "white"
  },
  {
    id: "mobilemed",
    title: "Mobile Med",
    subtitle: "Healthcare accessibility platform",
    description: "Mobile Med brings specialized medical care directly to underserved communities through their mobile clinic network and telemedicine platform. They've provided care to over 15,000 patients in rural Ohio communities.",
    type: "professional",
    color: "#00CFFF",
    textColor: "black"
  },
  {
    id: "waterwise",
    title: "WaterWise Technologies",
    subtitle: "Smart irrigation systems",
    description: "WaterWise Technologies develops AI-powered irrigation systems that reduce water usage by up to 40% while maintaining crop yields. Their sensors monitor soil moisture, weather patterns, and plant health to optimize watering schedules.",
    type: "professional",
    color: "#1A1A1A",
    textColor: "white"
  },
  {
    id: "zades",
    title: "Za'de's Soul Food",
    subtitle: "Community-focused catering",
    description: "Za'de's Soul Food combines traditional Southern cuisine with modern business practices, providing catering services while creating job opportunities in underserved communities. They've expanded to three locations and employ 25 local residents.",
    type: "professional",
    color: "#FAFAFA",
    textColor: "black"
  },
  // Student Competitors
  {
    id: "junietta",
    title: "Junietta",
    subtitle: "Sustainable fashion marketplace",
    description: "Junietta is a peer-to-peer marketplace for sustainable fashion, connecting conscious consumers with eco-friendly clothing brands and individual sellers. Their platform has facilitated over $2M in sustainable fashion transactions.",
    type: "student",
    color: "#F72585",
    textColor: "white"
  },
  {
    id: "motiv",
    title: "Motiv",
    subtitle: "Mental health fitness tracking",
    description: "Motiv gamifies mental health through daily challenges, mood tracking, and peer support networks. Their app helps college students build healthy habits and connect with campus mental health resources.",
    type: "student",
    color: "#00FF88",
    textColor: "black"
  },
  {
    id: "terrabuffer",
    title: "Terrabuffer",
    subtitle: "Carbon capture agriculture",
    description: "Terrabuffer develops soil amendments that increase crop yields while capturing atmospheric carbon. Their biochar-based products help farmers improve soil health and participate in carbon credit markets.",
    type: "student",
    color: "#1A1A1A",
    textColor: "white"
  },
  {
    id: "searchowl",
    title: "SearchOwl",
    subtitle: "Academic research assistant",
    description: "SearchOwl uses AI to help students and researchers find relevant academic papers and synthesize information across multiple sources. Their tool has been adopted by 12 universities nationwide.",
    type: "student",
    color: "#00CFFF",
    textColor: "black"
  },
  {
    id: "zen",
    title: "Zen Music Group",
    subtitle: "Reshaping sync licensing with AI",
    description: "Zen Music Group's mission is to reshape the music industry by using AI to match independent artists with sync licensing opportunities in film, TV, and advertising. They've facilitated over 500 licensing deals.",
    type: "student",
    color: "#FAFAFA",
    textColor: "black"
  }
]

export function Competitors2024() {
  const [selectedCard, setSelectedCard] = useState<Competitor | null>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const screenSize = useScreenSize()

  const handleMouseEnter = (cardId: string) => {
    setHoveredCard(cardId)
    setExpandedCard(cardId)
  }

  const handleMouseLeave = () => {
    setHoveredCard(null)
    setExpandedCard(null)
  }

  const professionalCompetitors = competitorsData.filter(c => c.type === "professional")
  const studentCompetitors = competitorsData.filter(c => c.type === "student")

  return (
    <section className="relative min-h-responsive-screen bg-white overflow-hidden">
      <GooeyFilter id="gooey-filter-competitors" strength={3} />
      
      {/* Pixel Trail Background - Extended to touch card section */}
      <div className="fixed top-0 left-0 w-1/4 h-screen z-[12] overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-auto"
          style={{ filter: "url(#gooey-filter-competitors)" }}
        >
          <PixelTrail
            pixelSize={screenSize.lessThan(`md`) ? 48 : 64}
            fadeDuration={0}
            delay={500}
            useRandomColors={true}
          />
        </div>
      </div>

      {/* TEXT OVERLAY - Above gooey filter */}
      <div className="fixed bottom-responsive z-[15] pointer-events-auto" style={{ left: 'clamp(10rem, 15vw, 15rem)' }}>
        <div className="transform -rotate-90 origin-bottom-left">
          <motion.div 
            className="relative whitespace-nowrap"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <AnimatedText
              lines={["2024", "COMPETITORS"]}
              className="font-sans font-black uppercase tracking-tight text-responsive-8xl"
              style={{ 
                fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                lineHeight: '0.8',
                fontWeight: '900',
                letterSpacing: '-0.02em',
                color: '#000000'
              }}
            />
          </motion.div>
        </div>
      </div>

      <div className="flex min-h-responsive-screen lg:flex-row flex-col px-responsive py-responsive">
        {/* LEFT PANEL - Static Title */}
        <div className="lg:w-1/4 w-full relative z-[10] flex items-end overflow-visible lg:min-h-screen min-h-[20vh]">
        </div>

        {/* RIGHT PANEL - Scrollable Content */}
        <div className="lg:w-3/4 w-full relative overflow-y-auto lg:h-screen h-auto bg-white z-20">
          <div className="py-responsive-lg px-responsive-lg">
            
            {/* Professional Competitors */}
            <div className="mb-responsive-lg">
              <div className="mb-responsive relative z-[15]">
                <h1 className="font-black uppercase tracking-tight leading-[0.85] text-black text-responsive-6xl">
                  <AnimatedText
                    text="PROFESSIONAL"
                    className="font-black uppercase tracking-tight leading-[0.85] text-black"
                    style={{ 
                      fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                      fontWeight: '900',
                      color: '#000000',
                      fontSize: 'inherit'
                    }}
                  />
                </h1>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-responsive w-full">
                {professionalCompetitors.map((competitor, index) => {
                  // Specific animation direction for each card (alternating pattern)
                  const animationDirections = ['topToBottom', 'leftToRight', 'leftToRight', 'topToBottom', 'leftToRight']
                  const animationDirection = animationDirections[index]
                  
                  // All barcodes are horizontal and positioned on the right
                  const barcodeCorner = 'bottom-right' as 'bottom-left' | 'bottom-right'
                  
                  // Responsive grid positioning
                  const gridClasses = [
                    'col-span-1', // Standard card
                    'col-span-1', // Standard card
                    'col-span-1', // Standard card
                    'col-span-1', // Standard card
                    'col-span-1'  // Standard card
                  ]
                  
                  // Responsive heights
                  const heights = [
                    'clamp(280px, 25vw, 320px)', // Responsive height
                    'clamp(280px, 25vw, 320px)', // Responsive height
                    'clamp(280px, 25vw, 320px)', // Responsive height
                    'clamp(280px, 25vw, 320px)', // Responsive height
                    'clamp(280px, 25vw, 320px)'  // Responsive height
                  ]
                  
                  return (
                    <motion.div
                      key={competitor.id}
                      className={`cursor-pointer relative z-[15] ${gridClasses[index]}`}
                      initial={{ opacity: 0, y: 80, scale: 0.85, rotateX: 15 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ 
                        delay: index * 0.15, 
                        duration: 0.8, 
                        ease: [0.25, 0.46, 0.45, 0.94],
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                      }}
                      onMouseEnter={() => handleMouseEnter(competitor.id)}
                      onMouseLeave={handleMouseLeave}
                      animate={{
                        scale: hoveredCard === competitor.id ? 1.03 : 1,
                        y: hoveredCard === competitor.id ? -12 : 0,
                        zIndex: hoveredCard === competitor.id ? 20 : 1,
                        rotateY: hoveredCard === competitor.id ? 2 : 0,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                          mass: 0.8
                        }
                      }}
                      style={{
                        boxShadow: hoveredCard === competitor.id ? 
                          "0 25px 35px -5px rgba(0, 0, 0, 0.15), 0 15px 15px -5px rgba(0, 0, 0, 0.08)" : 
                          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                      }}
                    >
                      {/* Card Header */}
                      <motion.div 
                        className="w-full border-[1.5px] border-black relative overflow-hidden p-responsive"
                        style={{ 
                          height: heights[index],
                          backgroundColor: hoveredCard === competitor.id ? 'white' : competitor.color
                        }}
                        animate={{
                          borderWidth: hoveredCard === competitor.id ? "2px" : "1.5px",
                          borderColor: "#000000",
                          marginBottom: hoveredCard === competitor.id ? "8px" : "0px"
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        {/* Loading Background Animation - Smooth Direction */}
                        <motion.div
                          className="absolute inset-0 z-0"
                          style={{ backgroundColor: competitor.color }}
                          initial={{ 
                            [animationDirection === 'leftToRight' ? 'x' : 'y']: "-100%",
                            opacity: 0.9
                          }}
                          animate={{
                            [animationDirection === 'leftToRight' ? 'x' : 'y']: 
                              hoveredCard === competitor.id ? "0%" : "-100%",
                            opacity: hoveredCard === competitor.id ? 1 : 0.9
                          }}
                          transition={{ 
                            duration: 0.6, 
                            ease: [0.25, 0.46, 0.45, 0.94],
                            type: "spring",
                            stiffness: 200,
                            damping: 20
                          }}
                        />
                      
                      {/* Card Content */}
                      <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                          <h4 className={`font-sans font-black uppercase tracking-tight leading-[1.05] mb-responsive-sm text-responsive-2xl ${
                            hoveredCard === competitor.id ? 
                              (competitor.textColor === 'white' ? 'text-white' : 'text-black') :
                              (competitor.textColor === 'white' ? 'text-white' : 'text-black')
                          }`}
                          style={{ 
                            fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif'
                          }}>
                            {competitor.title}
                          </h4>
                          <p className={`font-light opacity-80 uppercase tracking-wide text-responsive-sm ${
                            hoveredCard === competitor.id ? 
                              (competitor.textColor === 'white' ? 'text-white' : 'text-black') :
                              (competitor.textColor === 'white' ? 'text-white' : 'text-black')
                          }`}>
                            {competitor.subtitle}
                          </p>
                        </div>
                        <div className="flex items-end justify-end">
                          {/* Punching Hole */}
                          <div 
                            className="absolute bottom-responsive right-2 w-3 h-3 rounded-full border-2 border-black z-30"
                            style={{
                              backgroundColor: hoveredCard === competitor.id ? 
                                (competitor.color === '#FAFAFA' ? '#000000' : '#FFFFFF') : 
                                'transparent'
                            }}
                          />
                          <span className={`font-mono font-bold uppercase tracking-widest transform rotate-90 origin-bottom-right text-responsive-xs ${
                            hoveredCard === competitor.id ? 
                              (competitor.textColor === 'white' ? 'text-white' : 'text-black') :
                              (competitor.textColor === 'white' ? 'text-white' : 'text-black')
                          } opacity-40`}
                          style={{ marginBottom: 'clamp(2rem, 4vw, 2.5rem)' }}>
                            PRO
                          </span>
                        </div>
                      </div>
                      
                      {/* Aesthetic Barcode */}
                      <Barcode corner={barcodeCorner} />
                    </motion.div>

                    {/* Expandable Details */}
                    <AnimatePresence>
                      {expandedCard === competitor.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          className="overflow-hidden"
                          style={{ width: '100%' }}
                        >
                          <motion.div 
                            className="py-responsive px-responsive"
                            style={{
                              backgroundColor: competitor.color,
                              color: competitor.textColor,
                              border: "2px solid #000000",
                              borderTop: "2px solid #000000"
                            }}
                            initial={{ y: 20, opacity: 0, scale: 0.98 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
                          >
                            <motion.h4 
                              className="font-black mb-responsive uppercase tracking-wide text-responsive-lg"
                              style={{ 
                                color: competitor.textColor,
                                fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif'
                              }}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3, duration: 0.3 }}
                            >
                              Company Details
                            </motion.h4>
                            <motion.p
                              className="font-medium leading-relaxed text-responsive-base"
                              style={{ 
                                color: competitor.textColor,
                                fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif'
                              }}
                              initial={{ opacity: 0, x: -30 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ 
                                delay: 0.4, 
                                duration: 0.5,
                                ease: "easeOut"
                              }}
                            >
                              {competitor.description}
                            </motion.p>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )})}
              </div>
            </div>

            {/* Student Competitors */}
            <div className="mb-responsive-lg">
              <div className="mb-responsive relative z-[15]">
                <h1 className="font-black uppercase tracking-tight leading-[0.85] text-black text-responsive-6xl">
                  <AnimatedText
                    text="STUDENT"
                    className="font-black uppercase tracking-tight leading-[0.85] text-black"
                    style={{ 
                      fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                      fontWeight: '900',
                      color: '#000000',
                      fontSize: 'inherit'
                    }}
                  />
                </h1>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-responsive w-full">
                {studentCompetitors.map((competitor, index) => {
                  // Specific animation direction for each card (alternating pattern)
                  const animationDirections = ['leftToRight', 'topToBottom', 'topToBottom', 'leftToRight', 'topToBottom']
                  const animationDirection = animationDirections[index]
                  
                  // All barcodes are horizontal and positioned on the right
                  const barcodeCorner = 'bottom-right' as 'bottom-left' | 'bottom-right'
                  
                  // Responsive grid positioning
                  const gridClasses = [
                    'col-span-1', // Standard card
                    'col-span-1', // Standard card
                    'col-span-1', // Standard card
                    'col-span-1', // Standard card
                    'col-span-1'  // Standard card
                  ]
                  
                  // Responsive heights
                  const heights = [
                    'clamp(280px, 25vw, 320px)', // Responsive height
                    'clamp(280px, 25vw, 320px)', // Responsive height
                    'clamp(280px, 25vw, 320px)', // Responsive height
                    'clamp(280px, 25vw, 320px)', // Responsive height
                    'clamp(280px, 25vw, 320px)'  // Responsive height
                  ]
                  
                  return (
                    <motion.div
                      key={competitor.id}
                      className={`cursor-pointer relative z-[15] ${gridClasses[index]}`}
                      initial={{ opacity: 0, y: 80, scale: 0.85, rotateX: 15 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                      viewport={{ once: true, margin: "-10%" }}
                      transition={{ 
                        delay: index * 0.15, 
                        duration: 0.8, 
                        ease: [0.25, 0.46, 0.45, 0.94],
                        type: "spring",
                        stiffness: 100,
                        damping: 15
                      }}
                      onMouseEnter={() => handleMouseEnter(competitor.id)}
                      onMouseLeave={handleMouseLeave}
                      animate={{
                        scale: hoveredCard === competitor.id ? 1.03 : 1,
                        y: hoveredCard === competitor.id ? -12 : 0,
                        zIndex: hoveredCard === competitor.id ? 20 : 1,
                        rotateY: hoveredCard === competitor.id ? 2 : 0,
                        transition: {
                          type: "spring",
                          stiffness: 300,
                          damping: 25,
                          mass: 0.8
                        }
                      }}
                      style={{
                        boxShadow: hoveredCard === competitor.id ? 
                          "0 25px 35px -5px rgba(0, 0, 0, 0.15), 0 15px 15px -5px rgba(0, 0, 0, 0.08)" : 
                          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                      }}
                    >
                      {/* Card Header */}
                      <motion.div 
                        className="w-full border-[1.5px] border-black relative overflow-hidden p-responsive"
                        style={{ 
                          height: heights[index],
                          backgroundColor: hoveredCard === competitor.id ? 'white' : competitor.color
                        }}
                        animate={{
                          borderWidth: hoveredCard === competitor.id ? "2px" : "1.5px",
                          borderColor: "#000000",
                          marginBottom: hoveredCard === competitor.id ? "8px" : "0px"
                        }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        {/* Loading Background Animation - Smooth Direction */}
                        <motion.div
                          className="absolute inset-0 z-0"
                          style={{ backgroundColor: competitor.color }}
                          initial={{ 
                            [animationDirection === 'leftToRight' ? 'x' : 'y']: "-100%",
                            opacity: 0.9
                          }}
                          animate={{
                            [animationDirection === 'leftToRight' ? 'x' : 'y']: 
                              hoveredCard === competitor.id ? "0%" : "-100%",
                            opacity: hoveredCard === competitor.id ? 1 : 0.9
                          }}
                          transition={{ 
                            duration: 0.6, 
                            ease: [0.25, 0.46, 0.45, 0.94],
                            type: "spring",
                            stiffness: 200,
                            damping: 20
                          }}
                        />
                      
                      {/* Card Content */}
                      <div className="relative z-10 h-full flex flex-col justify-between">
                        <div>
                          <h4 className={`font-sans font-black uppercase tracking-tight leading-[1.05] mb-responsive-sm text-responsive-2xl ${
                            hoveredCard === competitor.id ? 
                              (competitor.textColor === 'white' ? 'text-white' : 'text-black') :
                              (competitor.textColor === 'white' ? 'text-white' : 'text-black')
                          }`}
                          style={{ 
                            fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif'
                          }}>
                            {competitor.title}
                          </h4>
                          <p className={`font-light opacity-80 uppercase tracking-wide text-responsive-sm ${
                            hoveredCard === competitor.id ? 
                              (competitor.textColor === 'white' ? 'text-white' : 'text-black') :
                              (competitor.textColor === 'white' ? 'text-white' : 'text-black')
                          }`}>
                            {competitor.subtitle}
                          </p>
                        </div>
                        <div className="flex items-end justify-end">
                          {/* Punching Hole */}
                          <div 
                            className="absolute bottom-responsive right-2 w-3 h-3 rounded-full border-2 border-black z-30"
                            style={{
                              backgroundColor: hoveredCard === competitor.id ? 
                                (competitor.color === '#FAFAFA' ? '#000000' : '#FFFFFF') : 
                                'transparent'
                            }}
                          />
                          <span className={`font-mono font-bold uppercase tracking-widest transform rotate-90 origin-bottom-right text-responsive-xs ${
                            hoveredCard === competitor.id ? 
                              (competitor.textColor === 'white' ? 'text-white' : 'text-black') :
                              (competitor.textColor === 'white' ? 'text-white' : 'text-black')
                          } opacity-40`}
                          style={{ marginBottom: 'clamp(2rem, 4vw, 2.5rem)' }}>
                            STU
                          </span>
                        </div>
                      </div>
                      
                      {/* Aesthetic Barcode */}
                      <Barcode corner={barcodeCorner} />
                    </motion.div>

                    {/* Expandable Details */}
                    <AnimatePresence>
                      {expandedCard === competitor.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.5, ease: "easeInOut" }}
                          className="overflow-hidden"
                          style={{ width: '100%' }}
                        >
                          <motion.div 
                            className="py-responsive px-responsive"
                            style={{
                              backgroundColor: competitor.color,
                              color: competitor.textColor,
                              border: "2px solid #000000",
                              borderTop: "2px solid #000000"
                            }}
                            initial={{ y: 20, opacity: 0, scale: 0.98 }}
                            animate={{ y: 0, opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
                          >
                            <motion.h4 
                              className="font-black mb-responsive uppercase tracking-wide text-responsive-lg"
                              style={{ 
                                color: competitor.textColor,
                                fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif'
                              }}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3, duration: 0.3 }}
                            >
                              Project Details
                            </motion.h4>
                            <motion.p
                              className="font-medium leading-relaxed text-responsive-base"
                              style={{ 
                                color: competitor.textColor,
                                fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif'
                              }}
                              initial={{ opacity: 0, x: -30 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ 
                                delay: 0.4, 
                                duration: 0.5,
                                ease: "easeOut"
                              }}
                            >
                              {competitor.description}
                            </motion.p>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )})}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Half-Height Footer - Below right navbar in z-axis */}
      <div className="relative z-[40] w-full bg-black text-white py-6 px-16 flex justify-between items-center">
        <div>
          <div className="transition-colors duration-300 hover:text-yellow-400 cursor-pointer">
            <AnimatedText
              text="Contact: Phil Smith — ptsmith@owu.edu"
              className="font-black uppercase text-base tracking-wider"
              style={{ 
                fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                fontWeight: '900',
                letterSpacing: '0.1em',
                color: '#FFFFFF'
              }}
            />
          </div>
          <div className="mt-2 opacity-70 transition-colors duration-300 hover:text-cyan-400 cursor-pointer">
            <AnimatedText
              text="© 2024 United States Entrepreneurial Competition"
              className="text-sm font-black uppercase tracking-wider"
              style={{ 
                fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                fontWeight: '900',
                letterSpacing: '0.08em',
                color: '#FFFFFF'
              }}
            />
          </div>
        </div>
        <div className="text-right transition-colors duration-300 hover:text-green-400 cursor-pointer">
          <AnimatedText
            text="Built with precision by USEC Studio"
            className="text-base tracking-wider font-black uppercase"
            style={{ 
              fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
              fontWeight: '900',
              letterSpacing: '0.1em',
              color: '#FFFFFF'
            }}
          />
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedCard && (
          <motion.div
            className="fixed inset-0 bg-black/80 z-[100] flex items-center justify-center p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCard(null)}
          >
            <motion.div
              className="bg-white max-w-2xl w-full max-h-[80vh] overflow-y-auto rounded-xl relative"
              initial={{ scale: 0.8, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedCard(null)}
                className="absolute top-4 right-4 p-2 hover:bg-red-100 rounded-full transition-colors z-10"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="p-8">
                <div className="mb-6">
                  <div 
                    className="w-full h-32 mb-6 border-4 border-black flex items-center justify-center"
                    style={{ backgroundColor: selectedCard.color }}
                  >
                    <h3 className={`text-3xl font-sans font-bold text-center ${selectedCard.textColor === 'white' ? 'text-white' : 'text-black'}`}>
                      {selectedCard.title}
                    </h3>
                  </div>
                  <p className="text-xl font-sans text-black mb-4">{selectedCard.subtitle}</p>
                  <span className={`inline-block px-3 py-1 text-xs font-sans font-bold uppercase tracking-widest rounded-full ${
                    selectedCard.type === 'student' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {selectedCard.type}
                  </span>
                </div>
                
                <div className="prose max-w-none">
                  <p className="text-black leading-relaxed font-sans text-lg">
                    {selectedCard.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
} 