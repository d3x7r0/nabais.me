import type { LightboxContextValue } from './types'
import type { ComponentProps, MouseEventHandler, ReactNode } from 'react'

import { useContext, useEffect, useMemo } from 'react'

import { LightboxContext } from './context'
import { ensureID } from './utils'

export type LightboxEntryProps = {
  caption?: ReactNode
  group?: string
  id?: string
  src?: string
} & ComponentProps<'a'>

function LightboxEntry(props: LightboxEntryProps) {
  const {
    caption,
    children,
    group,
    src,
    ...rest
  } = props

  const id = useMemo(
    () => ensureID(rest.id),
    [rest.id],
  )

  const { open, register, unregister } = useContext<LightboxContextValue>(LightboxContext)

  useEffect(() => {
    if (!register || !src) {
      return
    }

    register(
      id,
      {
        caption,
        src,
      },
      group,
    )

    return () => unregister(id, group)
  }, [id, src, caption, group, register, unregister])

  const onClick: MouseEventHandler<HTMLElement> | undefined = open
    ? (e) => {
        e.preventDefault()
        return open(id, group)
      }
    : undefined

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
