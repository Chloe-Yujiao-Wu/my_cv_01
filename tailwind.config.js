/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        // 通过 CSS 变量在明/暗模式下自动切换,支持 /opacity 透明度
        canvas: 'rgb(var(--bg-rgb) / <alpha-value>)',
        card: 'rgb(var(--card-rgb) / <alpha-value>)',
        soft: 'rgb(var(--soft-rgb) / <alpha-value>)',
        ink: 'rgb(var(--ink-rgb) / <alpha-value>)',
        muted: 'rgb(var(--muted-rgb) / <alpha-value>)',
        line: 'rgb(var(--line-rgb) / <alpha-value>)',
        accent: {
          DEFAULT: 'rgb(var(--accent-rgb) / <alpha-value>)',
          dark: 'rgb(var(--accent-dark-rgb) / <alpha-value>)',
        },
      },
      maxWidth: {
        content: '75rem',
      },
    },
  },
  plugins: [],
}
