import type { ReactNode } from 'react'

const MAP_LABEL = 'Map'

export type ImageDetailsLocationProps = {
  href?: string
  value?: ReactNode
}

function ImageDetailsLocation(props: ImageDetailsLocationProps): ReactNode {
  const {
    href,
    value,
  } = props

  if (!href) {
    return value
  }

  const map = <a href={href}>{MAP_LABEL}</a>

  if (!value) {
    return map
  }

  return (
    <>
      {value}
      {' '}
      [
      {map}
      ]
    </>
  )
}

export default ImageDetailsLocation
