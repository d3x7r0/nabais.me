import Head from 'next/head'

import { SITE_DESCRIPTION, SITE_KEYWORDS, TITLES } from '../js/config'
import { buildTitle } from '../js/meta'
import Contacts from '../js/components/page/contacts'

const ContactsPage = () => (
  <>
    <Head>
      <title key="title">{buildTitle(TITLES.CONTACTS)}</title>

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

    <Contacts />
  </>
)

export default ContactsPage
