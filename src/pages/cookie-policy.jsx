import Head from 'next/head'

import { SITE_DESCRIPTION, SITE_KEYWORDS, TITLES } from '../js/config'
import CookiePolicy from '../js/components/page/cookie-policy'
import { buildTitle } from '../js/meta'

const HomePage = () => (
  <>
    <Head>
      <title key="title">{buildTitle(TITLES.COOKIE_POLICY)}</title>

      <meta
        key="description"
        name="description"
        itemProp="description"
        content={SITE_DESCRIPTION}
      />

      <meta
        key="keywords"
        name="keywords"
        itemProp="keywords"
        content={SITE_KEYWORDS.join(', ')}
      />
    </Head>

    <CookiePolicy />
  </>
)

export default HomePage
