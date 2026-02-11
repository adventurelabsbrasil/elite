import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        elite: {
          // Nomes técnicos (para uso no código)
          quartz: '#F2F4F6',      // Premium Quartz
          'sold-red': '#DA0028',  // Sold Red (casos extremamente raros)
          navy: '#0E1D37',        // Blueprint Navy
          flow: '#00BCBC',        // Smart Flow
          glow: '#FE5009',        // Urban Glow
          
          // Aliases para compatibilidade
          gray: '#F2F4F6',
          red: '#DA0028',
          turquoise: '#00BCBC',
          orange: '#FE5009',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
