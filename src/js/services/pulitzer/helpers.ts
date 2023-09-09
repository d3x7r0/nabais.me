import type { ImageMetadata, ImageOutputFormat } from 'astro'

import { isImageMetadata } from './types.ts'

export function getImageSrc(img: ImageMetadata | string): string | undefined {
  const src = isImageMetadata(img) ? img.src : img

  if (!src?.toLowerCase) {
    return
  }
}

export function guessContentType(src: string): ImageOutputFormat | undefined {
  if (src.toLowerCase().endsWith('.avif')) {
    return 'avif'
  }

  if (src.toLowerCase().endsWith('.webp')) {
    return 'webp'
  }

  if (src.toLowerCase().endsWith('.png')) {
    return 'png'
  }

  if (src.toLowerCase().endsWith('.jpeg') || src.toLowerCase().endsWith('.jpg')) {
    return 'jpg'
  }
}
