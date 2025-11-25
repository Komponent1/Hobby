import React from 'react';
import { Typography } from '@seolim/designsystem';

type Props = {
  text: string;
};
const Title: React.FC<Props> = ({ text }) => (
  <Typography size="3xl" weight="extraBold">{text}</Typography>
);
export default Title;
