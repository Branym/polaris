import Document, { Html, Head, Main, NextScript } from "next/document"

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/img/favicon.png" />
          <link
            href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap"
            rel="stylesheet"
          />
        </Head>
        
        <body style={{overflowX: "hidden"}}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
