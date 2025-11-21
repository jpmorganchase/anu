// vite.config.js
import { resolve } from 'path'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts';
import { externalizeDeps } from "vite-plugin-externalize-deps";

export default defineConfig({
  build: {
    sourcemap: true, // Enable source maps
    minify: false, // Use esbuild for minification
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'Anu',
      // the proper extensions will be added
      fileName: 'anu',
    },
    rollupOptions: {
      external: [
        /@babylonjs\/core/,
        "ol"
      ],
      output: {
        globals: {
           "ol": "ol"
          },
        },
    },
  },
  plugins: [dts({rollupTypes: true, outputDir: 'dist', insertTypesEntry: true, tsConfigFilePath: "./tsconfig.json"}), 
            externalizeDeps(),
          ],
});