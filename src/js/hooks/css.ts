import {type CSSProperties, useMemo} from 'react'
import isString from 'lodash-es/isString'

export function useCSSVariable(
  name: string,
  value?: string | number,
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
