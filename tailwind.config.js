/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'hsl(220 15% 95%)',
        foreground: 'hsl(220 10% 45%)',
        card: 'hsl(0 0% 100%)',
        'card-foreground': 'hsl(220 10% 45%)',
        popover: 'hsl(0 0% 100%)',
        'popover-foreground': 'hsl(220 10% 45%)',
        primary: 'hsl(220 60% 50%)',
        'primary-foreground': 'hsl(0 0% 100%)',
        secondary: 'hsl(220 15% 85%)',
        'secondary-foreground': 'hsl(220 10% 45%)',
        muted: 'hsl(220 15% 85%)',
        'muted-foreground': 'hsl(220 10% 45%)',
        accent: 'hsl(220 60% 50%)',
        'accent-foreground': 'hsl(0 0% 100%)',
        destructive: 'hsl(358 75% 50%)',
        'destructive-foreground': 'hsl(0 0% 100%)',
        border: 'hsl(220 15% 85%)',
        input: 'hsl(220 15% 85%)',
        ring: 'hsl(220 60% 50%)',
      },
      borderRadius: {
        lg: '16px',
        md: '10px',
        sm: '6px',
      },
      boxShadow: {
        card: '0 8px 24px hsla(220, 10%, 10%, 0.12)',
        modal: '0 25px 50px -12px hsla(220, 10%, 10%, 0.32)',
      },
      spacing: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
        'xl': '24px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
