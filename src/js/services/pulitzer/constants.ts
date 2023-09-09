import type { ImageOutputFormat } from 'astro'

export const SUPPORTED_FORMATS: ImageOutputFormat[] = [
  // 'avif', // Disabled due to performance impact
  'webp',
  'png',
  'jpg',
]

export const ContentTypes: Record<ImageOutputFormat, string> = {
  'avif': 'image/avif',
  'webp': 'image/webp',
  'png': 'image/png',
  'jpg': 'image/jpeg',
  'jpeg': 'image/jpeg',
  'svg': 'application/svg'
}

export const DEFAULT_IMAGE_WIDTHS = [
  120,
  160,
  240,
  320,
  480,
  768,
  920,
  1280,
  1600,
  1920,
  2560,
  3840,
]
