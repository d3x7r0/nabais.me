import { existsSync, lstatSync, readdirSync, readFileSync } from 'fs'
import { join } from 'path'

function isFile(source) {
  return !lstatSync(source).isDirectory()
}

function getAllListings(source) {
  return readdirSync(source).map(name => join(source, name))
}

const FILE_EXTENSION_REGEX = /\.(avif|webp|png|jpe?g)$/i

export function loadImages(folder, basePath = '/photos') {
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
