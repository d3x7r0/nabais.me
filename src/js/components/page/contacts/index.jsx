/** @jsx h */
import { Fragment, h } from 'preact'

import { TITLES } from '../../../config'
import MarkdownPage from '../markdown-page'
import ContactForm from '../../organism/contact-form'

import content from './content.md'

const Contacts = () => (
  <Fragment>
    <MarkdownPage title={TITLES.CONTACTS} content={content} />

    <ContactForm />
  </Fragment>
)

export default Contacts
