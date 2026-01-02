# Page Router의 공통 page layout 구현

getLayout 패턴 활용

```typescript
/** pages/_app.tsx */
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  // 페이지별 레이아웃이 있으면 사용, 없으면 기본 레이아웃
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(<Component {...pageProps} />);
}
```

각 필요 페이지에서
```typescript
/** pages/some-page.tsx */
import { ReactElement } from 'react';
import AdminLayout from '../components/AdminLayout';
import type { NextPageWithLayout } from './_app';

const SomePage: NextPageWithLayout = () => {
  return <div>페이지 내용</div>;
};

SomePage.getLayout = function getLayout(page: ReactElement) {
  return <AdminLayout>{page}</AdminLayout>;
};

export default SomePage;
```