import type {ComponentPropsWithoutRef, ReactNode} from 'react'

export type PulitzerImageFormat = 'png' | 'jpg' | 'jpeg' | 'webp' | 'avif'

export type PulitzerSettings = {
  min?: number
  max?: number
  width?: number
  height?: number
  fit?: boolean
  maxWidth?: number
  sizes?: string
  lazy?: boolean
  placeholder?: boolean | string
  crop?: string | { width: number; height: number }
  formats: PulitzerImageFormat[]
}

export type SmartImgContext = {
  minSize?: number
  maxSize?: number
  defaultSize?: number
  sizes?: string
  lazy?: boolean
  placeholder?: boolean | string
  crop?: string | { width: number; height: number }
  formats: PulitzerImageFormat[]
}

export type SmartImgProps = ComponentPropsWithoutRef<'picture'> &
  Partial<Omit<SmartImgContext, 'formats'>> & {
    src?: string
    formats?: PulitzerImageFormat[]
    imgProps?: ComponentPropsWithoutRef<'img'>
    width?: number | string
    height?: number | string
    alt?: string
  }

export type PulitzerFormatDef = {
  format: PulitzerImageFormat
  type: string
  enabled: (settings: PulitzerSettings, contentType?: string) => boolean
}

export type PulitzerProcessingOpts = {
  crop?: string
  format?: string
  maxWidth?: number
  placeholder?: boolean
}

export type SmartImgProviderProps = Partial<SmartImgContext> & {
  children?: ReactNode
}
