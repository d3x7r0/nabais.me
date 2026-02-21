import type { ReactNode } from 'react'

import Figure from '../../atom/Figure'
import { GalleryList } from '../../molecule/GalleryList'

export type GalleryInnerProps = {
  alignBottom?: boolean
  caption?: ReactNode
  children?: ReactNode
  colorMain?: string
}

function GalleryInner(props: GalleryInnerProps) {
  const {
    alignBottom,
    caption,
    children,
    colorMain,
    ...rest
  } = props

  if (caption) {
    return (
      <Figure
        {...rest}
        caption={caption}
      >
        <GalleryList
          alignBottom={alignBottom}
          colorMain={colorMain}
          noMargin
        >
          {children}
        </GalleryList>
      </Figure>
    )
  }

  return (
    <GalleryList
      alignBottom={alignBottom}
      colorMain={colorMain}
      {...rest}
    >
      {children}
    </GalleryList>
  )
}

export default GalleryInner
