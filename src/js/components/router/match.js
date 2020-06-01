import { useMemo } from 'preact/hooks'
import { useRouter } from 'next/router'

export const useRoute = (path) => {
  const router = useRouter()

  return useMemo(() => {
    const currentRoute = cleanPath(router.asPath)
    const matches = path && currentRoute === cleanPath(path)

    return {
      matches,
      currentRoute,
    }
  }, [path, router.asPath])
}

function cleanPath(path) {
  if (!path) {
    return
  }

  return path.replace(/\?.+$/, '').replace(/\/?$/, '')
}
