import React, { useState } from 'react';
import { Portal } from '../common/common.components';
import { DropdownMenu, Modal } from './component';
import ErrorModal from './component/error/reservation.component.error';
import { useInitEffect } from './hooks/reservation.hook.init';
import { useAuth } from './hooks/reservation.hook.auth';
import Pannel from './component/pannel/reservation.component.pannel';
import BottomSlide from './component/bottomSlide/reservation.component.bottomSlide';
import { PannelType } from './component/reservation.component.enum';
import Sider from './component/sider/reservation.compeont.sider';
import { SiderWidth } from './component/reservation.component.constant';

const ReservationMainPage: React.FC = () => {
  const { accessToken } = useAuth();
  useInitEffect();
  const [currentPanel, setCurrentPanel] = useState<PannelType>(PannelType.RESERVATION);
  const [siderVisible, setSiderVisible] = useState<boolean>(true);

  if (!accessToken || accessToken === '') return null;
  return (
    <div>
      <Sider
        currentPannel={currentPanel}
        setCurrentPanel={setCurrentPanel}
        setVisible={setSiderVisible}
        visible={siderVisible}
      />
      <main className="h-screen overflow-hidden" style={{ marginLeft: siderVisible ? `${SiderWidth}px` : '0' }}>
        <Pannel currentPanel={currentPanel} />
      </main>
      <Portal type="modal-root">
        <Modal />
      </Portal>
      <Portal type="drop-down-root">
        <DropdownMenu />
      </Portal>
      <Portal type="error-root">
        <ErrorModal />
      </Portal>
      <Portal type="bottom-slide-root">
        <BottomSlide />
      </Portal>
    </div>
  );
};

export default ReservationMainPage;
