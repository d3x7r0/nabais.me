/** @jsx h */
import { h } from 'preact'

import Gallery from '../organism/gallery'

const Photos = ({ images = [] }) => (
  <Gallery
    lightbox
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
