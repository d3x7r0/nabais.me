import '../js/debug'

import { useEffect, useState } from 'preact/hooks'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { event, pageview } from 'react-ga/core'
import { LinkProvider, Spinner, CookieDisclaimer, useMounted } from '@nonsensebb/components'
import * as Sentry from '@sentry/node'

import { MENU_ENTRIES, PATHS, TITLES } from '../js/config'
import { buildTitle } from '../js/meta'
import VerticalThirds from '../js/components/template/vertical-thirds'
import SiteNavigation from '../js/components/molecule/site-navigation'
import SiteTitle from '../js/components/molecule/site-title'
import SiteMenu from '../js/components/organism/site-menu'
import SiteFooter from '../js/components/organism/site-footer'
import NextLinkWrapper from '../js/components/router/link'
import { useRoute } from '../js/components/router/match'

import '../js/analytics'

import '../css/00_base/index.scss'

if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
  Sentry.init({
    enabled: process.env.NODE_ENV === 'production',
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    release: process.env.NEXT_PUBLIC_COMMIT_HASH,
  })
}

export function reportWebVitals({ id, name, label, value }) {
  event({
    category: `Next.js ${label} metric`,
    action: name,
    value: Math.round(name === 'CLS' ? value * 1000 : value), // values must be integers
    label: id, // id unique to current page load
    nonInteraction: true, // avoids affecting bounce rate.
  })
}

const GOOGLE_FONTS_URL = 'https://fonts.googleapis.com/css2?family=Play:wght@400;700&family=Roboto+Condensed&display=swap'

function WebsiteApp({ Component, pageProps, err }) {
  const router = useRouter()

  const isMounted = useMounted()
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
  const { matches: isPhotos } = useRoute(PATHS.PHOTOS)

  return (
    <LinkProvider value={NextLinkWrapper}>
      <VerticalThirds
        open={!isHome}
        limited={!isPhotos}
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
          <link
            key="googleFontPreload"
            rel="preload"
            as="style"
            href={GOOGLE_FONTS_URL}
          />

          <link
            key="googleFontJs"
            rel="stylesheet"
            href={GOOGLE_FONTS_URL}
            media={isMounted ? 'all' : 'print'}
          />

          <noscript key="GoogleFontNoScriptFallback">
            <link
              key="googleFontFallback"
              rel="stylesheet"
              href={GOOGLE_FONTS_URL}
              media="all"
            />
          </noscript>

          <title key="title">{buildTitle()}</title>

          <meta name="author" content="Luis Nabais" />

          <meta property="og:site_name" content={TITLES.SITE} />
        </Head>

        {loading ? (
          <Spinner active />
        ) : (
          <Component {...pageProps} err={err} />
        )}

        <CookieDisclaimer
          link={PATHS.COOKIE_POLICY}
          linkProps={{ internal: true }}
        />
      </VerticalThirds>
    </LinkProvider>
  )
}

export default WebsiteApp
