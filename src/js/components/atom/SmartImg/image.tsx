import { useMemo } from 'react'
import isString from 'lodash-es/isString'
import omit from 'lodash-es/omit'
import pick from 'lodash-es/pick'
import isNil from 'lodash-es/isNil'

import { buildSources } from './sources'
import { useSmartImgSettings } from './context'
import { IMAGE_PROPS, SMART_IMG_PROPS } from './constants'
import type {PulitzerSettings, SmartImgContext, SmartImgProps} from "./types.ts";

function parseProps(ctx: SmartImgContext, props: SmartImgProps) {
  const settings: PulitzerSettings = {
    min: props.minSize || ctx.minSize,
    max: props.maxSize || ctx.maxSize,
    maxWidth: props.defaultSize || ctx.defaultSize,
    sizes: props.sizes || ctx.sizes,
    lazy: isNil(props.lazy) ? ctx.lazy : props.lazy,
    placeholder: props.placeholder || ctx.placeholder,
    crop: props.crop || ctx.crop,
    formats: props.formats || ctx.formats,
  }

  const rawImgProps = {
    ...pick(props, IMAGE_PROPS),
    ...props.imgProps,
  }

  const imgProps = {
    ...rawImgProps,
    width: typeof rawImgProps.width === 'string' ? parseInt(rawImgProps.width, 10) : rawImgProps.width,
    height: typeof rawImgProps.height === 'string' ? parseInt(rawImgProps.height, 10) : rawImgProps.height,
  }

  return {
    src: props.src,
    ...omit(props, IMAGE_PROPS.concat(SMART_IMG_PROPS)),
    settings,
    imgProps,
  }
}

const SmartImg = (props: SmartImgProps) => {
  const ctx = useSmartImgSettings()

  const {
    src,
    settings,
    imgProps,
    ...rest
  } = useMemo(
    () => parseProps(ctx, props),
    [ctx, props],
  )

  const [imgSrc, sources] = useMemo(
    () => buildSources(src, settings),
    [src, settings],
  )

  if (settings.crop) {
    let w: number
    let h: number

    if (isString(settings.crop)) {
      const [width, height] = settings.crop.trim().toLowerCase().split('x')
      w = parseFloat(width) || 1
      h = parseFloat(height) || 1
    } else {
      const crop = settings.crop as { width: number; height: number }
      w = crop.width || 1
      h = crop.height || 1
    }

    // Fix width and height when crop is enabled
    if (imgProps.width) {
      imgProps.height = Math.round((imgProps.width as number) * h / w)
    } else if (imgProps.height) {
      imgProps.width = Math.round((imgProps.height as number) * w / h)
    }
  }

  if (settings.lazy) {
    imgProps.loading = 'lazy'
  }

  return (
    <picture {...rest}>
      {sources.map(entry => (
        <source
          key={entry.format}
          srcSet={entry.srcSet}
          sizes={settings.sizes}
          type={entry.type}
        />
      ))}

      <img
        alt=""
        {...omit(imgProps, ['sizes'])}
        src={imgSrc}
      />
    </picture>
  )
}

export default SmartImg
