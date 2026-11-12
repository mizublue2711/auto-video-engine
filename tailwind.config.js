/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Space Grotesk', 'Pretendard', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        korean: ['Pretendard', 'system-ui', 'sans-serif'],
      },
      colors: {
        void: '#05050A',
        surface: {
          panel: '#0A0C14',
          elevated: '#0D0E17',
        },
        cad: {
          border: '#1F1F2E',
          subtle: '#2D2D44',
          muted: '#8A8FA3',
        },
        cyan: {
          DEFAULT: '#00E5FF',
          glow: '#00E5FF',
          950: '#031E2B',
        },
        violet: {
          DEFAULT: '#5322FF',
          core: '#5322FF',
        },
        satellite: {
          DEFAULT: '#10B981',
          green: '#10B981',
        },
      },
      boxShadow: {
        'cyan-glow': '0 0 35px rgba(0, 229, 255, 0.25)',
        'cyan-border': '0 0 15px rgba(0, 229, 255, 0.4)',
        'violet-glow': '0 0 35px rgba(83, 34, 255, 0.25)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
    },
  },
  plugins: [],
};
