// noinspection ES6UnusedImports
// eslint-disable-next-line no-unused-vars
import { h } from 'preact'
import { useContext, useEffect, useMemo } from 'preact/hooks'
import PropTypes from 'prop-types'

import { ensureID } from './utils'
import { LightboxContext } from './context'

function LightboxEntry(props) {
  const {
    src,
    caption,
    group,
    children,
    ...rest
  } = props

  const id = useMemo(
    () => ensureID(rest.id),
    [rest.id],
  )

  const { register, unregister, open } = useContext(LightboxContext) || {}

  useEffect(() => {
    if (!register) {
      return
    }

    register(
      id,
      {
        src,
        caption,
      },
      group,
    )

    return () => unregister(id, group)
  }, [id, src, caption, group, register, unregister])

  const onClick = open ? (
    (e) => {
      e.preventDefault()
      return open(id, group)
    }
  ) : undefined

  return (
    <a
      href={src}
      {...rest}
      data-lightbox-id={id}
      onClick={onClick}
    >
      {children}
    </a>
  )
}

LightboxEntry.propTypes = {
  src: PropTypes.string.isRequired,
  caption: PropTypes.node,
  group: PropTypes.string,
}

export default LightboxEntry
