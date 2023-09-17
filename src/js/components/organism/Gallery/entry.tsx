import type { ComponentChild, FunctionalComponent, JSX } from 'preact'

import LightboxEntry from '../../molecule/Lightbox'
import Figure from '../../atom/Figure'

export type GalleryEntryProps = {
  id?: string
  href?: string
  alt?: string
  lightbox?: string
  caption?: ComponentChild
  ImgElement?: JSX.ElementType
  picture: {
    src: string
    alt?: string
    caption?: ComponentChild
  }
}

const GalleryEntry: FunctionalComponent<GalleryEntryProps> = function GalleryEntry(props) {
  const {
    picture,
    alt,
    href,
    lightbox,
    ImgElement = 'img',
    ...rest
  } = props

  const img = (
    <ImgElement alt={alt} {...picture} />
  )

  let inner = img

  if (lightbox) {
    inner = (
      <LightboxEntry
        src={href ?? picture.src}
        group={lightbox}
        caption={picture.caption || rest.caption}
      >
        {img}
      </LightboxEntry>
    )
  } else if (href) {
    inner = (
      <a href={href}>
        {img}
      </a>
    )
  }

  return (
    <Figure {...rest}>
      {inner}
    </Figure>
  )
}

export default GalleryEntry
