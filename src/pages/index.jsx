import Head from 'next/head'

import Home from '../js/components/page/home'
import { SITE_DESCRIPTION, SITE_KEYWORDS } from '../js/config'

const HomePage = () => (
  <>
    <Head>
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

    <Home />
  </>
)

export default HomePage
