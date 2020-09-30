import Head from 'next/head'

import NotFound from '../js/components/page/not-found'
import { TITLES } from '../js/config'
import { buildTitle } from '../js/meta'

const NotFoundPage = () => (
  <>
    <Head>
      <meta key="robots" name="robots" content="noindex" />

      <title key="title">{buildTitle(TITLES.NOT_FOUND)}</title>
    </Head>

    <NotFound />
  </>
)

NotFoundPage.Footer = false

export default NotFoundPage
