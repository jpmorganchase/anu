import tutorialkit from '@tutorialkit/astro';
import { defineConfig } from 'astro/config';

export default defineConfig({
  devToolbar: {
    enabled: false,
  },
  integrations: [tutorialkit()],
  base: '/anu/tutorial/',
  build: {
    format: 'file'
  },
  vite: {
    plugins: []
  }
});
