import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import {ThemeProvider} from '@seolim/designsystem';
import { Sidebar } from '../component';
import { uiData } from '../ui-data';

const SeolimUiLayout: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const router = useRouter();
  const uiList = useMemo(() => uiData.order.map((key) => ({
    title: uiData.data[key].name,
    link: uiData.data[key].link,
  })), []);
  const link = router.pathname;
  const currentUi = uiList.findIndex((item) => item.link === link);

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar selectedItemIndex={currentUi} items={uiList} />
      <ThemeProvider>
        <main style={{ flexGrow: 1, padding: '24px' }}>
          {children}
        </main>
      </ThemeProvider>
    </div>
  );
};
export default SeolimUiLayout;
