import type { SliderEntry } from '../../organism/ImageSlider'
import type { CollectionEntry } from 'astro:content'
import type { ComponentProps } from 'react'

import classNames from 'clsx'
import { useMemo, useState } from 'react'

import fontStyles from '../../../../css/06_utils/fonts.module.scss'
import ImageDetails from '../../organism/ImageDetails'
import ImageSlider from '../../organism/ImageSlider'

import styles from './index.module.scss'
import NBBSmartImg from './SmartImg'
import { SmartImgSettingsProvider } from './SmartImg/provider.ts'

export type PhotosImageEntry = {
  href: string
  picture?: {
    caption?: string
  } & ComponentProps<'img'>
} & CollectionEntry<'photos'>['data']

export type PhotosProps = {
  images?: PhotosImageEntry[]
}

const RATIO = {
  height: 2,
  width: 3,
}

const BREAKPOINT = 720

function Photos(props: PhotosProps) {
  const { images = [] } = props
  const [activeSlide, setActiveSlide] = useState(0)

  const entries: SliderEntry[] = useMemo(
    () => images.map((entry) => {
      const {
        alt,
        caption,
        href,
        meta,
        picture = {},
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
          ...(pictureCaption ? { caption: pictureCaption } : {}),
          alt: alt || '',
          className: classNames(picture.className, styles['p-photos__image']),
          loading: 'lazy',
          src,
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
      defaultSize={320}
      maxSize={1440}
      sizes={`(max-width: ${BREAKPOINT / 0.65}px) 95vw, 65vw`}
    >
      <ImageSlider
        className={fontStyles['u-font-roboto-condensed']}
        entries={entries}
        ImgComponent={NBBSmartImg}
        onSlideChange={(idx: number) => setActiveSlide(idx)}
      />

      {meta[activeSlide]
        ? (
            <ImageDetails {...meta[activeSlide]} />
          )
        : null}
    </SmartImgSettingsProvider>
  )
}

export default Photos
