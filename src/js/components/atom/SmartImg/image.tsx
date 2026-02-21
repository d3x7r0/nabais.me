import type { PulitzerSettings, SmartImgContextDetails, SmartImgProps } from './types.ts'

import isNil from 'lodash-es/isNil'
import isString from 'lodash-es/isString'
import omit from 'lodash-es/omit'
import pick from 'lodash-es/pick'
import { useMemo } from 'react'

import { IMAGE_PROPS, SMART_IMG_PROPS } from './constants'
import { useSmartImgSettings } from './hooks.ts'
import { buildSources } from './sources'

function parseProps(ctx: SmartImgContextDetails, props: SmartImgProps) {
  const settings: PulitzerSettings = {
    crop: props.crop || ctx.crop,
    formats: props.formats || ctx.formats,
    lazy: isNil(props.lazy) ? ctx.lazy : props.lazy,
    max: props.maxSize || ctx.maxSize,
    maxWidth: props.defaultSize || ctx.defaultSize,
    min: props.minSize || ctx.minSize,
    placeholder: props.placeholder || ctx.placeholder,
    sizes: props.sizes || ctx.sizes,
  }

  const rawImgProps = {
    ...pick(props, IMAGE_PROPS),
    ...props.imgProps,
  }

  const imgProps = {
    ...rawImgProps,
    height: typeof rawImgProps.height === 'string' ? parseInt(rawImgProps.height, 10) : rawImgProps.height,
    width: typeof rawImgProps.width === 'string' ? parseInt(rawImgProps.width, 10) : rawImgProps.width,
  }

  return {
    src: props.src,
    ...omit(props, IMAGE_PROPS.concat(SMART_IMG_PROPS)),
    imgProps,
    settings,
  }
}

const SmartImg = (props: SmartImgProps) => {
  const ctx = useSmartImgSettings()

  const {
    imgProps,
    settings,
    src,
    ...rest
  } = useMemo(
    () => parseProps(ctx, props),
    [ctx, props],
  )

  const effectiveProps = {
    ...imgProps,
  }

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
      const crop = settings.crop as { height: number, width: number }
      w = crop.width || 1
      h = crop.height || 1
    }

    // Fix width and height when crop is enabled
    if (effectiveProps.width) {
      effectiveProps.height = Math.round((effectiveProps.width as number) * h / w)
    } else if (effectiveProps.height) {
      effectiveProps.width = Math.round((effectiveProps.height as number) * w / h)
    }
  }

  if (settings.lazy) {
    effectiveProps.loading = 'lazy'
  }

  return (
    <picture {...rest}>
      {sources.map(entry => (
        <source
          key={entry.format}
          sizes={settings.sizes}
          srcSet={entry.srcSet}
          type={entry.type}
        />
      ))}

      <img
        alt=""
        {...omit(effectiveProps, ['sizes'])}
        src={imgSrc}
      />
    </picture>
  )
}

export default SmartImg
