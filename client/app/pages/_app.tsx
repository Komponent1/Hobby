import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/global.css';
import '../styles/github.markdown.css';

export type NextPageWithLayout<P = {}> = React.FC<P> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>모두의 개발</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="google-site-verification" content="mr23KVn0BRrTbtugcOFIlxqeCtz0vhO03sTWfwrcln8" />
      </Head>
      <Component {...pageProps} />
    </>,
  );
}

export default MyApp;
