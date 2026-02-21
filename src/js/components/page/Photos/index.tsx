import type {CollectionEntry} from "astro:content";
import {type ComponentProps, useMemo, useState} from 'react'
import classNames from 'clsx'

import fontStyles from '../../../../css/06_utils/fonts.module.scss'
import type {SliderEntry} from '../../organism/ImageSlider'
import ImageSlider from '../../organism/ImageSlider'
import ImageDetails from '../../organism/ImageDetails'

import NBBSmartImg, {SmartImgSettingsProvider} from './smart-img'

import styles from './index.module.scss'

export type PhotosImageEntry = CollectionEntry<'photos'>['data'] & {
  href: string
  picture?: ComponentProps<'img'> & {
    caption?: string
  }
}

export type PhotosProps = {
  images?: PhotosImageEntry[]
}

const RATIO = {
  width: 3,
  height: 2,
}

const BREAKPOINT = 720

function Photos(props: PhotosProps) {
  const {images = []} = props
  const [activeSlide, setActiveSlide] = useState(0)

  const entries: SliderEntry[] = useMemo(
    () => images.map((entry) => {
      const {
        href,
        alt,
        caption,
        picture = {},
        meta,
      } = entry

      const src = href

      let pictureCaption = picture.caption || undefined

      if (meta && !pictureCaption) {
        const parts = [
          meta.description,
        ]

        if (meta.time) {
          parts.push(`(${meta.time})`)
        }

        if (meta.camera || meta.lens) {
          const out: string[] = []

          if (meta.camera) {
            out.push(`Camera: ${meta.camera}`)
          }

          if (meta.lens) {
            out.push(`Lens: ${meta.lens}`)
          }

          parts.push(`[${out.join(', ')}]`)
        }

        pictureCaption = parts.filter(p => !!p).join(' ')
      }

      return {
        caption,
        href: src,
        picture: {
          ...picture,
          ...(pictureCaption ? {caption: pictureCaption} : {}),
          src,
          alt: alt || '',
          className: classNames(picture.className, styles['p-photos__image']),
          loading: 'lazy',
        },
        ratio: RATIO,
      }
    }),
    [images],
  )

  const meta = useMemo(
    () => images.map(entry => entry.meta),
    [images],
  )

  return (
    <SmartImgSettingsProvider
      crop="3x2"
      sizes={`(max-width: ${BREAKPOINT / 0.65}px) 95vw, 65vw`}
      maxSize={1440}
      defaultSize={320}
    >
      <ImageSlider
        ImgComponent={NBBSmartImg}
        className={fontStyles['u-font-roboto-condensed']}
        entries={entries}
        onSlideChange={(idx: number) => setActiveSlide(idx)}
      />

      {meta[activeSlide] ? (
        <ImageDetails {...meta[activeSlide]} />
      ) : null}
    </SmartImgSettingsProvider>
  )
}

export default Photos
