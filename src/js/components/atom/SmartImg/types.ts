import type { ComponentPropsWithoutRef, ReactNode } from 'react'

export type PulitzerFormatDef = {
  format: PulitzerImageFormat
  type: string
  enabled: (settings: PulitzerSettings, contentType?: string) => boolean
}

export type PulitzerImageFormat = 'avif' | 'jpeg' | 'jpg' | 'png' | 'webp'

export type PulitzerProcessingOpts = {
  crop?: string
  format?: string
  maxWidth?: number
  placeholder?: boolean
}

export type PulitzerSettings = {
  crop?: { height: number, width: number } | string
  fit?: boolean
  formats: PulitzerImageFormat[]
  height?: number
  lazy?: boolean
  max?: number
  maxWidth?: number
  min?: number
  placeholder?: boolean | string
  sizes?: string
  width?: number
}

export type SmartImgContextDetails = {
  crop?: { height: number, width: number } | string
  defaultSize?: number
  formats: PulitzerImageFormat[]
  lazy?: boolean
  maxSize?: number
  minSize?: number
  placeholder?: boolean | string
  sizes?: string
}

export type SmartImgProps = {
  alt?: string
  formats?: PulitzerImageFormat[]
  height?: number | string
  imgProps?: ComponentPropsWithoutRef<'img'>
  src?: string
  width?: number | string
}
& ComponentPropsWithoutRef<'picture'> & Partial<Omit<SmartImgContextDetails, 'formats'>>

export type SmartImgProviderProps = {
  children?: ReactNode
} & Partial<SmartImgContextDetails>
