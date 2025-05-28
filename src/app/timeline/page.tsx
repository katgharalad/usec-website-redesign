"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { RightNavbar } from "@/components/ui/right-navbar"
import { PixelTrail } from "@/components/ui/pixel-trail"
import { GooeyFilter } from "@/components/ui/gooey-filter"
import { useScreenSize } from "@/hooks/use-screen-size"
import { AnimatedText } from "@/components/ui/animated-text"

interface TimelineEvent {
  id: string
  date: string
  title: string
  description: string
  type: "deadline" | "event" | "milestone"
  status: "upcoming" | "current" | "completed"
}

const timelineData: TimelineEvent[] = [
  {
    id: "registration-open",
    date: "January 15, 2025",
    title: "Registration Opens",
    description: "Applications for USEC 2025 become available. Start preparing your pitch deck and business plan.",
    type: "milestone",
    status: "completed"
  },
  {
    id: "early-bird",
    date: "February 28, 2025",
    title: "Early Bird Deadline",
    description: "Submit your application early for priority review and feedback opportunities.",
    type: "deadline",
    status: "upcoming"
  },
  {
    id: "workshops",
    date: "March 15, 2025",
    title: "Entrepreneur Workshops",
    description: "Free workshops on pitch development, business modeling, and investor relations.",
    type: "event",
    status: "upcoming"
  },
  {
    id: "final-deadline",
    date: "April 30, 2025",
    title: "Final Application Deadline",
    description: "Last chance to submit your application for USEC 2025. No extensions will be granted.",
    type: "deadline",
    status: "upcoming"
  },
  {
    id: "semifinals",
    date: "June 15, 2025",
    title: "Semifinal Presentations",
    description: "Top 20 teams present to judges panel. Virtual and in-person options available.",
    type: "event",
    status: "upcoming"
  },
  {
    id: "finals",
    date: "October 12, 2025",
    title: "Final Competition",
    description: "Top 8 teams compete for the $100K grand prize at Ohio Wesleyan University.",
    type: "event",
    status: "upcoming"
  }
]

