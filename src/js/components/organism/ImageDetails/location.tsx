import type { FunctionalComponent, JSX, ComponentChild, VNode } from 'preact'

const MAP_LABEL = 'Map'

export type ImageDetailsLocationProps = {
  href?: JSX.HTMLAttributes['href']
  value?: ComponentChild
}

const ImageDetailsLocation: FunctionalComponent<ImageDetailsLocationProps> = function ImageDetailsLocation(props) {
  const {
    value,
    href,
  } = props

  if (!href) {
    return value as VNode
  }

  const map = <a href={href}>{MAP_LABEL}</a>

  if (!value) {
    return map
  }

  return (<>{value} [{map}]</>)
}

export default ImageDetailsLocation
