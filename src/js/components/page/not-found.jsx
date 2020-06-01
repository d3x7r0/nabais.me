/** @jsx h */
import { h } from 'preact'
import { LinkWrapper } from '@nonsensebb/components'

import { PATHS, TITLES } from '../../config'

const NotFound = () => (
  <>
    <h1>{TITLES.NOT_FOUND}</h1>

    <p>
      {"The address you entered was not found, it is possible that the page you are looking for has been removed it's name changed or is temporarily unavailable."}
    </p>

    <p>
      {'Please try one of the following options:'}
    </p>

    <ul>
      <li>
        {'Double check that there are no typos in the address.'}
      </li>
      <li>
        Go back to the <LinkWrapper href={PATHS.HOME}>home page</LinkWrapper> and start from there,
      </li>
      <li>
        Try a <LinkWrapper href="https://www.google.com/search?q=site%3Anabais.me">Google search of
        the website.</LinkWrapper>
      </li>
    </ul>
  </>
)

export default NotFound
