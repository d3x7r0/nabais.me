import type { FunctionalComponent, JSX } from 'preact'
import type { CollectionEntry } from 'astro:content'
import clsx from 'clsx'

import { TITLES } from '../../../config.ts'
import SimpleList from '../../molecule/SimpleList'
import SimpleListEntry from '../../molecule/SimpleList/entry.tsx'

export type BlogPageProps = {
  className?: JSX.HTMLAttributes['className'],
  entries?: Array<CollectionEntry<'posts'>>
  basepath?: string
}

const BlogArchivesPage: FunctionalComponent<BlogPageProps> = function (props) {
  const {
    className,
    entries = [] as Array<CollectionEntry<'posts'>>,
    basepath,
    ...rest
  } = props

  return (
    <div
      className={clsx(className)}
      {...rest}
    >
      <h1>{TITLES.BLOG_ARCHIVE}</h1>

      <SimpleList>
        {entries.map(entry => (
          <SimpleListEntry key={entry.slug}>
            <a href={[basepath, entry.slug].filter(e => !!e).join('/')}>
              {entry.data.title}
            </a>
          </SimpleListEntry>
        ))}
      </SimpleList>
    </div>
  )
}

export default BlogArchivesPage
