/** @jsx h */
import { h } from 'preact'
import { Gallery } from '@nonsensebb/components'
import classNames from 'classnames'

import styles from '../../../css/05_page/photos.module.scss'
import fontStyles from '../../../css/06_utils/fonts.module.scss'

const Photos = ({ images = [] }) => (
  <Gallery
    lightbox
    className={fontStyles['u-font-roboto-condensed']}
    entries={images.map((entry) => {
      const {
        href,
        src,
        srcset,
        alt,
        caption,
        picture,
      } = entry

      return {
        caption,
        href,
        picture: {
          ...picture,
          src,
          srcset,
          alt,
          className: classNames(picture.className, styles['p-photos__image']),
          loading: 'lazy',
        },
        ratio: {
          width: 1,
          height: 1,
        },
      }
    })}
  />
)

export default Photos
