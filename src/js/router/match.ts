function cleanPath(path?: string) {
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
