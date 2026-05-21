import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff6b35',
        'primary-hover': '#ff8555',
        'primary-muted': 'rgba(255, 107, 53, 0.1)',
        dark: '#0a0a0a',
        'dark-surface': '#141414',
        'dark-elevated': '#1c1c1c',
        'gl-text': '#f5f5f5',
        'gl-text-secondary': '#a3a3a3',
        'gl-text-muted': '#737373',
        'gl-border': '#262626',
        'gl-success': '#22c55e',
        'gl-warning': '#f59e0b',
        'gl-danger': '#ef4444',
        'gl-info': '#3b82f6',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        'card': '12px',
        'button': '8px',
        'input': '4px',
      },
      boxShadow: {
        'accent': '0 4px 24px rgba(255, 107, 53, 0.1)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.3)',
      },
      typography: (theme: any) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gl-text-secondary'),
            maxWidth: 'none',
            h1: { fontWeight: '800', letterSpacing: '-0.025em', color: theme('colors.gl-text') },
            h2: { fontWeight: '700', letterSpacing: '-0.025em', marginTop: '2em', color: theme('colors.gl-text') },
            h3: { fontWeight: '600', marginTop: '1.5em', color: theme('colors.gl-text') },
            a: { color: theme('colors.primary'), textDecoration: 'none' },
            'a:hover': { textDecoration: 'underline' },
            code: { backgroundColor: theme('colors.dark-elevated'), color: theme('colors.primary-hover'), padding: '0.2em 0.4em', borderRadius: '0.25em', fontSize: '0.875em' },
            pre: { backgroundColor: theme('colors.dark-elevated'), color: theme('colors.gl-text'), padding: '1em', borderRadius: '0.5em', overflow: 'auto' },
            strong: { color: theme('colors.gl-text') },
            blockquote: { borderLeftColor: theme('colors.primary'), color: theme('colors.gl-text-secondary') },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
export default config