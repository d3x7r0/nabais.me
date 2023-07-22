// noinspection ES6UnusedImports
// eslint-disable-next-line no-unused-vars
import { h } from 'preact'
import { useMemo, useState } from 'preact/hooks'
import classNames from 'clsx'


import fontStyles from '../../../../css/06_utils/fonts.module.scss'
import ImageSlider from '../../organism/ImageSlider'
import ImageDetails from '../../organism/ImageDetails'

import styles from './index.module.scss'
import NBBSmartImg, { SmartImgSettingsProvider } from './smart-img'

const RATIO = {
  width: 3,
  height: 2,
}

const BREAKPOINT = 720

const Photos = ({ images = [] }) => {
  const [activeSlide, setActiveSlide] = useState(0)

  const entries = useMemo(
    () => images.map((entry) => {
      const {
        href,
        alt,
        caption,
        picture = {},
        meta,
      } = entry

      const src = `${import.meta.env.PUBLIC_BASE_PHOTOS_URL || ""}${href}`

      let pictureCaption = picture.caption || undefined

      if (meta && !pictureCaption) {
        const parts = [
          meta.description,
        ]

        if (meta.time) {
          parts.push(`(${meta.time})`)
        }

        if (meta.camera || meta.lens) {
          const out = []

          if (meta.camera) {
            out.push(`Camera: ${meta.camera}`)
          }

          if (meta.lens) {
            out.push(`Lens: ${meta.lens}`)
          }

          parts.push(`[${out.join(', ')}]`)
        }

        pictureCaption = parts.filter(entry => !!entry).join(' ')
      }

      return {
        caption,
        href: src,
        picture: {
          ...picture,
          ...(pictureCaption ? { caption: pictureCaption } : {}),
          src,
          alt,
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
        onSlideChange={(idx) => setActiveSlide(idx)}
      />

      {meta[activeSlide] ? (
        <ImageDetails {...meta[activeSlide]} />
      ) : null}
    </SmartImgSettingsProvider>
  )
}

export default Photos
