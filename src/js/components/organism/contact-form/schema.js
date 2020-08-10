import { object, string } from 'yup'

export default function buildContactFormSchema(fieldNames) {
  return object().shape({
    name: string().required('Required'),
    email: string().trim().matches(/^(?![\s\S])/, { excludeEmptyString: true }), // honeypot email field
    [fieldNames['email']]: string().email('Invalid email').required('Required'), // real email field
    body: string().required('Required'),
  })
}
