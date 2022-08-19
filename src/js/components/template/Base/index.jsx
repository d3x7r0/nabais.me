// noinspection ES6UnusedImports
// eslint-disable-next-line no-unused-vars
import { h } from 'preact'

import SiteFooter from '@/components/organism/SiteFooter'
import SiteMenu from '@/components/organism/SiteMenu'
import SiteNavigation from '@/components/molecule/SiteNavigation'
import SiteTitle from '@/components/molecule/SiteTitle'
import VerticalThirds from '@/components/template/VerticalThirds'
import { MENU_ENTRIES, PATHS } from '@/js/config'
import { RouterProvider } from '@/js/router/context'
import { useRoute } from '@/js/router/match'

const BaseLayout = (props) => {
  const { matches: isHome } = useRoute(PATHS.HOME, props.path)
  const { matches: isPhotos } = useRoute(PATHS.PHOTOS, props.path)

  return (
    <RouterProvider value={props.path}>
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
        {props.children}
      </VerticalThirds>
    </RouterProvider>
  )
}

export default BaseLayout
