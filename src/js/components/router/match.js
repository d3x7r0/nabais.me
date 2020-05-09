import { useMemo } from 'preact/hooks'
import { useRouter } from 'next/router'

export const useRoute = (path) => {
  const router = useRouter()

  return useMemo(() => {
    const currentRoute = router.asPath.replace(/\?.+$/, '')
    const matches = currentRoute === path

    return { matches, currentRoute }
  }, [path, router.asPath])
}
