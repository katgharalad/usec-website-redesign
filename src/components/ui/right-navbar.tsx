"use client"

import { useState, useEffect } from "react"
import { Menu } from "lucide-react"
import Link from "next/link"

export function RightNavbar() {
  const [isOpen, setIsOpen] = useState(false)

  // Prevent body scroll when nav is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    // Cleanup on unmount
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const closeNav = () => setIsOpen(false)
  const openNav = () => setIsOpen(true)

  // Lift hero text and marquee strip when menu opens
  useEffect(() => {
    const heroText = document.querySelector('.hero-main-text') as HTMLElement
    const marqueeStrip = document.querySelector('.marquee-strip') as HTMLElement
    
    if (heroText) {
      if (isOpen) {
        heroText.style.zIndex = '850'
        heroText.style.transform = 'translateZ(50px) scale(1.02)'
        heroText.style.filter = 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
        heroText.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
      } else {
        heroText.style.zIndex = '5'
        heroText.style.transform = 'translateZ(0) scale(1)'
        heroText.style.filter = 'none'
        heroText.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }
    
    if (marqueeStrip) {
      if (isOpen) {
        marqueeStrip.style.zIndex = '850'
        marqueeStrip.style.transform = 'translateZ(50px) scale(1.01)'
        marqueeStrip.style.filter = 'drop-shadow(0 5px 15px rgba(0,0,0,0.2))'
        marqueeStrip.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
      } else {
        marqueeStrip.style.zIndex = '40'
        marqueeStrip.style.transform = 'translateZ(0) scale(1)'
        marqueeStrip.style.filter = 'none'
        marqueeStrip.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
      }
    }
  }, [isOpen])

  return (
    <>
      {/* Always Visible Navigation Bar - Responsive positioning for all desktop sizes */}
      <aside 
        className="fixed top-0 right-0 h-screen w-[clamp(2.5rem,3.5vw,3.5rem)] min-w-[2.5rem] max-w-[3.5rem] z-[60] flex flex-col bg-black text-white font-milker-bold hidden md:flex overflow-visible"
        style={{ overflow: 'visible' }}
      >
        {/* White Square Hamburger Menu Button - Responsive height */}
        <div 
          className="bg-white text-black w-full h-[clamp(2.5rem,3.5vw,3.5rem)] flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
          onMouseEnter={openNav}
        >
          <Menu className="w-[clamp(0.8rem,1.2vw,1.2rem)] h-[clamp(0.8rem,1.2vw,1.2rem)]" strokeWidth={2.5} />
        </div>

        {/* Black area with vertical text and hover zones */}
        <div className="flex-1 bg-black flex flex-col items-center justify-center relative overflow-visible" style={{ padding: 'clamp(0.2rem,0.5vw,0.5rem)', gap: 'clamp(0.3rem,0.6vw,0.6rem)', overflow: 'visible' }}>
          {/* Hover zone above USEC */}
          <div 
            className="absolute top-0 left-0 right-0 h-[clamp(1rem,2vw,1.5rem)] cursor-pointer"
            onMouseEnter={openNav}
          ></div>
          
          {/* Vertical USEC Text - Responsive font size */}
          <Link href="/" className="writing-mode-vertical py-responsive-sm text-responsive-sm tracking-wider cursor-pointer font-black text-white uppercase hover:text-yellow-400 transition-colors">
            USEC
          </Link>
          
          {/* Hover zone between USEC and 2024 */}
          <div 
            className="absolute top-[clamp(3.5rem,7vw,5rem)] left-0 right-0 h-[clamp(0.6rem,1vw,1rem)] cursor-pointer"
            onMouseEnter={openNav}
          ></div>
          
          {/* Additional vertical nav items - Responsive font size */}
          <Link href="/2024" className="writing-mode-vertical py-responsive-sm text-responsive-xs tracking-wider text-white cursor-pointer font-black uppercase hover:text-cyan-400 transition-colors">
            2024
          </Link>
          
          {/* Hover zone between 2024 and Rules */}
          <div 
            className="absolute top-[clamp(5.5rem,11vw,7.5rem)] left-0 right-0 h-[clamp(0.6rem,1vw,1rem)] cursor-pointer"
            onMouseEnter={openNav}
          ></div>
          
          <Link href="/rules-faq" className="writing-mode-vertical py-responsive-sm text-responsive-xs tracking-wider text-white cursor-pointer font-black uppercase hover:text-lime-400 transition-colors">
            Rules & FAQ
          </Link>
          
          {/* Hover zone between Rules and Timeline */}
          <div 
            className="absolute top-[clamp(7.5rem,15vw,10.5rem)] left-0 right-0 h-[clamp(0.6rem,1vw,1rem)] cursor-pointer"
            onMouseEnter={openNav}
          ></div>
          
          <Link href="/timeline" className="writing-mode-vertical py-responsive-sm text-responsive-xs tracking-wider text-white cursor-pointer font-black uppercase hover:text-purple-400 transition-colors">
            Timeline
          </Link>
          
          {/* Hover zone between Timeline and Apply Now */}
          <div 
            className="absolute bottom-[clamp(4rem,8vw,6rem)] left-0 right-0 h-[clamp(1rem,2vw,2rem)] cursor-pointer"
            onMouseEnter={openNav}
          ></div>
        </div>
        
        {/* Contact Us Button - Responsive positioning above Apply Now */}
        <div className="absolute bottom-[clamp(5.5rem,11vw,8rem)] right-0 w-full group" style={{ overflow: 'visible' }}>
          <div className="bg-orange-400 text-black w-full flex items-center justify-center transition-all duration-500 ease-out relative overflow-visible hover:scale-105 hover:shadow-lg transform border-2 border-black z-20"
            style={{ 
              height: 'auto',
              minHeight: 'clamp(2.5rem,3.5vw,3.5rem)',
              padding: 'clamp(0.4rem,0.8vw,0.8rem) clamp(0.2rem,0.4vw,0.4rem)',
              fontWeight: '900',
              overflow: 'visible'
            }}
          >
            <div className="flex flex-col items-center relative z-10 h-full justify-center">
              {/* Main CONTACT US text */}
              <div className="rotate-90 writing-mode-vertical">
                <span 
                  className="font-black uppercase tracking-wider group-hover:text-white transition-colors duration-500"
                  style={{ 
                    fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                    fontWeight: '900',
                    letterSpacing: '0.1em',
                    fontSize: 'clamp(0.6rem, 0.8vw, 0.75rem)'
                  }}
                >
                  CONTACT US
                </span>
              </div>
            </div>
          </div>
          
          {/* Expandable rectangle to the left - positioned to extend beyond navbar */}
          <div 
            className="absolute bg-white border-2 border-black transition-all duration-500 ease-in-out group-hover:opacity-100 opacity-0 group-hover:w-[clamp(6rem,10vw,8rem)] w-0 z-[100]"
            style={{
              top: '0',
              bottom: '0',
              right: '100%',
              borderRight: '2px solid black',
              transform: 'translateX(0)',
              minWidth: '0',
              overflow: 'visible',
              position: 'absolute'
            }}
          >
            {/* Top row: Punching hole, CONTACT, US - aligned horizontally */}
            <div className="absolute top-1 left-1 right-1 flex items-center justify-between">
              {/* Punching hole */}
              <div className="w-1.5 h-1.5 rounded-full border border-black group-hover:bg-black transition-all duration-500 z-20 flex-shrink-0" />
              
              {/* CONTACT */}
              <div 
                className="font-black uppercase text-black flex-shrink-0"
                style={{ 
                  fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                  fontWeight: '900',
                  lineHeight: '0.9',
                  fontSize: 'clamp(0.5rem, 0.7vw, 0.65rem)'
                }}
              >
                CONTACT
              </div>
              
              {/* US */}
              <div 
                className="font-black uppercase text-black flex-shrink-0"
                style={{ 
                  fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                  fontWeight: '900',
                  lineHeight: '0.9',
                  fontSize: 'clamp(0.5rem, 0.7vw, 0.65rem)'
                }}
              >
                US
              </div>
            </div>
            
            {/* Bottom row: Email and Team */}
            <div className="absolute bottom-1 left-1.5 right-1.5 flex items-center justify-between">
              <div 
                className="font-black uppercase text-black"
                style={{ 
                  fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                  fontWeight: '900',
                  lineHeight: '0.9',
                  fontSize: 'clamp(0.25rem, 0.45vw, 0.35rem)'
                }}
              >
                USEC@<br/>OHIO.EDU
              </div>
              
              <div 
                className="font-black uppercase text-black"
                style={{ 
                  fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                  fontWeight: '900',
                  lineHeight: '0.9',
                  fontSize: 'clamp(0.25rem, 0.45vw, 0.35rem)'
                }}
              >
                TEAM<br/>USEC
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Apply Now Button - Positioned at absolute bottom right */}
        <div className="absolute bottom-0 right-0 w-full group" style={{ overflow: 'visible' }}>
          <a 
            href="https://docs.google.com/forms/d/e/1FAIpQLSd8yhrNsOJs_U3W5Eoa-wS-ovuSszLoKsLzhZYmz6MchPVhrg/viewform"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-800 text-white w-full flex items-center justify-center transition-all duration-500 ease-out relative overflow-visible hover:scale-105 hover:shadow-lg transform border-2 border-black z-20"
            style={{ 
              height: 'auto',
              minHeight: 'clamp(2.5rem,3.5vw,3.5rem)',
              padding: 'clamp(0.4rem,0.8vw,0.8rem) clamp(0.2rem,0.4vw,0.4rem)',
              fontWeight: '900',
              overflow: 'visible'
            }}
          >
            
            <div className="flex flex-col items-center relative z-10 h-full justify-center">
              {/* $100K text at the top */}
              <div className="absolute top-1.5 rotate-90 writing-mode-vertical opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                <span 
                  className="font-black uppercase tracking-wider text-black"
                  style={{ 
                    fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                    fontWeight: '800',
                    letterSpacing: '0.08em',
                    fontSize: 'clamp(0.5rem, 0.7vw, 0.65rem)'
                  }}
                >
                  
                </span>
              </div>
              
              {/* Main APPLY NOW text */}
              <div className="rotate-90 writing-mode-vertical">
                <span 
                  className="font-black uppercase tracking-wider group-hover:text-black transition-colors duration-500"
                  style={{ 
                    fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                    fontWeight: '900',
                    letterSpacing: '0.1em',
                    fontSize: 'clamp(0.7rem, 0.9vw, 0.85rem)'
                  }}
                >
                  APPLY NOW
                </span>
              </div>
            </div>
          </a>
          
          {/* Expandable rectangle to the left - positioned to extend beyond navbar */}
          <div 
            className="absolute top-0 h-full bg-emerald-400 border-2 border-black transition-all duration-500 ease-in-out group-hover:opacity-100 opacity-0 group-hover:w-[clamp(6rem,10vw,8rem)] w-0 z-[100]"
            style={{
              right: '100%',
              borderRight: '2px solid black',
              transform: 'translateX(0)',
              minWidth: '0',
              overflow: 'visible',
              position: 'absolute'
            }}
          >
            {/* Top row: Punching hole, $100K, PRIZE - aligned horizontally */}
            <div className="absolute top-1 left-1 right-1 flex items-center justify-between">
              {/* Punching hole */}
              <div className="w-1.5 h-1.5 rounded-full border border-black group-hover:bg-black transition-all duration-500 z-20 flex-shrink-0" />
              
              {/* $100K */}
              <div 
                className="font-black uppercase text-black flex-shrink-0"
                style={{ 
                  fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                  fontWeight: '900',
                  lineHeight: '0.9',
                  fontSize: 'clamp(0.6rem, 0.8vw, 0.75rem)'
                }}
              >
                $100K
              </div>
              
              {/* PRIZE */}
              <div 
                className="font-black uppercase text-black flex-shrink-0"
                style={{ 
                  fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                  fontWeight: '900',
                  lineHeight: '0.9',
                  fontSize: 'clamp(0.5rem, 0.7vw, 0.65rem)'
                }}
              >
                PRIZE
              </div>
            </div>
            
            {/* Bottom row: Date and Deadline */}
            <div className="absolute bottom-1 left-1.5 right-1.5 flex items-center justify-between">
              <div 
                className="font-black uppercase text-black"
                style={{ 
                  fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                  fontWeight: '900',
                  lineHeight: '0.9',
                  fontSize: 'clamp(0.4rem, 0.6vw, 0.55rem)'
                }}
              >
                OCT<br/>2025
              </div>
              
              <div 
                className="font-black uppercase text-black"
                style={{ 
                  fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                  fontWeight: '900',
                  lineHeight: '0.9',
                  fontSize: 'clamp(0.25rem, 0.45vw, 0.35rem)'
                }}
              >
                DEADLINE
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Navigation overlay - brutalist editorial style */}
      <nav 
        className={`fixed top-0 bottom-0 z-[800] flex flex-col transition-all duration-500 ease-in-out ${
          isOpen 
            ? 'right-[clamp(2.5rem,3.5vw,3.5rem)] left-0 pointer-events-all' 
            : 'right-[clamp(2.5rem,3.5vw,3.5rem)] left-full pointer-events-none'
        } lg:right-[clamp(2.5rem,3.5vw,3.5rem)] lg:left-2/3 lg:top-0 lg:h-screen`}
        style={{ padding: 'clamp(0.8rem,1.5vw,1rem)' }}
        onMouseLeave={closeNav}
      >
        {/* Magazine-style container with gooey background - positioned below marquee */}
        <div 
          className={`bg-white border-2 border-black transition-all duration-500 ${
            isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          } relative overflow-hidden`}
          style={{ height: '75vh', marginTop: 'clamp(4rem,6vw,6rem)' }}
        >
          
          {/* Gooey background effect */}
          <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <filter id="gooey-nav">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
                  <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="gooey" />
                  <feComposite in="SourceGraphic" in2="gooey" operator="atop"/>
                </filter>
              </defs>
              <g filter="url(#gooey-nav)">
                {Array.from({ length: 6 }).map((_, i) => {
                  // Use deterministic values to avoid hydration mismatch
                  const cxOffset = (i * 3) % 10
                  const duration = 2 + (i * 0.5) % 2
                  return (
                  <circle
                    key={i}
                      cx={`${15 + cxOffset}%`}
                    cy={`${20 + i * 12}%`}
                    r="6"
                    fill="#ef4444"
                    opacity="0.3"
                  >
                    <animate
                      attributeName="cy"
                      values={`${20 + i * 12}%;${25 + i * 12}%;${20 + i * 12}%`}
                        dur={`${duration}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                  )
                })}
              </g>
            </svg>
          </div>

          {/* Magazine layout structure */}
          <div className="h-full p-responsive-sm relative z-10 flex flex-col">
            
            {/* Header - magazine masthead */}
            <div className="mb-responsive-sm">
              <h1 
                className="font-black uppercase text-black leading-none mb-1 text-responsive-xl"
                style={{ 
                  fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                  fontWeight: '900'
                }}
              >
                USEC
              </h1>
              <div className="w-full h-0.5 bg-black mb-1"></div>
              <p 
                className="font-black uppercase text-black tracking-wider text-responsive-xs"
                style={{ 
                  fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                  fontWeight: '900'
                }}
              >
                NAVIGATION / 2025
              </p>
            </div>

            {/* Main navigation grid - full height colorful cards */}
            <div className="grid grid-cols-2 gap-responsive-sm flex-1">
              
              {/* HOME card - Yellow */}
              <Link href="/" onClick={closeNav} className="group relative">
                <div className="h-full bg-yellow-400 border-2 border-black p-responsive-sm relative overflow-hidden transition-all duration-500 hover:scale-105">
                  {/* Color fill animation */}
                  <div className="absolute inset-0 bg-black transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                  
                  {/* Punching hole */}
                  <div className="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full border-2 border-black group-hover:border-yellow-400 group-hover:bg-yellow-400 transition-all duration-500 z-20"></div>
                  
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <h2 
                        className="font-black uppercase text-black group-hover:text-yellow-400 leading-none transition-colors duration-500 text-responsive-lg"
                        style={{ 
                          fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                          fontWeight: '900'
                        }}
                      >
                        HOME
                      </h2>
                      <p className="text-responsive-xs font-bold uppercase mt-1 text-black group-hover:text-yellow-400 opacity-70 transition-colors duration-500">MAIN PAGE</p>
                    </div>
                    
                    {/* Explanatory text */}
                    <div className="absolute bottom-1.5 left-1.5">
                      <p 
                        className="text-black group-hover:text-yellow-400 font-bold leading-tight transition-colors duration-500 text-responsive-xs"
                        style={{ 
                          fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                          fontWeight: '700',
                          lineHeight: '1.2'
                        }}
                      >
                        Return to the main<br/>
                        competition landing page
                      </p>
                    </div>
                  </div>
                </div>
              </Link>

              {/* 2024 card - Red */}
              <Link href="/2024" onClick={closeNav} className="group relative">
                <div className="h-full bg-red-500 border-2 border-black p-responsive-sm relative overflow-hidden transition-all duration-500 hover:scale-105">
                  {/* Color fill animation */}
                  <div className="absolute inset-0 bg-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                  
                  {/* Punching hole */}
                  <div className="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full border-2 border-black group-hover:border-red-500 group-hover:bg-red-500 transition-all duration-500 z-20"></div>
                  
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <h2 
                        className="font-black uppercase text-white group-hover:text-red-500 leading-none transition-colors duration-500 text-responsive-lg"
                        style={{ 
                          fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                          fontWeight: '900'
                        }}
                      >
                        2024
                      </h2>
                      <p className="text-responsive-xs font-bold uppercase mt-1 text-white group-hover:text-red-500 opacity-80 transition-colors duration-500">COMPETITORS</p>
                    </div>
                    
                    {/* Explanatory text */}
                    <div className="absolute bottom-1.5 left-1.5">
                      <p 
                        className="text-white group-hover:text-red-500 font-bold leading-tight transition-colors duration-500 text-responsive-xs"
                        style={{ 
                          fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                          fontWeight: '700',
                          lineHeight: '1.2'
                        }}
                      >
                        Browse last year&apos;s<br/>
                        winning entrepreneurs
                      </p>
                    </div>
                  </div>
                </div>
              </Link>

              {/* RULES card - Green */}
              <Link href="/rules-faq" onClick={closeNav} className="group relative">
                <div className="h-full bg-green-400 border-2 border-black p-responsive-sm relative overflow-hidden transition-all duration-500 hover:scale-105">
                  {/* Color fill animation */}
                  <div className="absolute inset-0 bg-black transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                  
                  {/* Punching hole */}
                  <div className="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full border-2 border-black group-hover:border-green-400 group-hover:bg-green-400 transition-all duration-500 z-20"></div>
                  
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <h2 
                        className="font-black uppercase text-black group-hover:text-green-400 leading-none transition-colors duration-500 text-responsive-lg"
                        style={{ 
                          fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                          fontWeight: '900'
                        }}
                      >
                        RULES
                      </h2>
                      <p className="text-responsive-xs font-bold uppercase mt-1 text-black group-hover:text-green-400 opacity-70 transition-colors duration-500">& FAQ</p>
                    </div>
                    
                    {/* Explanatory text */}
                    <div className="absolute bottom-1.5 left-1.5">
                      <p 
                        className="text-black group-hover:text-green-400 font-bold leading-tight transition-colors duration-500 text-responsive-xs"
                        style={{ 
                          fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                          fontWeight: '700',
                          lineHeight: '1.2'
                        }}
                      >
                        Competition guidelines<br/>
                        and common questions
                      </p>
                    </div>
                  </div>
                </div>
              </Link>

              {/* TIMELINE card - Purple */}
              <Link href="/timeline" onClick={closeNav} className="group relative">
                <div className="h-full bg-purple-500 border-2 border-black p-responsive-sm relative overflow-hidden transition-all duration-500 hover:scale-105">
                  {/* Color fill animation */}
                  <div className="absolute inset-0 bg-white transform translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out"></div>
                  
                  {/* Punching hole */}
                  <div className="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full border-2 border-black group-hover:border-purple-500 group-hover:bg-purple-500 transition-all duration-500 z-20"></div>
                  
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <h2 
                        className="font-black uppercase text-white group-hover:text-purple-500 leading-none transition-colors duration-500 text-responsive-base"
                        style={{ 
                          fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                          fontWeight: '900'
                        }}
                      >
                        TIMELINE
                      </h2>
                      <p className="text-responsive-xs font-bold uppercase mt-1 text-white group-hover:text-purple-500 opacity-80 transition-colors duration-500">SCHEDULE</p>
                    </div>
                    
                    {/* Explanatory text */}
                    <div className="absolute bottom-1.5 left-1.5">
                      <p 
                        className="text-white group-hover:text-purple-500 font-bold leading-tight transition-colors duration-500 text-responsive-xs"
                        style={{ 
                          fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                          fontWeight: '700',
                          lineHeight: '1.2'
                        }}
                      >
                        Competition dates<br/>
                        and key milestones
                      </p>
                    </div>
                  </div>
                </div>
              </Link>

              {/* PRIZE card - Black */}
              <div className="group relative col-span-2">
                <div className="h-full bg-black border-2 border-black p-responsive-sm relative overflow-hidden transition-all duration-500 hover:scale-105">
                  {/* Color fill animation */}
                  <div className="absolute inset-0 bg-yellow-400 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
                  
                  {/* Punching hole */}
                  <div className="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full border-2 border-white group-hover:border-black group-hover:bg-black transition-all duration-500 z-20"></div>
                  
                  <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                      <h2 
                        className="font-black uppercase text-white group-hover:text-black leading-none transition-colors duration-500 text-responsive-lg"
                        style={{ 
                          fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                          fontWeight: '900'
                        }}
                      >
                        $100K
                      </h2>
                      <p className="text-responsive-xs font-bold uppercase mt-1 text-white group-hover:text-black opacity-80 transition-colors duration-500">GRAND PRIZE</p>
                    </div>
                    
                    {/* Explanatory text */}
                    <div className="absolute bottom-1.5 left-1.5">
                      <p 
                        className="text-white group-hover:text-black font-bold leading-tight transition-colors duration-500 text-responsive-xs"
                        style={{ 
                          fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                          fontWeight: '700',
                          lineHeight: '1.2'
                        }}
                      >
                        Ohio&apos;s largest startup<br/>
                        competition reward
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom section - editorial footer */}
            <div className="mt-responsive-sm pt-responsive-sm border-t border-black">
              <div className="flex justify-between items-end">
                <div>
                  <p 
                    className="font-black uppercase text-black text-responsive-xs"
                    style={{ 
                      fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                      fontWeight: '900'
                    }}
                  >
                    DEADLINE
                  </p>
                  <p className="text-[clamp(0.4rem,0.6vw,0.5rem)] font-bold uppercase text-red-500">APPROACHING</p>
                </div>
                <div className="text-right">
                  <p 
                    className="font-black uppercase text-black text-responsive-xs"
                    style={{ 
                      fontFamily: 'Satoshi, Inter, "Helvetica Neue", sans-serif',
                      fontWeight: '900'
                    }}
                  >
                    EST. 2025
                  </p>
                  <p className="text-[clamp(0.4rem,0.6vw,0.5rem)] font-bold uppercase text-black opacity-70">OHIO</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </nav>

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-[90] transition-opacity duration-300"
          onClick={closeNav}
        />
      )}
    </>
  )
} 