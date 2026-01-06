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
        'primary-dark': '#1a1f1a',      // Very dark charcoal with green hint
        'primary': '#2a3329',            // Dark charcoal
        'primary-light': '#7FB800',      // Your logo green
        'background': '#0f1110',         // Almost black
        'surface': '#1a1f1a',            // Charcoal surface
        'text-light': '#F7F4EF',         // Off-white text
        'text-dim': '#9ca3af',           // Gray text
        'accent': '#7FB800',             // Your logo green
        'accent-glow': '#a3d900',        // Brighter green for hover
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        serif: ['Georgia', 'Times New Roman', 'serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-mesh': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(127, 184, 0, 0.15), transparent), radial-gradient(ellipse 60% 50% at 0% 50%, rgba(42, 51, 41, 0.3), transparent), radial-gradient(ellipse 60% 50% at 100% 80%, rgba(127, 184, 0, 0.1), transparent)',
      },
    },
  },
  plugins: [],
}
