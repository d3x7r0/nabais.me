import type { ImageMetadata, ImageOutputFormat } from 'astro'
import { getImage } from 'astro:assets'

import { calculateSizes } from '../../components/atom/SmartImg'

import type { BuildSourcesOptions, BuildSourcesResult, PulitzerImageOptions } from './types.ts'
import { ContentTypes, DEFAULT_IMAGE_WIDTHS, SUPPORTED_FORMATS } from './constants.ts'

export async function buildSources(
  src: ImageMetadata | string,
  options: BuildSourcesOptions,
): Promise<BuildSourcesResult> {

  if (!('crop' in options) && !('width' in options) && !('height' in options)) {
    throw new Error('Either crop or width/height need to be set')
  }

  if (options.max && options.min && options.max <= options.min) {
    throw new Error('Min size has to be lower than Max')
  }

  const unsupportedFormats = options.formats
    ?.filter(format => !SUPPORTED_FORMATS.includes(format))

  if (unsupportedFormats?.length) {
    throw new Error(`Unsupported formats in sources format list: ${unsupportedFormats.join(', ')}`)
  }

  const baseOptions: Partial<PulitzerImageOptions> = 'crop' in options ? {
    crop: options.crop,
    quality: options.quality,
    fit: options.fit,
  } : {
    width: options.width,
    height: options.height,
    quality: options.quality,
    fit: options.fit,
  }

  const widths = calculateSizes(
    options,
    options.candidateWidths ?? DEFAULT_IMAGE_WIDTHS
  )

  const crop = 'crop' in options
    ? options.crop
    : `${options.width}x${options.height}`

  const formats = options.formats = SUPPORTED_FORMATS

  const [img, sources] = await Promise.all([
    getImage({ ...options.img, crop, src }),
    Promise.all(
      formats.map(format => buildSourceEntry(format, widths, src, baseOptions)),
    ),
  ])

  return {
    img,
    sources: sources.map(entry => ({
      ...entry,
      attributes: {
        ...entry.attributes,
        sizes: options.sizes,
      }
    }))
  }
}

async function buildSourceEntry(
  format: ImageOutputFormat,
  widths: number[],
  src: ImageMetadata | string,
  options: Partial<PulitzerImageOptions>,
) {
  const srcset = await Promise.all(
    widths.map(async maxWidth => {
      const opts: PulitzerImageOptions = {
        ...options,
        src,
        format,
        maxWidth,
      }

      const value = await getImage(opts)

      return `${value.src} ${maxWidth}w`
    })
  )

  return {
    srcset,
    attributes: {
      type: ContentTypes[format],
    },
  }
}
