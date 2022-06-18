import type { AppProps } from 'next/app';
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';

import '~/styles/main.scss';
import NextHead from "next/head";

const cache = createCache({ key: 'next' });

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <CacheProvider value={cache}>
      <Component {...pageProps} />
    </CacheProvider>
  );
}

export default App;
