import { TITLES } from '../../../config'
import MarkdownPage from '../markdown-page'

import content from './content.md'

const CV = () => <MarkdownPage title={TITLES.CV} content={content} />

export default CV
