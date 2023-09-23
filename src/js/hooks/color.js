import { useMemo } from 'preact/hooks'
import isObject from 'lodash-es/isObject'
import isString from 'lodash-es/isString'

export function useDominantColor(color, style) {
  return useCSSVariable('dominant-color', color, style)
}

export function useAltDominantColor(color, style) {
  return useCSSVariable('alt-dominant-color', color, style)
}

export function useBgColor(color, style) {
  return useCSSVariable('bg-color', color, style)
}

export function useAltColor(color, style) {
  return useCSSVariable('alt-color', color, style)
}

export function useBorderColor(color, style) {
  return useCSSVariable('border-color', color, style)
}

export function useCSSVariable(name, value, style) {
  return useMemo(() => {
    if (!value) {
      return style
    }

    const varName = `--${name}`
    const varValue = isString(value)
      ? `"${value}"`
      : value

    if (isObject(style)) {
      return {
        ...style,
        [varName]: varValue,
      }
    }

    return `${varName}: ${varValue};${style || ''}`
  }, [name, value, style])
}
