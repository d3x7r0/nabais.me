import { defineConfig } from 'astro/config'
import preact from '@astrojs/preact'
import prefetch from "@astrojs/prefetch"

// https://astro.build/config
export default defineConfig({
  integrations: [
    preact({ compat: true }),
    prefetch(),
  ],
  site: 'https://www.nabais.me/',
  vite: {
    resolve: {
      alias: {
        'lodash': 'lodash-es'
      }
    },
    ssr: {
      noExternal: ['@rooks/use-key', 'keen-slider']
    },
  },
  //experimental: {
  //  viewTransitions: true,
  //},
})
