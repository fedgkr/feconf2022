import type { AppProps } from 'next/app';
import 'normalize.css';
import '~/styles/main.scss';

const App = ({ Component, pageProps }: AppProps) => {
  return <Component {...pageProps} />
}

export default App;
