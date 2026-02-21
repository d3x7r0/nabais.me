import type { CSSProperties } from 'react'

import isString from 'lodash-es/isString'
import { useMemo } from 'react'

export function useCSSVariable(
  name: string,
  value?: number | string,
  style?: CSSProperties,
): CSSProperties | undefined {
  return useMemo(() => {
    if (!value) {
      return style
    }

    const varName = `--${name}`
    const varValue = isString(value)
      ? `${value}`
      : value

    return {
      ...style,
      [varName]: varValue,
    }
  }, [name, value, style])
}
