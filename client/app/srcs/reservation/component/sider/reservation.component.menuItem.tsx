import React, { useCallback, useMemo } from 'react';
import { PannelType } from '../reservation.component.enum';
import { Icon, Typography } from '../../../common/common.components';

const iconMatch = {
  [PannelType.RESERVATION]: 'calendar_plus_fill',
  [PannelType.STAFF]: 'people_fill',
  [PannelType.SERVICE]: 'cart4',
};
const texxtMatch = {
  [PannelType.RESERVATION]: '예약 관리',
  [PannelType.STAFF]: '직원 관리',
  [PannelType.SERVICE]: '서비스 관리',
};
type Props = {
  setPannel: (panel: PannelType) => void;
  currentPannel?: PannelType;
  type: PannelType;
};
const MenuItem: React.FC<Props> = ({ type, setPannel, currentPannel }) => {
  const changePannel = useCallback(() => {
    setPannel(type);
  }, [type, setPannel]);
  const selected = useMemo(() => currentPannel === type, [currentPannel, type]);

  return (
    <div
      className="flex cursor-pointer p-2 items-center rounded-md w-full"
      style={{
        backgroundColor: selected ? '#3b82f6' : 'transparent',
      }}
    >
      <Icon name={iconMatch[type]} size={24} onClick={changePannel} />
      <Typography type="p" customClass="ml-2">{texxtMatch[type]}</Typography>
    </div>
  );
};

export default MenuItem;
