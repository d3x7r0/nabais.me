/** @jsx h */
import { h } from 'preact'

import { TITLES } from '../../../config'
import MarkdownPage from '../markdown-page'

import content from './content.md'

const Contacts = () => <MarkdownPage title={TITLES.CONTACTS} content={content} />

export default Contacts
