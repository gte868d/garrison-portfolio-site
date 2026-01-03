/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#2D1B4E',
        'primary': '#4B0082',
        'primary-light': '#667eea',
        'background': '#1A1D23',
        'surface': '#2A2D34',
        'text-light': '#F7F4EF',
        'text-dim': '#C4B8A9',
        'accent': '#B87333',
        'accent-glow': '#D4AF37',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        serif: ['Georgia', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'radial-gradient(at 40% 20%, #4B0082 0%, transparent 50%), radial-gradient(at 80% 0%, #2D1B4E 0%, transparent 50%), radial-gradient(at 0% 50%, #667eea 0%, transparent 50%), radial-gradient(at 80% 50%, #1A1D23 0%, transparent 50%)',
      },
    },
  },
  plugins: [],
}
