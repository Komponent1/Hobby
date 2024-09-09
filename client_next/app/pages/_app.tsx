import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/global.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>모두의 개발</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="mr23KVn0BRrTbtugcOFIlxqeCtz0vhO03sTWfwrcln8" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
