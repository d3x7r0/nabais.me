/* eslint-disable react/jsx-no-literals */
/** @jsx h */
import { h } from 'preact'
import createPersistedState from 'use-persisted-state'

import Toast from '../molecule/toast'
import LinkWrapper from '../router/link'
import { PATHS } from '../../config'

const usePopupSeen = createPersistedState('cookie-popup-seen')

const CookieDisclaimer = () => {
  const [seen, setSeen] = usePopupSeen(typeof window === 'undefined')

  if (seen) {
    return null
  }

  return (
    <Toast onClose={() => setSeen(true)}>
      {'This website uses cookies.'}<br />
      <LinkWrapper href={PATHS.COOKIE_POLICY} internal>Learn more</LinkWrapper>.
    </Toast>
  )
}

export default CookieDisclaimer
