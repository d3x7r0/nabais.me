import type {ComponentProps, MouseEventHandler, ReactNode} from "react";
import {useContext, useEffect, useMemo} from 'react'

import {ensureID} from './utils'
import {LightboxContext} from './context'
import type {LightboxContextValue} from './types'

export type LightboxEntryProps = ComponentProps<'a'> & {
  src?: string,
  id?: string
  caption?: ReactNode
  group?: string,
}

function LightboxEntry(props: LightboxEntryProps) {
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

  const { register, unregister, open } = useContext<LightboxContextValue>(LightboxContext)

  useEffect(() => {
    if (!register || !src) {
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

  const onClick: MouseEventHandler<HTMLElement> | undefined = open ? (
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

export default LightboxEntry
