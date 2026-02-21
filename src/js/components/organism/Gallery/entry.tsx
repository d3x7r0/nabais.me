import type { JSX, ReactNode} from "react";

import LightboxEntry from '../../molecule/Lightbox'
import Figure, {type FigureProps} from '../../atom/Figure'

export type GalleryEntryProps = Omit<FigureProps, 'children'> & {
  href?: string
  alt?: string
  lightbox?: string
  ImgElement?: JSX.ElementType
  picture: {
    src: string
    alt?: string
    caption?: ReactNode
  }
}

function GalleryEntry(props: GalleryEntryProps) {
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
