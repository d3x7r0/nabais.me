import { useMemo } from 'preact/hooks'
import classNames from 'classnames'

import ImageSlider from '../organism/image-slider'
import styles from '../../../css/05_page/photos.module.scss'
import fontStyles from '../../../css/06_utils/fonts.module.scss'

const Photos = ({ images = [] }) => {
  const entries = useMemo(
    () => images.map((entry) => {
      const {
        href,
        alt,
        caption,
        picture,
      } = entry

      return {
        caption,
        href,
        picture: {
          ...picture,
          src: href,
          alt,
          className: classNames(picture.className, styles['p-photos__image']),
          loading: 'lazy',
        },
        ratio: {
          width: 3,
          height: 2,
        },
      }
    }),
    [images],
  )

  return (
    <ImageSlider
      className={fontStyles['u-font-roboto-condensed']}
      entries={entries}
    />
  )
}

export default Photos
