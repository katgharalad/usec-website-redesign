import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
        '4xl': '2560px',
        // Custom breakpoints for better responsive control
        'desktop-sm': '1024px',
        'desktop-md': '1280px',
        'desktop-lg': '1440px',
        'desktop-xl': '1680px',
        'desktop-2xl': '1920px',
      },
      fontFamily: {
        'milker': ['Milker', 'Inter', 'system-ui', 'sans-serif'],
        'milker-bold': ['Milker Bold', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      writingMode: {
        vertical: 'vertical-rl',
      },
      animation: {
        'wave-pulse': 'wave-pulse 4s ease-in-out infinite',
        marquee: 'marquee 18s linear infinite',
      },
      keyframes: {
        'wave-pulse': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
      perspective: {
        1000: '1000px',
        1200: '1200px',
      },
      spacing: {
        'responsive': 'clamp(1rem, 3vw, 3rem)',
        'responsive-sm': 'clamp(0.5rem, 2vw, 1.5rem)',
        'responsive-lg': 'clamp(1.5rem, 4vw, 4rem)',
        'responsive-xl': 'clamp(2rem, 5vw, 5rem)',
      },
      fontSize: {
        'responsive-xs': 'clamp(0.75rem, 0.8vw + 0.5rem, 0.875rem)',
        'responsive-sm': 'clamp(0.875rem, 1vw + 0.5rem, 1rem)',
        'responsive-base': 'clamp(1rem, 1.2vw + 0.6rem, 1.5rem)',
        'responsive-lg': 'clamp(1.125rem, 1.5vw + 0.7rem, 1.75rem)',
        'responsive-xl': 'clamp(1.25rem, 2vw + 0.8rem, 2.25rem)',
        'responsive-2xl': 'clamp(1.5rem, 2.5vw + 1rem, 2.75rem)',
        'responsive-3xl': 'clamp(1.875rem, 3vw + 1.2rem, 3.5rem)',
        'responsive-4xl': 'clamp(2.25rem, 4vw + 1.5rem, 4.5rem)',
        'responsive-5xl': 'clamp(3rem, 5vw + 2rem, 6rem)',
        'responsive-6xl': 'clamp(3.75rem, 6vw + 2.5rem, 7.5rem)',
        'responsive-7xl': 'clamp(4.5rem, 8vw + 3rem, 10rem)',
        'responsive-8xl': 'clamp(6rem, 10vw + 4rem, 12rem)',
        'responsive-9xl': 'clamp(8rem, 12vw + 5rem, 16rem)',
      },
      maxWidth: {
        'responsive': 'min(100vw - 2rem, 1400px)',
        'responsive-wide': 'min(100vw - 2rem, 1600px)',
        'responsive-narrow': 'min(100vw - 2rem, 1200px)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      addUtilities({
        '.writing-mode-vertical': {
          writingMode: 'vertical-rl',
          transform: 'rotate(180deg)',
        },
        '.container-responsive': {
          maxWidth: 'min(100vw - 2rem, 1400px)',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: 'clamp(1rem, 3vw, 2rem)',
          paddingRight: 'clamp(1rem, 3vw, 2rem)',
        },
        '.container-responsive-wide': {
          maxWidth: 'min(100vw - 2rem, 1600px)',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: 'clamp(1rem, 4vw, 3rem)',
          paddingRight: 'clamp(1rem, 4vw, 3rem)',
        },
        '.container-responsive-narrow': {
          maxWidth: 'min(100vw - 2rem, 1200px)',
          marginLeft: 'auto',
          marginRight: 'auto',
          paddingLeft: 'clamp(1rem, 2vw, 1.5rem)',
          paddingRight: 'clamp(1rem, 2vw, 1.5rem)',
        },
      });
    }
  ],
} satisfies Config;

