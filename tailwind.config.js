// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     './app/**/*.{js,ts,jsx,tsx,mdx}',
//     // "./pages/**/*.{js,ts,jsx,tsx,mdx}",
//     './components/**/*.{js,ts,jsx,tsx,mdx}',

//     // Or if using `src` directory:
//     // "./src/**/*.{js,ts,jsx,tsx,mdx}",
//   ],
//   theme: {
//     extend: {},
//     screens: {
//       xs: '400px',
//       sm: '640px',
//       md: '768px',
//       lg: '1024px',
//       xl: '1280px',
//       '2xl': '1536px',
//     },
//   },
//   plugins: [],
// };
import { withUt } from 'uploadthing/tw';

export default withUt({
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        'main-bg': 'var(--main-bg)',
        'modal-bg': 'var(--modal-bg)',
        'hover-modal-bg': 'var(--hover-modal-bg)',
        'primary-color': 'var(--primary-color)',
      },
    },
    screens: {
      xs: '400px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
});
