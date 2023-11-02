import { defineConfig } from 'vite'
import dsv from '@rollup/plugin-dsv' 

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3443,
    https: false,
    // Uncomment to allow access from network
    // (or use `npm run dev -- -- host=0.0.0.0`)
    //host: '0.0.0.0',
  },
  build: {
    target: 'esnext',
    outDir: '../docs/public'
  },
  rollupOptions: {
    external: ["@babylonjs/core"],
  }, 
  plugins: [
    dsv(),
  ],
  base: "/anu/",
})