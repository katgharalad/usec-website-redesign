"use client"

import { useState } from "react"
import { motion } from "framer-motion"
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
      className="group w-full mb-responsive-sm"
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
        
        <div className="relative z-10 p-responsive">
          {/* Header with date and status */}
          <div className="flex justify-between items-start mb-responsive-sm">
            {/* Date block */}
            <div className="flex items-center gap-responsive-sm">
              <div className="bg-black text-white px-responsive-sm py-responsive-sm border-2 border-black">
                <div 
                  className="font-black uppercase text-responsive-xs tracking-wider"
                  style={{ 
                    fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif'
                  }}
                >
                  {month}
                </div>
                <div 
                  className="font-black text-responsive-xl leading-none"
                  style={{ 
                    fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif'
                  }}
                >
                  {day}
                </div>
                <div 
                  className="font-bold text-responsive-xs opacity-80"
                  style={{ 
                    fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif'
                  }}
                >
                  {year}
                </div>
              </div>
              
              {/* Type tag */}
              <motion.div 
                className="rounded-md px-responsive-sm py-1 text-responsive-xs font-black uppercase tracking-wider text-white border-2 border-black"
                style={{ backgroundColor: styles.tagBg }}
                animate={{
                  scale: isHovered ? 1.05 : 1,
                }}
                transition={{ duration: 0.25 }}
              >
                {event.type}
              </motion.div>
            </div>

            {/* Status indicator */}
            <motion.div
              className={`w-3 h-3 rounded-full border-2 border-black ${
                event.status === 'completed' ? 'bg-green-500' :
                event.status === 'current' ? 'bg-yellow-500' : 'bg-gray-300'
              }`}
              animate={{
                scale: isHovered ? 1.2 : 1,
              }}
              transition={{ duration: 0.25 }}
            />
          </div>

          {/* Title */}
          <motion.h3 
            className="font-black uppercase text-black mb-responsive-sm leading-tight text-responsive-lg"
            style={{ 
              fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
              fontWeight: '900'
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
            className="text-black font-bold leading-relaxed opacity-85 text-responsive-sm"
            style={{ 
              fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
              fontWeight: '700',
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

export function TimelineSection() {
  const screenSize = useScreenSize()

  return (
    <section className="relative min-h-responsive-screen bg-white overflow-hidden">
      <GooeyFilter id="gooey-filter-timeline" strength={3} />

      <div className="flex min-h-responsive-screen lg:flex-row flex-col px-responsive py-responsive">
        {/* LEFT PANEL - Static Title with White Background */}
        <div className="lg:w-1/3 w-full relative z-[15] flex items-end overflow-visible lg:min-h-screen min-h-[30vh]">
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
          <div className="absolute bg-white px-responsive-sm py-responsive-sm z-10" style={{ 
            bottom: 'clamp(1rem, 3vw, 2rem)', 
            left: 'clamp(1rem, 3vw, 3rem)' 
          }}>
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
                className="font-sans font-black uppercase tracking-tight leading-[0.8] text-responsive-8xl"
                style={{ 
                  fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                  color: '#000000',
                  fontWeight: '950',
                  letterSpacing: '-0.03em'
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* RIGHT PANEL - Scrollable Content */}
        <div className="lg:w-2/3 w-full relative z-20 overflow-y-auto lg:h-screen h-auto bg-white">
          <div className="py-responsive-lg px-responsive-lg">
            
            {/* Editorial Header */}
            <motion.div
              className="mb-responsive-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <h2 
                className="font-black uppercase text-black mb-responsive leading-tight text-responsive-4xl"
                style={{ 
                  fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                  fontWeight: '900'
                }}
              >
                Competition Roadmap
              </h2>
              <div className="w-24 h-1 bg-black mb-responsive"></div>
              <p 
                className="text-black font-bold leading-relaxed text-responsive-base"
                style={{ 
                  fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                  fontWeight: '700',
                  lineHeight: '1.6'
                }}
              >
                From application to grand finale, here&apos;s your complete guide to USEC 2025. 
                Mark these dates, prepare accordingly, and join Ohio&apos;s most prestigious startup competition.
              </p>
            </motion.div>

            {/* Timeline Events - Responsive Grid Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-responsive">
              {timelineData.map((event, index) => (
                <TimelineEventCard key={event.id} event={event} index={index} />
              ))}
            </div>

            {/* Bottom CTA Section */}
            <motion.div
              className="mt-responsive-lg p-responsive bg-black text-white border-2 border-black container-responsive"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h3 
                className="font-black uppercase text-white mb-responsive leading-tight text-responsive-2xl"
                style={{ 
                  fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                  fontWeight: '900'
                }}
              >
                Ready to compete?
              </h3>
              <p 
                className="text-white/80 font-bold mb-responsive text-responsive-base"
                style={{ 
                  fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                  fontWeight: '700'
                }}
              >
                Don&apos;t wait until the deadline. Start your application today and join Ohio&apos;s next generation of entrepreneurs.
              </p>
              <a 
                href="https://docs.google.com/forms/d/e/1FAIpQLSd8yhrNsOJs_U3W5Eoa-wS-ovuSszLoKsLzhZYmz6MchPVhrg/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-lime-400 text-black px-responsive py-responsive-sm font-black uppercase tracking-wider border-2 border-white hover:bg-white hover:text-black transition-all duration-300 text-responsive-base"
                style={{ 
                  fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                  fontWeight: '900'
                }}
              >
                Apply Now
              </a>
            </motion.div>

            {/* Additional spacing at bottom */}
            <div className="h-responsive"></div>

          </div>
        </div>
      </div>
    </section>
  )
} 