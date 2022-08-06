import Head from 'next/head';
import ComingSoonMeta from '~/views/ComingSoonPage/components/ComingSoonMeta';

export default function App() {
  return (
    <>
      <Head>
        <meta httpEquiv="refresh" content="0; url=/trailer" />
      </Head>
      <ComingSoonMeta />
    </>
  );
}
