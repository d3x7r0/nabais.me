import isString from 'lodash-es/isString'

import {addProcessing} from './processing.ts'
import {guessContentType} from './utils.ts'
import {calculateSizes} from './sizes.ts'
import {FORMATS} from './constants'
import type {PulitzerImageFormat, PulitzerProcessingOpts, PulitzerSettings,} from './types'

export function buildSources(
  src: string | undefined,
  settings: PulitzerSettings
): [string, Array<{ format: PulitzerImageFormat, type: string, sizes: number[], srcSet: string }>] {
  const processingOpts: PulitzerProcessingOpts = {}

  if (settings.crop) {
    processingOpts.crop = isString(settings.crop) ?
      settings.crop :
      `${settings.crop.width}x${settings.crop.height}`
  }

  const sources = src ? buildSourceSet(settings, src, processingOpts) : []
  const imgSrc = buildImageSrc(settings, src, processingOpts) as string

  return [imgSrc, sources]
}

function buildSourceSet(
  settings: PulitzerSettings,
  src: string,
  processingOpts: PulitzerProcessingOpts
): Array<{ format: PulitzerImageFormat, type: string, sizes: number[], srcSet: string }> {
  const contentType = guessContentType(src)

  const sizes = calculateSizes(settings)

  return FORMATS
    .filter(f => f.type === contentType || f.enabled(settings, contentType))
    .map(f => {
      const srcSet = sizes.map((size) => {
        const sizeSrc = addProcessing(src, {
          ...processingOpts,
          ...(f.type === contentType ? {} : {format: f.format}),
          maxWidth: size,
        })

        return `${sizeSrc} ${size}w`
      }).join(', ')

      return {
        format: f.format,
        type: f.type,
        sizes: sizes,
        srcSet,
      }
    })
}

function buildImageSrc(
  settings: PulitzerSettings,
  src: string | undefined,
  processingOpts: PulitzerProcessingOpts
): string | undefined {
  if (settings.placeholder === true) {
    return addProcessing(src, {
      ...processingOpts,
      placeholder: true,
    })
  }

  if (isString(settings.placeholder)) {
    return settings.placeholder
  }

  if (settings.maxWidth) {
    return addProcessing(src, {
      ...processingOpts,
      maxWidth: settings.maxWidth,
    })
  }

  return addProcessing(src, processingOpts)
}
