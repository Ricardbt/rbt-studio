/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Ver DESIGN.md — los valores canónicos viven en src/styles/index.css
        press: 'var(--press)',
        'press-deep': 'var(--press-deep)',
        'press-line': 'var(--press-line)',
        sheet: 'var(--sheet)',
        'sheet-deep': 'var(--sheet-deep)',
        'sheet-line': 'var(--sheet-line)',
        magenta: 'var(--ink-magenta)',
        cyan: 'var(--ink-cyan)',
        yellow: 'var(--ink-yellow)',
        key: 'var(--ink-key)',
        'on-press': 'var(--on-press)',
        'on-press-mid': 'var(--on-press-mid)',
        'on-press-low': 'var(--on-press-low)',
        'on-sheet': 'var(--on-sheet)',
        'on-sheet-mid': 'var(--on-sheet-mid)',
        'on-sheet-low': 'var(--on-sheet-low)',
      },
      fontFamily: {
        sans: ['Archivo', 'system-ui', 'sans-serif'],
        mono: ['Spline Sans Mono', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        'ultra': '0.25em',
        'mega': '0.15em',
      },
    },
  },
  plugins: [],
}
