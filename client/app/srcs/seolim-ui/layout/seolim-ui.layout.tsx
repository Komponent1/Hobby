import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import Sidebar from '../component/seolim-ui.component.sidebar';
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
      <aside style={{ width: '250px', borderRight: '1px solid #ddd' }}>
        <Sidebar selectedItemIndex={currentUi} items={uiList} />
      </aside>
      <main style={{ flexGrow: 1, padding: '20px' }}>
        {children}
      </main>
    </div>
  );
};
export default SeolimUiLayout;
