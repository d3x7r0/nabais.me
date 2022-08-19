import { useContext, useMemo } from 'preact/hooks'

import { RouterContext } from './context'

export const useRoute = (path, current) => {
  const ctxValue = useContext(RouterContext)
  current = current || ctxValue

  return useMemo(() => {
    const currentRoute = cleanPath(current)
    const matches = path && currentRoute === cleanPath(path)

    return {
      matches,
      currentRoute,
    }
  }, [path, current])
}

function cleanPath(path) {
  if (!path) {
    return
  }

  return path.replace(/\?.+$/, '').replace(/\/?$/, '')
}
