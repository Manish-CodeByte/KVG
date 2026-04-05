/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#6366f1',
        secondary: '#a855f7',
        accent: '#ec4899',
        dark: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          750: '#2d3748',
          800: '#1f2937',
          900: '#111827',
          950: '#0f172a',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
        'gradient-accent': 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
        'gradient-success': 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        'gradient-warning': 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        'gradient-danger': 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
        'gradient-cyan': 'linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)',
        'glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      },
      backdropBlur: {
        'xs': '2px',
        'md': '12px',
        'xl': '20px',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in-left': {
          '0%': { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'fade-in-right': {
          '0%': { opacity: '0', transform: 'translateX(10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'slide-down': {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '1', boxShadow: '0 0 20px rgba(99, 102, 241, 0.5)' },
          '50%': { opacity: '0.8', boxShadow: '0 0 30px rgba(99, 102, 241, 0.8)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'bounce-slow': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'shimmer': {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-in-out',
        'fade-in-down': 'fade-in-down 0.5s ease-out',
        'fade-in-up': 'fade-in-up 0.5s ease-out',
        'fade-in-left': 'fade-in-left 0.5s ease-out',
        'fade-in-right': 'fade-in-right 0.5s ease-out',
        'slide-down': 'slide-down 0.4s ease-out',
        'slide-up': 'slide-up 0.4s ease-out',
        'scale-in': 'scale-in 0.3s ease-out',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
        'bounce-slow': 'bounce-slow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'glass-dark': '0 8px 32px rgba(0, 0, 0, 0.3)',
        'glow': '0 0 20px rgba(99, 102, 241, 0.5)',
        'glow-lg': '0 0 40px rgba(99, 102, 241, 0.6)',
        'glow-pink': '0 0 20px rgba(236, 72, 153, 0.5)',
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.5)',
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.glass': {
          'background': 'rgba(255, 255, 255, 0.1)',
          'backdrop-filter': 'blur(10px)',
          '-webkit-backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.2)',
        },
        '.glass-dark': {
          'background': 'rgba(15, 23, 42, 0.5)',
          'backdrop-filter': 'blur(10px)',
          '-webkit-backdrop-filter': 'blur(10px)',
          'border': '1px solid rgba(255, 255, 255, 0.1)',
        },
        '.text-gradient': {
          'background': 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
          '-webkit-background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
          'background-clip': 'text',
        },
        '.btn-gradient': {
          'background': 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
          'position': 'relative',
          'overflow': 'hidden',
          '&::before': {
            'content': '""',
            'position': 'absolute',
            'top': '0',
            'left': '-100%',
            'width': '100%',
            'height': '100%',
            'background': 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
            'transition': 'left 0.3s ease',
            'z-index': '-1',
          },
          '&:hover::before': {
            'left': '0',
          },
        },
      })
    },
  ],
}
