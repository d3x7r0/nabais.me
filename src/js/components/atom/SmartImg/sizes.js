const IMAGE_SIZES = [
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
]

/**
 * @param {{ min?: number, max?: number}} options
 * @param {number[]} candidates
 * @returns {number[]}
 */
export function calculateSizes(options = {}, candidates = IMAGE_SIZES) {
  const { min, max } = options

  let result = Array.from(candidates)

  if (min) {
    result = result.filter(entry => min < entry)
  }

  if (max) {
    result = result.filter((entry, idx, arr) => {
      const prev = arr[idx - 1] || 0

      return max >= entry || max >= prev
    })
  }

  return result
}
