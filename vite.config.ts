// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts';
import { externalizeDeps } from "vite-plugin-externalize-deps";

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Anu',
      // the proper extensions will be added
      fileName: 'anu',
    },
    rollupOptions: {
      external: [
        "@babylonjs/core",
        "ol"
      ],
      output: {
        globals: {
           "@babylonjs/core": "BABYLON",
           "ol": "ol"
          },
        },
    },
  },
  plugins: [dts({rollupTypes: true}), 
            externalizeDeps(),
          ],
});