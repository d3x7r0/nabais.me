import { describe, expect, it } from 'vitest'

import { calculateSizes } from './sizes'

describe('components/atom/SmartImg', () => {
  describe('calculateSizes', () => {
    it('handles min value correctly', () => {
      const result1 = calculateSizes({ min: 100 })
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

      const result2 = calculateSizes({ min: 1000 })
      expect(result2).toEqual([
        1280,
        1600,
        1920,
        2560,
        3840,
      ])

      const result3 = calculateSizes({ min: 4000 })
      expect(result3).toEqual([])
    })

    it('handles max value correctly', () => {
      const result1 = calculateSizes({ max: 100 })
      expect(result1).toEqual([
        120,
      ])

      const result2 = calculateSizes({ max: 1280 })
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

      const result3 = calculateSizes({ max: 1800 })
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

      const result4 = calculateSizes({ max: 4000 })
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
      const result1 = calculateSizes({ min: 0, max: 100 })
      expect(result1).toEqual([
        120,
      ])

      const result2 = calculateSizes({ min: 300, max: 1300 })
      expect(result2).toEqual([
        320,
        480,
        768,
        920,
        1280,
        1600,
      ])

      const result3 = calculateSizes({ min: 800, max: 4000 })
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
