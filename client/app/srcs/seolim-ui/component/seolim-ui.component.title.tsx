import React from 'react';
import { Typography } from '@seolim/designsystem';

type Props = {
  text: string;
};
const Title: React.FC<Props> = ({ text }) => (
  <Typography element="p" size="3xl" weight="bold">{text}</Typography>
);
export default Title;
