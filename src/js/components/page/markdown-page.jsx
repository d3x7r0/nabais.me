/** @jsx h */
import { h } from 'preact'
import { useMemo } from 'preact/hooks'
import marked from 'marked'

const MarkdownPage = ({ title, content }) => {
  const body = useMemo(
    () => marked(content),
    [content],
  )

  return (
    <>
      <h2>{title}</h2>

      <div dangerouslySetInnerHTML={{ __html: body }} />
    </>
  )
}

export default MarkdownPage
