import { useMemo } from 'preact/hooks'
import marked from 'marked'

const MARKED_OPTS = {
  gfm: true,
  breaks: true,
}

const MarkdownPage = ({ title, content }) => {
  const body = useMemo(
    () => marked(content, MARKED_OPTS),
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
