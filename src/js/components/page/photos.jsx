import { useMemo } from 'preact/hooks'
import classNames from 'classnames'

import NBBSmartImg, { SmartImgSettingsProvider } from '../atom/smart-img'
import ImageSlider from '../organism/image-slider'
import styles from '../../../css/05_page/photos.module.scss'
import fontStyles from '../../../css/06_utils/fonts.module.scss'

const RATIO = {
  width: 3,
  height: 2,
}

const BREAKPOINT = 720

const Photos = ({ images = [] }) => {
  const entries = useMemo(
    () => images.map((entry) => {
      const {
        href,
        alt,
        caption,
        picture,
      } = entry

      const src = `${process.env.NEXT_PUBLIC_BASE_PHOTOS_URL}${href}`

      return {
        caption,
        href: src,
        picture: {
          ...picture,
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
      />
    </SmartImgSettingsProvider>
  )
}

export default Photos
