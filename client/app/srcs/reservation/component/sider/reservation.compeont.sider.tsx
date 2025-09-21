import React from 'react';
import { PannelType } from '../reservation.component.enum';
import { SiderWidth } from '../reservation.component.constant';

type Props = {
  setCurrentPanel: (panel: PannelType) => void;
  setVisible: (visible: boolean) => void;
  visible?: boolean;
};
const Sider: React.FC<Props> = ({ setCurrentPanel, visible, setVisible }) => (
  <div>
    <button type="button" onClick={() => setVisible(!visible)} className="fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-md">
      {visible ? 'Close Sider' : 'Open Sider'}
    </button>
    <div
      className="fixed top-0 left-0 h-full bg-gray-800 flex flex-col items-center py-4 overflow-hidden"
      style={{ width: visible ? `${SiderWidth}px` : 0 }}
    >
      <button type="button" onClick={() => setCurrentPanel(PannelType.RESERVATION)}>예약</button>
      <button type="button" onClick={() => setCurrentPanel(PannelType.STAFF)}>직원</button>
      <button type="button" onClick={() => setCurrentPanel(PannelType.SERVICE)}>서비스</button>
      <button type="button" onClick={() => setCurrentPanel(PannelType.STATISTICS)}>통계</button>
    </div>
  </div>
);

export default Sider;
