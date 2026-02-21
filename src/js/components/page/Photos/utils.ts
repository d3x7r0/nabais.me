import { ENABLE_TRANSFORMED_IMAGES } from '../../../config.ts'

export function isStaticURL(src: string | null): boolean {
  if (src === null) {
    return false
  }

  try {
    const staticHost = new URL(import.meta.env.PUBLIC_BASE_PHOTOS_URL)
    const parsedURL = new URL(src)

    return staticHost.hostname === parsedURL.hostname
  } catch (_) {
    // Ignore errors and just return false
  }

  return false
}

export function shouldTransform(src?: string): boolean {
  if (!ENABLE_TRANSFORMED_IMAGES || !src) {
    return false
  }

  // skip for gifs
  // TODO: remove when pulitzer supports gifs
  if (src.toLowerCase().endsWith('.gif')) {
    return false
  }

  return isStaticURL(src)
}
