function cleanPath(path?: string) {
  if (!path) {
    return
  }

  return path.replace(/\?.+$/, '').replace(/\/?$/, '')
}

export function matchesRoute(path?: string, current?: string) {
  const currentRoute = cleanPath(current)
  const currentPath = cleanPath(path)

  if (!path) {
    return {
      matches: false,
      exact: false,
    }
  }

  return {
    matches: currentPath && currentRoute?.startsWith(currentPath),
    exact: currentRoute === currentPath,
  }
}
