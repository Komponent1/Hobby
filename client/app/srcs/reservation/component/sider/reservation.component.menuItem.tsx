/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useCallback, useMemo } from 'react';
import { Icon, Typography } from '../../../common/common.components';
import { PannelType, PannelIconMatch, PannelTextMatch } from '../reservation.component.enum';

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
      onClick={changePannel}
    >
      <Icon name={PannelIconMatch[type]} size={24} />
      <Typography type="p" customClass="ml-2">{PannelTextMatch[type]}</Typography>
    </div>
  );
};

export default MenuItem;
