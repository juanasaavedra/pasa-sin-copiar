/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#050814',
          0: '#050814',
          1: '#0F162B',
          2: '#141E3C',
        },
        fg: '#FFFFFF',
        ink: '#E6E9F0',
        muted: '#9AA3B2',
        accent: {
          DEFAULT: '#4aa8ff',
          2: '#6cb9ff',
        },
        border: 'rgba(74,168,255,.25)',
        glow: 'rgba(74,168,255,.35)',
      },
      borderRadius: {
        'r-1': '0.5rem',
        'r-2': '12px',
        'r-3': '16px',
        'r-4': '20px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'animated-gradient': 'radial-gradient(circle at center 40%, #0F162B 0%, #050814 100%)',
      },
    },
  },
  plugins: [],
}
