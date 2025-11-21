import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="pt-br" className="bg-background bg-gradient-to-br from-background via-primary to-highlight bg-no-repeat bg-fixed">
        <Head>
          <meta charSet="UTF-8" />
          <link
            rel="icon"
            href={`${process.env.NEXT_PUBLIC_BASE_PATH ?? ''}/favicon.svg`}
            type="image/svg+xml"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
