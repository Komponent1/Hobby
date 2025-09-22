/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { PannelType } from '../reservation.component.enum';
import { SiderWidth } from '../reservation.component.constant';
import { Icon } from '../../../common/common.components';
import MenuItem from './reservation.component.menuItem';

type Props = {
  currentPannel: PannelType;
  setCurrentPanel: (panel: PannelType) => void;
  setVisible: (visible: boolean) => void;
  visible?: boolean;
};
const Sider: React.FC<Props> = ({
  setCurrentPanel, visible, setVisible, currentPannel,
}) => (
  <div>
    <div
      onClick={() => setVisible(!visible)}
      className="fixed top-16 z-50 border-2 p-2 rounded-2xl bg-white border-gray-300"
      style={{ left: visible ? `${SiderWidth - 18}px` : '-12px' }}
    >
      {visible ? <Icon name="chevron_left" size={16} /> : <Icon name="chevron_right" size={16} />}
    </div>
    <div
      className="fixed top-0 left-0 h-full bg-gray-100 flex flex-col items-center overflow-hidden border-r border-gray-300"
      style={{ width: visible ? `${SiderWidth}px` : '8px' }}
    >
      <div
        className="p-2 w-full"
        style={{ display: visible ? 'block' : 'none' }}
      >
        <MenuItem
          type={PannelType.RESERVATION}
          setPannel={setCurrentPanel}
          currentPannel={currentPannel}
        />
        <MenuItem
          type={PannelType.STAFF}
          setPannel={setCurrentPanel}
          currentPannel={currentPannel}
        />
        <MenuItem
          type={PannelType.SERVICE}
          setPannel={setCurrentPanel}
          currentPannel={currentPannel}
        />
      </div>
    </div>
  </div>
);

export default Sider;
