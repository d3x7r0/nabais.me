export function calculateWidths(
  options: { min?: number, max?: number},
  candidates: number[]
) {
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
