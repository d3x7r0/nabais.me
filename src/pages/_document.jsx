/** @jsx h */
import { h } from 'preact'
import Document, { Head, Html, Main, NextScript } from 'next/document'

class BlogDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en-GB">
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
