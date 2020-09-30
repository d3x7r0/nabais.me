import { TITLES } from '../../../config'
import MarkdownPage from '../markdown-page'
import ContactForm from '../../organism/contact-form'

import content from './content.md'

const Contacts = () => (
  <>
    <MarkdownPage title={TITLES.CONTACTS} content={content} />

    <ContactForm />
  </>
)

export default Contacts
