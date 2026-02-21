import type { ComponentProps } from 'react'
import { useMemo } from 'react'
import isString from 'lodash-es/isString'
import omit from 'lodash-es/omit'

import { ENABLE_TRANSFORMED_IMAGES } from '../../../config'
import SmartImg, { SMART_IMG_PROPS, withFormats } from '../../atom/SmartImg'
import type {PulitzerImageFormat} from "../../atom/SmartImg/types.ts";

const ENABLED_FORMATS: PulitzerImageFormat[] = [
  'jpeg',
  'png',
  ...import.meta.env?.PUBLIC_ENABLE_AVIF === 'true' ? ['avif' as PulitzerImageFormat] : [],
  ...import.meta.env?.PUBLIC_ENABLE_WEBP !== 'false' ? ['webp' as PulitzerImageFormat] : [],
]

export const SmartImgSettingsProvider = withFormats(ENABLED_FORMATS)

export type NBBSmartImgProps = ComponentProps<'img'> & {
  imgProps?: ComponentProps<'img'>
}

function NBBSmartImg(props: NBBSmartImgProps) {
  const {
    src,
    imgProps,
    ...rest
  } = props

  const enabled = useMemo(
    () => shouldTransform(src),
    [src],
  )

  if (rest.width && isString(rest.width)) {
    rest.width = parseInt(rest.width)
  }

  if (rest.height && isString(rest.height)) {
    rest.height = parseInt(rest.height)
  }

  if (enabled) {
    return (
      <SmartImg
        src={src}
        imgProps={imgProps}
        {...rest}
      />
    )
  }

  const fallthroughProps = omit(rest, SMART_IMG_PROPS)

  return (
    <img
      alt=""
      {...fallthroughProps}
      {...imgProps}
      src={src}
    />
  )
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

export function isStaticURL(src: string | null): boolean {
  if (src === null) {
    return false
  }

  try {
    const staticHost = new URL(import.meta.env.PUBLIC_BASE_PHOTOS_URL)
    const parsedURL = new URL(src)

    return staticHost.hostname === parsedURL.hostname
  } catch (e) {
    // Ignore errors and just return false
  }

  return false
}

export default NBBSmartImg
