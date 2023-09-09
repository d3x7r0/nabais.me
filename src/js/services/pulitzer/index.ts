import type { ExternalImageService } from 'astro'
import omit from 'lodash-es/omit'

import type { PulitzerImageOptions, PulitzerServiceConfig } from './types.ts'
import { PulitzerFitValue } from './types.ts'
import { SUPPORTED_FORMATS } from './constants.ts'
import { getImageSrc, guessContentType } from './helpers.ts'

const PROCESSING_URI_LOCATION_REGEX = /(\w)\/([^/]+)$/
const CROP_REGEX = /(\d+)x(\d+)/

const PulitzerImageService: ExternalImageService<PulitzerServiceConfig> = {
  validateOptions(options: PulitzerImageOptions): PulitzerImageOptions {
    if (options.crop && !CROP_REGEX.test(options.crop)) {
      console.warn(`Unsupported crop ${options.crop}`)
      options.crop = undefined
    }

    // always convert jpeg to jpg internally
    if (options.format === 'jpeg') {
      options.format = 'jpg'
    }

    if (options.format && !SUPPORTED_FORMATS.includes(options.format)) {
      console.warn(`Unsupported output format: ${options.format}`)
      options.format = undefined
    }

    if (options.height && !options.width) {
      console.warn('Height has no effect when width is not defined')
    }

    if (options.fit && !(options.fit in Object.values(PulitzerFitValue))) {
      console.warn(`Unsupported fit value: ${options.fit}`)
      options.fit = undefined
    }

    return options
  },

  getURL(options: PulitzerImageOptions, imageConfig): string {
    const src = getImageSrc(options.src)

    if (!src) {
      return src ?? ''
    }

    const originalFormat = guessContentType(src)
    const parts = []

    if (options.width && options.height && !options.crop) {
      parts.push(`${options.width}x${options.height}`)
    }

    if (options.maxWidth) {
      parts.push(`mw-${options.maxWidth}`)
    }

    if (options.fit) {
      parts.push(options.fit)
    }

    if (!originalFormat || options.format !== originalFormat) {
      if (options.format) {
        parts.push(`ff-${options.format.toLowerCase()}`)
      }
    }

    if (options.placeholder) {
      parts.push('preview')
    }

    if (options.crop) {
      parts.push(options.crop)
    }

    // No transformations needed
    if (!parts.length) {
      return new URL(src, imageConfig.service.config.baseUrl).toString()
    }

    return new URL(
      src.replace(
        PROCESSING_URI_LOCATION_REGEX,
        `$1/__processed/${parts.join('/')}/_/$2`,
      ),
      imageConfig.service.config.baseUrl,
    ).toString()
  },

  getHTMLAttributes(options: PulitzerImageOptions) {
    const attributes = omit(
      options,
      'src', 'format', 'quality', 'fit', 'placeholder', 'crop',
    )

    return {
      ...attributes,
      loading: options.loading ?? 'lazy',
      decoding: options.decoding ?? 'async',
    }
  },
}

export default PulitzerImageService
