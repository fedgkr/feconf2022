import { FC } from 'react';
import Head from 'next/head';

const title = 'FECONF 2022';
const description =
  '국내 최대 프론트엔드 개발 컨퍼런스, FECONF 2022가 10월 8일 오프라인으로 찾아옵니다.';
// const host = 'https://2022.feconf.kr';
const host = 'https://feconf2022.vercel.app';

const HomePageMeta: FC = () => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <title>{title}</title>
      <meta property="description" content={description} />
      <meta
        name="viewport"
        content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0"
      />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta
        name="keywords"
        content="프론트엔드,프론트엔드개발자,프론트엔드개발자그룹,개발자,프로그래머,마크업,디자이너,컨퍼런스,이벤트,서울,FrontEnd,Developer,Programmer,Markup,Designer,Conference,Event,Seoul"
      />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${host}`} />
      <meta
        property="og:image:url"
        content={`${host}/images/releases/og.png`}
      />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="650" />
      <meta property="og:image:alt" content={title} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={`${host}/images/releases/og.png`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:creator" content="@FeConf" />

      <link
        rel="icon"
        type="image/png"
        href={`${host}/images/releases/favicon.png`}
      />
    </Head>
  );
};

export default HomePageMeta;
