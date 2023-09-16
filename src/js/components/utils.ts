import type { JSX } from 'preact'

export function getDisplayName(WrappedComponent: JSX.ElementType) {
  if (typeof WrappedComponent === 'string') {
    return WrappedComponent || 'element'
  }

  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export type Ratio = string | {
  width: number
  height: number
}

export function getRatio(ratio?: Ratio) {
  if (!ratio) {
    return null
  }

  if (typeof ratio !== 'string' && (ratio.width || ratio.height)) {
    return `${ratio.height} / ${ratio.width || 1}`
  }

  return `1 / (${ratio})`
}
