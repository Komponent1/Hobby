import type { AppProps } from "next/app";
import Head from "next/head";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import type { Persister } from "@tanstack/react-query-persist-client";
import { createAsyncStoragePersister } from "@tanstack/query-async-storage-persister";
import "../styles/global.css";
import "../styles/github.markdown.css";
import { useState } from "react";

export type NextPageWithLayout<P = {}> = React.FC<P> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: 1,
    },
  },
});
const noopPersister: Persister = {
  persistClient: async () => undefined,
  restoreClient: async () => undefined,
  removeClient: async () => undefined,
};
const getPersister = () => {
  if (typeof window === "undefined") return noopPersister;
  return createAsyncStoragePersister({
    storage: window.localStorage,
  });
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);
  const [persister] = useState(() => getPersister());

  return getLayout(
    <>
      <Head>
        <meta charSet="utf-8" />
        <title>모두의 개발</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="google-site-verification"
          content="mr23KVn0BRrTbtugcOFIlxqeCtz0vhO03sTWfwrcln8"
        />
      </Head>
      <PersistQueryClientProvider
        client={queryClient}
        persistOptions={{
          persister,
          dehydrateOptions: {
            shouldDehydrateQuery: (query) => query.meta?.persist !== false,
          },
        }}
      >
        <Component {...pageProps} />
      </PersistQueryClientProvider>
    </>
  );
}

export default MyApp;
