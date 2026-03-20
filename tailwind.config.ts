import type { Config } from 'tailwindcss';
import typography from '@tailwindcss/typography'; // Шинээр нэмсэн

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      typography: {
  DEFAULT: {
    css: {
      'p, li, ul, ol': {
        marginTop: '0.5rem !important',    // Бүгд ижилхэн 8px зайтай байна
        marginBottom: '0.5rem !important',
      },
    },
  },
},
    },
  },
  plugins: [
    typography, // 'require' ашиглахгүй болсон тул алдаа арилна
  ],
};

export default config;
