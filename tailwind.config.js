/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy:  { DEFAULT: '#1B3A6B', 50: '#EBF0FA', 100: '#C8D5F0', 200: '#95ABDF', 300: '#6281CE', 400: '#3B5CB0', 500: '#1B3A6B', 600: '#152E55', 700: '#0F2240', 800: '#09162A', 900: '#040B15' },
        sky:   { DEFAULT: '#4A9FD5', 50: '#EAF5FC', 100: '#C5E5F7', 200: '#8ACCEF', 300: '#4FB3E7', 400: '#4A9FD5', 500: '#2E85BA', 600: '#236B96', 700: '#185072', 800: '#0E354E', 900: '#051A27' },
        green: { DEFAULT: '#2ECC71', 50: '#EAFAF1', 100: '#C6F2DC', 200: '#8DE5B9', 300: '#54D896', 400: '#2ECC71', 500: '#25A55B', 600: '#1C7E45', 700: '#13572F', 800: '#0A3019', 900: '#020903' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 2px 20px rgba(27,58,107,0.08)',
        'card-hover': '0 8px 40px rgba(27,58,107,0.16)',
        btn: '0 4px 14px rgba(27,58,107,0.25)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
      },
      keyframes: {
        fadeUp: { '0%': { opacity: 0, transform: 'translateY(24px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        fadeIn: { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
      },
    },
  },
  plugins: [],
}
