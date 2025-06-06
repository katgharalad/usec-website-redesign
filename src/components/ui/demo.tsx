import { useScreenSize}  from "@/hooks/use-screen-size"
import { PixelTrail } from "@/components/ui/pixel-trail"
import { GooeyFilter } from "@/components/ui/gooey-filter"
import Image from "next/image"

function GooeyDemo() {
  const screenSize = useScreenSize()

  return (
    <div className="relative w-full h-full min-h-[600px] flex flex-col items-center justify-center gap-8 bg-black text-center text-pretty">
      <Image
        src="https://images.aiscribbles.com/34fe5695dbc942628e3cad9744e8ae13.png?v=60d084"
        alt="impressionist painting"
        fill
        className="object-cover opacity-70"
      />

      <GooeyFilter id="gooey-filter-pixel-trail" strength={5} />

      <div
        className="absolute inset-0 z-0"
        style={{ filter: "url(#gooey-filter-pixel-trail)" }}
      >
        <PixelTrail
          pixelSize={screenSize.lessThan(`md`) ? 24 : 32}
          fadeDuration={0}
          delay={500}
          pixelClassName="bg-white"
        />
      </div>

      <p className="text-white text-7xl z-10 font-calendas w-1/2 font-bold">
        Speaking things into existence
        <span className="font-overusedGrotesk"></span>
      </p>
    </div>
  )
}

export { GooeyDemo } 