/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config'

export default getViteConfig({
  // @ts-expect-error vitest types for astro are broken
  test: {
    coverage: {
      provider: 'istanbul',
    },
    environment: 'jsdom',
    globals: false,
    include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
    setupFiles: ['./vitest-setup.ts'],
  },
})
