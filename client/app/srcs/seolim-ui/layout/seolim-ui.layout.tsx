import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import {Navbar, ThemeProvider} from '@seolim/designsystem';
import { Sidebar } from '../component';
import { uiData } from '../ui-data';

const SeolimUiLayout: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const router = useRouter();
  const uiList = useMemo(() => uiData.order.map((key) => ({
    title: uiData.data[key].name,
    link: uiData.data[key].link,
  })), []);
  const link = router.pathname;
  const currentUi = uiList.findIndex((item) => item.link === link) + 1;

  return (
    <ThemeProvider>
      <Navbar type="fixed" icon={<span>🚀</span>} title="SEOLIM UI" titleLink="/seolim-ui" />
      <div className="flex h-[calc(100vh-62px)] mt-[62px]">
        <Sidebar selectedItemIndex={currentUi} items={uiList} />
        <main className="flex-grow-1 p-8 overflow-y-auto h-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
};
export default SeolimUiLayout;
