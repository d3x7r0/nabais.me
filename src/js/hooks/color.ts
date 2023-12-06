import type { JSX } from 'preact'

import { useCSSVariable } from './css'

export function useDominantColor(
  color?: string,
  style?: JSX.HTMLAttributes['style']
): JSX.HTMLAttributes['style'] {
  return useCSSVariable('dominant-color', color, style)
}

export function useAltDominantColor(
  color?: string,
  style?: JSX.HTMLAttributes['style']
): JSX.HTMLAttributes['style'] {
  return useCSSVariable('alt-dominant-color', color, style)
}

export function useBgColor(
  color?: string,
  style?: JSX.HTMLAttributes['style']
): JSX.HTMLAttributes['style'] {
  return useCSSVariable('bg-color', color, style)
}

export function useAltColor(
  color?: string,
  style?: JSX.HTMLAttributes['style']
): JSX.HTMLAttributes['style'] {
  return useCSSVariable('alt-color', color, style)
}

export function useBorderColor(
  color?: string,
  style?: JSX.HTMLAttributes['style']
): JSX.HTMLAttributes['style'] {
  return useCSSVariable('border-color', color, style)
}
