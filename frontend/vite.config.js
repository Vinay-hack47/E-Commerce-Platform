import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
})


// import alias from '@rollup/plugin-alias';

// export default defineConfig({
//   plugins: [
//     alias({
//       entries: [
//         { find: '@', replacement: '/src' },
//       ],
//     }),
//   ],
// });