// Timeline Event Component - Vibrant Brutalist Cards
function TimelineEventCard({ event, index }: { event: TimelineEvent; index: number }) {
  const [isHovered, setIsHovered] = useState(false)

  // Vibrant background colors and styling based on event type
  const getEventStyles = (type: string, status: string) => {
    if (status === "completed") {
      return {
        bgColor: "#6B7280",
        hoverBg: "#374151",
        textColor: "#FFFFFF",
        tagBg: "#1F2937"
      }
    }
    
    switch (type) {
      case "deadline":
        return {
          bgColor: "#EF4444", // bg-red-500
          hoverBg: "#DC2626",
          textColor: "#FFFFFF",
          tagBg: "#991B1B"
        }
      case "event":
        return {
          bgColor: "#8B5CF6", // bg-purple-500
          hoverBg: "#7C3AED",
          textColor: "#FFFFFF",
          tagBg: "#5B21B6"
        }
      case "milestone":
        return {
          bgColor: "#10B981", // bg-emerald-500
          hoverBg: "#059669",
          textColor: "#FFFFFF",
          tagBg: "#047857"
        }
      default:
        return {
          bgColor: "#F59E0B", // bg-amber-500
          hoverBg: "#D97706",
          textColor: "#FFFFFF",
          tagBg: "#92400E"
        }
    }
  }

  const styles = getEventStyles(event.type, event.status)
  
  // Parse date for better display
  const dateObj = new Date(event.date)
  const month = dateObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
  const day = dateObj.getDate()
  const year = dateObj.getFullYear()

  // Alternating vibrant backgrounds
  const vibrantBgs = ['bg-lime-400', 'bg-pink-500', 'bg-purple-500', 'bg-cyan-400', 'bg-orange-500', 'bg-emerald-400']
  const cardBg = vibrantBgs[index % vibrantBgs.length]

  return (
    <motion.div
      className="group w-full mb-4"
      initial={{ y: 40, opacity: 0, x: -20 }}
      whileInView={{ y: 0, opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-5%" }}
      transition={{ 
        duration: 0.5, 
        ease: "easeOut",
        delay: index * 0.08
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div 
        className={`${cardBg} border-2 border-black relative overflow-hidden`}
        animate={{
          scale: isHovered ? 1.01 : 1,
          y: isHovered ? -4 : 0,
          x: isHovered ? 4 : 0,
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        style={{
          boxShadow: isHovered ? 
            "0 15px 30px -5px rgba(0, 0, 0, 0.2)" : 
            "0 2px 4px rgba(0, 0, 0, 0.05)"
        }}
      >
        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-black z-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 0.1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        <div className="relative z-10 p-5">
          {/* Header with date and status */}
          <div className="flex justify-between items-start mb-3">
            {/* Date block */}
            <div className="flex items-center space-x-3">
              <div className="bg-black text-white px-3 py-2 border-2 border-black">
                <div 
                  className="font-black uppercase text-xs tracking-wider"
                  style={{ 
                    fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif'
                  }}
                >
                  {month}
                </div>
                <div 
                  className="font-black text-xl leading-none"
                  style={{ 
                    fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif'
                  }}
                >
                  {day}
                </div>
                <div 
                  className="font-bold text-xs opacity-80"
                  style={{ 
                    fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif'
                  }}
                >
                  {year}
                </div>
              </div>
              
              {/* Type tag */}
              <motion.div 
                className="rounded-md px-2 py-1 text-xs font-black uppercase tracking-wider text-white border-2 border-black"
                style={{ backgroundColor: styles.tagBg }}
                animate={{
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{ duration: 0.25 }}
              >
                {event.type}
              </motion.div>
            </div>
            
            {/* Status badge */}
            <motion.div 
              className={`rounded-md px-2 py-1 text-xs font-black uppercase border-2 border-black relative ${
                event.status === "completed" ? "bg-gray-200 text-gray-700" :
                event.status === "current" ? "bg-yellow-400 text-black" :
                "bg-white text-black"
              }`}
              style={{ 
                fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif'
              }}
              animate={{
                scale: isHovered ? 1.05 : 1,
                rotate: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.25 }}
            >
              {event.status}
              {event.status === "upcoming" && (
                <motion.div
                  className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </motion.div>
          </div>

          {/* Title */}
          <motion.h3 
            className="font-black uppercase text-black mb-2 leading-tight"
            style={{ 
              fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
              fontWeight: '900',
              fontSize: 'clamp(1.1rem, 1.8vw, 1.5rem)'
            }}
            animate={{
              scale: isHovered ? 1.01 : 1,
            }}
            transition={{ duration: 0.25 }}
          >
            {event.title}
            
            {/* Animated underline */}
            <motion.div
              className="h-0.5 bg-black mt-1"
              initial={{ width: 0 }}
              animate={{ width: isHovered ? '100%' : '40px' }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </motion.h3>

          {/* Description */}
          <motion.p 
            className="text-black font-bold leading-relaxed opacity-85"
            style={{ 
              fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
              fontWeight: '700',
              fontSize: 'clamp(0.85rem, 1.1vw, 1rem)',
              lineHeight: '1.5'
            }}
            animate={{
              opacity: isHovered ? 1 : 0.85,
            }}
            transition={{ duration: 0.25 }}
          >
            {event.description}
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Timeline() {
  const screenSize = useScreenSize()

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      <GooeyFilter id="gooey-filter-timeline" strength={3} />
      
      {/* Right vertical navigation */}
      <RightNavbar />
      
      {/* Scrolling "Apply Now" banner on top */}
      <div className="absolute top-0 left-0 w-full h-6 bg-lime-400 overflow-hidden z-50 border-b border-green-500 marquee-strip">
        <div className="absolute whitespace-nowrap animate-marquee text-black font-semibold tracking-[0.2em] text-xs sm:text-sm uppercase font-mono">
          {Array(12).fill("Apply Now • ").join("")}
        </div>
        <div className="absolute whitespace-nowrap animate-marquee text-black font-semibold tracking-[0.2em] text-xs sm:text-sm uppercase font-mono" style={{ animationDelay: '-9s' }}>
          {Array(12).fill("Apply Now • ").join("")}
        </div>
      </div>

      <div className="flex min-h-screen">
        {/* LEFT PANEL - Static Title with White Background (1/3 width) */}
        <div className="w-1/3 relative z-[15] flex items-end overflow-visible">
          {/* White background */}
          <div className="absolute inset-0 z-0 bg-white"></div>

          {/* Gooey pixel trail overlay */}
          <div
            className="absolute inset-0 z-5"
            style={{ filter: "url(#gooey-filter-timeline)" }}
          >
            <PixelTrail
              pixelSize={screenSize.lessThan(`md`) ? 48 : 64}
              fadeDuration={0}
              delay={500}
              useRandomColors={true}
            />
          </div>
          
          {/* Main Title - Bottom Left, Rotated -90 degrees (bottom to top) */}
          <div className="absolute bottom-12 left-12 bg-white px-6 py-4 -ml-4 z-10">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ 
                transform: 'rotate(-90deg)',
                transformOrigin: 'bottom left',
                writingMode: 'vertical-rl',
                textOrientation: 'mixed'
              }}
            >
              <AnimatedText
                lines={["TIMELINE"]}
                className="font-sans font-black uppercase tracking-tight leading-[0.8]"
                style={{ 
                  fontSize: 'clamp(4rem, 10vw, 10rem)',
                  fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                  color: '#000000',
                  fontWeight: '950',
                  letterSpacing: '-0.03em'
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* RIGHT PANEL - Scrollable Content (2/3 width) */}
        <div className="w-2/3 relative z-20 overflow-y-auto h-screen bg-white">
          <div className="pt-8 pb-32 px-12">
            
            {/* Editorial Header */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 
                className="font-black uppercase text-black mb-4 leading-tight"
                style={{ 
                  fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                  fontWeight: '900',
                  fontSize: 'clamp(1.5rem, 3vw, 2.5rem)'
                }}
              >
                Competition Roadmap
              </h2>
              <div className="w-24 h-1 bg-black mb-4"></div>
              <p 
                className="text-black font-bold leading-relaxed"
                style={{ 
                  fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                  fontWeight: '700',
                  fontSize: 'clamp(1rem, 1.3vw, 1.2rem)',
                  lineHeight: '1.6'
                }}
              >
                From application to grand finale, here&apos;s your complete guide to USEC 2025. 
                Mark these dates, prepare accordingly, and join Ohio&apos;s most prestigious startup competition.
              </p>
            </motion.div>

            {/* Timeline Events - Full Width Layout */}
            <div className="space-y-4">
              {timelineData.map((event, index) => (
                <TimelineEventCard key={event.id} event={event} index={index} />
              ))}
            </div>

            {/* Bottom CTA Section */}
            <motion.div
              className="mt-24 p-8 bg-black text-white border-2 border-black max-w-4xl"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 
                className="font-black uppercase text-white mb-4 leading-tight"
                style={{ 
                  fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                  fontWeight: '900',
                  fontSize: 'clamp(1.3rem, 2.2vw, 2rem)'
                }}
              >
                Ready to compete?
              </h3>
              <p 
                className="text-white/80 font-bold mb-6"
                style={{ 
                  fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                  fontWeight: '700',
                  fontSize: 'clamp(0.9rem, 1.1vw, 1rem)'
                }}
              >
                Don&apos;t wait until the deadline. Start your application today and join Ohio&apos;s next generation of entrepreneurs.
              </p>
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSd8yhrNsOJs_U3W5Eoa-wS-ovuSszLoKsLzhZYmz6MchPVhrg/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-lime-400 text-black px-8 py-4 font-black uppercase tracking-wider border-2 border-white hover:bg-white hover:text-black transition-all duration-300"
                style={{ 
                  fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                  fontWeight: '900'
                }}
              >
                Apply Now
              </a>
            </motion.div>

            {/* Additional spacing at bottom */}
            <div className="h-16"></div>

          </div>
        </div>
      </div>
    </section>
  )
} 