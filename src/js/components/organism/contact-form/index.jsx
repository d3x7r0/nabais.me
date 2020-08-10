/* eslint-disable react/jsx-no-literals */
/** @jsx h */
import { h } from 'preact'
import { useEffect, useMemo, useState } from 'preact/hooks'
import { useFormik } from 'formik'
import { Spinner, useMounted } from '@nonsensebb/components'
import classNames from 'classnames'

import { CONTACT_FORM_URL } from '../../../config'
import styles from '../../../../css/03_organism/contact-form.module.scss'

import buildContactFormSchema from './schema'

// TODO: add a captcha
function ContactForm({ className, ...rest }) {
  const [error, setError] = useState(null)
  const [submitted, setSubmitted] = useState(false)

  const fieldNames = useMemo(
    () => ({
      email: Math.random().toString(36).substring(7),
    }),
    [],
  )

  const validationSchema = useMemo(
    () => buildContactFormSchema(fieldNames),
    [fieldNames],
  )

  const form = useFormik({
    initialValues: {
      name: '',
      email: '',
      [fieldNames['email']]: '',
      body: '',
    },
    validationSchema: validationSchema,
    isInitialValid: false,
    onSubmit: (values, actions) => {
      if (values.email || values.email.trim() !== '') {
        // honeypot fallback
        return
      }

      const data = {
        name: values.name,
        email: values[fieldNames['email']],
        body: values.body,
      }

      fetch(CONTACT_FORM_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(res => {
          if (!res.ok) {
            throw new Error(`Form error: ${res.statusText}`)
          }

          actions.resetForm()
          setSubmitted(true)
          return undefined
        })
        .finally(() => actions.setSubmitting(false))
        .catch(err => setError(err))
    },
  })

  useEffect(
    () => {
      if (form.isSubmitting) {
        setError(null)
        setSubmitted(false)
      }
    },
    [form.isSubmitting],
  )

  const canSubmit = form.isValid && !form.isSubmitting

  return (
    <form
      {...rest}
      onSubmit={form.handleSubmit}
      className={classNames(className, styles['o-contact-form'])}
    >
      <div className={styles['o-contact-form__group']}>
        {/* Honeypot email field */}
        <input
          type="email"
          id="email"
          name="email"
          style="display: none;"
          autoComplete="off"
          {...form.getFieldProps('email')}
        />

        <label
          htmlFor="name"
          className={styles['o-contact-form__label']}
        >
          {'Name'}
        </label>
        <input
          id="name"
          name="name"
          autoComplete="name"
          type="text"
          placeholder=""
          required={true}
          disabled={form.isSubmitting}
          className={buildEntryClassName({ touched: form.touched.name })}
          {...form.getFieldProps('name')}
        />

        <label
          htmlFor={fieldNames['email']}
          className={styles['o-contact-form__label']}
        >
          {'E-Mail'}
        </label>
        <input
          id={fieldNames['email']}
          name={fieldNames['email']}
          autoComplete="email"
          type="email"
          placeholder=""
          required={true}
          disabled={form.isSubmitting}
          className={buildEntryClassName({ touched: form.touched[fieldNames['email']] })}
          {...form.getFieldProps(fieldNames['email'])}
        />

        <label htmlFor="body" className={styles['o-contact-form__label']}>
          {'Text'}
        </label>
        <textarea
          id="body"
          name="body"
          placeholder=""
          required={true}
          disabled={form.isSubmitting}
          className={buildEntryClassName({
            touched: form.touched.body,
            type: 'textarea',
          })}
          {...form.getFieldProps('body')}
        />
      </div>

      <div className={styles['o-contact-form__footer']}>
        {submitted ? (
          <p className={styles['o-contact-form__success']}>Submitted</p>
        ) : null}

        {error ? (
          <p className={styles['o-contact-form__error']}>There was an error submitting the form</p>
        ) : null}

        <button
          type="submit"
          className={styles['o-contact-form__button']}
          disabled={!canSubmit}
        >
          {'Submit'}
        </button>
      </div>
    </form>
  )
}

function buildEntryClassName({ className, touched, type }) {
  return classNames(
    className,
    styles['o-contact-form__entry'],
    {
      [styles['o-contact-form__entry--touched']]: touched,
      [styles['o-contact-form__textarea']]: type === 'textarea',
    },
  )
}

function ContactFormWrapper(props) {
  const { className } = props

  const isMounted = useMounted()

  if (isMounted) {
    return <ContactForm {...props} />
  } else {
    return <Spinner className={className} loading />
  }
}

export default ContactFormWrapper
