import { describe, expect, it } from 'vitest'

import { calculateWidths } from './widths.ts'
import { DEFAULT_IMAGE_WIDTHS } from './constants.ts'

describe('src/js/services/pulitzer/widths.ts', () => {
  describe('calculateWidths', () => {
    it('handles min value correctly', () => {
      const result1 = calculateWidths({ min: 100 }, DEFAULT_IMAGE_WIDTHS)
      expect(result1).toEqual([
        120,
        160,
        240,
        320,
        480,
        768,
        920,
        1280,
        1600,
        1920,
        2560,
        3840,
      ])

      const result2 = calculateWidths({ min: 1000 }, DEFAULT_IMAGE_WIDTHS)
      expect(result2).toEqual([
        1280,
        1600,
        1920,
        2560,
        3840,
      ])

      const result3 = calculateWidths({ min: 4000 }, DEFAULT_IMAGE_WIDTHS)
      expect(result3).toEqual([])
    })

    it('handles max value correctly', () => {
      const result1 = calculateWidths({ max: 100 }, DEFAULT_IMAGE_WIDTHS)
      expect(result1).toEqual([
        120,
      ])

      const result2 = calculateWidths({ max: 1280 }, DEFAULT_IMAGE_WIDTHS)
      expect(result2).toEqual([
        120,
        160,
        240,
        320,
        480,
        768,
        920,
        1280,
        1600,
      ])

      const result3 = calculateWidths({ max: 1800 }, DEFAULT_IMAGE_WIDTHS)
      expect(result3).toEqual([
        120,
        160,
        240,
        320,
        480,
        768,
        920,
        1280,
        1600,
        1920,
      ])

      const result4 = calculateWidths({ max: 4000 }, DEFAULT_IMAGE_WIDTHS)
      expect(result4).toEqual([
        120,
        160,
        240,
        320,
        480,
        768,
        920,
        1280,
        1600,
        1920,
        2560,
        3840,
      ])
    })

    it('handles min and max values correctly', () => {
      const result1 = calculateWidths({ min: 0, max: 100 }, DEFAULT_IMAGE_WIDTHS)
      expect(result1).toEqual([
        120,
      ])

      const result2 = calculateWidths({ min: 300, max: 1300 }, DEFAULT_IMAGE_WIDTHS)
      expect(result2).toEqual([
        320,
        480,
        768,
        920,
        1280,
        1600,
      ])

      const result3 = calculateWidths({ min: 800, max: 4000 }, DEFAULT_IMAGE_WIDTHS)
      expect(result3).toEqual([
        920,
        1280,
        1600,
        1920,
        2560,
        3840,
      ])
    })
  })
})
