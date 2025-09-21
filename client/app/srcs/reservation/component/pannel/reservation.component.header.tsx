import React from 'react';
import { HeaderHeight } from '../reservation.component.constant';
import { Typography } from '../../../common/common.components';

type Props = {
  title: string;
};
const Header: React.FC<Props> = ({ title }) => (
  <div style={{height: HeaderHeight}}>
    <Typography type="h3">
      {title}
    </Typography>
  </div>
);

export default Header;
