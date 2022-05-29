import { Html, Head, Main, NextScript } from 'next/document'
import NextHead from 'next/head'

const Document = () => {
  return (
    <Html lang="ko">
      <Head/>
      <NextHead>
        <link rel="stylesheet" type="text/css"
              href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard-dynamic-subset.css"/>
      </NextHead>
      <body>
      <Main/>
      <NextScript/>
      </body>
    </Html>
  );
}

export default Document;
