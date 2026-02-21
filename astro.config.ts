import {defineConfig} from 'astro/config'
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx()],
  prefetch: true,
  site: 'https://www.nabais.me/',
  vite: {
    ssr: {
      noExternal: ['rooks', 'keen-slider']
    },
  },
})
