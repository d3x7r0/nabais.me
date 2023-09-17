import type { FunctionalComponent, JSX } from 'preact'

import type { ToastProps } from '../../molecule/Toast'
import Toast from '../../molecule/Toast'
import { useLocalStorage, useMounted } from '../../../hooks'

const COOKIE_SEEN_STORAGE_KEY = 'cookie-popup-seen'

export type CookieDisclaimerProps = ToastProps & {
  text?: string

  link: JSX.HTMLAttributes['href']
  linkText?: string
  linkProps?: JSX.IntrinsicElements['a']
}

const CookieDisclaimer: FunctionalComponent<CookieDisclaimerProps> = function CookieDisclaimer(props) {
  const {
    text = 'This website uses cookies.',
    link,
    linkText = 'Learn more',
    linkProps = {},
    ...rest
  } = props

  const isMounted = useMounted()

  const [seen, setSeen] = useLocalStorage<boolean>(
    COOKIE_SEEN_STORAGE_KEY,
    false,
  )

  if (!isMounted || seen) {
    return null
  }

  return (
    <Toast
      {...rest}
      closed={seen}
      onClose={() => setSeen(true)}
    >
      {text}<br />
      <a href={link} {...linkProps}>
        {linkText}
      </a>.
    </Toast>
  )
}

export default CookieDisclaimer
