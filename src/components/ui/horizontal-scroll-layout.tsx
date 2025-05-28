"use client"

import { useRef, useEffect, useState } from "react"
import { motion } from "framer-motion"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

// Import the existing page components
import { GooeyDemo } from "@/components/ui/gooey-demo"
import { RightNavbar } from "@/components/ui/right-navbar"
import { Competitors2024 } from "@/components/ui/competitors-2024"
import { TimelineSection } from "@/components/ui/timeline-section"
import { RulesFAQSection } from "@/components/ui/rules-faq-section"

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger)
}

interface ScrollIndicatorProps {
  currentSection: number
  totalSections: number
}

function ScrollIndicator({ currentSection, totalSections }: ScrollIndicatorProps) {
  return (
    <div className="fixed right-responsive top-1/2 transform -translate-y-1/2 z-[100] flex flex-col items-center gap-responsive-sm">
      {Array.from({ length: totalSections }, (_, i) => (
        <div
          key={i}
          className={`w-2 h-2 rounded-full border border-white transition-all duration-300 ${
            i === currentSection ? 'bg-white scale-125' : 'bg-transparent'
          }`}
        />
      ))}
    </div>
  )
}

function ScrollInstructions() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  if (!isVisible) return null

  return (
    <motion.div
      className="fixed bottom-responsive left-responsive z-[100] bg-black/80 text-white px-responsive-sm py-responsive-sm rounded-lg backdrop-blur-sm"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center gap-responsive-sm text-responsive-sm">
        <span>Scroll horizontally</span>
        <div className="flex gap-1">
          <div className="w-4 h-4 border border-white/50 rounded flex items-center justify-center text-xs">←</div>
          <div className="w-4 h-4 border border-white/50 rounded flex items-center justify-center text-xs">→</div>
        </div>
      </div>
    </motion.div>
  )
}

