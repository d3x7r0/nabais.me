import type { JSX } from 'preact'
import { useMemo } from 'preact/hooks'
import isString from 'lodash-es/isString'
import isObject from 'lodash-es/isObject'

export function useCSSVariable(
  name: string,
  value?: string | number,
  style?: JSX.HTMLAttributes['style'],
): JSX.HTMLAttributes['style'] {
  return useMemo(() => {
    if (!value) {
      return style
    }

    const varName = `--${name}`
    const varValue = isString(value)
      ? `${value}`
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
