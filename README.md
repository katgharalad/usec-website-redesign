# USEC - University Startup Entrepreneurial Competition

A modern, interactive hero section featuring particle text animations for the University Startup Entrepreneurial Competition.

## Features

✨ **Interactive Text Particles**: Hover over the "USEC" text to see particles repel and reform
🎨 **Modern Design**: Clean, professional layout with Tailwind CSS
📱 **Fully Responsive**: Works seamlessly across all device sizes
🎭 **Smooth Animations**: Enhanced with Framer Motion for elegant transitions
⚡ **High Performance**: Optimized canvas rendering for smooth 60fps animations

## Components

### TextParticle
A reusable component that converts text into interactive particles:

```tsx
<TextParticle
  text="USEC"
  fontSize={160}
  particleColor="#3b82f6"
  particleSize={1.5}
  particleDensity={6}
  backgroundColor="transparent"
/>
```

**Props:**
- `text`: The text to render as particles
- `fontSize`: Size of the text (default: 160)
- `particleColor`: Color of the particles (default: "#3b82f6")
- `particleSize`: Size of individual particles (default: 1.5)
- `particleDensity`: Spacing between particles (default: 6)
- `backgroundColor`: Canvas background color (default: "transparent")

### HeroTextParticles
The main hero section component featuring the USEC branding and particle animation.

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the development server:**
```bash
npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Technology Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **HTML5 Canvas** - High-performance particle rendering

## Customization

The particle system is highly customizable. You can adjust:

- **Particle behavior**: Modify repel strength, return speed, and interaction distance
- **Visual appearance**: Change colors, sizes, and density
- **Animation timing**: Adjust Framer Motion transitions
- **Layout**: Modify the hero section layout and content

## Browser Support

- Modern browsers with Canvas support
- Mobile browsers (iOS Safari, Chrome Mobile)
- Desktop browsers (Chrome, Firefox, Safari, Edge)

## Performance

The particle system is optimized for performance with:
- Efficient canvas rendering
- RequestAnimationFrame for smooth animations
- Responsive canvas resizing
- Memory cleanup on component unmount

## Inspiration

This project was inspired by modern particle text effects similar to those seen on 21st.dev and other contemporary web experiences.

---

**Built for the University Startup Entrepreneurial Competition**
