import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium Brand Colors
        brand: {
          50: '#F8FAFC',   // Lightest - backgrounds
          100: '#F1F5F9',  // Light backgrounds
          200: '#E2E8F0',  // Borders, subtle elements
          300: '#CBD5E1',  // Disabled states
          400: '#94A3B8',  // Placeholder text
          500: '#64748B',  // Secondary text
          600: '#475569',  // Body text
          700: '#334155',  // Headings
          800: '#1E293B',  // Primary dark
          900: '#0F172A',  // Darkest - premium headings
        },
        // Single Accent - Refined Blue
        accent: {
          50: '#EFF6FF',
          100: '#DBEAFE',
          200: '#BFDBFE',
          300: '#93C5FD',
          400: '#60A5FA',
          500: '#3B82F6',  // Primary accent
          600: '#2563EB',  // Primary CTA
          700: '#1D4ED8',
          800: '#1E40AF',
          900: '#1E3A8A',
        },
      },
    },
  },
  plugins: [],
};
export default config;