export function HorizontalScrollLayout() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sectionsRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)

  // Prevent body scroll conflicts
  useEffect(() => {
    document.body.style.overflow = 'auto'
    document.body.style.maxWidth = '100vw'
    document.body.style.overflowX = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
      document.body.style.maxWidth = '100vw'
      document.body.style.overflowX = 'hidden'
    }
  }, [])

  useEffect(() => {
    if (!containerRef.current || !sectionsRef.current) return

    // GSAP ScrollTrigger setup for horizontal scrolling (without Lenis to avoid conflicts)
    const sections = Array.from(sectionsRef.current.children) as HTMLElement[]
    const totalWidth = sections.length * window.innerWidth

    // Set up horizontal scroll animation with faster, more responsive settings
    const scrollTween = gsap.to(sections, {
      xPercent: -100 * (sections.length - 1),
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        pin: true,
        scrub: 0.3, // Much faster response to scroll input (was 0.8)
        snap: {
          snapTo: 1 / (sections.length - 1),
          duration: { min: 0.15, max: 0.4 }, // Faster snap transitions (was 0.3-0.8)
          delay: 0.05, // Almost immediate snapping (was 0.2)
          ease: "power2.out" // Snappier easing (was power2.inOut)
        },
        end: () => `+=${totalWidth}`,
        onUpdate: (self: ScrollTrigger) => {
          const progress = self.progress
          const newSection = Math.round(progress * (sections.length - 1))
          if (newSection !== currentSection) {
            setCurrentSection(newSection)
          }
        },
        invalidateOnRefresh: true,
      },
    })

    // Add enhanced text animations for each section with specific targeting
    sections.forEach((section, index) => {
      // Enhanced text animations for sections 2, 3, 4 (index 1, 2, 3)
      if (index > 0) {
        // Define subtle directions for each text element - reduced intensity
        const specificAnimations = [
          { name: 'up', y: 30, x: 0 },      // Direction 0: slides down from above
          { name: 'down', y: -30, x: 0 },   // Direction 1: slides up from below  
          { name: 'left', y: 0, x: 30 },    // Direction 2: slides in from right
          { name: 'right', y: 0, x: -30 }   // Direction 3: slides in from left
        ]
        
        if (index === 1) { // Timeline section
          // Target "TIMELINE" - keep current working animation (approved)
          const timelineElements = Array.from(section.querySelectorAll('*')).filter(el => 
            el.textContent?.trim() === 'TIMELINE' && 
            el.tagName !== 'TITLE'
          )
          
          timelineElements.forEach((element) => {
            gsap.fromTo(element, 
              {
                opacity: 0,
                y: 30,
                x: 0,
                scale: 0.95,
                rotation: 0
              },
              {
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
                rotation: 0,
                duration: 1.0,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: section,
                  start: "left 90%",
                  end: "left 10%",
                  scrub: 1.0, // Smooth scrub like hero section
                  containerAnimation: scrollTween,
                }
              }
            )
          })
          
          // Target "Competition Roadmap" → Direction 2 (Left: slides in from right)
          let roadmapElements = Array.from(section.querySelectorAll('*')).filter(el => 
            el.textContent?.includes('Competition Roadmap') && 
            el.tagName !== 'TITLE'
          )
          // Fallback: try broader search
          if (roadmapElements.length === 0) {
            roadmapElements = Array.from(section.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div')).filter(el => 
              el.textContent?.includes('Competition') || el.textContent?.includes('Roadmap')
            )
          }

          
          roadmapElements.forEach((element) => {
            const direction = specificAnimations[2] // Direction 2: left (slides in from right)
            gsap.fromTo(element, 
              {
                opacity: 0,
                y: direction.y,
                x: direction.x,
                scale: 0.95,
                rotation: 0
              },
              {
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
                rotation: 0,
                duration: 1.0,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: section,
                  start: "left 85%",
                  end: "left 15%",
                  scrub: 1.0,
                  containerAnimation: scrollTween,
                }
              }
            )
          })
          
        } else if (index === 2) { // Rules & FAQ section
          // Target "RULES & FAQ" → Direction 1 (Down: slides up from below)
          let rulesElements = Array.from(section.querySelectorAll('*')).filter(el => 
            (el.textContent?.includes('RULES') || el.textContent?.includes('FAQ')) && 
            el.tagName !== 'TITLE'
          )
          // Fallback: try broader search
          if (rulesElements.length === 0) {
            rulesElements = Array.from(section.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div')).filter(el => 
              el.textContent?.includes('RULES') || el.textContent?.includes('FAQ')
            )
          }

          
          rulesElements.forEach((element) => {
            const direction = specificAnimations[1] // Direction 1: down (slides up from below)
            gsap.fromTo(element, 
              {
                opacity: 0,
                y: direction.y,
                x: direction.x,
                scale: 0.95,
                rotation: 0
              },
              {
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
                rotation: 0,
                duration: 1.0,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: section,
                  start: "left 90%",
                  end: "left 10%",
                  scrub: 1.0,
                  containerAnimation: scrollTween,
                }
              }
            )
          })
          
        } else if (index === 3) { // 2024 Competitors section
          // Target the specific "2024 COMPETITORS" text in the fixed overlay
          // Look for the exact structure: fixed bottom-8 div with -rotate-90 transform
          let competitorsElements = Array.from(section.querySelectorAll('.fixed.bottom-8 .transform.-rotate-90 *')).filter(el => 
            (el.textContent?.includes('2024') || el.textContent?.includes('COMPETITORS')) && 
            el.tagName !== 'TITLE'
          )
          
          // Fallback: broader search for the AnimatedText lines
          if (competitorsElements.length === 0) {
            competitorsElements = Array.from(section.querySelectorAll('*')).filter(el => 
              (el.textContent?.trim() === '2024' || el.textContent?.trim() === 'COMPETITORS') &&
              el.tagName !== 'TITLE'
            )
          }

          
          competitorsElements.forEach((element) => {
            const direction = specificAnimations[2] // Direction 2: left (slides in from right)
            gsap.fromTo(element, 
              {
                opacity: 0,
                y: direction.y,
                x: direction.x,
                scale: 0.95,
                rotation: 0
              },
              {
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
                rotation: 0,
                duration: 1.0,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: section,
                  start: "left 90%",
                  end: "left 10%",
                  scrub: 1.0,
                  containerAnimation: scrollTween,
                }
              }
            )
          })
          
          // Target "PROFESSIONAL" → Direction 3 (Right: slides in from left)
          let professionalElements = Array.from(section.querySelectorAll('*')).filter(el => 
            el.textContent?.trim() === 'PROFESSIONAL' && 
            el.tagName !== 'TITLE'
          )
          // Fallback: try broader search
          if (professionalElements.length === 0) {
            professionalElements = Array.from(section.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div')).filter(el => 
              el.textContent?.includes('PROFESSIONAL')
            )
          }

          
          professionalElements.forEach((element) => {
            const direction = specificAnimations[3] // Direction 3: right (slides in from left)
            gsap.fromTo(element, 
              {
                opacity: 0,
                y: direction.y,
                x: direction.x,
                scale: 0.95,
                rotation: 0
              },
              {
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
                rotation: 0,
                duration: 1.0,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: section,
                  start: "left 85%",
                  end: "left 15%",
                  scrub: 1.0,
                  containerAnimation: scrollTween,
                }
              }
            )
          })
          
          // Target "STUDENT" → Direction 0 (Up: slides down from above)
          let studentElements = Array.from(section.querySelectorAll('*')).filter(el => 
            el.textContent?.trim() === 'STUDENT' && 
            el.tagName !== 'TITLE'
          )
          // Fallback: try broader search
          if (studentElements.length === 0) {
            studentElements = Array.from(section.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span, div')).filter(el => 
              el.textContent?.includes('STUDENT')
            )
          }

          
          studentElements.forEach((element) => {
            const direction = specificAnimations[0] // Direction 0: up (slides down from above)
            gsap.fromTo(element, 
              {
                opacity: 0,
                y: direction.y,
                x: direction.x,
                scale: 0.95,
                rotation: 0
              },
              {
                opacity: 1,
                y: 0,
                x: 0,
                scale: 1,
                rotation: 0,
                duration: 1.0,
                ease: "power2.out",
                scrollTrigger: {
                  trigger: section,
                  start: "left 85%",
                  end: "left 15%",
                  scrub: 1.0,
                  containerAnimation: scrollTween,
                }
              }
            )
          })
        }
      }

      // Section entrance animation - no opacity changes, keep sections bright
      gsap.fromTo(section,
        {
          scale: 0.98,
          rotateY: 2
        },
        {
          scale: 1,
          rotateY: 0,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "left 85%",
            end: "left 15%",
            scrub: 0.5,
            containerAnimation: scrollTween,
          }
        }
      )

      // Section exit animation - no opacity changes, keep sections bright
      gsap.to(section, {
        scale: 0.995,
        rotateY: -1,
        scrollTrigger: {
          trigger: section,
          start: "right 85%",
          end: "right 15%",
          scrub: 0.5,
          containerAnimation: scrollTween,
        }
      })
    })

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [currentSection])

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" && currentSection < 3) {
        const nextSection = currentSection + 1
        const scrollDistance = nextSection * window.innerHeight
        window.scrollTo({ top: scrollDistance, behavior: 'smooth' })
      } else if (e.key === "ArrowLeft" && currentSection > 0) {
        const prevSection = currentSection - 1
        const scrollDistance = prevSection * window.innerHeight
        window.scrollTo({ top: scrollDistance, behavior: 'smooth' })
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSection])

  return (
    <>
      {/* Apply Now Banner */}
      <div className="fixed top-0 left-0 w-full h-[clamp(1.2rem,1.8vw,1.8rem)] bg-lime-400 overflow-hidden z-50 border-b border-green-500 marquee-strip">
        <div className="absolute whitespace-nowrap animate-marquee text-black font-semibold tracking-[0.2em] text-responsive-xs uppercase font-mono">
          {Array(12).fill("Apply Now • ").join("")}
        </div>
        <div className="absolute whitespace-nowrap animate-marquee text-black font-semibold tracking-[0.2em] text-responsive-xs uppercase font-mono" style={{ animationDelay: '-9s' }}>
          {Array(12).fill("Apply Now • ").join("")}
        </div>
      </div>

      {/* Right Navigation */}
      <RightNavbar />

      {/* Scroll Instructions */}
      <ScrollInstructions />

      {/* Page Indicator */}
      <ScrollIndicator currentSection={currentSection} totalSections={4} />

      {/* Main Horizontal Scroll Container */}
      <div 
        ref={containerRef}
        className="relative w-full h-responsive-screen overflow-hidden safe-width"
        style={{ height: "100vh", maxWidth: "100vw", overflowX: "hidden" }}
      >
        <div 
          ref={sectionsRef}
          className="flex w-[400vw] h-full scroll-smooth"
          style={{
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            maxWidth: '400vw',
            overflowX: 'hidden'
          }}
        >
          {/* Section 1: Hero Landing Page */}
          <section className="w-screen h-full flex-shrink-0 overflow-hidden" style={{ scrollSnapAlign: 'start', maxWidth: '100vw' }}>
            <GooeyDemo />
          </section>

          {/* Section 2: Timeline Page */}
          <section className="w-screen h-full flex-shrink-0 overflow-hidden" style={{ scrollSnapAlign: 'start', maxWidth: '100vw' }}>
            <TimelineSection />
          </section>

          {/* Section 3: Rules & FAQ Page */}
          <section className="w-screen h-full flex-shrink-0 overflow-hidden" style={{ scrollSnapAlign: 'start', maxWidth: '100vw' }}>
            <RulesFAQSection />
          </section>

          {/* Section 4: 2024 Competitors */}
          <section className="w-screen h-full flex-shrink-0 overflow-hidden" style={{ scrollSnapAlign: 'start', maxWidth: '100vw' }}>
            <Competitors2024 />
          </section>
        </div>
      </div>
    </>
  )
} 