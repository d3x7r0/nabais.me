import type { CollectionEntry } from 'astro:content'
import type { ComponentProps } from 'react'

import { clsx } from 'clsx'

import BoxLink from '../../atom/BoxLink'

import styles from './index.module.scss'

export type BlogPageProps = {
  basepath?: string
  entries?: Array<CollectionEntry<'posts'>>
} & ComponentProps<'div'>

// TODO: move to organism instead
function BlogPage(props: BlogPageProps) {
  const {
    basepath,
    className,
    entries = [] as Array<CollectionEntry<'posts'>>,
    ...rest
  } = props

  const [mainEntry, ...restEntries] = entries

  return (
    <div
      className={clsx(className, styles['p-page'])}
      {...rest}
    >
      <BoxLink
        big
        description={mainEntry.data.description}
        href={[basepath, mainEntry.slug].filter(e => !!e).join('/')}
        title={mainEntry.data.title}
      />

      <div className={styles['p-page__wrapper']}>
        {restEntries.map(entry => (
          <BoxLink
            description={entry.data.description}
            href={[basepath, entry.slug].filter(e => !!e).join('/')}
            key={entry.id}
            title={entry.data.title}
          />
        ))}
      </div>
    </div>
  )
}

export default BlogPage
