import mdx from '@astrojs/mdx'
import react from '@astrojs/react'
import { defineConfig } from 'astro/config'

// https://astro.build/config
export default defineConfig({
  integrations: [react(), mdx()],
  prefetch: true,
  site: 'https://www.nabais.me/',
  vite: {
    ssr: {
      noExternal: ['rooks', 'keen-slider'],
    },
  },
})
