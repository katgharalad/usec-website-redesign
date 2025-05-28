"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { PixelTrail } from "@/components/ui/pixel-trail"
import { GooeyFilter } from "@/components/ui/gooey-filter"
import { useScreenSize } from "@/hooks/use-screen-size"
import { AnimatedText } from "@/components/ui/animated-text"

// Ticket Card Component
function TicketCard() {
  const [isHovered, setIsHovered] = useState(false)

  // Generate realistic barcode pattern
  const generateBarcodePattern = () => {
    const widths = [1, 1, 2, 1, 2, 1, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2]
    return widths
  }
  
  const lines = generateBarcodePattern()
  const totalBarcodeWidth = lines.reduce((sum, width) => sum + width, 0) + (lines.length - 1)
  const padding = 4
  const containerWidth = totalBarcodeWidth + (padding * 2) + 4
  const containerHeight = 20 + (padding * 2)

  return (
    <Link href="/judges">
      <motion.div
        className="relative cursor-pointer"
        style={{ width: '280px', height: '180px' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        initial={{ opacity: 0, scale: 0.85, rotateX: 15 }}
        animate={{ opacity: 1, scale: 1, rotateX: 0 }}
        transition={{ 
          delay: 0.6, 
          duration: 0.8, 
          ease: [0.25, 0.46, 0.45, 0.94],
          type: "spring",
          stiffness: 120,
          damping: 18
        }}
      >
      {/* Main Card */}
      <motion.div
        className="w-full h-full border-2 border-black bg-white relative overflow-hidden"
        animate={{
          scale: isHovered ? 1.06 : 1,
          y: isHovered ? -6 : 0,
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
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" : 
            "none"
        }}
      >
        {/* Color Fill Animation - Top to Bottom */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ backgroundColor: '#00D4FF' }}
          initial={{ y: "-100%" }}
          animate={{
            y: isHovered ? "0%" : "-100%"
          }}
          transition={{ 
            duration: 0.5, 
            ease: [0.25, 0.46, 0.45, 0.94],
            type: "spring",
            stiffness: 200,
            damping: 25
          }}
        />

        {/* Card Content */}
        <div className="relative z-10 p-6 h-full flex flex-col justify-between">
          {/* Top Content */}
          <div>
            <h3 
              className={`text-xl font-black uppercase tracking-tight leading-tight ${
                isHovered ? 'text-white' : 'text-black'
              }`}
              style={{ 
                fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                fontWeight: '900'
              }}
            >
              USEC 2025
            </h3>
            <p 
              className={`text-sm font-bold uppercase tracking-wide mt-2 ${
                isHovered ? 'text-white opacity-90' : 'text-black opacity-70'
              }`}
              style={{ 
                fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                fontWeight: '700'
              }}
            >
              See 2024 Judges
            </p>
          </div>

          {/* Bottom Content */}
          <div className="flex items-end justify-between">
            {/* Punching Hole */}
            <div 
              className="w-3 h-3 rounded-full border-2 border-black"
              style={{
                backgroundColor: isHovered ? '#FFFFFF' : 'transparent'
              }}
            />
            
            {/* Barcode */}
            <div 
              className="bg-white border border-black flex items-center justify-center"
              style={{ 
                width: `${containerWidth}px`,
                height: `${containerHeight}px`,
                padding: `${padding}px`
              }}
            >
              <div 
                className="flex items-end justify-center gap-px" 
                style={{ 
                  width: `${totalBarcodeWidth}px`,
                  height: '16px'
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
          </div>
        </div>
      </motion.div>
    </motion.div>
    </Link>
  )
}

interface RuleCard {
  id: string
  title: string
  summary: string
  details: string[]
}

const rulesData: RuleCard[] = [
  {
    id: "registration",
    title: "REGISTRATION",
    summary: "Open July 1 → Sept 1. Must confirm by Sept 9. Must attend Sept 26.",
    details: [
      "Applications open July 1, 2025 and close September 1, 2025",
      "All teams must confirm attendance by September 9, 2025",
      "Must attend September 26 pitch event in person to qualify for prizes",
      "Late submissions will not be accepted under any circumstances",
      "Registration is completely free for all participants"
    ]
  },
  {
    id: "team-requirements",
    title: "TEAM REQUIREMENTS",
    summary: "Students: 2+ members, enrolled or recent grads. Professionals: open team size.",
    details: [
      "Student category: Minimum 2 team members, maximum 5 members",
      "Must be currently enrolled or graduated within last 2 years",
      "Professional category: 1-5 team members allowed",
      "All team members must be 18+ years of age",
      "International students at US institutions are eligible",
      "Team composition cannot change after registration deadline"
    ]
  },
  {
    id: "pitch-format",
    title: "PITCH FORMAT",
    summary: "10-minute live pitch + Q&A. 60-second elevator pitch also judged separately.",
    details: [
      "10-minute presentation followed by 5-minute Q&A session",
      "60-second elevator pitch competition (separate judging)",
      "PowerPoint, Keynote, or PDF slides accepted",
      "Maximum 15 slides for main presentation",
      "No props or physical demonstrations allowed",
      "Technical setup provided: microphone, projector, remote"
    ]
  },
  {
    id: "submission-rules",
    title: "SUBMISSION RULES",
    summary: "Submit one original business plan. Include logo, summary, social handles.",
    details: [
      "Complete business plan (maximum 20 pages)",
      "Executive summary (2 pages maximum)",
      "Financial projections (3-year minimum)",
      "Company logo and branding materials",
      "Social media handles and website (if applicable)",
      "Team member bios and photos",
      "All submissions must be original work"
    ]
  },
  {
    id: "disqualification",
    title: "DISQUALIFICATION",
    summary: "False info or plagiarism = instant disqualification.",
    details: [
      "Providing false information on any application materials",
      "Plagiarism or copyright infringement in business plan",
      "Missing the pitch presentation without 48-hour notice",
      "Inappropriate conduct during competition events",
      "Violation of confidentiality agreements",
      "Business revenue exceeding $1 million annually"
    ]
  },
  {
    id: "finalists-prizes",
    title: "FINALISTS & PRIZES",
    summary: "Winners announced Sept 26. Prizes awarded Oct 5 at Homecoming.",
    details: [
      "10 finalists selected: 5 Professional, 5 Student category",
      "Grand Prize: $100,000 in funding + mentorship",
      "Second Place: $25,000 + networking opportunities",
      "Third Place: $10,000 + incubator access",
      "People's Choice Award: $5,000",
      "All finalists receive USEC alumni network access"
    ]
  },
  {
    id: "business-plan-structure",
    title: "BUSINESS PLAN STRUCTURE",
    summary: "Recommended sections: Executive Summary, Market Analysis, Financials…",
    details: [
      "Executive Summary (problem, solution, market opportunity)",
      "Market Analysis & Competition Assessment",
      "Business Model & Revenue Streams",
      "Financial Projections & Funding Requirements",
      "Marketing & Sales Strategy",
      "Operations Plan & Team Structure",
      "Risk Assessment & Mitigation Strategies"
    ]
  }
]

export function RulesFAQSection() {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const screenSize = useScreenSize()

  const handleMouseEnter = (cardId: string) => {
    setHoveredCard(cardId)
    setExpandedCard(cardId)
  }

  const handleMouseLeave = () => {
    setHoveredCard(null)
    setExpandedCard(null)
  }

  return (
    <section className="relative min-h-responsive-screen bg-white overflow-hidden">
      <GooeyFilter id="gooey-filter-rules" strength={3} />

      <div className="flex min-h-responsive-screen lg:flex-row flex-col px-responsive py-responsive">
        {/* LEFT PANEL - Static Title with White Background */}
        <div className="lg:w-1/2 w-full relative z-[15] flex items-end overflow-visible lg:min-h-screen min-h-[30vh]">
          {/* White background */}
          <div className="absolute inset-0 z-0 bg-white"></div>

          {/* Gooey pixel trail overlay */}
          <div
            className="absolute inset-0 z-5"
            style={{ filter: "url(#gooey-filter-rules)" }}
          >
            <PixelTrail
              pixelSize={screenSize.lessThan(`md`) ? 48 : 64}
              fadeDuration={0}
              delay={500}
              useRandomColors={true}
            />
          </div>

          {/* Ticket Card - Top Left Corner */}
          <div className="absolute z-10" style={{ 
            top: 'clamp(1rem, 3vw, 2rem)', 
            left: 'clamp(1rem, 3vw, 3rem)' 
          }}>
            <TicketCard />
          </div>
          
          {/* Main Title - Bottom */}
          <div className="absolute bg-white px-responsive-sm py-responsive-sm z-10" style={{ 
            bottom: 'clamp(1rem, 3vw, 2rem)', 
            left: 'clamp(1rem, 3vw, 3rem)' 
          }}>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <AnimatedText
                lines={["RULES", "& FAQ"]}
                className="font-sans font-black uppercase tracking-tight leading-[0.85] text-responsive-8xl"
                style={{ 
                  fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                  color: '#000000'
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* RIGHT PANEL - Scrollable Content */}
        <div className="lg:w-1/2 w-full relative z-20 overflow-y-auto lg:h-screen h-auto bg-white">
          <div className="py-responsive-lg px-responsive-lg">
            
            {/* Rules Cards */}
            <div className="flex flex-col gap-responsive">
              {rulesData.map((rule, index) => {
                const colors = [
                  { bg: "#00FF88", text: "black", expanded: "#00D466" }, // acid green
                  { bg: "#F72585", text: "white", expanded: "#E01A75" }, // neon magenta
                  { bg: "#00D4FF", text: "black", expanded: "#00B8E6" }, // electric blue
                  { bg: "#0F0F0F", text: "white", expanded: "#2A2A2A" }, // black base
                  { bg: "#161616", text: "white", expanded: "#3A3A3A" }, // charcoal
                  { bg: "#00FF88", text: "black", expanded: "#00D466" }, // acid green
                  { bg: "#F72585", text: "white", expanded: "#E01A75" }, // neon magenta
                ]
                const cardColor = colors[index % colors.length]
                
                return (
                  <motion.div
                    key={rule.id}
                    id={`rule-${rule.id}`}
                    className="border-t border-gray-300 first:border-t-0 last:border-b last:border-gray-300 group"
                    initial={{ opacity: 0, y: 60, scale: 0.95, rotateX: 8 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
                    viewport={{ once: true, margin: "-15%" }}
                    onMouseEnter={() => handleMouseEnter(rule.id)}
                    onMouseLeave={handleMouseLeave}
                    animate={{
                      scale: hoveredCard === rule.id ? 1.03 : 1,
                      y: hoveredCard === rule.id ? -12 : 0,
                      zIndex: hoveredCard === rule.id ? 10 : 1,
                      rotateY: hoveredCard === rule.id ? 1 : 0,
                      opacity: 1
                    }}
                    transition={{ 
                      opacity: { delay: index * 0.18, duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] },
                      scale: { type: "spring", stiffness: 400, damping: 30, mass: 0.7 },
                      y: { type: "spring", stiffness: 400, damping: 30, mass: 0.7 },
                      rotateY: { type: "spring", stiffness: 300, damping: 25 },
                      zIndex: { duration: 0.1 }
                    }}
                    style={{
                      boxShadow: hoveredCard === rule.id ? 
                        "0 25px 35px -5px rgba(0, 0, 0, 0.15), 0 15px 15px -5px rgba(0, 0, 0, 0.08)" : 
                        "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                    }}
                  >
                    {/* Card Header */}
                    <motion.div 
                      className="py-responsive px-responsive-sm cursor-pointer relative overflow-hidden"
                      style={{
                        color: hoveredCard === rule.id ? cardColor.text : "#000000"
                      }}
                      animate={{
                        borderWidth: hoveredCard === rule.id ? "2px" : "0px",
                        borderColor: "#000000",
                        borderStyle: "solid",
                        marginBottom: hoveredCard === rule.id ? "8px" : "0px"
                      }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      {/* Loading Background Animation - Smooth Slide */}
                      <motion.div
                        className="absolute inset-0 z-0"
                        style={{ backgroundColor: cardColor.bg }}
                        initial={{ x: "-100%", opacity: 0.9 }}
                        animate={{
                          x: hoveredCard === rule.id ? "0%" : "-100%",
                          opacity: hoveredCard === rule.id ? 1 : 0.9
                        }}
                        transition={{ 
                          duration: 0.6, 
                          ease: [0.25, 0.46, 0.45, 0.94],
                          type: "spring",
                          stiffness: 200,
                          damping: 25
                        }}
                      />
                      
                      {/* Card Content */}
                      <div className="relative z-10">
                        <div className="flex items-start justify-between">
                          <div className="flex-1 grid grid-cols-5 gap-responsive items-start">
                            {/* Left: Bold Number/Title */}
                            <div className="col-span-2">
                              <h3 
                                className="font-black uppercase tracking-tight leading-[1.1] text-responsive-3xl"
                                style={{ 
                                  fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                                  color: hoveredCard === rule.id ? cardColor.text : "#000000"
                                }}
                              >
                                <span 
                                  className="font-mono mr-3 text-responsive-lg"
                                  style={{ 
                                    color: hoveredCard === rule.id ? 
                                      (cardColor.text === "white" ? "rgba(255,255,255,0.7)" : "rgba(0,0,0,0.5)") : 
                                      "#9CA3AF" 
                                  }}
                                >
                                  {String(index + 1).padStart(2, '0')}
                                </span>
                                <br />
                                {rule.title}
                              </h3>
                            </div>
                            
                            {/* Right: Stacked Summary */}
                            <div className="col-span-3">
                              <motion.div
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.2 }}
                              >
                                <p 
                                  className="font-black leading-tight mb-responsive-sm uppercase tracking-wide text-responsive-lg"
                                  style={{ 
                                    color: hoveredCard === rule.id ? cardColor.text : "#000000",
                                    fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                                    fontWeight: '900'
                                  }}
                                >
                                  {rule.summary.split('.')[0]}.
                                </p>
                                <p 
                                  className="font-bold uppercase tracking-wider text-responsive-sm"
                                  style={{ 
                                    color: hoveredCard === rule.id ? 
                                      (cardColor.text === "white" ? "rgba(255,255,255,0.9)" : "rgba(0,0,0,0.8)") : 
                                      "#000000",
                                    fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                                    fontWeight: '700',
                                    opacity: '0.85'
                                  }}
                                >
                                  {rule.summary.split('.').slice(1).join('.').trim()}
                                </p>
                              </motion.div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                  {/* Expandable Details */}
                  <AnimatePresence>
                    {expandedCard === rule.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <motion.div 
                          className="py-responsive px-responsive"
                          style={{
                            background: `linear-gradient(135deg, ${cardColor.expanded}, ${cardColor.bg})`,
                            color: cardColor.text,
                            border: "2px solid #000000",
                            borderTop: "2px solid #000000"
                          }}
                          initial={{ y: 20, opacity: 0, scale: 0.98 }}
                          animate={{ y: 0, opacity: 1, scale: 1 }}
                          transition={{ delay: 0.2, duration: 0.4, ease: "easeOut" }}
                        >
                          <div className="container-responsive">
                            <motion.h4 
                              className="font-black mb-responsive uppercase tracking-wider text-responsive-xl"
                              style={{ 
                                color: cardColor.text,
                                fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                                fontWeight: '900'
                              }}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.3, duration: 0.3 }}
                            >
                              Detailed Requirements
                            </motion.h4>
                            <ul className="space-y-4">
                              {rule.details.map((detail, detailIndex) => (
                                <motion.li
                                  key={detailIndex}
                                  className="font-bold leading-relaxed flex items-start text-responsive-base"
                                  style={{ 
                                    color: cardColor.text,
                                    fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                                    fontWeight: '700'
                                  }}
                                  initial={{ opacity: 0, x: -30 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ 
                                    delay: 0.4 + (detailIndex * 0.08), 
                                    duration: 0.5,
                                    ease: "easeOut"
                                  }}
                                >
                                  <motion.span 
                                    className="inline-block w-3 h-3 rounded-full mr-6 mt-2 flex-shrink-0"
                                    style={{ backgroundColor: cardColor.text }}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ 
                                      delay: 0.5 + (detailIndex * 0.08), 
                                      duration: 0.3,
                                      ease: "easeOut"
                                    }}
                                  />
                                  <span className="font-bold">{detail}</span>
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
                )
              })}
            </div>

            {/* Contact Footer */}
            <div className="mt-responsive-lg pt-responsive border-t-4 border-black">
              <div className="text-center">
                <div className="mb-responsive">
                  <AnimatedText
                    text="Questions? Contact Us"
                    className="font-black uppercase tracking-wider text-responsive-2xl"
                    style={{ 
                      fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                      fontWeight: '900',
                      color: '#000000'
                    }}
                  />
                </div>
                <a 
                  href="mailto:ptsmith@owu.edu"
                  className="inline-flex items-center px-responsive py-responsive bg-black text-white font-black uppercase tracking-wider border-2 border-black hover:bg-white hover:text-black transition-all duration-300 transform hover:scale-105 text-responsive-base"
                  style={{ 
                    fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                    fontWeight: '900',
                    letterSpacing: '0.1em'
                  }}
                >
                  ptsmith@owu.edu
                </a>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
} 