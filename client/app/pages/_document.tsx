/* eslint-disable object-curly-newline */
/* eslint-disable react/no-danger */
import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { themeInitScript } from "@seolim/designsystem";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ko" suppressHydrationWarning>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        </Head>
        <body>
          <Main />
          <NextScript />
          <div id="modal-root" />
          <div id="loading-root" />
        </body>
      </Html>
    );
  }
}
