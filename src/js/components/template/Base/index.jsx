// noinspection ES6UnusedImports
// eslint-disable-next-line no-unused-vars
import { h } from 'preact'

import SiteFooter from '../../organism/SiteFooter'
import SiteMenu from '../../organism/SiteMenu'
import SiteNavigation from '../../molecule/SiteNavigation'
import SiteTitle from '../../molecule/SiteTitle'
import VerticalThirds from '../../template/VerticalThirds'
import { MENU_ENTRIES, PATHS } from '../../../config'
import { RouterProvider } from '../../../router/context'
import { useRoute } from '../../../router/match'

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
