function cleanPath(path?: string): string | void {
  if (!path) {
    return
  }

  return path.replace(/\?.+$/, '').replace(/\/?$/, '')
}

export function matchesRoute(path?: string, current?: string): boolean {
  const currentRoute = cleanPath(current)

  if (!path) {
    return false
  }

  return currentRoute === cleanPath(path)
}

export function matchesTree(path?: string, current?: string): boolean {
  const currentRoute = cleanPath(current)

  if (!path) {
    return false
  }

  const p = cleanPath(path)

  return currentRoute && p ?
    currentRoute.startsWith(p) :
    false
}
