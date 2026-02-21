import type { JSX } from "react";

export function getDisplayName(WrappedComponent: JSX.ElementType) {
  if (typeof WrappedComponent === 'string') {
    return WrappedComponent || 'element'
  }

  if ('displayName' in WrappedComponent) {
    return WrappedComponent.displayName
  }

  return WrappedComponent.name || 'Component'
}

export type Ratio = string | {
  width: number
  height: number
}

export function getRatio(ratio?: Ratio) {
  if (!ratio) {
    return undefined
  }

  if (typeof ratio !== 'string' && (ratio.width || ratio.height)) {
    return `${ratio.height} / ${ratio.width || 1}`
  }

  return `1 / (${ratio})`
}
