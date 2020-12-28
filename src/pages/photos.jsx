import Head from 'next/head'
import { join } from 'path'
import { existsSync, lstatSync, readdirSync, readFileSync } from 'fs'

import { SITE_DESCRIPTION, SITE_KEYWORDS, TITLES } from '../js/config'
import Photos from '../js/components/page/photos'
import { buildTitle } from '../js/meta'


function isFile(source) {
  return !lstatSync(source).isDirectory()
}

function getAllListings(source) {
  return readdirSync(source).map(name => join(source, name))
}

const FILE_EXTENSION_REGEX = /\.(avif|webp|png|jpe?g)$/i

function loadImages(folder, basePath = '/photos') {
  return getAllListings(folder)
    .filter(isFile)
    .filter((src = '') => src.match(FILE_EXTENSION_REGEX))
    .map(src => {
      const fileName = src.substring(folder.length).replace(/^\//, '')

      let result = {
        href: join(basePath, fileName),
        src: join(basePath, fileName),
      }

      const detailsFileName = `${src}.json`

      try {
        if (existsSync(detailsFileName)) {
          const data = JSON.parse(
            readFileSync(detailsFileName).toString('utf-8'),
          )

          result = {
            ...result,
            ...data,
          }
        }
      } catch (e) {
        console.warn('Error reading details file %s', detailsFileName, e)
      }

      return result
    })
}

export async function getStaticProps() {
  const images = await loadImages(join(process.cwd(), 'public/photos'))

  return {
    // will be passed to the page component as props
    props: {
      images,
    },
  }
}

const HomePage = (props) => (
  <>
    <Head>
      <title key="title">{buildTitle(TITLES.PHOTOS)}</title>

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

    <Photos {...props} />
  </>
)

export default HomePage
