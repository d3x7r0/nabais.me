/** @jsx h */
import { h } from 'preact'
import { Gallery } from '@nonsensebb/components'

import styles from '../../../css/06_utils/fonts.module.scss'

const Photos = ({ images = [] }) => (
  <Gallery
    lightbox
    className={styles['u-font-roboto-condensed']}
    entries={images.map(({ href, src, alt, caption, picture }) => ({
      caption,
      href,
      picture: {
        ...picture,
        src,
        alt,
      },
    }))}
  />
)

export default Photos
