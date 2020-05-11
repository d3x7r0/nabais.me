/** @jsx h */
import '../js/debug'
import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { pageview, event } from 'react-ga/core'

import Spinner from '../js/components/atom/spinner'
import CookieDisclaimer from '../js/components/organism/cookie-disclaimer'
import { MENU_ENTRIES, PATHS, TITLES } from '../js/config'
import { buildTitle } from '../js/meta'
import VerticalThirds from '../js/components/template/vertical-thirds'
import SiteNavigation from '../js/components/molecule/site-navigation'
import SiteTitle from '../js/components/molecule/site-title'
import SiteMenu from '../js/components/organism/site-menu'
import SiteFooter from '../js/components/organism/site-footer'
import { useRoute } from '../js/components/router/match'

import '../js/analytics'

import '../css/00_base/index.scss'

export function reportWebVitals({ id, name, label, value }) {
  event({
    category: `Next.js ${ label } metric`,
    action: name,
    value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    label: id, // id unique to current page load
    nonInteraction: true, // avoids affecting bounce rate.
  })
}


function WebsiteApp({ Component, pageProps }) {
  const router = useRouter()

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const startLoading = () => setLoading(true)
    const stopLoading = () => setLoading(false)

    router.events.on('routeChangeStart', startLoading)
    router.events.on('routeChangeComplete', stopLoading)
    router.events.on('routeChangeError', stopLoading)

    return () => {
      router.events.off('routeChangeStart', startLoading)
      router.events.off('routeChangeComplete', stopLoading)
      router.events.off('routeChangeError', stopLoading)
    }
  }, [router, setLoading])

  useEffect(
    () => {
      if (typeof window !== 'undefined') {
        pageview(router.asPath)
      }
    },
    [router.asPath],
  )

  const { matches: isHome } = useRoute(PATHS.HOME)

  return (
    <VerticalThirds
      open={!isHome}
      header={<SiteTitle />}
      footer={<SiteFooter />}
      nav={
          <SiteNavigation>
            <SiteMenu entries={MENU_ENTRIES} />
          </SiteNavigation>
      }
    >
      <Head>
        <link rel="icon" sizes="196x196" href="/icon.png" />

        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-iphone-6-plus.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-ipad-retina.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/apple-touch-icon-ipad-pro.png" />

        <meta name="theme-color" content="#224B85" />

        <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin="anonymous" />

        <title key="title">{buildTitle()}</title>

        <meta name="author" content="Luis Nabais" />

        <meta property="og:site_name" content={TITLES.SITE} />
      </Head>

      <>
        {loading ? (
          <Spinner active />
        ) : (
          <Component {...pageProps} />
        )}
      </>

      <CookieDisclaimer />
    </VerticalThirds>
  )
}

export default WebsiteApp
