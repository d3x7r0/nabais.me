import type {CSSProperties} from "react";
import { useCSSVariable } from './css'

export function useDominantColor(
  color?: string,
  style?: CSSProperties
): CSSProperties | undefined {
  return useCSSVariable('dominant-color', color, style)
}

export function useAltDominantColor(
  color?: string,
  style?: CSSProperties
): CSSProperties | undefined {
  return useCSSVariable('alt-dominant-color', color, style)
}

export function useBgColor(
  color?: string,
  style?: CSSProperties
): CSSProperties | undefined {
  return useCSSVariable('bg-color', color, style)
}

export function useAltColor(
  color?: string,
  style?: CSSProperties
): CSSProperties | undefined {
  return useCSSVariable('alt-color', color, style)
}

export function useBorderColor(
  color?: string,
  style?: CSSProperties
): CSSProperties | undefined {
  return useCSSVariable('border-color', color, style)
}
