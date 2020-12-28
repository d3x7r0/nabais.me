import { useMemo, useState } from 'preact/hooks'
import classNames from 'classnames'

import NBBSmartImg, { SmartImgSettingsProvider } from '../atom/smart-img'
import ImageSlider from '../organism/image-slider'
import styles from '../../../css/05_page/photos.module.scss'
import fontStyles from '../../../css/06_utils/fonts.module.scss'
import ImageDetails from '../organism/image-details'

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

      const src = `${process.env.NEXT_PUBLIC_BASE_PHOTOS_URL}${href}`

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
