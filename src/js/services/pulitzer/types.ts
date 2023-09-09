import type {
  ImageMetadata,
  ImageOutputFormat,
  ImageQuality,
  ImageTransform,
  GetImageResult,
} from 'astro'

export type PulitzerServiceConfig = {
  baseUrl: string | URL
}

export enum PulitzerFitValue {
  COVER = 'cover',
  CONTAIN = 'contain',
  FILL = 'fill',
  INSIDE = 'inside',
  OUTSIDE = 'outside',
}

export type PulitzerImageOptions = ImageTransform & {
  maxWidth?: number
  fit?: PulitzerFitValue
  placeholder?: boolean
  crop?: string
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isImageMetadata(val: any): val is ImageMetadata {
  return val && 'src' in val
}

export type BuildSourcesOptions = {
  img: Omit<PulitzerImageOptions, 'src' | 'crop' | 'width' | 'height'>
  sizes: string
  min?: number
  max?: number
  quality?: ImageQuality | undefined
  formats?: ImageOutputFormat[]
  fit?: PulitzerFitValue
  candidateWidths?: number[]
} & (
  { crop: string } | { width: number, height: number }
)

export type BuildSourcesResult = {
  img: GetImageResult
  sources: Array<{
    srcset: string[],
    attributes: {
      type: string
      sizes: string
      [key: string]: string
    }
  }>
}
