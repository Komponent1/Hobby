import type { AppProps } from 'next/app';
import Head from 'next/head';
import '../styles/global.css';
import { LayoutProvider } from '@seolim/react-ui/layout';
import { HttpProvider } from '@seolim/react-ui/http';
import { Header, Footer } from '../srcs';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <HttpProvider baseurl="">
        <LayoutProvider>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </LayoutProvider>
      </HttpProvider>
    </>
  );
}

export default MyApp;
