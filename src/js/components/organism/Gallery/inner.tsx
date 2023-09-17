import type { ComponentChild, FunctionalComponent } from 'preact'

import Figure from '../../atom/Figure'
import GalleryList from '../../molecule/GalleryList'

export type GalleryInnerProps = {
  alignBottom?: boolean
  colorMain?: string
  caption?: ComponentChild
}

const GalleryInner: FunctionalComponent<GalleryInnerProps> = function GalleryInner(props) {
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
