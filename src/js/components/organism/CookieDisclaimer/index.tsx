import type { ToastProps } from '../../molecule/Toast'
import type { ComponentProps } from 'react'

import { useLocalStorage } from '../../../hooks/storage'
import Toast from '../../molecule/Toast'

const COOKIE_SEEN_STORAGE_KEY = 'cookie-popup-seen'

export type CookieDisclaimerProps = {
  link: string

  linkProps?: ComponentProps<'a'>
  linkText?: string
  text?: string
} & Omit<ToastProps, 'children'>

function CookieDisclaimer(props: CookieDisclaimerProps) {
  const {
    link,
    linkProps = {},
    linkText = 'Learn more',
    text = 'This website uses cookies.',
    ...rest
  } = props

  const [seen, setSeen] = useLocalStorage<boolean>(
    COOKIE_SEEN_STORAGE_KEY,
    false,
  )

  if (seen) {
    return null
  }

  return (
    <Toast
      {...rest}
      closed={seen}
      onClose={() => setSeen(true)}
    >
      {text}
      <br />
      <a href={link} {...linkProps}>
        {linkText}
      </a>
      .
    </Toast>
  )
}

export default CookieDisclaimer
