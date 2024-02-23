import { defineConfig } from 'astro/config'
import preact from '@astrojs/preact'

// https://astro.build/config
export default defineConfig({
  integrations: [
    preact({ compat: true }),
  ],
  prefetch: true,
  site: 'https://www.nabais.me/',
  vite: {
    ssr: {
      noExternal: ['rooks', 'keen-slider']
    },
  },
})
