import React from 'react';
import { HeaderHeight } from '../reservation.component.constant';
import { Typography } from '../../../common/common.components';

type Props = {
  children: React.ReactNode;
};
const Header: React.FC<Props> = ({ children }) => (
  <div className="p-4" style={{height: HeaderHeight}}>
    <Typography type="h3">
      {children}
    </Typography>
  </div>
);

export default Header;
