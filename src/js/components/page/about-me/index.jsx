import { TITLES } from '../../../config'
import MarkdownPage from '../markdown-page'

import content from './content.md'

const About = () => <MarkdownPage title={TITLES.ABOUT} content={content} />

export default About
