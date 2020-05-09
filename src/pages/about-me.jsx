/** @jsx h */
import { h } from 'preact'
import Head from 'next/head'

import { SITE_DESCRIPTION, SITE_KEYWORDS, TITLES } from '../js/config'
import About from '../js/components/page/about-me'
import { buildTitle } from '../js/meta'

const HomePage = () => (
  <>
    <Head>
      <title key="title">{buildTitle(TITLES.ABOUT)}</title>

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

    <About />
  </>
)

export default HomePage
