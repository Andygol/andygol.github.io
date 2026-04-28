/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './layouts/**/*.html',
    './content/**/*.{md,html}',
    './assets/js/**/*.{js,jsx}',
  ],
  darkMode: ['selector', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        primary: '#211f2f',
        'primary-mid': '#4c4766',
        secondary: '#918ca9',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        feature: '0 0.5rem 1rem rgba(0, 0, 0, 0.15)',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.slate.700'),
            a: {
              color: theme('colors.indigo.600'),
              textDecoration: 'underline',
              '&:hover': { color: theme('colors.indigo.800') },
            },
            'h2,h3,h4': { color: theme('colors.primary') },
            code: {
              color: theme('colors.primary'),
              backgroundColor: theme('colors.slate.100'),
              padding: '0.15em 0.3em',
              borderRadius: '0.25rem',
              fontWeight: '400',
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            'blockquote p:first-of-type::before': { content: 'none' },
            'blockquote p:last-of-type::after': { content: 'none' },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
