import type {ReactNode} from "react";

import Figure from '../../atom/Figure'
import GalleryList from '../../molecule/GalleryList'

export type GalleryInnerProps = {
  alignBottom?: boolean
  colorMain?: string
  caption?: ReactNode
  children?: ReactNode
}

function GalleryInner(props: GalleryInnerProps) {
  const {
    caption,
    children,
    alignBottom,
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
          noMargin
          alignBottom={alignBottom}
          colorMain={colorMain}
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
