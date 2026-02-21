import type { ComponentProps } from 'react'

import isString from 'lodash-es/isString'
import omit from 'lodash-es/omit'
import { useMemo } from 'react'

import { SMART_IMG_PROPS, SmartImg } from '../../../atom/SmartImg'
import { shouldTransform } from '../utils.ts'

export type NBBSmartImgProps = {
  imgProps?: ComponentProps<'img'>
} & ComponentProps<'img'>

function NBBSmartImg(props: NBBSmartImgProps) {
  const {
    imgProps,
    src,
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
        imgProps={imgProps}
        src={src}
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

export default NBBSmartImg
