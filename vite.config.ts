// vite.config.js
import { rollup } from 'd3';
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
      external: ["@babylonjs/core"],
      output: {
        globals: (moduleId): any => {
            moduleId.startsWith("@babylonjs") ? "BABYLON" : undefined;
          },
        },
    },
  },
  optimizeDeps: {
    exclude: [
      "@babylonjs/core"
    ]
  },
  plugins: [dts({rollupTypes: true}), 
            externalizeDeps(),
          ],
});