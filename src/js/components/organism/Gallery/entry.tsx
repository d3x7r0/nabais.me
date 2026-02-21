import type { FigureProps } from '../../atom/Figure'
import type { JSX, ReactNode } from 'react'

import Figure from '../../atom/Figure'
import { LightboxEntry } from '../../molecule/Lightbox'

export type GalleryEntryProps = {
  alt?: string
  href?: string
  ImgElement?: JSX.ElementType
  lightbox?: string
  picture: {
    alt?: string
    caption?: ReactNode
    src: string
  }
} & Omit<FigureProps, 'children'>

function GalleryEntry(props: GalleryEntryProps) {
  const {
    alt,
    href,
    ImgElement = 'img',
    lightbox,
    picture,
    ...rest
  } = props

  const img = (
    <ImgElement alt={alt} {...picture} />
  )

  let inner = img

  if (lightbox) {
    inner = (
      <LightboxEntry
        caption={picture.caption || rest.caption}
        group={lightbox}
        src={href ?? picture.src}
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
