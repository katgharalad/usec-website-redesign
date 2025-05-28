import { RightNavbar } from "@/components/ui/right-navbar"
import { Competitors2024 } from "@/components/ui/competitors-2024"

export default function Archive2024() {
  return (
    <>
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
      
      {/* 2024 Competitors Section */}
      <Competitors2024 />
    </>
  )
} 