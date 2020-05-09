/** @jsx h */
import { h } from 'preact'
import Document, { Head, Html, Main, NextScript } from 'next/document'

class BlogDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    // TODO: set lang properly when translation is put in place
    return (
      <Html lang="pt-PT">
        <Head />
        <body>
        <Main />
        <NextScript />
        </body>
      </Html>
    )
  }
}

export default BlogDocument
