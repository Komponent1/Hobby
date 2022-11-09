import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/global.css';
import { LayoutProvider } from '@seolim/react-ui/layout';
import { Header, Footer } from '../srcs/components';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>모두의 개발</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="mr23KVn0BRrTbtugcOFIlxqeCtz0vhO03sTWfwrcln8" />
      </Head>
      <LayoutProvider>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </LayoutProvider>
    </>
  );
}

export default MyApp;
