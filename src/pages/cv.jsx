import Head from 'next/head'

import { SITE_DESCRIPTION, SITE_KEYWORDS, TITLES } from '../js/config'
import CV from '../js/components/page/cv'
import { buildTitle } from '../js/meta'

const HomePage = () => (
  <>
    <Head>
      <title key="title">{buildTitle(TITLES.CV)}</title>

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

    <CV />
  </>
)

export default HomePage
