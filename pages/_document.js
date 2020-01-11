import Document, { Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <html lang="ru">
        <Head>
          <script src="/static/unregisterServiceWorker.js" />
          <link rel="stylesheet" href="/static/styles/normalize.css" />
          <link rel="stylesheet" href="/static/styles/main.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
