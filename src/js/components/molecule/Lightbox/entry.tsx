import type { ComponentChild, FunctionalComponent, JSX } from 'preact'
import { useContext, useEffect, useMemo } from 'preact/hooks'

import { ensureID } from './utils.ts'
import { LightboxContext } from './context.ts'
import type { LightboxContextValue } from './types.ts'

export type LightboxEntryProps = {
  src: string,
  id?: string
  caption?: ComponentChild
  group?: string,
}

const LightboxEntry: FunctionalComponent<LightboxEntryProps> = function LightboxEntry(props) {
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

  const onClick: JSX.MouseEventHandler<HTMLElement> | undefined = open ? (
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
