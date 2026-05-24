/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,scss}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E8720C',
          light: '#F59340',
          dark: '#C25A00',
        },
        neutral: {
          cream: '#F5F0E8',
          dark: '#1A1A1A',
          gray: '#6B7280',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
