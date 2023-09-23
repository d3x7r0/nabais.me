import type { FunctionalComponent, JSX } from 'preact'
import type { CollectionEntry } from 'astro:content'
import clsx from 'clsx'

import styles from './index.module.scss'
import BlogPageEntry from './entry'

export type BlogPageProps = {
  className?: JSX.HTMLAttributes['className'],
  entries?: Array<CollectionEntry<'posts'>>
  basepath?: string
}

// TODO: move to organism instead
const BlogPage: FunctionalComponent<BlogPageProps> = function (props) {
  const {
    className,
    entries = [] as Array<CollectionEntry<'posts'>>,
    basepath,
    ...rest
  } = props

  const [mainEntry, ...restEntries] = entries

  return (
    <div
      className={clsx(className, styles['p-page'])}
      {...rest}
    >
      <BlogPageEntry
        key={mainEntry.id}
        title={mainEntry.data.title}
        description={mainEntry.data.description}
        href={[basepath, mainEntry.slug].filter(e => !!e).join('/')}
        big
      />

      <div className={styles['p-page__wrapper']}>
        {restEntries.map(entry => (
          <BlogPageEntry
            key={entry.id}
            title={entry.data.title}
            description={entry.data.description}
            href={[basepath, entry.slug].filter(e => !!e).join('/')}
          />
        ))}
      </div>
    </div>
  )
}

export default BlogPage
