import React from 'react';
import {Typography} from '@seolim/designsystem';

type Props = {
  text: string;
};
const Description: React.FC<Props> = ({ text }) => (
  <Typography size="md" weight="regular" color="gray">{text}</Typography>
);
export default Description;
