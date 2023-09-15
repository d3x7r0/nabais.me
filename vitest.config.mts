import { getViteConfig } from 'astro/config'

export default getViteConfig({
  // @ts-ignore
  test: {
    coverage: {
      provider: 'istanbul'
    },
  },
})
