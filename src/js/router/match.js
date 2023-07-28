function cleanPath(path) {
  if (!path) {
    return
  }

  return path.replace(/\?.+$/, '').replace(/\/?$/, '')
}

export function matchesRoute(path, current) {
  const currentRoute = cleanPath(current)
  return path && currentRoute === cleanPath(path)
}
