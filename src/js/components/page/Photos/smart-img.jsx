// noinspection ES6UnusedImports
// eslint-disable-next-line no-unused-vars
import { h } from 'preact'
import { useMemo } from 'preact/hooks'
import { URL } from 'iso-url'
import isString from 'lodash-es/isString'
import omit from 'lodash-es/omit'

import { ENABLE_TRANSFORMED_IMAGES } from '@/js/config'
import SmartImg, { SMART_IMG_PROPS, withFormats } from '@/components/atom/SmartImg'

const ENABLED_FORMATS = [
  'jpeg',
  'png',
  ...import.meta.env?.PUBLIC_ENABLE_AVIF === 'true' ? ['avif'] : [],
  ...import.meta.env?.PUBLIC_ENABLE_WEBP !== 'false' ? ['webp'] : [],
]

export const SmartImgSettingsProvider = withFormats(ENABLED_FORMATS)

function NBBSmartImg(props) {
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

export function shouldTransform(src) {
  if (!ENABLE_TRANSFORMED_IMAGES) {
    return false
  }

  // skip for gifs
  // TODO: remove when pulitzer supports gifs
  if (src && src.toLowerCase().endsWith('.gif')) {
    return false
  }

  return isStaticURL(src)
}

export function isStaticURL(src) {
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
