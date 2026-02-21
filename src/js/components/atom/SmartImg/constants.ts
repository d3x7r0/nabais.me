import type { PulitzerImageFormat, PulitzerFormatDef } from './types'

export const SMART_IMG_PROPS = [
  'minSize',
  'maxSize',
  'defaultSize',
  'sizes',
  'lazy',
  'placeholder',
  'crop',
  'formats',
  'imgProps',
]

export const IMAGE_PROPS = [
  'width',
  'height',
  'alt',
  'sizes',
  'onLoad',
]

export const DEFAULT_FORMATS: PulitzerImageFormat[] = [
  'png',
  'jpg',
  'webp',
  // TODO: enable when pulitzer supports it
  // 'avif',
]

export const FORMATS: PulitzerFormatDef[] = [
  {
    format: 'avif',
    type: 'image/avif',
    enabled: (settings) => settings.formats.includes('avif'),
  },
  {
    format: 'webp',
    type: 'image/webp',
    enabled: (settings) => settings.formats.includes('webp'),
  },
  {
    format: 'png',
    type: 'image/png',
    enabled: (settings, contentType) =>
      settings.formats.includes('png') && contentType === 'image/png',
  },
  {
    format: 'jpeg',
    type: 'image/jpeg',
    enabled: (settings, contentType) => {
      const { formats } = settings
      // Enable JPEG if original image is JPEG or one of WebP/AVIF which have low browser support
      return (formats.includes('jpeg') || formats.includes('jpg')) && (
        contentType === 'image/jpeg' ||
        contentType === 'image/webp' ||
        contentType === 'image/avif'
      )
    },
  },
]
